import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminGestionUtilisateurs() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

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

      setUsers(users.map((u) => (u._id === id ? res.data : u)));
    } catch (err) {
      console.error("Erreur changement rôle", err);
    }
  };

  /* ======================
        TOGGLE STATUS
  ====================== */
  const toggleStatus = async (id) => {
    try {
      setError("");
      console.log("Toggling status for user:", id);
      const res = await api.patch(`/users/${id}/status`);
      console.log("Response:", res.data);

      setUsers(users.map((u) => (u._id === id ? res.data : u)));
      setSuccess(`Statut de l'utilisateur mis à jour !`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Erreur activation utilisateur", err);
      setError(
        err.response?.data?.message ||
          "Erreur lors de la mise à jour du statut",
      );
    }
  };

  /* ======================
        DELETE USER
  ====================== */
  const deleteUser = async (id) => {
    if (
      !window.confirm(
        "Supprimer cet utilisateur ? Cette action est irréversible.",
      )
    )
      return;

    try {
      setError("");
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
      setSuccess("Utilisateur supprimé avec succès !");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Erreur suppression utilisateur", err);
      setError(err.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  /* ======================
        HANDLE FORM CHANGE
  ====================== */
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ======================
        CREATE/UPDATE USER
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (editingUser) {
        // Modification
        const res = await api.put(`/users/${editingUser._id}`, formData);
        setUsers(users.map((u) => (u._id === editingUser._id ? res.data : u)));
        setSuccess("Utilisateur modifié avec succès !");
      } else {
        // Création
        const res = await api.post("/users", formData);
        setUsers([...users, res.data]);
        setSuccess("Utilisateur créé avec succès !");
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
      });
      setEditingUser(null);
      setShowForm(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'opération");
    }
  };

  /* ======================
        EDIT USER
  ====================== */
  const startEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      role: user.role,
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-10 px-4 sm:px-6 lg:px-8 py-6">
      {/* HEADER */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F4C5C]">
          Gestion des utilisateurs
        </h2>

        <p className="text-gray-600 text-sm sm:text-base">
          Gérer les rôles et l’accès des utilisateurs
        </p>
      </div>

      {/* MESSAGES */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {/* BOUTON AJOUT */}
      <div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingUser(null);
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              role: "user",
            });
          }}
          className="mb-5 px-5 py-2.5 bg-[#0F4C5C] text-white rounded-lg hover:bg-[#0D3D4A] transition"
        >
          {showForm ? "Fermer" : "+ Ajouter un utilisateur"}
        </button>

        {/* FORMULAIRE */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#0F4C5C] mb-4">
              {editingUser
                ? "Modifier l'utilisateur"
                : "Ajouter un nouvel utilisateur"}
            </h3>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleFormChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9DBEBB] outline-none"
              />

              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={formData.lastName}
                onChange={handleFormChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9DBEBB] outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9DBEBB] outline-none"
              />

              <input
                type="password"
                name="password"
                placeholder={
                  editingUser
                    ? "Laisser vide pour ne pas changer"
                    : "Mot de passe"
                }
                value={formData.password}
                onChange={handleFormChange}
                required={!editingUser}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9DBEBB] outline-none"
              />

              <select
                name="role"
                value={formData.role}
                onChange={handleFormChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9DBEBB] outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              {/* BOUTONS */}
              <div className="flex gap-2 col-span-full">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  {editingUser ? "Modifier" : "Créer"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingUser(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* TABLEAU */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="min-w-[850px] w-full text-sm">
          <thead className="bg-[#E6F1F0] text-[#0F4C5C] text-xs uppercase tracking-wide">
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
              <tr key={u._id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3 font-medium">
                  {u.firstName} {u.lastName}
                </td>

                <td className="p-3 text-gray-600">{u.email}</td>

                <td className="p-3 text-center">
                  {u.role === "admin" ? "Admin" : "User"}
                </td>

                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
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

                <td className="p-3 text-center">
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => startEditUser(u)}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() => toggleStatus(u._id)}
                      className="px-3 py-1.5 bg-[#9DBEBB] text-[#0F4C5C] rounded-md hover:bg-[#8BAFAE] text-xs"
                    >
                      {u.isActive ? "Désactiver" : "Activer"}
                    </button>

                    <button
                      onClick={() => deleteUser(u._id)}
                      className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 text-xs"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
