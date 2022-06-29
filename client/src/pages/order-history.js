import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Order from "../components/Order";
import Auth from "../utils/auth";
import { groupOrderData, loggedOutRedirect } from "../utils/helpers";
import { useGetOrders } from "../hooks/orderHooks";

function OrderHistory() {
  loggedOutRedirect();
  const [updatedOrders, setUpdatedOrders] = useState("");
  const { username, _id } = Auth.getProfile().data;
  const data = useGetOrders({ customerId: _id });

  useEffect(() => {
    if (data) {
      setUpdatedOrders(groupOrderData(data));
    }
  }, [data]);

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
