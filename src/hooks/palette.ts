// Opening the command palette from anywhere (the nav's ⌘K button), plus the platform check for key hints.
export const PALETTE_EVENT = 'vd:palette';
export const openPalette = () => window.dispatchEvent(new Event(PALETTE_EVENT));
export const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
