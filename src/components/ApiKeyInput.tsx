
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ApiKeyInputProps {
  onSet: (key: string) => void;
  currentKey?: string;
}

export default function ApiKeyInput({ onSet, currentKey }: ApiKeyInputProps) {
  const [value, setValue] = useState(currentKey ?? "");

  useEffect(() => {
    setValue(currentKey ?? "");
  }, [currentKey]);

  return (
    <form
      className="flex items-center gap-2 mb-4"
      onSubmit={e => {
        e.preventDefault();
        if (value.trim()) {
          localStorage.setItem("openrouter-api-key", value.trim());
          onSet(value.trim());
        }
      }}
    >
      <Input
        type="password"
        placeholder="Enter your OpenRouter API key"
        className="w-72"
        value={value}
        onChange={e => setValue(e.target.value)}
        autoComplete="off"
      />
      <Button type="submit">Save</Button>
    </form>
  );
}
