
import { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarLayout from "@/components/SidebarLayout";
import ChatContainer from "@/components/ChatContainer";
import SettingsManager from "@/components/SettingsManager";
import MessageHandler from "@/components/MessageHandler";
import { useProjects } from "@/hooks/useProjects";
import { useChats } from "@/hooks/useChats";

export default function Index() {
  const {
    projects, 
    setProjects, 
    handleCreateProject, 
    handleToggleProject, 
    handleRenameProject, 
    handleDeleteProject
  } = useProjects();

  return (
    <SettingsManager>
      {({ apiKey, setApiKey, defaultModel, setDefaultModel, theme, setTheme }) => {
        const {
          chats, 
          setChats, 
          activeChatId, 
          setActiveChatId,
          handleCreateChat, 
          handleSelectChat, 
          handleRenameChat, 
          handleDeleteChat,
          handleMoveChatToProject, 
          handleUpdateChatModel
        } = useChats(projects, defaultModel);

        // Sync project deletes with chats
        useEffect(() => {
          setChats(prev =>
            prev.map(chat =>
              chat.projectId && !projects.some(p => p.id === chat.projectId)
                ? { ...chat, projectId: undefined }
                : chat
            )
          );
        }, [projects, setChats]);

        const activeChat = chats.find(c => c.id === activeChatId);
        const currentModel = activeChat?.model || defaultModel;

        return (
          <MessageHandler
            chats={chats}
            setChats={setChats}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
            defaultModel={defaultModel}
            apiKey={apiKey}
          >
            {({ input, setInput, loading, streamingText, handleSendMessage }) => (
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
                  <ChatContainer
                    activeChat={activeChat}
                    currentModel={currentModel}
                    onUpdateChatModel={activeChat ? (m: string) => handleUpdateChatModel(activeChat.id, m) : undefined}
                    input={input}
                    onInputChange={setInput}
                    onSendMessage={handleSendMessage}
                    loading={loading}
                    streamingText={streamingText}
                  />
                </div>
              </SidebarProvider>
            )}
          </MessageHandler>
        );
      }}
    </SettingsManager>
  );
}
