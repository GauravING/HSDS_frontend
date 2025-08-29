import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { FiCheck } from 'react-icons/fi'; // Fix: Added missing import for FiCheck
import LoadingSpinner from "./LoadingSpinner";
import './EnhancedDashboard.css'; // Import the CSS file

const EnhancedDashboard = () => {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDetections: 0,
    violations: 0,
    complianceRate: 0,
    lastDetection: null
  });

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStats({
        totalDetections: 1247,
        violations: 89,
        complianceRate: 92.8,
        lastDetection: new Date().toLocaleString()
      });
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return <LoadingSpinner size="large" message="Loading dashboard..." />;
  }

  return (
    <div className="enhanced-dashboard">
      {/* Navigation */}
      <nav className="dashboard-nav">
        <h2 className="dashboard-nav-title">
          Helmet <span style={{ color: colors.secondary }}>&</span> Seatbelt Detection
        </h2>
        <div className="nav-buttons">
          <button
            onClick={() => navigate("/")}
            className="nav-button home"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/live")}
            className="nav-button primary"
          >
            Live Detection
          </button>
          <button
            onClick={() => navigate("/upload")}
            className="nav-button secondary"
          >
            Upload
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Safety Analytics Dashboard</h1>
          <p>Real-time data and insights on safety compliance.</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Detections</h3>
            <p className="stat-value" style={{ color: colors.primary }}>
              {stats.totalDetections.toLocaleString()}
            </p>
          </div>

          <div className="stat-card">
            <h3>Violations</h3>
            <p className="stat-value" style={{ color: colors.secondary }}>
              {stats.violations}
            </p>
          </div>

          <div className="stat-card">
            <h3>Compliance Rate</h3>
            <p className="stat-value" style={{ color: '#28a745' }}>
              {stats.complianceRate}%
            </p>
          </div>

          <div className="stat-card">
            <h3>Last Detection</h3>
            <p className="stat-value last-detection" style={{ color: colors.textSecondary }}>
              {stats.lastDetection}
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="action-grid">
          <div className="action-card">
            <h2>Live Detection</h2>
            <p>Use your camera for real-time helmet and seatbelt detection</p>
            <button
              onClick={() => navigate("/live")}
              className="action-button primary"
            >
              Start Live Detection
            </button>
          </div>

          <div className="action-card">
            <h2>Upload Detection</h2>
            <p>Upload images or videos for batch processing and analysis</p>
            <button
              onClick={() => navigate("/upload")}
              className="action-button secondary"
            >
              Upload Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;