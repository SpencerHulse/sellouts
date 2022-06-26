import { Link, Outlet } from "react-router-dom";

function AdminOrders() {
  return (
    <div className="admin-body-content">
      <div className="d-flex">
        <Link to="/admin/orders/update-orders" className="default-button me-3">
          Update Orders
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminOrders;
