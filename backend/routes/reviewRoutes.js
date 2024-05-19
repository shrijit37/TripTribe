
import express from 'express';
import { postReview, getReviewsByCity, getCities } from "../controller/reviewController.js";

const router = express.Router();


router.post('/', postReview);
router.get('/cities', getCities);




//specific routes
router.get('/:city', getReviewsByCity);




router.get('/check', (req, res) => {
  res.status(200).json({ message: 'API is working!' });
});

export default router;
