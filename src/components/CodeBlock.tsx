import { isValidElement, type ComponentPropsWithoutRef } from 'react'
import './CodeBlock.css'

export function CodeBlock({ children, ...rest }: ComponentPropsWithoutRef<'pre'>) {
  const className = isValidElement<{ className?: string }>(children)
    ? children.props.className
    : undefined
  const language = className?.match(/language-(\S+)/)?.[1]

  return (
    <div className="code-block" data-language={language}>
      <pre {...rest}>{children}</pre>
    </div>
  )
}