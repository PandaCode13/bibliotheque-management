import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublicBookById } from "../services/bookService";

export default function UserBookDetail() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicBookById(id)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.error("Erreur chargement livre", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Chargement...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Livre introuvable
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="max-w-6xl mx-auto mb-6">
        <Link
          to="/catalog"
          className="
      inline-flex
      items-center
      gap-2
      text-sm
      font-semibold
      text-[#0F4C5C]
      hover:text-[#6FAFB0]
      transition
    "
        >
          ← Retour au catalogue
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* CARD */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm p-6 sm:p-8 grid md:grid-cols-3 gap-8">
          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={
                book.coverImage
                  ? book.coverImage.startsWith("http")
                    ? book.coverImage
                    : `http://localhost:5000/${book.coverImage}`
                  : "/placeholder-book.svg"
              }
              alt={book.title}
              className="w-64 h-[380px] object-cover rounded-xl"
              onError={(e) => {
                e.target.src = "/placeholder-book.svg";
              }}
            />
          </div>

          {/* INFOS */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* TITRE */}
            <div>
              <h1 className="text-3xl font-bold text-[#0F4C5C]">
                {book.title}
              </h1>

              <p className="text-gray-500 mt-2">
                {book.authors?.join(", ") || "Auteur inconnu"}
              </p>
            </div>

            {/* META */}
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
              {book.publisher && (
                <p>
                  <span className="font-semibold">Éditeur :</span>{" "}
                  {book.publisher}
                </p>
              )}

              {book.language && (
                <p>
                  <span className="font-semibold">Langue :</span>{" "}
                  {book.language}
                </p>
              )}

              {book.isbn && (
                <p>
                  <span className="font-semibold">ISBN :</span> {book.isbn}
                </p>
              )}

              {book.publishedDate && (
                <p>
                  <span className="font-semibold">Publication :</span>{" "}
                  {new Date(book.publishedDate).toLocaleDateString("fr-FR")}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div>
              <h3 className="font-semibold text-[#0F4C5C] mb-2">Description</h3>

              <p className="text-gray-700 text-sm leading-relaxed">
                {book.description || "Aucune description disponible."}
              </p>
            </div>

            {/* RESUME */}
            <div>
              <h3 className="font-semibold text-[#0F4C5C] mb-2">Résumé</h3>

              <p className="text-gray-700 text-sm leading-relaxed">
                {book.resume || "Aucun résumé disponible."}
              </p>
            </div>

            {/* TAGS */}
            {book.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-[#E6F1F0] text-[#0F4C5C] px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <a
              href={`http://localhost:5000/${book.pdfBook}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                  inline-block
                  w-fit
                  bg-[#0F4C5C]
                  text-white
                  px-6 py-2
                  rounded-lg
                  hover:bg-[#0C3E4B]
                  transition
                "
            >
              Lire le livre
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
