import React from 'react'
import Calendar from './Calendar'
import Upcoming from './Upcoming'
import Activity from './Activity'
import HiringCandidates from './HiringCandidates'

function HiringInfo() {
  return (
    <>
        <Calendar/>
        <Upcoming/>
        <Activity/>
        <HiringCandidates/>
    </>
)
}

export default HiringInfo