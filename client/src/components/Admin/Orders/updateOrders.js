import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useGetOrders } from "../../../hooks/orderHooks";
import { useMutation } from "@apollo/client";
import { UPDATE_ORDER } from "../../../graphql/mutations";
import { capitalizeFirstLetter } from "../../../utils/helpers";

function UpdateOrders() {
  const [orderFilters, setOrderFilters] = useState({ status: "" });
  const orders = useGetOrders();
  const [updateOrder] = useMutation(UPDATE_ORDER);
  const options = ["pending", "shipped", "delivered"];
  // console.log(orders);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    if (orders && orderFilters.status) {
      setFilteredOrders(
        orders.orders.filter((order) => order.status === orderFilters.status)
      );
    } else if (orders && !orderFilters.status) {
      setFilteredOrders(orders.orders);
    }
  }, [orders, orderFilters]);

  function handleFilterChange(event) {
    const { value } = event.target;

    if (!value) {
      setOrderFilters({ status: "" });
    } else if (value === "pending") {
      setOrderFilters({ status: "pending" });
    } else if (value === "shipped") {
      setOrderFilters({ status: "shipped" });
    } else {
      setOrderFilters({ status: "delivered" });
    }
  }

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
        .toLocaleString(DateTime.DATE_SHORT);
    } else {
      return DateTime.fromFormat(date, "M/dd/yyyy")
        .plus({ days: 1 + dateAdjustment })
        .toLocaleString(DateTime.DATE_SHORT);
    }
  }

  function handleStatusChange(event, _id) {
    const { value } = event.target;
    updateOrder({ variables: { input: { _id, status: value } } });
  }

  return (
    <div>
      <div>Show:</div>
      <select name="filters" id="filters" onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
      </select>
      <div>
        {filteredOrders.length ? (
          filteredOrders.map((order) => {
            return (
              <div className="p-2 border" key={order._id}>
                <div>Order #{order._id}</div>
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
                  <div>Shipping Address: {order.deliveryAddress}</div>
                  <div>Shipping Type: {order.shippingType}</div>
                  <div>
                    Shipping Cost: ${(order.shippingCost / 100).toFixed(2)}
                  </div>
                  <div>
                    Estimated Delivery:{" "}
                    {deliveryDate(order.shippingType, order.purchaseDate)}
                  </div>
                </div>
                <div>Order Total: ${(order.total / 100).toFixed(2)}</div>
              </div>
            );
          })
        ) : (
          <div>There are no orders available...</div>
        )}
      </div>
    </div>
  );
}
export default UpdateOrders;
