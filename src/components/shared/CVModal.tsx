'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import MagneticWrapper from '@/components/ui/MagneticWrapper';

const PDFDocumentView = dynamic(() => import('@/components/shared/PDFDocumentView'), {  
  ssr: false, 
  loading: () => (
    <div className="flex h-[850px] items-center justify-center">
      <span className="text-white/50 text-[12px] uppercase tracking-[0.2em] font-medium">Initializing PDF Engine...</span>
    </div>
  ) 
});

export default function CVModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const show = useCallback(() => setIsOpen(true), []);
  const hide = useCallback(() => setIsOpen(false), []);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/CV.pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Sajal_Kanwal_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide();
    };

    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, hide]);

  const modalContent = (
    <div
      ref={modalRef}
      className={`fixed inset-0 z-[99999] flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Immersive Dark Frosted Glass Backdrop */}
      <div 
        className="absolute inset-0 bg-[#020814]/70 transition-opacity duration-700" 
        style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
        onClick={hide}
      />

      {/* Floating Cinematic Actions */}
      <div className="absolute top-6 right-6 md:top-10 md:right-12 flex items-center gap-4 z-50">
        <a 
          href="/CV.pdf" 
          onClick={handleDownload}
          className="hover-trigger flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black transition-all duration-500 cursor-none"
          data-text="Download"
        >
          <i className="ri-download-line text-[18px] md:text-[20px]" />
        </a>
        <button 
          onClick={hide}
          className="hover-trigger flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 bg-white/5 text-white hover:bg-[#ff3b30] hover:border-[#ff3b30] transition-all duration-500 cursor-none"
          data-text="Close"
        >
          <i className="ri-close-line text-[20px] md:text-[22px]" />
        </button>
      </div>

      {/* Unbound PDF Document Container */}
      <div 
        className={`relative w-full max-w-5xl h-[86vh] mx-4 my-auto flex justify-center items-center rounded-2xl overflow-hidden z-20 shadow-2xl transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
        }`}
        data-lenis-prevent="true"
      >
        <PDFDocumentView />
      </div>
    </div>
  );

  return (
    <>
      <MagneticWrapper as="li" className="nav-menu-each hover-trigger" data-text="Resume">
        <button onClick={show} className="nav-link w-full text-left bg-transparent border-none cursor-none flex items-center m-0 p-0 font-inherit text-inherit">
          <i className="ri-file-text-line" />
          <span className="nav-menu mt-[2px]">Resume</span>
        </button>
      </MagneticWrapper>
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
