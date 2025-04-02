// Employees.jsx
import React from "react";
import EmployeeTree from "../Employee/EmployeeTree";
import { Card } from "react-bootstrap";
import { ThemeContext } from "../Context/ThemeContext";
import { useContext } from "react";
import './Employees.css';

const Employees = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className='employee-new-container'>
      {/* Header section */}
      <header className='employee-new-header'>
        <div className="header-new-content">
          <h1 className="employee-new-title">
            <strong>Hey, Arnold Smith</strong>
            <span role="img" aria-label="waving hand">👋</span>
          </h1>
        </div>
        <p className='employee-new-subtitle'>
            Manage your organization hierarchy with our Employee Tree System
        </p>
      </header>

      {/* Main content section */}
      <main className='employee-new-main'>
        <Card className={`employee-new-card ${theme}`}>
          <Card.Body className="employee-new-card-body">
            <EmployeeTree />
          </Card.Body>
        </Card>
      </main>
    </div>
  );
};

export default Employees;