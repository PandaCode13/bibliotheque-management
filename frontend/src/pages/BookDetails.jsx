import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicBookById } from "../services/bookService";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    getPublicBookById(id).then((res) => setBook(res.data));
  }, [id]);

  if (!book) return <p>Chargement...</p>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p><strong>Auteurs :</strong> {book.authors.join(", ")}</p>
      <p><strong>ISBN :</strong> {book.isbn}</p>
      <p><strong>Catégorie :</strong> {book.category?.name}</p>
      <p><strong>Langue :</strong> {book.language}</p>
      <p><strong>Description :</strong> {book.description}</p>
      <p><strong>Disponibles :</strong> {book.availableCopies}</p>
    </div>
  );
}
