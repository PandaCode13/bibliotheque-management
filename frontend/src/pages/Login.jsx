import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);

    if (res.data.user.role === "admin") {
      navigate("/dashboard/admin");
    } else {
      navigate("/dashboard/user");
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Connexion
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
        Se connecter
      </button>

      <p className="text-sm text-center text-gray-500">
        Vous n’avez pas encore de compte ?{" "}
        <span className="text-indigo-600 hover:underline cursor-pointer">
          Inscription
        </span>
      </p>
    </form>
  </div>
);

}
