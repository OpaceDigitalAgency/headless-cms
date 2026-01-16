const svgData = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

export const blockIcons = {
  hero: svgData(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="14" width="48" height="36" rx="4"/><line x1="16" y1="28" x2="36" y2="28"/><line x1="16" y1="36" x2="30" y2="36"/><path d="M46 18l2 4 4 2-4 2-2 4-2-4-4-2 4-2z"/></svg>',
  ),
  content: svgData(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="22" r="3"/><line x1="24" y1="22" x2="50" y2="22"/><circle cx="16" cy="32" r="3"/><line x1="24" y1="32" x2="46" y2="32"/><circle cx="16" cy="42" r="3"/><line x1="24" y1="42" x2="40" y2="42"/></svg>',
  ),
  media: svgData(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="14" width="48" height="36" rx="4"/><circle cx="22" cy="26" r="4"/><path d="M14 44l12-12 8 8 10-10 8 14"/></svg>',
  ),
  callToAction: svgData(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="20" width="44" height="24" rx="6"/><line x1="22" y1="32" x2="38" y2="32"/><path d="M34 26l6 6-6 6"/></svg>',
  ),
  archive: svgData(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="24" width="44" height="26" rx="4"/><path d="M14 18h36l4 6H10l4-6z"/><line x1="24" y1="34" x2="40" y2="34"/></svg>',
  ),
  form: svgData(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="18" width="6" height="6" rx="1"/><line x1="26" y1="21" x2="50" y2="21"/><rect x="14" y="30" width="6" height="6" rx="1"/><line x1="26" y1="33" x2="46" y2="33"/><rect x="14" y="42" width="6" height="6" rx="1"/><line x1="26" y1="45" x2="40" y2="45"/></svg>',
  ),
  gallery: svgData(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="12" y="18" width="16" height="16" rx="2"/><rect x="36" y="18" width="16" height="16" rx="2"/><rect x="12" y="38" width="16" height="16" rx="2"/><rect x="36" y="38" width="16" height="16" rx="2"/></svg>',
  ),
  grid: svgData(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="12" y="16" width="40" height="32" rx="4"/><line x1="26" y1="16" x2="26" y2="48"/><line x1="38" y1="16" x2="38" y2="48"/></svg>',
  ),
  timeline: svgData(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="20" y1="14" x2="20" y2="50"/><circle cx="20" cy="18" r="4"/><circle cx="20" cy="32" r="4"/><circle cx="20" cy="46" r="4"/><line x1="30" y1="18" x2="52" y2="18"/><line x1="30" y1="32" x2="48" y2="32"/><line x1="30" y1="46" x2="44" y2="46"/></svg>',
  ),
};
