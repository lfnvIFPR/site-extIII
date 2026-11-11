import type { MDXComponents } from 'mdx/types'
import { CounterDemo } from './demos/CounterDemo'
import { BadgeDemo } from './demos/BadgeDemo'

// Everything listed here is usable in any .mdx article without importing it
export const components: MDXComponents = {
  CounterDemo, BadgeDemo
}