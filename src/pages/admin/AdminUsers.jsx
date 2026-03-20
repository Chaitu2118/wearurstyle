// import { useEffect, useState } from "react";
// import { adminSuccess, adminWarning } from "../../utils/adminNotify";

// function AdminUsers() {
//   const [users, setUsers] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/api/admin/users", {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//       .then(res => res.json())
//       .then(data => setUsers(data));
//   }, [token]);

//   const handleRoleChange = (id, role) => {
//     fetch(`http://127.0.0.1:5000/api/admin/users/${id}/role`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({ role })
//     })
//       .then(res => res.json())
//       .then(() => {
//         adminSuccess("Role updated");
//         window.location.reload();
//       });
//   };

//   const handleDeleteUser = (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     fetch(`http://127.0.0.1:5000/api/admin/users/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//       .then(res => res.json())
//       .then(() => {
//         adminWarning("User deleted");
//         window.location.reload();
//       });
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Manage Users</h2>

//       <div className="card">
//         <div className="card-body">
//           <table className="table table-striped table-hover">
//             <thead className="table-dark">
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Joined</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {users.map(u => (
//                 <tr key={u.id}>
//                   <td>{u.id}</td>
//                   <td>{u.name}</td>
//                   <td>{u.email}</td>
//                   <td>
//                     <select
//                       className="form-select form-select-sm"
//                       value={u.role}
//                       onChange={(e) =>
//                         handleRoleChange(u.id, e.target.value)
//                       }
//                     >
//                       <option value="user">User</option>
//                       <option value="admin">Admin</option>
//                     </select>
//                   </td>
//                   <td>{new Date(u.created_at).toLocaleDateString()}</td>
//                   <td>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => handleDeleteUser(u.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminUsers;

import { useEffect, useState } from "react";
import { adminSuccess, adminWarning } from "../../utils/adminNotify";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ FIXED: use accessToken
  const token = localStorage.getItem("accessToken");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Unauthorized or server error");
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const handleRoleChange = async (id, role) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/admin/users/${id}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ role })
        }
      );

      if (!res.ok) throw new Error("Role update failed");

      adminSuccess("Role updated");

      // ✅ Update UI without reload
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, role: role } : u
        )
      );
    } catch (err) {
      console.error(err);
      alert("Role update failed");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?"))
      return;

    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/admin/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      adminWarning("User deleted");

      // ✅ Remove user from UI without reload
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Users</h2>

      <div className="card">
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(users) && users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={u.role}
                          onChange={(e) =>
                            handleRoleChange(u.id, e.target.value)
                          }
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>
                        {u.created_at
                          ? new Date(u.created_at).toLocaleDateString()
                          : "-"}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteUser(u.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
