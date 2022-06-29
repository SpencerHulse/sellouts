import { NavLink } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

function AdminNav() {
  return (
    <div className="admin-main-menu">
      <ul>
        <li>
          <NavLink to="/admin/dashboard">
            <Icon.Speedometer color="black" size={30} className="admin-icon" />
            <div className="menu-title">Dashboard</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="categories">
            <Icon.Tag color="black" size={30} className="admin-icon" />
            <div className="menu-title">Categories</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="products">
            <Icon.Archive color="black" size={30} className="admin-icon" />
            <div className="menu-title">Products</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="promotions">
            <Icon.Cash color="black" size={30} className="admin-icon" />
            <div className="menu-title">Promotions</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="users">
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
    </div>
  );
}

export default AdminNav;
