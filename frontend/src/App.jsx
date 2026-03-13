import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import "./App.css";

// PUBLIC
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Catalog from "./pages/Catalog";
import PublicBookDetail from "./pages/PublicBookDetail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// USER
import UserDashboard from "./pages/UserDashboard";
import UserCatalogue from "./pages/UserCatalogue";
import UserFavorites from "./pages/UserFavorites";
import UserProfiles from "./pages/UserProfiles";
import UserBookDetails from "./pages/UserBookDetails";

// ADMIN
import AdminDashboard from "./pages/AdminDashboard";
import AdminGestionCategories from "./pages/AdminGestionCategories";
import AdminBooks from "./pages/AdminBooks";
import AdminImportBooks from "./pages/AdminImportBooks";
import AdminGestionUtilisateurs from "./pages/AdminGestionUtilisateurs";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/books/") ||
    location.pathname.startsWith("/dashboard/user/books/");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* PUBLIC */}
        <Route path="/home" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/books/:id" element={<PublicBookDetail />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

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
          path="/dashboard/user/books/:id"
          element={
            <ProtectedRoute role="user">
              <UserBookDetails />
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

        <Route
          path="/dashboard/user/profiles"
          element={
            <ProtectedRoute role="user">
              <UserProfiles />
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
          path="/dashboard/admin/import-books"
          element={
            <ProtectedRoute role="admin">
              <AdminImportBooks />
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
      </Routes>
    </>
  );
}
