import { Link, Outlet } from "react-router-dom";

function AdminProducts() {
  return (
    <div>
      <Link to="/admin/products/add-product">Add Product</Link>
      <br />
      <Link to="/admin/products/update-product">Update Product</Link>
      <br />
      <Link to="/admin/products/delete-product">Delete Product</Link>
      <Outlet />
    </div>
  );
}

export default AdminProducts;
