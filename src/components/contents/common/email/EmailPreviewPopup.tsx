import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { BaseResponseCommonObject, MailTemplatesFooterDto } from '~/types/api/service'
import { useGetMailTemplateFooter } from '~/utils/api/email/useGetMailTemplateFooter'
import { useEmail } from '~/utils/hooks/contents/email/useEmail'

const EmailPreviewPopup = () => {
  const [footer, setFooter] = useState<string>('')
  const { userInfo, previewPopup, emailPopup, editorData, initPreviewPopup } = useEmail()
  // const { data: footerData, refetch: footerRefetch } = useGetMailTemplateFooter('USER_MAIL', { enabled: false })
  //
  // useEffect(() => {
  //   footerRefetch()
  // }, [])
  //
  // useEffect(() => {
  //   if (footerData) {
  //     const { status, data, message } = footerData as BaseResponseCommonObject
  //     if (status === 'S') {
  //       setFooter(((data as MailTemplatesFooterDto).body ?? '').replace('${SENDER_NAME}', userInfo.name as string))
  //     } else {
  //       console.log(message?.message)
  //     }
  //   }
  // }, [footerData])

  return (
    <>
      <Popup
        isOpen={previewPopup.isOpen}
        onClose={() => initPreviewPopup()}
        hasCloseButton={emailPopup.title !== ''}
        width={800}
        title={emailPopup.title}
        height={'90vh'}
        showFooter={emailPopup.title === ''}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'닫기'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={() => initPreviewPopup()}
            />
          </div>
        }
      >
        {/* <div className="popup-contents__section"> */}
        <div className="popup-template__group">
          <p>
            보내는 사람: {emailPopup.name}
            <br />
            받는사람: {previewPopup.receiver}
          </p>
          {/*@ts-ignore*/}
          <div
            className="mail-html-css"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(editorData?.replaceAll('ruby-text', 'block'), {
                ADD_ATTR: ['target', 'rel'],
              }),
            }}
          />
          {emailPopup.filesList.length > 0 && (
            <>
              <h3>첨부파일</h3>
              {emailPopup.filesList.map((e, index) => (
                <p key={index.toString() + e.id}>
                  <Button
                    elem="a"
                    url={''}
                    label={e.filename ? e.filename : e.file?.name || ''}
                    cate={'link-text'}
                    size={'s'}
                    color={'gray-500'}
                  />
                </p>
              ))}
            </>
          )}
        </div>
        <div
          className="popup-template__footer"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(footer, {
              FORBID_ATTR: ['href', 'target'],
            }),
          }}
        ></div>
        {/* </div> */}
      </Popup>
    </>
  )
}

export default EmailPreviewPopup
