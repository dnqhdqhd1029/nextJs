import { ReactNode } from 'react'
import { toast, ToastOptions } from 'react-toastify'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default'

import { IconSuccess } from '~/constants/common/component'
import { createMessageBox } from '~/utils/common/toastMessage'

export const openToast = (
  message: ReactNode | JSX.Element | (() => JSX.Element),
  type: ToastType,
  autoClose?: number | false,
  toastId?: string,
  title?: string
) => {
  const params: ToastOptions = {
    className: `toast__section toast-${type === 'error' ? 'danger' : type}__section`,
    icon: IconSuccess(type),
    position: 'top-center',
    autoClose: autoClose === false ? autoClose : typeof autoClose === 'number' ? autoClose : 5000,
    toastId: toastId ?? `${message}`,
    closeOnClick: false,
  }

  const newMessage = message === '' ? '오류가 발생했습니다. 다시 시도하시거나 관리자에게 문의해 주세요.' : message || ''
  switch (type) {
    case 'success':
      toast.success(
        title !== undefined ? createMessageBox(title || '', newMessage as ReactNode | JSX.Element) : newMessage,
        params
      )
      break
    case 'error':
      toast.error(
        title !== undefined ? createMessageBox(title || '', newMessage as ReactNode | JSX.Element) : newMessage,
        params
      )
      break
    case 'warning':
      toast.warning(
        title !== undefined ? createMessageBox(title || '', newMessage as ReactNode | JSX.Element) : newMessage,
        params
      )
      break
    case 'info':
      toast.info(
        title !== undefined ? createMessageBox(title || '', newMessage as ReactNode | JSX.Element) : newMessage,
        params
      )
      break
    default:
      toast(
        title !== undefined ? createMessageBox(title || '', newMessage as ReactNode | JSX.Element) : newMessage,
        params
      )
  }
}

export const closeToast = (toastId: string) => {
  toast.dismiss(toastId)
}

export const closeAllToast = () => {
  toast.dismiss()
}
