import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import LoadingSpinner from "./LoadingSpinner";
import '../styles/EnhancedLiveDetection.css'; // Import the new CSS file

const EnhancedLiveDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { isDarkMode } = useTheme();
  const [streamStarted, setStreamStarted] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionResults, setDetectionResults] = useState([]);
  const [error, setError] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1280,
          height: 720,
          facingMode: "user",
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setStreamStarted(true);
      setError(null);
    } catch (err) {
      console.error("Camera error:", err);
      setError("Camera access denied or unavailable.");
    }
  };

  const startDetection = async () => {
    setIsDetecting(true);
    // Simulate AI detection
    const mockResults = [
      { type: "helmet", confidence: 0.95, status: "detected" },
      { type: "seatbelt", confidence: 0.88, status: "not detected" },
    ];
    
    setTimeout(() => {
      setDetectionResults(mockResults);
      setIsDetecting(false);
    }, 2000);
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    setStreamStarted(false);
    setIsDetecting(false);
    setDetectionResults([]);
  };

  return (
    <div className={`live-detection-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="detection-container">
        <h1>Live Compliance Detection</h1>
        <p>
          Start your camera to begin real-time detection of helmets and seatbelts.
        </p>

        {error && <div className="error-message">{error}</div>}

        {!streamStarted ? (
          <div className="start-prompt">
            <button
              className="start-camera-btn"
              onClick={startCamera}
            >
              Start Camera
            </button>
          </div>
        ) : (
          <div className="detection-active">
            <div className="video-area">
              <video ref={videoRef} className="video-stream" autoPlay playsInline muted />
              <canvas ref={canvasRef} className="detection-canvas" />
            </div>

            <div className="detection-controls">
              <button
                className={`control-button ${isDetecting ? 'loading' : 'start'}`}
                onClick={startDetection}
                disabled={isDetecting}
              >
                {isDetecting ? 'Detecting...' : 'Start Detection'}
              </button>
              <button className="control-button stop" onClick={stopCamera} disabled={isDetecting}>
                Stop Camera
              </button>
            </div>

            {detectionResults.length > 0 && (
              <div className="results-card">
                <h3>Detection Results</h3>
                {detectionResults.map((result, index) => (
                  <div key={index} className="detection-item">
                    <span>{result.type.charAt(0).toUpperCase() + result.type.slice(1)}</span>
                    <span className={`status ${result.status.replace(' ', '-')}`}>
                      {result.status} ({(result.confidence * 100).toFixed(1)}%)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedLiveDetection;