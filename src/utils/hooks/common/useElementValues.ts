import { RefObject } from 'react'

export const useElementValues = () => {
  const getIsElementOverflowFromScreenBottom = <T>(element: RefObject<T>, initialTop: number) => {
    const body = document.body.getBoundingClientRect()
    const position = (element.current as HTMLElement).getBoundingClientRect()
    const elementBottom = initialTop + (position?.height ?? 0)

    return elementBottom >= body.height
  }

  return {
    getIsElementOverflowFromScreenBottom,
  }
}
