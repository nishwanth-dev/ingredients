// ajaxCart is true when the app runs inside the Shopify page (the section sets data-cart="ajax").
// Then products are read from, and added to, the store's own cart without leaving the page.
// On any other address the button opens the real cart on tucokids.com with the product already in it.
export const config = { ajaxCart: false };
