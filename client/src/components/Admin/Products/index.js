import { Link, Outlet } from "react-router-dom";

function AdminProducts() {
  return (
    <div>
      <Link to="/admin/products/add-product">Add Product</Link>
      <Outlet />
    </div>
  );
}

export default AdminProducts;
