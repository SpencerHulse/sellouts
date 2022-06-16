import React, { useState } from "react";
import ReactStars from "react-stars";
import Auth from "../../../utils/auth";

function ReviewForm({ currentProduct }) {
  const [formOpen, setFormOpen] = useState(false);
  const [formState, setFormState] = useState({ rating: 0 });

  // Checks if the user has already reviewed the product.
  const reviewed = currentProduct.reviews.filter((review) => {
    return review.user._id === Auth.getProfile().data._id;
  }).length;

  function handleStars(newRating) {
    setFormState({ ...formState, rating: newRating });
  }
  console.log(formState);
  return (
    <>
      {!reviewed && (
        <div>
          Want to leave a review?{" "}
          <button onClick={() => setFormOpen(!formOpen)}>Click Here!</button>
        </div>
      )}
      {formOpen && (
        <div>
          <ReactStars
            count={5}
            size={24}
            value={formState.rating}
            edit={true}
            half={false}
            onChange={handleStars}
          />
        </div>
      )}
    </>
  );
}

export default ReviewForm;
