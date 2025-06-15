
import { useState, useEffect } from "react";
import { Project } from "./useProjects";
import { OpenRouterMessage } from "@/lib/openrouter";

export interface Chat {
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

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
}

export function useChats(projects: Project[], defaultModel: string) {
  const [chats, setChats] = useState<Chat[]>(() => loadFromStorage("chatgpt-chats", []));
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  useEffect(() => {
    saveToStorage("chatgpt-chats", chats);
  }, [chats]);

  const handleCreateChat = (projectId?: string) => {
    const newChat: Chat = {
      id: generateId(),
      name: "New Chat",
      projectId,
      messages: [],
      timestamp: new Date(),
      model: defaultModel,
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

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
    setTimeout(() => {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      setActiveChatId(remainingChats.length > 0 ? remainingChats[0].id : null);
    }, 0);
  };
  // Move chat to a project or out
  const handleMoveChatToProject = (chatId: string, projectId?: string) => {
    setChats(prev => prev.map(chat => chat.id === chatId ? {
      ...chat,
      projectId
    } : chat));
  };

  const handleUpdateChatModel = (chatId: string, model: string) => {
    setChats(prev => prev.map(chat => chat.id === chatId ? {
      ...chat,
      model
    } : chat));
  };

  return {
    chats,
    setChats,
    activeChatId,
    setActiveChatId,
    handleCreateChat,
    handleSelectChat,
    handleRenameChat,
    handleDeleteChat,
    handleMoveChatToProject,
    handleUpdateChatModel,
  }
}
