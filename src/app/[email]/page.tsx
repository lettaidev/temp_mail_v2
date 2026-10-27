import { getEmailsForAddress } from "@/database/db";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CopyEmailButton from "@/components/client/copy-email-button";
import RefreshButton from "@/components/client/refresh-button";
import EmailsContainer from "@/components/client/emails-container";

interface EmailProps {
  params: Promise<{
    email: string;
  }>;
}

export default async function Email({ params }: EmailProps) {
  const { email } = await params;
  const decodedEmail = decodeURIComponent(email);

  if (!decodedEmail.includes("@")) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-center mb-4">
          <div className="size-12 rounded-full bg-amber-100 flex items-center justify-center">
            <AlertCircle className="size-6 text-amber-600" />
          </div>
        </div>
        <h1 className="text-xl font-medium text-slate-800 text-center mb-2">Invalid Email Address</h1>
        <p className="text-slate-600 text-center mb-6">Please enter a valid email address with @ symbol.</p>
        <Link href="/" className="block w-full">
          <Button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors">
            <ArrowLeft className="size-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const result = getEmailsForAddress(decodedEmail);
  if (!result.success) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-center mb-4">
          <div className="size-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="size-6 text-red-600" />
          </div>
        </div>
        <h1 className="text-xl font-medium text-slate-800 text-center mb-2">Unable to Fetch Emails</h1>
        <p className="text-slate-600 text-center mb-6">There was a problem retrieving your emails. Please try again later.</p>
        <Link href="/" className="block w-full">
          <Button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors">
            <ArrowLeft className="size-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-indigo-600 mb-2">
            <ArrowLeft className="size-3" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Inbox</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <RefreshButton />
        </div>
      </div>
      
      {/* Email address box */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-grow">
          <div className="text-sm text-slate-500 mb-1">Your temporary email address:</div>
          <div className="font-medium text-slate-800">{decodedEmail}</div>
        </div>
        <CopyEmailButton email={decodedEmail} />
      </div>
      
      {/* Email list with auto-refresh */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <EmailsContainer
          initialEmails={result.data} 
          emailAddress={decodedEmail} 
          refreshInterval={15000}
        />
      </div>
    </div>
  );
}
