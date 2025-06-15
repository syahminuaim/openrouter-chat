
import { useEffect, useState } from "react";
import ApiKeyInput from "./ApiKeyInput";
import ModelSelect from "./ModelSelect";
import ChatHistory from "./ChatHistory";
import ChatForm from "./ChatForm";
import { fetchOpenRouterChat, OpenRouterMessage } from "@/lib/openrouter";

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

  // Typing effect for streaming assistant message
  const [streamingText, setStreamingText] = useState<string | null>(null);

  // Intercept send to apply streaming effect and save input history
  const handleSend = async () => {
    if (!apiKey || !input.trim() || loading) return;
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

  const handleApiKeyChange = () => {
    setApiKey(undefined);
    localStorage.removeItem("openrouter-api-key");
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
      <ChatHistory messages={messages} streamingText={streamingText} loading={loading} />
      {errorMsg && (
        <div className="text-red-500 text-center text-sm px-6 pb-2">{errorMsg}</div>
      )}
      <ChatForm
        input={input}
        setInput={setInput}
        loading={loading}
        onSend={handleSend}
        onApiKeyChange={handleApiKeyChange}
      />
    </div>
  );
}
