import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      if (res.data.user.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/user");
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError(
          "Ce compte a été désactivé. Veuillez contacter l'administrateur.",
        );
      } else if (err.response && err.response.status === 401) {
        setError("Identifiants invalides.");
      } else {
        setError("Erreur lors de la connexion. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="
      w-full
      max-w-sm
      sm:max-w-md
      md:max-w-lg
      bg-white
      rounded-2xl
      shadow-lg
      p-6
      sm:p-8
      md:p-10
      space-y-6
    "
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#0F4C5C]">
          Connexion
        </h2>

        {error && (
          <div className="text-red-600 text-center font-semibold text-sm sm:text-base">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Adresse email"
            className="
          w-full
          px-4
          py-3
          border border-gray-300
          rounded-lg
          text-sm sm:text-base
          focus:outline-none
          focus:ring-2
          focus:ring-[#9DBEBB]
          transition
        "
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="
          w-full
          px-4
          py-3
          border border-gray-300
          rounded-lg
          text-sm sm:text-base
          focus:outline-none
          focus:ring-2
          focus:ring-[#9DBEBB]
          transition
        "
            required
          />
        </div>

        <button
          type="submit"
          className="
        w-full
        py-3
        text-sm sm:text-base
        bg-[#0F4C5C]
        text-[#FAFAF9]
        rounded-full
        font-semibold
        hover:bg-[#0C3E4B]
        transition
      "
        >
          Se connecter
        </button>

        <p className="text-xs sm:text-sm text-center text-gray-500">
          <Link
            to="/forgot-password"
            className="text-[#0F4C5C] hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </p>

        <p className="text-xs sm:text-sm text-center text-gray-600">
          Vous n’avez pas encore de compte ?{" "}
          <Link
            to="/register"
            className="text-[#0F4C5C] font-medium hover:underline"
          >
            Inscription
          </Link>
        </p>
      </form>
    </div>
  );
}
