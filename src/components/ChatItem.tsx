
import { Button } from "@/components/ui/button";
import { ChatMenu } from "./ChatMenu";

interface Chat {
  id: string;
  name: string;
  projectId?: string;
}

interface ChatItemProps {
  chat: Chat;
  isActive: boolean;
  onSelect: (chatId: string) => void;
  onRename: (chatId: string, newName: string) => void;
  onDelete: (chatId: string) => void;
  onDragStart: (e: React.DragEvent, chatId: string) => void;
}

export default function ChatItem({
  chat,
  isActive,
  onSelect,
  onRename,
  onDelete,
  onDragStart,
}: ChatItemProps) {
  return (
    <ChatMenu
      chatName={chat.name}
      onRename={(newName) => onRename(chat.id, newName)}
      onDelete={() => onDelete(chat.id)}
    >
      <div
        draggable
        onDragStart={(e) => onDragStart(e, chat.id)}
        className="cursor-move"
      >
        <Button
          variant={isActive ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onSelect(chat.id)}
          className="w-full justify-start px-2 py-1 h-8 text-sm"
        >
          <span className="truncate">{chat.name}</span>
        </Button>
      </div>
    </ChatMenu>
  );
}
