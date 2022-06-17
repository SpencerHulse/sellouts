import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";

function ReviewList({ currentProduct }) {
  const [page, setPage] = useState(1);
  const [visibleReviews, setVisibleReviews] = useState([
    ...currentProduct.reviews.slice(0, 5),
  ]);

  const pages = Math.floor(currentProduct.reviews.length / 5 + 1);

  function changePage(direction) {
    if (page < pages && direction === "next") {
      setPage(page + 1);
    } else if (page > 1 && direction === "prev") {
      setPage(page - 1);
    }
  }

  useEffect(() => {
    const start = (page - 1) * 5;
    const end = page * 5;
    setVisibleReviews(currentProduct.reviews.slice(start, end));
  }, [currentProduct.reviews, page]);

  return (
    <>
      {visibleReviews.map((review, index) => {
        const {
          _id,
          createdAt,
          title,
          user,
          review: userReview,
          rating,
        } = review;
        return (
          <div key={_id + index} className="mb-4">
            <div className="d-flex justify-content-center">
              <ReactStars
                count={5}
                value={rating}
                size={24}
                edit={false}
                color2="#7f60db"
                color1="rgba(0, 0, 0, 0.19)"
              />
            </div>
            <h3 className="fw-light">{title}</h3>
            <p>
              {userReview}
              <br />
              —written by {user.username} on {createdAt.split(", ")[0]}
            </p>
          </div>
        );
      })}
      <div className="d-flex justify-content-center align-items-baseline">
        <button className="prev-button" onClick={() => changePage("prev")}>
          Prev
        </button>
        <p>
          page {page} of {pages}
        </p>
        <button className="next-button" onClick={() => changePage("next")}>
          Next
        </button>
      </div>
    </>
  );
}

export default ReviewList;
