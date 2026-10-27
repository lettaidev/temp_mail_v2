"use client";

import { useState, useEffect } from "react";
import { Inbox, Loader2 } from "lucide-react";
import Link from "next/link";

// Update interface to match database types
interface Email {
  id: string;
  subject: string | null; // Allow null for subject
  fromAddress: string | null; // Allow null for fromAddress
  createdAt: string | number; // Allow both string and number for createdAt
  toAddress?: string;
  expiresAt?: string | number;
}

interface AutoRefreshEmailsProps {
  initialEmails: Email[];
  emailAddress: string;
  refreshInterval?: number; // in milliseconds
}

export default function AutoRefreshEmails({ 
  initialEmails, 
  emailAddress, 
  refreshInterval = 30000 // Default to 30 seconds
}: AutoRefreshEmailsProps) {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
    setLastRefreshed(formatCurrentTime());
  }, []);

  // Function to fetch emails
  const fetchEmails = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      const response = await fetch(`/api/email/${encodeURIComponent(emailAddress)}`);
      if (response.ok) {
        const data = await response.json();
        setEmails(data);
      }
    } catch (error) {
      console.error("Failed to refresh emails:", error);
    } finally {
      setIsRefreshing(false);
      setLastRefreshed(formatCurrentTime());
    }
  };

  // Format current time as a string to avoid hydration issues
  const formatCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Helper function to convert any date format to a Date object
  const toDate = (dateValue: string | number): Date => {
    if (typeof dateValue === 'string') {
      return new Date(dateValue);
    }
    return new Date(dateValue);
  };

  // Set up auto-refresh
  useEffect(() => {
    if (!isMounted || !autoRefreshEnabled) return;
    
    // Initial fetch when component mounts
    fetchEmails();
    
    // Set up interval for auto-refresh
    const intervalId = setInterval(fetchEmails, refreshInterval);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [autoRefreshEnabled, refreshInterval, emailAddress, isMounted]);

  // Return nothing during server-side rendering to avoid hydration issues
  if (!isMounted) {
    return (
      <div className="border-b border-slate-100 p-4">
        <h2 className="font-medium text-slate-800">Messages</h2>
      </div>
    );
  }

  return (
    <>
      <div className="border-b border-slate-100 p-4 flex justify-between items-center">
        <h2 className="font-medium text-slate-800">Messages</h2>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="auto-refresh" 
              checked={autoRefreshEnabled} 
              onChange={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
              className="mr-1.5 h-3.5 w-3.5 rounded border-slate-300 text-indigo-600"
            />
            <label htmlFor="auto-refresh">Auto-refresh</label>
          </div>
          {isRefreshing ? (
            <span className="flex items-center gap-1">
              <Loader2 className="size-3 animate-spin text-indigo-500" />
              Refreshing...
            </span>
          ) : (
            <span>Last updated: {lastRefreshed}</span>
          )}
        </div>
      </div>
      
      {emails && emails.length > 0 ? (
        <ul className="divide-y divide-slate-100">
          {emails.map((email) => (
            <li key={email.id}>
              <Link 
                href={`/inbox/${email.id}`}
                className="block p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-grow min-w-0">
                    <p className="font-medium text-slate-800 truncate mb-1">
                      {email.subject || "(No Subject)"}
                    </p>
                    <p className="text-sm text-slate-500 truncate">
                      From: {email.fromAddress || "Unknown Sender"}
                    </p>
                  </div>
                  <div className="text-xs text-slate-400 shrink-0">
                    {toDate(email.createdAt).toLocaleDateString()} {toDate(email.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-12 flex flex-col items-center justify-center text-center p-4">
          <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Inbox className="size-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-800 mb-1">No messages yet</h3>
          <p className="text-slate-500 max-w-sm">
            Messages sent to this address will appear here automatically. 
            {autoRefreshEnabled ? " Auto-refresh is enabled." : " Auto-refresh is disabled."}
          </p>
        </div>
      )}
    </>
  );
}
