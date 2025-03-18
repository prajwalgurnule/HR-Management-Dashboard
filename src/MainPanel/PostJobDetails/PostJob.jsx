import React, { useState } from 'react';
import { Button, Card, Col, Nav, Row } from 'react-bootstrap';
import './PostJob.css';
import { CiSearch } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";
import JobListCard from './JobListCard';
import java from '../../assets/java.png';
import python from '../../assets/python.png';
import angular from '../../assets/angular.png';

function PostJob() {
  const [activeTab, setActiveTab] = useState("active");

  const jobData = [
    {
      logo: python,
      role: 'Python Developer',
      jobCode: '#001',
      grade: 'Senior Developer',
      count: '50',
      colorCode: '#D9E4EF',
      textColorCode: '#0A66C2',
      range: '28%',
      updatedAt: '6 mins ago',
      status: "active"
    },
    {
      logo: angular,
      role: 'Angular Developer',
      jobCode: '#002',
      grade: 'Senior Developer',
      count: '25',
      colorCode: '#73A1FB',
      textColorCode: 'white',
      range: '28%',
      updatedAt: '6 mins ago',
      status: "active"
    },
    {
      logo: angular,
      role: 'Angular Developer',
      jobCode: '#012',
      grade: 'Senior Developer',
      count: '200',
      colorCode: '#73A1FB',
      textColorCode: 'white',
      range: '28%',
      updatedAt: '6 mins ago',
      status: "inactive"
    },
    {
      logo: python,
      role: 'Python Developer',
      jobCode: '#005',
      grade: 'Senior Developer',
      count: '250',
      colorCode: '#D9E4EF',
      textColorCode: '#0A66C2',
      range: '28%',
      updatedAt: '6 mins ago',
      status: "inactive"
    },
    {
      logo: java,
      role: 'Java Developer',
      jobCode: '#003',
      grade: 'Senior Developer',
      count: '200',
      colorCode: '#2F73A0',
      textColorCode: 'white',
      range: '28%',
      updatedAt: '6 mins ago',
      status: "completed"
    }
  ];

  // Filter jobs based on active tab
  const filteredJobs = jobData.filter(job => job.status === activeTab);

  return (
    <>
      <Card>
        <Row className='p-4'>
          <Col>
            <span className='post-text'> Posted Jobs </span>
            <span className='view-all'>View All</span>
          </Col>
          <Col>
            <div className="search-container">
              <div className="input-wrapper shadow">
                <input type="text" className="search-input" placeholder="Search" />
                <CiSearch className='search-icon' />
              </div>
              <div className="button-wrapper">
                <Button className="search-button btn-light text-dark shadow">
                  <IoFilter size={20} className='icon-clr' />&nbsp;
                  Filter
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Tabs Navigation */}
        <Nav variant="tabs" defaultActiveKey="active" className='nav-tab-cls'>
          <Nav.Item className='n-item'>
            <Nav.Link eventKey="active" onClick={() => setActiveTab("active")}>Active Jobs</Nav.Link>
          </Nav.Item>
          <Nav.Item className='n-item'>
            <Nav.Link eventKey="inactive" onClick={() => setActiveTab("inactive")}>Inactive Jobs</Nav.Link>
          </Nav.Item>
          <Nav.Item className='n-item'>
            <Nav.Link eventKey="completed" onClick={() => setActiveTab("completed")}>Completed Jobs</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Render Filtered Jobs */}
        <JobListCard data={filteredJobs} />
      </Card>
    </>
  );
}

export default PostJob;
