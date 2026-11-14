import { useState } from 'react'
import './GitDemo.css'

const steps = [
  {
    name: 'Commit local',
    command: 'git commit -m "nova alteração"',
    description: 'Um novo commit é criado no histórico do projeto local.',
  },
  {
    name: 'Push',
    command: 'git push origin main',
    description: 'O push envia o commit local para o repositório remoto.',
  },
  {
    name: 'Commit remoto',
    command: 'nova alteração no GitHub',
    description: 'Uma pessoa colaboradora envia um commit para o repositório remoto.',
  },
  {
    name: 'Pull',
    command: 'git pull origin main',
    description: 'O pull obtém e integra no projeto local o novo commit remoto.',
  },
]

export function GitRemoteDemo() {
  const [activeStep, setActiveStep] = useState(0)
  const step = steps[activeStep]
  const localCommits = activeStep === 3
    ? ['9f82b1c', 'a4a5deb', 'c8192ab']
    : ['9f82b1c', 'a4a5deb']
  const remoteCommits = activeStep === 0
    ? ['9f82b1c']
    : activeStep === 1
      ? ['9f82b1c', 'a4a5deb']
      : ['9f82b1c', 'a4a5deb', 'c8192ab']

  return (
    <section className="git-demo git-sync-demo" aria-label="Demonstração de sincronização com o GitHub">
      <h4>Sincronização entre local e remoto</h4>
      <p className="git-stages-intro">Selecione uma etapa para acompanhar os commits nas duas trilhas.</p>

      <ol className="git-stages-flow git-sync-flow" aria-label="Etapas de sincronização">
        {steps.map((item, index) => (
          <li key={item.name}>
            <button
              type="button"
              className={activeStep === index ? 'is-active' : ''}
              aria-pressed={activeStep === index}
              onClick={() => setActiveStep(index)}
            >
              <span className="git-stage-number">{index + 1}</span>
              <span className="git-stage-name">{item.name}</span>
              <code>{item.command}</code>
            </button>
          </li>
        ))}
      </ol>

      <div className="git-sync-tracks" aria-label="Histórico de commits local e remoto">
        <div className="git-sync-track git-sync-track-local">
          <strong className="git-sync-track-label">Projeto local</strong>
          <div className="git-sync-commits">
            {localCommits.map((commit, index) => (
              <span
                className={`git-sync-commit ${index === localCommits.length - 1 ? 'is-latest' : ''}`}
                key={commit}
              >
                {commit}
              </span>
            ))}
          </div>
        </div>

        <div className="git-sync-transfers" aria-hidden="true">
          <span className={`git-sync-transfer ${activeStep === 1 ? 'is-active' : ''}`}>
            ↓ push
          </span>
          <span className={`git-sync-transfer ${activeStep === 3 ? 'is-active' : ''}`}>
            ↑ pull
          </span>
        </div>

        <div className="git-sync-track git-sync-track-remote">
          <strong className="git-sync-track-label">GitHub remoto (origin)</strong>
          <div className="git-sync-commits">
            {remoteCommits.map((commit, index) => (
              <span
                className={`git-sync-commit ${index === remoteCommits.length - 1 ? 'is-latest' : ''}`}
                key={commit}
              >
                {commit}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="git-stage-description" aria-live="polite">
        <strong>{step.command}</strong> — {step.description}
      </p>
    </section>
  )
}
