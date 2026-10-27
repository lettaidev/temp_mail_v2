"use client";

import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CopyTextButtonProps {
  text: string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export default function CopyTextButton({ 
  text, 
  className, 
  variant = "outline",
  size = "sm"
}: CopyTextButtonProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Button 
      variant={variant}
      size={size}
      className={`bg-violet-50 text-violet-600 border-violet-200 hover:bg-violet-100 hover:text-violet-700 hover:border-violet-300 transition-colors ${className || ''}`}
      onClick={handleCopy}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </Button>
  );
}
