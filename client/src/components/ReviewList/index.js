import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";

function ReviewList({ currentProduct }) {
  // How many reviews per "page"
  const itemsPP = 5;
  // The items of the array that are visible, loading in from the start
  const [visibleReviews, setVisibleReviews] = useState([
    ...currentProduct.reviews.slice(0, itemsPP),
  ]);
  // The type of sort being used
  const [sort, setSort] = useState("newest");
  // The page currently shown
  const [page, setPage] = useState(1);

  // Returns the number of pages needed to get through the reviews
  function numberOfPages() {
    if (currentProduct.reviews.length % itemsPP === 0) {
      return currentProduct.reviews.length / itemsPP;
    } else {
      return Math.floor(currentProduct.reviews.length / itemsPP) + 1;
    }
  }

  const pages = numberOfPages();

  // Handles changing the page backward or forward
  function changePage(direction) {
    if (page < pages && direction === "next") {
      setPage(page + 1);
    } else if (page > 1 && direction === "prev") {
      setPage(page - 1);
    }
  }

  // Handles sorting and returning relevant page of reviews
  useEffect(() => {
    let reviews = [...currentProduct.reviews];
    const start = (page - 1) * itemsPP;
    const end = page * itemsPP;
    if (sort === "newest") {
      reviews.sort(function (a, b) {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      });
    } else if (sort === "oldest") {
      reviews.sort(function (a, b) {
        if (a.createdAt < b.createdAt) return -1;
        if (a.createdAt > b.createdAt) return 1;
        return 0;
      });
    } else if (sort === "high") {
      reviews.sort(function (a, b) {
        if (a.rating > b.rating) return -1;
        if (a.rating < b.rating) return 1;
        return 0;
      });
    } else if (sort === "low") {
      reviews.sort(function (a, b) {
        if (a.rating < b.rating) return -1;
        if (a.rating > b.rating) return 1;
        return 0;
      });
    }
    // Sets with the new sorted and sliced array of reviews
    setVisibleReviews(reviews.slice(start, end));
  }, [currentProduct.reviews, page, sort]);

  return (
    <>
      <div id="top-of-reviews">
        Sort by:{" "}
        <select
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="high">High Rating</option>
          <option value="low">Low Rating</option>
        </select>
      </div>
      {visibleReviews.map((review) => {
        const {
          _id,
          createdAt,
          title,
          user,
          review: userReview,
          rating,
        } = review;
        return (
          <div key={_id} className="mb-4">
            <div className="d-flex justify-content-center">
              <ReactStars
                count={5}
                value={rating}
                size={24}
                edit={false}
                color2={"#7f60db"}
                color1={"rgba(0, 0, 0, 0.19)"}
              />
            </div>
            <h3 className="fw-light">{title}</h3>
            <p>
              {userReview}
              <br />
              —written by {user?.username || "a retired user"} on{" "}
              {createdAt.split(", ")[0]}
            </p>
          </div>
        );
      })}
      <div className="d-flex justify-content-center align-items-baseline">
        <a href="#top-of-reviews" className="pagination-link">
          <button className="prev-button" onClick={() => changePage("prev")}>
            Prev
          </button>
        </a>
        <p>
          Page {page} of {pages}
        </p>
        <a href="#top-of-reviews" className="pagination-link">
          <button className="next-button" onClick={() => changePage("next")}>
            Next
          </button>
        </a>
      </div>
    </>
  );
}

export default ReviewList;
