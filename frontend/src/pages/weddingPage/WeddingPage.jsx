import React from 'react'
import './WeddingPage.css'
import HeroImg from './images/wed.png'
import WeddingDesigns from './components/weddingDesigns/WeddingDesigns'
import WeddingFeatures from './components/weddingFeatures/WeddingFeatures'
import PlanningFeatures from './components/planningFeatures/PlanningFeatures'
import AiPoweredSection from './components/AiPoweredSection/AiPoweredSection'
import FAQSection from './components/faq-section/FAQSection'

function WeddingPage() {
    return (
        <div className='wedding-page'>
            <div className="hero-section">
                <img src={HeroImg} alt="Wedding Image" />
            </div>
            <div className="wedding-designs">
                <WeddingDesigns />
                <div className="wedding-highlights">
                    <div className="highlight">
                        <div className="circle"></div>
                        <h1 className="highlight-title">Easy Customize</h1>
                    </div>
                    <div className="highlight">
                        <div className="circle"></div>
                        <h1 className="highlight-title">No Tech Skill Needed</h1>
                    </div>
                    <div className="highlight">
                        <div className="circle"></div>
                        <h1 className="highlight-title">Recieve & Manage RSVP's</h1>
                    </div>
                    <div className="highlight">
                        <div className="circle"></div>
                        <h1 className="highlight-title">Easy Share Wedding Day</h1>
                    </div>
                </div>
            </div>

            <div className="wedding-features">
                <WeddingFeatures/>
            </div>

            <div className="planning-features">
                <PlanningFeatures/>
            </div>

            <div className="ai-powered-section">
                <AiPoweredSection/>
            </div>

            <div className="faqSection">
                <FAQSection/>
            </div>
        </div>
    )
}

export default WeddingPage
