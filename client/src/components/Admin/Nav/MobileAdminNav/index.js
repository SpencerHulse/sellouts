import { NavLink } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

function MobileAdminNav() {
  return (
    <div className="admin-mobile-menu">
      <ul className="admin-mobile-list d-flex flex-wrap justify-content-between">
        <li>
          <NavLink to="/admin/dashboard">
            <Icon.Speedometer
              color="black"
              size={30}
              className="admin-icon-mobile"
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="categories">
            <Icon.Tag color="black" size={30} className="admin-icon-mobile" />
          </NavLink>
        </li>
        <li>
          <NavLink to="products">
            <Icon.Archive
              color="black"
              size={30}
              className="admin-icon-mobile"
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="promotions">
            <Icon.Cash color="black" size={30} className="admin-icon-mobile" />
          </NavLink>
        </li>
        <li>
          <NavLink to="users">
            <Icon.People
              color="black"
              size={30}
              className="admin-icon-mobile"
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders/update-orders">
            <Icon.Clipboard
              color="black"
              size={30}
              className="admin-icon-mobile"
            />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default MobileAdminNav;
