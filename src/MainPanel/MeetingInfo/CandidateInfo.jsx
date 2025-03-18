import React from 'react'
import './MeetingInfoTable.css'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import { CiCalendar } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
function CandidateInfo({userData}) {
    const buttonStyle = {
        color: '#2474c5', // Text color
        border: '1px solid #2474c5', // Border color and width
        backgroundColor: 'transparent', // Transparent background
        fontSize: '16px', // Font size
        cursor: 'pointer', // Cursor style
        borderRadius: '5px', // Border radius
        outline: 'none', // Remove default focus outline
      };
      const buttonStyle1 = {
        color: 'white', // Text color
        backgroundColor: '#2474c5', // Transparent background
        fontSize: '16px', // Font size
        cursor: 'pointer', // Cursor style
        borderRadius: '5px', // Border radius
        outline: 'none', // Remove default focus outline
      };
    
  return (
    <>
    <div className="horizontal-scroll-container custom-scrollbar" >
        {userData.map((item,index)=>(
           <Card key={index} className="scroll-card mb-4 m-3 ">
               <Row >
                <Col sm={5} className=' pt-3 pb-0 pe-0 text-center' style={{borderRight:'2px solid #f5f5f5'}}>
                  <div style={{borderBottom:'2px solid #f5f5f5'}}>  
                    <img src={item.img} style={{width:'100px',height:'100px',borderRadius:'50px', border: '2px solid #2474c5'}}/>
                    
                    <h5>{item.name}</h5>
                    <h6>{item.role}</h6>
                    </div>
                        <Row style={{color:'#2474c5'}}>
                            <Col className='ms-2 me-2 p-2' style={{borderRight:'2px solid #f5f5f5'}}>
                            <CiCalendar size={20}/><br></br>
                              18th March 2025
                            </Col>
                            <Col className='ms-2 me-2 p-2'>
                                <CiClock2 size={20}/><br></br>
                                10.30 A.M
                            </Col>
                        </Row>
                </Col>
                <Col style={{paddingLeft:'0'}}>
                    <Table  bordered hover>
                        <thead>
                            <th></th>
                            <th></th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1st Level:&nbsp;&nbsp; {item.fstLevel.score}</td>
                                <td>Interviewer:&nbsp;&nbsp; {item.fstLevel.interviewer}</td>
                            </tr>
                            <tr>
                                <td>2nd Level:&nbsp;&nbsp; {item.sndLevel.score}</td>
                                <td>Interviewer:&nbsp;&nbsp; {item.sndLevel.interviewer}</td>
                            </tr>
                            <tr>
                                <td>3rd Level:&nbsp;&nbsp; {item.trdLevel.score}</td>
                                <td>Interviewer: &nbsp;&nbsp;<span style={{color:'#2474c5'}}>{item.trdLevel.interviewer}</span></td>
                            </tr>
                            <tr>
                                <td>Meet Via: &nbsp;&nbsp;{item.meetvia}</td>
                                <td>Interviewer:&nbsp;&nbsp;{item.attendees}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Row className='text-center p-1'>
                        <Col>
                            <Button style={buttonStyle}>Reschedule Meeting</Button>
                        </Col>
                        <Col>
                            <Button style={buttonStyle1}>Join Meeting</Button>
                        </Col>
                    </Row>
                </Col>
               </Row>
           </Card>
          
        ))}
        </div>
        
    </>
   
  )
}

export default CandidateInfo