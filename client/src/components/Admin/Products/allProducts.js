import { useProducts } from "../../../hooks/productHooks";
import { capitalizeFirstLetter } from "../../../utils/helpers";
import { Link } from "react-router-dom";

function AllProducts() {
    const products = useProducts();

    return (
        <div className="dialog">
            <h2 className="fw-light">All products</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td><img className="orderlist-img" src={product.mainImage} /></td>
                            <td>
                                <Link to={`/product/${product._id}`}>
                                    {capitalizeFirstLetter(product.name)}
                                </Link>
                            </td>
                            <td>{capitalizeFirstLetter(product.category.name)}</td>
                            <td>{product.inventory}</td>
                            <td>${product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllProducts;