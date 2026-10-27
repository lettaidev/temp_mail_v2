"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RefreshButtonProps {
  className?: string;
}

export default function RefreshButton({ className }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    window.location.reload();
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm"
      className={`bg-sky-50 text-sky-600 border-sky-200 hover:bg-sky-100 hover:text-sky-700 hover:border-sky-300 transition-colors ${className || ''}`}
      onClick={handleRefresh}
      disabled={isRefreshing}
    >
      <RefreshCw className={`size-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
      {isRefreshing ? "Refreshing..." : "Refresh"}
    </Button>
  );
}
