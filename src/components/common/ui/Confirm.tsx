/**
 * @file Confirm.tsx
 * @description Confirm
 */

import { CSSProperties, ReactNode, useEffect, useState } from 'react'

import Popup from '~/components/common/ui/Popup'
import { useAlarm } from '~/utils/hooks/common/useAlarm'

export const Confirm = () => {
  const { confirm, setConfirm } = useAlarm()

  const [isOpen, setIsOpen] = useState(false)
  const [children, setChildren] = useState<ReactNode>('')
  const [title, setTitle] = useState('알림')
  const [backdropStyle, setBackdropStyle] = useState<CSSProperties>({})

  const handleCancel = () => {
    setIsOpen(false)
    confirm.onCancel && confirm.onCancel()
    setConfirm({
      title: '알림',
      message: '',
      open: false,
    })
  }

  const handleConfirm = () => {
    setIsOpen(false)
    confirm.onConfirm && confirm.onConfirm()
    setConfirm({
      title: '알림',
      message: '',
      open: false,
    })
  }

  useEffect(() => {
    if (confirm.open) {
      setIsOpen(confirm.open)
      setChildren(confirm.message)
      setTitle(confirm.title ?? '알림')
      if (confirm.backdropStyle) {
        setBackdropStyle({
          ...confirm.backdropStyle,
          width: (confirm.backdropStyle.width as number) + 2,
          height: (confirm.backdropStyle.height as number) + 2,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '5px',
        })
      }
    }
  }, [confirm])

  return (
    <Popup
      isOpen={isOpen}
      onClose={handleCancel}
      title={title}
      minWidth={'300px'}
      onConfirm={handleConfirm}
      backdropStyle={backdropStyle}
    >
      {children}
    </Popup>
  )
}

export default Confirm
