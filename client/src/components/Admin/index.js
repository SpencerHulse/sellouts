import { Link, Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <Link to="/admin/products">Products</Link>
      <Link to="/admin/categories">Categories</Link>
      <Link to="/admin/users">Users</Link>
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
