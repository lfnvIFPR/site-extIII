import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router'

import { MDXProvider } from '@mdx-js/react'
import { components } from './mdx-components'

import './index.css'
import Guia from './Guia.tsx'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(document.getElementById('root')!, {
  onCaughtError: () => {},
}).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <MDXProvider components={components}>
        <Guia />
      </MDXProvider>
    </BrowserRouter>
  </StrictMode>,
)
