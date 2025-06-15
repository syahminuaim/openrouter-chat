
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Folder, FolderOpen, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatMenu } from "./ChatMenu";

interface ChatFolder {
  id: string;
  name: string;
  chats: ChatPreview[];
  open: boolean;
}

interface ChatPreview {
  id: string;
  name: string;
}

interface AppSidebarProps {
  chatFolders: ChatFolder[];
  uncategorizedChats: ChatPreview[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onCreateChat: () => void;
  onToggleFolder: (folderId: string) => void;
  onRenameChat: (chatId: string, newName: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export function AppSidebar({
  chatFolders,
  uncategorizedChats,
  activeChatId,
  onSelectChat,
  onCreateChat,
  onToggleFolder,
  onRenameChat,
  onDeleteChat,
}: AppSidebarProps) {
  return (
    <Sidebar>
      {/* Foldered chats */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={onCreateChat}
                  className="font-medium"
                  isActive={false}
                >
                  <Plus className="mr-1" />
                  <span>New Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {chatFolders.map(folder => (
                <div key={folder.id}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => onToggleFolder(folder.id)}
                      isActive={folder.chats.some(c => c.id === activeChatId)}
                      variant="outline"
                    >
                      {folder.open ? (
                        <FolderOpen className="mr-1" />
                      ) : (
                        <Folder className="mr-1" />
                      )}
                      <span>{folder.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {folder.open && folder.chats.length > 0 && (
                    folder.chats.map(chat => (
                      <SidebarMenuItem key={chat.id}>
                        <ChatMenu
                          chatName={chat.name}
                          onRename={newName => onRenameChat(chat.id, newName)}
                          onDelete={() => onDeleteChat(chat.id)}
                        >
                          <SidebarMenuButton
                            onClick={() => onSelectChat(chat.id)}
                            isActive={activeChatId === chat.id}
                            size="sm"
                            className={cn("pl-9", activeChatId === chat.id && "font-semibold")}
                            variant="default"
                          >
                            <span>{chat.name}</span>
                          </SidebarMenuButton>
                        </ChatMenu>
                      </SidebarMenuItem>
                    ))
                  )}
                </div>
              ))}
              {/* Uncategorized chats */}
              {uncategorizedChats.length > 0 && (
                <>
                  <div className="mx-2 my-1 text-xs text-muted-foreground opacity-80">
                    Uncategorized
                  </div>
                  {uncategorizedChats.map(chat => (
                    <SidebarMenuItem key={chat.id}>
                      <ChatMenu
                        chatName={chat.name}
                        onRename={newName => onRenameChat(chat.id, newName)}
                        onDelete={() => onDeleteChat(chat.id)}
                      >
                        <SidebarMenuButton
                          onClick={() => onSelectChat(chat.id)}
                          isActive={activeChatId === chat.id}
                          size="sm"
                          className={cn("pl-7", activeChatId === chat.id && "font-semibold")}
                          variant="default"
                        >
                          <span>{chat.name}</span>
                        </SidebarMenuButton>
                      </ChatMenu>
                    </SidebarMenuItem>
                  ))}
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="text-xs text-muted-foreground text-center w-full py-2 opacity-75">
          <span>
            <b>Folders:</b> Beta preview · Data not persisted yet
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

