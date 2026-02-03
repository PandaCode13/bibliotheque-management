import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminGestionUtilisateurs() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ======================
        LOAD USERS
  ====================== */
  const loadUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Erreur chargement utilisateurs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  /* ======================
        CHANGE ROLE
  ====================== */
  const changeRole = async (id, role) => {
    try {
      const res = await api.put(`/users/${id}/role`, { role });

      setUsers(
        users.map((u) =>
          u._id === id ? res.data : u
        )
      );
    } catch (err) {
      console.error("Erreur changement rôle", err);
    }
  };

  /* ======================
        TOGGLE STATUS
  ====================== */
  const toggleStatus = async (id) => {
    try {
      const res = await api.patch(`/users/${id}/status`);

      setUsers(
        users.map((u) =>
          u._id === id
            ? { ...u, isActive: res.data.isActive }
            : u
        )
      );
    } catch (err) {
      console.error("Erreur activation utilisateur", err);
    }
  };

  /* ======================
        DELETE USER
  ====================== */
  const deleteUser = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;

    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Erreur suppression utilisateur", err);
    }
  };

  return (
    <div className="space-y-10 m-5">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-[#0F4C5C]">
          Gestion des utilisateurs
        </h2>
        <p className="text-gray-600 mt-1">
          Gérer les rôles et l’accès des utilisateurs
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#E6F1F0] text-[#0F4C5C]">
            <tr>
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Rôle</th>
              <th className="p-3 text-center">Statut</th>
              <th className="p-3 text-center">Favoris</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  Chargement...
                </td>
              </tr>
            )}

            {!loading && users.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  Aucun utilisateur
                </td>
              </tr>
            )}

            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-3">
                  {u.firstName} {u.lastName}
                </td>

                <td className="p-3 text-gray-600">
                  {u.email}
                </td>

                <td className="p-3 text-center">
                  <select
                    value={u.role}
                    onChange={(e) =>
                      changeRole(u._id, e.target.value)
                    }
                    className="px-2 py-1 border rounded"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        u.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {u.isActive ? "Actif" : "Inactif"}
                  </span>
                </td>

                <td className="p-3 text-center text-gray-600">
                  {u.favoriteBooks?.length || 0}
                </td>

                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => toggleStatus(u._id)}
                    className="px-3 py-1 bg-[#9DBEBB] text-[#0F4C5C] rounded hover:bg-[#8BAFAE]"
                  >
                    {u.isActive ? "Désactiver" : "Activer"}
                  </button>

                  <button
                    onClick={() => deleteUser(u._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
