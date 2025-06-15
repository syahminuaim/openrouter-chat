
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NewProjectForm from "./NewProjectForm";
import ProjectItem from "./ProjectItem";
import UncategorizedChats from "./UncategorizedChats";

interface Project {
  id: string;
  name: string;
  expanded: boolean;
}

interface Chat {
  id: string;
  name: string;
  projectId?: string;
}

interface ProjectManagerProps {
  projects: Project[];
  chats: Chat[];
  activeChatId: string | null;
  onCreateProject: (name: string) => void;
  onToggleProject: (projectId: string) => void;
  onRenameProject: (projectId: string, newName: string) => void;
  onDeleteProject: (projectId: string) => void;
  onSelectChat: (chatId: string) => void;
  onCreateChat: (projectId?: string) => void;
  onRenameChat: (chatId: string, newName: string) => void;
  onDeleteChat: (chatId: string) => void;
  onMoveChatToProject: (chatId: string, projectId?: string) => void;
}

export default function ProjectManager({
  projects,
  chats,
  activeChatId,
  onCreateProject,
  onToggleProject,
  onRenameProject,
  onDeleteProject,
  onSelectChat,
  onCreateChat,
  onRenameChat,
  onDeleteChat,
  onMoveChatToProject,
}: ProjectManagerProps) {
  const [draggedChatId, setDraggedChatId] = useState<string | null>(null);
  const [dragOverProjectId, setDragOverProjectId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, chatId: string) => {
    setDraggedChatId(chatId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, projectId?: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverProjectId(projectId || null);
  };

  const handleDragLeave = () => {
    setDragOverProjectId(null);
  };

  const handleDrop = (e: React.DragEvent, projectId?: string) => {
    e.preventDefault();
    if (draggedChatId) {
      onMoveChatToProject(draggedChatId, projectId);
      setDraggedChatId(null);
      setDragOverProjectId(null);
    }
  };

  const uncategorizedChats = chats.filter(chat => !chat.projectId);

  return (
    <div className="space-y-2">
      {/* New Project Form - Now at the top */}
      <NewProjectForm onCreateProject={onCreateProject} />

      {/* New Chat Button - Now below New Project */}
      <Button
        onClick={() => onCreateChat()}
        className="w-full justify-start gap-2 mb-4"
        variant="ghost"
        size="sm"
      >
        <Plus size={16} />
        New Chat
      </Button>

      {/* Projects */}
      {projects.map((project) => {
        const projectChats = chats.filter(chat => chat.projectId === project.id);
        
        return (
          <ProjectItem
            key={project.id}
            project={project}
            projectChats={projectChats}
            activeChatId={activeChatId}
            dragOverProjectId={dragOverProjectId}
            onToggleProject={onToggleProject}
            onDeleteProject={onDeleteProject}
            onCreateChat={onCreateChat}
            onSelectChat={onSelectChat}
            onRenameChat={onRenameChat}
            onDeleteChat={onDeleteChat}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
          />
        );
      })}

      {/* Uncategorized Chats */}
      <UncategorizedChats
        chats={uncategorizedChats}
        activeChatId={activeChatId}
        draggedChatId={draggedChatId}
        dragOverProjectId={dragOverProjectId}
        onSelectChat={onSelectChat}
        onRenameChat={onRenameChat}
        onDeleteChat={onDeleteChat}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragStart={handleDragStart}
      />
    </div>
  );
}
