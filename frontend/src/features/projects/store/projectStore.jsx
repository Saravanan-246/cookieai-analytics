import { create } from "zustand";

const STORAGE_KEY = "analytics_projects";

export const useProjectStore = create((set, get) => ({
  projects: [],
  selectedProject: null,

  /* 🔥 INIT (LOAD FROM LOCALSTORAGE) */
  init: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);

      set({
        projects: parsed.projects || [],
        selectedProject: parsed.selectedProject || null,
      });
    } catch (err) {
      console.error("ProjectStore init error:", err.message);
    }
  },

  /* 🔥 SAVE TO LOCALSTORAGE */
  persist: () => {
    try {
      const { projects, selectedProject } = get();

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          projects,
          selectedProject,
        })
      );
    } catch (err) {
      console.error("ProjectStore persist error:", err.message);
    }
  },

  /* 🔥 ADD PROJECT */
  addProject: (project) => {
    const { projects } = get();

    /* prevent duplicate */
    const exists = projects.find(
      (p) => p.siteId === project.siteId
    );
    if (exists) return;

    const updated = [...projects, project];

    set({
      projects: updated,
      selectedProject: project, // auto select
    });

    get().persist();
  },

  /* 🔥 SELECT PROJECT */
  selectProject: (project) => {
    set({ selectedProject: project });
    get().persist();
  },

  /* 🔥 REMOVE PROJECT */
  removeProject: (siteId) => {
    const { projects, selectedProject } = get();

    const updated = projects.filter((p) => p.siteId !== siteId);

    set({
      projects: updated,
      selectedProject:
        selectedProject?.siteId === siteId
          ? updated[0] || null
          : selectedProject,
    });

    get().persist();
  },

  /* 🔥 CLEAR ALL */
  clearProjects: () => {
    set({
      projects: [],
      selectedProject: null,
    });

    localStorage.removeItem(STORAGE_KEY);
  },
}));