import React, { useState } from "react";
import UploadSection from "./components/UploadSection";
import ResultCard from "./components/ResultCard";
import "./App.css";

function App() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [results, setResults] = useState({ helmet: null, seatbelt: null });

  const handleUpload = (file) => {
    const fileURL = URL.createObjectURL(file);
    setPreviewUrl(fileURL);
    // Dummy detection result – replace with real API
    setResults({ helmet: "✔ Helmet Detected", seatbelt: "✔ Seatbelt Detected" });
  };

  const handleClose = () => {
    setPreviewUrl(null);
    setResults({ helmet: null, seatbelt: null });
  };

  return (
    <main className="main-section">
      <section className="upload-area glass">
        <h1>
          Helmet & Seat-belt <br /> <span>Detection System</span>
        </h1>
        <p>
          Upload an image, video, or use webcam to verify rider safety using AI-powered YOLOv10 detection.
        </p>
        <UploadSection onUpload={handleUpload} />
      </section>

      {previewUrl && (
        <section className="result-area fade-in">
          <ResultCard image={previewUrl} results={results} onClose={handleClose} />
        </section>
      )}

      <section className="about-section">
        <h3>🚀 About This Project</h3>
        <p>
          This AI-based Helmet & Seat-belt Detection System is built using ReactJS and Python with YOLOv10.
          It helps monitor traffic safety compliance using images, videos, or live streams.
        </p>
      </section>

      <footer>
        Developed by <strong>Vaibhav</strong> | Final Year Engineering Project • 2025
      </footer>
    </main>
  );
}

export default App;
