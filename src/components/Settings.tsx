
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, X, Moon, Sun } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ModelSelect from "./ModelSelect";

interface SettingsProps {
  apiKey: string | null;
  onApiKeyChange: (key: string) => void;
  model: string;
  onModelChange: (model: string) => void;
  theme: "light" | "dark";
  onThemeChange: (theme: "light" | "dark") => void;
}

export default function Settings({ 
  apiKey, 
  onApiKeyChange, 
  model, 
  onModelChange,
  theme,
  onThemeChange 
}: SettingsProps) {
  const [tempApiKey, setTempApiKey] = useState(apiKey || "");
  const [open, setOpen] = useState(false);

  const handleSaveApiKey = () => {
    onApiKeyChange(tempApiKey);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <SettingsIcon size={16} />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">OpenRouter API Key</label>
            <Input
              type="password"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder="Enter your API key"
            />
            <Button onClick={handleSaveApiKey} size="sm">
              Save API Key
            </Button>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Default Model (for new chats) - Current: {model.split("/").pop()?.split("-")[0]?.toUpperCase() || "MODEL"}
            </label>
            <ModelSelect value={model} onChange={onModelChange} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Theme</label>
            <div className="flex gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => onThemeChange("light")}
                className="flex items-center gap-2"
              >
                <Sun size={16} />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => onThemeChange("dark")}
                className="flex items-center gap-2"
              >
                <Moon size={16} />
                Dark
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
