import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

function ReviewList({ productId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://greenwave-back.up.railway.app/${productId}`);
        if (response.status === 200) {
          setReviews(response.data);
        } else {
          console.log('Error al obtener las reseñas');
        }
      } catch (error) {
        console.error('Error al hacer la petición GET:', error);
      }
    };

    fetchReviews();
  }, [productId]);

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div>
      <h2>Calificación promedio</h2>
      <StarRatings
        rating={averageRating}
        starRatedColor="blue"
        numberOfStars={5}
        name='averageRating'
      />
      <h2>Reseñas</h2>
      {reviews.map((review) => (
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
