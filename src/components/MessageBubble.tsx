
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import MarkdownMessage from "./MarkdownMessage";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
  timestamp?: Date;
}

export default function MessageBubble({
  role,
  content,
  streaming = false,
  timestamp,
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "w-full flex mb-2 px-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          // Bubble styles
          "max-w-[80%] rounded-2xl px-4 py-2 shadow transition-colors break-words relative",
          isUser
            ? "bg-primary text-primary-foreground self-end ml-12" // right side, margin left for avatar area we don't show
            : "bg-muted text-foreground self-start mr-12", // left side, margin right for avatar area we don't show
          streaming && isUser && "opacity-75"
        )}
      >
        <div className="flex items-center justify-between gap-2 mb-1">
          {timestamp && (
            <span className={cn("text-xs", isUser ? "text-primary-foreground/60" : "text-muted-foreground/60")}>
              {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className={cn(
              "h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity",
              isUser ? "ml-2" : "mr-2"
            )}
            tabIndex={-1}
          >
            {copied ? <CopyCheck size={14} /> : <Copy size={14} />}
          </Button>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {role === "user" ? (
            <div className="whitespace-pre-wrap break-words">{content}</div>
          ) : (
            <MarkdownMessage content={content} />
          )}
          {streaming && role === "assistant" && (
            <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1" />
          )}
        </div>
      </div>
    </div>
  );
}

