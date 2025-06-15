
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

  // iMessage-like colors (shape for both is the same!)
  const userBg = "bg-[#007aff] text-white";
  const assistantBg =
    "bg-[#f1f0f0] dark:bg-[#23272d] text-black dark:text-white border border-[#e4e4e7] dark:border-[#353941]";

  // Bubble: Both use the same shape.
  const bubbleCommon = "rounded-3xl rounded-br-[8px] px-4 py-2 shadow-sm text-[14px] leading-normal transition-colors whitespace-pre-wrap break-words group";

  return (
    <div
      className={cn(
        "w-full flex flex-col gap-0 px-2",
        isUser ? "items-end" : "items-start"
      )}
      style={{ marginBottom: "0.125rem" }}
    >
      <div
        className={cn(
          bubbleCommon,
          isUser
            ? `${userBg} self-end ml-3`
            : `${assistantBg} self-start mr-3`,
          streaming && isUser && "opacity-75"
        )}
        style={{ minHeight: "1.9rem" }}
      >
        <div
          className={cn(
            "prose prose-sm max-w-none dark:prose-invert",
            !isUser && "prose-px-0"
          )}
        >
          {isUser ? (
            <div className="whitespace-pre-wrap break-words">{content}</div>
          ) : (
            <MarkdownMessage content={content} className="mb-0 pb-0" />
          )}
          {streaming && role === "assistant" && (
            <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1" />
          )}
        </div>
      </div>
      {/* Timestamp and Copy button OUTSIDE the bubble */}
      {(timestamp || true) && (
        <div
          className={cn(
            "flex items-center gap-0.5 mt-0.5 pb-0 select-none group",
            isUser ? "justify-end pr-2" : "justify-start pl-2"
          )}
          style={{ minHeight: "16px" }}
        >
          {timestamp && (
            <span
              className={cn(
                "text-[11px]",
                isUser
                  ? "text-right text-zinc-400"
                  : "text-left text-zinc-500 dark:text-zinc-400"
              )}
              style={{ lineHeight: "1" }}
            >
              {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className={cn(
              "h-6 w-6 ml-1 px-0 py-0 opacity-0 group-hover:opacity-90 group-focus-within:opacity-90 transition-opacity"
            )}
            tabIndex={-1}
            aria-label="Copy message"
          >
            {copied ? <CopyCheck size={12} /> : <Copy size={12} />}
          </Button>
        </div>
      )}
    </div>
  );
}
