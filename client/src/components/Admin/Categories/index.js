import { NavLink, Outlet } from "react-router-dom";

function AdminCategories() {
  return (
    <div className="admin-body-content">
      <div className="d-flex">
        <NavLink
          to="/admin/categories/add-category"
          className="admin-submenu-button"
        >
          Add Category
        </NavLink>
        <NavLink
          to="/admin/categories/update-category"
          className="admin-submenu-button"
        >
          Update Category
        </NavLink>
        <NavLink
          to="/admin/categories/delete-category"
          className="admin-submenu-button"
        >
          Delete Category
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminCategories;
