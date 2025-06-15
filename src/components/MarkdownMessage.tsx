
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css";

import React, { useRef, useEffect } from "react";
import { marked } from "marked";
import { Copy, CopyCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type MarkdownMessageProps = {
  content: string;
  className?: string;
};

function resolvePrismLanguage(rawLang: string | undefined | null) {
  if (!rawLang || typeof rawLang !== "string") return "javascript";
  const lang = rawLang.toLowerCase();
  if (
    Object.prototype.hasOwnProperty.call(Prism.languages, lang) &&
    typeof Prism.languages[lang] === "object"
  ) {
    return lang;
  }
  if (lang === "js") return "javascript";
  if (lang === "ts") return "typescript";
  if (lang === "py") return "python";
  if (lang === "tsx") return "tsx";
  if (lang === "jsx") return "jsx";
  return "javascript";
}

const renderer = new marked.Renderer();

renderer.code = function ({ text, lang }) {
  const validLang = resolvePrismLanguage(lang);
  const html = Prism.highlight(text, Prism.languages[validLang], validLang);
  return `
    <div class="code-block-wrapper relative rounded-lg border bg-zinc-950 dark:bg-zinc-900">
      <div class="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
        <span class="text-xs text-zinc-400 font-medium">${lang || 'code'}</span>
        <button class="copy-code-btn text-zinc-400 hover:text-white transition-colors" data-code="${encodeURIComponent(text)}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        </button>
      </div>
      <pre class="!bg-transparent !border-0 !m-0 overflow-x-auto"><code class="language-${validLang} !bg-transparent text-sm">${html}</code></pre>
    </div>
  `;
};

marked.setOptions({
  breaks: true,
  gfm: true,
});

export default function MarkdownMessage({ content, className }: MarkdownMessageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    Prism.highlightAllUnder(ref.current);
    
    // Add copy functionality to code blocks
    ref.current.querySelectorAll<HTMLButtonElement>(".copy-code-btn").forEach((button) => {
      const handleCopy = async () => {
        const code = decodeURIComponent(button.dataset.code || "");
        await navigator.clipboard.writeText(code);
        
        // Visual feedback
        button.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20,6 9,17 4,12"/>
          </svg>
        `;
        
        setTimeout(() => {
          button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            </svg>
          `;
        }, 2000);
      };
      
      button.removeEventListener("click", handleCopy);
      button.addEventListener("click", handleCopy);
    });
  }, [content]);

  return (
    <div
      ref={ref}
      className={
        "prose prose-neutral max-w-none dark:prose-invert prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed prose-pre:!p-0 prose-pre:!bg-transparent " + (className ?? "")
      }
      dangerouslySetInnerHTML={{ __html: marked.parse(content, { renderer }) }}
      tabIndex={0}
    />
  );
}
