import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PROMOTION } from "../../../graphql/mutations";
import { QUERY_PROMOTIONS } from "../../../graphql/queries";

function DeletePromotion() {
  const [selectedPromotion, setSelectedPromotion] = useState("");

  const { loading, data } = useQuery(QUERY_PROMOTIONS);
  const [deletePromotion] = useMutation(DELETE_PROMOTION);

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedPromotion) return;

    deletePromotion({ variables: { id: selectedPromotion } });

    window.location.assign("/admin");
  }

  function handleSelect(event) {
    const { value } = event.target;
    setSelectedPromotion(value);
  }

  return (
    <div className="fullpage bg-tint">
      <div className="container">
        <div className="row">
          <div className="mt-5 dialog">
            <form action="submit" onSubmit={handleSubmit}>
              <div className="dialog-section">
                <h2 className="fw-light">Promotion</h2>
                <p className="description">
                  Select the promotion you want to edit
                </p>
                <label htmlFor="promotion" className="d-none">
                  Promotion
                </label>
                <select
                  className="default-input"
                  name="promotion"
                  id="promotion"
                  required
                  onChange={handleSelect}
                >
                  <option value="">Select a Promotion</option>
                  {!loading &&
                    data.promotions.map((promotion) => (
                      <option value={promotion._id} key={promotion._id}>
                        {promotion.name} ({promotion.ends})
                      </option>
                    ))}
                </select>
              </div>
              <button className="default-button button-filled">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletePromotion;
