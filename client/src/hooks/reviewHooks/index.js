import { useState, useEffect } from "react";

export function useReviewList({ page, sort, currentProduct, itemsPP }) {
  // The items of the array that are visible, loading in from the start
  const [visibleReviews, setVisibleReviews] = useState([
    ...currentProduct.reviews.slice(0, itemsPP),
  ]);

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
  }, [currentProduct.reviews, itemsPP, page, sort]);

  return visibleReviews;
}
