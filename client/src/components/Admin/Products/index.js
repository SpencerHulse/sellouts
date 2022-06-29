import { NavLink, Outlet } from "react-router-dom";

function AdminProducts() {
  return (
    <div className="admin-body-content">
      <div className="d-flex">
        <NavLink
          to="/admin/products/add-product"
          className="admin-submenu-button"
        >
          Add
        </NavLink>
        <NavLink
          to="/admin/products/update-product"
          className="admin-submenu-button"
        >
          Update
        </NavLink>
        <NavLink
          to="/admin/products/delete-product"
          className="admin-submenu-button"
        >
          Delete
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminProducts;
