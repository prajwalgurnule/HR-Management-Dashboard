import React from "react";
import {
  FiUsers,
  FiPieChart,
  FiTrendingUp,
  FiAward,
  FiBookOpen,
  FiBarChart2,
  FiInfo,
  FiClock,
  FiTarget,
  FiDollarSign,
  FiHelpCircle,
  FiChevronDown
} from "react-icons/fi";
import ResourceAllocation from "./ResourceAllocation";
import TrainingProgress from "./TrainingProgress";
import SkillMatrix from "./SkillMatrix";
import { motion, AnimatePresence } from "framer-motion";
import "./ResourcesDevelopment.css";

const ResourcesDevelopment = () => {
  const [activeTab, setActiveTab] = React.useState("overview");
  const [showInfo, setShowInfo] = React.useState(null);

  return (
    <div className="rd-container">
      {/* Header with animated gradient */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rd-header"
      >
        <h1 className="rd-title">
          Resources & Development Dashboard
        </h1>
        <p className="rd-subtitle">
          Optimize your team's potential through strategic resource allocation and continuous skill development
        </p>
      </motion.div>

      {/* Stats Cards with staggered animation */}
      <div className="rd-stats-grid">
        {[
          { 
            icon: FiUsers, 
            label: "Active Programs", 
            value: "12", 
            color: "indigo",
            description: "Ongoing training initiatives",
            trend: "up"
          },
          { 
            icon: FiTrendingUp, 
            label: "Skill Improvement", 
            value: "42%", 
            color: "green",
            description: "Quarter-over-quarter growth",
            trend: "up"
          },
          { 
            icon: FiAward, 
            label: "Certifications", 
            value: "87", 
            color: "purple",
            description: "Team certifications this year",
            trend: "steady"
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`rd-stat-card rd-stat-${stat.color}`}
          >
            <div className={`rd-stat-icon rd-stat-icon-${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div className="rd-stat-content">
              <p className="rd-stat-label">{stat.label}</p>
              <h3 className="rd-stat-value">
                {stat.value}
                {stat.trend === "up" && (
                  <span className="rd-stat-trend-up">
                    <FiTrendingUp className="rd-trend-icon" /> +12%
                  </span>
                )}
              </h3>
              <p className="rd-stat-description">{stat.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid - Now with 3 equal columns */}
      <div className="rd-main-grid">
        {/* Training Progress Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rd-training-card"
        >
          <div className="rd-card-header">
            <h2 className="rd-card-title">
              <FiBookOpen className="rd-card-title-icon" />
              Training Progress
            </h2>
            <motion.button
              whileHover={{ rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="rd-info-button"
              onClick={() => setShowInfo(showInfo === "training" ? null : "training")}
            >
              <FiHelpCircle size={18} />
            </motion.button>
          </div>

          <AnimatePresence>
            {showInfo === "training" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="rd-info-tooltip"
              >
                Track completion rates and timelines for active training programs
              </motion.div>
            )}
          </AnimatePresence>

          <div className="rd-training-content">
            <TrainingProgress />
          </div>
          <div className="rd-training-footer">
            <div className="rd-progress-container">
              <span>Overall Completion</span>
              <span>78%</span>
            </div>
            <div className="rd-progress-bar">
              <div className="rd-progress-fill" style={{ width: '78%' }} />
            </div>
            <div className="rd-stats-grid-small">
              <div className="rd-stat-small">
                <FiClock className="rd-stat-small-icon blue" />
                <p className="rd-stat-small-label">Avg. Duration</p>
                <p className="rd-stat-small-value">3.2 weeks</p>
              </div>
              <div className="rd-stat-small">
                <FiTarget className="rd-stat-small-icon purple" />
                <p className="rd-stat-small-label">Success Rate</p>
                <p className="rd-stat-small-value">92%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resource Allocation Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rd-chart-card"
        >
          <div className="rd-card-header">
            <div className="rd-card-title-with-icon">
              <div className="rd-card-icon blue">
                <FiPieChart size={18} />
              </div>
              <div>
                <h2 className="rd-card-title">
                  Resource Allocation
                </h2>
                <p className="rd-card-subtitle">
                  Current resource allocated across various sector
                </p>
              </div>
            </div>
          </div>
          <div className="rd-chart-container">
            <ResourceAllocation />
          </div>
        </motion.div>

        {/* Skill Matrix Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="rd-chart-card"
        >
          <div className="rd-card-header">
            <div className="rd-card-title-with-icon">
              <div className="rd-card-icon purple">
                <FiBarChart2 size={18} />
              </div>
              <div>
                <h2 className="rd-card-title">
                  Team Skill Matrix
                </h2>
                <p className="rd-card-subtitle">
                  Current skill levels across key competencies
                </p>
              </div>
            </div>
          </div>
          <div className="rd-chart-container">
            <SkillMatrix />
          </div>
        </motion.div>
      </div>

      {/* Additional metrics row - spans full width below */}
      <div className="rd-metrics-grid">
        {[
          { 
            title: "Learning Hours", 
            value: "1,240", 
            change: "+12%", 
            icon: <FiClock size={20} />,
            color: "orange",
            description: "Monthly learning hours"
          },
          { 
            title: "Skill Gaps", 
            value: "23", 
            change: "-5%", 
            icon: <FiInfo size={20} />,
            color: "red",
            description: "Identified gaps"
          },
          { 
            title: "Mentorship", 
            value: "15 Pairs", 
            change: "+3 New", 
            icon: <FiUsers size={20} />,
            color: "blue",
            description: "Active mentorship pairs"
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ y: -5 }}
            className={`rd-metric-card rd-metric-${item.color}`}
          >
            <div className="rd-metric-content">
              <div>
                <p className="rd-metric-label">{item.title}</p>
                <h3 className="rd-metric-value">{item.value}</h3>
                <p className="rd-metric-description">{item.description}</p>
              </div>
              <div className={`rd-metric-icon ${item.color}`}>
                {item.icon}
              </div>
            </div>
            <div className={`rd-metric-change ${item.change.startsWith('+') ? 'positive' : 'negative'}`}>
              {item.change}
              <span className="rd-metric-change-label">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesDevelopment;