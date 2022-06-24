import { Link, Outlet } from "react-router-dom";

function AdminUsers() {
  return (
    <div className="admin-body-content">
      <div className="d-flex">
        <Link to="/admin/users/delete-user" className="default-button me-3">Delete User</Link>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminUsers;
