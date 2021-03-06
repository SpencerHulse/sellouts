import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import * as Icon from "react-bootstrap-icons";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
} from "victory";
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
  const weeklyOrderData = [];

  if (weeklyOrders) {
    const hash = {};

    for (let i = 6; i >= 0; i--) {
      const fullDate = DateTime.now().minus({ day: i }).toFormat("M/d/yyyy");
      const date = fullDate.split("/")[0] + "/" + fullDate.split("/")[1];
      hash[date] = 0;
    }

    var weeklyTotal = 1;
    for (let i = 0; i < weeklyOrders.length; i++) {
      weeklyTotal = weeklyTotal + weeklyOrders[i].total;
    }

    weeklyOrders.forEach((order) => {
      const date = order.purchaseDate.split(", ")[0];
      const monthAndDay = date.split("/")[0] + "/" + date.split("/")[1];
      hash[monthAndDay] = hash[monthAndDay] + 1;
    });
    for (const key in hash) {
      weeklyOrderData.push({ date: key, sales: hash[key] });
    }
  }

  useEffect(() => {
    function getPending(orders) {
      return orders.orders.filter((order) => order.status === "pending");
    }

    function getWeekly(orders) {
      const aWeekAgo = DateTime.now().minus({ day: 7 }).toFormat("M/d/yyyy");

      return orders.orders.filter((order) => {
        const orderDate = order.purchaseDate.split(", ")[0];
        return orderDate > aWeekAgo;
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
      (product) => product.category?._id === category._id
    );
    return {
      categoryName: capitalizeFirstLetter(category.name),
      productCount: productData.length,
    };
  });

  const uncategorizedProducts = products.filter(
    (product) => product?.category === null
  );

  if (uncategorizedProducts) {
    chartData.push({
      categoryName: "Other",
      productCount: uncategorizedProducts.length,
    });
  }

  return (
    <div className="admin-body-content">
      <div className="row">
        <div className="col h-100">
          <div className="dialog category-graph">
            <h2 className="fw-light mb-4">Statistics</h2>
            <div className="row dialog-section">
              <div className="col-sm-12 col-xl-5">
                <h3 className="fw-light">Products per category</h3>
                <div>
                  <VictoryChart
                    // adding the material theme provided with Victory
                    theme={VictoryTheme.material}
                    height={215}
                    // domainPadding will add space to each side of VictoryBar to
                    // prevent it from overlapping the axis
                    domainPadding={20}
                    padding={{ top: 10, bottom: 50, right: 50, left: 50 }}
                  >
                    <VictoryAxis
                      label="Categories"
                      style={{
                        axisLabel: { padding: 30, fontSize: 12 },
                        tickLabels: { fontSize: 12 },
                      }}
                      // tickValues specifies both the number of ticks and where
                      // they are placed on the axis
                      tickValues={[]}
                      tickFormat={chartData.map((data) => data.categoryName)}
                    />
                    <VictoryAxis
                      dependentAxis
                      label="Products"
                      style={{
                        axisLabel: { padding: 25, fontSize: 12 },
                        tickLabels: { fontSize: 12 },
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
                      style={{
                        data: { fill: "#7f60db" },
                      }}
                      data={chartData}
                      // data accessor for x values
                      x="categoryName"
                      // data accessor for y values
                      y="productCount"
                    />
                  </VictoryChart>
                </div>
              </div>
              <div className="col-sm-12 col-xl-7">
                <h3 className="fw-light">Sales this week</h3>
                {weeklyOrderData.length && (
                  <div>
                    <VictoryChart
                      height={200}
                      padding={{ top: 10, bottom: 50, right: 50, left: 50 }}
                    >
                      <VictoryAxis
                        style={{ tickLabels: { fontSize: 12 } }}
                        tickValues={[]}
                        tickFormat={(x) => x}
                      />

                      <VictoryAxis
                        dependentAxis
                        label="Sales"
                        style={{
                          axisLabel: { padding: 25, fontSize: 12 },
                          tickLabels: { fontSize: 12 },
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

                      <VictoryLine
                        style={{
                          data: { stroke: "#7f60db" },
                          tickLabels: { fontSize: 10 },
                        }}
                        data={weeklyOrderData}
                        x="date"
                        y="sales"
                      />
                    </VictoryChart>
                  </div>
                )}
              </div>
            </div>
            <h2 className="fw-light mb-4">Weekly totals</h2>
            <div className="dialog-section d-flex">
              <div className="me-5 d-flex justify-content-between statistic-box align-items-center">
                <Icon.Clipboard color="black" size={40} className="stat-icon" />
                <div>
                  <div className="fw-bold text-end">{weeklyOrders.length}</div>
                  <div>Orders</div>
                </div>
              </div>

              <div className="d-flex justify-content-between statistic-box align-items-center">
                <Icon.CashStack color="black" size={40} className="stat-icon" />
                <div>
                  <div className="fw-bold text-end">
                    ${(weeklyTotal / 100).toFixed(2)}
                  </div>
                  <div>Income</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-100">
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
    </div>
  );
};

export default Dashboard;
