import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// A hello for anyone who opens DevTools.
console.log(
  '%c VD %c Hey, fellow developer 👋',
  'background:#a93f22;color:#fff;font:600 12px/2 monospace;padding:2px 6px;border-radius:4px',
  'font:500 13px/2 monospace',
);
console.log(
  '%cLaravel · FilamentPHP · React Native\nBuilt with React, Vite and Tailwind CSS.\nPress Ctrl+K (⌘K on Mac) on the page to get around, or say hello: https://www.linkedin.com/in/visvanathan-d/',
  'font:12px/1.7 monospace;color:#8a8177',
);

// Offline support (public/sw.js). Production only, so local development never serves stale files.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* unsupported or blocked: the site works the same, just without offline support */
    });
  });
}
