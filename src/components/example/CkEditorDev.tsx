/**
 * @file CkEditor.tsx
 * @description CK Editor 예제
 */

import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'

import Backdrop from '~/components/common/ui/Backdrop'
import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Loader from '~/components/common/ui/Loader'
import Skeleton from '~/components/common/ui/Skeleton'
import EmailPreview from '~/components/example/EmailPreview'
import { EMAIL_PATTERN, EMAIL_PATTERN_DESCRIPTION, USESTATE_DELAY_TIME } from '~/constants/common'
import { apiPostSendTestEmail } from '~/utils/api/email/usePostSendTestEmail'
import { openToast } from '~/utils/common/toast'

const CkEditor = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [imageSrc, setImageSrc] = useState<string>('')
  const [iframeHeight, setIframeHeight] = useState<string>('742px')
  const [content, setContent] = useState<string>('')
  const [previewContent, setPreviewContent] = useState<string>('')
  const titleRef = useRef<string>('CKEDITOR 테스트 메일')
  // const emailRef = useRef<string>('namgyu.jeon@newswire.co.kr')
  const emailRef = useRef<string>('sim.jaeho@newswire.co.kr')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isIframeLoadCompleted, setIsIframeLoadCompleted] = useState<boolean>(false)
  const [isEmailPreviewOpen, setIsEmailPreviewOpen] = useState<boolean>(false)

  const handleSendMail = async () => {
    iframeRef.current?.contentWindow?.postMessage({
      getContent: 'true',
    })
  }

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    titleRef.current = e.target.value
  }

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    emailRef.current = e.target.value
  }

  const handlePreviewEmail = async () => {
    iframeRef.current?.contentWindow?.postMessage({
      getPreviewContent: 'true',
    })
  }

  const handleMakeScreenshot = () => {
    iframeRef.current?.contentWindow?.postMessage({
      makeScreenshot: 'true',
    })
  }

  const getMessageEvent = async (e: MessageEvent) => {
    const { height, editorContent, previewContent, dataUrl } = e.data
    if (height !== undefined) {
      setIframeHeight(height)
      setIsIframeLoadCompleted(true)

      console.log('>> 높이 내려옴')

      // iframeRef.current?.contentWindow?.postMessage({
      //   imageUrl:
      //     'https://file.newswire.co.kr/data/datafile2/thumb_640/2023/11/1893456181_20231125163629_7271189094.jpg',
      // })
    }

    if (editorContent !== undefined) {
      //@ts-ignore
      // console.log('>> editorContent', editorContent)
      setContent(editorContent)
    }

    if (previewContent !== undefined) {
      //@ts-ignore
      // console.log('>> previewContent', previewContent)
      setPreviewContent(previewContent)
    }

    if (dataUrl !== undefined) {
      console.log('>> 받은 dataUrl', dataUrl)
      setImageSrc(dataUrl)
    }
  }

  const excuteSendingEmailProcess = async () => {
    setIsLoading(true)

    const result = await apiPostSendTestEmail({
      title: titleRef.current,
      to: emailRef.current,
      context: content,
    })

    console.log('>> 메일 보냄', result)
    if (result.status === 'S') {
      openToast('정상적으로 메일이 발송되었습니다.', 'success')
    } else if (result.status === 'F') {
      openToast('메일 발송이 실패하였습니다.', 'error')
    }

    setTimeout(() => {
      setIsLoading(false)
      setContent('')
    }, 1000)
  }

  const handleEmailPreviewClose = () => {
    setIsEmailPreviewOpen(false)
    setPreviewContent('')
  }

  const handleIframeLoaded = (e: SyntheticEvent<HTMLIFrameElement, Event>) => {
    console.log('>> handleIframeLoaded', e)
    setTimeout(() => {
      setIsIframeLoadCompleted(true)
    }, 300)

    window.addEventListener('message', getMessageEvent, false)
  }

  useEffect(() => {
    if (content && content !== '') {
      if (titleRef.current === '' || emailRef.current === '' || content === '') {
        alert('모든 항목은 필수입니다.')
        return
      }

      if (!EMAIL_PATTERN.test(emailRef.current)) {
        alert(EMAIL_PATTERN_DESCRIPTION)
        return
      }

      // if (!emailRef.current.includes('@newswire.co.kr')) {
      //   alert('뉴스와이어 이메일만 가능합니다.')
      //   return
      // }

      excuteSendingEmailProcess()
    }
  }, [content])

  useEffect(() => {
    if (previewContent !== '') {
      setIsEmailPreviewOpen(true)
    }
  }, [previewContent])

  return (
    <>
      <div className="mb-container">
        <div className="mb-common-inner">
          <div
            className="mb-contents"
            style={{ position: 'relative' }}
          >
            {isLoading && (
              <>
                <Loader
                  zIndex={10000}
                  size={'s36'}
                  screen={'absolute'}
                  top={'40%'}
                />
                <Backdrop
                  isOpen={true}
                  style={{ position: 'absolute', background: 'rgba(0, 0, 0, 0.3)' }}
                />
              </>
            )}

            <div style={{ margin: '0 auto', width: '1200px', padding: '50px 0 0' }}>
              <h1 style={{ margin: '0 0 20px' }}>이메일 보내기</h1>
              <div>
                <FormInputText
                  title={'메일 제목'}
                  required
                  value={titleRef.current}
                  onChange={handleChangeTitle}
                />
              </div>
              <div>
                <FormInputText
                  title={'보낼 주소'}
                  required
                  value={emailRef.current}
                  onChange={handleChangeEmail}
                />
              </div>
              <div>
                <FormTitle
                  title={'내용'}
                  required
                />
                <div className="iframe-content__container__wrapper position-relative">
                  {!isIframeLoadCompleted && (
                    <>
                      <Skeleton
                        width={'100%'}
                        height={'100%'}
                        style={{
                          borderRadius: '4px 4px 0 0',
                        }}
                        wrapperStyle={{
                          boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
                          borderRadius: '4px 4px 0 0',
                          position: 'absolute',
                          top: '0',
                          left: '0',
                          right: 0,
                          height: '40px',
                          zIndex: 100,
                        }}
                      />
                      <Skeleton
                        width={'100%'}
                        height={'100%'}
                        style={{
                          borderRadius: '0 0 4px 4px',
                        }}
                        wrapperStyle={{
                          boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
                          borderRadius: '0 0 4px 4px',
                          position: 'absolute',
                          top: '40px',
                          left: '0',
                          right: 0,
                          bottom: 0,
                          zIndex: 100,
                        }}
                      />
                    </>
                  )}

                  <iframe
                    ref={iframeRef}
                    src={'/editor/index_dev.html'}
                    onLoad={handleIframeLoaded}
                    className="iframe-content__container"
                    style={{ height: iframeHeight, overflow: 'hidden' }}
                  />
                </div>
              </div>
              <div className="display-flex justify-content__flex-end pt-20 pb-50">
                <Button
                  label={'미리보기'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                  onClick={handlePreviewEmail}
                  className="mr-12"
                />
                <Button
                  label={'템플릿 스크린샷'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                  onClick={handleMakeScreenshot}
                  className="mr-12"
                />
                <Button
                  label={'메일 보내기'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                  onClick={handleSendMail}
                />
              </div>
              <div>
                <img
                  src={imageSrc}
                  alt=""
                />
              </div>
              {/*{content !== '' && (*/}
              {/*  <div*/}
              {/*    style={{ marginTop: '50px', display: 'none' }}*/}
              {/*    dangerouslySetInnerHTML={{ __html: content }}*/}
              {/*    id="iframe-content-html"*/}
              {/*  ></div>*/}
              {/*)}*/}
            </div>
          </div>
        </div>
      </div>

      {previewContent !== '' && (
        <EmailPreview
          isOpen={isEmailPreviewOpen}
          onClose={handleEmailPreviewClose}
          emailHtml={previewContent}
        />
      )}
    </>
  )
}

export default CkEditor
