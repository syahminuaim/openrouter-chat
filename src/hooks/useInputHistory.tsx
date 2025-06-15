
import { useEffect, useState } from "react";

export function useInputHistory(input: string, setInput: (v: string) => void) {
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("chat-input-history") || "[]");
    } catch {
      return [];
    }
  });
  const [pos, setPos] = useState<number>(-1);

  useEffect(() => {
    setPos(-1); // Reset position if input changes (e.g., new chat)
  }, [input]);

  const save = (msg: string) => {
    const next = [msg, ...history.filter(e => e !== msg)].slice(0, 30);
    setHistory(next);
    localStorage.setItem("chat-input-history", JSON.stringify(next));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!["ArrowUp", "ArrowDown"].includes(e.key) || !history.length) return;
    e.preventDefault();
    let next = pos;
    if (e.key === "ArrowUp") {
      next = pos < history.length - 1 ? pos + 1 : history.length - 1;
      setInput(history[next]);
      setPos(next);
    } else if (e.key === "ArrowDown") {
      if (pos <= 0) {
        setInput("");
        setPos(-1);
      } else {
        setInput(history[pos - 1]);
        setPos(pos - 1);
      }
    }
  };

  return { handleKeyDown, save };
}
