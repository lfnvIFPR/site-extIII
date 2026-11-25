import { Playground } from '../components/Playground'
import './PropsDemo.css'

type PropsPerfil = {
  nome: string
  cargo: string
  cidade: string
}


function CardPerfil({ nome, cargo, cidade }: PropsPerfil) {
  const iniciais = nome
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase()

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
    <h4>Equipe de Desenvolvimento</h4>
    <article className="props-profile-card">
      <span className="props-profile-avatar" aria-hidden="true">
        {iniciais || '?'}
      </span>
      <div className="props-profile-info">
        <h3>{nome || 'Nome do perfil'}</h3>
        <p>{cargo || 'Cargo'}</p>
        <span className="props-profile-city">{cidade || 'Cidade'}</span>
      </div>
    </article>
    </div>
  )
}


export function PropsDemo() {
  return (
    <Playground<PropsPerfil>
      component={CardPerfil}
      name="CardPerfil"
      initial={{
        nome: 'Gabriel Marques',
        cargo: 'Engenheiro de QA & Backend',
        cidade: 'Curitiba',
      }}
      controls={{
        nome: { kind: 'text' },
        cargo: { kind: 'text' },
        cidade: { kind: 'select', options: ["São Paulo", "Rio de Janeiro", "Curitiba"] },
      }}
    />
  )
}
