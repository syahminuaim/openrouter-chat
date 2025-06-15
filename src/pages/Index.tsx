import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import SidebarLayout from "@/components/SidebarLayout";
import ChatHeader from "@/components/ChatHeader";
import ChatMessages from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";
import { fetchOpenRouterChat, OpenRouterMessage } from "@/lib/openrouter";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  name: string;
  expanded: boolean;
}
interface Chat {
  id: string;
  name: string;
  projectId?: string;
  messages: OpenRouterMessage[];
  timestamp: Date;
  model?: string;
}
function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Load data from localStorage
function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

// Save data to localStorage
function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
}
export default function Index() {
  // Core state
  const [projects, setProjects] = useState<Project[]>(() => loadFromStorage("chatgpt-projects", []));
  const [chats, setChats] = useState<Chat[]>(() => loadFromStorage("chatgpt-chats", []));
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Settings state
  const [apiKey, setApiKey] = useState<string | null>(() => localStorage.getItem("openrouter-api-key"));
  const [defaultModel, setDefaultModel] = useState<string>(() => localStorage.getItem("selected-model") || "openai/gpt-4o");
  const [theme, setTheme] = useState<"light" | "dark">(() => localStorage.getItem("theme") as "light" | "dark" || "light");

  // Chat state
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState<string | null>(null);
  const {
    toast
  } = useToast();

  // Apply theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Save data to localStorage when state changes
  useEffect(() => {
    saveToStorage("chatgpt-projects", projects);
  }, [projects]);
  useEffect(() => {
    saveToStorage("chatgpt-chats", chats);
  }, [chats]);
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("openrouter-api-key", apiKey);
    }
  }, [apiKey]);
  useEffect(() => {
    localStorage.setItem("selected-model", defaultModel);
  }, [defaultModel]);
  const activeChat = chats.find(c => c.id === activeChatId);
  const currentModel = activeChat?.model || defaultModel;

  // Project management
  const handleCreateProject = (name: string) => {
    const newProject: Project = {
      id: generateId(),
      name,
      expanded: true
    };
    setProjects(prev => [...prev, newProject]);
  };

  // ... keep existing code (handleToggleProject, handleRenameProject, handleDeleteProject functions) the same ...

  const handleToggleProject = (projectId: string) => {
    setProjects(prev => prev.map(p => p.id === projectId ? {
      ...p,
      expanded: !p.expanded
    } : p));
  };
  const handleRenameProject = (projectId: string, newName: string) => {
    setProjects(prev => prev.map(p => p.id === projectId ? {
      ...p,
      name: newName
    } : p));
  };
  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    // Also remove project reference from chats
    setChats(prev => prev.map(chat => chat.projectId === projectId ? {
      ...chat,
      projectId: undefined
    } : chat));
  };

  // Chat management
  const handleCreateChat = (projectId?: string) => {
    const newChat: Chat = {
      id: generateId(),
      name: "New Chat",
      projectId,
      messages: [],
      timestamp: new Date(),
      model: defaultModel // Use default model for new chats
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  // ... keep existing code (handleSelectChat, handleRenameChat, handleDeleteChat, handleMoveChatToProject functions) the same ...

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
  };
  const handleRenameChat = (chatId: string, newName: string) => {
    setChats(prev => prev.map(chat => chat.id === chatId ? {
      ...chat,
      name: newName
    } : chat));
  };
  const handleDeleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (activeChatId === chatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      setActiveChatId(remainingChats.length > 0 ? remainingChats[0].id : null);
    }
  };

  // New function to move chat to project
  const handleMoveChatToProject = (chatId: string, projectId?: string) => {
    setChats(prev => prev.map(chat => chat.id === chatId ? {
      ...chat,
      projectId
    } : chat));
  };

  // New function to update chat model
  const handleUpdateChatModel = (model: string) => {
    if (activeChatId) {
      setChats(prev => prev.map(chat => chat.id === activeChatId ? {
        ...chat,
        model
      } : chat));
    }
  };

  // Message handling
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
      const newChat: Chat = {
        id: generateId(),
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
      const messages = updatedChat ? [...updatedChat.messages, userMessage] : [userMessage];
      const modelToUse = updatedChat?.model || defaultModel;
      const response = await fetchOpenRouterChat(apiKey, messages, modelToUse);

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
        messages: [...chat.messages, userMessage, assistantMessage],
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
        messages: [...chat.messages, userMessage, errorMessage],
        timestamp: new Date()
      } : chat));
    } finally {
      setLoading(false);
      setStreamingText(null);
    }
  };
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar */}
        <SidebarLayout
          projects={projects}
          chats={chats}
          activeChatId={activeChatId}
          onCreateProject={handleCreateProject}
          onToggleProject={handleToggleProject}
          onRenameProject={handleRenameProject}
          onDeleteProject={handleDeleteProject}
          onSelectChat={handleSelectChat}
          onCreateChat={handleCreateChat}
          onRenameChat={handleRenameChat}
          onDeleteChat={handleDeleteChat}
          onMoveChatToProject={handleMoveChatToProject}
          apiKey={apiKey}
          onApiKeyChange={setApiKey}
          model={defaultModel}
          onModelChange={setDefaultModel}
          theme={theme}
          onThemeChange={setTheme}
        />

        {/* Main Content */}
        <SidebarInset className="flex-1">
          <div className="flex flex-col h-screen">
            {/* Header */}
            <ChatHeader
              chatName={activeChat?.name || "New Chat"}
              model={currentModel}
              onModelChange={activeChat ? handleUpdateChatModel : undefined}
              showModelSelect={!!activeChat}
            />

            {/* Messages */}
            <ChatMessages
              messages={activeChat?.messages || []}
              streamingText={streamingText}
              loading={loading}
            />

            {/* Input */}
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={handleSendMessage}
              disabled={loading}
              loading={loading}
            />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
