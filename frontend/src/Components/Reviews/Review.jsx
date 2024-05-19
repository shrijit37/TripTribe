import "./review.css";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import RecipeReviewCard from "./ReviewCard";
import WriteReview from "./WriteReview";
import axios from "axios";

const Review = () => {
    const [cities, setCities] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/reviews/cities');
                setCities(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchCities();
    }, []);

    const handleLocationChange = async (event, value) => {
        setSelectedLocation(value);
        if (value) {
            const encodedCity = encodeURIComponent(value);
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/api/reviews/${encodedCity}`);
                setReviews(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
    };

    return (
        <>
            <div className="review-page-container">
                <div className="write-review">
                    <WriteReview />
                </div>
                <div className="review-search">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={cities}
                        value={selectedLocation}
                        onChange={handleLocationChange}
                        getOptionLabel={(option) => option}
                        sx={{ width: 300, backgroundColor: "white", alignSelf: "center" }}
                        renderInput={(params) => <TextField {...params} label="Location" />}
                    />
                </div>
                <div className="review-container">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {reviews.map((review) => (
                        <RecipeReviewCard key={review._id} data={review} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Review;
