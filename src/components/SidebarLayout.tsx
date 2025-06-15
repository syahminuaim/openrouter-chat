import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import Settings from "@/components/Settings";
import ProjectManager from "@/components/ProjectManager";

interface Project {
  id: string;
  name: string;
  expanded: boolean;
}
interface Chat {
  id: string;
  name: string;
  projectId?: string;
  messages: any[];
  timestamp: Date;
  model?: string;
}

interface SidebarLayoutProps {
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
  apiKey: string | null;
  onApiKeyChange: (v: string) => void;
  model: string;
  onModelChange: (v: string) => void;
  theme: "light" | "dark";
  onThemeChange: (theme: "light" | "dark") => void;
}

export default function SidebarLayout({
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
  apiKey,
  onApiKeyChange,
  model,
  onModelChange,
  theme,
  onThemeChange,
}: SidebarLayoutProps) {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center justify-between h-12">
          <h2 className="font-semibold text-lg">XXX</h2>
          <Settings
            apiKey={apiKey}
            onApiKeyChange={onApiKeyChange}
            model={model}
            onModelChange={onModelChange}
            theme={theme}
            onThemeChange={onThemeChange}
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <ProjectManager
          projects={projects}
          chats={chats}
          activeChatId={activeChatId}
          onCreateProject={onCreateProject}
          onToggleProject={onToggleProject}
          onRenameProject={onRenameProject}
          onDeleteProject={onDeleteProject}
          onSelectChat={onSelectChat}
          onCreateChat={onCreateChat}
          onRenameChat={onRenameChat}
          onDeleteChat={onDeleteChat}
          onMoveChatToProject={onMoveChatToProject}
        />
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="text-xs text-muted-foreground">Powered by Dato Zubair</div>
      </SidebarFooter>
    </Sidebar>
  );
}
