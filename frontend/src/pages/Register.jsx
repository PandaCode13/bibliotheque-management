import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register({ firstName, lastName, email, password });
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Erreur lors de l'inscription. Veuillez réessayer.");
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
          Inscription
        </h2>

        {error && (
          <div className="text-red-600 text-center font-semibold text-sm sm:text-base">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* prénom + nom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="Prénom"
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Nom de famille"
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
          S’inscrire
        </button>

        <p className="text-xs sm:text-sm text-center text-gray-600">
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
