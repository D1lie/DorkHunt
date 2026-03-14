"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface DocsCodeBlockProps {
  code: string;
  language?: string;
}

export function DocsCodeBlock({ code, language = "text" }: DocsCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleCopy}
          className="p-2 rounded-md bg-black/60 border border-green-500/30 hover:border-green-500/60 transition-all duration-200 backdrop-blur-sm"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
          )}
        </button>
      </div>
      <pre className="bg-black/60 border border-green-500/20 rounded-lg p-4 overflow-x-auto shadow-lg shadow-green-500/5">
        <code className="text-sm font-mono text-green-400">{code}</code>
      </pre>
    </div>
  );
}
