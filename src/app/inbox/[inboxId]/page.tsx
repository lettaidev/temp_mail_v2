import Link from "next/link";
import { getInboxById } from "@/database/db";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Trash2, Calendar, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InboxProps {
  params: Promise<{
    inboxId: string;
  }>;
}

export default async function InboxPage({ params }: InboxProps) {
  const { inboxId } = await params;

  const result = getInboxById(inboxId);
  if (!result.success || !result.data) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-center mb-4">
          <div className="size-12 rounded-full bg-amber-100 flex items-center justify-center">
            <AlertCircle className="size-6 text-amber-600" />
          </div>
        </div>
        <h1 className="text-xl font-medium text-slate-800 text-center mb-2">Email Not Found</h1>
        <p className="text-slate-600 text-center mb-6">This email doesn't exist or has been deleted.</p>
        <Link href="/" className="block w-full">
          <Button className="w-full flex items-center justify-center gap-2">
            <ArrowLeft className="size-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const { data } = result;
  
  const renderContent = () => {
    if (data?.htmlContent) {
      // Use base tag to make all links open in new tabs instead of JavaScript
      const htmlWithTargetBlank = `
        <base target="_blank">
        <style>
          body { margin: 0; font-family: system-ui, sans-serif; }
          a { color: #4f46e5; text-decoration: underline; }
        </style>
        ${data.htmlContent}
      `;
      
      return (
        <div className="prose prose-slate max-w-none">
          <iframe 
            srcDoc={htmlWithTargetBlank}
            className="w-full min-h-[400px] border-0"
            title="Email content"
            referrerPolicy="no-referrer"
            sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      );
    }

    if (data?.textContent) {
      return (
        <pre className="whitespace-pre-wrap text-slate-700 font-sans p-4 rounded-lg bg-slate-50 border border-slate-100">
          {data.textContent}
        </pre>
      );
    }

    return (
      <div className="p-12 text-center text-slate-500">
        This email has no content
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link 
          href={`/${data.toAddress}`} 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600"
        >
          <ArrowLeft className="size-4" />
          Back to Inbox
        </Link>
        
        <Link href={`/delete/${inboxId}`}>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100 hover:border-rose-300 transition-colors"
          >
            <Trash2 className="size-4 mr-1" />
            Delete Email
          </Button>
        </Link>
      </div>
      
      {/* Email container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Email header */}
        <div className="border-b border-slate-100 p-6">
          <h1 className="text-xl font-medium text-slate-800 mb-4">
            {data.subject || "(No Subject)"}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">From:</span>{" "}
              <span className="text-slate-800 font-medium">{data.fromAddress || "Unknown Sender"}</span>
            </div>
            
            <div>
              <span className="text-slate-500">To:</span>{" "}
              <span className="text-slate-800 font-medium">{data.toAddress || "Unknown Recipient"}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar className="size-4 text-slate-400" />
              <span className="text-slate-500">Received:</span>{" "}
              <span className="text-slate-700">
                {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="size-4 text-slate-400" />
              <span className="text-slate-500">Expires:</span>{" "}
              <span className="text-slate-700">
                {formatDistanceToNow(new Date(data.expiresAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
        
        {/* Email body */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
