import React from "react";
import ReactStars from "react-stars";

function ReviewList({ currentProduct }) {
  return (
    <>
      {currentProduct.reviews.map((review) => {
        const { _id, user, review: userReview, rating } = review;
        return (
          <div key={_id}>
            <h3>
              Review by {user.username}
              <ReactStars count={5} value={rating} size={24} edit={false} />
            </h3>
            <p>{userReview}</p>
          </div>
        );
      })}
    </>
  );
}

export default ReviewList;
