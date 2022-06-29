import { Outlet } from "react-router-dom";
import AdminNav from "./Nav/AdminNav";
import MobileAdminNav from "./Nav/MobileAdminNav";
import { notAdminRedirect } from "../../utils/helpers";
import { useWindowWidth } from "../../hooks/navHooks";

function AdminDashboard() {
  // Non-admin accounts are redirected to the homepage
  const admin = notAdminRedirect();
  const width = useWindowWidth();
  return (
    <>
      {/* Stops any data from showing to non-admins */}
      {admin && (
        <div className="admin">
          {width < 768 ? <MobileAdminNav /> : <AdminNav />}
          <div className="admin-body">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
