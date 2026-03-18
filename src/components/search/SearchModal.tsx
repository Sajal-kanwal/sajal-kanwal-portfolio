'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { SEARCH_ITEMS, FUN_RESPONSES } from '@/lib/constants';
import { normalize } from '@/lib/utils';

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [previewContent, setPreviewContent] = useState('');
  const [currentMatches, setCurrentMatches] = useState<typeof SEARCH_ITEMS>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const show = useCallback(() => setIsOpen(true), []);
  const hide = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(-1);
    setPreviewContent('');
    setCurrentMatches([]);
  }, []);

  const findFun = useCallback((q: string) => {
    return FUN_RESPONSES.find(f => f.triggers.some(t => q.includes(t)));
  }, []);

  const findMatches = useCallback((q: string) => {
    return SEARCH_ITEMS.filter(item =>
      item.keywords.some(k => k.startsWith(q))
    );
  }, []);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle input changes
  useEffect(() => {
    if (!isOpen) return;
    const q = normalize(query);
    setSelectedIndex(-1);

    if (!q) {
      setPreviewContent('Search anything…');
      setCurrentMatches([]);
      return;
    }

    const fun = findFun(q);
    if (fun) {
      const msg = fun.message[Math.floor(Math.random() * fun.message.length)];
      setPreviewContent(msg);
      setCurrentMatches([]);
      return;
    }

    const matches = findMatches(q).sort((a, b) => a.label.localeCompare(b.label));
    setCurrentMatches(matches);

    if (matches.length) {
      const firstKeyword = matches[0].keywords.find(k => k.startsWith(q)) || q;
      const rest = firstKeyword.slice(q.length);
      setPreviewContent(`silhouette:${q}|${rest}|${matches.map(m => m.label).join('|')}`);
      return;
    }

    setPreviewContent(`notfound:${q}`);
  }, [query, isOpen, findFun, findMatches]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.includes('Mac');
      const cmdK = isMac ? e.metaKey : e.ctrlKey;

      if ((cmdK && e.key === 'k') || (e.key === '/' && !isOpen)) {
        e.preventDefault();
        show();
        setTimeout(() => inputRef.current?.focus(), 50);
      }

      if (e.key === 'Escape') {
        hide();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [show, hide, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentMatches.length) {
        setSelectedIndex(prev => (prev + 1) % currentMatches.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentMatches.length) {
        setSelectedIndex(prev => (prev - 1 + currentMatches.length) % currentMatches.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const q = normalize(query);

      if (selectedIndex >= 0 && currentMatches[selectedIndex]) {
        router.push(currentMatches[selectedIndex].url);
      } else {
        const matches = SEARCH_ITEMS.filter(item =>
          item.keywords.some(k => k.startsWith(q) || k === q)
        );
        if (matches.length > 0) {
          router.push(matches[0].url);
        } else {
          window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        }
      }
      hide();
    }
  };

  const handleHintClick = (idx: number) => {
    router.push(currentMatches[idx].url);
    hide();
  };

  const handleGoogleClick = () => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    hide();
  };

  const renderPreview = () => {
    if (previewContent.startsWith('silhouette:')) {
      const parts = previewContent.replace('silhouette:', '').split('|');
      const typed = parts[0];
      const rest = parts[1];
      const labels = parts.slice(2);
      return (
        <>
          <div className="search-preview">
            <span className="typed">{typed}</span>
            <span className="silhouette">{rest}</span>
          </div>
          {labels.map((label, idx) => (
            <div
              key={label}
              className={`preview-hint ${idx === selectedIndex ? 'highlighted' : ''}`}
              onClick={() => handleHintClick(idx)}
            >
              ↳ {label}
            </div>
          ))}
        </>
      );
    }

    if (previewContent.startsWith('notfound:')) {
      const q = previewContent.replace('notfound:', '');
      return (
        <>
          <div>{q}</div>
          <div className="search-engine" onClick={handleGoogleClick}>Search on Google</div>
        </>
      );
    }

    return <div>{previewContent}</div>;
  };

  const modalContent = (
    <div
      ref={modalRef}
      className={`search-modal ${isOpen ? 'active' : ''}`}
      onClick={e => { if (e.target === modalRef.current) hide(); }}
    >
      <div className="search-modal-wrapper">
        <div className="search-intro">
          <h3>Hello there, I&apos;m a search assistant.</h3>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type to search…"
          autoComplete="off"
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            outline: 'none',
            color: '#020814',
            fontFamily: 'var(--font-geist)',
            fontSize: '16px',
            padding: '8px 0',
            marginBottom: '12px',
            borderBottom: '1px solid var(--border)',
          }}
        />

        <div className="search-preview-text">
          {renderPreview()}
        </div>

        {!query && (
          <div className="search-default">
            <h3>Tips</h3>
            <ul>
              <li>
                Open by <span>K</span> + <span><i className="ri-command-fill" /></span>
              </li>
              <li>
                Select by arrow keys <span><i className="ri-arrow-up-s-line" /></span> / <span><i className="ri-arrow-down-s-line" /></span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Search trigger in nav */}
      <div className="nav-search" onClick={() => { show(); setTimeout(() => inputRef.current?.focus(), 50); }}>
        <i className="ri-search-line search-icon" />
        <input
          type="text"
          placeholder="Search"
          autoComplete="off"
          readOnly
          style={{ cursor: 'none' }}
        />
        <div className="search-key">
          <span><i className="ri-command-fill" /></span>
          <p className="plus">+</p>
          <span className="letter-key">K</span>
        </div>
      </div>

      {/* Modal */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
