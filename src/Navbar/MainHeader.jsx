// src/components/MainNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaInfo } from 'react-icons/fa';
import { LuContact } from "react-icons/lu";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #333;
  padding: 1rem;
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;

  &:hover {
    color: #ddd;
  }
`;

const MainNavbar = () => (
  <Navbar>
    <NavItem to="/"><FaHome /> Home</NavItem>
    <NavItem to="/about"><FaInfo /> About</NavItem>
    <NavItem to="/contact"><LuContact /> Contact</NavItem>
  </Navbar>
);

export default MainNavbar;
