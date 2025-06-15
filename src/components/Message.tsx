
import { MessageCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import MarkdownMessage from "./MarkdownMessage";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

export default function Message({ role, content, streaming }: MessageProps) {
  const isUser = role === "user";
  return (
    <div
      className={cn(
        "flex items-end gap-3 max-w-2xl w-full animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          <MessageCircle size={28} className="text-primary" />
        </div>
      )}
      <div
        className={cn(
          "rounded-xl px-4 py-2 shadow text-base transition-colors max-w-lg break-words bg-white dark:bg-muted relative",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
        style={{
          background: isUser
            ? undefined
            : "var(--tw-prose-bg, theme(colors.muted.DEFAULT)), var(--tw-prose-bg, white)",
        }}
      >
        {/* render markdown in assistant message, plain for user */}
        {isUser ? (
          <span>{content}</span>
        ) : (
          <MarkdownMessage content={content} />
        )}
        {streaming && !isUser && (
          <span className="ml-1 animate-pulse opacity-80">▍</span>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0">
          <MessageSquare size={28} className="text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
