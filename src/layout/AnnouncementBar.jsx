import { announcement } from './data.js';

// Scrolling yellow strip. The list is repeated so the loop has no gap (it slides left by half its width).
export default function AnnouncementBar() {
  const items = [];
  for (let i = 0; i < 4; i++) announcement.forEach((a, k) => items.push({ ...a, key: i + '-' + k }));
  return (
    <div className="ab" role="region" aria-label="Announcement bar">
      <div className="ab-scroll">
        {items.map((a) => (
          <span className="ab-item" key={a.key}>
            {a.href ? <a href={a.href}>{a.text}</a> : a.text}
          </span>
        ))}
      </div>
    </div>
  );
}
