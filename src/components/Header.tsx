import { Settings } from "lucide-react";
import Logo from '../assets/icon.svg?react'
import "./Header.css";

export default function Header() {
  return (
    <header>
      <div className="logo">
        <Logo className="if" />
        <span> Práticas de Extensão III</span>
      </div>

      <button>
        <Settings id="settings-header" className="icon" />
      </button>
    </header>
  );
}
