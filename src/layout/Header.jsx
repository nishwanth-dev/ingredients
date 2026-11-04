import { useEffect, useRef, useState } from 'react';
import { LOGO, SHOP } from './data.js';
import { icons } from './icons.js';
import Drawer from './Drawer.jsx';

const Html = ({ html }) => <span className="hdr-svg" dangerouslySetInnerHTML={{ __html: html }} />;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(0);
  const [q, setQ] = useState('');
  const [searching, setSearching] = useState(false);
  const bar = useRef(null);

  const toggle = () => {
    if (!open && bar.current) setTop(Math.round(bar.current.getBoundingClientRect().bottom));
    setOpen(!open);
  };
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);
  useEffect(() => {
    // the phone tab bar's "Category" button opens the same menu
    const openMenu = () => { if (bar.current) setTop(Math.round(bar.current.getBoundingClientRect().bottom)); setOpen(true); };
    window.addEventListener('tuco:open-menu', openMenu);
    return () => window.removeEventListener('tuco:open-menu', openMenu);
  }, []);
  useEffect(() => {
    const key = (e) => { if (e.key === 'Escape') { setOpen(false); setSearching(false); } };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, []);

  const search = (e) => { e.preventDefault(); if (q.trim()) window.location.href = SHOP + '/search?q=' + encodeURIComponent(q.trim()); };

  return (
    <div className="hdr-wrap">
      <header className="hdr" ref={bar}>
        <div className="hdr-left">
          <button type="button" className="hdr-icon hdr-menu" aria-label="Menu" aria-expanded={open} onClick={toggle}>
            <Html html={open ? icons.close : icons.hamburger} />
          </button>
        </div>
        <a className="hdr-logo" href={SHOP + '/'}><img src={LOGO + '&width=600'} alt="Tuco Kids" /></a>
        <div className="hdr-icons">
          <button type="button" className="hdr-icon" aria-label="Search" onClick={() => setSearching(!searching)}><Html html={icons.search} /></button>
          <a className="hdr-icon" href="https://tucokids.clickpost.in/en" aria-label="Track Order"><Html html={icons.track} /></a>
          <a className="hdr-login" href="https://account.tucokids.com" aria-label="Log in"><Html html={icons.login} /></a>
          <a className="hdr-icon" href={SHOP + '/cart'} aria-label="Cart"><Html html={icons.cart} /></a>
        </div>
        {searching && (
          <form className="hdr-search" onSubmit={search}>
            <input autoFocus type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" aria-label="Search" />
          </form>
        )}
      </header>
      {open && <Drawer style={{ top: top + 'px' }} />}
    </div>
  );
}
