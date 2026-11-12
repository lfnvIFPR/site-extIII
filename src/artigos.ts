// OBS: os artigos abaixo foram criados como teste e não representam o curso final.
import type { ComponentType } from "react";

export const tituloCapitulos: Record<number, string> = {
  1: 'Módulo 0: introdução',
  2: 'Módulo 1: fluxo de dados',
}

type Meta = { title: string; order: number; chapter: number; }
type MdxModule = { default: ComponentType; meta: Meta }

const modulos = import.meta.glob<MdxModule>("./articles/*.mdx", {eager: true})

export type Artigo = Meta & { slug: string, Component: ComponentType }
export type Capitulo = { number: number; title: string; artigos: Artigo[] }

export const artigos: Artigo[] = Object.entries(modulos)
    .map(([path, mod]: [string, MdxModule]) => ({
        slug: path.split('/').pop()!.replace('.mdx', ''),
        ...mod.meta,
        Component: mod.default
    }))
    .sort((a,b) => a.chapter - b.chapter || a.order - b.order)

const byChapter = new Map<number, Artigo[]>()
for (const article of artigos) {
  byChapter.set(article.chapter, [...(byChapter.get(article.chapter) ?? []), article])
}

export const capitulos: Capitulo[] = [...byChapter].map(([number, list]) => ({
  number,
  title: tituloCapitulos[number] ?? `Capítulo ${number}`,
  artigos: list,
}))

export const acharArtigo = (slug?: string) => artigos.find((a) => a.slug === slug)