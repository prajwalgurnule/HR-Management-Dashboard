// src/components/SideNavbar.js
import React from 'react';
import { Image, Nav } from 'react-bootstrap';
import {  NavLink } from 'react-router-dom';
import { LuContact,LuLayoutDashboard } from "react-icons/lu";
import home from '../assets/home.png'
import icon1 from '../assets/icon1.png'
import icon2 from '../assets/icon2.png'
import icon3 from '../assets/icon3.png'
import icon4 from '../assets/icon4.png'
import icon5 from '../assets/icon5.png'
import icon6 from '../assets/icon6.png'
import icon7 from '../assets/icon7.png'

import './SideBar.css'
const SideNavbar = () => (
  <Nav className="col-md-12 d-none d-md-block bg-body-white sidebar shadow border border-light-subtle"
       style={{ width: '60px',borderTopRightRadius:'25px',paddingTop:'20px',background:'white'}}
  >
    <div className="sidebar-sticky"></div>
    <Nav.Item>
      <NavLink ><Image src={home} width={20} /></NavLink>
    </Nav.Item>
    <Nav.Item>
      <NavLink  ><Image src={icon1} width={20}/></NavLink>
    </Nav.Item>
    <Nav.Item>
      <NavLink ><Image src={icon2} width={20}/> </NavLink>
    </Nav.Item>
    <Nav.Item>
      <NavLink ><Image src={icon3} width={20}/> </NavLink>
    </Nav.Item>
    <Nav.Item>
      <NavLink ><Image src={icon4} width={20}/> </NavLink>
    </Nav.Item>
    <Nav.Item>
      <NavLink ><Image src={icon5} width={20}/> </NavLink>
    </Nav.Item>
    <Nav.Item>
      <NavLink ><Image src={icon6} width={20}/> </NavLink>
    </Nav.Item>
    <Nav.Item>
      <NavLink ><Image src={icon7}  width={20}/> </NavLink>
    </Nav.Item>
  </Nav>
);

export default SideNavbar;
