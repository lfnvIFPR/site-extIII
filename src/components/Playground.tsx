import { useId, useState, type ComponentType } from 'react'
import { ErrorBoundary } from './ErrorBoundary';

import './Playground.css'

// Formato do controle
type RangeControl = { kind: 'range'; min: number; max: number; step?: number }
type ToggleControl = { kind: 'toggle' }
type TextControl = { kind: 'text' }
type SelectControl<T> = { kind: 'select'; options: readonly T[] }

// Inferência do tipo com base nos props;
type ControlFor<T> =
  [T] extends [boolean] ? ToggleControl :
  [T] extends [number] ? RangeControl :
  [T] extends [string]
    ? string extends T
      ? TextControl | SelectControl<T> // string: texto livre ou listas
      : SelectControl<T> // literais ('a' | 'b'): as const
    : never // tipos que não podem ser controlados

// União interna
type AnyControl = RangeControl | ToggleControl | TextControl | SelectControl<string>

type PlaygroundProps<P extends object> = {
  component: ComponentType<P>,
  name: string,
  initial: P
  controls: { [K in keyof P]?: ControlFor<NonNullable<P[K]>> }
}

// Formatação JSX do componente
function formatProps(name: string, values: object) {
  const attrs = Object.entries(values).map(([key, value]) => {
    if (value === true) return key
    if (typeof value === 'string') return `${key}="${value}"`
    if (typeof value === 'boolean') {
        if (value) return key;
        return;
    }
    return `${key}={${JSON.stringify(value)}}`
  })
  .filter((v) => v != null)
  return `<${[name, ...attrs].join(' ')} />`
}

export function Playground<P extends object>({
  component: Component,
  initial,
  controls,
  name
}: PlaygroundProps<P>) {
  const uid = useId()
  const [values, setValues] = useState<P>(initial)

  // cast satânico
  const Example = Component as ComponentType<object>
  
  // cast pois Object.entries() remove tipagem
  const entries = Object.entries(controls) as [keyof P & string, AnyControl | undefined][]

  function update(key: keyof P, value: unknown) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function renderInput(key: keyof P & string, control: AnyControl) {
    const id = `${uid}-${key}`
    const current = values[key]

    switch (control.kind) {
      case 'range':
        return (
          <input
            id={id}
            type="range"
            min={control.min}
            max={control.max}
            step={control.step}
            value={Number(current)}
            onChange={(e) => update(key, e.currentTarget.valueAsNumber)}
          />
        )
      case 'toggle':
        return (
          <input
            id={id}
            type="checkbox"
            checked={Boolean(current)}
            onChange={(e) => update(key, e.currentTarget.checked)}
          />
        )
      case 'text':
        return (
          <input
            id={id}
            type="text"
            value={String(current ?? '')}
            onChange={(e) => update(key, e.currentTarget.value)}
          />
        )
      case 'select':
        return (
          <select
            id={id}
            value={String(current)}
            onChange={(e) => update(key, e.currentTarget.value)}
          >
            {control.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
    }
  }

  return (
    <section className="playground">

      <div className="playground-viewport">
        <ErrorBoundary resetKey={values}>
            <Example {...values} />
        </ErrorBoundary>
      </div>

      <form className="playground-controls" onSubmit={(e) => e.preventDefault()}>
        {entries.map(([key, control]) =>
          control ? (
            <div key={key}>
              <label htmlFor={`${uid}-${key}`}>
                {key}
                {control.kind === 'range' ? `: ${String(values[key])}` : ''}
              </label>
              {renderInput(key, control)}
            </div>
          ) : null,
        )}

        <button type="button" onClick={() => setValues(initial)}>
          Reset
        </button>
      </form>


      <pre className="playground-code">
        <code>{formatProps(name, values)}</code>
      </pre>
    </section>
  )
}