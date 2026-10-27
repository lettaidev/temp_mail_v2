"use client";

import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
}

export default function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm"
      className={`bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100 hover:text-indigo-700 hover:border-indigo-300 transition-colors ${className || ''}`}
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="size-4 mr-1" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="size-4 mr-1" />
          Copy
        </>
      )}
    </Button>
  );
}
