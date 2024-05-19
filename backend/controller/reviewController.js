// Import necessary models and any other dependencies

import asyncHandler from '../middleware/asyncHandler.js';
import Review from '../models/reviewModel.js';

const postReview = async (req, res) => {
  const { location, ratings, review, amountSpent, writer } = req.body;

  try {
    // Create a new review instance
    const newReview = new Review({
      location,
      ratings,
      review,
      amountSpent,
      writer
    });

    // Save the review to the database
    const savedReview = await newReview.save();

    // Respond with the saved review
    res.status(201).json(savedReview);
  } catch (error) {
    // Handle the error
    console.error('Error posting review:', error);
    res.status(500).json({ message: 'Failed to post review' });
  }
};


// Controller function to get reviews by city name
const getReviewsByCity = asyncHandler(async (req, res) => {
  // Extract city name from request parameters
  const { city } = req.params;

  try {
    // Find reviews by city name in the database
    const reviews = await Review.find({ location: city });

    // Respond with the reviews
    res.status(200).json(reviews);
  } catch (error) {
    throw new Error('Failed to get reviews by city');
  }
});

const getCities = asyncHandler(async (req, res) => {
    try {
      // Find distinct locations/cities from the reviews collection
      const cities = await Review.distinct('location');
        console.log("cities") 
      // Respond with the list of cities
      res.status(200).json(cities);
    } catch (error) {
      throw new Error('Failed to get the list of cities');
    }
  });
  
  export { postReview, getReviewsByCity, getCities };

