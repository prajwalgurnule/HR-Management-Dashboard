import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';

const DashboardCards = () => {
  const data = [
    {
      title: 'Total Employees',
      value: '173',
      change: '1.8%',
      changeType: 'positive',
      difference: '+16 from last month',
    },
    {
      title: 'Job Applicant',
      value: '983',
      change: '2.4%',
      changeType: 'positive',
      difference: '+32 from last month',
    },
    {
      title: 'Total Revenue',
      value: '$4,842.00',
      change: '4.2%',
      changeType: 'positive',
      difference: '+$3,834.00 from last month',
    },
    {
      title: 'Attendance Rate',
      value: '75%',
      change: '1.7%',
      changeType: 'negative',
      difference: '-6.4% from last month',
    },
  ];

  return (
    <Row className="g-4 d-flex justify-content-center">
      {data.map((item, index) => (
        <Col key={index} md={6} lg={6} className="d-flex justify-content-center">
          <Card style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '15px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'left',
            width: '90%',
            maxWidth: '350px',
            minHeight: '150px'
          }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <h6 style={{ fontSize: '14px', color: '#6c757d' }}>{item.title}</h6>
                <BsThreeDotsVertical size={16} color="#6c757d" />
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0' }}>{item.value}</h2>
              <div className="d-flex align-items-center">
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  background: item.changeType === 'positive' ? '#e6f7e6' : '#f8d7da',
                  color: item.changeType === 'positive' ? '#28a745' : '#dc3545',
                }}>
                  {item.changeType === 'positive' ? <FiArrowUpRight size={12} /> : <FiArrowDownRight size={12} />} &nbsp;
                  {item.change}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#6c757d', marginTop: '5px' }}>{item.difference}</p>
              <button style={{
                background: 'transparent',
                border: '1px solid #007bff',
                color: '#007bff',
                fontSize: '12px',
                padding: '4px 8px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}>
                Details →
              </button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardCards;
