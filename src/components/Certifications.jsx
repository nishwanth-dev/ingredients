import { useMemo, useState } from 'react';
import { ChevronDown, DownloadIcon } from './Icons.jsx';
import { badges, certificates, labels } from '../content.js';

const sized = (src, w) => src + (src.includes('?') ? '&' : '?') + 'width=' + w;

export default function Certifications() {
  const [filter, setFilter] = useState('');
  const [wrap, setWrap] = useState(false);

  const tags = useMemo(() => {
    const seen = new Set(), out = [];
    certificates.forEach((c) => c.tags.forEach((t) => { const k = t.trim().toLowerCase(); if (k && !seen.has(k)) { seen.add(k); out.push(t.trim()); } }));
    return out;
  }, []);
  const rows = certificates.filter((c) => !filter || c.tags.some((t) => t.trim().toLowerCase() === filter));

  return (
    <div className="ing-cert">
      <div className="ing-badges">
        {badges.map((b) => {
          const Tag = b.link ? 'a' : 'div';
          return (
            <Tag className="ing-badge" key={b.title} {...(b.link ? { href: b.link } : {})}>
              {b.image && <img src={sized(b.image, 300)} alt={b.title} loading="lazy" />}
              <b>{b.title}</b>
              {b.text && <span>{b.text}</span>}
            </Tag>
          );
        })}
      </div>

      <div className="ing-repo">
        <div className="ing-repo-head">
          <div><h3>{labels.repoHeading}</h3><p>{labels.repoText}</p></div>
        </div>
        <div className={'ing-chipsbar' + (wrap ? ' is-wrap' : '')}>
          <div className="ing-chips">
            <button type="button" className={'ing-chip' + (!filter ? ' is-on' : '')} onClick={() => setFilter('')}>{labels.filterAll}</button>
            {tags.map((t) => (
              <button type="button" key={t} className={'ing-chip' + (filter === t.toLowerCase() ? ' is-on' : '')} onClick={() => setFilter(t.toLowerCase())}>{t}</button>
            ))}
          </div>
          {tags.length >= 3 && (
            <button type="button" className="ing-chipsmore" aria-label="Show all filters" onClick={() => setWrap(!wrap)}><ChevronDown /></button>
          )}
        </div>
        <div className="ing-certs">
          {rows.map((c) => (
            <a className="ing-cert-row" key={c.title} href={c.file || c.image} target="_blank" rel="noopener noreferrer">
              {c.image && <img className="ing-cert-thumb" src={sized(c.image, 300)} alt={c.title} loading="lazy" />}
              <span className="ing-cert-t">
                <b>{c.title}</b>
                {c.tags.length > 0 && <span className="ing-cert-tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</span>}
              </span>
              <DownloadIcon />
            </a>
          ))}
          {rows.length === 0 && <p className="ing-certs-empty" style={{ gridColumn: '1 / -1' }}>No certificates yet.</p>}
        </div>
      </div>
    </div>
  );
}
