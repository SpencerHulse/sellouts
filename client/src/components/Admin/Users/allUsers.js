import { useUsers } from "../../../hooks/userHooks";
import { useWindowWidth } from "../../../hooks/navHooks";

function AllUsers() {
  const users = useUsers();
  const width = useWindowWidth();

  return (
    <div className="dialog">
      <h2 className="fw-light">All users</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            {width > 768 ? (
              <>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Type</th>
              </>
            ) : (
              <th scope="col">Email</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                {width > 768 ? (
                  <>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.admin ? "Admin" : "User"}</td>
                  </>
                ) : (
                  <td>{user.email}</td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllUsers;
