import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHelpCircle, FiDollarSign } from 'react-icons/fi';
import './ResourceAllocation.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const ResourceAllocation = () => {
  const [activeSegment, setActiveSegment] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const data = {
    labels: ['R&D Team', 'Training', 'Equipment', 'Software', 'Facilities'],
    datasets: [{
      data: [30, 25, 20, 15, 10],
      backgroundColor: [
        'rgba(101, 116, 255, 0.8)',
        'rgba(50, 205, 154, 0.8)',
        'rgba(255, 159, 67, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(153, 102, 255, 0.8)'
      ],
      borderWidth: 0,
      hoverOffset: 20,
      hoverBorderWidth: 3,
      hoverBorderColor: '#fff'
    }]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="ra-container"
    >
      <div className="ra-header">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="ra-info-button"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <FiHelpCircle className="ra-info-icon" />
        </motion.button>
      </div>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="ra-tooltip"
          >
            Budget distribution across departments and resources
          </motion.div>
        )}
      </AnimatePresence>

      <div className="ra-chart-container">
        <div className="ra-chart-wrapper">
          <Pie 
            data={data} 
            options={{
              plugins: {
                legend: { display: false },
                tooltip: {
                  enabled: false,
                  external: (context) => {
                    setActiveSegment(context.tooltip.dataPoints?.[0]?.dataIndex ?? null);
                  }
                }
              },
              cutout: '70%',
              onHover: (event, chartElement) => {
                if (chartElement.length) {
                  setActiveSegment(chartElement[0].index);
                } else {
                  setActiveSegment(null);
                }
              }
            }} 
          />
        </div>
        
        <div className="ra-chart-center">
          <div className="ra-center-content">
            <div className="ra-budget-label">
              <FiDollarSign className="ra-dollar-icon" />
              <span>Total Budget</span>
            </div>
            <div className="ra-budget-value">$2.8M</div>
            {activeSegment !== null && (
              <div className="ra-active-segment">
                {data.labels[activeSegment]} • {data.datasets[0].data[activeSegment]}%
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="ra-legend">
        {data.labels.map((label, index) => (
          <motion.button
            key={index}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className={`ra-legend-item ${activeSegment === index ? 'ra-legend-item-active' : ''}`}
            onClick={() => setActiveSegment(index)}
          >
            <span 
              className="ra-legend-marker"
              style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
            />
            <span className="ra-legend-label">{label}</span>
            <span className="ra-legend-percent">
              {data.datasets[0].data[index]}%
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ResourceAllocation;