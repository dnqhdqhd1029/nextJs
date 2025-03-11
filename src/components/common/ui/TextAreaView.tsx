import { useEffect, useRef, useState } from 'react'

interface Props {
  value?: string
}

const CommentView = ({ value }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [viewContent, setViewContent] = useState(value)

  useEffect(() => {
    if (value == undefined) {
      return
    }

    setViewContent(value)

    const textarea = textareaRef.current

    if (textarea) {
      const height = textarea.scrollHeight

      if (height < 40) {
        textarea.style.height = '25px'
      } else {
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }
  }, [value])

  useEffect(() => {
    return () => {
      setViewContent('')
    }
  }, [])

  return (
    <textarea
      ref={textareaRef}
      value={viewContent}
      readOnly
      className="textarea__view"
    />
  )
}

export default CommentView
