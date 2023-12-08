import React from 'react';
import StarRatings from 'react-star-ratings';
import {Col, ProgressBar } from 'react-bootstrap';
import './reviews.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function ReviewList({ rating, reviewedBy , userName, userImage}) {
  if (!rating || !reviewedBy) {
    return <div>Cargando...</div>;
  }
  let usersLength = 0
  const ratingCounts = [0, 0, 0, 0, 0];
  reviewedBy.forEach((review) => {
    ratingCounts[review.rating - 1]++
    usersLength++;
  });
  console.log(ratingCounts);

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
        console.log(count, index, reviewedBy.length);
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
      {reviewedBy.map((review) => (
        <div key={review.id } className='bg-white rounded-lg mt-10'>
          <div className='flex flex-col m-3'>
          <label className='flex justify-left '>
          <img src={userImage || "../../../../public/images/defaultUser.jpg"} alt="user" className='rounded-full overflow-hidden w-10 h-10 mr-5' />
          <h5>{userName}</h5>
          </label>
          <label className='flex ml-14 w-1/3 justify-between'>
          <StarRatings
            rating={review.rating}
            starRatedColor="blue"
            numberOfStars={5}
            name='rating'
            starDimension='20px'
            starEmptyColor='green'
            starSpacing='2px'            
          />
          <p>21/09/2023{review.createdAt}</p>
          </label>

          </div>
          <p>{review.comment}</p>
        <label className='flex justify-between'>
          <p>¿te resulto útil esta opinión?</p>
          <div className=' flex justify-center w-40'>
          <button key={1}  style={{width:"40px", height:"30px", border:"2px solid", borderColor:"grey", borderRadius:"20px",backgroundColor:"ButtonFace"}}>si</button>
          <button key={2}  style={{width:"40px", height:"30px", border:"2px solid", borderColor:"grey", borderRadius:"20px", marginLeft:"10px", backgroundColor:"ButtonFace"}}>no</button>
          </div>
        </label>
        </div>
        
      ))}
    </div>
  );
}

export default ReviewList;
