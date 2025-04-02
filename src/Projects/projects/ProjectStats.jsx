import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';
import './projectStats.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProjectStats = ({ projects }) => {
  const [activeSegment, setActiveSegment] = useState(null);

  const statusColors = {
    'not started': {
      normal: '#FF6B6B', // Bright Coral Red
      hover: '#FF5252',
      border: '#E63946'
    },
    'in progress': {
      normal: '#FFD93D', // Vibrant Yellow
      hover: '#FFC107',
      border: '#FFB703'
    },
    'completed': {
      normal: '#6BCB77', // Fresh Green
      hover: '#28A745',
      border: '#1B9C85'
    }
  };

  const priorityColors = {
    'low': {
      normal: '#4D96FF', // Cool Blue
      hover: '#0066CC',
      border: '#0052A3'
    },
    'medium': {
      normal: '#FF66C4', // Vivid Pink
      hover: '#FF3399',
      border: '#E60073'
    },
    'high': {
      normal: '#A459D1', // Rich Purple
      hover: '#8338EC',
      border: '#6200EA'
    }
  };

  const getStatusData = () => {
    const statusCounts = {
      'not started': 0,
      'in progress': 0,
      'completed': 0
    };

    projects.forEach(project => {
      statusCounts[project.status]++;
    });

    return {
      labels: ['Not Started', 'In Progress', 'Completed'],
      datasets: [
        {
          label: 'Projects by Status',
          data: Object.values(statusCounts),
          backgroundColor: Object.keys(statusCounts).map(status => statusColors[status].normal),
          borderColor: Object.keys(statusCounts).map(status => statusColors[status].border),
          borderWidth: 2,
          hoverBackgroundColor: Object.keys(statusCounts).map(status => statusColors[status].hover),
          hoverBorderWidth: 3,
        },
      ],
    };
  };

  const getPriorityData = () => {
    const priorityCounts = {
      'low': 0,
      'medium': 0,
      'high': 0
    };

    projects.forEach(project => {
      priorityCounts[project.priority]++;
    });

    return {
      labels: ['Low', 'Medium', 'High'],
      datasets: [
        {
          label: 'Projects by Priority',
          data: Object.values(priorityCounts),
          backgroundColor: Object.keys(priorityCounts).map(priority => priorityColors[priority].normal),
          borderColor: Object.keys(priorityCounts).map(priority => priorityColors[priority].border),
          borderWidth: 2,
          hoverBackgroundColor: Object.keys(priorityCounts).map(priority => priorityColors[priority].hover),
          hoverBorderWidth: 3,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 13,
            weight: 'bold'
          },
          color: '#111827'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        },
        displayColors: true,
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        cornerRadius: 8,
        bodyColor: '#fff',
        titleColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h2 className="stat-header">Projects by Status</h2>
        <div className="chart-container">
          <Doughnut 
            id="status-chart"
            data={getStatusData()} 
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  display: true,
                  text: 'Status Distribution',
                  font: {
                    size: 16,
                    weight: 'bold'
                  },
                  padding: {
                    bottom: 20
                  },
                  color: '#111827'
                }
              }
            }} 
          />
          <div className="center-label">
            <p className="center-count">
              {projects.length}
            </p>
            <p className="center-text">TOTAL PROJECTS</p>
          </div>
        </div>
      </div>
      <div className="stat-card">
        <h2 className="stat-header">Projects by Priority</h2>
        <div className="chart-container">
          <Pie 
            id="priority-chart"
            data={getPriorityData()} 
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  display: true,
                  text: 'Priority Distribution',
                  font: {
                    size: 16,
                    weight: 'bold'
                  },
                  padding: {
                    bottom: 20
                  },
                  color: '#111827'
                }
              }
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;
