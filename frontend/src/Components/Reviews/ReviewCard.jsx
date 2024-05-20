import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Rating from '@mui/material/Rating';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ReviewCard(review) {
  const [expanded, setExpanded] = useState(false);



const date = new Date(review.data.createdAt);
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;

const overallRating = (review.data.ratings.food+review.data.ratings.cost+review.data.ratings.safety+review.data.ratings.touristSpots)/4;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ maxWidth: 345 ,margin:'50px',width:"400px"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {review.data.writer.fname[0]}
          </Avatar>
        }
        title={review.data.writer.fname + ' ' + review.data.writer.lname}
        subheader={formattedDate}
      />
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <h4 className='city-name'>City : {review.data.location} </h4>
          {review.data.review}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Typography component="legend">Overall Rating:</Typography>
      <Rating name="read-only" value={overallRating} readOnly />
      <Typography component="legend">Food</Typography>
            <Rating
              name="food-rating"
              value={review.data.ratings.food}
              precision={0.1}
              readOnly
            />
            <Typography component="legend">Cost</Typography>
            <Rating
              name="cost-rating"
              value={review.data.ratings.cost}
              precision={0.1}
              readOnly
            />

            <Typography component="legend">Safety</Typography>
            <Rating
              name="safety-rating"
              value={review.data.ratings.safety}
              precision={0.1}
              readOnly
              />

              <Typography component="legend">Tourist Spots</Typography>
              <Rating
                name="tourist-spots-rating"
                value={review.data.ratings.touristSpots}
                precision={0.1}
                readOnly
              />
        </CardContent>
      </Collapse>
    </Card>
  );
}
