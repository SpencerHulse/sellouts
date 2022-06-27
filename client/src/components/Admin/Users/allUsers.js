import { useUsers } from "../../../hooks/userHooks";
import { capitalizeFirstLetter } from "../../../utils/helpers";
import { Link } from "react-router-dom";

function AllUsers() {

    const users = useUsers();

    console.log(users)


    return (
        <div className="dialog">
            <h2 className="fw-light">All users</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">User type</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.admin ? ("Admin") : ("User")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllUsers;