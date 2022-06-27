import { NavLink, Outlet } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

function AdminDashboard() {
  return (
    <div className="admin">
      <div className="admin-main-menu">
        <ul>
          <li>
            <NavLink to="/admin/dashboard">
              <Icon.Speedometer
                color="black"
                size={30}
                className="admin-icon"
              />
              <div className="menu-title">Dashboard</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/categories/add-category">
              <Icon.Tag color="black" size={30} className="admin-icon" />
              <div className="menu-title">Categories</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/products/add-product">
              <Icon.Archive color="black" size={30} className="admin-icon" />
              <div className="menu-title">Products</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/promotions/add-promotions">
              <Icon.Cash color="black" size={30} className="admin-icon" />
              <div className="menu-title">Promotions</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users/delete-user">
              <Icon.People color="black" size={30} className="admin-icon" />
              <div className="menu-title">Users</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders/update-orders">
              <Icon.Clipboard color="black" size={30} className="admin-icon" />
              <div className="menu-title">Orders</div>
            </NavLink>
          </li>
        </ul>
        <Icon.List className="admin-menu-button" size={30} />
      </div>
      <div className="admin-body">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
