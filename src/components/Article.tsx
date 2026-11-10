import { useParams } from "react-router";
import { acharArtigo } from "../artigos";

import './Article.css'

const Erro = () => "Artigo inexistente";

export default function Article() {
    const slug = useParams().slug;
    if (!slug) {
        return '???'
    }
    const artigo = acharArtigo(slug);
    const Content = !artigo ? Erro : artigo.Component

    return <article>
        <Content />
    </article>

}