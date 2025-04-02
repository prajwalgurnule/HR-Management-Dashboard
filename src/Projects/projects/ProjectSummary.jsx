import { FiCalendar, FiFlag, FiClock, FiEdit2 } from 'react-icons/fi';
import './projectSummary.css';

const ProjectSummary = ({ project, onEditClick }) => {
  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(task => task.status === 'done').length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="summary-container">
      <div className="summary-header">
        <div>
          <h1 className="summary-title">{project.name}</h1>
          <p className="summary-description">{project.description}</p>
        </div>
        <button 
          onClick={onEditClick}
          className="edit-button"
        >
          <FiEdit2 /> Edit
        </button>
      </div>
      
      <div className="summary-meta">
        <div className="meta-item">
          <FiCalendar className="meta-icon" />
          <div>
            <p className="meta-label">Due Date</p>
            <p className="meta-value">
              {formatDate(project.dueDate)}
            </p>
          </div>
        </div>
        
        <div className={`meta-item ${project.status === 'completed' ? 'status-bg completed' : 
                         project.status === 'in progress' ? 'status-bg in-progress' : 'status-bg'}`}>
          <FiClock className="meta-icon" />
          <div>
            <p className="meta-label">Status</p>
            <p className={`meta-value ${project.status === 'completed' ? 'status-text completed' : 
                          project.status === 'in progress' ? 'status-text in-progress' : 'status-text'}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </p>
          </div>
        </div>
        
        <div className={`meta-item ${project.priority === 'high' ? 'priority-bg high' : 
                         project.priority === 'medium' ? 'priority-bg medium' : 'priority-bg low'}`}>
          <FiFlag className="meta-icon" />
          <div>
            <p className="meta-label">Priority</p>
            <p className={`meta-value ${project.priority === 'high' ? 'priority-text high' : 
                          project.priority === 'medium' ? 'priority-text medium' : 'priority-text low'}`}>
              {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="progress-container">
        <div className="progress-header">
          <span className="progress-text">Project Progress</span>
          <span className="progress-text">
            {completedTasks}/{totalTasks} tasks ({progressPercentage}%)
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className={`progress-fill ${progressPercentage === 100 ? 'completed' : 
                       progressPercentage > 0 ? 'in-progress' : 'default'}`} 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;