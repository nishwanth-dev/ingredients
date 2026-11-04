import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ingredients, certificates, badges, labels } from './content.js';
import { setTheme } from './theme.js';
import './styles.css';

// Mounts the dictionary inside a Shopify page: <div id="ingredient-app" data-sticky-offset="56"></div>.
// Optional <script type="application/json" id="ingredient-data"> can replace the bundled content:
// { "ingredients": [...], "certificates": [...], "badges": [...], "labels": {...}, "theme": {...} }
function start() {
  const mount = document.getElementById('ingredient-app');
  if (!mount || mount.dataset.started) return;
  mount.dataset.started = '1';

  const tag = document.getElementById('ingredient-data');
  if (tag) {
    try {
      const d = JSON.parse(tag.textContent);
      if (Array.isArray(d.ingredients)) ingredients.splice(0, ingredients.length, ...d.ingredients);
      if (Array.isArray(d.certificates)) certificates.splice(0, certificates.length, ...d.certificates);
      if (Array.isArray(d.badges)) badges.splice(0, badges.length, ...d.badges);
      if (d.labels) Object.assign(labels, d.labels);
      if (d.theme) setTheme(d.theme);
    } catch (e) { console.error('[ingredient-app] bad data', e); }
  }
  if (mount.dataset.stickyOffset) setTheme({ stickyOffset: mount.dataset.stickyOffset + 'px' });

  createRoot(mount).render(<App standalone={false} />);
}

// the Shopify theme editor re-renders a section after each change
document.addEventListener('shopify:section:load', start);

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
