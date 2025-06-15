import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import ApiKeyInput from "./ApiKeyInput";
import ModelSelect from "./ModelSelect";
import { fetchOpenRouterChat, OpenRouterMessage } from "@/lib/openrouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function useInputHistory(input: string, setInput: (v: string) => void) {
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("chat-input-history") || "[]");
    } catch {
      return [];
    }
  });
  const [pos, setPos] = useState<number>(-1);

  useEffect(() => {
    setPos(-1); // Reset position if input changes (e.g., new chat)
  }, [input]);

  const save = (msg: string) => {
    const next = [msg, ...history.filter(e => e !== msg)].slice(0, 30);
    setHistory(next);
    localStorage.setItem("chat-input-history", JSON.stringify(next));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!["ArrowUp", "ArrowDown"].includes(e.key) || !history.length) return;
    e.preventDefault();
    let next = pos;
    if (e.key === "ArrowUp") {
      next = pos < history.length - 1 ? pos + 1 : history.length - 1;
      setInput(history[next]);
      setPos(next);
    } else if (e.key === "ArrowDown") {
      if (pos <= 0) {
        setInput("");
        setPos(-1);
      } else {
        setInput(history[pos - 1]);
        setPos(pos - 1);
      }
    }
  };

  return { handleKeyDown, save };
}

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

  // handle auto-scroll on messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Typing effect for streaming assistant message
  const [streamingText, setStreamingText] = useState<string | null>(null);

  // input history
  const history = useInputHistory(input, setInput);

  // Intercept send to apply streaming effect and save input history
  const handleSend = async () => {
    if (!apiKey || !input.trim() || loading) return;
    setLoading(true);
    setErrorMsg(null);
    history.save(input);

    const newMessages: OpenRouterMessage[] = [
      ...messages,
      { role: "user", content: input }
    ];
    setMessages(newMessages);
    setInput("");
    if (onSendMessage) onSendMessage({ role: "user", content: input });

    try {
      const aiContent = await fetchOpenRouterChat(apiKey, newMessages, model);
      // Streaming: type out the assistant message one character at a time
      setStreamingText("");
      const chars = aiContent.split("");
      for (let i = 0; i < chars.length; ++i) {
        await new Promise(res => setTimeout(res, 10 + Math.random() * 20));
        setStreamingText(chars.slice(0, i + 1).join(""));
      }
      setStreamingText(null);
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
      setStreamingText(null);
      setLoading(false);
    }
  };

  // input up/down arrows for input history
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      handleSend();
    } else {
      history.handleKeyDown(e);
    }
  };

  if (!apiKey) {
    return (
      <div className="w-full max-w-xl mx-auto mt-10 bg-card rounded-xl p-8 shadow-lg flex flex-col items-center animate-fade-in">
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
    <div className="w-full bg-card/90 mx-auto rounded-2xl shadow-2xl flex flex-col min-h-[70vh] border border-border animate-fade-in">
      {/* Model selection header */}
      <div className="px-6 pt-6">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
          <span className="text-sm font-medium text-muted-foreground">Model:</span>
          <ModelSelect value={model} onChange={setModel} />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 overflow-y-auto flex-1 transition-colors bg-muted/20 dark:bg-background">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground text-base py-16">
            Start a conversation with the AI!
          </div>
        )}
        {messages.map((msg, idx) => (
          <Message key={idx} {...msg} />
        ))}
        {/* Typing effect for assistant's latest response */}
        {typeof streamingText === "string" && (
          <Message
            role="assistant"
            content={streamingText}
            streaming={true}
          />
        )}
        {loading && !streamingText && (
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
