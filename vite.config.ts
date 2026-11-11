import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

// https://vite.dev/config/
export default defineConfig(({command}) => ({
  plugins: [
    {enforce: 'pre', ...mdx({
      remarkPlugins: [remarkGfm], 
      rehypePlugins: [rehypeSlug],
      providerImportSource: '@mdx-js/react',
    })},
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ })
  ],
  base: command === 'build' ? '/site-extIII/' : '/',
}))
