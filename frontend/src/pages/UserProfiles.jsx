import { useEffect, useState } from "react";
import api from "../services/api";
import {getMe, updateMe} from "../services/userService";

export default function UserProfiles() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then( res => {
        setUser(res.data);
        setFormData(res.data);
      })
      .finally(() => setLoading(false));
    }, 
  []);

  const handleSave = async () => {
    const res = await updateMe(formData);
    setUser(res.data);
    setIsEditing(false);
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

  if (!user) {
    return <p className="text-center text-red-500">Utilisateur non trouvé</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#0F4C5C]">
        Mon profil
      </h2>

      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-xl mx-auto">

        {/* AVATAR */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={formData.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover border"
          />

          {isEditing && (
            <input
              type="text"
              name="avatar"
              value={formData.avatar || ""}
              onChange={handleChange}
              placeholder="URL de l’avatar"
              className="mt-4 w-full px-4 py-2 border rounded-lg"
            />
          )}
        </div>

        {/* INFOS */}
        {!isEditing ? (
          <div className="space-y-4 text-center">
            <p><strong>Prénom :</strong> {user.firstName}</p>
            <p><strong>Nom :</strong> {user.lastName}</p>
            <p><strong>Email :</strong> {user.email}</p>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 px-6 py-2 bg-[#0F4C5C] text-white rounded-full hover:bg-[#0C3E4B]"
            >
              Modifier
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />

            <div className="flex justify-between pt-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#0F4C5C] text-white rounded-full hover:bg-[#0C3E4B]"
              >
                Enregistrer
              </button>

              <button
                onClick={() => {
                  setFormData(user);
                  setIsEditing(false);
                }}
                className="px-6 py-2 border rounded-full"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
