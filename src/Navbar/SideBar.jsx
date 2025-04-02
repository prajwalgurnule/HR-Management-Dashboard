import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../Context/ThemeContext';
import profile from '../assets/profile.jpg'
import { FiUser, FiBriefcase, FiDollarSign, FiClock, FiLogOut, 
         FiSettings, FiHelpCircle, FiInbox, FiCalendar, FiFolder,
         FiChevronLeft, FiChevronRight, FiDatabase } from 'react-icons/fi';
// import './SideBar.css';

const Sidebar = ({ userData, handleLogout, openModal }) => {
    const { theme } = useContext(ThemeContext);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Define your navigation items
    const mainMenuItems = [
        { icon: <FiUser />, text: 'Dashboard', link: '/' },
        { icon: <FiFolder />, text: 'Tasks', link: '/tasks' },
        { icon: <FiInbox />, text: 'Inbox', link: '/inbox' },
        { icon: <FiCalendar />, text: 'Calendar', link: '/calendar' },
        { icon: <FiBriefcase />, text: 'Projects', link: '/projects' }
    ];

    const hrMenuItems = [
        { icon: <FiUser />, text: 'Employees', link: '/employees' },
        { icon: <FiClock />, text: 'Attendance', link: '/attendance' },
        { icon: <FiDatabase />, text: 'RND', link: '/resources-development' },
        { icon: <FiDollarSign />, text: 'Payroll', link: '/payrolldash' },
        { icon: <FiBriefcase />, text: 'Hiring', link: '/hiring' }
    ];

    const analyticsItems = [
        { icon: <FiSettings />, text: 'Settings', link: '/settings' },
        { icon: <FiHelpCircle />, text: 'Help', link: '/help' }
    ];

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`${isCollapsed ? 'w-16' : 'w-56'} ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} shadow-lg border-r p-4 transition-all duration-300 ease-in-out relative h-full`}>
            {/* Toggle Button */}
            <button 
                onClick={toggleSidebar}
                className={`absolute -right-3 top-5 bg-white dark:bg-gray-700 p-1 rounded-full shadow-md border border-gray-200 dark:border-gray-600 z-10`}
            >
                {isCollapsed ? <FiChevronRight size={14} /> : <FiChevronLeft size={14} />}
            </button>

            {/* Header with Efficio and Line */}
            <div className="flex justify-center items-center mb-6 overflow-hidden">
                <div className="text-center">
                    {!isCollapsed && (
                        <>
                            <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>Efficio</h1>
                            <hr className={`my-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`} />
                        </>
                    )}
                </div>
            </div>

            {/* User Profile Section */}
            {!isCollapsed && (
                <div className="flex items-center space-x-4 mb-6">
                    {/* {userData?.profileImage && (
                        <img
                            src={profile}
                            alt="Profile"
                            className="w-12 h-12 rounded-full border-2 border-blue-500 cursor-pointer hover:scale-105 transition-all"
                            onClick={openModal}
                        />
                    )} */}
                    <div>
                        <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
                            {userData?.fullName || 'Arnold Smith'} 
                            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}> ({userData?.role || 'HR Manager'})</span>
                        </h2>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {userData?.email || 'arnoldsmith@gmail.com'}
                        </p>
                    </div>
                </div>
            )}

            {/* Divider */}
            {!isCollapsed && <hr className={`my-4 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`} />}

            {/* Main Menu Section */}
            <div className="mb-6">
                {!isCollapsed && (
                    <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                        Main Menu
                    </h3>
                )}
                <nav className="space-y-2">
                    {mainMenuItems.map((item, index) => (
                        <NavLink 
                            key={index}
                            to={item.link}
                            className={({ isActive }) => 
                                `flex items-center p-2 rounded-md ${theme === 'dark' ? 
                                    (isActive ? 'bg-blue-900 text-white' : 'text-gray-300 hover:bg-gray-700') : 
                                    (isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-100')}`
                            }
                            title={isCollapsed ? item.text : ''}
                        >
                            {item.icon}
                            {!isCollapsed && <span>{item.text}</span>}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* HR Management Section */}
            <div className="mb-6">
                {!isCollapsed && (
                    <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                        HR Management
                    </h3>
                )}
                <nav className="space-y-2">
                    {hrMenuItems.map((item, index) => (
                        <NavLink 
                            key={index}
                            to={item.link}
                            className={({ isActive }) => 
                                `flex items-center p-2 rounded-md ${theme === 'dark' ? 
                                    (isActive ? 'bg-blue-900 text-white' : 'text-gray-300 hover:bg-gray-700') : 
                                    (isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-100')}`
                            }
                            title={isCollapsed ? item.text : ''}
                        >
                            {item.icon}
                            {!isCollapsed && <span>{item.text}</span>}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Analytics & Reports Section */}
            <div className="mb-6">
                {!isCollapsed && (
                    <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                        Analytics & Reports
                    </h3>
                )}
                <nav className="space-y-2">
                    {analyticsItems.map((item, index) => (
                        <NavLink 
                            key={index}
                            to={item.link}
                            className={({ isActive }) => 
                                `flex items-center p-2 rounded-md ${theme === 'dark' ? 
                                    (isActive ? 'bg-blue-900 text-white' : 'text-gray-300 hover:bg-gray-700') : 
                                    (isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-100')}`
                            }
                            title={isCollapsed ? item.text : ''}
                        >
                            {item.icon}
                            {!isCollapsed && <span>{item.text}</span>}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Divider */}
            {!isCollapsed && <hr className={`my-4 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`} />}

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className={`w-full flex items-center justify-center py-2 rounded-md ${theme === 'dark' ? 
                    'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-black`}
                title={isCollapsed ? "Log Out" : ""}
            >
                <FiLogOut className={isCollapsed ? "" : "mr-2"} />
                {!isCollapsed && <span>Log Out</span>}
            </button>
        </div>
    );
};

export default Sidebar;