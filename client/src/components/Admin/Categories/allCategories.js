import { useCategories } from "../../../hooks/categoryHooks";
import { capitalizeFirstLetter } from "../../../utils/helpers";

function AllCategories() {
    const categories = useCategories();

    return (
        <div className="mt-5 dialog">
            <h2 className="fw-light">Categories</h2>
            <ul className="list-group mt-5">
            {categories.map((category) => (
                <li className="list-group-item list-group-item-action" key={category._id}>
                    {capitalizeFirstLetter(category.name)}
                </li>
            ))}
            </ul>
        </div>
    )
}

export default AllCategories;