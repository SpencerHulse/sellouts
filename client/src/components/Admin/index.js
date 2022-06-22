import { Link, Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <Link to="/admin/categories">Categories</Link>
      <br />
      <Link to="/admin/products">Products</Link>
      <br />
      <Link to="/admin/promotions">Promotions</Link>
      <br />
      <Link to="/admin/users">Users</Link>
      <br />
      <Link to="/admin/orders">Orders (not set up)</Link>
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
