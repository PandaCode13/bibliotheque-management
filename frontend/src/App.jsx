import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// USER
import UserDashboard from "./pages/UserDashboard";
import UserCatalog from "./pages/UserCatalogue";
import UserFavorites from "./pages/UserFavorites";

// ADMIN
import AdminDashboard from "./pages/AdminDashboard";
import AdminCategories from "./pages/AdminCategories";
import AdminBooks from "./pages/AdminBooks";
import AdminUsers from "./pages/AdminUsers";

import Catalog from "./pages/Catalog";
import BookDetails from "./pages/BookDetails";

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
          path="/UserDashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/UserCatalog"
          element={
            <ProtectedRoute role="user">
              <UserCatalog />
            </ProtectedRoute>
          }
        />
        
        <Route path="/favorites" element={ <ProtectedRoute role="user"> <UserFavorites /> </ProtectedRoute> } />

        {/* ADMIN */}
        <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/AdminCategories"
          element={
            <ProtectedRoute role="admin">
              <AdminCategories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/AdminBooks"
          element={
            <ProtectedRoute role="admin">
              <AdminBooks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/AdminUsers"
          element={
            <ProtectedRoute role="admin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
