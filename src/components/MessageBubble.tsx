
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

  // iMessage-like colors and bubbles
  const userBg = "bg-[#007aff] text-white";
  const userBubble = "rounded-3xl rounded-br-[8px]";
  const assistantBg =
    "bg-[#f1f0f0] dark:bg-[#23272d] text-black dark:text-white border border-[#e4e4e7] dark:border-[#353941]";
  const assistantBubble = "rounded-3xl rounded-bl-[8px]";

  return (
    <div
      className={cn(
        "w-full flex flex-col gap-0 px-2", // make sure vertical stack is tight
        isUser ? "items-end" : "items-start"
      )}
      style={{ marginBottom: "0.15rem" }}
    >
      <div
        className={cn(
          "relative max-w-[48%] sm:max-w-[44%] px-2 py-1 text-[14px] leading-normal transition-colors shadow-sm whitespace-pre-wrap break-words group",
          isUser
            ? `${userBg} ${userBubble} self-end ml-3`
            : `${assistantBg} ${assistantBubble} self-start mr-3`,
          streaming && isUser && "opacity-75"
        )}
        style={{ minHeight: "1.5rem" }}
      >
        {/* Copy button in bubble corner */}
        <div
          className={cn(
            "absolute top-1",
            isUser ? "right-2" : "left-2"
          )}
          style={{ zIndex: 2 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className={cn(
              "h-6 w-6 p-0 opacity-0 group-hover:opacity-90 group-focus-within:opacity-90 transition-opacity"
            )}
            tabIndex={-1}
          >
            {copied ? <CopyCheck size={12} /> : <Copy size={12} />}
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
      {/* Timestamp OUTSIDE the bubble */}
      {timestamp && (
        <span
          className={cn(
            "text-[11px] mt-0.5 pb-0.5 select-none",
            isUser
              ? "text-right pr-2 text-zinc-400"
              : "text-left pl-2 text-zinc-500 dark:text-zinc-400"
          )}
          style={{ lineHeight: "1", minHeight: "14px" }}
        >
          {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      )}
    </div>
  );
}
