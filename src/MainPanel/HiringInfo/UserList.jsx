import React from 'react'
import { Row,Col,Image, Button } from 'react-bootstrap'
function UserList({data,isHiring}) {
  return (
    <>
         <div>
            {data.map((item,index)=>(
                <Row key={index} className='ps-0 pe-0 pb-2 pt-4'>
                    <Col sm={2} style={{background:item.bgColor}}>
                       <Image src={item.profile} style={{width:'50px',height:'50px'}} roundedCircle/>
                    </Col>
                    <Col sm={7}>
                        <div className='name-cls'>{item.name} 
                            {!isHiring&& <span className='role-cls'>[{item.role}]</span>}</div>
                        <div className='created-cls'>{!isHiring ?  item.subHead :item.role }</div>
                        <div className='timing-cls'>{!isHiring ? item.updatedAt : "Hired by:" + item.hiredBy}</div>
                    </Col>
                   {isHiring && <Col sm={3} >
                        <Button style={{background:'#2474c5'}}> Details</Button>
                    </Col>}
                </Row>
            ))}
        </div>
    </>
)
}

export default UserList