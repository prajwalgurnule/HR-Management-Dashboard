import React, { useState } from 'react';
import { FiDollarSign, FiUsers, FiCalendar, FiCheckCircle, FiClock, FiXCircle, FiSearch, FiChevronDown, FiPlus } from 'react-icons/fi';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import './PayrollDashboard.css';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, 
  ArcElement, PointElement, LineElement
);

const PayrollDashboard = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    email: '',
    gross: '',
    performance: 'Good',
    status: 'PENDING'
  });

  // Employee data from org chart
  const orgChartData = {
    name: "Arjun Mehta",
    attributes: {
      title: "CEO",
      email: "Arjun.Mehta@example.com",
      phone: "+91-98765-43210",
      department: "Management",
    },
    children: [
      {
        name: "Priya Iyer",
        attributes: {
          title: "CTO",
          email: "Priya.Iyer@example.com",
          phone: "+91-87654-32109",
          department: "Technology",
        },
        children: [
          {
            name: "Rohan Sharma",
            attributes: {
              title: "Finance Manager",
              email: "Rohan.Sharma@example.com",
              phone: "+91-99887-65432",
              department: "Finance",
            },
          },
          {
            name: "Ananya Nair",
            attributes: {
              title: "Accountant",
              email: "Ananya.Nair@example.com",
              phone: "+91-88776-54321",
              department: "Finance",
            },
          },
          {
            name: "Vikram Rao",
            attributes: {
              title: "Security Analyst",
              email: "Vikram.Rao@example.com",
              phone: "+91-77665-43210",
              department: "Security",
            },
          },
        ],
      },
      {
        name: "Siddharth Verma",
        attributes: {
          title: "COO",
          email: "Siddharth.Verma@example.com",
          phone: "+91-66554-32100",
          department: "Operations",
        },
        children: [
          {
            name: "Meera Banerjee",
            attributes: {
              title: "Operations Manager",
              email: "Meera.Banerjee@example.com",
              phone: "+91-55443-21099",
              department: "Operations",
            },
          },
          {
            name: "Kabir Malhotra",
            attributes: {
              title: "Logistics Coordinator",
              email: "Kabir.Malhotra@example.com",
              phone: "+91-44332-10988",
              department: "Logistics",
            },
          },
        ],
      },
      {
        name: "Neha Kulkarni",
        attributes: {
          title: "CFO",
          email: "Neha.Kulkarni@example.com",
          phone: "+91-33221-09877",
          department: "Finance",
        },
        children: [
          {
            name: "Arvind Joshi",
            attributes: {
              title: "Treasury Head",
              email: "Arvind.Joshi@example.com",
              phone: "+91-22110-98766",
              department: "Finance",
            },
          },
          {
            name: "Farhan Khan",
            attributes: {
              title: "Risk Analyst",
              email: "Farhan.Khan@example.com",
              phone: "+91-11099-87655",
              department: "Risk Management",
            },
          },
        ],
      },
    ],
  };

  // Function to flatten the org chart into employee list
  const flattenOrgChart = (node) => {
    const employees = [{
      id: Math.floor(Math.random() * 10000),
      name: node.name,
      position: node.attributes.title,
      email: node.attributes.email,
      gross: Math.floor(Math.random() * 10000) + 3000,
      taxes: 0,
      net: 0,
      performance: ['Good', 'Moderate', 'Poor'][Math.floor(Math.random() * 3)],
      status: ['PAID', 'PENDING', 'UNPAID'][Math.floor(Math.random() * 3)],
      avatarColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }];
    
    // Calculate taxes and net (20% tax rate for example)
    employees[0].taxes = employees[0].gross * 0.2;
    employees[0].net = employees[0].gross - employees[0].taxes;
    
    if (node.children) {
      node.children.forEach(child => {
        employees.push(...flattenOrgChart(child));
      });
    }
    
    return employees;
  };

  // Initial employees from org chart
  const initialEmployees = flattenOrgChart(orgChartData);

  // State for employees
  const [employees, setEmployees] = useState(initialEmployees);

  // Sample data
  const payrollData = {
    grossSalary: employees.reduce((sum, emp) => sum + emp.gross, 0),
    taxDeduction: employees.reduce((sum, emp) => sum + emp.taxes, 0),
    netSalary: employees.reduce((sum, emp) => sum + emp.net, 0),
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    monthlyData: [20000, 21000, 22000, 23000, 24000, 25000, 26000, 27000, 28000, 29000, 30000, 31000],
    taxRates: [15, 18, 20, 22, 25, 27, 28, 29, 30, 28, 26, 25],
    paymentStatus: {
      paid: Math.round((employees.filter(e => e.status === 'PAID').length / employees.length) * 100),
      pending: Math.round((employees.filter(e => e.status === 'PENDING').length / employees.length) * 100),
      unpaid: Math.round((employees.filter(e => e.status === 'UNPAID').length / employees.length) * 100)
    },
    timeOff: [
      { name: 'Meera Banerjee', type: 'Sick leave', days: 3, date: 'Jun 15-17' },
      { name: 'Kabir Malhotra', type: 'Family Trip', days: 5, date: 'Jun 20-24' },
      { name: 'Vikram Rao', type: 'Personal Issue', days: 2, date: 'Jun 10-11' }
    ]
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => {
    return employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           employee.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Handle input change for new employee form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new employee
  const handleAddEmployee = (e) => {
    e.preventDefault();
    const gross = parseFloat(newEmployee.gross) || 0;
    const taxes = gross * 0.2; // Assuming 20% tax
    const net = gross - taxes;
    
    const employee = {
      id: Math.floor(Math.random() * 10000),
      name: newEmployee.name,
      position: newEmployee.position,
      email: newEmployee.email,
      gross,
      taxes,
      net,
      performance: newEmployee.performance,
      status: newEmployee.status,
      avatarColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    };
    
    setEmployees([...employees, employee]);
    setNewEmployee({
      name: '',
      position: '',
      email: '',
      gross: '',
      performance: 'Good',
      status: 'PENDING'
    });
    setShowAddEmployee(false);
  };

  // Charts data
  const salaryTrendData = {
    labels: payrollData.months,
    datasets: [
      {
        label: 'Gross Salary',
        data: payrollData.monthlyData,
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      }
    ]
  };

  const taxTrendData = {
    labels: payrollData.months,
    datasets: [
      {
        label: 'Tax Rate (%)',
        data: payrollData.taxRates,
        borderColor: 'rgba(239, 68, 68, 0.8)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }
    ]
  };

  const paymentStatusData = {
    labels: ['Paid', 'Pending', 'Unpaid'],
    datasets: [{
      data: [payrollData.paymentStatus.paid, payrollData.paymentStatus.pending, payrollData.paymentStatus.unpaid],
      backgroundColor: [
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(239, 68, 68, 0.7)'
      ],
      borderColor: [
        'rgba(16, 185, 129, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(239, 68, 68, 1)'
      ],
      borderWidth: 1
    }]
  };

  // Chart options (same as before)
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif"
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleFont: {
          size: 16,
          weight: 'bold'
        },
        bodyFont: {
          size: 14
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return '$' + context.raw.toLocaleString();
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12,
            weight: '500'
          },
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif"
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleFont: {
          size: 16,
          weight: 'bold'
        },
        bodyFont: {
          size: 14
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return context.raw + '%';
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12,
            weight: '500'
          },
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif"
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleFont: {
          size: 16,
          weight: 'bold'
        },
        bodyFont: {
          size: 14
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.raw + '%';
          }
        }
      }
    }
  };

  return (
    <div className="payroll-dashboard">
      <header className="payroll-header">
        <h1 className="payroll-title">Payroll Dashboard</h1>
        <div className="payroll-header-controls">
          <div className="payroll-search-bar">
            <FiSearch className="payroll-search-icon" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="payroll-search-input"
            />
          </div>
        </div>
      </header>

      <nav className="payroll-tabs">
        <button
          className={`payroll-tab-button ${activeTab === 'summary' ? 'payroll-active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          <FiDollarSign className="payroll-tab-icon" />
          <span>Payroll Summary</span>
        </button>
        <button
          className={`payroll-tab-button ${activeTab === 'employees' ? 'payroll-active' : ''}`}
          onClick={() => setActiveTab('employees')}
        >
          <FiUsers className="payroll-tab-icon" />
          <span>Employees</span>
        </button>
        <button
          className={`payroll-tab-button ${activeTab === 'timeoff' ? 'payroll-active' : ''}`}
          onClick={() => setActiveTab('timeoff')}
        >
          <FiCalendar className="payroll-tab-icon" />
          <span>Time Off</span>
        </button>
      </nav>

      <main className="payroll-content">
        {activeTab === 'summary' && (
          <>
            <section className="payroll-summary-cards">
              <div className="payroll-summary-card payroll-gross">
                <h3>Gross Salary</h3>
                <p className="payroll-amount">${payrollData.grossSalary.toLocaleString()}</p>
                <div className="payroll-trend payroll-up">+5.2% from last month</div>
              </div>
              <div className="payroll-summary-card payroll-tax">
                <h3>Tax Deduction</h3>
                <p className="payroll-amount">${payrollData.taxDeduction.toLocaleString()}</p>
                <div className="payroll-trend payroll-down">30% rate</div>
              </div>
              <div className="payroll-summary-card payroll-net">
                <h3>Net Salary</h3>
                <p className="payroll-amount">${payrollData.netSalary.toLocaleString()}</p>
                <div className="payroll-trend payroll-up">+3.8% from last month</div>
              </div>
            </section>

            <section className="payroll-chart-section">
              <div className="payroll-chart-card">
                <div className="payroll-chart-header">
                  <h3>Monthly Salary Trends</h3>
                  <div className="payroll-chart-legend">
                    <div className="payroll-legend-item">
                      <span className="payroll-legend-color payroll-gross"></span>
                      <span>Gross Salary</span>
                    </div>
                  </div>
                </div>
                <div className="payroll-chart-wrapper">
                  <Bar data={salaryTrendData} options={barChartOptions} />
                </div>
              </div>

              <div className="payroll-chart-card">
                <div className="payroll-chart-header">
                  <h3>Tax Rate Trends</h3>
                  <div className="payroll-chart-legend">
                    <div className="payroll-legend-item">
                      <span className="payroll-legend-color payroll-tax"></span>
                      <span>Tax Rate (%)</span>
                    </div>
                  </div>
                </div>
                <div className="payroll-chart-wrapper">
                  <Line data={taxTrendData} options={lineChartOptions} />
                </div>
              </div>
            </section>

            <section className="payroll-status-section">
              <div className="payroll-status-card">
                <div className="payroll-chart-header">
                  <h3>Payment Status</h3>
                </div>
                <div className="payroll-pie-chart-wrapper">
                  <Pie data={paymentStatusData} options={pieChartOptions} />
                </div>
                <div className="payroll-status-details">
                  <div className="payroll-status-item payroll-paid">
                    <FiCheckCircle className="payroll-status-icon" />
                    <div>
                      <span className="payroll-percentage">{payrollData.paymentStatus.paid}%</span>
                      <span className="payroll-label">Paid</span>
                    </div>
                  </div>
                  <div className="payroll-status-item payroll-pending">
                    <FiClock className="payroll-status-icon" />
                    <div>
                      <span className="payroll-percentage">{payrollData.paymentStatus.pending}%</span>
                      <span className="payroll-label">Pending</span>
                    </div>
                  </div>
                  <div className="payroll-status-item payroll-unpaid">
                    <FiXCircle className="payroll-status-icon" />
                    <div>
                      <span className="payroll-percentage">{payrollData.paymentStatus.unpaid}%</span>
                      <span className="payroll-label">Unpaid</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'employees' && (
          <section className="payroll-employees-section">
            <div className="payroll-employees-header">
              <h3>Employee Payroll</h3>
              <button 
                className="payroll-add-employee-button"
                onClick={() => setShowAddEmployee(true)}
              >
                <FiPlus className="payroll-add-icon" />
                Add Employee
              </button>
            </div>

            {showAddEmployee && (
              <div className="payroll-add-employee-form">
                <h4>Add New Employee</h4>
                <form onSubmit={handleAddEmployee}>
                  <div className="payroll-form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newEmployee.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="payroll-form-group">
                    <label>Position</label>
                    <input
                      type="text"
                      name="position"
                      value={newEmployee.position}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="payroll-form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newEmployee.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="payroll-form-group">
                    <label>Gross Salary ($)</label>
                    <input
                      type="number"
                      name="gross"
                      value={newEmployee.gross}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="payroll-form-group">
                    <label>Performance</label>
                    <select
                      name="performance"
                      value={newEmployee.performance}
                      onChange={handleInputChange}
                    >
                      <option value="Good">Good</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>
                  <div className="payroll-form-group">
                    <label>Payment Status</label>
                    <select
                      name="status"
                      value={newEmployee.status}
                      onChange={handleInputChange}
                    >
                      <option value="PAID">Paid</option>
                      <option value="PENDING">Pending</option>
                      <option value="UNPAID">Unpaid</option>
                    </select>
                  </div>
                  <div className="payroll-form-actions">
                    <button 
                      type="button" 
                      className="payroll-cancel-button"
                      onClick={() => setShowAddEmployee(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="payroll-save-button">
                      Save Employee
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="payroll-table-container">
              <table className="payroll-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Gross</th>
                    <th>Taxes</th>
                    <th>Net Salary</th>
                    <th>Performance</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map(employee => (
                    <tr key={employee.id}>
                      <td>
                        <div className="payroll-employee-info">
                          <div className="payroll-avatar" style={{ backgroundColor: employee.avatarColor }}>
                            {employee.name.charAt(0)}
                          </div>
                          <div>
                            <div className="payroll-name">{employee.name}</div>
                            <div className="payroll-position">{employee.position}</div>
                          </div>
                        </div>
                      </td>
                      <td>${employee.gross.toLocaleString()}</td>
                      <td className="payroll-tax">- ${employee.taxes.toLocaleString()}</td>
                      <td className="payroll-net">${employee.net.toLocaleString()}</td>
                      <td>
                        <span className={`payroll-performance-badge payroll-${employee.performance.toLowerCase()}`}>
                          {employee.performance}
                        </span>
                      </td>
                      <td>
                        <span className={`payroll-status-badge payroll-${employee.status.toLowerCase()}`}>
                          {employee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'timeoff' && (
          <section className="payroll-timeoff-section">
            <h3>Employee Time Off</h3>
            <div className="payroll-timeoff-cards">
              {payrollData.timeOff.map((item, index) => (
                <div key={index} className="payroll-timeoff-card">
                  <div className="payroll-employee-info">
                    <div className="payroll-avatar" style={{ backgroundColor: '#6366F1' }}>
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <div className="payroll-name">{item.name}</div>
                      <div className="payroll-type">{item.type}</div>
                    </div>
                  </div>
                  <div className="payroll-timeoff-details">
                    <div className="payroll-days">{item.days} days</div>
                    <div className="payroll-date">{item.date}</div>
                  </div>
                </div>
              ))}
              <div className="payroll-view-all-card">
                <button className="payroll-view-all-button">View All Time Off Requests</button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default PayrollDashboard;