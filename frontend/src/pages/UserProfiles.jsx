import { useEffect, useState } from "react";
import api from "../services/api";
import { getMe, updateMe } from "../services/userService";
import { Icon } from "@iconify/react";

export default function UserProfiles() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [icon, setIcon] = useState("mdi:eye-off");
  const [type, setType] = useState("password");
  const [loadingPwd, setLoadingPwd] = useState(false);

  useEffect(() => {
    getMe()
      .then((res) => {
        setUser(res.data);
        setFormData({
          ...formData,
          firstName: res.data.firstName || "",
          lastName: res.data.lastName || "",
          email: res.data.email || "",
        });
      })
      .catch(() => setError("Erreur lors du chargement du profil"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  const handleSave = async () => {
    setError("");
    setSuccessMessage("");
    try {
      const res = await updateMe({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });
      setUser(res.data);
      setIsEditing(false);
      setSuccessMessage("Profil mis à jour avec succès !");
    } catch (err) {
      setError("Erreur lors de la mise à jour du profil");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement du profil...
      </div>
    );
  }

  const handleTogglePasswordVisibility = () => {
    if (type === "password") {
      setIcon("mdi:eye");
      setType("text");
    } else {
      setIcon("mdi:eye-off");
      setType("password");
    }
  };

  async function handlePasswordChange(e) {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    if (!formData.oldPassword || !formData.newPassword) {
      setError("Veuillez remplir les deux champs mot de passe.");
      return;
    }
    setLoadingPwd(true);
    try {
      await api.post("/auth/change-password", {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      setSuccessMessage("Mot de passe changé avec succès !");
      setFormData({ ...formData, oldPassword: "", newPassword: "" });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Erreur lors du changement de mot de passe");
      }
    } finally {
      setLoadingPwd(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="max-w-3xl mx-auto px-6 py-10 display-flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-[#0F4C5C] mb-6">Mon Profil</h1>
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        {!user ? (
          <p className="text-center text-red-500">Utilisateur non trouvé</p>
        ) : (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Informations personnelles
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="ex. Jean"
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="ex. Dupont"
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-[#0F4C5C] text-white rounded"
                    >
                      Enregistrer
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-[#0F4C5C] text-white rounded"
                  >
                    Modifier
                  </button>
                )}
              </div>
            </div>
            {/* Changement de mot de passe avec une option de voir son mot de passe*/}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Changer le mot de passe
              </h2>
              {/* Ancien mot de passe */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Ancien mot de passe
                </label>

                <div className="relative">
                  <input
                    type={type}
                    name="oldPassword"
                    placeholder="Ancien mot de passe"
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-12"
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <Icon icon={icon} width="22" />
                  </button>
                </div>
              </div>

              {/* Nouveau mot de passe */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>

                <div className="relative">
                  <input
                    type={type}
                    name="newPassword"
                    placeholder="Nouveau mot de passe"
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-12"
                    onChange={handleChange}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <Icon icon={icon} width="22" />
                  </button>
                </div>
              </div>
              <button
                className="px-4 py-2 bg-[#0F4C5C] text-white rounded disabled:opacity-50"
                onClick={handlePasswordChange}
                disabled={loadingPwd || !formData.oldPassword || !formData.newPassword}
              >
                {loadingPwd ? "Changement..." : "Changer le mot de passe"}
              </button>
            </div>

            {/* Plus de trucs optionnels */}
          </>
        )}
      </div>
    </div>
  )
};