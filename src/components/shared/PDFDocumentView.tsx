'use client';

import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFDocumentView() {
  return (
    <Document 
      file="/CV.pdf" 
      loading={
        <div className="flex h-[850px] items-center justify-center">
          <span className="text-white/50 text-[12px] uppercase tracking-[0.2em] font-medium">Rendering PDF Document...</span>
        </div>
      }
      className="flex flex-col shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] rounded-xl overflow-hidden"
    >
      <Page 
        pageNumber={1} 
        renderTextLayer={false} 
        renderAnnotationLayer={false}
        width={typeof window !== 'undefined' ? (window.innerWidth < 768 ? window.innerWidth * 0.9 : 850) : 850}
        className="rounded-xl overflow-hidden bg-white"
      />
    </Document>
  );
}
