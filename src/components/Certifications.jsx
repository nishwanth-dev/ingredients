import { useState } from 'react';
import { ChevronDown, DownloadIcon } from './Icons.jsx';
import { assets, certificateCategories, certificates } from '../content.js';

const sized = (src, w) => !src.includes('cdn.shopify') ? src : src + (src.includes('?') ? '&' : '?') + 'width=' + w;

// The banner on top, a row of category buttons side by side, and the certificates of the chosen category below.
export default function Certifications() {
  const [cat, setCat] = useState(certificateCategories[0] ? certificateCategories[0].id : '');
  const [wrap, setWrap] = useState(false);
  const rows = certificates.filter((c) => c.category === cat);

  return (
    <div className="ing-cert">
      <img className="ing-banner" src={assets.banner} loading="lazy" decoding="async" alt="No compromise: zero sulphates, parabens and harsh chemicals; EU approved ingredients; no hormone disruptors; IFRA phthalate-free fragrances" width="1245" height="1581" />

      <div className="ing-repo">
        <div className={'ing-chipsbar' + (wrap ? ' is-wrap' : '')}>
          <div className="ing-chips" role="tablist">
            {certificateCategories.map((c) => (
              <button type="button" role="tab" aria-selected={cat === c.id} key={c.id} className={'ing-chip' + (cat === c.id ? ' is-on' : '')} onClick={() => setCat(c.id)}>{c.title}</button>
            ))}
          </div>
          {certificateCategories.length >= 3 && (
            <button type="button" className="ing-chipsmore" aria-label="Show all categories" onClick={() => setWrap(!wrap)}><ChevronDown /></button>
          )}
        </div>

        <div className="ing-certs">
          {rows.map((c) => (
            <a className="ing-cert-row" key={c.title} href={c.file || c.image} target="_blank" rel="noopener noreferrer">
              {c.image && <img className="ing-cert-thumb" src={sized(c.image, 300)} alt={c.title} loading="lazy" />}
              <span className="ing-cert-t">
                <b>{c.title}</b>
                {c.tags && c.tags.length > 0 && <span className="ing-cert-tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</span>}
              </span>
              <DownloadIcon />
            </a>
          ))}
          {rows.length === 0 && <p className="ing-certs-empty" style={{ gridColumn: '1 / -1' }}>Certificates will be added here soon.</p>}
        </div>
      </div>
    </div>
  );
}
