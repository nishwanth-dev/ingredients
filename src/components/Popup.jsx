import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight } from './Icons.jsx';
import { labels, SHOP_URL, photo } from '../content.js';
import { themeVars } from '../theme.js';

const lines = (t) => (t || '').split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
const sized = (src, w) => src + (src.includes('?') ? '&' : '?') + 'width=' + w;

export default function Popup({ item, onClose }) {
  const box = useRef(null);
  const isOpen = !!item;

  // Shrink the card to fit the screen (down to 60%), otherwise let it scroll.
  const fit = useCallback(() => {
    const bx = box.current;
    if (!bx) return;
    bx.style.transform = ''; bx.style.maxHeight = ''; bx.style.overflowY = '';
    const avail = window.innerHeight - 24, h = bx.offsetHeight;
    if (h > avail) {
      const k = avail / h;
      if (k >= 0.6) bx.style.transform = 'scale(' + k.toFixed(3) + ')';
      else { bx.style.maxHeight = avail + 'px'; bx.style.overflowY = 'auto'; }
    }
  }, []);

  useLayoutEffect(() => { if (isOpen) { if (box.current) box.current.scrollTop = 0; fit(); } }, [isOpen, item, fit]);

  useEffect(() => {
    if (!isOpen) return;
    const key = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', key);
    window.addEventListener('resize', fit);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', key);
      window.removeEventListener('resize', fit);
      document.documentElement.style.overflow = '';
    };
  }, [isOpen, onClose, fit]);

  const what = lines(item?.what), why = lines(item?.why);
  const products = item?.products || [];

  return createPortal(
    <div className={'ing-pop' + (isOpen ? ' is-open' : '')} role="dialog" aria-modal="true" aria-hidden={!isOpen}
      style={themeVars} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="ing-box" ref={box}>
        <button type="button" className="ing-x" aria-label="Close" onClick={onClose}>&times;</button>
        {item?.image && <img className="ing-pimg" src={photo(item.image, 800)} alt={item.name} onLoad={fit} />}
        {item && (
          <div className="ing-pbody">
            <h3 className="ing-pname">{item.name}</h3>
            <div className="ing-ptags">{item.tags?.map((t) => <span key={t}>{t}</span>)}</div>
            <div>
              {item.about && <div className="ing-sec ing-sec-intro"><p>{item.about}</p></div>}
              {what.length > 0 && <Bullets label={labels.what} list={what} />}
              {why.length > 0 && <Bullets label={labels.why} list={why} />}
              {item.how && <div className="ing-sec"><h4>{labels.how}</h4><p>{item.how}</p></div>}
              {(products.length > 0 || item.found) && (
                <div className="ing-sec ing-sec-found">
                  <h4>{labels.found}</h4>
                  {products.length > 0 ? (
                    <div className="ing-prods">
                      {products.map((p) => (
                        <a className="ing-prod" key={p.url} href={p.url.startsWith('http') ? p.url : SHOP_URL + p.url}>
                          {p.image ? <img src={sized(p.image, 240)} alt={p.title} onLoad={fit} /> : <span className="ing-prod-ph" />}
                          <span className="ing-prod-t"><b>{p.title}</b>{p.line && <i>{p.line}</i>}</span>
                          <ChevronRight />
                        </a>
                      ))}
                    </div>
                  ) : <p>{item.found}</p>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

function Bullets({ label, list }) {
  return (
    <div className="ing-sec">
      <h4>{label}</h4>
      <ul className="ing-bul">{list.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </div>
  );
}
