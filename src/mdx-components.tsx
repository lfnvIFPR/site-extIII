import type { MDXComponents } from 'mdx/types'
import { Children, isValidElement, type ComponentProps, type CSSProperties, type ReactElement, type ReactNode } from 'react'
import { CounterDemo } from './demos/CounterDemo'
import { BadgeDemo } from './demos/BadgeDemo'
import { PropsDemo } from './demos/PropsDemo'
import { CodeBlock } from './components/CodeBlock'

type ElementWithChildren = ReactElement<{ children?: ReactNode }>

function isElementOfType(node: ReactNode, type: string): node is ElementWithChildren {
  return isValidElement<{ children?: ReactNode }>(node) && node.type === type
}

// função auxiliar para tabelas
function MarkdownTable({ children, style, ...props }: ComponentProps<'table'>) {
  const firstRow = Children.toArray(children)
    .filter((section) => isElementOfType(section, 'thead') || isElementOfType(section, 'tbody'))
    .flatMap((section) => Children.toArray(section.props.children))
    .find((row) => isElementOfType(row, 'tr'))
  const columnCount = firstRow
    ? Children.toArray(firstRow.props.children).length
    : 1
  const tableStyle: CSSProperties & { '--table-column-count': number } = {
    ...style,
    '--table-column-count': columnCount,
  }

  return (
    <table
      {...props}
      style={tableStyle}
    >
      {children}
    </table>
  )
}

// Acessível a qualquer artigo
export const components: MDXComponents = {
  CounterDemo, BadgeDemo, PropsDemo, table: MarkdownTable, pre: CodeBlock,
}