/**
 * @file Popup.tsx
 * @description Popup
 */

import { CSSProperties, ReactNode, useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useAlarm } from '~/utils/hooks/common/useAlarm'

export const MessagePopup = () => {
  const { messagePopup, setMessagePopup } = useAlarm()

  const [isOpen, setIsOpen] = useState(false)
  const [children, setChildren] = useState<ReactNode>('')
  const [title, setTitle] = useState('알림')
  const [backdropStyle, setBackdropStyle] = useState<CSSProperties>({})

  const handleCancel = () => {
    setIsOpen(false)
    messagePopup.onCancel &&
      setMessagePopup({
        title,
        message: '',
        open: false,
      })
  }

  const handleConfirm = (id: string) => {
    setIsOpen(false)
    messagePopup.onConfirm && messagePopup.onConfirm(id)
    setMessagePopup({
      title,
      message: '',
      open: false,
    })
  }

  const handlepopup = () => {
    setIsOpen(false)
    messagePopup.onConfirm && messagePopup.onConfirm()
    setMessagePopup({
      title,
      message: '',
      open: false,
    })
  }

  useEffect(() => {
    if (messagePopup.open) {
      setIsOpen(messagePopup.open)
      setChildren(messagePopup.message)
      setTitle(messagePopup.title ?? '알림')
      if (messagePopup.backdropStyle) {
        setBackdropStyle({
          ...messagePopup.backdropStyle,
          width: (messagePopup.backdropStyle.width as number) + 2,
          height: (messagePopup.backdropStyle.height as number) + 2,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '5px',
        })
      }
    }
  }, [messagePopup])

  return (
    <Popup
      isOpen={isOpen}
      onClose={handleCancel}
      title={title}
      minWidth={'300px'}
      onConfirm={handlepopup}
      backdropStyle={backdropStyle}
      buttons={
        <div className="popup-footer__section">
          <Button
            label={'취소'}
            cate={'default'}
            size={'m'}
            color={'link-dark'}
            onClick={handleCancel}
          />
          {messagePopup.buttons?.map((button, index) => (
            <Button
              key={`message-popup-button-${button.id}`}
              label={button.label}
              cate={button.cate ?? 'default'}
              size={'m'}
              color={button.color ?? 'primary'}
              onClick={handleConfirm ? () => handleConfirm(button.id) : handleCancel}
            />
          ))}
        </div>
      }
    >
      {children}
    </Popup>
  )
}

export default MessagePopup
