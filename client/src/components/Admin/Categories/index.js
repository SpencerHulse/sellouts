import { Link, Outlet } from "react-router-dom";

function AdminCategories() {
  return (
    <div>
      <Link to="/admin/categories/add-category">Add Category</Link>
      <br />
      <Link to="/admin/categories/update-category">Update Category</Link>
      <br />
      <Link to="/admin/categories/delete-category">Delete Category</Link>
      <Outlet />
    </div>
  );
}

export default AdminCategories;
