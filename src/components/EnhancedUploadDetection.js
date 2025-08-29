import React, { useState, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import LoadingSpinner from "./LoadingSpinner";
import './EnhancedUploadDetection.css'; // Import the new CSS file
import { FiUploadCloud } from 'react-icons/fi';

const EnhancedUploadDetection = () => {
  const { isDarkMode } = useTheme();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResults(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type.startsWith('image/') || droppedFile.type.startsWith('video/'))) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setResults(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    // Simulate upload and AI processing
    const mockResults = {
      filename: file.name,
      type: file.type.startsWith('image/') ? 'Image' : 'Video',
      detections: [
        { type: "helmet", status: "not detected", confidence: 0.85 },
        { type: "seatbelt", status: "detected", confidence: 0.98 }
      ],
      processingTime: "4.2s"
    };

    await new Promise(resolve => setTimeout(resolve, 3000));

    setResults(mockResults);
    setUploading(false);
  };

  return (
    <div className={`upload-page-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="upload-container">
        <h1>Upload for Detection</h1>
        <p>Choose an image or video to analyze for safety compliance.</p>
        
        <div 
          className={`drag-drop-area ${dragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*,video/*"
            className="hidden-file-input"
          />
          <FiUploadCloud className="upload-icon" />
          <p>Drag & Drop or Click to Upload</p>
          <span className="file-type-info">Supported formats: Images and Videos</span>
        </div>
        
        {preview && (
          <div className="preview-container">
            {file.type.startsWith('image/') ? (
              <img src={preview} alt="File preview" className="preview-image" />
            ) : (
              <video src={preview} controls className="preview-video" />
            )}
            <p className="file-name">{file.name}</p>
          </div>
        )}

        <button 
          onClick={handleUpload} 
          disabled={!file || uploading}
          className={`upload-button ${uploading ? 'loading' : ''}`}
        >
          {uploading ? <LoadingSpinner size="small" /> : 'Start Detection'}
        </button>
        
        {results && (
          <div className="results-card">
            <h3>Detection Results</h3>
            <p className="results-file-info">
              File: {results.filename} ({results.type})
            </p>
            
            {results.detections.map((detection, index) => (
              <div key={index} className="detection-item">
                <span className="detection-type">
                  {detection.type.charAt(0).toUpperCase() + detection.type.slice(1)}
                </span>
                <span className={`status ${detection.status.replace(' ', '-')}`}>
                  {detection.status} ({(detection.confidence * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
            
            <p className="processing-time-info">
              Processing time: {results.processingTime}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedUploadDetection;