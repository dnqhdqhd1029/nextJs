import { useContext } from 'react'

import { AppContext } from '~/components/common/utils/ContextProvider'

export const useAlarm = () => {
  const { alert, resolveAlert, confirm, resolveConfirm, popup, resolvePopup } = useContext(AppContext)

  const alertNetworkError = () => {
    resolveAlert({
      message: '네트워크 오류가 발생했습니다. 다시 시도하시거나 관리자에게 문의해주세요.',
      open: true,
    })
  }

  return {
    alert,
    confirm,
    setAlert: resolveAlert,
    setConfirm: resolveConfirm,
    messagePopup: popup,
    setMessagePopup: resolvePopup,
    alertNetworkError,
  }
}
