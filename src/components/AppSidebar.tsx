
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
import { cn } from "@/lib/utils";
import {
  Plus,
  Search,
  Book,
  UserCog,
  Users2,
  Gem,
  Bot,
  MessageCircle,
  LogOut,
} from "lucide-react";

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
    <Sidebar className="bg-[#11181C] text-white border-r border-sidebar-border shadow-none min-w-[270px] max-w-[320px]">
      <SidebarContent>
        {/* Top Logo + Min controls */}
        <div className="flex flex-col items-center justify-center py-5 gap-1">
          <div className="bg-white/5 rounded-lg p-2">
            {/* Ideally: OpenAI logo SVG here, use placeholder for now */}
            <span className="text-2xl font-black">◎</span>
          </div>
        </div>

        {/* Main Action buttons */}
        <div className="px-2 mb-2 flex flex-col gap-1">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={onCreateChat}
                className="w-full flex justify-between items-center bg-[#21262A] hover:bg-[#36393E] font-normal"
                isActive={false}
                variant="default"
              >
                <span className="flex items-center gap-2">
                  <Plus size={18} />
                  <span>New chat</span>
                </span>
                <span className="ml-2 text-xs bg-[#23262b] px-2 py-[2px] rounded-[4px] opacity-70 hidden md:inline-flex">
                  Ctrl+Shift+O
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="w-full font-normal"
                isActive={false}
              >
                <Search size={18} />
                <span>Search chats</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="w-full font-normal"
                isActive={false}
              >
                <Book size={18} />
                <span>Library</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        {/* Divider */}
        <div className="w-full border-b border-sidebar-border/70 mb-2" />

        {/* "Pinned", "GPTs", etc. Use icons/colors to match ChatGPT's flavor */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full font-normal" isActive={false}>
              <UserCog size={18} className="text-[#7b61ff]" />
              <span>Sora</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full font-normal" isActive={false}>
              <Users2 size={18} />
              <span>GPTs</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full font-normal" isActive={false}>
              <Gem size={18} className="text-[#fbbc05]" />
              <span>Scholar GPT</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full font-normal" isActive={false}>
              <Bot size={18} className="text-[#16a085]" />
              <span>AI PDF Drive: Chat, Create...</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Divider */}
        <div className="w-full border-b border-sidebar-border/70 my-2" />

        {/* Chats Section */}
        <div className="px-4 py-2">
          <div className="text-xs uppercase tracking-widest text-white/50 mb-2">
            Chats
          </div>
          <SidebarMenu>
            {/* Show all chats in a single, scrollable list (truncate if too long) */}
            {[...chatFolders.flatMap(f => f.chats), ...uncategorizedChats].map(chat => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton
                  onClick={() => onSelectChat(chat.id)}
                  isActive={activeChatId === chat.id}
                  className={cn(
                    "w-full font-normal truncate hover:bg-[#36393E]",
                    activeChatId === chat.id && "bg-[#23262b] font-semibold"
                  )}
                  size="sm"
                >
                  <MessageCircle size={16} className="opacity-60" />
                  <span className="truncate">{chat.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="w-full flex flex-col gap-2">
          <div className="border-t border-sidebar-border/80 pt-4 mb-2" />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="w-full font-medium justify-start gap-2 bg-[#21262A] hover:bg-[#36393E] rounded-md px-3 py-2"
                isActive={false}
              >
                <Gem size={18} className="text-yellow-400" />
                <span>Renew Plus</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="text-center text-xs text-muted-foreground/70 py-3">
            {/* Optional: logout, settings, etc */}
            {/* <SidebarMenuButton><LogOut size={14} />Log out</SidebarMenuButton> */}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
