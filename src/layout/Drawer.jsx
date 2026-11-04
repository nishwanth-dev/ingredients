import { useState } from 'react';
import { drawer } from './data.js';
import { icons } from './icons.js';

const Chev = () => (
  <svg className="tuco-acc__chev" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

function Acc({ title, items, open, onToggle }) {
  return (
    <div className={'tuco-acc' + (open ? ' is-open' : '')}>
      <div className="tuco-acc__head" onClick={onToggle}><span>{title}</span><Chev /></div>
      <div className="tuco-acc__panel">
        <ul className="tuco-acc__list">{items.map(([t, h]) => <li key={t}><a href={h}>{t}</a></li>)}</ul>
      </div>
    </div>
  );
}

export default function Drawer({ style }) {
  const [openAcc, setOpenAcc] = useState('cat');
  const [shifted, setShifted] = useState(false);
  const toggle = (k) => setOpenAcc(openAcc === k ? '' : k);
  return (
    <div id="menu-drawer" className="menu-drawer" style={style}>
      <div className="tuco-drawer">
        <div className="tuco-drawer__pills">
          {drawer.pills.map((p) => <a className="tuco-pill" key={p.label} href={p.href} {...(p.external ? { target: '_blank', rel: 'noopener' } : {})}>{p.label}</a>)}
        </div>
        <nav className="tuco-drawer__nav">
          <div className="tuco-drawer__slideport">
            <div className={'tuco-drawer__slidetrack' + (shifted ? ' is-shifted' : '')}>
              <div className="tuco-drawer__slidepanel tuco-drawer__slidepanel--main">
                <Acc title="shop by category" items={drawer.categories} open={openAcc === 'cat'} onToggle={() => toggle('cat')} />
                <Acc title="about" items={drawer.about} open={openAcc === 'about'} onToggle={() => toggle('about')} />
                <div className="tuco-slide-row" onClick={() => setShifted(true)}>
                  <span>blogs</span>
                  <svg className="tuco-acc__chev" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                {drawer.links.map((l) => (
                  <a className="tuco-link" key={l.label} href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}>
                    <span>{l.label}</span>{l.extra && <> - <span>{l.extra}</span></>}
                  </a>
                ))}
              </div>
              <div className="tuco-drawer__slidepanel tuco-drawer__slidepanel--blogs">
                <div className="tuco-drawer__subhead">
                  <div className="tuco-drawer__subback" onClick={() => setShifted(false)}>
                    <svg viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span className="tuco-drawer__subtitle">choose your blogs</span>
                </div>
                <ul className="tuco-sublist">{drawer.blogs.map(([t, h]) => <li key={t}><a href={h}>{t}</a></li>)}</ul>
              </div>
            </div>
          </div>
        </nav>
        <div className="tuco-drawer__footer">
          <svg className="tuco-wave-top" viewBox="0 0 500 48" preserveAspectRatio="none" aria-hidden="true"><path d="M0,26 C90,4 170,4 250,20 C330,36 410,40 500,18 L500,48 L0,48 Z" fill="#b4e7fb" /></svg>
          <div className="tuco-wave-body">
            <img className="tuco-boat" src={drawer.boat} alt="" width="132" />
            <ul className="tuco-social" role="list">
              <li><a href="https://www.youtube.com/@tuco_kids" target="_blank" rel="noopener" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none"><path d="M20.5 6.6c1.2.35 2.15 1.3 2.5 2.5.4 1.55.5 4.9.5 4.9s0 3.35-.5 4.9a3.6 3.6 0 0 1-2.5 2.5C18.95 21.9 12 21.9 12 21.9s-6.95 0-8.5-.5a3.6 3.6 0 0 1-2.5-2.5C.5 17.35.5 14 .5 14s0-3.35.5-4.9a3.6 3.6 0 0 1 2.5-2.5C5.05 6.1 12 6.1 12 6.1s6.95 0 8.5.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9.8 17.2V10.8L15.6 14 9.8 17.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
              </a></li>
              <li><a href="https://www.instagram.com/tuco__kids/" target="_blank" rel="noopener" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none"><rect x="2.5" y="2.5" width="19" height="19" rx="5.4" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.7" /><circle cx="17.6" cy="6.4" r="1" fill="currentColor" /></svg>
              </a></li>
              <li><a href="https://www.linkedin.com/company/tucokids" target="_blank" rel="noopener" aria-label="LinkedIn"><span className="tuco-social__text" aria-hidden="true">in</span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
