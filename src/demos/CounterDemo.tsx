import { Playground } from '../components/Playground'
import { Counter } from './Counter'

export function CounterDemo() {
  return (
    <Playground
      component={Counter}
      initial={{ step: 1, decrement: false }}
      controls={{
        step: { kind: 'range', min: 0, max: 10 },
        decrement: { kind: 'toggle' },
      }}
    />
  )
}