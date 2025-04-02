import { FiPlus } from 'react-icons/fi';
import './taskList.css';

const TaskList = ({ 
  tasks, 
  teamMembers, 
  onStatusChange, 
  onAddTask 
}) => {
  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2 className="task-list-title">Tasks</h2>
        <button 
          onClick={onAddTask}
          className="add-task-button"
        >
          <FiPlus /> Add Task
        </button>
      </div>
      
      {tasks.length > 0 ? (
        <div className="tasks-list">
          {tasks.map(task => (
            <div key={task.id} className="task-item">
              <div className="task-header">
                <div>
                  <h3 className="task-title">{task.title}</h3>
                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}
                </div>
                <select
                  value={task.status}
                  onChange={(e) => onStatusChange(task.id, e.target.value)}
                  className={`task-status ${task.status.replace(' ', '-')}`}
                >
                  <option value="todo">To Do</option>
                  <option value="in progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              
              <div className="task-footer">
                <div>
                  {task.assignee && (
                    <span>
                      Assigned to: {teamMembers.find(m => m.id === task.assignee)?.name || 'Unassigned'}
                    </span>
                  )}
                </div>
                <div>
                  {task.dueDate && (
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-tasks">No tasks yet. Add your first task!</p>
      )}
    </div>
  );
};

export default TaskList;