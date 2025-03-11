/**
 * @file EmailPreview.tsx
 * @description 이메일 미리보기
 */

import { SyntheticEvent, useRef } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'

interface Props {
  isOpen: boolean
  onClose: () => void
  emailHtml: string
}

const CreateCustomSearchPopup = ({ isOpen, emailHtml, onClose }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleIframeLoaded = (e: SyntheticEvent<HTMLIFrameElement, Event>) => {
    console.log('>> handleIframeLoaded', e)
    iframeRef.current?.contentWindow?.postMessage(
      {
        html: emailHtml,
      },
      '*'
    )
  }

  return (
    <Popup
      isOpen={isOpen}
      title={'이메일 미리보기'}
      onClose={onClose}
      minWidth={1200}
      hasCloseButton
      contentSectionOverflow={'visible'}
      buttons={
        <div className="popup-footer__section">
          <Button
            label={'확인'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            onClick={onClose}
          />
        </div>
      }
    >
      <iframe
        ref={iframeRef}
        src={'/editor/preview.html'}
        onLoad={handleIframeLoaded}
        className="iframe-content__container"
        style={{ height: '700px', overflow: 'hidden' }}
      />
    </Popup>
  )
}

export default CreateCustomSearchPopup
