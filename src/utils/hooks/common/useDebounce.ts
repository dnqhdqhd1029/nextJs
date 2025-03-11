import { useEffect, useRef, useState } from 'react'

export const useDebounce = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState<T>(value)

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(debounceTimer)
    }
  }, [value, delay])

  return debounceValue
}

export const useDebounceFn = (callback: () => void, delayTime: number = 300) => {
  const timer = useRef<ReturnType<typeof setTimeout>>()

  return () => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(() => {
      callback()
    }, delayTime)
  }
}

export default useDebounce
