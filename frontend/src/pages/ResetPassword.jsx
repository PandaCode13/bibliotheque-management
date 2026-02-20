
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (password.length < 6) {
      setMessage("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        token,
        password,
      });
      setMessage("Mot de passe réinitialisé avec succès !");
      setTimeout(() => navigate("/dashboard/user"), 1500);
    } catch (err) {
      setMessage("Lien invalide ou expiré.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-[#0F4C5C]">
          Réinitialisation
        </h2>


        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9DBEBB]"
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9DBEBB]"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#0F4C5C] text-white rounded-full
                     font-semibold hover:bg-[#0C3E4B] transition"
        >
          {loading ? "Validation..." : "Réinitialiser"}
        </button>

        {message && (
          <p className="text-sm text-center text-gray-600">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
