/**
 * @file Alert.tsx
 * @description Alert
 */

import { ReactNode, useEffect, useState } from 'react'

import Popup from '~/components/common/ui/Popup'
import { useAlarm } from '~/utils/hooks/common/useAlarm'

export const Alert = () => {
  const { alert, setAlert } = useAlarm()

  const [isOpen, setIsOpen] = useState(false)
  const [children, setChildren] = useState<ReactNode>('')
  const [title, setTitle] = useState('알림')

  const handleClose = () => {
    setIsOpen(false)
    alert.callback && alert.callback()
    setAlert({
      title: '알림',
      message: '',
      open: false,
    })
  }

  useEffect(() => {
    if (alert.open) {
      setIsOpen(alert.open)
      setChildren(alert.message)
      setTitle(alert.title ?? '알림')
    }
  }, [alert])

  return (
    <Popup
      isOpen={isOpen}
      onClose={handleClose}
      minWidth={'300px'}
      title={title}
      hideCancelButton
    >
      <div style={{ lineHeight: '1.5' }}>{children}</div>
    </Popup>
  )
}

export default Alert
