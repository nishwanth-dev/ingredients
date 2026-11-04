import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ingredients, labels } from './content.js';
import { themeVars } from './theme.js';
import IngredientCard from './components/IngredientCard.jsx';
import Search from './components/Search.jsx';
import Popup from './components/Popup.jsx';
import Certifications from './components/Certifications.jsx';
import AnnouncementBar from './layout/AnnouncementBar.jsx';
import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';
import BottomNav from './layout/BottomNav.jsx';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const letterOf = (n) => { const l = (n || '#').charAt(0).toUpperCase(); return /[A-Z]/.test(l) ? l : '#'; };
const idFor = (l) => 'ing-' + (l === '#' ? 'num' : l);
const OFFSET = 120;

export default function App({ standalone = true }) {
  const [tab, setTab] = useState(() => (location.hash === '#certifications' ? 'cert' : 'ing'));
  const [open, setOpen] = useState(null);
  const [on, setOn] = useState(null);
  const [active, setActive] = useState('');
  const lettersRef = useRef(null);
  const touch = useRef(typeof window !== 'undefined' && window.matchMedia('(hover: none)'));

  const { groups, order } = useMemo(() => {
    const sorted = [...ingredients].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    const g = {}, o = [];
    sorted.forEach((c) => { const l = letterOf(c.name); if (!g[l]) { g[l] = []; o.push(l); } g[l].push(c); });
    return { groups: g, order: o };
  }, []);
  const sortedAll = useMemo(() => order.flatMap((l) => groups[l]), [order, groups]);

  const close = useCallback(() => setOpen(null), []);
  const openItem = useCallback((c) => { setOn(null); setOpen(c); }, []);

  const showTab = (t) => {
    setTab(t); setOpen(null);
    try { history.replaceState(null, '', t === 'cert' ? '#certifications' : location.pathname + location.search); } catch (e) {}
  };

  // First tap on a touch screen shows the hover panel; second tap (or the + button) opens the popup.
  const tapCard = (c, e) => {
    if (touch.current.matches && c.hover && on !== c.name && !e.target.closest('[data-plus]')) { setOn(c.name); return; }
    openItem(c);
  };
  useEffect(() => {
    const off = (e) => { if (!e.target.closest('[data-card]')) setOn(null); };
    document.addEventListener('click', off);
    return () => document.removeEventListener('click', off);
  }, []);

  // Highlight the letter of the section currently under the top bar.
  useEffect(() => {
    if (tab !== 'ing') return;
    const spy = () => {
      let cur = order[0];
      order.forEach((l) => { const el = document.getElementById(idFor(l)); if (el && el.getBoundingClientRect().top <= OFFSET) cur = l; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) cur = order[order.length - 1];
      setActive(cur);
      const bar = lettersRef.current, btn = bar && bar.querySelector('[data-letter="' + cur + '"]');
      if (btn && bar.scrollWidth > bar.clientWidth) bar.scrollLeft = btn.offsetLeft - bar.clientWidth / 2 + btn.offsetWidth / 2;
    };
    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(spy); };
    window.addEventListener('scroll', onScroll, { passive: true });
    spy();
    return () => window.removeEventListener('scroll', onScroll);
  }, [tab, order]);

  return (
    <div className="ing-app" style={themeVars}>
      {standalone && <AnnouncementBar />}
      {standalone && <Header />}
      <section className="ing">
        <div className="ing-head">
          <p className="ing-sub">{labels.subheading}</p>
          <h2 className="ing-h">{labels.heading} <em>{labels.headingItalic}</em>{labels.headingEnd}</h2>
        </div>

        <div className="ing-tabs" role="tablist">
          <button type="button" role="tab" className={'ing-tabbtn' + (tab === 'ing' ? ' is-on' : '')} aria-selected={tab === 'ing'} onClick={() => showTab('ing')}>{labels.tabIngredients}</button>
          <button type="button" role="tab" className={'ing-tabbtn' + (tab === 'cert' ? ' is-on' : '')} aria-selected={tab === 'cert'} onClick={() => showTab('cert')}>{labels.tabCertifications}</button>
        </div>

        <div className="ing-view" hidden={tab !== 'ing'}>
          <Search items={sortedAll} onPick={openItem} />
          <div className="ing-bar">
            <div className="ing-letters" ref={lettersRef}>
              {LETTERS.map((l) => (
                <button type="button" key={l} data-letter={l} className={'ing-tab' + (active === l ? ' is-active' : '')} disabled={!groups[l]}
                  onClick={() => document.getElementById(idFor(l))?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>{l}</button>
              ))}
            </div>
          </div>
          <div className="ing-wrap">
            {order.map((l) => (
              <div key={l}>
                <div className="ing-letter" id={idFor(l)}><i /><span>{l}</span><i /></div>
                <div className="ing-grid">
                  {groups[l].map((c) => <IngredientCard key={c.name} item={c} isOn={on === c.name} onTap={tapCard} />)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ing-view" hidden={tab !== 'cert'}><Certifications /></div>
      </section>
      {standalone && <Footer />}
      {standalone && <BottomNav />}
      <Popup item={open} onClose={close} />
    </div>
  );
}
