/**
 * @file FileUpload.tsx
 * @description  파일 업로더 컴포넌트
 */

import { useCallback, useEffect, useRef } from 'react'

import { FileType, useFileDragAndDrop } from '~/utils/hooks/common/useFileDragAndDrop'

interface Props {
  isImage?: boolean
  title?: string
  originData: FileType[]
  originPath: string
  onChange: (e: FileType[]) => void
}

const FileUpload = (props: Props) => {
  const fileSizeUnit = 'MB'
  const fileSizeLimit = 5
  const fileLengthLimit = 5
  const customHook = useFileDragAndDrop(
    fileSizeUnit,
    fileSizeLimit,
    fileLengthLimit,
    props.originData,
    props.originPath
  )

  useEffect(() => {
    props.onChange(customHook.fileList)
  }, [customHook.fileList])

  return (
    <div className="file-uploader-button__section type-only">
      <div className="file-uploader-button__header">
        <div className="file-uploader-button__group">
          <button
            type="button"
            className="file-uploader-button__upload"
          >
            <span className="file-uploader-button__text">파일 찾기</span>
          </button>
          <input
            type="file"
            className="file-uploader-button__input"
            onChangeCapture={e => customHook.onChangeFiles(e)}
            multiple
            disabled={customHook.isUploading}
          />
        </div>
        <p className="file-uploader-button__text">5MB 이하 이미지와 문서 첨부 가능</p>
      </div>
    </div>
  )
}

export default FileUpload
