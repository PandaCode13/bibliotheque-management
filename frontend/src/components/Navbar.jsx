import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
      <Link to="/">Accueil</Link>{" | "}

      {!token && (
        <>
          <Link to="/login">Connexion</Link>{" | "}
          <Link to="/register">Inscription</Link>
        </>
      )}

      {token && role === "user" && (
        <Link to="/dashboard/user">Dashboard User</Link>
      )}

      {token && role === "admin" && (
        <Link to="/dashboard/admin">Dashboard Admin</Link>
      )}

      {token && (
        <>
          {" | "}
          <button onClick={logout}>Déconnexion</button>
          <Link to="/catalog">Catalogue</Link>{" | "}
        </>
      )}
    </nav>
  );
}
