
import { SidebarInset } from "@/components/ui/sidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatMessages from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";
import { OpenRouterMessage } from "@/lib/openrouter";

interface Chat {
  id: string;
  name: string;
  projectId?: string;
  messages: OpenRouterMessage[];
  timestamp: Date;
  model?: string;
}

interface ChatContainerProps {
  activeChat: Chat | undefined;
  currentModel: string;
  onUpdateChatModel?: (model: string) => void;
  input: string;
  onInputChange: (input: string) => void;
  onSendMessage: () => void;
  loading: boolean;
  streamingText: string | null;
}

export default function ChatContainer({
  activeChat,
  currentModel,
  onUpdateChatModel,
  input,
  onInputChange,
  onSendMessage,
  loading,
  streamingText,
}: ChatContainerProps) {
  return (
    <SidebarInset className="flex-1">
      <div className="flex flex-col h-screen">
        <ChatHeader
          chatName={activeChat?.name || "New Chat"}
          model={currentModel}
          onModelChange={onUpdateChatModel}
          showModelSelect={!!activeChat}
        />
        <div className="flex flex-col flex-1 mt-4 min-h-0">
          <ChatMessages
            messages={activeChat?.messages || []}
            streamingText={streamingText}
            loading={loading}
          />
          <ChatInput
            value={input}
            onChange={onInputChange}
            onSend={onSendMessage}
            disabled={loading}
            loading={loading}
          />
        </div>
      </div>
    </SidebarInset>
  );
}
