import "./review.css"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import RecipeReviewCard from "./ReviewCard";
import WriteReview from "./WriteReview";

const login = true;
const Review = () => {
    const places = ["new york", "paris", "london"];
    return (
        <>
            <div className="review-page-container">
                <div className="write-review">

                    {login && <>

                        <WriteReview />
                        
                    </>}
                </div>
                <div className="review-search">

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={places}
                        sx={{ width: 300, backgroundColor: "white", alignSelf: "center" }}
                        renderInput={(params) => <TextField {...params} label="Location" />}
                    />
                </div>
                <div className="review-container">

                    <RecipeReviewCard />
                    <RecipeReviewCard />
                    <RecipeReviewCard />
                    <RecipeReviewCard />
                    <RecipeReviewCard />
                    <RecipeReviewCard />
                    <RecipeReviewCard />
                    <RecipeReviewCard />
                    <RecipeReviewCard />
                    <RecipeReviewCard />
                    <RecipeReviewCard />
                    <RecipeReviewCard />
                    <RecipeReviewCard />
                    <RecipeReviewCard />
                    <RecipeReviewCard />
                </div>
            </div>
        </>
    )
}

export default Review