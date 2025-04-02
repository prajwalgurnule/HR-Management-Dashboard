import { Routes, Route } from 'react-router-dom'
import NavbarComp from "./Navbar/NavbarComp"
import SideBar from "./Navbar/SideBar"
import MainPage from "./MainPanel/MainPage"
import ResourcesDevelopment from "./RND/ResourcesDevelopment"
import Employees from "./Employee/Employee"
import { useContext } from "react"
import { ThemeContext } from "./Context/ThemeContext"
import PayrollDashboard from './Payroll/PayrollDashboard'
import './App.css'; // Make sure you have this CSS file
import HiringPortal from './Hiring/HiringPortal'
import Inbox from './Inbox/Inbox'
import Calendar from './Calendar/Calendar'
import Tasks from './Tasks/Tasks'
import Projects from './Projects/Projects'
import AttendanceDashboard from './Attendance/Attendance'

function App() {
  const { theme } = useContext(ThemeContext)
  const styl = 'd-flex app-container' // Added app-container class
  const combinedClass = `${styl} ${theme}`
  
  return (
    <div className={theme}> {/* Wrapped entire app in theme class */}
      <NavbarComp />
      <div className={combinedClass}>
        <div className="sidebar-container"> {/* Added container class */}
          <SideBar />
        </div>
        <div className={`main-content ${theme}`} style={{ margin: '20px', flex: 1 }}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/tasks" element={<Tasks/>} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/resources-development" element={<ResourcesDevelopment />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<AttendanceDashboard />} />
            <Route path="/payrolldash" element={<PayrollDashboard />} />
            <Route path="/hiring" element={<HiringPortal />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App;