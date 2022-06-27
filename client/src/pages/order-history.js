import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Auth from "../utils/auth";
import { capitalizeFirstLetter, loggedOutRedirect } from "../utils/helpers";
import { useGetOrders } from "../hooks/orderHooks";

function OrderHistory() {
  loggedOutRedirect();
  const { username, _id } = Auth.getProfile().data;
  const data = useGetOrders({ customerId: _id });

  const updatedOrders = [];

  if (data) {
    const orders = data.orders;
    orders.forEach((order) => {
      const { products } = order;
      const orderSummary = [];

      products.forEach((product) => {
        const { _id, name } = product;
        let updated = false;

        orderSummary.map((orderProduct) => {
          if (orderProduct[0]._id === _id) {
            orderProduct[0].quantityPurchased += 1;
            updated = true;
          }
          return orderProduct;
        });

        if (!updated) {
          const productSummary = [
            {
              _id,
              name,
              quantityPurchased: 1,
            },
          ];
          orderSummary.push(productSummary);
        }
      });
      updatedOrders.push({
        orderData: order,
        products: orderSummary,
      });
    });
  }

  return (
    <div className="bg-tint">
      <Link to="/" className="back-to">
        <IoIosArrowRoundBack size="48" /> back to products
      </Link>
      <div className="container">
        <div className="fullpage-order-h">
          <h2>Order history for {username}...</h2>
          <div className="pb-3">
            {updatedOrders.length ? (
              updatedOrders.map((order) => {
                const { orderData } = order;
                const { _id, status, purchaseDate, total, items } = orderData;
                console.log(orderData);
                return (
                  <div className="order-item" key={_id}>
                    <div>
                      <div className="px-2">Order #{_id}</div>
                      <div className="px-2">
                        Status: {capitalizeFirstLetter(status)}
                      </div>
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
              })
            ) : (
              <p>You have no orders yet!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
