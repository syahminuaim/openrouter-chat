import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
  loading: boolean;
}
export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
  loading
}: ChatInputProps) {
  return <div className="border-t bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            {/* Custom input styling: remove intrusive borders on focus/click */}
            <Input value={value} onChange={e => onChange(e.target.value)} onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }} placeholder="Message Assistant..." className="pr-12 resize-none border border-zinc-300 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300 focus:outline-none" style={{
            boxShadow: "none" // Remove native focus border
          }} disabled={disabled} />
            <Button onClick={onSend} disabled={!value.trim() || loading} size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-2 text-center">Version 1.0</div>
      </div>
    </div>;
}