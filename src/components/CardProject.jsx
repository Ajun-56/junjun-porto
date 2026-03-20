import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { toSlug } from "../utils/slug";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  // Validasi data sebelum digunakan
  const safeTitle = Title || "Untitled Project";
  const safeDescription = Description || "No description available";
  const safeId = id || null;
  const safeImage = Img || '/placeholder-image.jpg';
  const safeProjectLink = ProjectLink || null;

  // Buat slug hanya jika Title tersedia
  const projectSlug = safeTitle ? toSlug(safeTitle) : '';

  return (
    <div className="group relative w-full h-full">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20 h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

        <div className="relative p-5 z-10 flex flex-col flex-1">
          {/* Container gambar dengan ukuran tetap */}
          <div className="relative overflow-hidden rounded-lg w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
            <img
              src={safeImage}
              alt={safeTitle}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg'; // Gambar placeholder jika error
              }}
            />
          </div>

          {/* Konten dengan flex-grow untuk mengisi ruang yang tersisa */}
          <div className="mt-4 space-y-3 flex flex-col flex-1">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent line-clamp-2 min-h-[3.5rem]">
              {safeTitle}
            </h3>

            <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-3 flex-1">
              {safeDescription}
            </p>

            {/* Footer selalu di bawah */}
            <div className="pt-4 flex items-center justify-between border-t border-white/10 mt-auto">
              {safeProjectLink ? (
                <a
                  href={safeProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-gray-500 text-sm italic">
                  Demo not available
                </span>
              )}

              {safeId ? (
                <Link
                  to={`/project/${projectSlug}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-gray-500 text-sm italic">
                  Details not available
                </span>
              )}
            </div>
          </div>

          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;