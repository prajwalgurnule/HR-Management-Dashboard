import React, { useContext } from 'react'
import {Navbar,Container,InputGroup,FormControl, Row, Col, Image} from 'react-bootstrap'
import '../style.css'
import { NavLink } from 'react-router-dom';
import profile from '../assets/profile.jpg'
import {CiLight ,CiDark ,CiSearch,CiSettings} from 'react-icons/ci';
import {PiChatCircleTextLight,PiFileTextThin,PiBellThin} from 'react-icons/pi';
import { ThemeContext } from '../Context/ThemeContext'

function NavbarComp() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const combinedSty=`${theme} shadow bg-body-white navbarCls border-bottom border-light-subtle`
  const combinedSty1=`bg-white shadow bg-body-white navbarCls border-bottom border-light-subtle`
  return (
    <>
      <Navbar className={`${theme=='light'?combinedSty1:combinedSty}`} >
      <Container>
          <Row className='p-0 m-0'>
          <Col>
                <Navbar.Brand href="#home" style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff', letterSpacing: '1px', textTransform: 'uppercase' }}>HR Dashboard</Navbar.Brand>
          </Col>
          <Col>
          {/* <div className="search-container">
              <div className="input-wrapper shadow">
                <input type="text" className="search-input" placeholder="Search" />
                <CiSearch className='search-icon'/>
              </div>
          </div> */}
      </Col>
      </Row>
          <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Row>
            <Col>
               <NavLink className="nav-link" onClick={toggleTheme}>
                 {theme=='dark' ? <CiLight size={25}/> : <CiDark size={25} />}
                </NavLink>
            </Col>
            {/* <Col>
              <NavLink className="nav-link">
               <PiFileTextThin size={25}/>
               </NavLink>
            </Col> */}
            <Col> 
               <NavLink className="nav-link">
                 <PiChatCircleTextLight size={25}/>
               </NavLink>
            </Col>
            <Col>
              <NavLink className="nav-link">
                 {/* <LuBellDot size={25}/> */}
                 <PiBellThin size={25}/>
               </NavLink>
            </Col>
            <Col>
               <NavLink className="nav-link">
               <CiSettings size={25}/>
              </NavLink>
            </Col>
            <Col>
              <Image src={profile} roundedCircle className='profile'/>
            </Col>
          </Row>
        </Navbar.Collapse>
        </Container>

      </Navbar>


    </>
  )
}

export default NavbarComp