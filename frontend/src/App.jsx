import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Catalog from "./pages/Catalog";
import BookDetails from "./pages/BookDetails";

// USER
import UserDashboard from "./pages/UserDashboard";
import UserCatalogue from "./pages/UserCatalogue";
import UserFavorites from "./pages/UserFavorites";

// ADMIN
import AdminDashboard from "./pages/AdminDashboard";
import AdminGestionCategories from "./pages/AdminGestionCategories";
import AdminBooks from "./pages/AdminBooks";
import AdminGestionUtilisateurs from "./pages/AdminGestionUtilisateurs";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/books/:id" element={<BookDetails />} />

        {/* USER */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/user/catalog"
          element={
            <ProtectedRoute role="user">
              <UserCatalogue />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/user/favorites"
          element={
            <ProtectedRoute role="user">
              <UserFavorites />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/admin/categories"
          element={
            <ProtectedRoute role="admin">
              <AdminGestionCategories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/admin/books"
          element={
            <ProtectedRoute role="admin">
              <AdminBooks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/admin/users"
          element={
            <ProtectedRoute role="admin">
              <AdminGestionUtilisateurs />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}