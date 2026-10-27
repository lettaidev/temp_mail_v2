import { getEmailsForAddress } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  // Await params before accessing its properties
  const resolvedParams = await params;
  const email = decodeURIComponent(resolvedParams.email);
  
  // Fetch emails for the provided address
  const result = getEmailsForAddress(email);
  
  if (!result.success) {
    return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 });
  }
  
  return NextResponse.json(result.data);
}
