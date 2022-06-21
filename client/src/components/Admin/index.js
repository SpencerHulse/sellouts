import { Link, Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <Link to="/admin/products">Products</Link>
      <Link to="/admin/categories">Categories</Link>
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
