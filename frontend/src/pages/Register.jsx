import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ email, password });
    navigate("/login");
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Inscription
      </h2>

      <div className="space-y-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Adresse email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        S’inscrire
      </button>

      <p className="text-sm text-center text-gray-500">
        Vous avez déjà un compte ?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-indigo-600 hover:underline cursor-pointer"
        >
          Connexion
        </span>
      </p>
    </form>
  </div>
);

}
