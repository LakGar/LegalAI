import { Document } from "../models/documentModel.js";
import { User } from "../models/userModel.js";
import { Business } from "../models/businessModel.js";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import stream from "stream";
import config from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
});

// Initialize S3 Client with explicit credentials
const s3Client = new S3Client({
  region: config.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
  maxAttempts: 3,
});

// Helper function: Convert stream to Buffer
const streamToBuffer = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });

// Helper function to upload to S3
const uploadToS3 = async (file, key) => {
  try {
    console.log("Uploading to S3 with credentials:", {
      region: config.AWS_BUCKET_REGION,
      bucket: config.AWS_BUCKET_NAME,
      key: key,
      hasAccessKey: !!config.AWS_ACCESS_KEY_ID,
      hasSecretKey: !!config.AWS_SECRET_ACCESS_KEY,
    });

    const command = new PutObjectCommand({
      Bucket: config.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    const response = await s3Client.send(command);
    console.log("S3 upload response:", response);

    return `https://${config.AWS_BUCKET_NAME}.s3.${config.AWS_BUCKET_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error("S3 upload error details:", {
      error: error.message,
      code: error.code,
      requestId: error.$metadata?.requestId,
      attempts: error.$metadata?.attempts,
    });
    throw error;
  }
};

// Helper function to get file from S3
const getFileFromS3 = async (key) => {
  const command = new GetObjectCommand({
    Bucket: config.AWS_BUCKET_NAME,
    Key: key,
  });

  const response = await s3Client.send(command);
  return response.Body; // This is a stream
};

// Helper function to delete from S3
const deleteFromS3 = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: config.AWS_BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
};

// Helper function to generate presigned URL
const generatePresignedUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: config.AWS_BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
};

/**
 * Upload a new document
 * @route POST /document
 * @access Private
 */
export const uploadDocument = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { name, type, description, businessId } = req.body;

    if (!userId || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, including the file",
      });
    }

    // Generate unique key for S3
    const key = `${userId}/${Date.now()}-${req.file.originalname}`;

    // Upload to S3
    const documentUrl = await uploadToS3(req.file, key);

    // Generate initial presigned URL
    const presignedUrl = await generatePresignedUrl(key);

    const document = new Document({
      name,
      type,
      description,
      documentUrl,
      s3Key: key,
      user: userId,
      business: businessId || null,
    });

    await document.save();

    // Associate document with the user
    await User.findByIdAndUpdate(userId, {
      $push: { documents: document._id },
    });

    if (businessId) {
      await Business.findByIdAndUpdate(businessId, {
        $push: { documents: document._id },
      });
    }

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: {
        ...document.toObject(),
        presignedUrl,
      },
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Get all documents for a user
 * @route GET /document
 * @access Private
 */
export const getUserDocuments = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const documents = await Document.find({ user: userId });

    return res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Get a single document by ID
 * @route GET /document/:id
 * @access Private
 */
export const getDocumentById = async (req, res) => {
  try {
    const documentId = req.params.id;

    if (!documentId) {
      return res
        .status(400)
        .json({ success: false, message: "Document ID is required" });
    }

    const document = await Document.findById(documentId).populate(
      "user",
      "firstname lastname email"
    );

    if (!document) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }

    return res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    console.error("Error fetching document:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Update a document
 * @route PUT /document/:id
 * @access Private
 */
export const updateDocument = async (req, res) => {
  try {
    const documentId = req.params.id;
    const userId = req.user?._id;

    if (!documentId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Document ID and User ID are required",
      });
    }

    const updates = req.body;
    const allowedUpdates = [
      "name",
      "type",
      "description",
      "analysisResult",
      "status",
      "analysisError",
    ];
    const isValidOperation = Object.keys(updates).every((field) =>
      allowedUpdates.includes(field)
    );

    if (!isValidOperation) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid update fields provided" });
    }

    const document = await Document.findOneAndUpdate(
      { _id: documentId, user: userId },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found or access denied",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Document updated successfully",
      data: document,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Get file from S3
 * @route GET /document/file/:id
 * @access Private
 */
export const getFile = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    try {
      // Generate a presigned URL for secure, temporary access
      const presignedUrl = await generatePresignedUrl(document.s3Key);

      // Return the presigned URL directly
      return res.json({
        success: true,
        url: presignedUrl,
        documentName: document.name,
      });
    } catch (s3Error) {
      console.error("S3 error:", s3Error);
      return res.status(500).json({
        success: false,
        message: "Error generating document access URL",
      });
    }
  } catch (error) {
    console.error("Error getting file:", error);
    return res.status(500).json({
      success: false,
      message: "Error accessing file",
    });
  }
};

/**
 * Delete a document
 * @route DELETE /document/:id
 * @access Private
 */
export const deleteDocument = async (req, res) => {
  try {
    const documentId = req.params.id;
    const userId = req.user?._id;

    if (!documentId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Document ID and User ID are required",
      });
    }

    const document = await Document.findOne({
      _id: documentId,
      user: userId,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found or access denied",
      });
    }

    // Delete from S3
    if (document.s3Key) {
      await deleteFromS3(document.s3Key);
    }

    // Delete document from database
    await Document.findByIdAndDelete(documentId);

    // Remove reference from user and business
    await User.findByIdAndUpdate(userId, { $pull: { documents: documentId } });
    if (document.business) {
      await Business.findByIdAndUpdate(document.business, {
        $pull: { documents: documentId },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting document:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Analyze a document using OpenAI
 * @route POST /api/documents/analyze
 * @access Private
 */
export const analyzeDocument = async (req, res) => {
  console.log("Analyzing document:", req.body);
  try {
    const { documentId } = req.body;
    console.log("Document ID:", documentId);
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    try {
      // Retrieve file from S3 and convert stream to Buffer
      const fileStream = await getFileFromS3(document.s3Key);
      const fileBuffer = await streamToBuffer(fileStream);

      // Parse PDF data
      const pdfData = await pdfParse(fileBuffer);

      // Process the text content using OpenAI
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a lawyer's assistant analyzing legal documents. Your work is the only source of information for the lawyer. Format your response using this HTML structure:

<div class="analysis-content">
    <div class="summary">
        <h2>Document Summary</h2>
        <p>[Your summary here]</p>
    </div>

    <div class="key-points">
        <h2>Key Points</h2>
        <ul>
            <li><strong>Point 1:</strong> [Description]</li>
        </ul>
    </div>

    <div class="dates">
        <h2>Important Dates</h2>
        <ul>
            <li><strong>[Date]:</strong> [Significance]</li>
        </ul>
    </div>

    <div class="risks">
        <h2>Legal Risks and Considerations</h2>
        <ul>
            <li><strong>Risk:</strong> [Description]</li>
        </ul>
    </div>

    <div class="recommendations">
        <h2>Recommendations</h2>
        <ul>
            <li>[Your recommendations]</li>
        </ul>
    </div>
</div>`,
          },
          {
            role: "user",
            content: `Please analyze this document and provide a detailed legal analysis: ${pdfData.text}`,
          },
        ],
        model: "gpt-4-turbo-preview",
        temperature: 0.7,
        max_tokens: 2000,
      });

      const analysis = completion.choices[0].message.content;
      console.log("Analysis received from OpenAI");

      // Update document with analysis
      document.status = "analyzed";
      document.analysisResult = analysis;
      await document.save();

      res.json({
        success: true,
        message: "Document analyzed successfully",
        analysisText: analysis,
        cached: false,
      });
    } catch (s3Error) {
      console.error("Processing error:", s3Error);

      let errorMessage = "Failed to process document.";
      if (s3Error.message?.includes("Illegal character")) {
        errorMessage =
          "The PDF file appears to be corrupted or password-protected.";
      }

      // Update document status to indicate analysis failure
      document.status = "pending";
      document.analysisError = errorMessage;
      await document.save();

      res.status(400).json({
        success: false,
        message: errorMessage,
        error: s3Error.message,
      });
    }
  } catch (error) {
    console.error("Document analysis error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while analyzing the document",
      error: error.message,
    });
  }
};
