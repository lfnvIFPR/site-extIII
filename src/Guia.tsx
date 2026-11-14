import { Routes, Route, Navigate } from 'react-router';
import { artigos } from './artigos';
import './Guia.css'
import Sidebar from './components/Sidebar';
import Article from './components/Article';
import Header from './components/Header';
import Footer from './components/Footer';

function Guia() {

  return (
    <>
      <div className="ticks"></div>
      <Header />
      <div className="content">
        <aside>
          <div className="ticks"></div>
          <Sidebar />
        </aside>
        <main>
          <div className="ticks"></div>
          <Routes>
            <Route path="/" element={<Navigate to={`/${artigos[0].slug}`} replace />} />
            <Route path="/:slug" element={<Article />} />
            <Route path="*" element={""} />
          </Routes>
        </main>
      </div>
      <div className="ticks"></div>
      <Footer />
    </>
  )
}

export default Guia
