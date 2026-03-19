'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchModal from '@/components/search/SearchModal';
import CVModal from '@/components/shared/CVModal';
import MagneticWrapper from '@/components/ui/MagneticWrapper';

const navItems = [
  { label: 'Home', href: '/', icon: 'ri-home-line', page: 'home' },
  { label: 'About', href: '/about', icon: 'ri-user-3-line', page: 'about' },
  { label: 'Case Studies', href: '/#casestudies', icon: 'ri-briefcase-line', page: 'casestudies' },
  { label: 'Contact', href: '/contact', icon: 'ri-mail-line', page: 'contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  const getActivePage = () => {
    if (pathname === '/') return 'home';
    if (pathname === '/about') return 'about';
    if (pathname === '/contact') return 'contact';
    return '';
  };

  const activePage = getActivePage();

  return (
    <header>
      <nav id="main-nav-pc" role="navigation">
        {/* Top bar */}
        <div className="nav-top-pc">
          <div className="main-nav-pc-top main-nav-left">
            <h4>Dharamshala, India</h4>
          </div>

          <div className="main-nav-pc-top main-nav-logo">
            <Link href="/" className="nav-logo-link">
              <h3>Sajal Kanwal</h3>
            </Link>
            <h4>Software Engineer</h4>
          </div>

          <div className="main-nav-pc-top main-nav-call" data-text="Contact">
            <MagneticWrapper>
              <Link href="/contact">
                <div className="dot" />
                <h5>Available <span>for Projects <i className="ri-arrow-right-up-line" /></span></h5>
              </Link>
            </MagneticWrapper>
          </div>
        </div>

        {/* Center nav */}
        <div className="nav-center-pc">
          <div className="nav-center">
            <ul className="nav-block-text-bottom-main">
              {navItems.map(item => (
                <li
                  key={item.page}
                  className={`nav-menu-each hover-trigger ${activePage === item.page ? 'is-active' : ''}`}
                  data-text={item.label}
                >
                  <MagneticWrapper>
                    <Link href={item.href} className="nav-link block">
                      <i className={item.icon} />
                      <span className="nav-menu">{item.label}</span>
                    </Link>
                  </MagneticWrapper>
                </li>
              ))}
              <CVModal />
            </ul>

            <MagneticWrapper>
              <SearchModal />
            </MagneticWrapper>
          </div>
        </div>
      </nav>
    </header>
  );
}
