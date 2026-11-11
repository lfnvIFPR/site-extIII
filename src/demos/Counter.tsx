import { useState } from 'react'
import './Counter.css'

type CounterProps = {
  step: number
  decrement?: boolean
}

export function Counter({ step, decrement = false }: CounterProps) {
  const [count, setCount] = useState(0)

  // Throw proposital
  if (step === 0) {
    throw new RangeError('Por qual razão serve um contador que não muda de valor?')
  }

  const delta = decrement ? -step : step

  return (
    <button type="button" id="counterDemo" onClick={() => setCount((current) => current + delta)}>
      Count: {count} ({delta > 0 ? '+' : ''}
      {delta})
    </button>
  )
}