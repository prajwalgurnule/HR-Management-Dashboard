import React from 'react'
import './Upcoming.css'
import UpcomingList from './UpcomingList'

function Upcoming() {
    const details=[
        {
            date:'07',
            month:'Feb',
            heading:'Interview with Designer',
            createdBy:'Stella',
            bgColor:'#0B74AD26',
            color:'#0B74AD',
            timing:'10 A.M to 11 A.M'
        },
        {
            date:'07',
            month:'Feb',
            heading:'Interview with Designer',
            createdBy:'Stella',
            bgColor:'#C0C1C1',
            color:'#091316',
            timing:'10 A.M to 11 A.M'
        },
        {
            date:'07',
            month:'Feb',
            heading:'Interview with Designer',
            createdBy:'Stella',
            bgColor:'#E1E1E1',
            color:'#091316',
            timing:'10 A.M to 11 A.M'
        }
    ]
  return (
    <>
        <div className='pt-4'>
            <div className='d-flex justify-content-between'>
                    <div>
                        <span className='heading-text'>Upcomings</span>
                    </div>
                    <div className='pt-1'>
                        <span className='view-all'>View All</span>
                    </div>
            </div>
            <div>
                <UpcomingList data={details}/>
            </div>
        </div>
    </>
)
}

export default Upcoming