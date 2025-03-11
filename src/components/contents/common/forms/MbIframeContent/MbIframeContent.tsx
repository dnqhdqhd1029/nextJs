/**
 * @file
 * @description
 */

import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { v1 as uuid } from 'uuid'

interface Props {
  content?: string
  iframeUrl?: string
}

const Component = ({ content, iframeUrl = '/static/html/content.html' }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeContent, setIframeContent] = useState<string>('')
  const [iframeHeight, setIframeHeight] = useState<string>('0px')
  const iframeId = 'iframe' + uuid()

  const handleResize = () => {
    iframeRef.current?.contentWindow?.postMessage({ getHeight: 'true' }, '*')
  }

  const handleMessage = (e: MessageEvent<{ height?: number }>) => {
    const { height } = e.data
    if (height) {
      setIframeHeight(`${height}px`)
    }
  }

  const handleIframeLoaded = (e: SyntheticEvent<HTMLIFrameElement, Event>) => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        firstLoad: 'true',
        getHeight: 'true',
        content: iframeContent,
      },
      '*'
    )
  }

  useEffect(() => {
    if (content === undefined) {
      return
    }

    setIframeContent(content)
    iframeRef.current?.contentWindow?.postMessage({ content }, '*')
  }, [content])

  useEffect(() => {
    window.addEventListener('resize', handleResize, false)
    window.addEventListener('message', handleMessage, false)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <iframe
      id={iframeId}
      ref={iframeRef}
      src={iframeUrl}
      onLoad={handleIframeLoaded}
      className="iframe-content__container no-style"
      style={{
        height: iframeHeight,
      }}
    />
  )
}

export default Component
