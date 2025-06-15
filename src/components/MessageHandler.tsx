
import { useState } from "react";
import { fetchOpenRouterChat, OpenRouterMessage } from "@/lib/openrouter";
import { useToast } from "@/hooks/use-toast";

interface Chat {
  id: string;
  name: string;
  projectId?: string;
  messages: OpenRouterMessage[];
  timestamp: Date;
  model?: string;
}

interface MessageHandlerProps {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  defaultModel: string;
  apiKey: string | null;
  children: (handlers: {
    input: string;
    setInput: (input: string) => void;
    loading: boolean;
    streamingText: string | null;
    handleSendMessage: () => Promise<void>;
  }) => React.ReactNode;
}

export default function MessageHandler({
  chats,
  setChats,
  activeChatId,
  setActiveChatId,
  defaultModel,
  apiKey,
  children,
}: MessageHandlerProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!input.trim() || loading || !apiKey) {
      if (!apiKey) {
        toast({
          title: "API Key Required",
          description: "Please set your OpenRouter API key in settings.",
          variant: "destructive"
        });
      }
      return;
    }
    const messageContent = input.trim();
    setInput("");
    setLoading(true);

    // Create or update chat
    let targetChatId = activeChatId;
    if (!targetChatId) {
      const newChat = {
        id: Math.random().toString(36).slice(2) + Date.now().toString(36),
        name: messageContent.slice(0, 50) + (messageContent.length > 50 ? "..." : ""),
        messages: [],
        timestamp: new Date(),
        model: defaultModel
      };
      setChats(prev => [newChat, ...prev]);
      targetChatId = newChat.id;
      setActiveChatId(targetChatId);
    }

    // Add user message
    const userMessage: OpenRouterMessage = {
      role: "user",
      content: messageContent
    };
    setChats(prev => prev.map(chat => chat.id === targetChatId ? {
      ...chat,
      messages: [...chat.messages, userMessage],
      name: chat.messages.length === 0 ? messageContent.slice(0, 50) + (messageContent.length > 50 ? "..." : "") : chat.name,
      timestamp: new Date()
    } : chat));

    try {
      // Get updated messages for API call
      const updatedChat = chats.find(c => c.id === targetChatId);
      const previousMessages = updatedChat ? [...updatedChat.messages, userMessage] : [userMessage];
      const modelToUse = updatedChat?.model || defaultModel;
      const response = await fetchOpenRouterChat(apiKey, previousMessages, modelToUse);

      // Simulate streaming effect
      setStreamingText("");
      const words = response.split(" ");
      for (let i = 0; i < words.length; i++) {
        const partial = words.slice(0, i + 1).join(" ");
        setStreamingText(partial);
        await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 70));
      }
      setStreamingText(null);

      // Add assistant message
      const assistantMessage: OpenRouterMessage = {
        role: "assistant",
        content: response
      };
      setChats(prev => prev.map(chat => chat.id === targetChatId ? {
        ...chat,
        messages: [...chat.messages, assistantMessage],
        timestamp: new Date()
      } : chat));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI model.",
        variant: "destructive"
      });
      const errorMessage: OpenRouterMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request."
      };
      setChats(prev => prev.map(chat => chat.id === targetChatId ? {
        ...chat,
        messages: [...chat.messages, errorMessage],
        timestamp: new Date()
      } : chat));
    } finally {
      setLoading(false);
      setStreamingText(null);
    }
  };

  return (
    <>
      {children({
        input,
        setInput,
        loading,
        streamingText,
        handleSendMessage,
      })}
    </>
  );
}
