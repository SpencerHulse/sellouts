import React from "react";
import ReactStars from "react-stars";

function ReviewList({ currentProduct }) {
  return (
    <>
      {currentProduct.reviews.map((review) => {
        const { _id, user, review: userReview, rating } = review;
        return (
          <div key={_id} className="mb-4">
            <div className="d-flex justify-content-center">
              <ReactStars count={5} value={rating} size={24} edit={false} color2="#7f60db" color1="rgba(0, 0, 0, 0.19)" />
            </div>
            <h3 className="fw-light">
              Review by {user.username}
            </h3>
            <p>{userReview}</p>
          </div>
        );
      })}
    </>
  );
}

export default ReviewList;
