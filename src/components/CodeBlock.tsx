import { isValidElement, useEffect, useRef, useState, type ComponentPropsWithoutRef } from 'react'
import './CodeBlock.css'
import { Check, Copy } from 'lucide-react'

// devido a comandos bash

const OP = ' ;'

const TERMINA_COM_OP = /(\\|&&|\|\||\||;|&)\s*$/
const isCommand = (line: string) => line.trim() !== '' && !line.trim().startsWith('#')

// converte texto de comandos bash
// pois alunos podem copiar comandos e executá-los não sequencialmente
function comandos(text: string) {
  const linhas = text.split('\n')

  let last = -1
  linhas.forEach((l, i) => {
    if (isCommand(l)) last = i
  })

  return linhas
    .map((l, i) =>
      i < last && isCommand(l) && !TERMINA_COM_OP.test(l)
        ? `${l.trimEnd()}${OP}`
        :l,
    )
    .join('\n')
}


export function CodeBlock({ children, ...rest }: ComponentPropsWithoutRef<'pre'>) {
  const className = isValidElement<{ className?: string }>(children)
    ? children.props.className
    : undefined
  const language = className?.match(/language-(\S+)/)?.[1]

  const preRef = useRef<HTMLPreElement>(null)
  const timeout = useRef<number>(undefined)
  const [copied, setCopied] = useState(false)

  useEffect(() => () => clearTimeout(timeout.current), [])

  async function copy() {
    const raw = preRef.current?.textContent?.replace(/\n$/, '')
    if (!raw) return

    const text = language === 'bash' ? comandos(raw) : raw

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      clearTimeout(timeout.current)
      timeout.current = window.setTimeout(() => setCopied(false), 1000)
    } catch {
      // a API gosta de dar throw
    }
  }

  return (
    <div className="code-block" data-language={language}>
      <pre ref={preRef} {...rest}>{children}</pre>
      <button type="button" onClick={copy} aria-label={copied ? 'Copied' : 'Copy code'}>
        {copied ? <Check className="icon" aria-hidden /> : <Copy className="icon" aria-hidden />}
      </button>
    </div>
  )
}