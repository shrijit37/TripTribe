import React, { useState } from 'react';
import './homepage.css';
import { BallTriangle } from 'react-loader-spinner';
import Calender from './Calender/Calender';
import Register from '../Register/Register';
import { useDispatch, useSelector } from 'react-redux';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { setCity, setDates } from '../../Redux/searchSlice';
import { GOOGLE_API_KEY } from '../../contants';

const Homepage = () => {
  const userInfo = useSelector(state => state.auth.userInfo);
  const loading = false;  // Assuming this is managed somewhere else
  const [showCalender, setShowCalender] = useState(false);
  let autocomplete; // Define autocomplete variable outside of LoadScript
  const dispatch = useDispatch();
  // Handle place selection from autocomplete
  const handlePlaceSelect = () => {
    console.log(autocomplete.getPlace()); 
    dispatch(setCity(autocomplete.getPlace()));
  };

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
                <LoadScript
                  googleMapsApiKey={GOOGLE_API_KEY}
                  libraries={['places']}
                >
                  <Autocomplete
                    onLoad={(auto) => { console.log('Autocomplete loaded:', auto); autocomplete = auto; }}
                    onPlaceChanged={handlePlaceSelect} // Use handlePlaceSelect directly here
                    options={{ types: ['(cities)'] }}
                  >
                    <input className="user-input" type="text" placeholder='Destination 🛫' />
                  </Autocomplete>
                </LoadScript>
                <button className='submit-btn' onClick={() => setShowCalender(true)}>Select date 📅</button>
                <button className="submit-btn">Get-itenary 🗒️</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {!userInfo && <Register closeLogin={() => {}} />}
      {showCalender && <Calender onClose={() => { setShowCalender(false) }} />}
    </>
  );
};

export default Homepage;
