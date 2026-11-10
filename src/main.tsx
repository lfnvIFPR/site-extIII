import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Guia from './Guia.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Guia />
  </StrictMode>,
)
