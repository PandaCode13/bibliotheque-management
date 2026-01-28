import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ firstName, lastName, email, password });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-[#0F4C5C]">
          Inscription
        </h2>

        <div className="space-y-4">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="Prénom"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-[#9DBEBB]"
            required
          />

          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Nom de famille"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-[#9DBEBB]"
            required
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Adresse email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-[#9DBEBB]"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-[#9DBEBB]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#0F4C5C] text-[#FAFAF9] rounded-full 
                     font-semibold hover:bg-[#0C3E4B] transition"
        >
          S’inscrire
        </button>

        <p className="text-sm text-center text-gray-600">
          Vous avez déjà un compte ?{" "}
          <Link
            to="/login"
            className="text-[#0F4C5C] font-medium hover:underline"
          >
            Connexion
          </Link>
        </p>
      </form>
    </div>
  );
}
