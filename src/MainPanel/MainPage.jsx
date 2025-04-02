import React, { useContext } from 'react'
import './MainPage.css'
import Chart from '../MainPanel/Chart/Chart.jsx'
import AssessmentCard from './Assessment/AssessmentCard.jsx'
import MeetingInfoTable from './MeetingInfo/MeetingInfoTable.jsx'
import HiringInfo from './HiringInfo/HiringInfo.jsx'
import PostJob from './PostJobDetails/PostJob.jsx'
import CandidateStatus from './CandidateStatus/CandidateStatus.jsx'
import { Card } from 'react-bootstrap'
import { ThemeContext } from '../Context/ThemeContext.jsx'
import TaskManagement from './Task/Task.jsx'
function MainPage() {
   const {theme}=useContext(ThemeContext);
   
  return (
    <>
       <div className='grid-container'>
        <div className='item1 m-3'>
            <div style={{fontSize:'30px'}}><b>Hey, Arnold Smith👋</b></div>
            <div className='pt-2'>Enjoy your selecting potential candidates Tracking and Management System</div>
        </div>
            <div className='item2 ms-3 pt-3'>
                 <Card className={`card ${theme}`}>
                  <Chart/>
                 </Card>
            </div>
            <div className='item3 m-3'>
              <AssessmentCard/>
            </div>
            <div className='item4 m-3'>
               <TaskManagement/>
            </div>
            <div className='item5 m-3'>
               <MeetingInfoTable/>
            </div>
            <div className='item6 m-3'>
               <HiringInfo/>
            </div>
            <div className='item7 m-3'>
               <PostJob/>
            </div>
            <div className='item8 m-3'>
               <CandidateStatus/>
            </div>
       </div>
    </>
)
}

export default MainPage