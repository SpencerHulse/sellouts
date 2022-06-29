import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Order from "../components/Order";
import Auth from "../utils/auth";
import { loggedOutRedirect } from "../utils/helpers";
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
                return <Order order={order} key={order.orderData._id} />;
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
