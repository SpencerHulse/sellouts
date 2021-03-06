import { useProducts } from "../../../hooks/productHooks";
import { useWindowWidth } from "../../../hooks/navHooks";
import { capitalizeFirstLetter } from "../../../utils/helpers";
import { Link } from "react-router-dom";

function AllProducts() {
  const products = useProducts();
  const width = useWindowWidth();

  return (
    <div className="dialog">
      <h2 className="fw-light">All products</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            {width > 768 && <th scope="col">Image</th>}
            <th scope="col">Name</th>
            {width > 768 && <th scope="col">Category</th>}
            <th scope="col">Stock</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              {width > 768 && (
                <td>
                  <img
                    className="orderlist-img"
                    src={product.mainImage}
                    alt={product.name}
                  />
                </td>
              )}
              <td>
                <Link to={`/product/${product._id}`}>
                  {capitalizeFirstLetter(product.name)}
                </Link>
              </td>
              {width > 768 && (
                <td>
                  {product.category
                    ? capitalizeFirstLetter(product.category.name)
                    : "Uncategorized"}
                </td>
              )}
              <td>{product.inventory}</td>
              <td>${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllProducts;
