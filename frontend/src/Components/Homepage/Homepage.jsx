import React from 'react'
import "./homepage.css"
import { BallTriangle } from 'react-loader-spinner'
import { useState } from 'react'
import Calender from './Calender/Calender';
import Register from '../Register/Register';
const Homepage = () => {
    const loading = false;
    const [showLogin,setShowLogin] = useState(true);
    const [showCalender,setShowCalender] = useState(false);
    return (
        <>
        <div className="website-background">
            {loading ? (
                <div className="loader">
                    <BallTriangle
                        height={200}
                        width={200}
                        radius={5}
                        color="white"
                        ariaLabel="ball-triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            ) : (
                <div className="ques-container">
                    <div className="question-container">
                        <h3 className="question">Where to next?</h3>
                        <div className="search-container">
                            <input className="user-input" type="text" placeholder='Destination 🛫' />
                            <button className='submit-btn' onClick={()=>setShowCalender(true)}>Select date 📅</button>
                            <button className="submit-btn">Get-itenary 🗒️</button>
                        </div>
                    </div>
                </div>)}
        </div>

        {showLogin&&<Register closeLogin={()=>setShowLogin(false)}/>}
        {showCalender&&<Calender onClose = {()=>{setShowCalender(false)}}/>}
        </>
    )
}

export default Homepage