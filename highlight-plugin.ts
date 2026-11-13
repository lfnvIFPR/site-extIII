// ESse plugin existe para satisfazer um detalhe minúsculo que quero adicionar.
type Node = {
  type: string
  tagName?: string
  properties?: { className?: string[] }
  value?: string
  children?: Node[]
}

// Keywords especiais de declaração
const DECLARATIONS = new Set(['function', 'class', 'def'])

export default function rehypeDeclarations() {
  return (tree: Node) => {
    const walk = (node: Node) => {
      for (const child of node.children ?? []) {
        const classes = child.properties?.className ?? []
        const text = child.children?.[0]

        if (
          child.tagName === 'span' &&
          classes.includes('hljs-keyword') &&
          text?.type === 'text' &&
          DECLARATIONS.has(text.value ?? '')
        ) {
          child.properties!.className = [...classes, 'hljs-declaration']
        }

        walk(child)
      }
    }
    walk(tree)
  }
}