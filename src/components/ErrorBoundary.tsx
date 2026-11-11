// Essa desgraça de componente tem que ser em classe por que é a única forma de capturar throw
// E ele tem que existir caso um componente no exemplo dê throw, para que a página inteira não reinicie por nada
// Realmente deplorável

import { Component, type ErrorInfo, type ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
  // Forçar components filhos a re-renderizar
  resetKey?: unknown
}

type ErrorBoundaryState = { error: Error | null }

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Example crashed:', error, info.componentStack)
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState) {
    // Apenas reinicia após 1 atualização com erro
    if (prevState.error && this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null })
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert" className="playground-error">
          <strong>Esse exemplo encerrou com uma exceção.</strong>
          <blockquote>
              <p>"{this.state.error.message}"</p>
          </blockquote>
          <p>Mude os controles abaixo para testar novamente.</p>
        </div>
      )
    }
    return this.props.children
  }
}