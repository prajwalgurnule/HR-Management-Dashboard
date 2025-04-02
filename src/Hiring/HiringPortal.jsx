import React, { useState, useEffect } from 'react';
import { 
  FiSearch, FiPlus, FiChevronDown, FiChevronLeft, FiChevronRight, 
  FiTrash2, FiEdit, FiEye, FiDownload, FiCalendar, FiMail 
} from 'react-icons/fi';
import './HiringPortal.css';

const HiringPortal = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showAddJob, setShowAddJob] = useState(false);
  const [showAddApplication, setShowAddApplication] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    specialization: '',
    salary: '',
    companyName: '',
    websiteLink: '',
    country: '',
    state: '',
    experience: '',
    lastDate: '',
    jobType: '',
    companyEmail: '',
    address: '',
    city: '',
    noOfPosts: 1,
    qualification: ''
  });
  const [newApplication, setNewApplication] = useState({
    jobId: '',
    applicantName: '',
    email: '',
    phone: '',
    experience: '',
    skills: '',
    resume: null,
    status: 'Submitted'
  });
  const [editingJob, setEditingJob] = useState(null);
  const [editingApplication, setEditingApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    department: '',
    country: '',
    state: '',
    status: ''
  });
  const [appFilters, setAppFilters] = useState({
    jobTitle: '',
    status: '',
    date: ''
  });
  const [showActionMenu, setShowActionMenu] = useState(null);

  // Sample job data
  const sampleJobs = [
    {
      id: 1,
      title: 'QA',
      noOfPosts: 1,
      qualification: 'MSc',
      experience: '0 years',
      lastDate: '10/12/2024',
      company: 'Qloron',
      country: 'India',
      state: 'Maharashtra',
      postedDate: '10/12/2024',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Test Engineer',
      noOfPosts: 2,
      qualification: 'B.Tech/B.E.',
      experience: '1.5 years',
      lastDate: '16/12/2024',
      company: 'Qloron',
      country: 'India',
      state: 'Maharashtra',
      postedDate: '11/12/2024',
      status: 'Active'
    },
    {
      id: 3,
      title: 'QA',
      noOfPosts: 1,
      qualification: 'BE',
      experience: '3 years',
      lastDate: '15/12/2024',
      company: 'Qloron',
      country: 'India',
      state: 'Madhya Pradesh',
      postedDate: '12/12/2024',
      status: 'Active'
    },
    {
      id: 4,
      title: 'Software Engineer',
      noOfPosts: 5,
      qualification: 'BE/B.Tech',
      experience: 'N/A',
      lastDate: 'N/A',
      company: 'Qloron',
      country: 'N/A',
      state: 'Maharashtra',
      postedDate: 'N/A',
      status: 'Draft'
    }
  ];

  // Sample application data
  const sampleApplications = [
    {
      id: 1,
      jobId: 1,
      jobTitle: 'QA',
      applicantName: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 9876543210',
      experience: '2 years',
      skills: 'Testing, Automation, Selenium',
      status: 'Submitted',
      appliedDate: '05/12/2024',
      resume: 'rahul_sharma_resume.pdf'
    },
    {
      id: 2,
      jobId: 2,
      jobTitle: 'Test Engineer',
      applicantName: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 8765432109',
      experience: '3 years',
      skills: 'Manual Testing, JIRA, SQL',
      status: 'Under Review',
      appliedDate: '06/12/2024',
      resume: 'priya_patel_resume.pdf'
    },
    {
      id: 3,
      jobId: 1,
      jobTitle: 'QA',
      applicantName: 'Amit Singh',
      email: 'amit.singh@example.com',
      phone: '+91 7654321098',
      experience: '1 year',
      skills: 'Testing, Java, Postman',
      status: 'Rejected',
      appliedDate: '07/12/2024',
      resume: 'amit_singh_resume.pdf'
    },
    {
      id: 4,
      jobId: 3,
      jobTitle: 'QA',
      applicantName: 'Neha Gupta',
      email: 'neha.gupta@example.com',
      phone: '+91 6543210987',
      experience: '4 years',
      skills: 'Automation, Python, Jenkins',
      status: 'Interview Scheduled',
      appliedDate: '08/12/2024',
      resume: 'neha_gupta_resume.pdf'
    }
  ];

  // Load sample data on component mount
  useEffect(() => {
    setJobs(sampleJobs);
    setApplications(sampleApplications);
  }, []);

  // Handle input change for new job form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle input change for new application form
  const handleApplicationInputChange = (e) => {
    const { name, value } = e.target;
    setNewApplication(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file upload for application resume
  const handleFileChange = (e) => {
    setNewApplication(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  // Handle filter change for jobs
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1);
  };

  // Handle filter change for applications
  const handleAppFilterChange = (e) => {
    const { name, value } = e.target;
    setAppFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new job
  const handleAddJob = (e) => {
    e.preventDefault();
    const job = {
      id: jobs.length + 1,
      title: newJob.title,
      noOfPosts: newJob.noOfPosts,
      qualification: newJob.qualification,
      experience: newJob.experience || 'N/A',
      lastDate: newJob.lastDate || 'N/A',
      company: newJob.companyName,
      country: newJob.country || 'N/A',
      state: newJob.state || 'N/A',
      postedDate: new Date().toLocaleDateString('en-GB'),
      status: 'Active'
    };
    
    setJobs([...jobs, job]);
    setNewJob({
      title: '',
      description: '',
      specialization: '',
      salary: '',
      companyName: '',
      websiteLink: '',
      country: '',
      state: '',
      experience: '',
      lastDate: '',
      jobType: '',
      companyEmail: '',
      address: '',
      city: '',
      noOfPosts: 1,
      qualification: ''
    });
    setShowAddJob(false);
    setActiveTab('jobs');
  };

  // Add new application
  const handleAddApplication = (e) => {
    e.preventDefault();
    const job = jobs.find(j => j.id === parseInt(newApplication.jobId));
    const application = {
      id: applications.length + 1,
      jobId: newApplication.jobId,
      jobTitle: job ? job.title : 'N/A',
      applicantName: newApplication.applicantName,
      email: newApplication.email,
      phone: newApplication.phone,
      experience: newApplication.experience,
      skills: newApplication.skills,
      status: newApplication.status,
      appliedDate: new Date().toLocaleDateString('en-GB'),
      resume: newApplication.resume ? newApplication.resume.name : 'No file uploaded'
    };
    
    setApplications([...applications, application]);
    setNewApplication({
      jobId: '',
      applicantName: '',
      email: '',
      phone: '',
      experience: '',
      skills: '',
      resume: null,
      status: 'Submitted'
    });
    setShowAddApplication(false);
  };

  // Delete job
  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    setShowActionMenu(null);
  };

  // Delete application
  const handleDeleteApplication = (appId) => {
    setApplications(applications.filter(app => app.id !== appId));
    setShowActionMenu(null);
  };

  // Update application status
  const handleUpdateApplicationStatus = (appId, newStatus) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
  };

  // Edit job
  const handleEditJob = (job) => {
    setEditingJob(job);
    setNewJob({
      title: job.title,
      description: '',
      specialization: '',
      salary: '',
      companyName: job.company,
      websiteLink: '',
      country: job.country,
      state: job.state,
      experience: job.experience,
      lastDate: job.lastDate,
      jobType: '',
      companyEmail: '',
      address: '',
      city: '',
      noOfPosts: job.noOfPosts,
      qualification: job.qualification
    });
    setShowAddJob(true);
  };

  // Edit application
  const handleEditApplication = (application) => {
    setEditingApplication(application);
    setNewApplication({
      jobId: application.jobId,
      applicantName: application.applicantName,
      email: application.email,
      phone: application.phone,
      experience: application.experience,
      skills: application.skills,
      resume: null,
      status: application.status
    });
    setShowAddApplication(true);
  };

  // View application details
  const handleViewApplication = (application) => {
    alert(`Application Details:\n
      Name: ${application.applicantName}\n
      Email: ${application.email}\n
      Phone: ${application.phone}\n
      Experience: ${application.experience}\n
      Skills: ${application.skills}\n
      Status: ${application.status}\n
      Applied Date: ${application.appliedDate}\n
      Resume: ${application.resume}`);
  };

  // Download resume
  const handleDownloadResume = (resumeName) => {
    alert(`Downloading resume: ${resumeName}`);
    // In a real app, this would trigger an actual download
  };

  // Filter jobs based on search term and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = (
      (filters.department === '' || job.title.toLowerCase().includes(filters.department.toLowerCase())) &&
      (filters.country === '' || job.country === filters.country) &&
      (filters.state === '' || job.state === filters.state) &&
      (filters.status === '' || job.status === filters.status)
    );
    
    return matchesSearch && matchesFilters;
  });

  // Filter applications based on filters
  const filteredApplications = applications.filter(app => {
    const matchesJobTitle = appFilters.jobTitle === '' || 
                           app.jobTitle.toLowerCase().includes(appFilters.jobTitle.toLowerCase());
    const matchesStatus = appFilters.status === '' || app.status === appFilters.status;
    const matchesDate = appFilters.date === '' || app.appliedDate === appFilters.date;
    
    return matchesJobTitle && matchesStatus && matchesDate;
  });

  // Pagination logic for jobs
  const indexOfLastJob = currentPage * rowsPerPage;
  const indexOfFirstJob = indexOfLastJob - rowsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle action menu
  const toggleActionMenu = (id, e) => {
    e.stopPropagation();
    setShowActionMenu(showActionMenu === id ? null : id);
  };

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowActionMenu(null);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="hiring-portal">
      <header className="hiring-header">
        <h1 className="hiring-title">
          {showAddJob ? 'Add Job' : 
           showAddApplication ? 'Add Application' : 
           activeTab === 'jobs' ? 'All Active Jobs' : 'Job Applications'}
        </h1>
        {!showAddJob && !showAddApplication && activeTab === 'jobs' && (
          <div className="hiring-header-controls">
            <div className="hiring-search-bar">
              <FiSearch className="hiring-search-icon" />
              <input
                type="text"
                placeholder="Search posted jobs, departments"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="hiring-search-input"
              />
            </div>
            <button 
              className="hiring-create-button"
              onClick={() => setShowAddJob(true)}
            >
              <FiPlus className="hiring-add-icon" />
              Create Job
            </button>
          </div>
        )}
        {!showAddJob && !showAddApplication && activeTab === 'applications' && (
          <div className="hiring-header-controls">
            <div className="hiring-search-bar">
              <FiSearch className="hiring-search-icon" />
              <input
                type="text"
                placeholder="Search applications"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="hiring-search-input"
              />
            </div>
            <button 
              className="hiring-create-button"
              onClick={() => setShowAddApplication(true)}
            >
              <FiPlus className="hiring-add-icon" />
              Add Application
            </button>
          </div>
        )}
      </header>

      {showAddJob ? (
        <div className="add-job-container">
          <button 
            className="back-to-jobs-button"
            onClick={() => {
              setShowAddJob(false);
              setEditingJob(null);
            }}
          >
            <FiChevronLeft className="back-icon" />
            Back to {editingJob ? 'Job' : 'Jobs'}
          </button>
          
          <form onSubmit={handleAddJob} className="add-job-form">
            <div className="form-section">
              <h2>Job Title</h2>
              <input
                type="text"
                name="title"
                value={newJob.title}
                onChange={handleInputChange}
                placeholder="E.g. Android Developer"
                required
              />
            </div>

            <div className="form-section">
              <h2>Description</h2>
              <textarea
                name="description"
                value={newJob.description}
                onChange={handleInputChange}
                placeholder="Write description here..."
                rows="4"
                required
              />
            </div>

            <div className="form-columns">
              <div className="form-column">
                <div className="form-section">
                  <h2>Qualification / Education Required</h2>
                  <input
                    type="text"
                    name="qualification"
                    value={newJob.qualification}
                    onChange={handleInputChange}
                    placeholder="E.g. B.Tech, MSc"
                    required
                  />
                </div>

                <div className="form-section">
                  <h2>Specialization</h2>
                  <input
                    type="text"
                    name="specialization"
                    value={newJob.specialization}
                    onChange={handleInputChange}
                    placeholder="Enter Specialization"
                  />
                </div>

                <div className="form-section">
                  <h2>Salary</h2>
                  <input
                    type="text"
                    name="salary"
                    value={newJob.salary}
                    onChange={handleInputChange}
                    placeholder="Enter Salary"
                  />
                </div>

                <div className="form-section">
                  <h2>Number of Posts</h2>
                  <input
                    type="number"
                    name="noOfPosts"
                    value={newJob.noOfPosts}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-column">
                <div className="form-section">
                  <h2>Company Name</h2>
                  <input
                    type="text"
                    name="companyName"
                    value={newJob.companyName}
                    onChange={handleInputChange}
                    placeholder="Company Name"
                    required
                  />
                </div>

                <div className="form-section">
                  <h2>Website Link</h2>
                  <input
                    type="url"
                    name="websiteLink"
                    value={newJob.websiteLink}
                    onChange={handleInputChange}
                    placeholder="Common Link"
                  />
                </div>

                <div className="form-section">
                  <h2>Country</h2>
                  <select
                    name="country"
                    value={newJob.country}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                <div className="form-section">
                  <h2>State</h2>
                  <select
                    name="state"
                    value={newJob.state}
                    onChange={handleInputChange}
                  >
                    <option value="">Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </div>
              </div>

              <div className="form-column">
                <div className="form-section">
                  <h2>Experience Required</h2>
                  <input
                    type="text"
                    name="experience"
                    value={newJob.experience}
                    onChange={handleInputChange}
                    placeholder="E.g. 2 years"
                  />
                </div>

                <div className="form-section">
                  <h2>Last Date To Apply</h2>
                  <input
                    type="date"
                    name="lastDate"
                    value={newJob.lastDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-section">
                  <h2>Job Type</h2>
                  <select
                    name="jobType"
                    value={newJob.jobType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div className="form-section">
                  <h2>Company Email</h2>
                  <input
                    type="email"
                    name="companyEmail"
                    value={newJob.companyEmail}
                    onChange={handleInputChange}
                    placeholder="Address"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Address</h2>
              <input
                type="text"
                name="address"
                value={newJob.address}
                onChange={handleInputChange}
                placeholder="Company Address"
              />
            </div>

            <div className="form-section">
              <h2>City</h2>
              <input
                type="text"
                name="city"
                value={newJob.city}
                onChange={handleInputChange}
                placeholder="City"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-job-button">
                {editingJob ? 'Update Job' : 'Add Job'}
              </button>
            </div>
          </form>
        </div>
      ) : showAddApplication ? (
        <div className="add-job-container">
          <button 
            className="back-to-jobs-button"
            onClick={() => {
              setShowAddApplication(false);
              setEditingApplication(null);
            }}
          >
            <FiChevronLeft className="back-icon" />
            Back to {editingApplication ? 'Application' : 'Applications'}
          </button>
          
          <form onSubmit={handleAddApplication} className="add-job-form">
            <div className="form-section">
              <h2>Job</h2>
              <select
                name="jobId"
                value={newApplication.jobId}
                onChange={handleApplicationInputChange}
                required
              >
                <option value="">Select Job</option>
                {jobs.filter(job => job.status === 'Active').map(job => (
                  <option key={job.id} value={job.id}>{job.title} - {job.company}</option>
                ))}
              </select>
            </div>

            <div className="form-section">
              <h2>Applicant Name</h2>
              <input
                type="text"
                name="applicantName"
                value={newApplication.applicantName}
                onChange={handleApplicationInputChange}
                placeholder="Full Name"
                required
              />
            </div>

            <div className="form-section">
              <h2>Email</h2>
              <input
                type="email"
                name="email"
                value={newApplication.email}
                onChange={handleApplicationInputChange}
                placeholder="Email Address"
                required
              />
            </div>

            <div className="form-section">
              <h2>Phone</h2>
              <input
                type="tel"
                name="phone"
                value={newApplication.phone}
                onChange={handleApplicationInputChange}
                placeholder="Phone Number"
                required
              />
            </div>

            <div className="form-section">
              <h2>Experience</h2>
              <input
                type="text"
                name="experience"
                value={newApplication.experience}
                onChange={handleApplicationInputChange}
                placeholder="E.g. 2 years"
                required
              />
            </div>

            <div className="form-section">
              <h2>Skills</h2>
              <textarea
                name="skills"
                value={newApplication.skills}
                onChange={handleApplicationInputChange}
                placeholder="List relevant skills"
                rows="3"
                required
              />
            </div>

            <div className="form-section">
              <h2>Resume</h2>
              <div className="file-upload">
                <label className="file-upload-label">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                  {newApplication.resume ? newApplication.resume.name : 'Choose File'}
                </label>
                {newApplication.resume && (
                  <span className="file-name">{newApplication.resume.name}</span>
                )}
              </div>
            </div>

            <div className="form-section">
              <h2>Status</h2>
              <select
                name="status"
                value={newApplication.status}
                onChange={handleApplicationInputChange}
              >
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Rejected">Rejected</option>
                <option value="Hired">Hired</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-job-button">
                {editingApplication ? 'Update Application' : 'Add Application'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <nav className="hiring-tabs">
            <button
              className={`hiring-tab-button ${activeTab === 'jobs' ? 'hiring-active' : ''}`}
              onClick={() => setActiveTab('jobs')}
            >
              Jobs
            </button>
            <button
              className={`hiring-tab-button ${activeTab === 'applications' ? 'hiring-active' : ''}`}
              onClick={() => setActiveTab('applications')}
            >
              Applications
            </button>
          </nav>

          <main className="hiring-content">
            {activeTab === 'jobs' ? (
              <>
                <div className="filters-section">
                  <div className="filter-group">
                    <label>Department</label>
                    <select
                      name="department"
                      value={filters.department}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Departments</option>
                      <option value="QA">QA</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Development">Development</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Country</label>
                    <select
                      name="country"
                      value={filters.country}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Countries</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>State</label>
                    <select
                      name="state"
                      value={filters.state}
                      onChange={handleFilterChange}
                    >
                      <option value="">All States</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="jobs-table-container">
                  <table className="jobs-table">
                    <thead>
                      <tr>
                        <th>Site</th>
                        <th>Job Title</th>
                        <th>No Of Post</th>
                        <th>Qualification Required</th>
                        <th>Experience</th>
                        <th>Last Day To Apply</th>
                        <th>Company</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>Job Posted Date</th>
                        <th>Job Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentJobs.length > 0 ? (
                        currentJobs.map((job, index) => (
                          <tr key={job.id}>
                            <td>{indexOfFirstJob + index + 1}</td>
                            <td>{job.title}</td>
                            <td>{job.noOfPosts}</td>
                            <td>{job.qualification}</td>
                            <td>{job.experience}</td>
                            <td>{job.lastDate}</td>
                            <td>{job.company}</td>
                            <td>{job.country}</td>
                            <td>{job.state}</td>
                            <td>{job.postedDate}</td>
                            <td>
                              <span className={`status-badge ${job.status.toLowerCase()}`}>
                                {job.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-menu-container">
                                <button 
                                  className="action-button"
                                  onClick={(e) => toggleActionMenu(`job-${job.id}`, e)}
                                >
                                  •••
                                </button>
                                {showActionMenu === `job-${job.id}` && (
                                  <div className="action-menu" onClick={(e) => e.stopPropagation()}>
                                    <button 
                                      className="action-menu-item"
                                      onClick={() => handleEditJob(job)}
                                    >
                                      <FiEdit className="action-icon" /> Edit
                                    </button>
                                    <button 
                                      className="action-menu-item delete"
                                      onClick={() => handleDeleteJob(job.id)}
                                    >
                                      <FiTrash2 className="action-icon" /> Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="12" className="no-jobs-message">
                            No jobs found matching your criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="pagination-container">
                  <div className="rows-per-page">
                    <span>Rows per page:</span>
                    <select
                      value={rowsPerPage}
                      onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                  <div className="pagination-info">
                    Showing {indexOfFirstJob + 1} to {Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length}
                  </div>
                  <div className="pagination-buttons">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <FiChevronLeft />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={currentPage === number ? 'active' : ''}
                      >
                        {number}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="applications-container">
                <div className="applications-header">
                  <h3>Application Management</h3>
                  <p>Here you can view and manage job applications.</p>
                </div>

                <div className="app-filters-section">
                  <div className="filter-group">
                    <label>Job Title</label>
                    <select
                      name="jobTitle"
                      value={appFilters.jobTitle}
                      onChange={handleAppFilterChange}
                    >
                      <option value="">All Jobs</option>
                      {[...new Set(jobs.map(job => job.title))].map(title => (
                        <option key={title} value={title}>{title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={appFilters.status}
                      onChange={handleAppFilterChange}
                    >
                      <option value="">All Statuses</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Hired">Hired</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Applied Date</label>
                    <select
                      name="date"
                      value={appFilters.date}
                      onChange={handleAppFilterChange}
                    >
                      <option value="">All Dates</option>
                      {[...new Set(applications.map(app => app.appliedDate))].map(date => (
                        <option key={date} value={date}>{date}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="applications-table-container">
                  <table className="applications-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Job Title</th>
                        <th>Applicant Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Experience</th>
                        <th>Applied Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications.length > 0 ? (
                        filteredApplications.map(app => (
                          <tr key={app.id}>
                            <td>{app.id}</td>
                            <td>{app.jobTitle}</td>
                            <td>{app.applicantName}</td>
                            <td>{app.email}</td>
                            <td>{app.phone}</td>
                            <td>{app.experience}</td>
                            <td>{app.appliedDate}</td>
                            <td>
                              <select
                                value={app.status}
                                onChange={(e) => handleUpdateApplicationStatus(app.id, e.target.value)}
                                className={`status-select ${app.status.toLowerCase().replace(' ', '-')}`}
                              >
                                <option value="Submitted">Submitted</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Interview Scheduled">Interview Scheduled</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Hired">Hired</option>
                              </select>
                            </td>
                            <td>
                              <div className="action-menu-container">
                                <button 
                                  className="action-button"
                                  onClick={(e) => toggleActionMenu(`app-${app.id}`, e)}
                                >
                                  •••
                                </button>
                                {showActionMenu === `app-${app.id}` && (
                                  <div className="action-menu" onClick={(e) => e.stopPropagation()}>
                                    <button 
                                      className="action-menu-item"
                                      onClick={() => handleViewApplication(app)}
                                    >
                                      <FiEye className="action-icon" /> View
                                    </button>
                                    <button 
                                      className="action-menu-item"
                                      onClick={() => handleEditApplication(app)}
                                    >
                                      <FiEdit className="action-icon" /> Edit
                                    </button>
                                    <button 
                                      className="action-menu-item"
                                      onClick={() => handleDownloadResume(app.resume)}
                                    >
                                      <FiDownload className="action-icon" /> Download Resume
                                    </button>
                                    <button 
                                      className="action-menu-item delete"
                                      onClick={() => handleDeleteApplication(app.id)}
                                    >
                                      <FiTrash2 className="action-icon" /> Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="no-apps-message">
                            No applications found matching your criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default HiringPortal;