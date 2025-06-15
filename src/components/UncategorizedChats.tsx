
import ChatItem from "./ChatItem";

interface Chat {
  id: string;
  name: string;
  projectId?: string;
}

interface UncategorizedChatsProps {
  chats: Chat[];
  activeChatId: string | null;
  draggedChatId: string | null;
  dragOverProjectId: string | null;
  onSelectChat: (chatId: string) => void;
  onRenameChat: (chatId: string, newName: string) => void;
  onDeleteChat: (chatId: string) => void;
  onDragOver: (e: React.DragEvent, projectId?: string) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, projectId?: string) => void;
  onDragStart: (e: React.DragEvent, chatId: string) => void;
}

export default function UncategorizedChats({
  chats,
  activeChatId,
  draggedChatId,
  dragOverProjectId,
  onSelectChat,
  onRenameChat,
  onDeleteChat,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragStart,
}: UncategorizedChatsProps) {
  if (chats.length === 0) {
    return null;
  }

  return (
    <div className="space-y-1">
      <div 
        className={`text-xs text-muted-foreground px-2 py-1 rounded-md transition-colors ${
          dragOverProjectId === null && draggedChatId ? 'bg-blue-100 dark:bg-blue-900' : ''
        }`}
        onDragOver={(e) => onDragOver(e)}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e)}
      >
        Recent
      </div>
      {chats.map((chat) => (
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
  );
}
