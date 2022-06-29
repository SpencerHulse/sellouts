import React, { useState } from "react";
import { DateTime } from "luxon";
import ReactStars from "react-stars";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../../graphql/mutations";
import Auth from "../../utils/auth";
import { useWindowWidth } from "../../hooks/navHooks";

function ReviewForm({ currentProduct }) {
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState(false);
  const [characterCount, setCharacterCount] = useState({ title: 0, review: 0 });
  const [formState, setFormState] = useState({
    _id: currentProduct._id,
    user: Auth.getProfile().data._id,
    title: "",
    review: "",
    rating: 0,
    createdAt: DateTime.now().toFormat("M/dd/yyyy, hh/mm a"),
  });

  const windowWidth = useWindowWidth();

  const [addReview] = useMutation(ADD_REVIEW);

  // Checks if the user has already reviewed the product.
  const reviewed = currentProduct.reviews.filter((review) => {
    return review?.user?._id === Auth.getProfile().data._id;
  }).length;

  function handleStars(newRating) {
    setError(false);
    setFormState({ ...formState, rating: newRating });
  }

  function handleFormUpdate(event) {
    const { name, value } = event.target;
    setCharacterCount({ ...characterCount, [name]: value.length });
    setFormState({ ...formState, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const { _id, user, title, review, rating } = formState;

    if (!rating) {
      setError(true);
      return;
    }

    if (!_id || !user || !title || !review) return;

    addReview({ variables: { input: { ...formState } } });

    window.location.reload();
  }

  return (
    <>
      {!reviewed && (
        <div>
          Want to leave a review?{" "}
          <button
            className="default-button button-filled"
            onClick={() => setFormOpen(!formOpen)}
          >
            Click Here!
          </button>
        </div>
      )}
      {formOpen && (
        <form
          onSubmit={handleFormSubmit}
          className="d-flex mx-auto mt-4 pt-3 review-form"
        >
          <div className="d-flex flex-column">
            <p className="mb-1 text-start">
              Let us know what you think of the product!
            </p>
            <div className="d-flex flex-column position-relative">
              <label htmlFor="title" className="d-none">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="review-input"
                maxLength="50"
                required
                placeholder="Enter a title"
                onChange={handleFormUpdate}
              />
              <span className="position-absolute review-char review-title-char">
                {characterCount.title} / 50
              </span>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <p className="mb-0">Rating: </p>
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
            </div>
            <label htmlFor="review" className="d-none">
              Review
            </label>
            <div className="position-relative">
              <textarea
                name="review"
                id="review"
                className="review-input"
                cols={
                  windowWidth > 1000 ? "70" : windowWidth < 500 ? "25" : "50"
                }
                rows="5"
                required
                maxLength="255"
                placeholder="Enter your review"
                value={formState.review}
                onChange={handleFormUpdate}
              />
              <span className="position-absolute review-char">
                {characterCount.review} / 255
              </span>
            </div>
            {error && (
              <p className="mb-0 text-danger text-start">Rating is required!</p>
            )}
            <button type="submit" className="default-button button-filled mt-2">
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default ReviewForm;
