// Header, drawer and footer content, copied from the live site (tucokids.com).
export const SHOP = 'https://tucokids.com';

export const announcement = [
  { text: 'Free shipping on orders above ₹499' },
  { text: 'Shop our new launches!', href: SHOP + '/pages/makeup-4-999' },
];

export const drawer = {
  pills: [
    { label: 'sign up', href: 'https://account.tucokids.com' },
    { label: 'track order', href: 'https://tucokids.clickpost.in/en', external: true },
  ],
  categories: [
    ['skincare', '/collections/turmeric-saffron-dull-skin'],
    ['hair care', '/collections/reetha-hibiscus'],
    ['makeup', '/collections/beetroot-glycerin-makeup-range'],
    ['kits & combos', SHOP + '/collections/blog-best?view=kits-combos'],
    ['new launches', SHOP + '/collections/new-arrivals'],
    ['gifting', '/collections/birthday-gifting'],
  ],
  about: [
    ['our story', '/pages/our-story'],
    ['CBI', '/pages/cbi'],
    ['sustainability', '/pages/sustainibility'],
  ],
  blogs: [
    ['skincare', '/pages/skicare-categories'],
    ['haircare', '/pages/haircare-categories'],
    ['makeup', '/pages/makeup-for-kids'],
    ['wellness', '/pages/health-1'],
    ['ingredients', '/pages/ingredients-blogs'],
    ['suncare', '/pages/suncare-blogs'],
    ['celebrations', '/pages/celebrations-blogs'],
    ['parenting', '/pages/parenting-blogs'],
  ],
  links: [
    { label: 'quiz', extra: 'find your pick!', href: SHOP + '/pages/standalone-quiz' },
    { label: 'rewards', href: SHOP + '/pages/rewards-1' },
    { label: "parents' circle", href: 'https://community.tucokids.com/', external: true },
    { label: 'awards', href: 'https://lnkd.in/p/gKxPY59G', external: true },
  ],
  boat: 'https://cdn.shopify.com/s/files/1/0619/9990/7032/files/cloudonboat.png?v=1784653025',
};

export const LOGO = SHOP + '/cdn/shop/files/ff_200_1.png?v=1775833169';

const mp = (f) => 'https://cdn.shopify.com/s/files/1/0619/9990/7032/files/' + f;
export const footer = {
  categories: drawer.categories.slice(0, 3).concat([['outdoor', '/collections/suncare-for-kids-tuco']], drawer.categories.slice(3)),
  quick: [
    ['track order', 'https://tucokids.clickpost.in/en', true],
    ['rewards', SHOP + '/pages/rewards-1'],
    ['referrals', SHOP + '/pages/referrals'],
    ['shipping policy', SHOP + '/pages/shipping-policy'],
    ['refund policy', SHOP + '/pages/refund-policy'],
    ['privacy policy', SHOP + '/pages/privacy-policy'],
    ['careers', '/pages/careers'],
  ],
  address: '504, 5th floor, Sakti Statesman, Outer Ring Road, Bellandur, Bengaluru, Karnataka, 560103',
  phone: '+91 9207245500',
  email: 'support@tucokids.com',
  marketplaces: [
    ['Amazon', 'https://www.amazon.in/stores/tucokids/page/6E4F2BB9-75DB-4928-9EA0-07ADC3844CAF?ref_=aclp_header', mp('11_8c18f3bb-5625-4f38-b4e1-842604d95047.png?v=1766575282')],
    ['Flipkart', 'https://www.flipkart.com/search?q=tuco%20kids&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off', mp('10_ceb3c54a-1cc1-43d0-925b-63132c8caaf3.png?v=1766575282')],
    ['Blinkit', 'https://blinkit.com/dc/?collection_uuid=e59f7e96-57ce-4783-b28e-171b12780038', mp('6_d0516818-b734-42b9-a86d-124c07aba555.png?v=1766575282')],
    ['Zepto', 'https://www.zepto.com/search?query=tuco+kids', mp('7_7cd39494-6486-486c-b531-a77df502b687.png?v=1766575282')],
    ['Myntra', 'https://www.myntra.com/tuco-kids?rawQuery=tuco%20kids', mp('5_5040ce3f-2329-43b8-b641-2570a99eb51b.png?v=1766575282')],
    ['Nykaa', 'https://www.nykaa.com/brands/tuco-kids/c/91375?search_redirection=True', mp('8_23037950-c062-4c31-806e-6aa9c8b04cee.png?v=1766575283')],
    ['FirstCry', 'https://www.firstcry.com/tuco-intelligent/0/0/1009329?q=ard-tuco%20kids&ref2=q_ard_tuco%20kids&asid=87975', mp('9_f16f5b80-35ef-437d-ab2a-61d4cb4cb8d9.png?v=1766575282')],
    ['Meesho', 'https://www.meesho.com/Tuco?ms=2', mp('12_97032b91-0089-4475-8d57-c9d78c3f057a.png?v=1766575282')],
  ],
  policies: [
    ['Refund policy', SHOP + '/pages/refund-policy'],
    ['Privacy policy', SHOP + '/pages/privacy-policy'],
    ['Terms of service', SHOP + '/policies/terms-of-service'],
  ],
  backgrounds: {
    desktop: mp('footerdesktop.webp?v=1784723816'),
    mobile: mp('footermobile.webp?v=1784723845'),
  },
};

// Every link must open the real Shopify page, so relative store paths are turned into full tucokids.com addresses.
const abs = (u) => (u && u.startsWith('/') ? SHOP + u : u);
const fix = (list) => list.map(([t, h, ...rest]) => [t, abs(h), ...rest]);
drawer.categories = fix(drawer.categories);
drawer.about = fix(drawer.about);
drawer.blogs = fix(drawer.blogs);
footer.categories = fix(footer.categories);
footer.quick = fix(footer.quick);
footer.policies = fix(footer.policies);
