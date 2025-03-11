/**
 * @file TranslationProvider.tsx
 * @description 언어 Provider
 */

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const TranslationProvider = ({ children }: Props) => {
  return <>{children}</>
}

export default TranslationProvider
