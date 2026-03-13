import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPublicBookById,
  getCommentsByBook,
  likeBook,
  dislikeBook,
  addComment,
} from "../services/bookService";
import { toggleFavorite, getFavorites } from "../services/userService";

export default function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    Promise.all([getPublicBookById(id), getCommentsByBook(id)])
      .then(([bookRes, commentsRes]) => {
        setBook(bookRes.data);
        setComments(commentsRes.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (isAuthenticated && userRole === "user") {
      getFavorites().then((res) => {
        setIsFavorite(res.data.some((b) => b._id === id));
      });
    }
  }, [id, isAuthenticated, userRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Chargement...
      </div>
    );
  }

  /* ACTIONS */
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
    <div className="min-h-screen bg-[#FAFAF9] px-4 sm:px-6 py-8 sm:py-12">

      <div
        className="
        max-w-6xl mx-auto
        bg-white
        rounded-xl
        shadow-sm
        p-6 sm:p-8
        grid
        grid-cols-1
        md:grid-cols-3
        gap-8 sm:gap-10
      "
      >

        {/* IMAGE */}
        <img
          src={
            book.coverImage
              ? book.coverImage.startsWith("http")
                ? book.coverImage
                : `http://localhost:5000/${book.coverImage.replace(/\\/g, "/")}`
              : "/placeholder-book.svg"
          }
          alt={book.title}
          className="h-64 sm:h-72 w-full object-cover rounded-lg bg-gray-100"
          onError={(e) => {
            e.target.src = "/placeholder-book.svg";
          }}
        />

        {/* CONTENU */}
        <div className="md:col-span-2 space-y-4 text-[#0F4C5C]">

          <h2 className="text-2xl sm:text-3xl font-bold">
            {book.title}
          </h2>

          <p className="text-gray-600 text-sm sm:text-base">
            {book.authors?.join(", ") || "Auteur inconnu"}
          </p>

          <div className="space-y-2">

            <h3 className="text-sm font-medium text-gray-700">
              Description
            </h3>

            <p className="text-sm sm:text-base text-gray-700">
              {book.description || "Aucune description disponible."}
            </p>

          </div>

          <div className="space-y-2">

            <h3 className="text-sm font-medium text-gray-700">
              Résumé du livre
            </h3>

            <p className="text-sm sm:text-base text-gray-700">
              {book.resume || "Aucun résumé disponible."}
            </p>

          </div>

          {/* ACTIONS USER */}
          {isAuthenticated && userRole === "user" && (
            <div className="flex flex-wrap gap-3 pt-2">

              <button
                onClick={handleFavorite}
                className={`
                px-4 py-2 rounded-full text-sm font-semibold transition
                ${
                  isFavorite
                    ? "bg-[#9DBEBB]"
                    : "border border-[#9DBEBB] hover:bg-[#9DBEBB]"
                }
              `}
              >
                ⭐ Favori
              </button>

              <button
                onClick={handleLike}
                className="px-4 py-2 rounded-full bg-[#E6F1F0] text-sm"
              >
                👍 {book.likesCount}
              </button>

              <button
                onClick={handleDislike}
                className="px-4 py-2 rounded-full bg-[#F1E6E6] text-sm"
              >
                👎 {book.dislikesCount}
              </button>

            </div>
          )}

          {!isAuthenticated && (
            <p className="text-sm text-gray-500 italic">
              Connectez-vous pour aimer, commenter ou ajouter ce livre à vos favoris.
            </p>
          )}

        </div>

        {/* COMMENTAIRES */}
        <div className="md:col-span-3 pt-6">

          {isAuthenticated && userRole === "user" && (
            <div className="flex flex-col sm:flex-row gap-3 mb-6">

              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ajouter un commentaire..."
                className="
                flex-1 px-4 py-2
                border border-gray-300
                rounded-lg
                focus:outline-none
                focus:ring-2 focus:ring-[#9DBEBB]
              "
              />

              <button
                onClick={handleAddComment}
                className="
                px-5 py-2
                bg-[#0F4C5C]
                text-white
                rounded-lg
                hover:bg-[#0C3A45]
                transition
              "
              >
                Publier
              </button>

            </div>
          )}

          <div className="space-y-3">

            {comments.map((c) => (

              <div
                key={c._id}
                className="
                bg-[#FAFAF9]
                border border-[#DDE5E4]
                rounded-lg
                p-3
                text-sm
              "
              >
                <strong>{c.user?.firstName || "Utilisateur"} :</strong>{" "}
                {c.text}
              </div>

            ))}

          </div>

        </div>

      </div>
    </div>
  );
}