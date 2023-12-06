import React from 'react';
import StarRatings from 'react-star-ratings';
import { ProgressBar } from 'react-bootstrap';
import './reviews.css'
function ReviewList({ rating, reviewedBy }) {
  if (!rating || !reviewedBy) {
    return <div>Cargando...</div>;
  }

  const ratingCounts = [0, 0, 0, 0, 0];
  console.log(ratingCounts);
  reviewedBy.forEach((review) => {
    ratingCounts[review.rating - 1]++;
  });

  return (
    <div>
      <div className='flex flex-row  items-center'>
      <p className='rate'>{rating}</p>
      <StarRatings
        rating={rating}
        starRatedColor="blue"
        numberOfStars={5}
        name='averageRating'
        
      />
      </div>
      {ratingCounts.map((count, index) => (
        <div key={index}>
          <p>{5 - index}⭐</p>
          <ProgressBar now={(count / reviewedBy.length) * 100} />
        </div>
      ))}
      <h2>Reseñas</h2>
      {reviewedBy.map((review) => (
        <div key={review.id}>
          <h3>{review.userEmail}</h3>
          <StarRatings
            rating={review.rating}
            starRatedColor="blue"
            numberOfStars={5}
            name='rating'
          />
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
