
import { useState, useEffect } from "react";

interface SettingsManagerProps {
  children: (settings: {
    apiKey: string | null;
    setApiKey: (key: string | null) => void;
    defaultModel: string;
    setDefaultModel: (model: string) => void;
    theme: "light" | "dark";
    setTheme: (theme: "light" | "dark") => void;
  }) => React.ReactNode;
}

export default function SettingsManager({ children }: SettingsManagerProps) {
  const [apiKey, setApiKey] = useState<string | null>(() => 
    localStorage.getItem("openrouter-api-key")
  );
  const [defaultModel, setDefaultModel] = useState<string>(() => 
    localStorage.getItem("selected-model") || "openai/gpt-4o"
  );
  const [theme, setTheme] = useState<"light" | "dark">(() => 
    localStorage.getItem("theme") as "light" | "dark" || "light"
  );

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

  return (
    <>
      {children({
        apiKey,
        setApiKey,
        defaultModel,
        setDefaultModel,
        theme,
        setTheme,
      })}
    </>
  );
}
