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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F4C5C]">
            Mon Profil
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Gérez vos informations personnelles et votre mot de passe
          </p>
        </header>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 text-green-600 p-3 rounded-lg text-center">
            {successMessage}
          </div>
        )}

        {!user ? (
          <p className="text-center text-red-500">Utilisateur non trouvé</p>
        ) : (
          <>
            {/* INFORMATIONS */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-[#0F4C5C]">
                Informations personnelles
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* PRENOM */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="
                    w-full
                    px-4 py-2
                    border border-gray-300
                    rounded-lg
                    focus:ring-2 focus:ring-[#9DBEBB]
                    focus:outline-none
                    disabled:bg-gray-100
                  "
                  />
                </div>

                {/* NOM */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="
                    w-full
                    px-4 py-2
                    border border-gray-300
                    rounded-lg
                    focus:ring-2 focus:ring-[#9DBEBB]
                    focus:outline-none
                    disabled:bg-gray-100
                  "
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="
                  w-full
                  px-4 py-2
                  border border-gray-300
                  rounded-lg
                  focus:ring-2 focus:ring-[#9DBEBB]
                  focus:outline-none
                  disabled:bg-gray-100
                "
                />
              </div>

              {/* BOUTONS */}
              <div className="flex flex-wrap justify-end gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="
                      px-4 py-2
                      rounded-lg
                      bg-gray-200
                      hover:bg-gray-300
                      transition
                    "
                    >
                      Annuler
                    </button>

                    <button
                      onClick={handleSave}
                      className="
                      px-4 py-2
                      rounded-lg
                      bg-[#0F4C5C]
                      text-white
                      hover:bg-[#0C3E4B]
                      transition
                    "
                    >
                      Enregistrer
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="
                    px-4 py-2
                    rounded-lg
                    bg-[#0F4C5C]
                    text-white
                    hover:bg-[#0C3E4B]
                    transition
                  "
                  >
                    Modifier
                  </button>
                )}
              </div>
            </div>

            {/* MOT DE PASSE */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-[#0F4C5C]">
                Changer le mot de passe
              </h2>

              {/* OLD PASSWORD */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Ancien mot de passe
                </label>

                <div className="relative">
                  <input
                    type={type}
                    name="oldPassword"
                    onChange={handleChange}
                    className="
                    w-full
                    px-4 py-2
                    border border-gray-300
                    rounded-lg
                    pr-10
                    focus:ring-2 focus:ring-[#9DBEBB]
                    focus:outline-none
                  "
                  />

                  <button
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                    className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                  "
                  >
                    <Icon icon={icon} width="22" />
                  </button>
                </div>
              </div>

              {/* NEW PASSWORD */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Nouveau mot de passe
                </label>

                <div className="relative">
                  <input
                    type={type}
                    name="newPassword"
                    onChange={handleChange}
                    className="
                    w-full
                    px-4 py-2
                    border border-gray-300
                    rounded-lg
                    pr-10
                    focus:ring-2 focus:ring-[#9DBEBB]
                    focus:outline-none
                  "
                  />

                  <button
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                    className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                  "
                  >
                    <Icon icon={icon} width="22" />
                  </button>
                </div>
              </div>

              <button
                onClick={handlePasswordChange}
                disabled={
                  loadingPwd || !formData.oldPassword || !formData.newPassword
                }
                className="
                px-4 py-2
                rounded-lg
                bg-[#0F4C5C]
                text-white
                hover:bg-[#0C3E4B]
                disabled:opacity-50
                transition
              "
              >
                {loadingPwd ? "Changement..." : "Changer le mot de passe"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
};