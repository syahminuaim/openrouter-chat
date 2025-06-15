
import { MessageCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function Message({ role, content }: MessageProps) {
  const isUser = role === "user";
  return (
    <div className={cn(
      "flex items-end gap-3 max-w-2xl w-full",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0">
          <MessageCircle size={28} className="text-primary" />
        </div>
      )}
      <div
        className={cn(
          "rounded-xl px-4 py-2 shadow text-base transition-colors max-w-lg break-words",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        {content}
      </div>
      {isUser && (
        <div className="flex-shrink-0">
          <MessageSquare size={28} className="text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
