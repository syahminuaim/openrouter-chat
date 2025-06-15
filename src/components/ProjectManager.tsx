
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Folder, FolderOpen, ChevronRight, ChevronDown } from "lucide-react";
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
}: ProjectManagerProps) {
  const [newProjectName, setNewProjectName] = useState("");
  const [showNewProject, setShowNewProject] = useState(false);

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      onCreateProject(newProjectName.trim());
      setNewProjectName("");
      setShowNewProject(false);
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

      {/* Projects */}
      {projects.map((project) => {
        const projectChats = chats.filter(chat => chat.projectId === project.id);
        
        return (
          <div key={project.id} className="space-y-1">
            <div className="flex items-center justify-between group">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleProject(project.id)}
                className="flex-1 justify-start gap-1 px-2"
              >
                {project.expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
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
                    <Button
                      variant={activeChatId === chat.id ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => onSelectChat(chat.id)}
                      className="w-full justify-start px-2 py-1 h-8 text-sm"
                    >
                      <span className="truncate">{chat.name}</span>
                    </Button>
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
          <div className="text-xs text-muted-foreground px-2 py-1">Recent</div>
          {uncategorizedChats.map((chat) => (
            <ChatMenu
              key={chat.id}
              chatName={chat.name}
              onRename={(newName) => onRenameChat(chat.id, newName)}
              onDelete={() => onDeleteChat(chat.id)}
            >
              <Button
                variant={activeChatId === chat.id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onSelectChat(chat.id)}
                className="w-full justify-start px-2 py-1 h-8 text-sm"
              >
                <span className="truncate">{chat.name}</span>
              </Button>
            </ChatMenu>
          ))}
        </div>
      )}

      {/* New Project Button */}
      {showNewProject ? (
        <div className="flex gap-2 px-2">
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
          className="w-full justify-start gap-2"
        >
          <Plus size={16} />
          New Project
        </Button>
      )}
    </div>
  );
}
