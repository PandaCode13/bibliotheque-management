export default function BookCover({ src, title }) {
  const fallback = "https://via.placeholder.com/200x300?text=Pas+d%27image";

  return (
    <img
      src={src && src.trim() !== "" ? src : fallback}
      alt={title}
      className="h-56 w-full object-contain bg-gray-100"
      loading="lazy"
    />
  );
}
