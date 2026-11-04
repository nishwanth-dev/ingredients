import items from './bottomnav.json';

const href = (it) => (it.link.startsWith('shopify://') ? 'https://tucokids.com/collections/new-arrivals' : it.link);

// Fixed tab bar, phones only (like the live site). The icons are the theme's own images.
export default function BottomNav() {
  return (
    <div className="halo-sticky-toolbar-mobile">
      <ul className="bottom-bar">
        {items.map((it) => (
          <li className="sticky-toolbar-item" key={it.text}>
            <a href={href(it)} onClick={it.link === '#' ? (e) => { e.preventDefault(); window.dispatchEvent(new Event('tuco:open-menu')); } : undefined}>
              <span className="halo-sticky-icon" dangerouslySetInnerHTML={{ __html: it.icon }} />
              <span className="halo-sticky-text">{it.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
