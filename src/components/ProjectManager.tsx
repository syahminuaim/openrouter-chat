import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Folder, FolderOpen, ChevronRight, ChevronDown, Trash2 } from "lucide-react";
import { ChatMenu } from "./ChatMenu";

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
  const [newProjectName, setNewProjectName] = useState("");
  const [showNewProject, setShowNewProject] = useState(false);
  const [draggedChatId, setDraggedChatId] = useState<string | null>(null);
  const [dragOverProjectId, setDragOverProjectId] = useState<string | null>(null);

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      onCreateProject(newProjectName.trim());
      setNewProjectName("");
      setShowNewProject(false);
    }
  };

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
      {/* New Chat Button */}
      <Button
        onClick={() => onCreateChat()}
        className="w-full justify-start gap-2 mb-4"
        variant="outline"
      >
        <Plus size={16} />
        New Chat
      </Button>

      {/* New Project Button */}
      {showNewProject ? (
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
      ) : (
        <Button
          onClick={() => setShowNewProject(true)}
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 mb-4"
        >
          <Plus size={16} />
          New Project
        </Button>
      )}

      {/* Projects */}
      {projects.map((project) => {
        const projectChats = chats.filter(chat => chat.projectId === project.id);
        
        return (
          <div key={project.id} className="space-y-1">
            <div 
              className={`flex items-center justify-between group rounded-md transition-colors ${
                dragOverProjectId === project.id ? 'bg-blue-100 dark:bg-blue-900' : ''
              }`}
              onDragOver={(e) => handleDragOver(e, project.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, project.id)}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleProject(project.id)}
                className="flex-1 justify-start gap-2 px-2"
              >
                {project.expanded ? <FolderOpen size={16} /> : <Folder size={16} />}
                <span className="truncate">{project.name}</span>
              </Button>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onCreateChat(project.id)}
                  className="h-8 w-8 p-0"
                >
                  <Plus size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteProject(project.id)}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
            
            {project.expanded && (
              <div className="ml-4 space-y-1">
                {projectChats.map((chat) => (
                  <ChatMenu
                    key={chat.id}
                    chatName={chat.name}
                    onRename={(newName) => onRenameChat(chat.id, newName)}
                    onDelete={() => onDeleteChat(chat.id)}
                  >
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, chat.id)}
                      className="cursor-move"
                    >
                      <Button
                        variant={activeChatId === chat.id ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => onSelectChat(chat.id)}
                        className="w-full justify-start px-2 py-1 h-8 text-sm"
                      >
                        <span className="truncate">{chat.name}</span>
                      </Button>
                    </div>
                  </ChatMenu>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Uncategorized Chats */}
      {uncategorizedChats.length > 0 && (
        <div className="space-y-1">
          <div 
            className={`text-xs text-muted-foreground px-2 py-1 rounded-md transition-colors ${
              dragOverProjectId === null && draggedChatId ? 'bg-blue-100 dark:bg-blue-900' : ''
            }`}
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e)}
          >
            Recent
          </div>
          {uncategorizedChats.map((chat) => (
            <ChatMenu
              key={chat.id}
              chatName={chat.name}
              onRename={(newName) => onRenameChat(chat.id, newName)}
              onDelete={() => onDeleteChat(chat.id)}
            >
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, chat.id)}
                className="cursor-move"
              >
                <Button
                  variant={activeChatId === chat.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => onSelectChat(chat.id)}
                  className="w-full justify-start px-2 py-1 h-8 text-sm"
                >
                  <span className="truncate">{chat.name}</span>
                </Button>
              </div>
            </ChatMenu>
          ))}
        </div>
      )}
    </div>
  );
}
