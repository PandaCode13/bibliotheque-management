import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublicBookById } from "../services/bookService";

export default function PublicBookDetail() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicBookById(id)
      .then((res) => setBook(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Chargement...
      </div>
    );

  if (!book)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Livre introuvable
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-6">
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

      <div className="max-w-6xl mx-auto">
        {/* HEADER LIVRE */}
        <div className="bg-white shadow-xl rounded-2xl p-8 grid md:grid-cols-3 gap-10">
          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={
                book.coverImage
                  ? book.coverImage.startsWith("http")
                    ? book.coverImage
                    : `http://localhost:5000/${book.coverImage.replace(/\\/g, "/")}`
                  : "/placeholder-book.svg"
              }
              alt={book.title}
              className="w-60 h-[380px] object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* INFOS */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0F4C5C] mb-2">
                {book.title}
              </h1>

              <p className="text-gray-600 mb-6">
                {book.authors?.join(", ") || "Auteur inconnu"}
              </p>

              {/* DESCRIPTION */}
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-[#0F4C5C]">Description</h3>
                  <p>{book.description || "Aucune description disponible."}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#0F4C5C]">Résumé</h3>
                  <p>{book.resume || "Aucun résumé disponible."}</p>
                </div>
              </div>

              {/* TAGS */}
              {book.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#0F4C5C]/10 text-[#0F4C5C] px-3 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* BOUTON LECTURE */}
            <div className="mt-8">
              {book?.pdfBook ? (
                <a
                  href={`http://localhost:5000/${book.pdfBook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#0F4C5C] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#0c3c49] transition"
                >
                  Lire le livre
                </a>
              ) : (
                <p className="text-red-500 font-medium">
                  Ce livre sera ajouté prochainement
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
