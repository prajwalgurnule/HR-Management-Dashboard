import React from 'react'
import {Button, Col, Row} from 'react-bootstrap'

function UpcomingList({data}) {
  return (
    <>
        <div>
            {data.map((item,index)=>(
                <Row key={index} className='ps-0 pe-0 pb-3  pt-4'>
                    <Col sm={2} style={{background:item.bgColor}}>
                        <div className='pt-2 ps-2 date-cls' style={{fontWeight:600}}> {item.date}</div>
                        <div className='ps-1'>{item.month}</div>
                    </Col>
                    <Col sm={7}>
                        <div>{item.heading}</div>
                        <div className='created-cls'>Created by <span className='icon-clr'> {item.createdBy} </span></div>
                        <div className='timing-cls'>{item.timing}</div>
                    </Col>
                    <Col sm={3}>
                        <Button style={{background:'#2474c5'}}> Details</Button>
                    </Col>
                </Row>
            ))}
        </div>
    </>
  )
}

export default UpcomingList