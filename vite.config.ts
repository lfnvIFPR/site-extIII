import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {enforce: 'pre', ...mdx(
      {remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug]}
    )
    },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ })
  ],
  base: '/site-extIII/',
})
