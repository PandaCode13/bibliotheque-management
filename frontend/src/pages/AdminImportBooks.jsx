import { useState } from "react";
import { importBooks } from "../services/bookService";

export default function AdminImportBooks() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!file) {
      setError("Veuillez sélectionner un fichier CSV");
      return;
    }

    try {
      const res = await importBooks(file);
      setMessage(res.data.message);
    } catch (err) {
      setError("Erreur lors de l'import");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#0F4C5C]">
        Importer des livres (CSV)
      </h2>

      {error && <div className="text-red-600 mb-3">{error}</div>}
      {message && <div className="text-green-600 mb-3">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-[#0F4C5C] text-white px-4 py-2 rounded hover:bg-[#0D3D4A]"
        >
          Importer
        </button>
      </form>
    </div>
  );
}
