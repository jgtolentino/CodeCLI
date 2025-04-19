import React, { useState } from "react";
import { CopyIcon, CheckIcon } from "lucide-react";
import { Button } from "./button";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "bash" }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block relative mt-2">
      <pre className="bg-[#1E293B] text-[#E5E7EB] rounded-md p-4 text-sm font-mono overflow-x-auto">
        <code>{code}</code>
      </pre>
      <Button
        size="sm"
        variant="secondary"
        className="absolute top-2 right-2 h-8 bg-gray-700 hover:bg-gray-600 text-white text-xs py-1 px-2 rounded"
        onClick={copyToClipboard}
      >
        {copied ? (
          <>
            <CheckIcon className="h-3.5 w-3.5 mr-1" /> Copied!
          </>
        ) : (
          <>
            <CopyIcon className="h-3.5 w-3.5 mr-1" /> Copy
          </>
        )}
      </Button>
    </div>
  );
};

export default CodeBlock;
