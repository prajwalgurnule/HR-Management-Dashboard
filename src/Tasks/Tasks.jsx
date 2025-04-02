import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiPlus, FiSearch, FiFilter, FiList, FiGrid, FiColumns, 
  FiCalendar, FiEdit2, FiTrash2, FiCheck, FiClock, FiX,
  FiUser, FiChevronDown, FiChevronUp, FiMoreHorizontal
} from 'react-icons/fi';
import './Tasks.css';

const Tasks = () => {
  const [userData, setUserData] = useState({
    name: 'Arjun Patel',
    email: 'john.doe@example.com',
    department: 'HR Department',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Task-related states
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'New Requests',
    priority: 'Medium',
    dueDate: '',
    assignee: ''
  });
  const [viewMode, setViewMode] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample tasks data
  useEffect(() => {
    const sampleTasks = [
      { 
        id: 1, 
        title: 'Complete HR report', 
        description: 'Prepare monthly HR performance report for leadership review. Include metrics on hiring, retention, and employee satisfaction.', 
        status: 'New Requests', 
        priority: 'High', 
        dueDate: '2025-03-15', 
        assignee: 'Arjun Patel',
        createdAt: '2025-03-01'
      },
      { 
        id: 2, 
        title: 'Process employee payroll', 
        description: 'Calculate and distribute salaries for all employees. Verify overtime hours and bonus payments.', 
        status: 'In Progress', 
        priority: 'Critical', 
        dueDate: '2025-03-31', 
        assignee: 'Priya Sharma',
        createdAt: '2025-02-28'
      },
      { 
        id: 3, 
        title: 'Onboard new hires', 
        description: 'Complete paperwork and orientation for 5 new employees starting next week.', 
        status: 'New Requests', 
        priority: 'Medium', 
        dueDate: '2025-03-29', 
        assignee: 'Rahul Gupta',
        createdAt: '2025-03-02'
      },
      { 
        id: 4, 
        title: 'Update employee handbook', 
        description: 'Revise policies for remote work arrangements and update the digital version on the company portal.', 
        status: 'New Requests', 
        priority: 'Medium', 
        dueDate: '2025-03-20', 
        assignee: 'Ananya Reddy',
        createdAt: '2025-02-25'
      },
      { 
        id: 5, 
        title: 'Schedule performance reviews', 
        description: 'Coordinate manager-employee evaluation meetings for Q1 2025.', 
        status: 'In Progress', 
        priority: 'High', 
        dueDate: '2025-03-10', 
        assignee: 'Vikram Singh',
        createdAt: '2025-02-20'
      },
      { 
        id: 6, 
        title: 'Renew health insurance', 
        description: 'Finalize benefits package with provider and communicate changes to employees.', 
        status: 'Completed', 
        priority: 'Critical', 
        dueDate: '2025-03-30', 
        assignee: 'Meera Joshi',
        createdAt: '2025-02-15'
      },
      { 
        id: 7, 
        title: 'Plan team building event', 
        description: 'Organize quarterly offsite activity for the HR department (50 people).', 
        status: 'New Requests', 
        priority: 'Low', 
        dueDate: '2025-03-25', 
        assignee: 'Aditya Kumar',
        createdAt: '2025-03-03'
      },
      { 
        id: 8, 
        title: 'Audit training records', 
        description: 'Verify compliance training completion for all employees and follow up with those missing requirements.', 
        status: 'In Progress', 
        priority: 'Medium', 
        dueDate: '2025-03-12', 
        assignee: 'Neha Iyer',
        createdAt: '2025-02-22'
      },
      { 
        id: 9, 
        title: 'Implement HR software', 
        description: 'Migrate employee data to new platform and train team members on new system.', 
        status: 'New Requests', 
        priority: 'High', 
        dueDate: '2025-03-30', 
        assignee: 'IT Team',
        createdAt: '2025-03-01'
      },
      { 
        id: 10, 
        title: 'Conduct exit interviews', 
        description: 'Document feedback from 3 departing employees and prepare summary report.', 
        status: 'Completed', 
        priority: 'Medium', 
        dueDate: '2025-03-03', 
        assignee: 'Deepika Nair',
        createdAt: '2025-02-28'
      }
    ];
    
    setTasks(sampleTasks);
  }, []);

  // Handle logout
  const handleLogout = () => {
    navigate('/login');
  };

  // Filter and group tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filterDate ? task.dueDate === filterDate : true;
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'my-tasks' && task.assignee === userData.name) ||
                         (activeFilter === 'high-priority' && (task.priority === 'High' || task.priority === 'Critical')) ||
                         (activeFilter === 'overdue' && new Date(task.dueDate) < new Date() && task.status !== 'Completed');
    
    return matchesSearch && matchesDate && matchesFilter;
  });

  const groupedTasks = {
    'New Requests': filteredTasks.filter(task => task.status === 'New Requests'),
    'In Progress': filteredTasks.filter(task => task.status === 'In Progress'),
    'Completed': filteredTasks.filter(task => task.status === 'Completed'),
  };

  // Task CRUD operations
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTaskWithId = { 
      ...newTask, 
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks([...tasks, newTaskWithId]);
    setNewTask({
      title: '',
      description: '',
      status: 'New Requests',
      priority: 'Medium',
      dueDate: '',
      assignee: ''
    });
    setShowTaskModal(false);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskExpand = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading your tasks...</div>
      </div>
    );
  }

  return (
    <div className="tasks-container">
      {/* Main Content */}
      <div className="main-content">
        {/* Task Management Content */}
        <div className="tasks-content">
          <div className="tasks-inner">
            {/* Header with controls */}
            <div className="tasks-header">
              <div className="header-left">
                <h2>
                  Task Management
                  {userData?.department && (
                    <span className="department-text">
                      {userData.department}
                    </span>
                  )}
                </h2>
                <div className="quick-filters">
                  <button 
                    className={`quick-filter ${activeFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('all')}
                  >
                    All Tasks
                  </button>
                  <button 
                    className={`quick-filter ${activeFilter === 'high-priority' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('high-priority')}
                  >
                    High Priority
                  </button>
                  <button 
                    className={`quick-filter ${activeFilter === 'overdue' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('overdue')}
                  >
                    Overdue
                  </button>
                  {/* <button 
                    className={`quick-filter ${activeFilter === 'my-tasks' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('my-tasks')}
                  >
                    My Tasks
                  </button> */}
                </div>
              </div>
              
              <div className="header-right">
                <div className="search-filters">
                  {/* Search bar */}
                  <div className="search-bar">
                    <FiSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  {/* Date filter */}
                  <div className="date-filter">
                    <FiCalendar className="filter-icon" />
                    <input
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* <div className="user-profile" onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}>
                  <img src={userData.avatar} alt="User" className="user-avatar" />
                  <span className="user-name">{userData.name}</span>
                  {isProfileModalOpen ? <FiChevronUp /> : <FiChevronDown />} */}
                  
                  {/* {isProfileModalOpen && (
                    <div className="profile-dropdown">
                      <div className="profile-info">
                        <img src={userData.avatar} alt="User" className="dropdown-avatar" />
                        <div>
                          <div className="dropdown-name">{userData.name}</div>
                          <div className="dropdown-email">{userData.email}</div>
                          <div className="dropdown-department">{userData.department}</div>
                        </div>
                      </div>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Log Out
                      </button>
                    </div>
                  )} 
                </div> */}
              </div>
            </div>

            {/* Controls row */}
            <div className="controls-row">
              {/* View mode toggle */}
              <div className="view-toggle">
                
                <button 
                  onClick={() => setViewMode('table')}
                  className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                  title="Table View"
                >
                  <FiList />
                  <span>Table</span>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  title="List View"
                >
                  <FiGrid />
                  <span>List</span>
                </button>
                <button 
                  onClick={() => setViewMode('kanban')}
                  className={`view-btn ${viewMode === 'kanban' ? 'active' : ''}`}
                  title="Kanban View"
                >
                  <FiColumns />
                  <span>Kanban</span>
                </button>
              </div>
              
              {/* Add task button */}
              <button
                onClick={() => setShowTaskModal(true)}
                className="add-task-btn"
              >
                <FiPlus /> Create Task
              </button>
            </div>
            
            {/* Stats Cards */}
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-value">{groupedTasks['New Requests'].length}</div>
                <div className="stat-label">New Requests</div>
                <div className="stat-icon new-requests">
                  <FiClock />
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{groupedTasks['In Progress'].length}</div>
                <div className="stat-label">In Progress</div>
                <div className="stat-icon in-progress">
                  <FiEdit2 />
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{groupedTasks['Completed'].length}</div>
                <div className="stat-label">Completed</div>
                <div className="stat-icon completed">
                  <FiCheck />
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  {filteredTasks.filter(task => 
                    new Date(task.dueDate) < new Date() && task.status !== 'Completed'
                  ).length}
                </div>
                <div className="stat-label">Overdue</div>
                <div className="stat-icon overdue">
                  <FiX />
                </div>
              </div>
            </div>
            
            {/* Task display area */}
            <div className="tasks-display">
              {viewMode === 'table' && (
                <div className="table-view">
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Assignee</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Days Left</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTasks.length > 0 ? (
                        filteredTasks.map(task => (
                          <tr key={task.id} className={expandedTaskId === task.id ? 'expanded' : ''}>
                            <td>
                              <div className="task-title" onClick={() => toggleTaskExpand(task.id)}>
                                {task.title}
                                {expandedTaskId === task.id ? <FiChevronUp /> : <FiChevronDown />}
                              </div>
                              {expandedTaskId === task.id && (
                                <div className="task-description">
                                  {task.description}
                                  <div className="task-meta">
                                    <span>Created: {task.createdAt}</span>
                                    <span>Assignee: {task.assignee}</span>
                                  </div>
                                </div>
                              )}
                            </td>
                            <td>
                              <div className="assignee-cell">
                                <FiUser className="assignee-icon" />
                                {task.assignee}
                              </div>
                            </td>
                            <td>
                              <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
                                {task.status}
                              </span>
                            </td>
                            <td>
                              <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                                {task.priority}
                              </span>
                            </td>
                            <td>{task.dueDate}</td>
                            <td>
                              <span className={`days-left ${getDaysRemaining(task.dueDate) <= 0 ? 'overdue' : ''}`}>
                                {getDaysRemaining(task.dueDate) <= 0 ? 
                                  'Overdue' : 
                                  `${getDaysRemaining(task.dueDate)} days`}
                              </span>
                            </td>
                            <td className="actions-cell">
                              <div className="action-buttons">
                                <button 
                                  onClick={() => updateTaskStatus(task.id, 'In Progress')}
                                  className="action-btn start-btn"
                                  disabled={task.status === 'In Progress'}
                                  title="Start Task"
                                >
                                  <FiClock />
                                </button>
                                <button 
                                  onClick={() => updateTaskStatus(task.id, 'Completed')}
                                  className="action-btn complete-btn"
                                  disabled={task.status === 'Completed'}
                                  title="Complete Task"
                                >
                                  <FiCheck />
                                </button>
                                <button 
                                  onClick={() => deleteTask(task.id)}
                                  className="action-btn delete-btn"
                                  title="Delete Task"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="no-tasks-row">
                          <td colSpan="7">
                            <div className="empty-state">
                              <img src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" alt="No tasks" />
                              <h3>No tasks found</h3>
                              <p>Try adjusting your search or create a new task</p>
                              <button 
                                onClick={() => setShowTaskModal(true)}
                                className="add-task-btn"
                              >
                                <FiPlus /> Create Task
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              
              {viewMode === 'kanban' && (
                <div className="kanban-view">
                  {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className="kanban-column">
                      <div className="column-header-container">
                        <h3 className={`column-header ${status.toLowerCase().replace(' ', '-')}`}>
                          <span className="status-indicator"></span>
                          {status} <span className="task-count">({tasks.length})</span>
                        </h3>
                        <button className="column-menu">
                          <FiMoreHorizontal />
                        </button>
                      </div>
                      <div className="kanban-cards">
                        {tasks.length > 0 ? (
                          tasks.map(task => (
                            <div key={task.id} className="task-card">
                              <div className="task-card-header">
                                <div>
                                  <h4>{task.title}</h4>
                                  {/* <p>{task.description.length > 100 ? 
                                    `${task.description.substring(0, 100)}...` : 
                                    task.description}</p> */}
                                </div>
                              </div>
                              <div className="task-card-footer">
                                <span className={`priority-label ${task.priority.toLowerCase()}`}>
                                  {task.priority}
                                </span>
                                <div className="task-meta">
                                  <span className="due-date">
                                    <FiCalendar /> {task.dueDate}
                                  </span>
                                  <span className={`days-left ${getDaysRemaining(task.dueDate) <= 0 ? 'overdue' : ''}`}>
                                    {getDaysRemaining(task.dueDate) <= 0 ? 
                                      'Overdue' : 
                                      `${getDaysRemaining(task.dueDate)} days left`}
                                  </span>
                                </div>
                              </div>
                              <div className="assignee">
                                <FiUser className="assignee-icon" />
                                {task.assignee}
                              </div>
                              <div className="task-actions">
                                {status !== 'New Requests' && (
                                  <button 
                                    onClick={() => updateTaskStatus(task.id, 'New Requests')}
                                    className="action-btn reset-btn"
                                  >
                                    Reset
                                  </button>
                                )}
                                <div className="status-actions">
                                  {status !== 'In Progress' && (
                                    <button 
                                      onClick={() => updateTaskStatus(task.id, 'In Progress')}
                                      className="action-btn start-btn"
                                    >
                                      Start
                                    </button>
                                  )}
                                  {status !== 'Completed' && (
                                    <button 
                                      onClick={() => updateTaskStatus(task.id, 'Completed')}
                                      className="action-btn complete-btn"
                                    >
                                      Complete
                                    </button>
                                  )}
                                  <button 
                                  onClick={() => deleteTask(task.id)}
                                  className="delete-card-btn"
                                  title="Delete Task"
                                >
                                  <FiTrash2 />
                                </button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="empty-column">
                            <img src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" alt="No tasks" width="60" />
                            <p>No tasks in this status</p>
                            <button 
                              onClick={() => {
                                setNewTask(prev => ({ ...prev, status }));
                                setShowTaskModal(true);
                              }}
                              className="add-task-btn small"
                            >
                              <FiPlus /> Add Task
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {viewMode === 'list' && (
                <div className="list-view">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                      <div key={task.id} className="list-task-card">
                        <div className="list-task-main" onClick={() => toggleTaskExpand(task.id)}>
                          <div className="list-task-header">
                            <div>
                              <h4>{task.title}</h4>
                              <div className="task-meta">
                                <span className={`priority-label ${task.priority.toLowerCase()}`}>
                                  {task.priority}
                                </span>
                                <span className="due-date">
                                  <FiCalendar /> Due: {task.dueDate}
                                </span>
                                <span className={`days-left ${getDaysRemaining(task.dueDate) <= 0 ? 'overdue' : ''}`}>
                                  {getDaysRemaining(task.dueDate) <= 0 ? 
                                    'Overdue' : 
                                    `${getDaysRemaining(task.dueDate)} days left`}
                                </span>
                              </div>
                            </div>
                            <div className="list-task-status">
                              <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
                                {task.status}
                              </span>
                              {expandedTaskId === task.id ? <FiChevronUp /> : <FiChevronDown />}
                            </div>
                          </div>
                          <div className="assignee">
                            <FiUser className="assignee-icon" />
                            {task.assignee}
                          </div>
                        </div>
                        
                        {expandedTaskId === task.id && (
                          <div className="list-task-details">
                            <div className="task-description">
                              <h5>Description</h5>
                              <p>{task.description}</p>
                            </div>
                            <div className="additional-info">
                              <div>
                                <h5>Created</h5>
                                <p>{task.createdAt}</p>
                              </div>
                              <div>
                                <h5>Last Updated</h5>
                                <p>{task.dueDate}</p>
                              </div>
                            </div>
                            <div className="list-task-actions">
                              {task.status !== 'New Requests' && (
                                <button 
                                  onClick={() => updateTaskStatus(task.id, 'New Requests')}
                                  className="action-btn reset-btn"
                                >
                                  Reset
                                </button>
                              )}
                              {task.status !== 'In Progress' && (
                                <button 
                                  onClick={() => updateTaskStatus(task.id, 'In Progress')}
                                  className="action-btn start-btn"
                                >
                                  Start
                                </button>
                              )}
                              {task.status !== 'Completed' && (
                                <button 
                                  onClick={() => updateTaskStatus(task.id, 'Completed')}
                                  className="action-btn complete-btn"
                                >
                                  Complete
                                </button>
                              )}
                              <button 
                                onClick={() => deleteTask(task.id)}
                                className="action-btn delete-btn"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      <img src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" alt="No tasks" />
                      <h3>No tasks match your criteria</h3>
                      <p>Try adjusting your filters or create a new task</p>
                      <button 
                        onClick={() => setShowTaskModal(true)}
                        className="add-task-btn"
                      >
                        <FiPlus /> Create Task
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="task-modal-overlay">
          <div className="task-modal">
            <div className="modal-header">
              <h3>Create New Task</h3>
              <button 
                onClick={() => setShowTaskModal(false)} 
                className="close-modal-btn"
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={handleAddTask}>
              <div className="modal-form">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter task title"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Describe the task details..."
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={newTask.status}
                      onChange={handleInputChange}
                    >
                      <option value="New Requests">New Requests</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Priority</label>
                    <select
                      name="priority"
                      value={newTask.priority}
                      onChange={handleInputChange}
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Due Date</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={newTask.dueDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="form-group">
                    <label>Assignee</label>
                    <input
                      type="text"
                      name="assignee"
                      value={newTask.assignee}
                      onChange={handleInputChange}
                      placeholder="Enter assignee name"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;