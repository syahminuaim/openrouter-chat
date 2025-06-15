
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import ApiKeyInput from "./ApiKeyInput";
import ModelSelect from "./ModelSelect";
import { fetchOpenRouterChat, OpenRouterMessage } from "@/lib/openrouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ChatProps {
  chatKey: string;
  initialMessages: OpenRouterMessage[];
  onSendMessage?: (msg: OpenRouterMessage) => void;
}

export default function Chat({ chatKey, initialMessages, onSendMessage }: ChatProps) {
  // Support reloading messages if chatKey changes (switching chats)
  const [apiKey, setApiKey] = useState<string | undefined>(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("openrouter-api-key") ?? undefined
      : undefined
  );

  // Model selection (per chat for now, can be global if preferred)
  const [model, setModel] = useState<string>("openchat/openchat-3.5-1210");

  // Reset messages if switching to another chat
  const [messages, setMessages] = useState<OpenRouterMessage[]>(initialMessages);
  useEffect(() => setMessages(initialMessages), [chatKey, initialMessages]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!apiKey || !input.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    const newMessages: OpenRouterMessage[] = [
      ...messages,
      { role: "user", content: input }
    ];
    setMessages(newMessages);
    setInput("");
    if (onSendMessage) onSendMessage({ role: "user", content: input });

    try {
      const aiContent = await fetchOpenRouterChat(apiKey, newMessages, model);
      setMessages([
        ...newMessages,
        { role: "assistant", content: aiContent }
      ]);
      if (onSendMessage) onSendMessage({ role: "assistant", content: aiContent });
    } catch (error: any) {
      setErrorMsg(error?.message ?? "Unknown error");
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, there was an error connecting to OpenRouter." }
      ]);
      if (onSendMessage) onSendMessage({ role: "assistant", content: "Sorry, there was an error connecting to OpenRouter." });
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!apiKey) {
    return (
      <div className="w-full max-w-xl mx-auto mt-10 bg-card rounded-xl p-8 shadow-lg flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4 text-muted-foreground">
          Let's Get Started
        </h2>
        <p className="text-muted-foreground text-sm mb-3">
          Please enter your OpenRouter API key below. You can always change this in the future, key is kept locally only.
        </p>
        <ApiKeyInput onSet={setApiKey} />
      </div>
    );
  }

  return (
    <div className="w-full bg-card/90 mx-auto rounded-2xl shadow-2xl flex flex-col min-h-[70vh] border border-border">
      {/* Model selection header */}
      <div className="px-6 pt-6">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
          <span className="text-sm font-medium text-muted-foreground">Model:</span>
          <ModelSelect value={model} onChange={setModel} />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 overflow-y-auto flex-1">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground text-base py-16">
            Start a conversation with the AI!
          </div>
        )}
        {messages.map((msg, idx) => (
          <Message key={idx} {...msg} />
        ))}
        {loading && (
          <div className="flex justify-start gap-3 items-end animate-pulse">
            <Loader2 className="animate-spin text-muted-foreground" size={22} />
            <div className="bg-muted text-muted-foreground rounded-xl px-4 py-2 shadow text-base">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>
      {errorMsg && (
        <div className="text-red-500 text-center text-sm px-6 pb-2">{errorMsg}</div>
      )}
      <form
        className="flex items-center gap-3 px-6 py-4 border-t border-border"
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
          className="flex-1"
          disabled={loading}
          autoFocus
        />
        <Button type="submit" disabled={loading || !input.trim()}>
          {loading ? <Loader2 className="animate-spin" size={18} /> : "Send"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => {
          setApiKey(undefined);
          localStorage.removeItem("openrouter-api-key");
        }}>
          Change API Key
        </Button>
      </form>
    </div>
  );
}
