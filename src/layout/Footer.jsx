import { footer } from './data.js';

const Pin = () => <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s-7-6.5-7-11.5A7 7 0 0 1 19 9.5C19 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.8" /></svg>;
const Phone = () => <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 5.5c0-.6.4-1 1-1h2.4c.5 0 .9.3 1 .8l.9 3.5c.1.4 0 .9-.3 1.2l-1.5 1.5a13.5 13.5 0 0 0 5.5 5.5l1.5-1.5c.3-.3.8-.4 1.2-.3l3.5.9c.5.1.8.5.8 1V19c0 .6-.4 1-1 1h-1.5C9.4 20 4 14.6 4 6.5V5.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Mail = () => <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M4.5 7 12 12.5 19.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Chev = () => <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export default function Footer() {
  const bg = footer.backgrounds;
  return (
    <footer className="footer-curve-bg footer" style={{ '--footer-bg-desktop': `url(${bg.desktop})`, '--footer-bg-mobile': `url(${bg.mobile})` }}>
      <div className="tuco-footer-bg">
        <div className="tuco-footer__inner page-width">
          <div className="tuco-footer__block tuco-footer__block--categories">
            <a href="https://tucokids.com/" className="tuco-footer__logo"><img src="https://tucokids.com/cdn/shop/files/ff_200_1.png?v=1775833169&width=400" alt="Tuco Kids" width="130" /></a>
            <h3 className="tuco-footer__heading">shop by category <Chev /></h3>
            <ul className="tuco-footer__list">{footer.categories.map(([t, h]) => <li key={t}><a href={h}>{t}</a></li>)}</ul>
          </div>

          <div className="tuco-footer__block tuco-footer__block--newsletter-card">
            <div className="tuco-footer__newsletter-card">
              <h3 className="tuco-footer__heading">stay in the loop</h3>
              <p className="tuco-footer__newsletter-copy">Parenting tips, exclusive offers &amp; new product drop-straight to your inbox.</p>
              <form method="post" action="https://tucokids.com/contact#ContactFooter" className="tuco-footer__newsletter-form" target="_blank">
                <input type="hidden" name="form_type" value="customer" />
                <input type="hidden" name="utf8" value="✓" />
                <input type="hidden" name="contact[tags]" value="newsletter" />
                <div className="tuco-footer__newsletter-row">
                  <input type="email" name="contact[email]" className="field__input" autoComplete="email" placeholder="enter your email" required />
                  <button type="submit" aria-label="Subscribe">subscribe</button>
                </div>
              </form>
            </div>
          </div>

          <div className="tuco-footer__block tuco-footer__block--quicklinks">
            <h3 className="tuco-footer__heading">quick links</h3>
            <ul className="tuco-footer__list">
              {footer.quick.map(([t, h, ext]) => <li key={t}><a href={h} {...(ext ? { target: '_blank', rel: 'noopener' } : {})}>{t}</a></li>)}
            </ul>
          </div>

          <div className="tuco-footer__block tuco-footer__block--contact">
            <h3 className="tuco-footer__heading">contact us</h3>
            <div className="tuco-footer__contact-row"><Pin /><span>{footer.address}</span></div>
            <div className="tuco-footer__contact-row"><Phone /><a href={'tel:' + footer.phone.replace(/\s/g, '')}>{footer.phone}</a></div>
            <div className="tuco-footer__contact-row"><Mail /><a href={'mailto:' + footer.email}>{footer.email}</a></div>
          </div>

          <div className="tuco-footer__block tuco-footer__block--social">
            <ul className="tuco-footer__social-grid" role="list">
              <li><a href="https://www.facebook.com/theunbottleco" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.022 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.196 2.238.196v2.475h-1.26c-1.243 0-1.63.775-1.63 1.57v1.89h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.918 8.437-9.94Z" /></svg></a></li>
              <li><a href="https://www.youtube.com/@tuco_kids" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.09 0 12 0 12s0 3.91.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.55 9.38.55 9.38.55s7.51 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14c.5-1.9.5-5.81.5-5.81s0-3.91-.5-5.81ZM9.6 15.6V8.4l6.27 3.6-6.27 3.6Z" /></svg></a></li>
              <li><a href="https://www.instagram.com/tuco__kids/?hl=en" aria-label="Instagram"><svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141Zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.6-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7Zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8Zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8ZM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1Z" /></svg></a></li>
              <li><a href="https://www.linkedin.com/company/tucokids" aria-label="LinkedIn"><span className="tuco-footer__in-badge" aria-hidden="true">in</span></a></li>
              {footer.marketplaces.map(([n, h, img]) => (
                <li key={n}><a href={h} target="_blank" rel="noopener" aria-label={n}><img src={img} alt="" width="30" /></a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__content-bottom">
        <div className="footer__content-bottom-wrapper page-width footer__content-bottom-wrapper--center">
          <div className="footer__copyright caption">
            <ul className="policies list-unstyled">
              {footer.policies.map(([t, h]) => <li key={t}><small className="copyright__content"><a href={h}>{t}</a></small></li>)}
            </ul>
          </div>
          <div className="copyright__content-wrapp"><small className="copyright__content">© 2026, <a href="https://tucokids.com/">Tuco Kids</a></small></div>
        </div>
      </div>
    </footer>
  );
}
