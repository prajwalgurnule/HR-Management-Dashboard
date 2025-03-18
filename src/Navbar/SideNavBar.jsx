import React, { useContext, useState } from 'react';
import { Image, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './SideBar.css';
import { ThemeContext } from '../Context/ThemeContext';
import home from '../assets/home.png';
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import icon3 from '../assets/icon3.png';
import icon4 from '../assets/icon4.png';
import icon5 from '../assets/icon5.png';
import icon6 from '../assets/icon6.png';
import icon7 from '../assets/icon7.png';
import { FaBars, FaTimes } from 'react-icons/fa';

function SideNavBar() {
    const { theme } = useContext(ThemeContext);
    const [isOpen, setIsOpen] = useState(true);

    const styl = `${theme} col-md-12 d-none d-md-block bg-body-white sidebar shadow border-end border-top border-bottom border-light-subtle ${isOpen ? '' : 'collapsed'}`;
    const styl1 = `bg-white col-md-12 d-none d-md-block bg-body-white sidebar shadow border-end border-top border-bottom border-light-subtle ${isOpen ? '' : 'collapsed'}`;

    const navItems = [
        { icon: home, text: 'Home', link: '/' },
        { icon: icon1, text: 'Candidates', link: '/candidates' },
        { icon: icon2, text: 'Jobs', link: '/jobs' },
        { icon: icon3, text: 'Schedule', link: '/schedule' },
        { icon: icon4, text: 'Reports', link: '/reports' },
        { icon: icon5, text: 'Tasks', link: '/settings' },
        { icon: icon6, text: 'Team', link: '/team' },
        { icon: icon7, text: 'Logout', link: '/logout' },
    ];

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="nav-container">
                <Nav className={`${theme === 'light' ? styl1 : styl}`} style={{ width: isOpen ? '150px' : '60px', borderTopRightRadius: '25px', paddingTop: '20px', height: '100%' }}>
                    <div className="sidebar-sticky"></div>
                    <div className="toggle-button align-items-center" onClick={toggleSidebar} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '10px', cursor: 'pointer' }}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </div>
                    {navItems.map((item, index) => (
                        <Nav.Item key={index} className=" d-flex align-items-left mb-2">
                            <NavLink to={item.link} className="d-flex align-items-center nav-link-custom" style={{ padding: '8px 10px', width: '100%' }}>
                                <Image src={item.icon} width={20} className="me-2" />
                                {isOpen && <span>{item.text}</span>}
                            </NavLink>
                        </Nav.Item>
                    ))}
                </Nav>
            </div>
        </>
    );
}

export default SideNavBar;