import { Link } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <div>
      <h1>Bibliothèque Numérique</h1>
      <p>Plateforme de gestion et d’emprunt de livres.</p>

      {!token && (
        <div style={{ marginTop: 20 }}>
          <Link to="/login">
            <button>Se connecter</button>
          </Link>

          <Link to="/register" style={{ marginLeft: 10 }}>
            <button>S'inscrire</button>
          </Link>
        </div>
      )}
    </div>
  );
}
