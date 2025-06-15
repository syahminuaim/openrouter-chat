
import Chat from "@/components/Chat";

const Index = () => {
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
      <Chat />
      <footer className="mt-8 text-muted-foreground text-xs text-center opacity-70">
        <p>
          Not affiliated with OpenRouter, OpenAI, or ChatGPT. | Powered by <a href="https://openrouter.ai/" className="underline hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">OpenRouter</a>
        </p>
      </footer>
    </div>
  );
};

export default Index;
