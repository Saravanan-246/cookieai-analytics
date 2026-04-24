import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* COMPONENTS */
import ProjectCard from "../components/ProjectCard";
import AddProjectModal from "../components/AddProjectModal";
import ConfirmModal from "../../../components/ConfirmModal";
import ScriptModal from "../components/ScriptModal";

/* STORE */
import { useProjectStore } from "../store/projectStore";

const ProjectsPage = () => {
  const navigate = useNavigate();

  const {
    projects,
    addProject,
    selectProject,
    removeProject,
  } = useProjectStore();

  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [scriptProject, setScriptProject] = useState(null); // 🔥 NEW

  /* ADD PROJECT */
  const handleAdd = (project) => {
    addProject(project);
    selectProject(project);
    // no navigation → handled inside modal
  };

  /* DELETE */
  const handleDelete = (project) => {
    setDeleteTarget(project);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    removeProject(deleteTarget.siteId);
    setDeleteTarget(null);
  };

  /* EDIT (future) */
  const handleEdit = (project) => {
    console.log("Edit project:", project);
  };

  return (
    <div className="pt-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Projects
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Track your websites and monitor analytics in real-time
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:opacity-90 transition shadow-lg shadow-violet-500/20"
          >
            + New Project
          </button>
        </div>

        {/* PROJECT GRID */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.siteId}
                project={project}
                stats={{
                  visitors: 0,
                  pageviews: 0,
                  status: "waiting",
                }}

                /* VIEW ANALYTICS */
                onSelect={(p) => {
                  selectProject(p);
                  navigate("/analytics");
                }}

                /* ACTIONS */
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewScript={(p) => setScriptProject(p)} // 🔥 NEW
              />
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">

            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-5">
              <span className="text-2xl text-zinc-400">+</span>
            </div>

            <h2 className="text-lg text-white mb-2">
              No projects yet
            </h2>

            <p className="text-sm text-zinc-500 mb-6 max-w-sm">
              Add your first project to start tracking visitors, pageviews, and user behavior
            </p>

            <button
              onClick={() => setOpen(true)}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm hover:opacity-90 transition shadow-md shadow-violet-500/20"
            >
              Create Project
            </button>
          </div>
        )}
      </div>

      {/* ADD PROJECT MODAL */}
      <AddProjectModal
        open={open}
        onClose={() => setOpen(false)}
        onAdd={handleAdd}
      />

      {/* 🔥 SCRIPT MODAL (NEW) */}
      <ScriptModal
        open={!!scriptProject}
        project={scriptProject}
        onClose={() => setScriptProject(null)}
      />

      {/* DELETE CONFIRM */}
      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Project"
        message={`Delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default ProjectsPage;