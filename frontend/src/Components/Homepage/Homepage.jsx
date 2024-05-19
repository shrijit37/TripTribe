import React, { useState, useEffect, useRef } from 'react';
import './homepage.css';
import { BallTriangle } from 'react-loader-spinner';
import Calender from './Calender/Calender';
import Register from '../Register/Register';
import { useDispatch, useSelector } from 'react-redux';
import { setCity } from '../../Redux/searchSlice'; 
import {useNavigate} from "react-router-dom"

const Homepage = () => {
  const userInfo = useSelector(state => state.auth.userInfo);
  const loading = false;  // Assuming this is managed somewhere else
  const [showCalender, setShowCalender] = useState(false);
  const autocompleteRef = useRef(null); // Use a ref to manage the autocomplete instance
  const inputRef = useRef(null); // Use a ref to manage the input element
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.name) {
      dispatch(setCity(place));
      console.log(place);
    } else {
      console.error('Autocomplete place object is missing name property');
    }
  };

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, { types: ['(cities)'] });
      autocomplete.setFields(['name']);
      autocomplete.addListener('place_changed', handlePlaceSelect);
      autocompleteRef.current = autocomplete;
    } else {
      console.error("Google Maps JavaScript API library must be loaded.");
    }
  }, []);
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
                <input
                  ref={inputRef}
                  className="user-input"
                  type="text"
                  placeholder='Destination 🛫'
                />
                <button className='submit-btn' onClick={() => setShowCalender(true)}>Select date 📅</button>
                <button className="submit-btn"><a href='/result'>Get-itenary 🗒️</a></button>
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
