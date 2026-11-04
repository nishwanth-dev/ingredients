// All text, images and links. Edit this file to change what the page says.
// Product links are relative to the store; change SHOP_URL if the app lives on another domain.
export const SHOP_URL = 'https://tucokids.com';

export const labels = {
  subheading: "What's inside matters.",
  heading: 'Meet the ingredients',
  headingItalic: 'behind the science',
  headingEnd: '.',
  tabIngredients: 'Ingredients',
  tabCertifications: 'Certifications',
  searchPlaceholder: 'search ingredients',
  searchEmpty: 'no ingredient found',
  hoverMore: 'click for more +',
  what: 'What it does',
  why: 'Why we love it',
  how: 'How it works',
  found: "You'll find it in:",
  filterAll: 'All',
  repoHeading: 'Our certificate repository',
  repoText: 'All our product and brand certificates, in one place.',
};

const cdn = (file) => `${SHOP_URL}/cdn/shop/files/${file}`;

// For "what" and "why", put one bullet per line (use \n between lines).
export const ingredients = [
  {
    name: 'Almond Oil',
    image: cdn('ALMOND.png?v=1793621052'),
    tags: ['Nourishing', 'Softening'],
    line: 'Prunus Amygdalus Dulcis Oil',
    hover:
      'Pressed from sweet almonds, this lightweight oil is packed with vitamin-E and essential fatty acids that replenish moisture, smooth rough patches and leave it supple and hydrated.',
    about: '',
    what: 'Pressed from sweet almonds, this lightweight oil is packed with vitamin-E',
    why: 'essential fatty acids that replenish moisture, smooth rough patches and leave it supple and hydrated.',
    how: '',
    products: [
      { url: '/products/kids-sunscreen-spf-50-50g-pack-of-3', image: cdn('19_d4aa3a6e-6c51-4ffe-a420-baa7725a1a49.webp?v=1790589416'), title: 'sunscreen', line: '' },
      { url: '/products/2-in-1-sunscreen-for-kids-spf-50', image: cdn('genius.webp?v=1775554300'), title: 'spf 50', line: '' },
    ],
  },
  {
    name: 'Aloe Vera',
    image: cdn('ing1.png?v=1793619078'),
    tags: ['Soothing', 'Nourishing'],
    line: 'Aloe Barbadensis Leaf Juice',
    about: 'A time-honoured skin saviour, aloe provide weightless hydration and cools irritation and redness, helping stressed, sun-exposed skin recover.',
  },
  {
    name: 'Brahmi',
    image: cdn('BRAHMI.png?v=1793621367'),
    tags: ['Root Strengthening', 'Scalp Soothing'],
    line: 'Bacopa Monnieri Extract',
    about: 'Brahmi is rich in antioxidants that soothe and nourish the scalp, strengthen hair at the root and help reduce breakage for thicker, healthier-looking lengths.',
  },
  {
    name: 'Ginger',
    image: cdn('GINGER.png?v=1793621199'),
    tags: ['Scalp Invigorating', 'Strengthening'],
    line: 'Zingiber Officinale Root Extract',
    about: 'Ginger root invigorates the scalp, helps keep flakes and buildup at bay and protects strands against breakage.',
  },
  {
    name: 'Hibiscus',
    image: cdn('HIBISCUS.png?v=1793620718'),
    tags: ['Strengthening', 'Conditioning'],
    line: 'Hibiscus Rosa-Sinensis Flower Extract',
    about: 'A cherished Ayurvedic hair ritual, hibiscus boosts softness and shine and help reduce breakage for fuller, healthier-looking hair.',
  },
  {
    name: 'Mango Butter',
    image: cdn('MANGO_BUTTER.png?v=1793621119'),
    tags: ['Nourishing', 'Barrier Support'],
    line: 'Mangifera Indica Seed Butter',
    about: 'Rich in fatty acids and vitamins A, C and E, mango butter deeply nourishes, locks in moisture and strengthens the skin barrier, leaving it soft, smooth and supple without a greasy feel.',
  },
  {
    name: 'Oat',
    image: cdn('OAT.png?v=1793620774'),
    tags: ['Soothing', 'Barrier Repair'],
    line: 'Avena Sativa Kernel Extract',
    about: 'Oat relieves itchy, sensitive skin and reinforces the moisture barrier, leaving it calm, comfortable and soft to the touch.',
  },
  {
    name: 'Reetha',
    image: cdn('REETHA_9ef1b37a-4aed-47a4-80ae-694b1be35396.png?v=1793621288'),
    tags: ['Gentle Cleansing', 'Clarifying'],
    line: 'Sapindus Mukorossi Fruit Extract',
    about: 'Known as nature’s soapnut, reetha is rich in natural saponins that create a soft lather to lift away oil, dirt and buildup without stripping the scalp, leaving hair fresh, light and soft.',
  },
  {
    name: 'Rice Water',
    image: cdn('RICE_WATER.png?v=1793620976'),
    tags: ['Brightening', 'Smoothening'],
    line: 'Oryza Sativa (Rice) Water',
    about: 'A beauty ritual rooted in East Asian tradition, rice water is rich in amino acids, inositol and ferulic acid that soften and soothe skin.',
  },
  {
    name: 'Saffron',
    image: cdn('SAFFRON.png?v=1793620605'),
    tags: ['Brightening', 'Antioxidant'],
    line: 'Crocus Sativus Flower Extract',
    about: 'Saffron helps fade dullness and uneven tone while shielding skin from free radical damage, to fight tan and dullness.',
  },
  {
    name: 'Turmeric',
    image: cdn('TURMERIC_6050249c-3b99-410a-9583-a6424da6ea66.png?v=1793620513'),
    tags: ['Anti-inflammatory', 'Brightening'],
    line: 'Curcuma Longa Root Extract',
    about: 'Powered by curcumin, turmeric calms redness and irritation, and defends skin against everyday environmental stressors for clear, healthy skin.',
  },
];

// Four highlight boxes at the top of the Certifications tab. Add an `image` and a `link` to any of them if needed.
export const badges = [
  { title: 'Cruelty-free', text: 'No animal testing' },
  { title: 'Recycled Packaging', text: '100% recycled plastic' },
  { title: 'Lab Tested', text: 'Safety & quality checks' },
  { title: 'Product Safety', text: 'Regulatory compliant' },
];

// Certificate list. `tags` become the filter chips. `file` opens when a row is clicked.
export const certificates = [
  {
    title: 'Certificate name',
    tags: ['Brand'],
    image: cdn('2_fb67e317-ccd1-4aec-8316-794dc8679cf9.png?v=1793366296'),
    file: cdn('2_fb67e317-ccd1-4aec-8316-794dc8679cf9.png?v=1793366296&width=1600'),
  },
];
