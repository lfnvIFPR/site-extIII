// OBS: os artigos abaixo foram criados como teste e não representam o curso final.
import type { ComponentType } from "react";

type Meta = { title: string; order: number }
type MdxModule = { default: ComponentType; meta: Meta }

const modulos = import.meta.glob<MdxModule>("./articles/*.mdx", {eager: true})

export type Artigo = Meta & { slug: string, Component: ComponentType }

export const artigos: Artigo[] = Object.entries(modulos)
    .map(([path, mod]: [string, MdxModule]) => ({
        slug: path.split('/').pop()!.replace('.mdx', ''),
        ...mod.meta,
        Component: mod.default
    }))
    .sort((a,b) => a.order - b.order)


export function acharArtigo(slug?: string) {
    return artigos.find(a => a.slug === slug);
}