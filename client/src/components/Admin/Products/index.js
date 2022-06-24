import { Link, Outlet } from "react-router-dom";

function AdminProducts() {
  return (
    <div className="admin-body-content">
      <div className="d-flex">
        <Link to="/admin/products/add-product" className="default-button me-3">Add Product</Link>
        <Link to="/admin/products/update-product" className="default-button me-3">Update Product</Link>
        <Link to="/admin/products/delete-product" className="default-button me-3">Delete Product</Link>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminProducts;
