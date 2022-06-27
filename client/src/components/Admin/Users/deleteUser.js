import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_USER } from "../../../graphql/mutations";
import { QUERY_USERS } from "../../../graphql/queries";

function DeleteUser() {
  const [selectedUser, setSelectedUser] = useState("");
  const [deleteUser] = useMutation(DELETE_USER);
  const { loading, data: users } = useQuery(QUERY_USERS);

  function handleSelect(event) {
    const { value } = event.target;
    setSelectedUser(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!selectedUser) return;

    deleteUser({ variables: { id: selectedUser } });

    window.location.assign("/admin/users");
  }

  // Removes admins from the deletion list
  function filteredUsers(users) {
    return users.users.filter((user) => user.admin === false);
  }

  return (
    <>
      {!loading && (
        <div>
          <div className="dialog">
            <form action="submit" onSubmit={handleSubmit}>
              <div className="dialog-section">
                <h2 className="fw-light">Delete a user</h2>
                <p className="description">
                  Select the user you want to delete
                </p>
                <label htmlFor="user" className="d-none">
                  User
                </label>
                <select
                  className="default-input"
                  name="user"
                  id="user"
                  required
                  onChange={handleSelect}
                >
                  <option value="">Select a User</option>
                  {filteredUsers(users).map((user) => (
                    <option value={user._id} key={user._id}>
                      {user.email}
                    </option>
                  ))}
                </select>
              </div>
              {selectedUser.admin ? (
                <button disabled className="default-button button-filled">
                  Delete
                </button>
              ) : (
                <button className="default-button button-filled">Delete</button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteUser;
