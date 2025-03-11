import { useContext } from 'react'

import { AppContext } from '~/components/common/utils/ContextProvider'

export const useChangeHook = () => {
  const { groupChangeHookRef, routerChangeHookRef } = useContext(AppContext)

  const setGroupChangeHook = (hook: () => Promise<boolean>) => {
    groupChangeHookRef.current = hook
  }

  const setRouterChangeHook = (hook: () => Promise<boolean>) => {
    routerChangeHookRef.current = hook
  }

  return {
    groupChangeHook: groupChangeHookRef.current,
    setGroupChangeHook,
    routerChangeHook: routerChangeHookRef.current,
    setRouterChangeHook,
  }
}
