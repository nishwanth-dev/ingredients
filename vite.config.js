import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `npm run build`: the full standalone page. `npm run build:embed`: one JS and one CSS file for a Shopify page.
export default defineConfig(({ mode }) => {
  if (mode === 'embed') {
    return {
      plugins: [react()],
      define: { 'process.env.NODE_ENV': '"production"' },
      build: {
        outDir: 'dist-embed',
        emptyOutDir: true,
        cssCodeSplit: false,
        lib: { entry: 'src/embed.jsx', name: 'TucoIngredientApp', formats: ['iife'], fileName: () => 'ingredient-app.js', cssFileName: 'ingredient-app' },
      },
    };
  }
  return { plugins: [react()] };
});
