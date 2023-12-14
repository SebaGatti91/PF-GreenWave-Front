import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import users from "./users.json";
import "./reviews.css";

function ReviewList({ rating, reviewedBy }) {
  const [expandedComments, setExpandedComments] = useState([]);
  const [filterRate, setFilterRate] = useState("");

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
  const handleSelect = (e) => {
    setFilterRate(e.target.value);
  };
  let reviewsFiltradas;
  if (filterRate === "") {
    reviewsFiltradas = reviewedBy;
  } else {
    reviewsFiltradas = reviewedBy.filter(
      (review) => review.rating == filterRate
    );
  }
  let usersLength = 0;
  const ratingCounts = [0, 0, 0, 0, 0];
  reviewedBy.forEach((review) => {
    ratingCounts[review.rating - 1]++;
    usersLength++;
  });

  return (
    <div className="flex flex-col rounded-lg md:w-full pequeño ">
      <div>
        <div className="flex flex-col md:flex-row items-center w-full">
          <div className="flex flex-col justify-center items-center w-full md:w-1/3 estrellas">
            <p className="rate">{rating}</p>
            <StarRatings
              rating={parseFloat(rating)}
              starRatedColor="green"
              numberOfStars={5}
              name="averageRating"
              starEmptyColor="white"
              svgIconViewBox='20px'
              
            />
            <h5 className="mt-4">{usersLength} reviews</h5>
          </div>
          <div className="flex flex-col w-full md:w-1/2 mt-10 ">
            {ratingCounts.map((count, index) => {
              return (
                <div key={index}>
                  <p>{1 + index}⭐</p>
                  <div className="progress-bar">
                    <div
                      className="filler"
                      style={{ width: (count / reviewedBy.length) * 100 + "%" }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <label>
          <select name="reviews" onChange={handleSelect}>
            <option value=''>all ratings</option>
            <option value='5'>5 Stars</option>
            <option value='4'>4 Stars</option>
            <option value='3'>3 Stars</option>
            <option value='2'>2 Stars</option>
            <option value='1'>1 Stars</option>
          </select>
        </label>
      </div>

      <div className="scroll flex flex-wrap" style={{
        maxHeight: '450px', overflowY: 'auto', display: 'none'
      }
      }>
        <div className="flex flex-wrap w-full h-1/2">
          {reviewsFiltradas.map((review) => {
            const created = review.createdAt.slice(0, 10).split('-').reverse().join('-');
            const isCommentExpanded = expandedComments.includes(review.id);
            const RandomUser = users[Math.floor(Math.random() * users.length)]
            return (
              <div key={review.id} className="w-full ml-[-10px] p-2 md:w-1/3 ">
                <div className="bg-white rounded-lg mt-2 p-4 h-full">
                  <div className="flex flex-col">
                    <label className="flex justify-left">
                      <img src={review.image || "https://i.pinimg.com/564x/4b/2d/35/4b2d35ecc28064419c2c0b59ad2e3cc2.jpg"} alt="user" className="rounded-full overflow-hidden w-10 h-10 mr-5" />
                      <h5>{review.username || `${RandomUser} anónimo`}</h5>
                    </label>
                    <label className="flex ml-14 w-full justify-between">
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
                  <div className="comment-container overflow-auto break-words">
                    <p className={`${isCommentExpanded ? 'expanded' : 'line-clamp-3'} `}>{review.comment}</p>
                    {review.comment.length > 100 && (
                      <button onClick={() => toggleExpand(review.id)}>
                        {isCommentExpanded ? 'Mostrar menos' : 'Mostrar más'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ReviewList;
