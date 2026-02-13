import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Catalog from "./pages/Catalog";
import BookDetails from "./pages/BookDetails";

// USER
import UserDashboard from "./pages/UserDashboard";
import UserCatalogue from "./pages/UserCatalogue";
import UserFavorites from "./pages/UserFavorites";
import UserProfiles from "./pages/UserProfiles";

// ADMIN
import AdminDashboard from "./pages/AdminDashboard";
import AdminGestionCategories from "./pages/AdminGestionCategories";
import AdminBooks from "./pages/AdminBooks";
import AdminImportBooks from "./pages/AdminImportBooks";
import AdminGestionUtilisateurs from "./pages/AdminGestionUtilisateurs";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        
        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* PUBLIC */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/catalog" element={<Catalog/>}/>
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

        <Route
          path="/dashboard/user/profiles"
          element = {
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
          path="/dashboard/admin/users"
          element={
            <ProtectedRoute role="admin">
              <AdminGestionUtilisateurs />
            </ProtectedRoute>
          }
        />

        <Route 
          path = "/dashboard/admin/import-books" 
          element = {
            <ProtectedRoute role="admin">
              <AdminImportBooks />
            </ProtectedRoute>
          } 
          />
      </Routes>
    </>
  );
}