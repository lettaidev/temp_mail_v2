import { getInboxById, deleteInbox } from "@/database/db";
import Link from "next/link";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InboxProps {
  params: Promise<{
    inboxId: string;
  }>;
}

export default async function DeletePage({ params }: InboxProps) {
  const { inboxId } = await params;

  const getResult = getInboxById(inboxId);
  
  // Check if email exists
  if (!getResult.success || !getResult.data) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-center mb-4">
          <div className="size-12 rounded-full bg-amber-100 flex items-center justify-center">
            <XCircle className="size-6 text-amber-600" />
          </div>
        </div>
        <h1 className="text-xl font-medium text-slate-800 text-center mb-2">Email Not Found</h1>
        <p className="text-slate-600 text-center mb-6">This email doesn't exist or has already been deleted.</p>
        <Link href="/" className="block w-full">
          <Button className="w-full flex items-center justify-center gap-2">
            <ArrowLeft className="size-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  // Try to delete the email
  const deleteResult = deleteInbox(inboxId);
  if (!deleteResult.success) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-center mb-4">
          <div className="size-12 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="size-6 text-red-600" />
          </div>
        </div>
        <h1 className="text-xl font-medium text-slate-800 text-center mb-2">Deletion Failed</h1>
        <p className="text-slate-600 text-center mb-6">We couldn't delete this email. Please try again later.</p>
        <div className="flex gap-4">
          <Link href={`/inbox/${inboxId}`} className="flex-1">
            <Button variant="outline" className="w-full bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300">
              View Email
            </Button>
          </Link>
          <Link href={`/${getResult.data.toAddress}`} className="flex-1">
            <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">
              Back to Inbox
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Store the redirect URL to use in the script
  const redirectUrl = `/${encodeURIComponent(getResult.data.toAddress)}`;

  // Success case
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-center mb-4">
        <div className="size-12 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="size-6 text-green-600" />
        </div>
      </div>
      <h1 className="text-xl font-medium text-slate-800 text-center mb-2">Email Deleted</h1>
      <p className="text-slate-600 text-center mb-6">The email has been deleted successfully.</p>
      <Link href={redirectUrl} className="block w-full">
        <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">
          Back to Inbox
        </Button>
      </Link>
      
      {/* Auto redirect script with fixed syntax */}
      <div className="mt-4 text-sm text-center text-slate-500">
        Redirecting to inbox in 3 seconds...
        
        <script dangerouslySetInnerHTML={{
          __html: `
            setTimeout(function() {
              window.location.href = "${redirectUrl}";
            }, 3000);
          `
        }} />
      </div>
    </div>
  );
}
