import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPublicBookById,
  likeBook,
  dislikeBook,
  getCommentsByBook,
  addComment,
} from "../services/bookService";
import { toggleFavorite } from "../services/userService";

export default function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getPublicBookById(id),
      getCommentsByBook(id),
    ])
      .then(([bookRes, commentsRes]) => {
        setBook(bookRes.data);
        setComments(commentsRes.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );

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

  const handleFavorite = async () => {
    const res = await toggleFavorite(id);
    setIsFavorite(res.data.includes(id));
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
            book.coverImage && book.coverImage.trim() !== ""
              ? book.coverImage
              : "https://via.placeholder.com/300x420?text=Pas+d%27image"
          }
          alt={book.title}
          className="w-full max-w-xs h-[420px] object-contain bg-gray-100 rounded-xl shadow"
        />

        {/* CONTENT */}
        <div className="md:col-span-2 space-y-4 text-[#0F4C5C]">

          <h2 className="text-3xl font-bold">{book.title}</h2>
          <p className="text-gray-600">
            {book.authors?.join(", ") || "Auteur inconnu"}
          </p>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-2">

            <button
              onClick={handleFavorite}
              className={`px-5 py-2 rounded-full font-semibold transition
                ${isFavorite
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

          {/* DESCRIPTION */}
          <p className="text-gray-700">{book.description}</p>

          {/* COMMENTS */}
          <div className="pt-6">
            <h3 className="text-lg font-semibold mb-3">Commentaires</h3>

            <div className="space-y-3 mb-4">
              {comments.map((c) => (
                <div
                  key={c._id}
                  className="bg-[#FAFAF9] border border-[#DDE5E4] rounded-lg p-3 text-sm"
                >
                  <strong>{c.user?.firstName || "Utilisateur"} :</strong>{" "}
                  {c.text}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
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

          </div>

        </div>
      </div>
    </div>
  );
}
