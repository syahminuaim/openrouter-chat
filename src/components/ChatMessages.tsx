import MessageBubble from "@/components/MessageBubble";
import { OpenRouterMessage } from "@/lib/openrouter";
interface ChatMessagesProps {
  messages: OpenRouterMessage[];
  streamingText: string | null;
  loading: boolean;
}
export default function ChatMessages({
  messages,
  streamingText,
  loading
}: ChatMessagesProps) {
  return <div className="flex-1 overflow-y-auto">
      {!messages || messages.length === 0 ? <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-2xl font-bold">How can I help you today?</h2>
            <p className="text-muted-foreground">Start a conversation with an AI assistant</p>
          </div>
        </div> : <div className="space-y-0">
          {messages.map((message, index) => <MessageBubble key={index} role={message.role} content={message.content} timestamp={new Date()} />)}
          {streamingText && <MessageBubble role="assistant" content={streamingText} streaming={true} />}
        </div>}
    </div>;
}