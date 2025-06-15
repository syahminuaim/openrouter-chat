
import { Button } from "@/components/ui/button";
import { Folder, FolderOpen, Plus, Trash2 } from "lucide-react";
import ChatItem from "./ChatItem";

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

interface ProjectItemProps {
  project: Project;
  projectChats: Chat[];
  activeChatId: string | null;
  dragOverProjectId: string | null;
  onToggleProject: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  onCreateChat: (projectId?: string) => void;
  onSelectChat: (chatId: string) => void;
  onRenameChat: (chatId: string, newName: string) => void;
  onDeleteChat: (chatId: string) => void;
  onDragOver: (e: React.DragEvent, projectId?: string) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, projectId?: string) => void;
  onDragStart: (e: React.DragEvent, chatId: string) => void;
}

export default function ProjectItem({
  project,
  projectChats,
  activeChatId,
  dragOverProjectId,
  onToggleProject,
  onDeleteProject,
  onCreateChat,
  onSelectChat,
  onRenameChat,
  onDeleteChat,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragStart,
}: ProjectItemProps) {
  return (
    <div className="space-y-1">
      <div 
        className={`flex items-center justify-between group rounded-md transition-colors ${
          dragOverProjectId === project.id ? 'bg-blue-100 dark:bg-blue-900' : ''
        }`}
        onDragOver={(e) => onDragOver(e, project.id)}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e, project.id)}
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
            <ChatItem
              key={chat.id}
              chat={chat}
              isActive={activeChatId === chat.id}
              onSelect={onSelectChat}
              onRename={onRenameChat}
              onDelete={onDeleteChat}
              onDragStart={onDragStart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
