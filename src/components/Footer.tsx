import "./Footer.css";
import Logo from '../assets/icon.svg?react'
import { Atom, Globe, Package, Scroll, Shell, ShipWheel, SquareLetterM, SquareLetterT, Type } from "lucide-react";


export default function Footer() {
  return (
    <footer>
        <div className="atribuicoes">
            <ul>
                <li>Inspirado em </li>
                <li><a href="https://www.theodinproject.com/"><ShipWheel />The Odin Project</a></li>
                <li><a href="https://developer.mozilla.org/pt-BR/"><Globe />MDN Web Docs</a></li>
            </ul>
            <ul>
                <li> Tecnologias utilizadas no desenvolvimento </li>
                <li><a href="https://github.com/microsoft/cascadia-code"><Type />Cascadia Code</a>, por Microsoft</li>
                <li><a href="https://mdxjs.com/"><SquareLetterM />MDX</a> e relacionados </li>
                <li><a href="https://www.typescriptlang.org/"><SquareLetterT />TypeScript</a></li>
                <li><a href="https://vite.dev/"><Package />Vite</a></li>
            </ul>

            <ul>
                <li>Mais informações</li>
                <li><a href="https://javascript.info/"><Scroll />javascript.info</a> </li>
                <li><a href="https://react.dev/"><Atom />react.dev</a></li>
                <li><hr /></li>
                <li>Ícones por</li>
                <li><a href="https://lucide.dev/"><Shell />Lucide </a></li>
            </ul>
        </div>
      <div className="logo">
        <Logo className="if" />
        <span> Instituto Federal</span>
      </div>
    </footer>
  );
}
