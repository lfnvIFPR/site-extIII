type Variant = 'info' | 'success' | 'warning'

export type BadgeProps = {
  label: string
  size: number
  variant: Variant
  rounded?: boolean
  title?: string // sem controle
}

const colors: Record<Variant, string> = {
  info: '#2563eb',
  success: '#16a34a',
  warning: '#b45309',
}

export function Badge({ label, size, variant, rounded = false, title }: BadgeProps) {
  return (
    <span
      title={title}
      style={{
        display: 'inline-block',
        padding: '0.5em 0.75em',
        fontSize: size,
        fontWeight: 600,
        color: '#fff',
        background: colors[variant],
        borderRadius: rounded ? '999px' : '4px',
      }}
    >
      {label}
    </span>
  )
}