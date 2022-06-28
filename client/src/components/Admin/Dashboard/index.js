import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { useCategories } from "../../../hooks/categoryHooks";
import { useProducts } from "../../../hooks/productHooks";
import { useGetOrders } from "../../../hooks/orderHooks";
import { capitalizeFirstLetter } from "../../../utils/helpers";

const Dashboard = () => {
  const categories = useCategories();
  const products = useProducts();
  const orders = useGetOrders();

  const [pendingOrders, setPendingOrders] = useState("");
  const [weeklyOrders, setWeeklyOrders] = useState("");

  console.log(orders);
  console.log(pendingOrders);
  console.log(weeklyOrders);

  useEffect(() => {
    function getPending(orders) {
      return orders.orders.filter((order) => order.status === "pending");
    }

    function getWeekly(orders) {
      const aWeekAgo = DateTime.now()
        .minus({ day: 7 })
        .toLocaleString(DateTime.DATE_SHORT);
      console.log(aWeekAgo);
      return orders.orders.filter((order) => {
        const orderDate = order.purchaseDate.split(", ")[0];
        return orderDate >= aWeekAgo;
      });
    }

    if (orders) {
      setPendingOrders(getPending(orders));
      setWeeklyOrders(getWeekly(orders));
    }
  }, [orders]);

  // Get an array of category names and how many products they have
  const chartData = categories.map((category) => {
    const productData = products.filter(
      (product) => product.category._id === category._id
    );
    return {
      categoryName: capitalizeFirstLetter(category.name),
      productCount: productData.length,
    };
  });

  return (
    <div className="admin-body-content">
      <div className="row">
        <div className="col h-100">
          <div className="dialog p-0 category-graph">
            <div className="">
              <VictoryChart
                // adding the material theme provided with Victory
                theme={VictoryTheme.material}
                // domainPadding will add space to each side of VictoryBar to
                // prevent it from overlapping the axis
                domainPadding={20}
              >
                <VictoryAxis
                  label="categories"
                  style={{
                    axisLabel: { padding: 30 },
                  }}
                  // tickValues specifies both the number of ticks and where
                  // they are placed on the axis
                  tickValues={[]}
                  tickFormat={chartData.map((data) => data.categoryName)}
                />
                <VictoryAxis
                  dependentAxis
                  label="products"
                  style={{
                    axisLabel: { padding: 25 },
                  }}
                  // tickFormat specifies how ticks should be displayed
                  tickFormat={(y) => {
                    if (y === Math.round(y)) {
                      return y;
                    } else {
                      return null;
                    }
                  }}
                />
                <VictoryBar
                  data={chartData}
                  // data accessor for x values
                  x="categoryName"
                  // data accessor for y values
                  y="productCount"
                />
              </VictoryChart>
            </div>
          </div>
        </div>
        <div className="col h-100">
          <div className="dialog pending-orders">
            <h2 className="fw-light">
              Pending orders{" "}
              <span>( {pendingOrders ? pendingOrders.length : 0} )</span>
            </h2>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingOrders
                    ? pendingOrders.map((order) => {
                        const { total, products, customer } = order;
                        const { username } = customer;
                        const quantity = products.length;
                        return (
                          <tr key={order._id}>
                            <td>{username}</td>
                            <td>{quantity}</td>
                            <td>${(total / 100).toFixed(2)}</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="dialog">
            <h2 className="fw-light">Sales this week</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
