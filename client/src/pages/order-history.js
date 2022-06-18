import { useQuery } from "@apollo/client";
import React from "react";
import { QUERY_ORDERS } from "../graphql/queries";
import Auth from "../utils/auth";
import { loggedOutRedirect } from "../utils/helpers";

function OrderHistory() {
  loggedOutRedirect();
  const { username, _id } = Auth.getProfile().data;
  const { loading, data } = useQuery(QUERY_ORDERS, {
    variables: { customer: _id },
  });
  console.log(data);
  return (
    <div>
      <h2>Order history for {username}...</h2>
      <div>Sort by: </div>
      <div>
        {!loading &&
          data.orders.map((order) => {
            return (
              <div key={order._id}>
                <div>Order #{order._id}</div>
                <div>{order.purchaseDate}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default OrderHistory;
