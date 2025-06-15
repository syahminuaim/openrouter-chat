
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

  // iMessage-like colors
  const userBg =
    "bg-[#007aff] text-white"; // iOS blue
  const userBubble =
    "rounded-3xl rounded-br-[8px]"; // right tail
  const assistantBg =
    "bg-[#f1f0f0] dark:bg-[#23272d] text-black dark:text-white border border-[#e4e4e7] dark:border-[#353941]";
  const assistantBubble =
    "rounded-3xl rounded-bl-[8px]"; // left tail

  return (
    <div
      className={cn(
        "w-full flex mb-2 px-2 group",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          // Bubble styles, iMessage-like tweaks below:
          "max-w-[48%] sm:max-w-[44%] px-3 py-1.5 text-[15px] relative transition-colors shadow-sm whitespace-pre-wrap break-words",
          isUser
            ? `${userBg} ${userBubble} self-end ml-4`
            : `${assistantBg} ${assistantBubble} self-start mr-4`,
          streaming && isUser && "opacity-75"
        )}
      >
        <div className="flex items-center justify-between gap-2 mb-1">
          {timestamp && (
            <span className={cn("text-xs", isUser ? "text-white/80" : "text-zinc-500 dark:text-zinc-400")}>
              {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className={cn(
              "h-8 w-8 p-0 opacity-0 group-hover:opacity-90 group-focus-within:opacity-90 transition-opacity",
              isUser ? "ml-1" : "mr-1"
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

