import { NavLink, Outlet } from "react-router-dom";

function AdminUsers() {
  return (
    <div className="admin-body-content">
      <div className="d-flex">
        <NavLink to="delete-user" className="admin-submenu-button">Delete User</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminUsers;
