import React, { useState } from 'react';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTarget, FiHelpCircle } from 'react-icons/fi';
import './SkillMatrix.css';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const SkillMatrix = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const skills = ['React', 'Node.js', 'UI/UX', 'Python', 'DevOps', 'AI/ML'];
  const skillLevels = [85, 70, 65, 60, 55, 50];

  const data = {
    labels: skills,
    datasets: [{
      data: skillLevels,
      backgroundColor: [
        'rgba(101, 116, 255, 0.6)',
        'rgba(50, 205, 154, 0.6)',
        'rgba(255, 159, 67, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(75, 192, 192, 0.6)'
      ],
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.8)'
    }]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="sm-container"
    >
      <div className="sm-header">
        {/* <div className="sm-title-container">
          <div className="sm-icon-container">
            <FiTarget className="sm-icon" />
          </div>
          <h3 className="sm-title">Skill Matrix</h3>
        </div> */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="sm-info-button"
          onClick={() => setShowInfo(!showInfo)}
        >
          <FiHelpCircle className="sm-info-icon" />
        </motion.button>
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="sm-tooltip"
          >
            Team proficiency levels across key technical skills
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sm-chart-container">
        <div className="sm-chart-wrapper">
          <PolarArea 
            data={data} 
            options={{
              plugins: {
                legend: { display: false },
                tooltip: {
                  enabled: false,
                  external: (context) => {
                    setActiveSkill(context.tooltip.dataPoints?.[0]?.dataIndex ?? null);
                  }
                }
              },
              scales: {
                r: {
                  angleLines: { display: true, color: 'rgba(0, 0, 0, 0.05)' },
                  suggestedMin: 0,
                  suggestedMax: 100,
                  ticks: { display: false, stepSize: 20 },
                  grid: { color: 'rgba(0, 0, 0, 0.05)' }
                }
              },
              elements: {
                arc: {
                  borderWidth: 0
                }
              }
            }} 
          />
        </div>

        <AnimatePresence>
          {activeSkill !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="sm-active-skill"
            >
              <div className="sm-skill-value">
                {skillLevels[activeSkill]}%
              </div>
              <div className="sm-skill-name">
                {skills[activeSkill]}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="sm-skills-container">
        {skills.map((label, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`sm-skill-button ${activeSkill === index ? 'sm-skill-button-active' : ''}`}
            onClick={() => setActiveSkill(index)}
          >
            {label}
          </motion.button>
        ))}
      </div>

      <div className="sm-levels-container">
        <div className="sm-level">
          <div className="sm-level-marker red"></div>
          <span>0-40%</span>
        </div>
        <div className="sm-level">
          <div className="sm-level-marker yellow"></div>
          <span>40-70%</span>
        </div>
        <div className="sm-level">
          <div className="sm-level-marker green"></div>
          <span>70-100%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillMatrix;