# ingredients

Tuco Kids ingredient dictionary as a standalone React app (Vite). It is a port of the Shopify section `ingredient-dictionary.liquid`, with the same layout and behaviour:

- Heading, Ingredients / Certifications tabs
- Search with a dropdown that opens the ingredient popup
- Sticky A-Z bar that follows the scroll, letter dividers, ingredient cards
- Hover panel on desktop (tap once on touch screens), popup with image, tags, text, bullets and the products it is found in
- Certifications tab: four highlight boxes, repository heading, filter chips, certificate rows

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
```

## Change the content and the look

- `src/content.js`: all text, ingredients, products, badges and certificates.
- `src/theme.js`: colours, sizes and columns. Each value becomes a CSS variable.
- `src/styles.css`: the styles (the class names match the Shopify section).

Images and product links point at `https://tucokids.com`. Change `SHOP_URL` in `src/content.js` when the app moves to another domain.
