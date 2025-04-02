import { useState } from 'react';
import './taskForm.css';

const TaskForm = ({ 
  taskForm, 
  teamMembers, 
  onSubmit, 
  onCancel, 
  onChange 
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...taskForm, [name]: value });
  };

  return (
    <div className="task-form-container">
      <h2 className="task-form-title">Create New Task</h2>
      
      <form onSubmit={onSubmit} className="task-form">
        <div className="form-group">
          <label className="form-label">Task Title <span className="required">*</span></label>
          <input
            type="text"
            name="title"
            value={taskForm.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter task title"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={taskForm.description}
            onChange={handleChange}
            className="form-textarea"
            rows="4"
            placeholder="Describe the task details..."
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Assignee <span className="required">*</span></label>
          <select
            name="assignee"
            value={taskForm.assignee}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select team member</option>
            {teamMembers.map(member => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.role}) - {member.email}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              name="status"
              value={taskForm.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="todo">To Do</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={taskForm.dueDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;


// -----------------------
