import React from 'react'
import profile from '../../assets/profile.jpg'
import UserList from './UserList'


function HiringCandidates() {
    const userList=[
        {
            profile:profile,
            name:'Sneha Sharma',
            role:'Python Developer',
            subHead:'Interview with Stella',
            hiredBy:'Priya Sharma'
        },
        {
            profile:profile,
            name:'Anjali Menon',
            role:'Python Developer',
            subHead:'Interview with Stella',
            hiredBy:'Priya Sharma'
        },
        {
            profile:profile,
            name:'John Doe',
            role:'Python Developer',
            subHead:'Interview with Stella',
            hiredBy:'Priya Sharma'
        }
    ]
  return (
    <>
        <div className='pt-3'>
            <div className='d-flex justify-content-between'>
                    <div>
                        <span className='heading-text'>Hiring Candidates</span>
                    </div>
                    <div className='pt-1'>
                        <span className='view-all'>View All</span>
                    </div>
            </div>
            <div>
                <UserList data={userList} isHiring={true} /> 
            </div>
        </div>
    </>

)
}

export default HiringCandidates