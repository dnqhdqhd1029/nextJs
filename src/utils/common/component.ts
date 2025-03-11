import { Children, isValidElement, ReactNode } from 'react'

export function getComponent<T>(children: ReactNode, type: T) {
  const childrenArray = Children.toArray(children)
  return childrenArray.filter(child => isValidElement(child) && child.type === type).slice(0, 2)
}
