import React, { useContext, useState } from 'react'
import { Card, CardHeader, Col, Row } from 'react-bootstrap'
import { HiOutlineDotsVertical } from "react-icons/hi";
import CandidateInfo from './CandidateInfo';
import profile from '../../assets/profile.jpg';
import { ThemeContext } from '../../Context/ThemeContext';
function MeetingInfoTable() {
    const {theme} =useContext(ThemeContext);
    const [userDetails,setUserDetails]=useState([{
        id:1,
        img:profile,
        name:'Aarav Patel',
        role:'Fullstack Developer',
        date:'19th Feb 2024',
        time:'10.30 A.M',
        fstLevel:{
            score:'7/10',
            interviewer:'Priya Sharma'
        },
        sndLevel:{
            score:'6/10',
            interviewer:'Rahul Singh'
        },
        trdLevel:{
            score:'Waiting',
            interviewer:'Anjali Menon'
        },
        meetvia:'G-Meet',
        attendees:'Suganya'

    },
    {
        id:2,
        img:profile,
        name:'Sneha Reddy',
        role:'Frontend Developer',
        date:'19th Feb 2024',
        time:'11.00 A.M',
        fstLevel:{
            score:'8/10',
            interviewer:'Priya Sharma'
        },
        sndLevel:{
            score:'7/10',
            interviewer:'Deepika Banerjee'
        },
        trdLevel:{
            score:'Waiting',
            interviewer:'Amit Joshi'
        },
        meetvia:'Zoom',
        attendees:'Karthik Nair'
    },
    {
        id:3,
        img:profile,
        name:'Rohan Chawla',
        role:'Backend Developer',
        date:'19th Feb 2024',
        time:'11.30 A.M',
        fstLevel:{
            score:'9/10',
            interviewer:'Anjali Menon'
        },
        sndLevel:{
            score:'8/10',
            interviewer:'Priya Sharma'
        },
        trdLevel:{
            score:'Waiting',
            interviewer:'Rahul Singh'
        },
        meetvia:'G-Meet',
        attendees:'Sneha Reddy'
    }]);
    const combinedSty=`${theme} pb-4`
return (
    <>
        <Card className='pb-4 '>
            <Row>
                <Col className='ms-4 mt-2'>Today Interviews Meetings Info</Col>
                <Col className='text-end mt-2 me-4'><HiOutlineDotsVertical /></Col>
            </Row>
            <hr></hr>
                <CandidateInfo userData={userDetails}/>
        </Card>
    </>
)
}

export default MeetingInfoTable