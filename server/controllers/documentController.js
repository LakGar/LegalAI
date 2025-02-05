import { Document } from "../models/documentModel.js";
import { User } from "../models/userModel.js";
import { Business } from "../models/businessModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Upload a new document
 * @route POST /document
 * @access Private
 */
export const uploadDocument = async (req, res) => {
  try {
    const userId = req.user?._id; // Ensure logged-in user
    const { name, type, description, businessId } = req.body;

    if (!userId || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, including the file",
      });
    }

    const documentUrl = req.file.path; // Assuming multer stores the file path

    const document = new Document({
      name,
      type,
      description,
      documentUrl,
      user: userId,
      business: businessId || null,
    });

    await document.save();

    // Associate document with the user
    await User.findByIdAndUpdate(userId, {
      $push: { documents: document._id },
    });

    // Associate document with the business, if provided
    if (businessId) {
      await Business.findByIdAndUpdate(businessId, {
        $push: { documents: document._id },
      });
    }

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: document,
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
    const allowedUpdates = ["name", "type", "description"];
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

    const document = await Document.findOneAndDelete({
      _id: documentId,
      user: userId,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found or access denied",
      });
    }

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

export const getFile = (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../uploads", fileName); // Adjust path as needed

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: "File not found",
    });
  }

  // Send the file
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).json({
        success: false,
        message: "Error accessing file",
      });
    }
  });
};

/**
 * Analyze a document using OpenAI
 * @route POST /api/documents/analyze
 * @access Private
 */
export const analyzeDocument = async (req, res) => {
  try {
    const { documentUrl } = req.body;
    if (!documentUrl) {
      return res.status(400).json({
        success: false,
        message: "Document URL required",
      });
    }

    // First, check if we already have an analysis for this document
    const existingDocument = await Document.findOne({ documentUrl });
    if (existingDocument && existingDocument.analysisResult) {
      console.log("Returning cached analysis");
      return res.status(200).json({
        success: true,
        analysisText: existingDocument.analysisResult,
        cached: true,
      });
    }

    // If no existing analysis, proceed with new analysis
    const filePath = path.join(__dirname, "..", documentUrl);
    console.log("Attempting to read file at:", filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: `File not found at path: ${filePath}`,
      });
    }

    try {
      // Read and parse the PDF file
      const dataBuffer = fs.readFileSync(filePath);
      const pdfParse = (await import("pdf-parse/lib/pdf-parse.js")).default;
      const pdfData = await pdfParse(dataBuffer);
      const pdfText = pdfData.text;

      // Construct the messages array for OpenAI with comprehensive analysis instructions
      const messages = [
        {
          role: "system",
          content: `You are an expert legal analyst and attorney with deep experience in document analysis. 
Your task is to provide a comprehensive analysis of the document that will serve as a foundation for future chat-based interactions.

Format your response using HTML tags for better readability:
- Use <h3> for main section headings
- Use <h4> for subsection headings
- Use <p> for paragraphs
- Use <ul> and <li> for bullet points
- Use <ol> and <li> for numbered lists
- Use <strong> for emphasis on important points
- Use <em> for dates, terms, and definitions
- Use <br> for line breaks
- Use <blockquote> for direct quotes from the document

Provide a thorough analysis including:

1. Document Overview
   - Document type and purpose
   - Parties involved
   - Jurisdiction and governing law
   - Effective date and duration

2. Key Terms and Definitions
   - List and explain important defined terms
   - Highlight any unusual or noteworthy definitions

3. Main Provisions
   - Detailed breakdown of major sections
   - Key obligations for each party
   - Important conditions and requirements

4. Critical Dates and Deadlines
   - All mentioned dates
   - Recurring deadlines
   - Notice periods
   - Term and termination dates

5. Rights and Obligations
   - Detailed list of rights for each party
   - Responsibilities and obligations
   - Performance requirements

6. Risk Analysis
   - Potential vulnerabilities
   - Hidden obligations
   - Unclear or ambiguous terms
   - Unfavorable provisions
   - Liability exposure

7. Financial Implications
   - Payment terms
   - Fees and expenses
   - Financial obligations
   - Penalties and damages

8. Termination and Exit
   - Termination conditions
   - Notice requirements
   - Post-termination obligations
   - Survival clauses

9. Special Considerations
   - Unusual provisions
   - Industry-specific terms
   - Regulatory compliance requirements
   - Privacy and data protection

10. Recommendations
    - Areas requiring clarification
    - Suggested modifications
    - Points for negotiation
    - Additional protections needed

Be thorough and detailed, as this analysis will serve as the knowledge base for future chat interactions about the document.`,
        },
        {
          role: "user",
          content: `Document text: """${pdfText}"""`,
        },
      ];

      // Call the OpenAI API with GPT-4 and higher token limit
      const aiResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Using GPT-4 for more comprehensive analysis
        messages,
        temperature: 0.7,
        max_tokens: 4000, // Increased token limit
        presence_penalty: 0.3, // Encourage covering new topics
        frequency_penalty: 0.3, // Reduce repetition
      });

      const analysisText = aiResponse.choices[0]?.message?.content?.trim();

      // Save the analysis to the document
      if (existingDocument) {
        existingDocument.analysisResult = analysisText;
        existingDocument.status = "analyzed";
        existingDocument.analyzedAt = new Date();
        await existingDocument.save();
      }

      return res.status(200).json({
        success: true,
        analysisText,
        cached: false,
      });
    } catch (pdfError) {
      console.error("PDF processing error:", pdfError);
      return res.status(500).json({
        success: false,
        message: "Failed to process PDF file.",
        error: pdfError.message,
      });
    }
  } catch (error) {
    console.error("Error analyzing document:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to analyze document.",
      error: error.message,
    });
  }
};
