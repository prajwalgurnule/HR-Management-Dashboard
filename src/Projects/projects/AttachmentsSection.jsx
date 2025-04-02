import { FiPaperclip } from 'react-icons/fi';
import { useState } from 'react';
import './attachments.css';

const AttachmentsSection = ({ 
  attachments, 
  onFileUpload 
}) => {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    onFileUpload(file);
    setFile(null);
  };

  return (
    <div className="attachments-container">
      <h2 className="attachments-header">Attachments</h2>
      
      {attachments.length > 0 ? (
        <div className="attachments-list">
          {attachments.map(file => (
            <div key={file.id} className="attachment-item">
              <FiPaperclip className="attachment-icon" />
              <div className="attachment-info">
                <p className="attachment-name">{file.name}</p>
                <p className="attachment-date">{file.uploadDate}</p>
              </div>
              <a 
                href={file.url} 
                download
                className="attachment-download"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-attachments">No attachments yet</p>
      )}
      
      <form onSubmit={handleSubmit} className="upload-form">
        <label className="upload-label">Upload File</label>
        <div className="upload-controls">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="upload-input"
          />
          <button
            type="submit"
            className="upload-button"
          >
            <FiPaperclip />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttachmentsSection;