import { useEffect, useState } from "react";
import {
  getUsers,
  updateUserRole,
  toggleUserStatus,
  deleteUser,
} from "../services/userService";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const load = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const changeRole = async (id, role) => {
    await updateUserRole(id, role);
    load();
  };

  const toggleStatus = async (id) => {
    await toggleUserStatus(id);
    load();
  };

  const remove = async (id) => {
    if (confirm("Supprimer cet utilisateur ?")) {
      await deleteUser(id);
      load();
    }
  };

  return (
    <div>
      <h2>Gestion des utilisateurs</h2>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actif</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.email}</td>

              <td>
                <select
                  value={u.role}
                  onChange={(e) =>
                    changeRole(u._id, e.target.value)
                  }
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                  <option value="moderator">moderator</option>
                </select>
              </td>

              <td>{u.isActive ? "Oui" : "Non"}</td>

              <td>
                <button onClick={() => toggleStatus(u._id)}>
                  Activer / Désactiver
                </button>
                <button onClick={() => remove(u._id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
