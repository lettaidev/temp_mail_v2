import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-md px-6 py-10">
        <div className="flex justify-center mb-6">
          <div className="size-20 rounded-full bg-slate-100 flex items-center justify-center">
            <FileQuestion className="size-10 text-slate-400" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-800 mb-3">
          Page Not Found
        </h1>
        
        <p className="text-slate-600 mb-8">
          We couldn't find the page you're looking for. It might have been moved, 
          deleted, or never existed.
        </p>
        
        <Link href="/">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white transition-colors">
            <ArrowLeft className="size-4" />
            Return to Home Page
          </Button>
        </Link>
      </div>
    </div>
  );
}
