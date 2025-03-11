/**
 * @file Popup.tsx
 * @description 팝업 컴포넌트
 */
import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

import Backdrop from '~/components/common/ui/Backdrop'
import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Portal from '~/components/common/utils/Portal'

interface Props {
  /** 보이기 여부 */
  isOpen: boolean

  /** 하단 취소 버튼 */
  hideCancelButton?: boolean

  /** 우상단 닫기 버튼 */
  hasCloseButton?: boolean

  /** max-width */
  maxWidth?: number | string

  /** min-width */
  minWidth?: number | string

  /** width */
  width?: number | string

  /** height */
  height?: number | string

  /* minHeight */
  minHeight?: number | string

  /* maxHeight */
  maxHeight?: number | string

  /** 제목 */
  title?: string

  /** 제목 컨텐츠 */
  titleChildren?: ReactNode

  /** 팝업 내용 */
  children?: ReactNode

  /** 하단 버튼 customizing */
  buttons?: ReactNode

  /** Backdrop 클릭 닫기 여부 */
  backdropClose?: boolean

  /** 컨텐츠 section css overflow */
  contentSectionOverflow?: 'auto' | 'hidden' | 'scroll' | 'visible' | 'inherit' | 'initial' | 'unset'

  /** footer 보이기 */
  showFooter?: boolean

  /** className */
  className?: string

  /** style */
  style?: CSSProperties

  /** Popup delay show */
  lazyShow?: boolean

  /** 닫기 이벤트 */
  onClose: () => void

  /** 확인 이벤트 */
  onConfirm?: () => void

  onSizeCalcurated?: (width: number, height: number) => void

  backdropStyle?: CSSProperties

  contentClassName?: string
  contentStyle?: CSSProperties

  hasCloseButtonLoading?: boolean
}

const Popup = ({
  isOpen,
  onClose,
  maxWidth,
  minWidth,
  minHeight,
  maxHeight,
  width,
  height,
  hideCancelButton = false,
  title,
  titleChildren,
  children,
  hasCloseButton = false,
  buttons,
  backdropClose = true,
  onConfirm,
  contentSectionOverflow = 'auto',
  style,
  lazyShow,
  className,
  showFooter = true,
  onSizeCalcurated,
  backdropStyle,
  contentClassName,
  contentStyle,
  hasCloseButtonLoading,
}: Props) => {
  const popupRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [backdropStyles, setBackdropStyles] = useState<CSSProperties>({})

  const popupTransition = { type: 'easeIn', duration: 0.2 }

  const handleClose = () => {
    onClose()
  }

  const handleBackdropClose = () => {
    if (backdropClose) {
      handleClose()
    }
  }

  useEffect(() => {
    setIsPopupOpen(isOpen)

    setTimeout(() => {
      const width = popupRef.current?.clientWidth ?? 0
      const height = popupRef.current?.clientHeight ?? 0

      onSizeCalcurated && onSizeCalcurated(width, height)
    }, 300)
  }, [isOpen])

  useEffect(() => {
    if (backdropStyle) {
      setBackdropStyles(backdropStyle)
    }
  }, [backdropStyle])

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn('popup-parent-container', className)}
            ref={containerRef}
            role="presentation"
            initial="closed"
            animate="open"
            exit="closed"
            transition={popupTransition}
            style={style}
          >
            <Backdrop
              isOpen={true}
              onClose={() => handleBackdropClose()}
              backdropClose={true}
              style={backdropStyles}
            />
            <div
              className="popup__section"
              style={{
                maxWidth: maxWidth ? maxWidth : width,
                // minWidth: minWidth ? minWidth : width,
                // width: width ?? 'auto',
                height: height,
                minHeight: minHeight ? minHeight : height,
                maxHeight: maxHeight ? maxHeight : height,
              }}
              role="dialog"
              ref={popupRef}
            >
              {titleChildren ? (
                <div className="popup-header__section">{titleChildren}</div>
              ) : (
                <>
                  {title && (
                    <div className="popup-header__section">
                      {title && <h2 className="popup-header__title">{title}</h2>}
                    </div>
                  )}
                </>
              )}

              {hasCloseButton && (
                <div className="popup-header__close">
                  <Button
                    label={'닫기'}
                    cate={'ico-only'}
                    size={'s32'}
                    color={'secondary'}
                    icoLeft={true}
                    disabled={hasCloseButtonLoading}
                    icoLeftData={icoSvgData.iconCloseButton}
                    icoSize={16}
                    onClick={handleClose}
                  />
                </div>
              )}
              <div
                className={cn(`popup-contents__section`, contentClassName)}
                // style={{ overflow: contentSectionOverflow, ...contentStyle }}
              >
                {children}
              </div>
              {showFooter && (
                <>
                  {buttons && buttons}
                  {!buttons && (
                    <div className="popup-footer__section">
                      <Button
                        label={'확인'}
                        cate={'default'}
                        size={'m'}
                        color={'primary'}
                        onClick={onConfirm ?? handleClose}
                      />
                      {!hideCancelButton && (
                        <Button
                          label={'취소'}
                          cate={'default'}
                          size={'m'}
                          color={'link-dark'}
                          onClick={handleClose}
                        />
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  )
}
export default Popup
