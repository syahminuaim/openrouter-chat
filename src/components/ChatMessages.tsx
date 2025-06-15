
import MessageBubble from "@/components/MessageBubble";
import { Loader2 } from "lucide-react";
import { OpenRouterMessage } from "@/lib/openrouter";

interface ChatMessagesProps {
  messages: OpenRouterMessage[];
  streamingText: string | null;
  loading: boolean;
}

export default function ChatMessages({ messages, streamingText, loading }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {!messages || messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-2xl font-bold">How can I help you today?</h2>
            <p className="text-muted-foreground">
              Start a conversation with AI assistant
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-0">
          {messages.map((message, index) => (
            <MessageBubble key={index} role={message.role} content={message.content} timestamp={new Date()} />
          ))}
          {streamingText && (
            <MessageBubble role="assistant" content={streamingText} streaming={true} />
          )}
          {loading && !streamingText && (
            <div className="flex gap-4 px-4 py-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-muted-foreground mb-2">Assistant</div>
                <div className="text-muted-foreground">Thinking...</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
