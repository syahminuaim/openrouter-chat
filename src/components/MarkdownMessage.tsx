
import React, { useRef, useEffect } from "react";
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism.css";
import { Copy } from "lucide-react";

type MarkdownMessageProps = {
  content: string;
  className?: string;
};

marked.setOptions({
  highlight: (code, lang) => {
    if (lang && Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    }
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  },
  breaks: true,
  gfm: true,
});

export default function MarkdownMessage({ content, className }: MarkdownMessageProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Highlight code after render
  useEffect(() => {
    if (!ref.current) return;
    Prism.highlightAllUnder(ref.current);
    // Add copy buttons to all code blocks
    ref.current.querySelectorAll<HTMLElement>("pre").forEach(pre => {
      if (pre.querySelector(".copy-btn")) return; // Don't double-insert
      const button = document.createElement("button");
      button.textContent = "Copy";
      button.className =
        "copy-btn bg-muted hover:bg-accent rounded px-2 py-1 text-xs absolute top-2 right-2 z-10 transition-colors";
      button.onclick = () => {
        const code = pre.querySelector("code");
        if (code) {
          navigator.clipboard.writeText(code.textContent || "");
          button.textContent = "Copied!";
          setTimeout(() => (button.textContent = "Copy"), 1200);
        }
      };
      button.type = "button";
      pre.style.position = "relative";
      pre.appendChild(button);
    });
  }, [content]);

  return (
    <div
      ref={ref}
      className={"prose prose-neutral max-w-none dark:prose-invert mt-1 " + (className ?? "")}
      dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
      tabIndex={0}
    />
  );
}
