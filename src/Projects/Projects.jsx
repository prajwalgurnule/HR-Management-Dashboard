import { useState, useEffect } from 'react';
import { FiFolder, FiPlus } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import ProjectCard from './projects/ProjectCard';
import ProjectStats from './projects/ProjectStats';
import ProjectForm from './projects/ProjectForm';
import TaskList from './projects/TaskList';
import TaskForm from './projects/TaskForm';
import ProjectSidebar from './projects/ProjectSidebar';
import CommentsSection from './projects/CommentsSection';
import AttachmentsSection from './projects/AttachmentsSection';
import ProjectSummary from './projects/ProjectSummary';
import './Projects.css';

// Initialize EmailJS with your public key
emailjs.init('yUPWlLVTgQSymclA1');

// Local storage keys
const STORAGE_KEY = 'projectsAppData';

const Projects = () => {
  // State management
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailError, setEmailError] = useState(null);

  // Form states
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    startDate: '',
    dueDate: '',
    status: 'not started',
    priority: 'medium',
    teamMembers: []
  });

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    assignee: '',
    status: 'todo',
    dueDate: ''
  });

  // Team members data with verified emails
  const teamMembers = [
    { id: 1, name: 'Prajwal Gurnule', role: 'Developer', email: 'iamprajwalgurnule@gmail.com' },
    { id: 2, name: 'Jane Smith', role: 'Designer', email: 'jane.smith@example.com' },
    { id: 3, name: 'Alice Jones', role: 'Project Manager', email: 'alice.jones@example.com' },
    { id: 4, name: 'Bob Williams', role: 'Business Analyst', email: 'bob.williams@example.com' },
    { id: 5, name: 'Charlie Brown', role: 'Developer/Designer', email: 'charlie.brown@example.com' }
  ];

  // Load data from local storage
  useEffect(() => {
    const loadData = () => {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          if (parsedData.projects && Array.isArray(parsedData.projects)) {
            setProjects(parsedData.projects);
          }
        } else {
          // Load sample data if no saved data exists
          const sampleProjects = [
            {
              id: 1,
              name: 'Website Redesign',
              description: 'Complete redesign of company website with modern UI/UX',
              startDate: '2023-06-01',
              dueDate: '2023-08-15',
              status: 'in progress',
              priority: 'high',
              teamMembers: [1, 2],
              tasks: [
                { id: 1, title: 'Design Homepage', status: 'done', assignee: 2, dueDate: '2023-06-10' },
                { id: 2, title: 'Develop Contact Form', status: 'in progress', assignee: 1, dueDate: '2023-06-20' }
              ],
              comments: [
                { id: 1, author: 1, text: 'Started working on the contact form', date: '2023-06-05' }
              ],
              attachments: [
                { id: 1, name: 'Design Mockup', type: 'image', url: '#', uploadDate: '2023-06-02' }
              ]
            },
            {
              id: 2,
              name: 'Mobile App Development',
              description: 'Build cross-platform mobile application for iOS and Android',
              startDate: '2023-07-01',
              dueDate: '2023-10-30',
              status: 'not started',
              priority: 'medium',
              teamMembers: [1, 3],
              tasks: [],
              comments: [],
              attachments: []
            },
            {
              id: 3,
              name: 'Marketing Campaign',
              description: 'Q3 marketing campaign for new product launch',
              startDate: '2023-05-15',
              dueDate: '2023-06-30',
              status: 'completed',
              priority: 'high',
              teamMembers: [2, 3],
              tasks: [
                { id: 1, title: 'Create Ad Designs', status: 'done', assignee: 2, dueDate: '2023-05-25' },
                { id: 2, title: 'Write Copy', status: 'done', assignee: 3, dueDate: '2023-05-20' },
                { id: 3, title: 'Launch Campaign', status: 'done', assignee: 3, dueDate: '2023-06-01' }
              ],
              comments: [
                { id: 1, author: 3, text: 'Campaign launched successfully', date: '2023-06-01' }
              ],
              attachments: []
            }
          ];
          setProjects(sampleProjects);
          saveData({ projects: sampleProjects });
        }
      } catch (error) {
        console.error('Failed to load data from local storage:', error);
      }
    };

    loadData();
  }, []);

  // Save data to local storage whenever projects change
  useEffect(() => {
    const saveData = (data) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error('Failed to save data to local storage:', error);
      }
    };

    if (projects.length > 0) {
      saveData({ projects });
    }
  }, [projects]);

  // Enhanced email service with validation
  const sendProjectAssignmentEmail = async (emailData) => {
    if (!emailData.to_email || !emailData.to_name) {
      console.error('Missing required email fields:', emailData);
      setEmailError('Recipient email information is incomplete');
      return false;
    }

    setIsSendingEmail(true);
    setEmailError(null);

    try {
      const templateParams = {
        to_name: emailData.to_name,
        to_email: emailData.to_email,
        from_name: 'Project Management System',
        project_name: emailData.project_name,
        project_description: emailData.project_description,
        project_start_date: emailData.project_start_date,
        project_due_date: emailData.project_due_date,
        project_status: emailData.project_status,
        project_priority: emailData.project_priority,
        manager_name: emailData.manager_name || 'Project Manager',
        reply_to: 'no-reply@project-management.com'
      };

      const response = await emailjs.send(
        'service_36sxam3',
        'template_g0f64qt',
        templateParams
      );

      if (response.status !== 200) {
        throw new Error(`Email service responded with status ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      setEmailError(`Failed to send notification: ${error.message}`);
      return false;
    } finally {
      setIsSendingEmail(false);
    }
  };

  const sendTaskAssignmentEmail = async (emailData) => {
    if (!emailData.to_email || !emailData.to_name) {
      console.error('Missing required email fields:', emailData);
      setEmailError('Recipient email information is incomplete');
      return false;
    }

    setIsSendingEmail(true);
    setEmailError(null);

    try {
      const templateParams = {
        to_name: emailData.to_name,
        to_email: emailData.to_email,
        from_name: 'Project Management System',
        task_title: emailData.task_title,
        task_description: emailData.task_description,
        task_due_date: emailData.task_due_date,
        task_status: emailData.task_status,
        project_name: emailData.project_name,
        project_due_date: emailData.project_due_date,
        manager_name: emailData.manager_name || 'Project Manager',
        reply_to: 'no-reply@project-management.com'
      };

      const response = await emailjs.send(
        'service_36sxam3',
        'template_xu8a98x',
        templateParams
      );

      if (response.status !== 200) {
        throw new Error(`Email service responded with status ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      setEmailError(`Failed to send notification: ${error.message}`);
      return false;
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Filter projects based on status and search term
  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.status === filter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle project submission with enhanced email notifications
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(), // Using timestamp for unique ID
      ...projectForm,
      tasks: [],
      comments: [],
      attachments: []
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    setShowProjectForm(false);
    setProjectForm({
      name: '',
      description: '',
      startDate: '',
      dueDate: '',
      status: 'not started',
      priority: 'medium',
      teamMembers: []
    });

    // Send notifications to all assigned team members with error handling
    const emailResults = [];
    
    for (const memberId of projectForm.teamMembers) {
      const member = teamMembers.find(m => m.id === memberId);
      if (!member || !member.email) {
        console.warn(`Skipping notification for member ${memberId} - no email found`);
        emailResults.push(false);
        continue;
      }

      try {
        const success = await sendProjectAssignmentEmail({
          to_name: member.name,
          to_email: member.email,
          project_name: newProject.name,
          project_description: newProject.description,
          project_start_date: newProject.startDate,
          project_due_date: newProject.dueDate,
          project_status: newProject.status,
          project_priority: newProject.priority
        });
        emailResults.push(success);
      } catch (error) {
        console.error(`Error sending to ${member.email}:`, error);
        emailResults.push(false);
      }
    }

    if (emailResults.some(success => !success)) {
      setEmailError('Some notifications failed to send - check console for details');
    }
  };

  // Handle task submission with enhanced email notification
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(), // Using timestamp for unique ID
      ...taskForm,
      assignee: parseInt(taskForm.assignee)
    };

    const updatedProjects = projects.map(project => 
      project.id === selectedProject.id 
        ? { ...project, tasks: [...project.tasks, newTask] } 
        : project
    );

    setProjects(updatedProjects);
    setSelectedProject({
      ...selectedProject,
      tasks: [...selectedProject.tasks, newTask]
    });
    setShowTaskForm(false);
    setTaskForm({
      title: '',
      description: '',
      assignee: '',
      status: 'todo',
      dueDate: ''
    });

    // Send notification to assigned team member with validation
    const member = teamMembers.find(m => m.id === newTask.assignee);
    if (!member?.email) {
      setEmailError('Selected team member has no valid email address');
      return;
    }

    try {
      const emailSent = await sendTaskAssignmentEmail({
        to_name: member.name,
        to_email: member.email,
        task_title: newTask.title,
        task_description: newTask.description,
        task_due_date: newTask.dueDate,
        task_status: newTask.status,
        project_name: selectedProject.name,
        project_due_date: selectedProject.dueDate
      });

      if (!emailSent) {
        setEmailError('Failed to send task assignment notification');
      }
    } catch (error) {
      console.error('Error sending task assignment:', error);
      setEmailError(`Failed to send notification: ${error.message}`);
    }
  };

  // Update task status
  const updateTaskStatus = (taskId, newStatus) => {
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        const updatedTasks = project.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status: newStatus };
          }
          return task;
        });
        return { ...project, tasks: updatedTasks };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setSelectedProject({
      ...selectedProject,
      tasks: selectedProject.tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    });
  };

  // Add comment to project
  const addComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(), // Using timestamp for unique ID
      author: 1, // In a real app, this would be the logged-in user
      text: newComment,
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          comments: [...project.comments, comment]
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setSelectedProject({
      ...selectedProject,
      comments: [...selectedProject.comments, comment]
    });
    setNewComment('');
  };

  // Handle file upload
  const handleFileUpload = (file) => {
    const attachment = {
      id: Date.now(), // Using timestamp for unique ID
      name: file.name,
      type: file.type.split('/')[0],
      url: URL.createObjectURL(file),
      uploadDate: new Date().toISOString().split('T')[0]
    };
    
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          attachments: [...project.attachments, attachment]
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setSelectedProject({
      ...selectedProject,
      attachments: [...selectedProject.attachments, attachment]
    });
  };

  // Handle edit project click
  const handleEditProject = () => {
    setProjectForm({
      name: selectedProject.name,
      description: selectedProject.description,
      startDate: selectedProject.startDate,
      dueDate: selectedProject.dueDate,
      status: selectedProject.status,
      priority: selectedProject.priority,
      teamMembers: selectedProject.teamMembers
    });
    setShowProjectForm(true);
  };

  // Handle project deletion
  const handleDeleteProject = (projectId) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    setProjects(updatedProjects);
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject(null);
    }
  };

  // Get status color class
  const getStatusColor = (status) => {
    switch (status) {
      case 'not started':
        return 'status-not-started';
      case 'in progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  // Get priority color class
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  return (
    <div className="projects-container">
      {!selectedProject ? (
        // Project List View
        <div>
          <div className="projects-header">
            <h1 className="projects-title">Projects</h1>
            <button 
              onClick={() => setShowProjectForm(true)}
              className="new-project-btn"
            >
              <FiPlus /> New Project
            </button>
          </div>

          <ProjectStats projects={projects} />

          {/* Filters and Search */}
          <div className="filter-search-container">
            <div className="filter-buttons">
              <button 
                onClick={() => setFilter('all')} 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('not started')} 
                className={`filter-btn ${filter === 'not started' ? 'active' : ''}`}
              >
                Not Started
              </button>
              <button 
                onClick={() => setFilter('in progress')} 
                className={`filter-btn ${filter === 'in progress' ? 'active' : ''}`}
              >
                In Progress
              </button>
              <button 
                onClick={() => setFilter('completed')} 
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              >
                Completed
              </button>
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="project-card"
              >
                <div className="project-card-content">
                  <div className="project-card-header">
                    <FiFolder className="project-icon" />
                    <div className="project-tags">
                      <span className={`project-status ${getStatusColor(project.status)}`}>
                        {project.status.replace('_', ' ')}
                      </span>
                      <span className={`project-priority ${getPriorityColor(project.priority)}`}>
                        {project.priority}
                      </span>
                    </div>
                    <button 
                      className="delete-project-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(project.id);
                      }}
                    >
                      ❌
                    </button>
                  </div>
                  
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="team-members">
                    {project.teamMembers.map(memberId => {
                      const member = teamMembers.find(m => m.id === memberId);
                      return member ? (
                        <span key={member.id} className="team-member">
                          {member.name.split(' ')[0]}
                        </span>
                      ) : null;
                    })}
                  </div>
                  
                  <div className="project-footer">
                    <span className="project-due-date">Due: {project.dueDate}</span>
                    <div className="project-progress">
                      <span className="project-tasks-count">{project.tasks.length} tasks</span>
                      <div className="progress-bar">
                        {project.tasks.length > 0 && (
                          <div 
                            className="progress-fill" 
                            style={{
                              width: `${(project.tasks.filter(t => t.status === 'done').length / project.tasks.length * 100)}%`
                            }}
                          ></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Project Detail View
        <div>
          <button 
            onClick={() => setSelectedProject(null)}
            className="back-button"
          >
            ← Back to Projects
          </button>
          
          <ProjectSummary 
            project={selectedProject}
            onEditClick={handleEditProject}
            onDeleteClick={() => handleDeleteProject(selectedProject.id)}
          />
          
          <div className="project-detail-grid">
            <div className="project-main-content">
              <TaskList 
                tasks={selectedProject.tasks}
                teamMembers={teamMembers}
                onStatusChange={updateTaskStatus}
                onAddTask={() => setShowTaskForm(true)}
              />
              
              <CommentsSection 
                comments={selectedProject.comments}
                teamMembers={teamMembers}
                newComment={newComment}
                onCommentChange={setNewComment}
                onAddComment={addComment}
              />
            </div>
            
            <div className="project-sidebar-content">
              <ProjectSidebar 
                project={selectedProject}
                teamMembers={teamMembers}
              />
              
              <AttachmentsSection 
                attachments={selectedProject.attachments}
                onFileUpload={handleFileUpload}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* New/Edit Project Modal */}
      {showProjectForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ProjectForm 
              projectForm={projectForm}
              teamMembers={teamMembers}
              onSubmit={handleProjectSubmit}
              onCancel={() => setShowProjectForm(false)}
              onChange={setProjectForm}
            />
          </div>
        </div>
      )}
      
      {/* New Task Modal */}
      {showTaskForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <TaskForm 
              taskForm={taskForm}
              teamMembers={teamMembers.filter(m => 
                selectedProject.teamMembers.includes(m.id))
              }
              onSubmit={handleTaskSubmit}
              onCancel={() => setShowTaskForm(false)}
              onChange={setTaskForm}
            />
          </div>
        </div>
      )}

      {/* Email notification status */}
      {(isSendingEmail || emailError) && (
        <div className={`email-notification-status ${emailError ? 'error' : ''}`}>
          {isSendingEmail ? 'Sending notifications...' : emailError}
          {isSendingEmail && <div className="loading-spinner"></div>}
        </div>
      )}
    </div>
  );
};

export default Projects;