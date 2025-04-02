import { useState } from 'react';
import './projectForm.css';

const ProjectForm = ({ 
  projectForm, 
  teamMembers, 
  onSubmit, 
  onCancel, 
  onChange 
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...projectForm, [name]: value });
  };

  const handleMemberToggle = (memberId) => {
    const updatedMembers = projectForm.teamMembers.includes(memberId)
      ? projectForm.teamMembers.filter(id => id !== memberId)
      : [...projectForm.teamMembers, memberId];
    onChange({ ...projectForm, teamMembers: updatedMembers });
  };

  return (
    <div className="project-form-container">
      <h2 className="project-form-title">
        {projectForm.id ? 'Edit Project' : 'Create New Project'}
      </h2>
      
      <form onSubmit={onSubmit} className="project-form">
        <div className="form-content">
          <div className="form-group">
            <label className="form-label">
              Project Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={projectForm.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter project name"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={projectForm.description}
              onChange={handleChange}
              className="form-textarea"
              rows="4"
              placeholder="Describe the project goals and scope..."
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={projectForm.startDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={projectForm.dueDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={projectForm.status}
                onChange={handleChange}
                className="form-select"
              >
                <option value="not started">Not Started</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                name="priority"
                value={projectForm.priority}
                onChange={handleChange}
                className="form-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Team Members</label>
            <div className="team-members-grid">
              {teamMembers.map(member => (
                <div key={member.id} className="team-member-item">
                  <input
                    type="checkbox"
                    id={`member-${member.id}`}
                    checked={projectForm.teamMembers.includes(member.id)}
                    onChange={() => handleMemberToggle(member.id)}
                    className="team-member-checkbox"
                  />
                  <label htmlFor={`member-${member.id}`} className="team-member-label">
                    <span className="member-name">{member.name}                 </span>
                    <span className="member-role">{member.role}</span>
                    {/* <span className="member-email">{member.email}</span> */}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {projectForm.id ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;