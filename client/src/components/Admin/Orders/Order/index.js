import { useState } from "react";
import { DateTime } from "luxon";
import { ToastContainer, ToastHeader, Toast } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { UPDATE_ORDER } from "../../../../graphql/mutations";
import { capitalizeFirstLetter } from "../../../../utils/helpers";

function Order({ order, options }) {
  const [show, setShow] = useState(false);
  const [updatedValue, setUpdatedValue] = useState("");
  const [updateOrder] = useMutation(UPDATE_ORDER);

  function deliveryDate(shippingType, purchaseDate) {
    const dateArr = purchaseDate.split(" ");
    const dayPeriod = dateArr[2];
    const time = dateArr[1].split(":")[0];
    const date = dateArr[0].slice(0, -1);
    let dateAdjustment = 0;

    if (dayPeriod === "PM" && time > 5) {
      dateAdjustment = 1;
    }

    if (shippingType.toLowerCase() === "free shipping") {
      return DateTime.fromFormat(date, "M/dd/yyyy")
        .plus({ days: 6 + dateAdjustment })
        .toFormat("M/d/yyyy");
    } else {
      return DateTime.fromFormat(date, "M/dd/yyyy")
        .plus({ days: 1 + dateAdjustment })
        .toFormat("M/d/yyyy");
    }
  }

  function handleStatusChange(event, _id) {
    const { value } = event.target;
    setUpdatedValue(value);
    setShow(true);
    updateOrder({ variables: { input: { _id, status: value } } });
  }

  return (
    <>
      <ToastContainer style={{ position: "fixed", top: 0, right: 0 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
          <ToastHeader className="justify-content-between me-2">
            <Toast.Body>Order status updated to {updatedValue}!</Toast.Body>
          </ToastHeader>
        </Toast>
      </ToastContainer>
      <div className="" key={order._id}>
        <div className="mb-3 admin-order border shadow-sm">
          <div className="h6 p-2 admin-order-id">Order #{order._id}</div>
          <div className="px-2 pb-2">
            <div>Total: ${(order.total / 100).toFixed(2)}</div>

            <div>
              Status:
              <select
                name="order-status"
                id="order-status"
                onChange={(event) => handleStatusChange(event, order._id)}
              >
                <option value={order.status}>
                  {capitalizeFirstLetter(order.status)}
                </option>
                {options.map((option, index) => {
                  if (option !== order.status) {
                    return (
                      <option value={option} key={`option-${index}`}>
                        {capitalizeFirstLetter(option)}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
            </div>

            <div>
              <div>User: {order.customer.username}</div>
              <div>Email: {order.customer.email}</div>
            </div>

            <div>
              <div>Shipping Address: {order.deliveryAddress}</div>
              <div>Shipping Type: {order.shippingType}</div>
              <div>
                Expected Delivery:{" "}
                {deliveryDate(order.shippingType, order.purchaseDate)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
