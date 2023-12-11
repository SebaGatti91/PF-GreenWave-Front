import React, {useState} from 'react';
import StarRatings from 'react-star-ratings';
import {Col, ProgressBar } from 'react-bootstrap';
import users from './users.json'
import './reviews.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function ReviewList({ rating, reviewedBy}) {

  const [expandedComments, setExpandedComments] = useState([]);

  if (!rating || !reviewedBy) {
    return <div>Cargando...</div>;
  }
  const toggleExpand = (reviewId) => {
    setExpandedComments((prev) => {
      const index = prev.indexOf(reviewId);
      if (index !== -1) {
        return prev.filter((id) => id !== reviewId);
      } else {
        return [...prev, reviewId];
      }
    });
  };
  let usersLength = 0
  const ratingCounts = [0, 0, 0, 0, 0];
  reviewedBy.forEach((review) => {
    ratingCounts[review.rating - 1]++
    usersLength++;
  });
console.log(reviewedBy);
  return (
    <div className='flex flex-col ml-20 rounded-lg border-cyan-200 border-4 w-full mr-20 bg-slate-300'>
      <div className='flex flex-box items-center  w-full'>
      <div className='flex flex-col  items-center w-1/2'>
      <p className='rate'>{rating}</p>
      <StarRatings
        rating={rating}
        starRatedColor="blue"
        numberOfStars={5}
        name='averageRating'
        starEmptyColor='white'
        
        />
        <h5 className='mt-4'>{usersLength} reseñas</h5>
      </div>
      <div className='flex flex-col w-1/2 mt-10 '>
      {ratingCounts.map((count, index) =>{
        return(
        <div key={index}>
          <Col>
          <ProgressBar now={(count / reviewedBy.length)* 100} />
         </Col>
          <p>{1 + index}⭐</p>
        </div>
      )})}
      </div>
      </div>
      <div className="flex flex-wrap">
      {reviewedBy.map((review) => {
        const created = review.createdAt.slice(0, 10).split('-').reverse().join('-');
        const isCommentExpanded = expandedComments.includes(review.id);
        const RandomUser = users[Math.floor(Math.random()* users.length)]
        return (
          <div key={review.id} className="w-1/3 p-2">
            <div className="bg-white rounded-lg mt-2 p-4">
              <div className="flex flex-col">
                <label className="flex justify-left">
                  <img src={review.image || "https://i.pinimg.com/564x/4b/2d/35/4b2d35ecc28064419c2c0b59ad2e3cc2.jpg"} alt="user" className="rounded-full overflow-hidden w-10 h-10 mr-5" />
                  <h5>{review.username || `${RandomUser} anónimo`}</h5>
                </label>
                <label className="flex ml-14 w-fulljustify-between">
                  <StarRatings
                    rating={review.rating}
                    starRatedColor="yellow"
                    numberOfStars={5}
                    name="rating"
                    starDimension="20px"
                    starEmptyColor="black"
                    starSpacing="2px"
                  />
                </label>
                  <p className='ml-14'>{created}</p>
              </div>
              <div className="comment-container">
                <p className={isCommentExpanded ? 'expanded' : 'collapsed'}>{review.comment}</p>
                {review.comment.length > 100 && (
                  <button onClick={() => toggleExpand(review.id)}>
                    {isCommentExpanded ? 'Mostrar menos' : 'Mostrar más'}
                  </button>
                )}
              </div>
              <label className="flex justify-between pt-8">
                <p>¿Te resultó útil esta opinión?</p>
                <div className="flex justify-center w-40">
                  <button key={1} style={{ width: "40px", height: "30px", border: "2px solid", borderColor: "grey", borderRadius: "20px", backgroundColor: "ButtonFace" }}>
                    Sí
                  </button>
                  <button key={2} style={{ width: "40px", height: "30px", border: "2px solid", borderColor: "grey", borderRadius: "20px", marginLeft: "10px", backgroundColor: "ButtonFace" }}>
                    No
                  </button>
                </div>
              </label>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default ReviewList;
