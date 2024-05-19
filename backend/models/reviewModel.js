import mongoose from 'mongoose';

// Define schema for the review collection
const reviewSchema = new mongoose.Schema({
  writer: {
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    }
  },
  location: {
    type: String,
    required: true
  },
  ratings: {
    food: { type: Number, required: true },
    cost: { type: Number, required: true },
    convenience: { type: Number, required: true },
    safety: { type: Number, required: true },
    touristSpots: { type: Number, required: true }
  },
  review: {
    type: String,
    required: true
  },
  amountSpent: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model using the schema
const Review = mongoose.model('Review', reviewSchema);

export default Review;
