import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicBookById, getCommentsByBook } from "../services/bookService";
import { toggleFavorite, getFavorites } from "../services/userService";
import { likeBook, dislikeBook, addComment } from "../services/bookService";

export default function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ AUTH CHECK
  const isAuthenticated = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // "user" | "admin"

  useEffect(() => {
    Promise.all([getPublicBookById(id), getCommentsByBook(id)])
      .then(([bookRes, commentsRes]) => {
        setBook(bookRes.data);
        setComments(commentsRes.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ⭐ Favori (UNIQUEMENT USER CONNECTÉ)
  useEffect(() => {
    if (isAuthenticated && userRole === "user") {
      getFavorites().then((res) => {
        setIsFavorite(res.data.some((b) => b._id === id));
      });
    }
  }, [id, isAuthenticated, userRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  /* ================== ACTIONS USER ================== */
  const handleFavorite = async () => {
    const res = await toggleFavorite(id);
    setIsFavorite(res.data.isFavorite);
  };

  const handleLike = async () => {
    const res = await likeBook(id);
    setBook({
      ...book,
      likesCount: res.data.likes,
      dislikesCount: res.data.dislikes,
    });
  };

  const handleDislike = async () => {
    const res = await dislikeBook(id);
    setBook({
      ...book,
      likesCount: res.data.likes,
      dislikesCount: res.data.dislikes,
    });
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    const res = await addComment(id, comment);
    setComments([res.data, ...comments]);
    setComment("");
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] px-6 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* IMAGE */}
        <img
          src={
            book.coverImage
              ? (book.coverImage.startsWith("http")
                  ? book.coverImage
                  : `http://localhost:5000/${book.coverImage.replace(/\\/g, "/")}`)
              : "https://via.placeholder.com/300x400?text=Livre"
          }
          alt={book.title}
          className="h-60 w-full object-cover align-middle rounded-lg bg-gray-100"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x400?text=Livre";
          }}
        />
        {/* CONTENT */}
        <div className="md:col-span-2 space-y-4 text-[#0F4C5C]">
          <h2 className="text-3xl font-bold">{book.title}</h2>
          <p className="text-gray-600">
            {book.authors?.join(", ") || "Auteur inconnu"}
          </p>

          <br />

          <h3 className="text-sm font-medium text-gray-700">Description</h3>
          <p>{book.description || "Aucune description disponible."}</p>

          {/* ================= ACTIONS USER ONLY ================= */}
          {isAuthenticated && userRole === "user" && (
            <div className="flex gap-4 pt-2">
              <button
                onClick={handleFavorite}
                className={`px-5 py-2 rounded-full font-semibold transition
                  ${
                    isFavorite
                      ? "bg-[#9DBEBB]"
                      : "border border-[#9DBEBB] hover:bg-[#9DBEBB]"
                  }`}
              >
                ⭐ Favori
              </button>

              <button
                onClick={handleLike}
                className="px-4 py-2 rounded-full bg-[#E6F1F0]"
              >
                👍 {book.likesCount}
              </button>

              <button
                onClick={handleDislike}
                className="px-4 py-2 rounded-full bg-[#F1E6E6]"
              >
                👎 {book.dislikesCount}
              </button>
            </div>
          )}

          {/* MESSAGE PUBLIC */}
          {!isAuthenticated && (
            <p className="text-sm text-gray-500 italic">
              Connectez-vous pour aimer, commenter ou ajouter ce livre à vos
              favoris.
            </p>
          )}
        </div>

        {/* ================= COMMENTS ================= */}
        <div className="md:col-span-3 pt-6">
          {/* AJOUT COMMENTAIRE (USER ONLY) */}
          {isAuthenticated && userRole === "user" && (
            <div className="flex gap-2 mb-4">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ajouter un commentaire..."
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-[#0F4C5C] text-white rounded-lg"
              >
                Publier
              </button>
            </div>
          )}

          {/* LISTE DES COMMENTAIRES (VISIBLE PUBLIC) */}
          <div className="space-y-3">
            {comments.map((c) => (
              <div
                key={c._id}
                className="bg-[#FAFAF9] border border-[#DDE5E4] rounded-lg p-3 text-sm"
              >
                <strong>{c.user?.firstName || "Utilisateur"} :</strong> {c.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
