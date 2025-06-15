
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useInputHistory } from "@/hooks/useInputHistory";

interface ChatFormProps {
  input: string;
  setInput: (value: string) => void;
  loading: boolean;
  onSend: () => void;
  onApiKeyChange: () => void;
}

export default function ChatForm({ input, setInput, loading, onSend, onApiKeyChange }: ChatFormProps) {
  const history = useInputHistory(input, setInput);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      onSend();
    } else {
      history.handleKeyDown(e);
    }
  };

  const handleSend = () => {
    if (!input.trim() || loading) return;
    history.save(input);
    onSend();
  };

  return (
    <form
      className="flex items-center gap-3 px-6 py-4 border-t border-border bg-background sticky bottom-0 z-10"
      onSubmit={e => {
        e.preventDefault();
        if (!loading) handleSend();
      }}
    >
      <Input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleInputKeyDown}
        placeholder="Type your message and press Enter..."
        className="flex-1 rounded-lg"
        disabled={loading}
        autoFocus
      />
      <Button type="submit" disabled={loading || !input.trim()}>
        {loading ? <Loader2 className="animate-spin" size={18} /> : "Send"}
      </Button>
      <Button type="button" variant="secondary" onClick={onApiKeyChange}>
        Change API Key
      </Button>
    </form>
  );
}
