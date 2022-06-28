import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { useCategories } from "../../../hooks/categoryHooks";
import { capitalizeFirstLetter } from "../../../utils/helpers";
import { useProducts } from "../../../hooks/productHooks";

const Dashboard = () => {
  const categories = useCategories();
  const products = useProducts();

  const chartData = categories.map((category) => {
    const productData = products.filter(
      (product) => product.category._id === category._id
    );
    return {
      categoryName: capitalizeFirstLetter(category.name),
      productCount: productData.length,
    };
  });

  console.log(chartData);

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
                  // tickValues specifies both the number of ticks and where
                  // they are placed on the axis
                  tickValues={[]}
                  tickFormat={chartData.map((data) => data.categoryName)}
                />
                <VictoryAxis
                  dependentAxis
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
          <div className="dialog">
            <h2 className="fw-light">Pending orders</h2>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Customer</th>
                    <th scope="col">Items</th>
                    <th scope="col">Total</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Full name</th>
                    <td>2</td>
                    <td>$67.22</td>
                    <td>
                      <select>
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Fulfilled</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Full name</th>
                    <td>3</td>
                    <td>$81.32</td>
                    <td>
                      <select>
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Fulfilled</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Full name</th>
                    <td>1</td>
                    <td>$9.99</td>
                    <td>
                      <select>
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Fulfilled</option>
                      </select>
                    </td>
                  </tr>
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
