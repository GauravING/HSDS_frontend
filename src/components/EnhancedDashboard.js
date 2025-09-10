import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { FiCheck, FiPlayCircle, FiUpload } from 'react-icons/fi';
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import '../styles/EnhancedDashboard.css';

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
          <motion.button
            onClick={() => navigate("/")}
            className="nav-button primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Dashboard
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FiCheck />
            </motion.span>
          </motion.button>
          <motion.button
            onClick={() => navigate("/login")}
            className="nav-button secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Log out
          </motion.button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Detections</h3>
            <p className="stat-value" style={{ color: colors.primary }}>
              {stats.totalDetections}
            </p>
          </div>

          <div className="stat-card">
            <h3>Violations Detected</h3>
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
            <motion.button
              onClick={() => navigate("/live")}
              className="action-button primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FiPlayCircle size={22} />
              </motion.span>
              Start Live Detection
            </motion.button>
          </div>

          <div className="action-card">
            <h2>Upload Detection</h2>
            <p>Upload images or videos for batch processing and analysis</p>
            <motion.button
              onClick={() => navigate("/upload")}
              className="action-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <FiUpload size={22} />
              </motion.span>
              Upload Files
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
