// Colours and sizes, set from the live page. Each key becomes a CSS variable (camelCase -> --kebab-case).
// Change a value here and the whole app updates.
export const theme = {
  sectionBg: '#ffffff',
  text: '#4d4747',
  accent: '#00b4ff',
  subheadingColor: '#4d4747',
  headingColor: '#4d4747',
  headingItalicColor: '#4d4747',
  headingWeight: 600,
  letterColor: '#4d4747',
  lineColor: '#19bbff',
  nameColor: '#4d4747',
  cardBg: '#f3f3f8',
  tagBg: '#f4f6fc',
  tagText: '#4d4747',
  hoverBg: '#d6f3ff',
  hoverText: '#4d4747',
  hoverCardBg: '#e6f6ff',
  tabBg: '#eef4fa',
  tabText: '#4d4747',
  tabActiveBg: '#00b4ff',
  tabActiveText: '#4d4747',
  popupBg: '#ffffff',
  popNameColor: '#4d4747',
  prodTileBg: '#eaf6fd',
  badgeBg: '#ffffff',
  badgeBorder: '#00b4ff',
  repoHeadingColor: '#4d4747',
  certChipBg: '#e6f4fb',
  certChipText: '#4d4747',
  cardRadius: '20px',
  imageRatio: '4 / 3',
  nameSize: '26px',
  nameWeight: 600,
  popNameSize: '28px',
  popNameWeight: 400,
  headingSizeMobile: '32px',
  headingSizeDesktop: '52px',
  columnsMobile: 1,
  columnsDesktop: 3,
  paddingTop: '48px',
  paddingBottom: '48px',
  stickyOffset: '56px',
  tabHeight: '40px',
  tabFontSize: '14px',
};

const kebab = (k) => '--' + k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
export const themeVars = Object.fromEntries(Object.entries(theme).map(([k, v]) => [kebab(k), v]));

// Lets the Shopify section override colours and sizes (keys are the same as in `theme` above).
export function setTheme(over) {
  Object.entries(over || {}).forEach(([k, v]) => { theme[k] = v; themeVars[kebab(k)] = v; });
}
