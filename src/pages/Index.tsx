
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import Chat from "@/components/Chat";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type Chat = {
  id: string;
  name: string;
  folderId?: string;
  messages: ChatMessage[];
  model?: string;
};

type Folder = {
  id: string;
  name: string;
  open: boolean;
};

function uuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Initial state helpers
const DEFAULT_CHATS: Chat[] = [
  {
    id: "chat-1",
    name: "Welcome",
    messages: [
      {
        role: "assistant",
        content: "Welcome! Start a new chat or pick an existing one from the sidebar."
      }
    ]
  }
];

const DEFAULT_FOLDERS: Folder[] = [
  { id: "folder-1", name: "Work", open: true },
  { id: "folder-2", name: "Personal", open: false }
];

export default function Index() {
  // Central app state for chats and folders
  const [chats, setChats] = useState<Chat[]>(DEFAULT_CHATS);
  const [folders, setFolders] = useState<Folder[]>(DEFAULT_FOLDERS);
  const [activeChatId, setActiveChatId] = useState<string>(DEFAULT_CHATS[0].id);

  // Group chats into folders and uncategorized for sidebar
  const chatFolders = folders.map(folder => ({
    ...folder,
    chats: chats.filter(c => c.folderId === folder.id).map(({ id, name }) => ({ id, name }))
  }));
  const uncategorizedChats = chats.filter(c => !c.folderId).map(({ id, name }) => ({ id, name }));

  // Callbacks for sidebar actions
  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
  };

  const handleCreateChat = () => {
    const newId = uuid();
    const newChat: Chat = {
      id: newId,
      name: "New Chat",
      messages: [],
    };
    setChats([newChat, ...chats]);
    setActiveChatId(newId);
  };

  const handleToggleFolder = (folderId: string) => {
    setFolders(folders =>
      folders.map(f =>
        f.id === folderId ? { ...f, open: !f.open } : f
      )
    );
  };

  const handleAppendMessage = (chatId: string, message: ChatMessage) => {
    setChats(chats =>
      chats.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  };

  // Get currently selected chat object to pass to Chat component
  const activeChat = chats.find(c => c.id === activeChatId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/80 flex flex-col items-center justify-start pb-12">
      <header className="w-full flex flex-col items-center mt-12 mb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-2">
          OpenRouter Chat
        </h1>
        <p className="text-lg text-muted-foreground font-medium max-w-xl text-center">
          Chat with your favorite Large Language Models using your OpenRouter API key.<br />
          <span className="text-sm">Your key is stored locally and never leaves your computer.</span>
        </p>
      </header>
      {/* App Layout: Sidebar + Chat area */}
      <div className="flex w-full max-w-6xl flex-1">
        <AppSidebar
          chatFolders={chatFolders}
          uncategorizedChats={uncategorizedChats}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
          onCreateChat={handleCreateChat}
          onToggleFolder={handleToggleFolder}
        />
        <SidebarInset>
          <div className="flex items-center justify-between p-2">
            <SidebarTrigger />
          </div>
          {activeChat ? (
            <Chat
              chatKey={activeChat.id}
              initialMessages={activeChat.messages}
              onSendMessage={msg => handleAppendMessage(activeChat.id, msg)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-2xl">
              Select a chat to begin
            </div>
          )}
        </SidebarInset>
      </div>
      <footer className="mt-8 text-muted-foreground text-xs text-center opacity-70">
        <p>
          Not affiliated with OpenRouter, OpenAI, or ChatGPT. | Powered by <a href="https://openrouter.ai/" className="underline hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">OpenRouter</a>
        </p>
      </footer>
    </div>
  );
}
