import { defineConfig, type Connect, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The site's only HTML pages. Any other page address is "not found".
const pages = new Set(['/', '/index.html', '/404.html', '/offline.html'])

/**
 * Shows 404.html for unknown addresses in `npm run dev` and `npm run preview`, matching what
 * the live host (Cloudflare Pages, Netlify, Vercel) does with dist/404.html.
 */
// Just the request/response fields used below (the project doesn't install Node's type definitions).
type Req = { url?: string; method?: string; headers: { accept?: string } }
type Res = { statusCode: number }

function notFoundPage(): Plugin {
  const serve404 = (req: Req, res: Res, next: () => void) => {
    const path = (req.url ?? '/').split('?')[0]
    const wantsPage = req.method === 'GET' && (req.headers.accept ?? '').includes('text/html')
    if (wantsPage && !pages.has(path)) {
      req.url = '/404.html'
      res.statusCode = 404
    }
    next()
  }
  const handler = serve404 as unknown as Connect.NextHandleFunction
  return {
    name: 'not-found-page',
    // Returning a function runs it after Vite's file serving, so real files are never touched.
    configureServer: (server) => () => server.middlewares.use(handler),
    configurePreviewServer: (server) => () => server.middlewares.use(handler),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), notFoundPage()],
  // Multi-page: unknown addresses get a real 404 instead of falling back to the home page.
  appType: 'mpa',
  build: {
    rollupOptions: {
      // Built as dist/index.html, dist/404.html (served by the host for unknown addresses)
      // and dist/offline.html (served by public/sw.js when there's no connection).
      input: {
        main: 'index.html',
        notFound: '404.html',
        offline: 'offline.html',
      },
    },
  },
})
