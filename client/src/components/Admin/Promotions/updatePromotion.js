import { useEffect, useState } from "react";
import { ToastContainer, ToastHeader, Toast } from "react-bootstrap";
import { DateTime } from "luxon";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PROMOTION } from "../../../graphql/mutations";
import { QUERY_PROMOTIONS } from "../../../graphql/queries";

function UpdatePromotion() {
  const [show, setShow] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [promotionEnded, setPromotionEnded] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    percentage: 0,
    ends: "",
  });

  const { loading, data } = useQuery(QUERY_PROMOTIONS);
  const [updatePromotion] = useMutation(UPDATE_PROMOTION);

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "ends") {
      const date = DateTime.now().plus({ days: value }).toFormat("M/dd/yyyy");
      console.log(name, value, date);
      setFormState({
        ...formState,
        [name]: date,
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  }

  useEffect(() => {
    if (!formState) return;

    for (let key in formState) {
      const formData = formState[key];
      if (key === "ends") {
        const date = DateTime.fromFormat(formData, "D");
        const currentDate = DateTime.now();
        const diff = date.diff(currentDate, "days");
        const daysDiff = Math.round(diff.toObject().days);
        if (daysDiff < 0) {
          document.getElementById(key).value = 0;
          setPromotionEnded(true);
        } else {
          document.getElementById(key).value = Math.round(
            diff.toObject().days + 1
          );
          setPromotionEnded(false);
        }
      } else {
        document.getElementById(key).value = formData;
      }
    }
  }, [formState]);

  useEffect(() => {
    if (!selectedPromotion) return;

    const promotion = data.promotions.filter(
      (promotion) => promotion._id === selectedPromotion
    );

    const { name, percentage, ends } = promotion[0];

    setFormState({ name: name, percentage: percentage, ends: ends });
  }, [data, selectedPromotion]);

  useEffect(() => {
    setEndDate(formState.ends);
  }, [formState.ends]);

  function handleSubmit(event) {
    event.preventDefault();
    const { name, percentage, ends } = formState;

    if (!name || !percentage || !ends) return;

    updatePromotion({
      variables: {
        input: {
          _id: selectedPromotion,
          name: name,
          percentage: parseInt(percentage),
          ends: ends,
        },
      },
    });
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
            <Toast.Body>Promotion successfully updated!</Toast.Body>
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
              {promotionEnded && (
                <p className="description">This promotion has ended</p>
              )}
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

export default UpdatePromotion;
