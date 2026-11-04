import { useEffect, useMemo, useRef, useState } from 'react';
import { SearchIcon } from './Icons.jsx';
import { labels } from '../content.js';

export default function Search({ items, onPick }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [act, setAct] = useState(-1);
  const wrap = useRef(null);
  const query = q.trim().toLowerCase();

  const hits = useMemo(() => {
    if (!query) return [];
    const list = items.filter((c) => c.name.toLowerCase().includes(query) || c.tags.join(' ').toLowerCase().includes(query));
    list.sort((a, b) => {
      const an = a.name.toLowerCase().startsWith(query) ? 0 : 1, bn = b.name.toLowerCase().startsWith(query) ? 0 : 1;
      return an - bn || a.name.localeCompare(b.name);
    });
    return list.slice(0, 8);
  }, [items, query]);

  useEffect(() => {
    const off = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', off);
    return () => document.removeEventListener('click', off);
  }, []);

  const pick = (c) => { if (!c) return; setQ(''); setOpen(false); setAct(-1); onPick(c); };
  const show = open && query.length > 0;

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (hits.length) setAct((act + 1) % hits.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (hits.length) setAct((act - 1 + hits.length) % hits.length); }
    else if (e.key === 'Enter') { e.preventDefault(); pick(hits[act > -1 ? act : 0]); }
    else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className="ing-search" ref={wrap}>
      <div className="ing-sbox">
        <SearchIcon />
        <input
          type="search" autoComplete="off" role="combobox" aria-expanded={show}
          placeholder={labels.searchPlaceholder} aria-label={labels.searchPlaceholder}
          value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); setAct(-1); }}
          onFocus={() => setOpen(true)} onKeyDown={onKey}
        />
      </div>
      <ul className={'ing-sdrop' + (show ? ' is-open' : '')} role="listbox" onMouseDown={(e) => e.preventDefault()}>
        {hits.map((c, i) => (
          <li key={c.name} role="option" className={'ing-sopt' + (i === act ? ' is-act' : '')} onClick={() => pick(c)}>
            {c.image ? <img src={c.image + (c.image.includes('?') ? '&' : '?') + 'width=120'} alt="" /> : <span className="ing-sph" />}
            <div><b>{c.name}</b>{c.tags.length > 0 && <small>{c.tags.join(' · ')}</small>}</div>
          </li>
        ))}
        {show && hits.length === 0 && <li className="ing-sempty">{labels.searchEmpty}</li>}
      </ul>
    </div>
  );
}
