import { useContext } from 'react'

import { AppContext } from '~/components/common/utils/ContextProvider'

export const useNotification = () => {
  const { contentNotification, resolveContentNotification, globalNotification, resolveGlobalNotification } =
    useContext(AppContext)

  return {
    contentNotification,
    globalNotification,
    setContentNotification: resolveContentNotification,
    setGlobalNotification: resolveGlobalNotification,
  }
}
