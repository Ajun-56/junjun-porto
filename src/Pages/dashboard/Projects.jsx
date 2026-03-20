import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import {
  Plus,
  Trash2,
  Upload,
  FolderGit2,
  X,
  ImageIcon,
  ExternalLink,
  Github,
  Pencil,
} from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-500" />
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/12 rounded-2xl h-full">
      {children}
    </div>
  </div>
);

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) => (
  <div className="space-y-1.5">
    <label className="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
    />
  </div>
);

const SkeletonCard = () => (
  <div className="relative">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10" />
    <div className="relative bg-white/5 border border-white/12 rounded-2xl overflow-hidden">
      <div className="w-full aspect-[16/8] bg-white/5 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-white/5 animate-pulse rounded-lg w-2/3" />
        <div className="h-3 bg-white/5 animate-pulse rounded-lg w-full" />
        <div className="h-3 bg-white/5 animate-pulse rounded-lg w-4/5" />
        <div className="flex gap-1.5 mt-2">
          <div className="h-5 w-16 bg-white/5 animate-pulse rounded-full" />
          <div className="h-5 w-12 bg-white/5 animate-pulse rounded-full" />
          <div className="h-5 w-20 bg-white/5 animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

// ==================== PROJECT CARD ====================
const ProjectCard = ({ project, onDelete, onEdit }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Edit clicked:", project);
    onEdit({ ...project });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Delete clicked:", project.id);
    onDelete(project.id);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Card>
      <div className="relative overflow-hidden">
        {/* Image with skeleton */}
        <div className="w-full aspect-[16/8] bg-white/5">
          {!imgLoaded && (
            <div className="w-full h-full animate-pulse bg-white/5" />
          )}
          {project.Img && (
            <img
              src={project.Img}
              alt={project.Title}
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
          {!project.Img && (
            <div className="w-full h-full flex items-center justify-center bg-indigo-500/5">
              <ImageIcon className="w-8 h-8 text-indigo-500/30" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1">
            {project.Title || "Untitled Project"}
          </h3>
          
          {project.Description && (
            <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">
              {project.Description}
            </p>
          )}

          {project.TechStack?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.TechStack.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-xs"
                >
                  {t}
                </span>
              ))}
              {project.TechStack.length > 3 && (
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
                  +{project.TechStack.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Action buttons - SELALU TERLIHAT */}
          <div className="absolute top-2 right-2 flex gap-2 z-50">
            <button
              onClick={handleEdit}
              className="p-2 rounded-lg bg-indigo-500/90 hover:bg-indigo-500 text-white transition-colors shadow-lg backdrop-blur-sm border border-white/20"
              title="Edit Project"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-lg bg-red-500/90 hover:bg-red-500 text-white transition-colors shadow-lg backdrop-blur-sm border border-white/20"
              title="Delete Project"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Link buttons */}
          <div className="absolute bottom-2 left-2 flex gap-2 z-50">
            {project.Link && (
              <a
                href={project.Link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="p-2 rounded-lg bg-blue-500/90 hover:bg-blue-500 text-white transition-colors shadow-lg backdrop-blur-sm border border-white/20"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.Github && (
              <a
                href={project.Github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="p-2 rounded-lg bg-gray-500/90 hover:bg-gray-500 text-white transition-colors shadow-lg backdrop-blur-sm border border-white/20"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Hover effect background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>
    </Card>
  );
};

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    />
    <div
      className="relative z-10 w-full max-w-2xl flex flex-col"
      style={{ maxHeight: "calc(100vh - 24px)" }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-20 pointer-events-none" />
      <div className="relative bg-[#0a0a1a] border border-white/12 rounded-2xl flex flex-col overflow-hidden">
        {/* Fixed header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 shrink-0">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  </div>
);

// ==================== PROJECT FORM (FIXED) ====================
const ProjectForm = ({
  initial,
  onSubmit,
  onCancel,
  submitLabel = "Save Project",
  uploading,
}) => {
  // State untuk form
  const [form, setForm] = useState({
    Title: "",
    Description: "",
    TechStack: "",
    Features: "",
    Link: "",
    Github: "",
  });
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  // Effect untuk mengisi form ketika initial berubah (saat edit)
  useEffect(() => {
    if (initial) {
      console.log("Initial data received for edit:", initial);
      
      setForm({
        Title: initial.Title || "",
        Description: initial.Description || "",
        TechStack: Array.isArray(initial.TechStack)
          ? initial.TechStack.join(", ")
          : initial.TechStack || "",
        Features: Array.isArray(initial.Features)
          ? initial.Features.join(", ")
          : initial.Features || "",
        Link: initial.Link || "",
        Github: initial.Github || "",
      });
      
      setPreview(initial.Img || null);
    }
  }, [initial]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form, file);
      }}
      className="p-5 sm:p-6 space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <InputField
            label="Project Title"
            value={form.Title}
            onChange={set("Title")}
            placeholder="e.g. My Portfolio Website"
            required
          />
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">
            Description
          </label>
          <textarea
            value={form.Description}
            onChange={set("Description")}
            placeholder="Describe what this project does, its purpose, and impact..."
            rows={3}
            className="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none"
          />
        </div>

        <InputField
          label="Tech Stack (comma separated)"
          value={form.TechStack}
          onChange={set("TechStack")}
          placeholder="e.g. React, Tailwind, Supabase"
        />
        <InputField
          label="Key Features (comma separated)"
          value={form.Features}
          onChange={set("Features")}
          placeholder="e.g. Auth, Dark mode, REST API"
        />
        <InputField
          label="Live URL"
          value={form.Link}
          onChange={set("Link")}
          placeholder="https://yourproject.com"
        />
        <InputField
          label="GitHub URL"
          value={form.Github}
          onChange={set("Github")}
          placeholder="https://github.com/username/repo"
        />

        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">
            Project Image
          </label>
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files[0]);
            }}
            className={`flex flex-col items-center justify-center w-full min-h-[160px] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
              dragOver
                ? "border-indigo-400/60 bg-indigo-500/10"
                : "border-white/12 bg-white/4 hover:border-indigo-500/35 hover:bg-white/7"
            }`}
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="max-h-40 object-contain rounded-lg p-2"
              />
            ) : (
              <div className="text-center space-y-2 p-6">
                <div className="w-11 h-11 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto">
                  <ImageIcon className="w-5 h-5 text-indigo-400" />
                </div>
                <p className="text-sm text-gray-300">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-gray-600">PNG, JPG, WEBP supported</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {file && (
        <div className="flex items-center justify-between gap-3 flex-wrap p-3 bg-white/5 rounded-xl border border-white/10">
          <p className="text-xs text-gray-400 truncate flex-1">{file.name}</p>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setPreview(initial?.Img || null);
              }}
              className="px-3 py-1.5 rounded-xl border border-white/10 text-gray-500 hover:text-white text-xs transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white text-sm transition-colors"
        >
          Cancel
        </button>
        <button type="submit" disabled={uploading} className="relative group/s">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-60 blur group-hover/s:opacity-100 transition duration-300" />
          <div className="relative flex items-center gap-2 px-5 py-2 bg-[#030014] rounded-xl border border-white/10">
            {uploading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <Upload className="w-4 h-4 text-indigo-400" />
            )}
            <span className="text-sm text-gray-200">
              {uploading ? "Saving..." : submitLabel}
            </span>
          </div>
        </button>
      </div>
    </form>
  );
};

// ==================== MAIN COMPONENT ====================
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const uploadImage = async (f) => {
    try {
      const fileName = `project-${Date.now()}-${f.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      
      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(fileName, f);
      
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage
        .from("project-images")
        .getPublicUrl(fileName);
      
      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleCreate = async (form, file) => {
    setUploading(true);
    try {
      let imgUrl = "";
      if (file) imgUrl = await uploadImage(file);
      
      const { error } = await supabase.from("projects").insert({
        Title: form.Title,
        Description: form.Description,
        Img: imgUrl,
        TechStack: form.TechStack.split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        Features: form.Features.split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        Link: form.Link,
        Github: form.Github,
      });

      if (error) {
        console.error("Create error:", error);
        alert(`Error creating project: ${error.message}`);
      } else {
        setShowCreate(false);
        fetchProjects();
      }
    } catch (err) {
      console.error("Create exception:", err);
      alert("An error occurred while creating the project");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = async (form, file) => {
    setUploading(true);
    try {
      let imgUrl = editProject.Img || "";
      if (file) imgUrl = await uploadImage(file);
      
      const { error } = await supabase
        .from("projects")
        .update({
          Title: form.Title,
          Description: form.Description,
          Img: imgUrl,
          TechStack: form.TechStack.split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          Features: form.Features.split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          Link: form.Link,
          Github: form.Github,
        })
        .eq("id", editProject.id);

      if (error) {
        console.error("Edit error:", error);
        alert(`Error updating project: ${error.message}`);
      } else {
        setEditProject(null);
        fetchProjects();
      }
    } catch (err) {
      console.error("Edit exception:", err);
      alert("An error occurred while updating the project");
    } finally {
      setUploading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;
    
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      
      if (error) {
        console.error("Delete error:", error);
        alert(`Error deleting project: ${error.message}`);
      } else {
        fetchProjects();
      }
    } catch (err) {
      console.error("Delete exception:", err);
      alert("An error occurred while deleting the project");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-50" />
            <div className="relative w-9 h-9 bg-[#030014] rounded-xl border border-white/15 flex items-center justify-center">
              <FolderGit2 className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Projects
            </h1>
            <p className="text-gray-500 text-xs">
              {loading ? "Loading..." : `${projects.length} projects total`}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="relative group shrink-0"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur group-hover:opacity-80 transition duration-300" />
          <div className="relative flex items-center gap-2 px-4 py-2.5 bg-[#030014] rounded-xl border border-white/10">
            <Plus className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-gray-200">New Project</span>
          </div>
        </button>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <Modal title="Add New Project" onClose={() => setShowCreate(false)}>
          <ProjectForm
            onSubmit={handleCreate}
            onCancel={() => setShowCreate(false)}
            submitLabel="Save Project"
            uploading={uploading}
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {editProject && (
        <Modal title="Edit Project" onClose={() => setEditProject(null)}>
          <ProjectForm
            initial={editProject}
            onSubmit={handleEdit}
            onCancel={() => setEditProject(null)}
            submitLabel="Update Project"
            uploading={uploading}
          />
        </Modal>
      )}

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card>
          <div className="p-16 text-center">
            <FolderGit2 className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              No projects yet. Create your first one!
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={deleteProject}
              onEdit={setEditProject}
            />
          ))}
        </div>
      )}
    </div>
  );
}