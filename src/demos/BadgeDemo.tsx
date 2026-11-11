import { Playground } from '../components/Playground'
import { Badge, type BadgeProps } from './Badge'

export function BadgeDemo() {
  return (
    <Playground<BadgeProps>
      component={Badge}
      name="Badge"
      initial={{
        label: 'New',
        size: 14,
        variant: 'info',
        rounded: true,
        title: 'A small status badge',
      }}
      controls={{
        label: { kind: 'text' },
        size: { kind: 'range', min: 10, max: 32, step: 2 },
        variant: { kind: 'select', options: ['info', 'success', 'warning'] },
        rounded: { kind: 'toggle' },
      }}
    />
  )
}