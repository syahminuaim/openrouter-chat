
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
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatMenu } from "./ChatMenu";

interface ChatPreview {
  id: string;
  name: string;
}

interface AppSidebarProps {
  uncategorizedChats: ChatPreview[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onCreateChat: () => void;
  onRenameChat: (chatId: string, newName: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export function AppSidebar({
  uncategorizedChats,
  activeChatId,
  onSelectChat,
  onCreateChat,
  onRenameChat,
  onDeleteChat,
}: AppSidebarProps) {
  return (
    <Sidebar>
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
              {uncategorizedChats.length > 0 && (
                <>
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
          <span>Data not persisted yet</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
