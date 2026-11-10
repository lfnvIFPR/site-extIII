import { NavLink } from "react-router";
import { artigos } from "../artigos";

import './Sidebar.css'

export default function Sidebar() {
    return (<ul>
        {artigos.map(a => (
            <li key={a.slug}>
                <NavLink to={`/${a.slug}`}
                    className={({ isActive }) => (isActive ? 'active' : undefined)}>
                    {a.title}
                </NavLink>
            </li>
        ))}
    </ul>);
}