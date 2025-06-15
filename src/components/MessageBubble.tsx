
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
  timestamp 
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "group flex px-4 py-6 hover:bg-muted/30 transition-colors",
        "gap-0" // No space for avatar
      )}
    >
      {/* Content */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {timestamp && (
              <span className="text-xs text-muted-foreground">
                {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 w-8 p-0"
            >
              {copied ? <CopyCheck size={14} /> : <Copy size={14} />}
            </Button>
          </div>
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
