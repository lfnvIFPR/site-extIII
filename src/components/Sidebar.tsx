import { useEffect, useState } from "react";
import { NavLink, useMatch } from "react-router";
import { capitulos, type Artigo, type Capitulo } from "../artigos";
import { Menu } from "lucide-react";

import "./Sidebar.css";

type Heading = { id: string; text: string; level: number };

// Reads the headings of the rendered artigos. rehype-slug already gave them ids
function useHeadings(): Heading[] {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const elements = document.querySelectorAll<HTMLHeadingElement>(
        "article h2, article h3",
      );
      setHeadings(
        Array.from(elements, (el) => ({
          id: el.id,
          text: el.textContent ?? "",
          level: Number(el.tagName[1]),
        })),
      );
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return headings;
}

function SubHeadings() {
  const headings = useHeadings();

  return (
    <ul className="sub-headings">
      {headings.map((h) => (
        <li key={h.id} data-level={h.level}>
          <a href={`#${h.id}`}>{h.text}</a>
        </li>
      ))}
    </ul>
  );
}

function ArticleItem({
  artigos,
  isActive,
}: {
  artigos: Artigo;
  isActive: boolean;
}) {
  return (
    <li>
      <NavLink to={`/${artigos.slug}`}>{artigos.title}</NavLink>
      {isActive && <SubHeadings />}
    </li>
  );
}

function ChapterSection({
  chapter,
  activeSlug,
}: {
  chapter: Capitulo;
  activeSlug?: string;
}) {
  return (
    <section>
      <h2>{chapter.title}</h2>
      <ul>
        {chapter.artigos.map((artigos) => (
          <ArticleItem
            key={artigos.slug}
            artigos={artigos}
            isActive={artigos.slug === activeSlug}
          />
        ))}
      </ul>
    </section>
  );
}

export default function Sidebar() {
  // The sidebar sits outside <Routes>, so useParams() would be empty here
  const activeSlug = useMatch("/:slug")?.params.slug;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="sidebar" data-collapsed={collapsed}>
      <button
        type="button"
        className="sidebar-toggle"
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={!collapsed}
        aria-controls="sidebar-nav"
        aria-label={
          collapsed ? "Expandir barra lateral" : "Recolher barra lateral"
        }
      >
        <Menu size={20} aria-hidden="true" />
      </button>

      <nav id="sidebar-nav" className="sidebar-nav" aria-label="Artigos">
        <div className="sidebar-inner">
          {capitulos.map((chapter) => (
            <ChapterSection
              key={chapter.number}
              chapter={chapter}
              activeSlug={activeSlug}
            />
          ))}
        </div>
      </nav>
    </div>
  );
}
