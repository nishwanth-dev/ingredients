import { useState } from 'react';
import { ChevronDown, DownloadIcon } from './Icons.jsx';
import { BANNER, certificateCategories, certificates } from '../content.js';

const sized = (src, w) => src + (src.includes('?') ? '&' : '?') + 'width=' + w;

export default function Certifications() {
  const counts = (id) => certificates.filter((c) => c.category === id).length;
  const [open, setOpen] = useState(() => (certificateCategories.find((c) => counts(c.id) > 0) || {}).id || '');

  return (
    <div className="ing-cert">
      <img className="ing-banner" src={BANNER} alt="No compromise: zero sulphates, parabens and harsh chemicals; EU approved ingredients; no hormone disruptors; IFRA phthalate-free fragrances" width="1245" height="1581" />

      <div className="ing-cats">
        {certificateCategories.map((cat) => {
          const rows = certificates.filter((c) => c.category === cat.id);
          const isOpen = open === cat.id;
          return (
            <div className={'ing-cat' + (isOpen ? ' is-open' : '')} key={cat.id}>
              <button type="button" className="ing-cat-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? '' : cat.id)}>
                <span>{cat.title}<small className="ing-cat-count">{rows.length}</small></span>
                <ChevronDown />
              </button>
              {isOpen && (
                <div className="ing-cat-body">
                  {rows.length === 0 && <p className="ing-cat-empty">Certificates will be added here soon.</p>}
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
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
