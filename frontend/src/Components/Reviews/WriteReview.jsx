import "./writereviews.css"
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Autocomplete from '@mui/material/Autocomplete';
import Rating from '@mui/material/Rating';
import Textarea from '@mui/joy/Textarea';


const WriteReview = () => {
  const places = []
  return (
    <>
      <div className="wr-container">
        <form action="" method="post" className="wr-form">
          {/* <div className="separate">
            <label htmlFor="" className="wr-form-label">Topic</label>
            <input type="text" className="wr-form-input" />

          </div> */}
          <div className="separate">
            <label htmlFor="" className="wr-form-label">Location</label>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={places}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Location" />}
            />

          </div>
          <div className="separate">
            <label htmlFor="" className="wr-form-label">Rating</label>
            <Typography component="legend" sx={{color:"white",marginTop:"20px"}}>Food</Typography>
            <Rating name="user rating" precision={0.1} />
            <Typography component="legend" sx={{color:"white"}}>Cost</Typography>
            <Rating name="user rating" precision={0.1} />
            <Typography component="legend" sx={{color:"white"}}>Convinience</Typography>
            <Rating name="user rating" precision={0.1} />
            <Typography component="legend" sx={{color:"white"}}>Nature</Typography>
            <Rating name="user rating" precision={0.1} />
            <Typography component="legend" sx={{color:"white"}}>Tourist Spots</Typography>
            <Rating name="user rating" precision={0.1} />

          </div>
          <div className="separate">

            <label htmlFor="" className="wr-form-label">Review</label>
            <Textarea
              minRows={5}
              placeholder="share your thoughts..."
              size="lg"
              variant="solid"
            />
          </div>
          <div className="separate">
            <label htmlFor="" className="wr-form-label">How much you spent?(Estimated in Rs.)</label>
            <input type="number" name="" id="" />
          </div>
        </form>
        <button className="review-btn">✍️Write a review</button>
      </div>

    </>
  )
}

export default WriteReview