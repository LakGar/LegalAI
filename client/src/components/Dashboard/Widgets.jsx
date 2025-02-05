import React, { useState } from "react";
import "./Widget.css";
import { CiChat1, CiFolderOn } from "react-icons/ci";
import { BiAnalyse } from "react-icons/bi";
import { CiImport } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import FileUploadModal from "../Global/FileUploadModal";
const Widgets = () => {
  const navigate = useNavigate();
  const [documentModal, setDocumentModal] = useState(false);
  const closeModal = () => {
    setDocumentModal(false);
  };
  return (
    <div className="widget-container">
      <div className="widget one">
        <div className="icon-container icon-1">
          <CiChat1 />
        </div>
        <div className="text-container" onClick={() => navigate("/chats")}>
          <h4>New chat</h4>
          <p>Ask general questions</p>
        </div>
      </div>
      <div className="widget two">
        <div className="icon-container icon-2">
          <CiFolderOn />
        </div>
        <div className="text-container" onClick={() => navigate("/chat")}>
          <h4>New Folder</h4>
          <p>Create a new repository</p>
        </div>
      </div>
      <div className="widget three ">
        <div className="icon-container icon-3">
          <BiAnalyse />
        </div>
        <div className="text-container">
          <h4>New analysis</h4>
          <p>Analyze a document</p>
        </div>
      </div>
      <div className="widget four" onClick={() => setDocumentModal(true)}>
        <div className="icon-container icon-4">
          <CiImport />
        </div>
        <div className="text-container">
          <h4>Import</h4>
          <p>Bring in your pdf file</p>
        </div>
      </div>
      {documentModal && <FileUploadModal closeModal={closeModal} />}
    </div>
  );
};

export default Widgets;
