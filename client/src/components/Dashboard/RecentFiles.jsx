import React from "react";
import { FaFilePdf } from "react-icons/fa"; // PDF Icon for files
import "./RecentFiles.css";

const RecentFiles = () => {
  const files = [
    {
      name: "Project-Proposal-Q4-2023.pdf",
      size: "1.3 MB",
      users: [
        {
          name: "Alice",
          avatar:
            "https://images.unsplash.com/photo-1709712268485-09135211ac53?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
        },
        {
          name: "Bob",
          avatar:
            "https://images.unsplash.com/photo-1709712268485-09135211ac53?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
        },
        {
          name: "Charlie",
          avatar:
            "https://images.unsplash.com/photo-1709712268485-09135211ac53?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
        },
        {
          name: "Diana",
          avatar:
            "https://images.unsplash.com/photo-1709712268485-09135211ac53?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
        },
      ],
    },
    {
      name: "Financial-Summary-Q4.pdf",
      size: "2.1 MB",
      users: [
        {
          name: "Alice",
          avatar:
            "https://images.unsplash.com/photo-1709712268485-09135211ac53?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
        },
        {
          name: "Eve",
          avatar:
            "https://images.unsplash.com/photo-1709712268485-09135211ac53?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
        },
        {
          name: "Frank",
          avatar:
            "https://images.unsplash.com/photo-1709712268485-09135211ac53?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
        },
      ],
    },
  ];

  return (
    <div className="recent-files-container">
      <div className="section-header">
        <p>Recent Files</p>
      </div>
      <div className="file-list">
        {files.map((file, index) => (
          <div className="file-item" key={index}>
            <div className="file-info">
              <FaFilePdf className="file-icon" />
              <div>
                <p className="file-name">{file.name}</p>
                <p className="file-size">{file.size}</p>
              </div>
            </div>
            <div className="file-avatars">
              {file.users.slice(0, 3).map((user, userIndex) => (
                <img
                  key={userIndex}
                  src={user.avatar}
                  alt={user.name}
                  className="user-avatar"
                />
              ))}
              {file.users.length > 3 && (
                <p className="additional-users">+{file.users.length - 3}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentFiles;
