
import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import SidebarLayout from "@/components/SidebarLayout";
import ChatHeader from "@/components/ChatHeader";
import ChatMessages from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";
import { fetchOpenRouterChat, OpenRouterMessage } from "@/lib/openrouter";
import { useToast } from "@/hooks/use-toast";
import { useProjects } from "@/hooks/useProjects";
import { useChats } from "@/hooks/useChats";

export default function Index() {
  // Settings state
  const [apiKey, setApiKey] = useState<string | null>(() => localStorage.getItem("openrouter-api-key"));
  const [defaultModel, setDefaultModel] = useState<string>(() => localStorage.getItem("selected-model") || "openai/gpt-4o");
  const [theme, setTheme] = useState<"light" | "dark">(() => localStorage.getItem("theme") as "light" | "dark" || "light");

  // Chat input/UI state
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState<string | null>(null);
  const { toast } = useToast();

  // Project and Chat state management using hooks
  const {
    projects, setProjects, handleCreateProject, handleToggleProject, handleRenameProject, handleDeleteProject
  } = useProjects();

  const {
    chats, setChats, activeChatId, setActiveChatId,
    handleCreateChat, handleSelectChat, handleRenameChat, handleDeleteChat,
    handleMoveChatToProject, handleUpdateChatModel
  } = useChats(projects, defaultModel);

  // Theme management
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("openrouter-api-key", apiKey);
    }
  }, [apiKey]);
  useEffect(() => {
    localStorage.setItem("selected-model", defaultModel);
  }, [defaultModel]);

  // Sync project deletes with chats
  useEffect(() => {
    setChats(prev =>
      prev.map(chat =>
        chat.projectId && !projects.some(p => p.id === chat.projectId)
          ? { ...chat, projectId: undefined }
          : chat
      )
    );
    // eslint-disable-next-line
  }, [projects]);

  const activeChat = chats.find(c => c.id === activeChatId);
  const currentModel = activeChat?.model || defaultModel;

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
      // --- FIX: Ensure we fetch the up-to-date chat after scheduling setChats above
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

      // Add assistant message ONLY (do NOT re-add user message)
      const assistantMessage: OpenRouterMessage = {
        role: "assistant",
        content: response
      };
      setChats(prev => prev.map(chat => chat.id === targetChatId ? {
        ...chat,
        messages: [...chat.messages, assistantMessage], // Only append assistant
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
        messages: [...chat.messages, errorMessage], // Only append error message
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
        <SidebarLayout
          projects={projects}
          chats={chats}
          activeChatId={activeChatId}
          onCreateProject={handleCreateProject}
          onToggleProject={handleToggleProject}
          onRenameProject={handleRenameProject}
          onDeleteProject={projectId => {
            handleDeleteProject(projectId);
            setChats(prev =>
              prev.map(chat =>
                chat.projectId === projectId
                  ? { ...chat, projectId: undefined }
                  : chat
              )
            );
          }}
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
        <SidebarInset className="flex-1">
          <div className="flex flex-col h-screen">
            <ChatHeader
              chatName={activeChat?.name || "New Chat"}
              model={currentModel}
              onModelChange={activeChat ? (m:string) => handleUpdateChatModel(activeChat.id, m) : undefined}
              showModelSelect={!!activeChat}
            />
            {/* Add a margin-top to visually separate header and chat */}
            <div className="flex flex-col flex-1 mt-4 min-h-0">
              <ChatMessages
                messages={activeChat?.messages || []}
                streamingText={streamingText}
                loading={loading}
              />
              <ChatInput
                value={input}
                onChange={setInput}
                onSend={handleSendMessage}
                disabled={loading}
                loading={loading}
              />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
