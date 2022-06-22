import { Link, Outlet } from "react-router-dom";

function AdminPromotions() {
  return (
    <div>
      <Link to="/admin/promotions/add-promotions">Add Promotion</Link>
      <br />
      <Link to="/admin/promotions/update-promotions">Update Promotion</Link>
      <br />
      <Link to="/admin/promotions/delete-promotions">Delete Promotion</Link>
      <Outlet />
    </div>
  );
}

export default AdminPromotions;
