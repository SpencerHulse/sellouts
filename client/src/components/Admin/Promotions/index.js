import { Link, Outlet } from "react-router-dom";

function AdminPromotions() {
  return (
    <div className="admin-body-content">
      <div className="d-flex">
        <Link to="/admin/promotions/add-promotions" className="default-button me-3">Add Promotion</Link>
        <Link to="/admin/promotions/update-promotions" className="default-button me-3">Update Promotion</Link>
        <Link to="/admin/promotions/delete-promotions" className="default-button me-3">Delete Promotion</Link>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminPromotions;
