
import { useRef, useEffect } from "react";
import Message from "./Message";
import StreamingMessage from "./StreamingMessage";
import { OpenRouterMessage } from "@/lib/openrouter";

interface ChatHistoryProps {
  messages: OpenRouterMessage[];
  streamingText: string | null;
  loading: boolean;
}

export default function ChatHistory({ messages, streamingText, loading }: ChatHistoryProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // handle auto-scroll on messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col gap-4 p-6 overflow-y-auto flex-1 transition-colors bg-muted/20 dark:bg-background">
      {messages.length === 0 && (
        <div className="text-center text-muted-foreground text-base py-16">
          Start a conversation with the AI!
        </div>
      )}
      {messages.map((msg, idx) => (
        <Message key={idx} {...msg} />
      ))}
      <StreamingMessage streamingText={streamingText} loading={loading} />
      <div ref={messagesEndRef}></div>
    </div>
  );
}
