import { Link, Outlet } from "react-router-dom";

function AdminCategories() {
  return (
    <div className="admin-body-content">
      <div className="d-flex">
        <Link
          to="/admin/categories/add-category"
          className="default-button me-3"
        >
          Add Category
        </Link>
        <Link
          to="/admin/categories/update-category"
          className="default-button me-3"
        >
          Update Category
        </Link>
        <Link
          to="/admin/categories/delete-category"
          className="default-button me-3"
        >
          Delete Category
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminCategories;
