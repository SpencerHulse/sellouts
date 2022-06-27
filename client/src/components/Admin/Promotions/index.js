import { NavLink, Outlet } from "react-router-dom";

function AdminPromotions() {
  return (
    <div className="admin-body-content">
      <div className="d-flex">
        <NavLink to="/admin/promotions/add-promotions" className="admin-submenu-button">Add Promotion</NavLink>
        <NavLink to="/admin/promotions/update-promotions" className="admin-submenu-button">Update Promotion</NavLink>
        <NavLink to="/admin/promotions/delete-promotions" className="admin-submenu-button">Delete Promotion</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminPromotions;
