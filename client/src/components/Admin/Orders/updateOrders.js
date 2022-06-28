import { useEffect, useState } from "react";
import Order from "./Order";
import { useGetOrders } from "../../../hooks/orderHooks";

function UpdateOrders() {
  const [orderFilters, setOrderFilters] = useState({ status: "" });
  const orders = useGetOrders();

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

  return (
    <div>
      <div className="dialog">
        <div className="mb-3 admin-order-select">
          <h2 className="fw-light">Orders</h2>
          <select
            className="default-input"
            name="filters"
            id="filters"
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
        <div>
          {filteredOrders.length ? (
            filteredOrders.map((order) => {
              return <Order order={order} options={options} />;
            })
          ) : (
            <div>There are no orders available...</div>
          )}
        </div>
      </div>
    </div>
  );
}
export default UpdateOrders;
