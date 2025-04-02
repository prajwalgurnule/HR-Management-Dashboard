import { FiClock, FiUsers } from 'react-icons/fi';
import './projectCard.css';

const ProjectCard = ({ project, teamMembers, onClick }) => {
  const calculateProgress = (project) => {
    if (!project.tasks || project.tasks.length === 0) return 0;
    const completedTasks = project.tasks.filter(task => task.status === 'done').length;
    return Math.round((completedTasks / project.tasks.length) * 100);
  };

  return (
    <div 
      className="project-card"
      onClick={onClick}
    >
      <div className="project-card-header">
        <h2 className="project-name">{project.name}</h2>
        <span className={`project-status ${project.status.replace(' ', '-')}`}>
          {project.status}
        </span>
      </div>
      
      <p className="project-description">{project.description}</p>
      
      <div className="project-meta">
        <FiClock className="project-meta-icon" />
        <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
      </div>
      
      <div className="project-meta">
        <FiUsers className="project-meta-icon" />
        <span>
          Team: {project.teamMembers.length} member{project.teamMembers.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {project.tasks && project.tasks.length > 0 && (
        <div className="project-progress-container">
          <div className="project-progress-header">
            <span>Progress</span>
            <span>{calculateProgress(project)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${calculateProgress(project)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;