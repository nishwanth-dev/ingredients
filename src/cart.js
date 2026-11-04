import { SHOP_URL } from './content.js';
import { config } from './config.js';

const cache = new Map();
const base = () => (config.ajaxCart ? '' : SHOP_URL);

// Live product data (title, photo, price, variants) from the store's public product address.
export function fetchProduct(handle) {
  if (!cache.has(handle)) {
    cache.set(handle, fetch(base() + '/products/' + handle + '.js', { headers: { Accept: 'application/json' } })
      .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .catch((e) => { cache.delete(handle); throw e; }));
  }
  return cache.get(handle);
}

export const productUrl = (handle) => SHOP_URL + '/products/' + handle;
export const cartLink = (variantId) => SHOP_URL + '/cart/' + variantId + ':1';

export function formatPrice(cents) {
  const v = cents / 100;
  return '₹' + new Intl.NumberFormat('en-IN', { maximumFractionDigits: v % 1 ? 2 : 0 }).format(v);
}

// Adds one unit to the cart, then lets the theme's cart drawer refresh and open.
// If the drawer cannot be refreshed, the customer is sent to the cart page (the item is already in it).
export async function addToCart(variantId) {
  const drawer = document.querySelector('cart-drawer') || document.querySelector('cart-notification');
  const body = { items: [{ id: variantId, quantity: 1 }] };
  if (drawer && typeof drawer.getSectionsToRender === 'function') {
    body.sections = drawer.getSectionsToRender().map((s) => s.id).join(',');
    body.sections_url = window.location.pathname;
  }
  if (drawer && typeof drawer.setActiveElement === 'function') drawer.setActiveElement(document.activeElement);
  const res = await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/javascript', 'X-Requested-With': 'XMLHttpRequest' },
    body: JSON.stringify(body),
  });
  const state = await res.json();
  if (!res.ok || state.status) throw new Error(state.description || state.message || 'Could not add to cart');
  // the theme's own "add to cart" tells the rest of the page about the change before it redraws the drawer
  try {
    if (typeof publish === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
      publish(PUB_SUB_EVENTS.cartUpdate, { source: 'ingredient-app', productVariantId: variantId, cartData: state });
    }
  } catch (e) { console.error('[ingredient-app] cart event', e); }
  return { state, drawer };
}

export function showCart(drawer, state) {
  try {
    if (drawer && typeof drawer.renderContents === 'function' && state.sections) {
      drawer.renderContents(state);
      // the drawer carries an "is-empty" mark that hides its contents; the theme removes it after every add
      drawer.classList.remove('is-empty');
      return true;
    }
  } catch (e) { console.error('[ingredient-app] cart drawer', e); }
  window.location.href = '/cart';
  return false;
}
