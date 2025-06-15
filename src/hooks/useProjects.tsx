
import { useState, useEffect } from "react";

export interface Project {
  id: string;
  name: string;
  expanded: boolean;
}

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() => loadFromStorage("chatgpt-projects", []));

  useEffect(() => {
    saveToStorage("chatgpt-projects", projects);
  }, [projects]);

  const handleCreateProject = (name: string) => {
    const newProject: Project = {
      id: generateId(),
      name,
      expanded: true,
    };
    setProjects(prev => [...prev, newProject]);
  };
  const handleToggleProject = (projectId: string) => {
    setProjects(prev => prev.map(p => p.id === projectId ? {
      ...p,
      expanded: !p.expanded
    } : p));
  };
  const handleRenameProject = (projectId: string, newName: string) => {
    setProjects(prev => prev.map(p => p.id === projectId ? {
      ...p,
      name: newName
    } : p));
  };
  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  return {
    projects,
    setProjects, // for advanced usage, e.g. from chats logic
    handleCreateProject,
    handleToggleProject,
    handleRenameProject,
    handleDeleteProject,
  };
}
