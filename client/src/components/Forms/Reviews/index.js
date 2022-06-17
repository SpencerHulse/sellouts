import React, { useState } from "react";
import ReactStars from "react-stars";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../../../graphql/mutations";
import Auth from "../../../utils/auth";

function ReviewForm({ currentProduct }) {
  const [formOpen, setFormOpen] = useState(false);
  const [formState, setFormState] = useState({
    _id: currentProduct._id,
    user: Auth.getProfile().data._id,
    title: "",
    review: "",
    rating: 0,
  });

  const [addReview] = useMutation(ADD_REVIEW);

  // Checks if the user has already reviewed the product.
  const reviewed = currentProduct.reviews.filter((review) => {
    return review.user._id === Auth.getProfile().data._id;
  }).length;

  function handleStars(newRating) {
    setFormState({ ...formState, rating: newRating });
  }

  function handleFormUpdate(event) {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    addReview({ variables: { input: { ...formState } } });
  }

  return (
    <>
      {!reviewed && (
        <div>
          Want to leave a review?{" "}
          <button onClick={() => setFormOpen(!formOpen)}>Click Here!</button>
        </div>
      )}
      {formOpen && (
        <form onSubmit={handleFormSubmit}>
          <div>
            <ReactStars
              count={5}
              size={24}
              value={formState.rating}
              edit={true}
              half={false}
              onChange={handleStars}
              color2={"#7f60db"}
              color1={"rgba(0, 0, 0, 0.19)"}
            />
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleFormUpdate}
            />
            <textarea
              name="review"
              id="review"
              cols="50"
              rows="5"
              value={formState.review}
              onChange={handleFormUpdate}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}

export default ReviewForm;
