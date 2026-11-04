import { PlusIcon } from './Icons.jsx';
import { labels } from '../content.js';

export default function IngredientCard({ item, isOn, onTap }) {
  return (
    <div className={'ing-card' + (isOn ? ' is-on' : '')} data-card onClick={(e) => onTap(item, e)}>
      <div className="ing-img">
        {item.image && <img src={item.image + (item.image.includes('?') ? '&' : '?') + 'width=800'} alt={item.name} loading="lazy" />}
        {item.hover && (
          <div className="ing-hover" aria-hidden="true">
            <div><p>{item.hover}</p></div>
            <span className="ing-hover-more">{labels.hoverMore}</span>
          </div>
        )}
        {item.tags?.length > 0 && (
          <div className="ing-tags">{item.tags.map((t) => <span className="ing-tag" key={t}>{t}</span>)}</div>
        )}
      </div>
      <div className="ing-info">
        <div>
          <span className="ing-name">{item.name}</span>
          {item.line && <span className="ing-line">{item.line}</span>}
        </div>
        <button type="button" className="ing-plus" data-plus aria-label={'More about ' + item.name}><PlusIcon /></button>
      </div>
    </div>
  );
}
