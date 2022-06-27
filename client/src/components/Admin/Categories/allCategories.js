import { useCategories } from "../../../hooks/categoryHooks";
import { capitalizeFirstLetter } from "../../../utils/helpers";
import { useProducts } from "../../../hooks/productHooks";

function AllCategories() {
    const categories = useCategories();
    const products = useProducts();

    function filterProducts(category) {
        const filtered = products.filter(product => {
            const { _id } = product.category
            return category._id === _id
        })

        return filtered;
    }

    return (
        <div className="dialog">
            <h2 className="fw-light">All categories</h2>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Products</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category._id}>
                            <td>{capitalizeFirstLetter(category.name)}</td>
                            <td>
                                {filterProducts(category).map(product =>
                                    <div key={product._id}>{product.name}</div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    )
}

export default AllCategories;