
import { SidebarTrigger } from "@/components/ui/sidebar";
import ModelSelect from "@/components/ModelSelect";
import { Loader2 } from "lucide-react";

interface ChatHeaderProps {
  chatName: string;
  model: string;
  onModelChange?: (v: string) => void;
  showModelSelect?: boolean;
}

export default function ChatHeader({ chatName, model, onModelChange, showModelSelect }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="font-semibold">
          {chatName}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {showModelSelect && onModelChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Model:</span>
            <ModelSelect value={model} onChange={onModelChange} compact={true} />
          </div>
        )}
        <div className="text-sm text-muted-foreground">
          {model.split("/").pop()?.split("-")[0]?.toUpperCase() || "MODEL"}
        </div>
      </div>
    </header>
  );
}
