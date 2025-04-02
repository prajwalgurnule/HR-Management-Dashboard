import React, { useState, useEffect } from 'react';
import { 
  FiDownload, FiUser, FiCalendar, FiClock, 
  FiTrendingUp, FiAward, FiFilter, FiSearch,
  FiAlertCircle, FiCheckCircle, FiClock as FiLate,
  FiBarChart2, FiPieChart, FiGrid, FiList, FiChevronRight
} from 'react-icons/fi';
import { CSVLink } from 'react-csv';
import './Attendance.css';

const AttendanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('monthly');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [notifications, setNotifications] = useState([]);

  // Sample data
  const employees = [
    { id: 'EMP-0001', name: 'Arjun Patel', department: 'Development', position: 'Senior Developer', 
      presentDays: 24, totalDays: 24, lateDays: 2, earlyLeave: 1, avatarColor: '#4361ee', trend: 'up' },
    { id: 'EMP-0002', name: 'Priya Sharma', department: 'Design', position: 'UI/UX Designer',
      presentDays: 23, totalDays: 24, lateDays: 3, earlyLeave: 0, avatarColor: '#10b981', trend: 'up' },
    { id: 'EMP-0003', name: 'Rahul Gupta', department: 'Marketing', position: 'Marketing Manager',
      presentDays: 22, totalDays: 24, lateDays: 1, earlyLeave: 2, avatarColor: '#f59e0b', trend: 'down' },
    { id: 'EMP-0004', name: 'Ananya Reddy', department: 'HR', position: 'HR Manager',
      presentDays: 21, totalDays: 24, lateDays: 0, earlyLeave: 1, avatarColor: '#ef4444', trend: 'up' },
    { id: 'EMP-0005', name: 'Vikram Singh', department: 'Sales', position: 'Sales Executive',
      presentDays: 20, totalDays: 24, lateDays: 4, earlyLeave: 2, avatarColor: '#8b5cf6', trend: 'down' },
    { id: 'EMP-0006', name: 'Neha Kapoor', department: 'Development', position: 'Frontend Developer',
      presentDays: 23, totalDays: 24, lateDays: 1, earlyLeave: 0, avatarColor: '#3a86ff', trend: 'up' },
    { id: 'EMP-0007', name: 'Suresh Kumar', department: 'Sales', position: 'Sales Manager',
      presentDays: 22, totalDays: 24, lateDays: 2, earlyLeave: 1, avatarColor: '#7209b7', trend: 'up' },
    { id: 'EMP-0008', name: 'Meena Desai', department: 'Design', position: 'Graphic Designer',
      presentDays: 24, totalDays: 24, lateDays: 0, earlyLeave: 0, avatarColor: '#f72585', trend: 'up' },
  ];

  const departments = [
    { name: 'Development', employees: 35, present: 32, absent: 3, late: 5, color: '#4361ee', trend: 'up' },
    { name: 'Design', employees: 18, present: 16, absent: 2, late: 3, color: '#10b981', trend: 'up' },
    { name: 'Marketing', employees: 22, present: 20, absent: 2, late: 2, color: '#f59e0b', trend: 'down' },
    { name: 'HR', employees: 12, present: 11, absent: 1, late: 0, color: '#ef4444', trend: 'up' },
    { name: 'Sales', employees: 37, present: 34, absent: 3, late: 7, color: '#8b5cf6', trend: 'down' },
  ];

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    present: [85, 82, 88, 90, 87, 85, 89],
    absent: [15, 18, 12, 10, 13, 15, 11],
    late: [8, 10, 7, 5, 9, 8, 6]
  };

  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    present: [92, 94, 95, 93, 90, 60],
    absent: [8, 6, 5, 7, 10, 40],
    late: [5, 4, 3, 6, 8, 15]
  };

  // Generate CSV data
  const csvData = [
    ['Employee ID', 'Name', 'Department', 'Position', 'Present Days', 'Total Days', 'Late Days', 'Early Leave', 'Attendance %'],
    ...employees.map(emp => [
      emp.id,
      emp.name,
      emp.department,
      emp.position,
      emp.presentDays,
      emp.totalDays,
      emp.lateDays,
      emp.earlyLeave,
      `${Math.round((emp.presentDays/emp.totalDays)*100)}%`
    ])
  ];

  // Filter employees based on search and department
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDepartment === 'all' || emp.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  // Generate notifications
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    setNotifications([
      { id: 1, type: 'warning', message: '5 employees late today', date: today, icon: <FiLate /> },
      { id: 2, type: 'alert', message: '3 employees absent today', date: today, icon: <FiAlertCircle /> },
      { id: 3, type: 'info', message: 'Monthly attendance report ready', date: today, icon: <FiCheckCircle /> },
      { id: 4, type: 'success', message: '2 new employees onboarded', date: today, icon: <FiUser /> }
    ]);
  }, []);

  return (
    <div className="attendance-container">
      {/* Header Section */}
      <div className="attendance-header">
        <div className="header-left">
          <h1>
            <span className="header-icon">📊</span>
            Attendance Dashboard
          </h1>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="navigation-tabs">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          <FiBarChart2 /> Dashboard
        </button>
        <button 
          className={activeTab === 'report' ? 'active' : ''}
          onClick={() => setActiveTab('report')}
        >
          <FiList /> Detailed Report
        </button>
      </div>

      {/* Notification Bar */}
      {/* <div className="notification-bar">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification ${notification.type}`}>
            <div className="notification-icon">
              {notification.icon}
            </div>
            <div className="notification-content">
              <p>{notification.message}</p>
              <span className="notification-date">{notification.date}</span>
            </div>
          </div>
        ))}
      </div> */}

      {/* Main Content */}
      <div className="attendance-content">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card total-employees">
                <div className="stat-icon">
                  <FiUser />
                </div>
                <div className="stat-content">
                  <h3>Total Employees</h3>
                  <p>124</p>
                  <div className="stat-trend up">
                    <span>↑ 5% from last month</span>
                  </div>
                </div>
                <div className="stat-decoration">
                  <div className="decoration-circle"></div>
                </div>
              </div>
              
              <div className="stat-card present">
                <div className="stat-icon">
                  <FiCheckCircle />
                </div>
                <div className="stat-content">
                  <h3>Present Today</h3>
                  <p>98</p>
                  <div className="stat-trend up">
                    <span>↑ 2% from yesterday</span>
                  </div>
                </div>
                <div className="stat-decoration">
                  <div className="decoration-circle"></div>
                </div>
              </div>
              
              <div className="stat-card absent">
                <div className="stat-icon">
                  <FiAlertCircle />
                </div>
                <div className="stat-content">
                  <h3>Absent Today</h3>
                  <p>12</p>
                  <div className="stat-trend down">
                    <span>↓ 1% from yesterday</span>
                  </div>
                </div>
                <div className="stat-decoration">
                  <div className="decoration-circle"></div>
                </div>
              </div>
              
              <div className="stat-card late">
                <div className="stat-icon">
                  <FiClock />
                </div>
                <div className="stat-content">
                  <h3>Late Today</h3>
                  <p>14</p>
                  <div className="stat-trend up">
                    <span>↑ 3% from yesterday</span>
                  </div>
                </div>
                <div className="stat-decoration">
                  <div className="decoration-circle"></div>
                </div>
              </div>
            </div>

           {/* Dashboard Content */}
                <div className="dashboard-content">
                  {/* Left Column */}
                  <div className="dashboard-left-column">
                    {/* Attendance Trends */}
                    <div className="dashboard-card trends-card">
                      <div className="card-header">
                        <h2>
                          <FiTrendingUp /> Attendance Trends
                        </h2>
                        <div className="chart-toggle">
                          <button
                            className={viewMode === "bar" ? "active" : ""}
                            onClick={() => setViewMode("bar")}
                            aria-label="Bar Chart View"
                          >
                            <FiBarChart2 />
                          </button>
                          <button
                            className={viewMode === "pie" ? "active" : ""}
                            onClick={() => setViewMode("pie")}
                            aria-label="Pie Chart View"
                          >
                            <FiPieChart />
                          </button>
                        </div>
                      </div>

                      <div className="trend-chart">
                        {viewMode === "bar" ? (
                          <div className="chart-bars">
                            {(timeRange === "monthly" ? monthlyData.labels : weeklyData.labels).map((label, index) => {
                              const present = timeRange === "monthly" ? monthlyData.present[index] : weeklyData.present[index];
                              const absent = timeRange === "monthly" ? monthlyData.absent[index] : weeklyData.absent[index];
                              const late = timeRange === "monthly" ? monthlyData.late[index] : weeklyData.late[index];

                              return (
                                <div key={label} className="chart-bar-group">
                                  <div className="bar-label">{label}</div>
                                  <div className="bars-container">
                                    <div className="present-bar" style={{ height: `${present}%` }} data-tooltip={`Present: ${present}%`}></div>
                                    <div className="absent-bar" style={{ height: `${absent}%` }} data-tooltip={`Absent: ${absent}%`}></div>
                                    <div className="late-bar" style={{ height: `${late}%` }} data-tooltip={`Late: ${late}%`}></div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="chart-pie-container">
                            <div className="chart-pie">
                              <div className="pie-segment present" style={{ "--value": 80 }}></div>
                              <div className="pie-segment absent" style={{ "--value": 12 }}></div>
                              <div className="pie-segment late" style={{ "--value": 8 }}></div>
                              <div className="pie-center">
                                <div className="pie-percentage">80%</div>
                                <div className="pie-label">Present</div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="chart-legend">
                          <div className="legend-item">
                            <span className="present-dot"></span> Present
                          </div>
                          <div className="legend-item">
                            <span className="absent-dot"></span> Absent
                          </div>
                          <div className="legend-item">
                            <span className="late-dot"></span> Late
                          </div>
                        </div>
                      </div>
                    </div>


                {/* Department Performance */}
                <div className="dashboard-card dept-performance-card">
                  <div className="card-header">
                    <h2>
                      <FiAward /> Department Performance
                    </h2>
                    <div className="time-range-badge">
                      {timeRange === 'weekly' ? 'This Week' : 'This Month'}
                    </div>
                  </div>
                  <div className="department-performance">
                    {departments.map(dept => (
                      <div key={dept.name} className="dept-performance-item">
                        <div className="dept-info">
                          <div className="dept-color" style={{ backgroundColor: dept.color }}></div>
                          <div>
                            <h4>{dept.name}</h4>
                            <p>{dept.employees} employees</p>
                          </div>
                          <div className={`dept-trend ${dept.trend}`}>
                            {dept.trend === 'up' ? '↑' : '↓'}
                          </div>
                        </div>
                        <div className="dept-stats">
                          <div className="stat">
                            <span className="stat-value">{dept.present}</span>
                            <span className="stat-label">Present</span>
                          </div>
                          <div className="stat">
                            <span className="stat-value">{dept.absent}</span>
                            <span className="stat-label">Absent</span>
                          </div>
                          <div className="stat">
                            <span className="stat-value">{dept.late}</span>
                            <span className="stat-label">Late</span>
                          </div>
                        </div>
                        <div className="dept-progress">
                          <div 
                            className="progress-bar" 
                            style={{ 
                              width: `${Math.round((dept.present/dept.employees)*100)}%`,
                              backgroundColor: dept.color
                            }}
                          ></div>
                          <span>{Math.round((dept.present/dept.employees)*100)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Top Performers */}
              <div className="dashboard-right-column">
                <div className="dashboard-card top-performers-card">
                  <div className="card-header">
                    <h2>
                      <FiAward /> Top Performers
                    </h2>
                    <button className="view-all">View All <FiChevronRight size={16} /></button>
                  </div>
                  <div className="top-performers-grid">
                    {employees.slice(0, 4).map((employee, index) => (
                      <div key={employee.id} className="employee-card">
                        <div className="employee-rank">#{index + 1}</div>
                        <div className="employee-avatar" style={{ backgroundColor: employee.avatarColor }}>
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="employee-details">
                          <h4>{employee.name}</h4>
                          <p>{employee.department}</p>
                          <div className="employee-stats">
                            <div className="stat">
                              <span>Present</span>
                              <strong>{employee.presentDays}/{employee.totalDays}</strong>
                            </div>
                            <div className="stat">
                              <span>Late</span>
                              <strong>{employee.lateDays}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="employee-percentage">
                          <div className="percentage-circle" style={{ '--percentage': Math.round((employee.presentDays/employee.totalDays)*100) }}>
                            <span>{Math.round((employee.presentDays/employee.totalDays)*100)}%</span>
                          </div>
                          <div className={`attendance-trend ${employee.trend}`}>
                            {employee.trend === 'up' ? '↑' : '↓'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="dashboard-card recent-activity-card">
                  <div className="card-header">
                    <h2>
                      <FiClock /> Recent Activity
                    </h2>
                  </div>
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon success">
                        <FiCheckCircle />
                      </div>
                      <div className="activity-content">
                        <p>Arjun Patel checked in at 9:02 AM</p>
                        <span className="activity-time">Today, 9:02 AM</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon warning">
                        <FiLate />
                      </div>
                      <div className="activity-content">
                        <p>Priya Sharma was late by 15 minutes</p>
                        <span className="activity-time">Today, 9:15 AM</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon alert">
                        <FiAlertCircle />
                      </div>
                      <div className="activity-content">
                        <p>Rahul Gupta marked as absent</p>
                        <span className="activity-time">Today, 10:30 AM</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon info">
                        <FiUser />
                      </div>
                      <div className="activity-content">
                        <p>New employee onboarded: Vikram Singh</p>
                        <span className="activity-time">Yesterday, 2:45 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Detailed Report Tab */}
        {activeTab === 'report' && (
          <div className="detailed-report">
            <div className="report-header">
              <h2>
                <FiBarChart2 /> Detailed Attendance Report
              </h2>
              <div className="report-actions">
                <div className="search-filter">
                  <div className="search-input">
                    <FiSearch className="search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search employees..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select 
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="all">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept.name} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                <CSVLink 
                  data={csvData} 
                  filename="attendance_report.csv"
                  className="download-btn"
                >
                  <FiDownload /> Export CSV
                </CSVLink>
              </div>
            </div>
            
            <div className="report-content">
              <div className="view-toggle">
                <button 
                  className={viewMode === 'grid' ? 'active' : ''}
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid /> Grid
                </button>
                <button 
                  className={viewMode === 'list' ? 'active' : ''}
                  onClick={() => setViewMode('list')}
                >
                  <FiList /> List
                </button>
              </div>

              {viewMode === 'grid' ? (
                <div className="employee-grid">
                  {filteredEmployees.map(employee => (
                    <div key={employee.id} className="employee-card">
                      <div className="employee-avatar" style={{ backgroundColor: employee.avatarColor }}>
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="employee-info">
                        <h4>{employee.name}</h4>
                        <p className="employee-id">{employee.id}</p>
                        <p className="employee-dept">{employee.department}</p>
                        <p className="employee-position">{employee.position}</p>
                      </div>
                      <div className="employee-stats">
                        <div className="stat">
                          <span>Present</span>
                          <strong>{employee.presentDays}/{employee.totalDays}</strong>
                        </div>
                        <div className="stat">
                          <span>Late</span>
                          <strong>{employee.lateDays}</strong>
                        </div>
                        <div className="stat">
                          <span>Early Leave</span>
                          <strong>{employee.earlyLeave}</strong>
                        </div>
                      </div>
                      <div className="attendance-percentage">
                        <div className="percentage-circle" style={{ '--percentage': Math.round((employee.presentDays/employee.totalDays)*100) }}>
                          <span>{Math.round((employee.presentDays/employee.totalDays)*100)}%</span>
                        </div>
                        <div className={`attendance-trend ${employee.trend}`}>
                          {employee.trend === 'up' ? '↑' : '↓'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="employee-table-container">
                  <table className="employee-table">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Present Days</th>
                        <th>Late Days</th>
                        <th>Early Leave</th>
                        <th>Attendance %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map(employee => (
                        <tr key={employee.id}>
                          <td>
                            <div className="employee-cell">
                              <div className="employee-avatar" style={{ backgroundColor: employee.avatarColor }}>
                                {employee.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="employee-name">{employee.name}</div>
                                <div className="employee-id">{employee.id}</div>
                              </div>
                            </div>
                          </td>
                          <td>{employee.department}</td>
                          <td>{employee.position}</td>
                          <td>{employee.presentDays}/{employee.totalDays}</td>
                          <td>{employee.lateDays}</td>
                          <td>{employee.earlyLeave}</td>
                          <td>
                            <div className="attendance-progress">
                              <div 
                                className="progress-bar" 
                                style={{ width: `${Math.round((employee.presentDays/employee.totalDays)*100)}%` }}
                              ></div>
                              <span>{Math.round((employee.presentDays/employee.totalDays)*100)}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceDashboard;