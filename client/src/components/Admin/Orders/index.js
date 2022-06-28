import { Outlet } from "react-router-dom";

function AdminOrders() {
  return (
    <div className="admin-body-content">
      <Outlet />
    </div>
  );
}

export default AdminOrders;
