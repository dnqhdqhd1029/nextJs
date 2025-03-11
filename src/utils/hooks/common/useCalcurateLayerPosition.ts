import { CSSProperties, Dispatch, RefObject, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from 'react'

interface CalcurateLayerPosition {
  leftTopRef: RefObject<HTMLElement>
  widthHeightRef: RefObject<HTMLElement>
  scrollTopElement: HTMLElement | null
  scrollLeftElement: HTMLElement | null
  targetElementRef: RefObject<HTMLElement>
  triggerRef: RefObject<HTMLElement>
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const useCalcurateLayerPosition = ({
  leftTopRef,
  scrollTopElement,
  scrollLeftElement,
  targetElementRef,
  triggerRef,
  setIsOpen,
}: CalcurateLayerPosition) => {
  const [targetElementHeight, setTargetElementHeight] = useState(0)
  const [targetElementWidth, setTargetElementWidth] = useState(0)
  const layerRef = useRef<CSSProperties | undefined>()
  const [targetClassName, setTargetClassName] = useState<string | undefined>('')
  const fixedClassName = 'mb-option-layer'

  const calcurateLayerPosition = () => {
    const left = leftTopRef.current?.offsetLeft ?? 0
    const top = leftTopRef.current?.offsetTop ?? 0
    const triggerRefWidth = triggerRef.current?.offsetWidth ?? 0
    const triggerRefHeight = triggerRef.current?.offsetHeight ?? 0
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    const scrollTop = scrollTopElement?.scrollTop ?? 0
    const scrollLeft = scrollLeftElement?.scrollLeft ?? 0
    let topPos = top + triggerRefHeight - scrollTop
    let leftPos = left + scrollLeft

    if (topPos + targetElementHeight > windowHeight - 20) {
      topPos = top - targetElementHeight - scrollTop - 1
    }

    if (leftPos + targetElementWidth + scrollLeft > windowWidth) {
      leftPos = left - scrollLeft - targetElementWidth + triggerRefWidth
    }

    layerRef.current = {
      left: leftPos ?? 0,
      top: topPos ?? 0,
      width: parseInt(targetElementWidth.toString(), 10) ?? 0,
      height: parseInt(targetElementHeight.toString(), 10) ?? 0,
    }
  }

  const handleScroll = () => {
    setIsOpen(false)
  }

  useLayoutEffect(() => {
    setIsOpen(true)
    setTimeout(() => {
      setTargetElementHeight(targetElementRef.current?.getBoundingClientRect().height ?? 0)
      setTargetElementWidth(targetElementRef.current?.getBoundingClientRect().width ?? 0)
      setTimeout(() => {
        setTargetClassName(fixedClassName)
        setIsOpen(false)
      }, 10)
    }, 10)
  }, [])

  useEffect(() => {
    scrollTopElement?.addEventListener('scroll', handleScroll, false)
    scrollLeftElement?.addEventListener('resize', handleScroll, false)
    return () => {
      scrollTopElement?.removeEventListener('scroll', handleScroll)
      scrollLeftElement?.removeEventListener('resize', handleScroll)
    }
  }, [])

  return {
    calcurateLayerPosition,
    layerRef,
    targetClassName,
  }
}
