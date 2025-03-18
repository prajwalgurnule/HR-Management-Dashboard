import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import './JobListCard.css'
import { BsArrowUp } from "react-icons/bs";
function JobListCard({data}) {
  return (
        <>
        <Row className='p-4'>
            {data.map((item,index)=>(
                <Col key={index} className='p-1'>
                    <Card className='p-2'>
                    <div className='d-flex justify-content-between'>
                            <div>
                            <img src={item.logo} style={{width:'20px', height:'20px'}}/>
                            <p className='d-inline'> {item.role}</p>
                            </div>
                            <div>
                            {item.jobCode}
                            </div>
                        </div>
                        {/* <Row>
                            <Col>
                             <img src={item.logo} style={{width:'20px', height:'20px'}}/>
                               <p className='role-text d-inline'> {item.role}</p>
                            </Col>
                            <Col sm={4} className='text-end'>
                                {item.jobCode}
                            </Col>
                        </Row> */}
                        <hr></hr>
                        <Row className='text-center pt-3'>
                            <span className='role-text'>{item.grade}</span>
                        </Row>
                        <Row className='text-center pt-2'>
                            <Col className='p-4'>
                                <span style={{background:item.colorCode,color:item.textColorCode,padding:'20px',borderRadius:'5px',fontWeight:'500',fontSize:'21px'}}>
                                    {item.count}
                                </span>
                            </Col>
                        </Row>
                        <Row className='text-center'>
                            <span className='role-text p-2'>Total Applicants</span>
                        </Row>
                        <hr className='mb-0'></hr>
                        <div className='d-flex justify-content-between'>
                            <div>
                            <BsArrowUp color='#2474c5'/>
                            <span className='footer-text'> <span className='footer-clr'>{item.range}</span> vs Last Month</span>
                            </div>
                            <div className='footer-text pt-1'>
                            6 mins ago
                            </div>
                        </div>
                      
                    </Card>     
                </Col>
            ))}
        </Row>
           
        </>
    )
}

export default JobListCard