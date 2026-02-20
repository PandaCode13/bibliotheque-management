import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState("");

  const emailGeneral = "support@votresite.com"; // À personnaliser

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setResetLink("");
    try {
      const res = await api.post("/auth/forgot-password", { email });
      if (res.data.resetLink) {
        setResetLink(res.data.resetLink);
        setMessage("Lien généré (dev) : " + res.data.resetLink);
      } else {
        setMessage("Si cet email existe, un lien a été envoyé.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Erreur lors de la demande.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendMail = (e) => {
    e.preventDefault();
    if (!email || !resetLink) {
      alert("Veuillez d'abord générer le lien de réinitialisation.");
      return;
    }
    const subject = "Réinitialisation de mot de passe";
    const body = `Bonjour,\n\nVoici le lien de réinitialisation pour l'utilisateur ${email} :\n${resetLink}\n\nMerci.`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-[#0F4C5C]">
          Mot de passe oublié
        </h2>

        <p className="text-sm text-gray-600 text-center">
          Entrez votre email pour recevoir un lien de réinitialisation
        </p>

        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Adresse email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMessage("");
          }}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-[#9DBEBB]"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#0F4C5C] text-white rounded-full
                     font-semibold hover:bg-[#0C3E4B] transition"
        >
          {loading ? "Envoi..." : "Envoyer le lien"}
        </button>


        {message && (
          <p className="text-sm text-center text-gray-600 break-all">{message}</p>
        )}
        {resetLink && (
          <button
            type="button"
            onClick={handleSendMail}
            className="w-full py-2 mt-2 bg-[#9DBEBB] text-white rounded-full font-semibold hover:bg-[#0F4C5C] transition"
          >
            Ouvrir mon client mail avec le lien
          </button>
        )}

        <p className="text-sm text-center text-gray-500">
          <Link to="/login" className="text-[#0F4C5C] hover:underline">
            Retour à la connexion
          </Link>
        </p>
      </form>
    </div>
  );
}
