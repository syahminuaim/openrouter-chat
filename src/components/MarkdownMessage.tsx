
import React, { useRef, useEffect } from "react";
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism.css";
import { Copy } from "lucide-react";

type MarkdownMessageProps = {
  content: string;
  className?: string;
};

// Defensive Prism language resolver
function resolvePrismLanguage(rawLang: string | undefined | null) {
  if (!rawLang || typeof rawLang !== "string") return "javascript";
  const lang = rawLang.toLowerCase();
  if (
    Object.prototype.hasOwnProperty.call(Prism.languages, lang) &&
    typeof Prism.languages[lang] === "object"
  ) {
    return lang;
  }
  // handle aliases or common codes
  if (lang === "js") return "javascript";
  if (lang === "ts") return "typescript";
  if (lang === "py") return "python";
  if (lang === "tsx") return "tsx";
  if (lang === "jsx") return "jsx";
  return "javascript";
}

// Custom renderer for Prism highlighting
const renderer = new marked.Renderer();
renderer.code = function (code, language, ...rest) {
  // `marked` v15 renderer signature: (code: string, infoString?: string | undefined, escaped?: boolean | undefined, ...args: any[])
  // We want language for Prism
  const validLang = resolvePrismLanguage(language);
  const html = Prism.highlight(code, Prism.languages[validLang], validLang);
  return `<pre style="position: relative;"><code class="language-${validLang}">${html}</code></pre>`;
};

marked.setOptions({
  breaks: true,
  gfm: true,
});

export default function MarkdownMessage({ content, className }: MarkdownMessageProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Highlight code after render and add copy buttons
  useEffect(() => {
    if (!ref.current) return;
    Prism.highlightAllUnder(ref.current);
    ref.current.querySelectorAll<HTMLElement>("pre").forEach((pre) => {
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
      className={
        "prose prose-neutral max-w-none dark:prose-invert mt-1 " + (className ?? "")
      }
      // Use custom renderer
      dangerouslySetInnerHTML={{ __html: marked.parse(content, { renderer }) }}
      tabIndex={0}
    />
  );
}
