import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { config } from '../config.js';
import { fetchProduct, productUrl, cartLink, formatPrice, addToCart, showCart } from '../cart.js';
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
            {item.line && <p className="ing-pline">{item.line}</p>}
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
                      {products.map((p) => <ProductRow key={p.handle || p.url} p={p} fit={fit} onAdded={onClose} />)}
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

function ProductRow({ p, fit, onAdded }) {
  const handle = p.handle || (p.url || '').split('/products/')[1];
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [variant, setVariant] = useState(null);
  const [state, setState] = useState('idle');

  useEffect(() => {
    let live = true;
    if (!handle) { setFailed(true); return undefined; }
    fetchProduct(handle).then((d) => {
      if (!live) return;
      setData(d);
      const first = d.variants.find((v) => v.available) || d.variants[0];
      setVariant(first ? first.id : null);
    }).catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [handle]);
  useEffect(() => { fit(); }, [data, failed, fit]);

  const v = data && data.variants.find((x) => x.id === variant);
  const title = p.title || (data && data.title) || (handle || '').replace(/-/g, ' ');
  const image = p.image || (data && data.featured_image ? 'https:' + data.featured_image.replace(/^https?:/, '').replace(/(\.[a-z]+)(\?|$)/i, '_240x$1$2') : '');
  const line = p.line || (v ? formatPrice(v.price) : '');
  const many = data && data.variants.length > 1;
  const soldOut = data && !data.variants.some((x) => x.available);
  const href = productUrl(handle);

  const add = async (e) => {
    e.preventDefault();
    if (!variant || state === 'adding') return;
    setState('adding');
    try {
      const { state: s, drawer } = await addToCart(variant);
      setState('added');
      onAdded();
      showCart(drawer, s);
    } catch (err) { console.error('[ingredient-app]', err); setState('error'); }
  };

  return (
    <div className="ing-prod">
      <a className="ing-prod-link" href={href}>
        {image ? <img src={image} alt={title} onLoad={fit} /> : <span className="ing-prod-ph" />}
        <span className="ing-prod-t"><b>{title}</b>{line && <i>{line}</i>}</span>
      </a>
      <div className="ing-prod-buy">
        {many && (
          <select className="ing-var" value={variant || ''} onChange={(e) => setVariant(+e.target.value)} aria-label="Choose an option">
            {data.variants.map((x) => <option key={x.id} value={x.id} disabled={!x.available}>{x.title}{x.available ? '' : ' (sold out)'}</option>)}
          </select>
        )}
        {soldOut ? <span className="ing-add is-off">Sold out</span>
          : failed || !variant ? <a className="ing-add" href={href}>View</a>
          : config.ajaxCart
            ? <button type="button" className="ing-add" onClick={add} disabled={state === 'adding'}>{state === 'adding' ? 'Adding…' : state === 'error' ? 'Try again' : 'Add to cart'}</button>
            : <a className="ing-add" href={cartLink(variant)}>Add to cart</a>}
      </div>
    </div>
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
