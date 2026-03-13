import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicBookById } from "../services/bookService";

const FALLBACK_COVER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='400'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='24'>Livre</text></svg>";

export default function PublicBookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPublicBookById(id)
      .then((res) => setBook(res.data))
      .catch((err) => {
        setError(
          err.message || "Une erreur est survenue lors du chargement du livre",
        );
        console.error("Error fetching book:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // État de chargement
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        role="status"
        aria-label="Chargement du livre"
      >
        <span className="sr-only">Chargement...</span>
        <div className="text-[#0F4C5C] text-lg" aria-hidden="true">
          Chargement...
        </div>
      </div>
    );
  }

  // État d'erreur
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Oups ! Une erreur est survenue
          </h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  // Livre non trouvé
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-xl font-semibold text-yellow-700 mb-2">
            Livre non trouvé
          </h2>
          <p className="text-yellow-600 mb-4">
            Le livre que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  // Affichage principal
  return (
    <main className="min-h-screen bg-[#FAFAF9] flex " role="main">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* En-tête du livre */}
          <div className="border-b border-gray-100 bg-gradient-to-r from-[#0F4C5C]/5 to-transparent p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F4C5C] mb-3">
              {book.title}
            </h1>

            <p className="text-gray-600 text-lg mb-2">
              {book.authors?.length > 0
                ? book.authors.join(", ")
                : "Auteur inconnu"}
            </p>

            {/* Métadonnées optionnelles */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              {book.publisher && (
                <div className="flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
                    />
                  </svg>
                  <span>{book.publisher}</span>
                </div>
              )}

              {book.publishedDate && (
                <div className="flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    {new Date(book.publishedDate).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}

              {book.isbn && (
                <div className="flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>ISBN: {book.isbn}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Description
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {book.description || (
                  <span className="text-gray-400 italic">
                    Aucune description disponible pour ce livre.
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Résumé</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {book.resume || (
                  <span className="text-gray-400 italic">
                    Aucun résumé disponible pour ce livre.
                  </span>
                )}
              </p>
            </div>
          </div>

            {/* Il faut vérifier si book.pdfBook existe avant d’afficher le lien.
              Si le PDF n’existe pas → afficher un message “Ce livre sera ajouté prochainement”. */}
          {book?.pdfBook ? (
            <a
              href={`http://localhost:5000/${book.pdfBook}`}
              target="_blank"
              rel="noopener noreferrer"
              className="read-book-btn inline-block mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition duration-300"
            >
              Lire le livre
            </a>
          ) : (
            <p className="coming-soon mt-4 text-red-500 font-medium">
              Ce livre sera ajouté prochainement
            </p>
          )}
        </article>

        {/* Bouton de retour */}
        <div className="mt-6 text-center sm:text-left">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#0F4C5C] hover:text-[#0a3a47] transition-colors group"
            aria-label="Retour à la page précédente"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <img
          src={
            book.coverImage
              ? book.coverImage.startsWith("http")
                ? book.coverImage
                : `http://localhost:5000/${book.coverImage}`
              : FALLBACK_COVER
          }
          alt={book.title}
          className="h-60 w-full object-cover rounded-xl"
          onError={(e) => {
            e.target.src = FALLBACK_COVER;
          }}
        />
      </div>
    </main>
  );
}

// PropTypes optionnel pour la validation des types
PublicBookDetail.propTypes = {
  // Aucune prop requise car utilisation de useParams()
};
