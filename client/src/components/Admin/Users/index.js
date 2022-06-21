import { Link, Outlet } from "react-router-dom";

function AdminUsers() {
  return (
    <div>
      <Link to="/admin/users/delete-user">Delete User</Link>
      <Outlet />
    </div>
  );
}

export default AdminUsers;
