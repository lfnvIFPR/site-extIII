import { useState } from 'react'
import './GitDemo.css'

const stages = [
  {
    name: 'Inicializar',
    command: 'git init',
    description: 'Cria a pasta .git para começar a rastrear o projeto.',
  },
  {
    name: 'Verificar',
    command: 'git status',
    description: 'Mostra que os arquivos do projeto ainda estão fora da área de preparação.',
  },
  {
    name: 'Preparar',
    command: 'git add .',
    description: 'Move os arquivos para a área de preparação (staging).',
  },
  {
    name: 'Registrar',
    command: 'git commit -m "estrutura inicial"',
    description: 'Salva um snapshot das alterações preparadas no histórico.',
  },
]

export function GitStagesDemo() {
  const [activeStage, setActiveStage] = useState(0)
  const isStaged = activeStage >= 2
  const isCommitted = activeStage >= 3

  return (
    <section className="git-demo git-stages-demo" aria-label="Demonstração do ciclo básico do Git">
      <h4>Versionamento do Git</h4>
      <p className="git-stages-intro">Selecione uma etapa para acompanhar o caminho de um arquivo.</p>

      <ol className="git-stages-flow" aria-label="Etapas do ciclo">
        {stages.map((stage, index) => (
          <li key={stage.command}>
            <button
              type="button"
              className={index === activeStage ? 'is-active' : ''}
              aria-pressed={index === activeStage}
              onClick={() => setActiveStage(index)}
            >
              <span className="git-stage-number">{index + 1}</span>
              <span className="git-stage-name">{stage.name}</span>
              <code>{stage.command}</code>
            </button>
          </li>
        ))}
      </ol>

      <div className="git-stages-workspace" aria-label="Estado do arquivo no projeto">
        <div className="git-stage-location is-ready">
          <strong>Projeto local</strong>
          <span className="git-stage-file">meu-primeiro-projeto-web</span>
        </div>
        <span className="git-stage-arrow" aria-hidden="true">→</span>
        <div className={`git-stage-location ${isStaged ? 'is-ready' : ''}`}>
          <strong>Staging Area</strong>
          {isStaged && !isCommitted && <span className="git-stage-file">index.html styles.css fig.css index.js </span>}
          {isCommitted && <span className="git-stage-empty">limpa após o commit</span>}
          {!isStaged && <span className="git-stage-empty">aguardando git add</span>}
        </div>
        <span className="git-stage-arrow" aria-hidden="true">→</span>
        <div className={`git-stage-location ${isCommitted ? 'is-ready' : ''}`}>
          <strong>Histórico</strong>
          {isCommitted && <span className="git-stage-file">a4a5deb (HEAD) estrutura inicial</span>}
          {!isCommitted && <span className="git-stage-empty">aguardando git commit</span>}
        </div>
      </div>

      <p className="git-stage-description" aria-live="polite">
        <strong>{stages[activeStage].command}</strong> — {stages[activeStage].description}
      </p>
    </section>
  )
}
