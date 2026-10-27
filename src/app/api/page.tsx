import { Code, Mail, Trash2 } from "lucide-react";
import CopyTextButton from "@/components/client/copy-text-button";
import { EMAIL_DOMAIN, SITE_URL } from "@/lib/site-config";

export default function ApiPage() {
  const endpoints = {
    getEmails: `${SITE_URL}/api/email/recipient@${EMAIL_DOMAIN}`,
    getInbox: `${SITE_URL}/api/inbox/cm3sqher40005276o336z4fvw`,
    deleteInbox: `${SITE_URL}/api/delete/cm3sqher40005276o336z4fvw`
  };

  return (
    <div className="space-y-10">
      <section className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900">API Documentation</h1>
        <p className="text-slate-600">
          Integrate our temporary email service into your applications with our simple REST API.
        </p>
      </section>
      
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Code className="size-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-medium text-slate-800">Getting Started</h2>
          </div>
          
          <p className="text-slate-600 mb-4">
            Our API is free to use without authentication. All endpoints return JSON data 
            and follow standard HTTP status codes.
          </p>
          
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
              No API Key Required
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
              JSON Responses
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
              CORS Enabled
            </span>
          </div>
        </div>
      </section>
      
      <section className="space-y-6">
        <h2 className="text-2xl font-medium text-slate-800">Endpoints</h2>
        
        {/* Get Emails Endpoint */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 p-4 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-indigo-100/20">
            <div className="flex items-center gap-2">
              <Mail className="size-5 text-indigo-600" />
              <h3 className="font-medium text-slate-800">Get Email Messages</h3>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              GET
            </span>
          </div>
          
          <div className="p-6 space-y-5">
            <div>
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                Description
              </h4>
              <p className="text-slate-700">
                Retrieve all messages for a specific email address
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                Endpoint
              </h4>
              <div className="flex items-center gap-2">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex-grow font-mono text-sm text-indigo-600 relative overflow-x-auto">
                  <code>{endpoints.getEmails}</code>
                </div>
                <CopyTextButton text={endpoints.getEmails} className="shrink-0" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Parameters
                </h4>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 overflow-x-auto">
                  <div className="w-full text-sm">
                    <div className="flex flex-col space-y-1">
                      <div className="font-medium text-indigo-600 mb-1">email</div>
                      <div className="text-slate-600">The email address to fetch messages for (string)</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Example Response
                </h4>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 overflow-x-auto">
                  <pre className="text-xs text-indigo-600">
{`[
  {
    "id": "cm3sqher40005276o336z4fvw",
    "subject": "Test Email",
    "createdAt": 1732279492000,
    "expiresAt": 1732538692335,
    "fromAddress": "sender@example.com",
    "toAddress": "recipient@orifymail.com"
  }
]`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Get Inbox Endpoint */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 p-4 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-indigo-100/20">
            <div className="flex items-center gap-2">
              <Mail className="size-5 text-indigo-600" />
              <h3 className="font-medium text-slate-800">Get Inbox Message</h3>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              GET
            </span>
          </div>
          
          <div className="p-6 space-y-5">
            <div>
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                Description
              </h4>
              <p className="text-slate-700">
                Retrieve a specific message by its ID
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                Endpoint
              </h4>
              <div className="flex items-center gap-2">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex-grow font-mono text-sm text-indigo-600 relative overflow-x-auto">
                  <code>{endpoints.getInbox}</code>
                </div>
                <CopyTextButton text={endpoints.getInbox} className="shrink-0" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Parameters
                </h4>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 overflow-x-auto">
                  <div className="w-full text-sm">
                    <div className="flex flex-col space-y-1">
                      <div className="font-medium text-indigo-600 mb-1">inboxId</div>
                      <div className="text-slate-600">The unique identifier of the message (string)</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Example Response
                </h4>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 overflow-x-auto">
                  <pre className="text-xs text-indigo-600">
{`{
  "id": "cm3sqher40005276o336z4fvw",
  "textContent": "This is a test email body.",
  "htmlContent": null,
  "subject": "Test Email",
  "expiresAt": 1732538692335,
  "createdAt": 1732279492000,
  "fromAddress": "sender@example.com",
  "toAddress": "recipient@orifymail.com"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Delete Endpoint */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 p-4 flex justify-between items-center bg-gradient-to-r from-rose-50 to-rose-100/20">
            <div className="flex items-center gap-2">
              <Trash2 className="size-5 text-rose-600" />
              <h3 className="font-medium text-slate-800">Delete Inbox Message</h3>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              GET
            </span>
          </div>
          
          <div className="p-6 space-y-5">
            <div>
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                Description
              </h4>
              <p className="text-slate-700">
                Delete a specific message by its ID
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                Endpoint
              </h4>
              <div className="flex items-center gap-2">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex-grow font-mono text-sm text-indigo-600 relative overflow-x-auto">
                  <code>{endpoints.deleteInbox}</code>
                </div>
                <CopyTextButton text={endpoints.deleteInbox} className="shrink-0" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Parameters
                </h4>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 overflow-x-auto">
                  <div className="w-full text-sm">
                    <div className="flex flex-col space-y-1">
                      <div className="font-medium text-indigo-600 mb-1">inboxId</div>
                      <div className="text-slate-600">The unique identifier of the message (string)</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Example Response
                </h4>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 overflow-x-auto">
                  <pre className="text-xs text-indigo-600">
                    true
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
