import { Children, FC, ReactNode, useEffect, useMemo, useState } from 'react'

import { useAppSelector } from '~/utils/hooks/common/useRedux'

interface LoginLayoutProps {
  children: ReactNode
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }): React.ReactElement | null => {
  const { initDemo } = useAppSelector(state => state.loginSlice)
  const childrenArray = Children.toArray(children)

  return initDemo ? (childrenArray[0] as React.ReactElement) : (childrenArray[1] as React.ReactElement)
}

export default LoginLayout
