
import { Loader2 } from "lucide-react";
import Message from "./Message";

interface StreamingMessageProps {
  streamingText: string | null;
  loading: boolean;
}

export default function StreamingMessage({ streamingText, loading }: StreamingMessageProps) {
  if (typeof streamingText === "string") {
    return (
      <Message
        role="assistant"
        content={streamingText}
        streaming={true}
      />
    );
  }

  if (loading && !streamingText) {
    return (
      <div className="flex justify-start gap-3 items-end animate-pulse">
        <Loader2 className="animate-spin text-muted-foreground" size={22} />
        <div className="bg-muted text-muted-foreground rounded-xl px-4 py-2 shadow text-base">
          Thinking...
        </div>
      </div>
    );
  }

  return null;
}
