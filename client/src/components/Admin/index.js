import { Link, Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <Link to="/admin/products">Products</Link>
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
