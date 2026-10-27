"use client";

import dynamic from "next/dynamic";

// Dynamically import the auto-refresh component
const AutoRefreshEmails = dynamic(
  () => import("@/components/client/auto-refresh-emails"),
  { ssr: false }
);

interface EmailsContainerProps {
  initialEmails: any[];
  emailAddress: string;
  refreshInterval?: number;
}

export default function EmailsContainer({ 
  initialEmails, 
  emailAddress,
  refreshInterval = 15000 
}: EmailsContainerProps) {
  return (
    <AutoRefreshEmails 
      initialEmails={initialEmails} 
      emailAddress={emailAddress} 
      refreshInterval={refreshInterval}
    />
  );
}
