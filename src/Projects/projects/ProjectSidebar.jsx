import { FiClock, FiUsers } from 'react-icons/fi';
import './projectSidebar.css';

const ProjectSidebar = ({ project, teamMembers }) => {
  const calculateProgress = (project) => {
    if (!project.tasks || project.tasks.length === 0) return 0;
    const completedTasks = project.tasks.filter(task => task.status === 'done').length;
    return Math.round((completedTasks / project.tasks.length) * 100);
  };

  return (
    <div className="project-sidebar-container">
      <h2 className="sidebar-header">Project Details</h2>
      
      <div className="detail-group">
        <h3 className="detail-label">Start Date</h3>
        <p className="detail-value">{new Date(project.startDate).toLocaleDateString()}</p>
      </div>
      
      <div className="detail-group">
        <h3 className="detail-label">Due Date</h3>
        <p className="detail-value">{new Date(project.dueDate).toLocaleDateString()}</p>
      </div>
      
      <div className="detail-group">
        <h3 className="detail-label">Team Members</h3>
        <div className="team-members">
          {project.teamMembers.length > 0 ? (
            project.teamMembers.map(memberId => {
              const member = teamMembers.find(m => m.id === memberId);
              return member ? (
                <div key={member.id} className="team-member">
                  <div className="member-avatar">
                    {member.name.charAt(0)}
                  </div>
                  <div className="member-info">
                    <p className="member-name">{member.name}</p>
                    <p className="member-role">{member.role}</p>
                  </div>
                </div>
              ) : null;
            })
          ) : (
            <p className="no-members">No team members assigned</p>
          )}
        </div>
      </div>
      
      {project.tasks && project.tasks.length > 0 && (
        <div className="detail-group">
          <h3 className="detail-label">Progress</h3>
          <div className="progress-container">
            <div className="progress-header">
              <span>{calculateProgress(project)}% complete</span>
              <span>
                {project.tasks.filter(t => t.status === 'done').length}/
                {project.tasks.length} tasks
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${calculateProgress(project)}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSidebar;