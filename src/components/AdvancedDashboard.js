import React from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext"; // Assuming you have this context for colors
import { FiTrendingUp, FiAlertTriangle, FiCheckCircle, FiClock, FiPlayCircle, FiUpload } from 'react-icons/fi';
import { motion, useSpring, useTransform } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner"; // Assuming you have this component
import '../styles/AdvancedDashboard.css';
// Animated number component
const AnimatedNumber = ({ value }) => {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  React.useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
};

const AdvancedDashboard = () => {
  const navigate = useNavigate();
  // A fallback for colors if useTheme is not available
  const { colors } = useTheme() || { colors: { primary: '#667eea', secondary: '#764ba2', textSecondary: '#64748b' } };
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState({
    totalDetections: 0,
    violations: 0,
    complianceRate: 0,
    lastDetection: null
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalDetections: 1247,
        violations: 89,
        complianceRate: 92.8,
        lastDetection: new Date().toLocaleString('en-US', {
          month: 'numeric', day: 'numeric', year: 'numeric',
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        })
      });
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Framer Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  if (loading) {
    return <LoadingSpinner size="large" message="Loading dashboard..." />;
  }

  return (
    <div className="advanced-dashboard">
      {/* Aurora Background Effect */}
      <div className="aurora-bg">
        <div className="aurora-dot aurora-dot-1"></div>
        <div className="aurora-dot aurora-dot-2"></div>
      </div>
      
      <nav className="dashboard-nav">
        <h1 className="dashboard-title">Safety<span className="title-accent">AI</span></h1>
        <div className="nav-buttons">
          <motion.button className="nav-button active" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Dashboard
          </motion.button>
          <motion.button onClick={() => navigate("/login")} className="nav-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Log out
          </motion.button>
        </div>
      </nav>

      <main className="dashboard-main">
        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="stat-card" variants={itemVariants}>
            <div className="card-icon" style={{ background: 'rgba(102, 126, 234, 0.2)', color: '#667eea' }}><FiTrendingUp /></div>
            <h3>Total Detections</h3>
            <p className="stat-value" style={{ color: colors.primary }}>
              <AnimatedNumber value={stats.totalDetections} />
            </p>
          </motion.div>

          <motion.div className="stat-card" variants={itemVariants}>
            <div className="card-icon" style={{ background: 'rgba(255, 107, 107, 0.2)', color: '#ff6b6b' }}><FiAlertTriangle /></div>
            <h3>Violations Detected</h3>
            <p className="stat-value" style={{ color: '#ff6b6b' }}>
              <AnimatedNumber value={stats.violations} />
            </p>
          </motion.div>

          <motion.div className="stat-card" variants={itemVariants}>
            <div className="card-icon" style={{ background: 'rgba(40, 167, 69, 0.2)', color: '#28a745' }}><FiCheckCircle /></div>
            <h3>Compliance Rate</h3>
            <p className="stat-value" style={{ color: '#28a745' }}>
              <AnimatedNumber value={stats.complianceRate} />%
            </p>
          </motion.div>

          <motion.div className="stat-card" variants={itemVariants}>
            <div className="card-icon" style={{ background: 'rgba(108, 117, 125, 0.2)', color: '#6c757d' }}><FiClock /></div>
            <h3>Last Detection</h3>
            <p className="stat-value last-detection" style={{ color: colors.textSecondary }}>
              {stats.lastDetection}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="action-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="action-card" variants={itemVariants}>
            <h2>Live Detection</h2>
            <p>Use your camera for real-time helmet and seatbelt detection</p>
            <motion.button onClick={() => navigate("/live")} className="action-button primary" whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
              <FiPlayCircle size={20} />
              Start Live Detection
            </motion.button>
          </motion.div>

          <motion.div className="action-card" variants={itemVariants}>
            <h2>Upload Detection</h2>
            <p>Upload images or videos for batch processing and analysis</p>
            <motion.button onClick={() => navigate("/upload")} className="action-button secondary" whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
              <FiUpload size={20} />
              Upload Files
            </motion.button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdvancedDashboard;