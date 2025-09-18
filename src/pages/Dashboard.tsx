import { useEffect } from "react";
import React from "react";
const DashboardPage = () => {
  useEffect(() => {
    const v = document.createElement('script');
    v.type = 'text/javascript';
    v.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    v.onload = function() {
      (window as any).voiceflow?.chat?.load?.({
        verify: { projectID: '68cac8dcd4b73f0bb0898a68' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        voice: { url: 'https://runtime-api.voiceflow.com' }
      });
    };
    document.body.appendChild(v);
    return () => {
      document.body.removeChild(v);
    };
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-blue-gradient">
      <h1 className="mb-8 text-3xl font-bold text-center text-blue-700 dark:text-blue-300">Citizen Dashboard</h1>
      <button className="px-10 py-5 bg-blue-600 text-white rounded-xl shadow-xl text-2xl font-bold hover:bg-blue-700 transition-all">
        Dashboard
      </button>
    </div>
  );
};

export default DashboardPage;
