import { createContext, CSSProperties, MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import type { MessagePopupButton } from '~/types/common'
import { TimeoutRef } from '~/types/common'
import { useAppDispatch } from '~/utils/hooks/common/useRedux'

export interface AppContextProps {
  alert: {
    title?: string
    message: ReactNode
    open: boolean
    callback?: () => void
  }

  confirm: {
    title?: string
    message: ReactNode
    open: boolean
    backdropStyle?: CSSProperties
    onConfirm?: () => void
    onCancel?: () => void
  }

  popup: {
    title?: string
    message: ReactNode
    open: boolean
    buttons?: MessagePopupButton[]
    backdropStyle?: CSSProperties
    onConfirm?: (id?: string) => void
    onCancel?: () => void
  }

  contentNotification: {
    id: string
    node: ReactNode
    isOpen: boolean
    type?: 'error' | 'success' | 'info' | 'warning'
    noCloseButton?: boolean
    onClose?: () => void
  }

  globalNotification: {
    id: string
    node: ReactNode
    isOpen: boolean
    type?: 'error' | 'success' | 'info' | 'warning'
    noCloseButton?: boolean
    onClose?: () => void
  }

  resolveAlert: (value: AppContextProps['alert']) => void

  resolveConfirm: (value: AppContextProps['confirm']) => void

  resolvePopup: (value: AppContextProps['popup']) => void

  resolveContentNotification: (value: AppContextProps['contentNotification']) => void

  resolveGlobalNotification: (value: AppContextProps['globalNotification']) => void

  asPath: string | null

  groupChangeHookRef: MutableRefObject<() => Promise<boolean>>

  routerChangeHookRef: MutableRefObject<() => Promise<boolean>>
}

export const AppContext = createContext<AppContextProps>({
  alert: {
    message: <></>,
    open: false,
  },
  confirm: {
    message: <></>,
    open: false,
  },
  popup: {
    message: <></>,
    open: false,
  },
  contentNotification: {
    id: '',
    node: <></>,
    isOpen: false,
    type: 'success',
    noCloseButton: false,
    onClose: () => {},
  },
  globalNotification: {
    id: '',
    node: <></>,
    isOpen: false,
    type: 'success',
    noCloseButton: false,
    onClose: () => {},
  },
  resolveAlert: () => {},
  resolveConfirm: () => {},
  resolvePopup: () => {},
  resolveContentNotification: () => {},
  resolveGlobalNotification: () => {},
  asPath: '',
  groupChangeHookRef: { current: async () => true },
  routerChangeHookRef: { current: async () => true },
})

interface Props {
  children: ReactNode
}

const ContextProvider = ({ children }: Props) => {
  const router = useRouter()
  const timerRef: TimeoutRef = useRef(null)
  const { asPath } = router
  const dispatch = useAppDispatch()
  const asPathRef = useRef<string | null>(null)

  const [alert, setAlert] = useState<AppContextProps['alert']>({
    message: '',
    open: false,
    callback: () => {},
  })
  const [confirm, setConfirm] = useState<AppContextProps['confirm']>({
    message: '',
    open: false,
    onConfirm: () => {},
    onCancel: () => {},
  })
  const [popup, setPopup] = useState<AppContextProps['popup']>({
    message: '',
    open: false,
    onConfirm: () => {},
    onCancel: () => {},
  })
  const [contentNotification, setContentNotification] = useState<AppContextProps['contentNotification']>({
    id: '',
    node: <></>,
    isOpen: false,
    onClose: () => {},
  })
  const [globalNotification, setGlobalNotification] = useState<AppContextProps['globalNotification']>({
    id: '',
    node: <></>,
    isOpen: false,
    noCloseButton: false,
    onClose: () => {},
  })

  const groupChangeHookRef = useRef<() => Promise<boolean>>(async () => true)
  const routerChangeHookRef = useRef<() => Promise<boolean>>(async () => true)

  const resolveAlert = (value: AppContextProps['alert']) => {
    setAlert({
      ...value,
      message: <div className="confirm-lines">{value.message}</div>,
      callback: value.callback ? value.callback : () => {},
    })
  }

  const resolveConfirm = (value: AppContextProps['confirm']) => {
    setConfirm({
      ...value,
      message: <div className="confirm-lines">{value.message}</div>,
      onConfirm: value.onConfirm ? value.onConfirm : () => {},
      onCancel: value.onCancel ? value.onCancel : () => {},
    })
  }

  const resolvePopup = (value: AppContextProps['popup']) => {
    setPopup({
      ...value,
      message: <div className="confirm-lines">{value.message}</div>,
      buttons: value.buttons ? value.buttons : [],
      onConfirm: value.onConfirm ? value.onConfirm : () => {},
      onCancel: value.onCancel ? value.onCancel : () => {},
    })
  }

  const resolveContentNotification = (value: AppContextProps['contentNotification']) => {
    setContentNotification(value)
  }

  const resolveGlobalNotification = (value: AppContextProps['globalNotification']) => {
    setGlobalNotification(value)
  }

  useEffect(() => {
    asPathRef.current = asPath
  }, [asPath])

  return (
    <AppContext.Provider
      value={{
        alert,
        resolveAlert,
        confirm,
        resolveConfirm,
        popup,
        resolvePopup,
        contentNotification,
        resolveContentNotification,
        globalNotification,
        resolveGlobalNotification,
        asPath: asPathRef.current,
        groupChangeHookRef,
        routerChangeHookRef,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default ContextProvider
