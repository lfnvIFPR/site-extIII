import { Routes, Route, Navigate } from 'react-router';
import { artigos } from './artigos';
import './Guia.css'
import Sidebar from './components/Sidebar';
import Article from './components/Article';

function Guia() {

  return (
    <>
      <header>Header</header>
      <div className="ticks"></div>
      <div className="content">
        <aside><Sidebar /></aside>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to={`/${artigos[0].slug}`} replace />} />
            <Route path="/:slug" element={<Article />} />
            <Route path="*" element={""} />
          </Routes>
        </main>
      </div>
      <div className="ticks"></div>
      <footer>Footer</footer>
    </>
  )
}

export default Guia
