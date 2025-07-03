import React from 'react'
import '../style/AboutPlanner.scss'

function AboutPlanner() {

    const aboutNav = [
        {
            text: 'Description',
        },
        {
            text: 'Benefits'
        },
        {
            text: 'Utility'
        },
        {
            text: 'How to buy'
        },
    ]

  return (
    <div className='aboutplanner'>
        <div className="about_container">
            <div className="aboutheading">
                <h2>About planner Books</h2>
            </div>
            <div className="about_nav">
                <ul>
                    {aboutNav.map((n,i)=>(
                        <li key={i}>{n.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default AboutPlanner