'use client';

import { useState } from 'react';

export default function PDFDocumentView() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full min-h-[600px] md:min-h-[750px] max-w-4xl mx-auto rounded-xl overflow-hidden bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] flex flex-col">
      {loading && (
        <div className="absolute inset-0 bg-[#0c1017] flex items-center justify-center z-10">
          <span className="text-white/60 text-[12px] uppercase tracking-[0.2em] font-medium animate-pulse">
            Loading Resume...
          </span>
        </div>
      )}
      <iframe
        src="/CV.pdf#toolbar=1&navpanes=0&scrollbar=1"
        className="w-full h-full min-h-[650px] md:min-h-[800px] border-none rounded-xl bg-white"
        title="Sajal Kanwal Resume"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}

