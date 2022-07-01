import { useEffect, useState } from "react";
import { ToastContainer, ToastHeader, Toast } from "react-bootstrap";
import { DateTime } from "luxon";
import { useMutation } from "@apollo/client";
import { ADD_PROMOTION } from "../../../graphql/mutations";

function AddPromotion() {
  const [show, setShow] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    percentage: 0,
    ends: "",
  });

  const [addPromotions] = useMutation(ADD_PROMOTION);

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "ends") {
      setFormState({
        ...formState,
        [name]: DateTime.now().plus({ days: value }).toFormat("M/dd/yyyy"),
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  }

  useEffect(() => {
    setEndDate(formState.ends);
  }, [formState.ends]);

  function handleSubmit(event) {
    event.preventDefault();
    const { name, percentage, ends } = formState;

    if (!name || !percentage || !ends) return;

    addPromotions({
      variables: {
        input: { name: name, percentage: parseInt(percentage), ends: ends },
      },
    });
    setShow(true);

    setTimeout(function () {
      window.location.assign("/admin/promotions");
    }, 1000);
  }

  return (
    <>
      <ToastContainer style={{ position: "fixed", top: 0, right: 0 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
          <ToastHeader className="justify-content-between me-2">
            <Toast.Body>Promotion successfully added!</Toast.Body>
          </ToastHeader>
        </Toast>
      </ToastContainer>
      <div>
        <div className="dialog">
          <form action="submit" onSubmit={handleSubmit}>
            <div className="dialog-section">
              <h2 className="fw-light">Name</h2>
              <p className="description">
                A name for the promotion (must be unique)
              </p>
              <label htmlFor="name" className="d-none">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Promotion Name"
                className="default-input"
                onChange={handleChange}
              />
            </div>
            <div className="dialog-section">
              <h2 className="fw-light">Percentage</h2>
              <p className="description">
                The percentage discount you want the promotion to apply
              </p>
              <label htmlFor="percentage" className="d-none">
                Percentage
              </label>
              <input
                id="percentage"
                name="percentage"
                type="number"
                min="0"
                required
                placeholder="Percentage Discount"
                className="default-input"
                onChange={handleChange}
              />
            </div>
            <div className="dialog-section">
              <h2 className="fw-light">Duration</h2>
              <p className="description">
                The number of days the promotion will be in effect
              </p>
              {endDate && <p className="description">Ends on {endDate}</p>}
              <label htmlFor="ends" className="d-none">
                Ends
              </label>
              <input
                id="ends"
                name="ends"
                type="number"
                min="0"
                required
                placeholder="Duration of Promotion"
                className="default-input"
                onChange={handleChange}
              />
            </div>
            <button className="default-button button-filled">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPromotion;
