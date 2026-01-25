import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminCategories from "./pages/AdminCategories";
import AdminBooks from "./pages/AdminBooks";
import Catalog from "./pages/Catalog";
import BookDetails from "./pages/BookDetails";
import AdminUsers from "./pages/AdminUsers";

export default function App() {
  return (
    <>
      <Navbar />

      <Route
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Route
          path="/dashboard/admin/categories"
          element={
            <ProtectedRoute role="admin">
            <AdminCategories />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard/admin/books" element={ <ProtectedRoute role="admin"> <AdminBooks /> </ProtectedRoute> }/>

        <Route path="/dashboard/admin/users" element={ <ProtectedRoute role="admin"> <AdminUsers /> </ProtectedRoute> } />

      <Route path="/catalog" element={<Catalog />} />
      <Route path="/books/:id" element={<BookDetails />} />

    </>
  );
}
