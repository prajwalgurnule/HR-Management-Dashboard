import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { FiAward, FiClock, FiUsers, FiTrendingUp, FiHelpCircle } from 'react-icons/fi';
import './TrainingProgress.css';

const TrainingProgress = () => {
  const [expandedProgram, setExpandedProgram] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const programs = [
    {
      id: 1,
      name: 'AI Fundamentals',
      progress: 82,
      participants: 45,
      duration: '8 weeks',
      startDate: 'Jan 15, 2023',
      instructor: 'Dr. Sarah Chen',
      trendData: [30, 40, 55, 60, 70, 75, 82],
      icon: <FiAward className="program-icon purple" />,
      colorClass: 'purple'
    },
    {
      id: 2,
      name: 'Leadership 2023',
      progress: 65,
      participants: 28,
      duration: '12 weeks',
      startDate: 'Feb 1, 2023',
      instructor: 'Mark Johnson',
      trendData: [10, 20, 30, 45, 55, 60, 65],
      icon: <FiUsers className="program-icon blue" />,
      colorClass: 'blue'
    },
    {
      id: 3,
      name: 'Cloud Certification',
      progress: 93,
      participants: 32,
      duration: '6 weeks',
      startDate: 'Mar 5, 2023',
      instructor: 'Alex Rodriguez',
      trendData: [40, 60, 70, 80, 85, 90, 93],
      icon: <FiClock className="program-icon green" />,
      colorClass: 'green'
    }
  ];

  const getProgressColor = (progress) => {
    if (progress > 75) return 'high';
    if (progress > 50) return 'medium';
    return 'low';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="training-progress-container"
    >
      <div className="header">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="info-button"
          onClick={() => setShowInfo(!showInfo)}
        >
          <FiHelpCircle size={20} />
        </motion.button>
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="info-tooltip"
          >
            <p>Current status of active training programs</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="programs-list">
        {programs.map((program) => (
          <motion.div
            key={program.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`program-card ${expandedProgram === program.id ? 'expanded' : ''}`}
          >
            <div 
              className="program-summary"
              onClick={() => setExpandedProgram(expandedProgram === program.id ? null : program.id)}
            >
              <div className="program-info">
                <div className={`program-icon-container ${program.colorClass}`}>
                  {program.icon}
                </div>
                <div className="program-details">
                  <h4 className="program-name">{program.name}</h4>
                  <div className="program-meta">
                    <p className="program-duration">{program.duration}</p>
                    <span className={`progress-percent ${getProgressColor(program.progress)}`}>
                      {program.progress}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="sparkline-container">
                <Sparklines data={program.trendData} width={120} height={30}>
                  <SparklinesLine 
                    color={getProgressColor(program.progress) === 'high' ? '#4ade80' : 
                          getProgressColor(program.progress) === 'medium' ? '#60a5fa' : '#f59e0b'} 
                    style={{ strokeWidth: 3 }}
                  />
                </Sparklines>
              </div>
            </div>

            <AnimatePresence>
              {expandedProgram === program.id && (
                <motion.div
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="program-details-expanded"
                >
                  <div className="details-grid">
                    <div className="detail-item">
                      <p className="detail-label">Participants</p>
                      <p className="detail-value">{program.participants}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">Start Date</p>
                      <p className="detail-value">{program.startDate}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">Instructor</p>
                      <p className="detail-value">{program.instructor}</p>
                    </div>
                    <div className="detail-item">
                      <p className="detail-label">Completion</p>
                      <div className="progress-bar-container">
                        <div 
                          className={`progress-bar ${getProgressColor(program.progress)}`}
                          style={{ width: `${program.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TrainingProgress;