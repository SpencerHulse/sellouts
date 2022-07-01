import { useState } from "react";
import { ToastContainer, ToastHeader, Toast } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PROMOTION } from "../../../graphql/mutations";
import { QUERY_PROMOTIONS } from "../../../graphql/queries";

function DeletePromotion() {
  const [show, setShow] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState("");

  const { loading, data } = useQuery(QUERY_PROMOTIONS);
  const [deletePromotion] = useMutation(DELETE_PROMOTION);

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedPromotion) return;

    deletePromotion({ variables: { id: selectedPromotion } });
    setShow(true);

    setTimeout(function () {
      window.location.assign("/admin/promotions");
    }, 1000);
  }

  function handleSelect(event) {
    const { value } = event.target;
    setSelectedPromotion(value);
  }

  return (
    <>
      <ToastContainer style={{ position: "fixed", top: 0, right: 0 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
          <ToastHeader className="justify-content-between me-2">
            <Toast.Body>Promotion successfully deleted!</Toast.Body>
          </ToastHeader>
        </Toast>
      </ToastContainer>
      <div>
        <div className="dialog">
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
    </>
  );
}

export default DeletePromotion;
