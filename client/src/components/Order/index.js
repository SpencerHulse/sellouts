import React from "react";
import { capitalizeFirstLetter } from "../../utils/helpers";

function Order({ order }) {
  const { orderData } = order;
  const { _id, status, purchaseDate, total, items } = orderData;

  return (
    <div className="order-item">
      <div>
        <div className="px-2">Order #{_id}</div>
        <div className="px-2">Status: {capitalizeFirstLetter(status)}</div>
      </div>
      <table className="table table-items">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const itemData = item.split("-*-");
            const name = itemData[0];
            const subtotal = (itemData[1] / 100).toFixed(2);
            const quantity = itemData[2];
            const unitPrice = (subtotal / quantity).toFixed(2);

            return (
              <tr key={`${_id}-item-${index}`}>
                <td className="row-cell">{name}</td>
                <td className="row-cell">${unitPrice}</td>
                <td className="row-cell">{quantity}</td>
                <td className="row-cell">${subtotal}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="container">
        <div className="row">
          <div className="col-9 px-2">{purchaseDate}</div>
          <div className="col-3 px-2 order-total">
            ${(total / 100).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
