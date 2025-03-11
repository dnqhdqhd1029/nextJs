/**
 * @file Editor.tsx
 * @description 에디터
 */

import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import Cookie from 'js-cookie'

import FormMsg from '~/components/common/ui/FormMsg'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import { ACCESS_TOKEN_NAME } from '~/constants/common'

type contentType = 'C' | 'E'

interface Props {
  onGetEditorImage?: (dataUrl: string) => void
  onGetEditorContent?: (content: string) => void
  onSetCurrentCursorPosition?: (position: string) => void
  getEditorContentString?: string
  editorContent?: string
  height?: number
  currentCursorPosition?: string
  errorMessage?: string
  type?: contentType
}

const Editor = ({
  onGetEditorImage,
  onGetEditorContent,
  onSetCurrentCursorPosition,
  editorContent,
  getEditorContentString,
  height = 700,
  currentCursorPosition,
  errorMessage = '',
  type = 'C',
}: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [imageSrc, setImageSrc] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [previewContent, setPreviewContent] = useState<string>('')
  const [isIframeLoadCompleted, setIsIframeLoadCompleted] = useState<boolean>(false)
  const [increaseIframeSize, setIncreaseIframeSize] = useState(true)

  // const handleGetIframeContent = () => {
  //   iframeRef.current?.contentWindow?.postMessage({
  //     getContent: 'true',
  //   })
  // }

  const getMessageEvent = async (e: MessageEvent) => {
    const { height, editorContent, emailContent, previewContent, dataUrl, mouseMove, cursorPosition } = e.data

    if (iframeRef.current && height !== undefined) {
      iframeRef.current.style.height = `${Number(height.replace('px', '')) + 60}px`
    }

    if (editorContent !== undefined && type === 'C') {
      setContent(editorContent)
      onGetEditorContent && onGetEditorContent(editorContent)
    }

    if (emailContent !== undefined && type === 'E') {
      setContent(emailContent)
      onGetEditorContent && onGetEditorContent(emailContent)
    }

    if (previewContent !== undefined) {
      setPreviewContent(previewContent)
    }

    if (dataUrl !== undefined) {
      setImageSrc(dataUrl)
      onGetEditorImage && onGetEditorImage(dataUrl)
    }

    if (!!cursorPosition) {
      const { path } = JSON.parse(cursorPosition)
      if (!!editorContent) {
        !!(path[0] + path[1]) && !!onSetCurrentCursorPosition && onSetCurrentCursorPosition(cursorPosition)
      } else {
        !!onSetCurrentCursorPosition && onSetCurrentCursorPosition(cursorPosition)
      }
    }
  }

  const handleIframeLoaded = (e: SyntheticEvent<HTMLIFrameElement, Event>) => {
    setTimeout(() => {
      setIsIframeLoadCompleted(true)
    }, 300)

    if (editorContent !== undefined) {
      // console.log(currentCursorPosition)
      iframeRef.current?.contentWindow?.postMessage({
        content: editorContent,
        currentCursorPosition,
        type,
      })
    }

    const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''

    iframeRef.current?.contentWindow?.postMessage({
      setToken: accessToken,
    })

    window.addEventListener('message', getMessageEvent, false)
  }

  // useEffect(() => {
  //   if (getEditorContentString === undefined || getEditorContentString === '') {
  //     return
  //   }

  //   handleGetIframeContent()
  // }, [getEditorContentString])

  useEffect(() => {
    if (!isIframeLoadCompleted || height === undefined) {
      return
    }

    iframeRef.current?.contentWindow?.postMessage({
      setHeight: height - 1 + 'px',
    })
  }, [isIframeLoadCompleted, height])

  useEffect(() => {
    if (editorContent !== null && editorContent !== undefined && isIframeLoadCompleted) {
      iframeRef.current?.focus()
      iframeRef.current?.contentWindow?.postMessage({
        content: editorContent,
      })
    }
  }, [editorContent])

  return (
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
        id="editor-iframe"
        ref={iframeRef}
        src={'/editor/index.html'}
        onLoad={handleIframeLoaded}
        className={cn('iframe-content__container editor__error', {
          'error-message__frame': errorMessage !== '',
        })}
        style={{ minHeight: `${height + 60}px`, border: 'none' }}
      />
      {errorMessage !== '' && (
        <FormMsg
          type="error"
          msg={errorMessage}
        />
      )}
    </div>
  )
}

export default Editor
