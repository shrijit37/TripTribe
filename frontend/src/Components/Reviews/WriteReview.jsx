import React, { useEffect, useRef, useState } from 'react';
import './writereviews.css';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Textarea from '@mui/joy/Textarea';
import axios from 'axios'
import { useSelector } from 'react-redux';

const WriteReview = () => {
  const userInfo = useSelector(state=>state.auth.userInfo)
  const [location, setLocation] = useState('');
  const [foodRating, setFoodRating] = useState(0);
  const [costRating, setCostRating] = useState(0);
  const [convenienceRating, setConvenienceRating] = useState(0);
  const [safetyRating, setSafetyRating] = useState(0);
  const [touristSpotsRating, setTouristSpotsRating] = useState(0);
  const [review, setReview] = useState('');
  const [amountSpent, setAmountSpent] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['(cities)']
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.geometry) {
          console.log('Selected place:', place);
          setLocation(place.name);
        }
      });
    } else {
      console.error('Google Maps JavaScript API library must be loaded.');
    }
  }, []);
  const handleReviewSubmit = async () => {
    try {
      // Construct the review data object
      const reviewData = {
        location,
        ratings: {
          food: foodRating,
          cost: costRating,
          convenience: convenienceRating,
          safety: safetyRating,
          touristSpots: touristSpotsRating
        },
        review,
        amountSpent,
        writer: {
          fname: userInfo.fname, 
          lname: userInfo.lname 
        }
      };
  
      // Send a POST request to submit the review
      const response = await axios.post('http://localhost:8080/api/reviews/', reviewData);
  
      // Handle successful response (if needed)
      console.log('Review submitted successfully:', response.data);
  
      // Reset form fields
      setLocation('');
      setFoodRating(0);
      setCostRating(0);
      setConvenienceRating(0);
      setSafetyRating(0);
      setTouristSpotsRating(0);
      setReview('');
      setAmountSpent('');
    } catch (error) {
      // Handle errors
      console.error('Error submitting review:', error);
      // You can set an error state or display an error message to the user
    }
  };
  
  return (
    <>
      <div className="wr-container">
        <form action="" method="post" className="wr-form">
          <div className="separate">
            <label htmlFor="" className="wr-form-label">Location</label>
            <TextField
              inputRef={inputRef}
              id="location-input"
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ width: 300, 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'blue',
                  },
                  '&:hover fieldset': {
                    borderColor: 'blue',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'blue',
                },
                '& .MuiOutlinedInput-input': {
                  color: 'blue',
                },
              }}
            />
          </div>
          <div className="separate">
            <label htmlFor="" className="wr-form-label">Rating</label>
            <Typography component="legend" sx={{ color: "white", marginTop: "20px" }}>Food</Typography>
            <Rating
              name="food-rating"
              value={foodRating}
              precision={0.1}
              onChange={(e, newValue) => setFoodRating(newValue)}
              sx={{ color: 'white', '& .MuiRating-icon': { color: 'white', borderColor: 'white' } }}
            />
            <Typography component="legend" sx={{ color: "white" }}>Cost</Typography>
            <Rating
              name="cost-rating"
              value={costRating}
              precision={0.1}
              onChange={(e, newValue) => setCostRating(newValue)}
              sx={{ color: 'white', '& .MuiRating-icon': { color: 'white', borderColor: 'white' } }}
            />
            <Typography component="legend" sx={{ color: "white" }}>Convenience</Typography>
            <Rating
              name="convenience-rating"
              value={convenienceRating}
              precision={0.1}
              onChange={(e, newValue) => setConvenienceRating(newValue)}
              sx={{ color: 'white', '& .MuiRating-icon': { color: 'white', borderColor: 'white' } }}
            />
            <Typography component="legend" sx={{ color: "white" }}>Safety</Typography>
            <Rating
              name="safety-rating"
              value={safetyRating}
              precision={0.1}
              onChange={(e, newValue) => setSafetyRating(newValue)}
              sx={{ color: 'white', '& .MuiRating-icon': { color: 'white', borderColor: 'white' } }}
              />

              <Typography component="legend" sx={{ color: "white" }}>Tourist Spots</Typography>
              <Rating
                name="tourist-spots-rating"
                value={touristSpotsRating}
                precision={0.1}
                onChange={(e, newValue) => setTouristSpotsRating(newValue)}
                sx={{ color: 'white', '& .MuiRating-icon': { color: 'white', borderColor: 'white' } }}
              />
            </div>
            <div className="separate">
              <label htmlFor="" className="wr-form-label">Review</label>
              <Textarea
                minRows={5}
                placeholder="Share your thoughts..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                size="lg"
                variant="solid"
              />
            </div>
            <div className="separate">
              <label htmlFor="" className="wr-form-label">How much you spent? (Estimated in Rs.)</label>
              <input
                type="number"
                name="amountSpent"
                id="amountSpent"
                className='input-cost'
                placeholder='Amount in ₹'
                value={amountSpent}
                onChange={(e) => setAmountSpent(e.target.value)}
              />
            </div>
          </form>
          <button className="review-btn" onClick={handleReviewSubmit}>✍️ Write a review</button>
        </div>
      </>
    );
  };
  
  export default WriteReview;
  