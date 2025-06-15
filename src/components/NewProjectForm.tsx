
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface NewProjectFormProps {
  onCreateProject: (name: string) => void;
}

export default function NewProjectForm({ onCreateProject }: NewProjectFormProps) {
  const [newProjectName, setNewProjectName] = useState("");
  const [showNewProject, setShowNewProject] = useState(false);

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      onCreateProject(newProjectName.trim());
      setNewProjectName("");
      setShowNewProject(false);
    }
  };

  if (showNewProject) {
    return (
      <div className="flex gap-2 px-2 mb-4">
        <Input
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Project name"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCreateProject();
            if (e.key === "Escape") setShowNewProject(false);
          }}
          autoFocus
          className="h-8 text-sm"
        />
        <Button onClick={handleCreateProject} size="sm" className="h-8">
          Add
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => setShowNewProject(true)}
      variant="ghost"
      size="sm"
      className="w-full justify-start gap-2 mb-4"
    >
      <Plus size={16} />
      New Project
    </Button>
  );
}
