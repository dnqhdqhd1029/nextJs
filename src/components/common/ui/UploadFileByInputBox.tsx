/**
 * @file UploadImageByInput.tsx
 * @description 파일 업로더 컴포넌트
 */
import { useEffect, useState } from 'react'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { ACCEPT_IMAGE_EXT } from '~/constants/common'
import { getCurrencyFormat } from '~/utils/common/number'
import type { UploadFileProps } from '~/utils/hooks/common/useFileUpload'
import { FileType, useFileUpload } from '~/utils/hooks/common/useFileUpload'

interface ExtendedFileType extends FileType {
  checked: boolean
}

const UploadFileByInputBox = ({
  fileSizeLimit = 3096,
  fileSizeUnit = 'KB',
  fileLengthLimit = 9999,
  accept = ACCEPT_IMAGE_EXT,
}: UploadFileProps) => {
  const [mouse, setMouse] = useState<string>('')
  const [extendedFiles, setExtendedFiles] = useState<ExtendedFileType[]>([])
  const { currentFiles, isUploading, onFileChange, onDeleteUserFile, errorStatus } = useFileUpload({
    fileSizeUnit,
    fileSizeLimit,
    fileLengthLimit,
  })

  const handleToggleThumb = (item: ExtendedFileType) => {
    const newFiles: ExtendedFileType[] = extendedFiles.map(extendedItem => {
      if (extendedItem.id === item.id) {
        return {
          ...extendedItem,
          checked: !extendedItem.checked,
        }
      } else {
        return {
          ...extendedItem,
          checked: false,
        }
      }
    })
    setExtendedFiles(newFiles)
  }

  useEffect(() => {
    console.log('>> currentFiles', currentFiles)
    if (currentFiles) {
      const newFiles: ExtendedFileType[] = currentFiles.map(item => {
        const sameFile: ExtendedFileType | null =
          extendedFiles.find(extendedItem => extendedItem.id === item.id) ?? null
        if (sameFile) {
          return {
            ...sameFile,
          }
        } else {
          return {
            ...item,
            checked: false,
          }
        }
      })
      setExtendedFiles(newFiles)
    }
  }, [currentFiles])

  useEffect(() => {
    console.log('>> 에러 발생 : ', errorStatus)
  }, [errorStatus])

  return (
    <div className="file-uploader-list__section">
      <ul className="file-uploader-list__area">
        <li>
          <div className="file-uploader-list__group">
            <div className="file-uploader-list-button__section">
              <div className="file-uploader-list-button__header">
                <h2 className="file-uploader-list-button__title">사진 추가</h2>
                <p className="file-uploader-list-button__desc">jpeg, gif, png 파일 업로드</p>
              </div>
              <div
                className="file-uploader-list-button__group"
                onMouseOver={() => setMouse('type-over')}
                onMouseDown={() => setMouse('type-press')}
                onMouseLeave={() => setMouse('')}
                onMouseUp={() => setMouse('')}
              >
                <button
                  type="button"
                  className={`file-uploader-list-button__upload ${mouse.length === 0 ? '' : mouse}`}
                  disabled={isUploading}
                >
                  <span className="file-uploader-list-button__text">파일 업로드</span>
                </button>
                <input
                  type="file"
                  className="file-uploader-list-button__input"
                  onChangeCapture={onFileChange}
                  multiple
                  disabled={isUploading}
                  accept={accept}
                />
              </div>
            </div>
          </div>
        </li>

        {extendedFiles &&
          extendedFiles.length > 0 &&
          extendedFiles.map(item => (
            <li key={item.id}>
              <div className="file-uploader-list__group">
                <div className="file-uploader-list-item__section">
                  <button
                    type="button"
                    className="file-uploader-list-item__delete"
                    onClick={() => onDeleteUserFile(item)}
                  >
                    <IcoSvg data={icoSvgData.trash} />
                    <span className="hidden">Delete (삭제)</span>
                  </button>

                  {/* 클릭한 이미지에 한 해서 is-selected 클래스 추가 */}
                  <div
                    className={`file-uploader-list-item__thumb ${item.checked ? 'is-selected' : ''}`}
                    onClick={() => handleToggleThumb(item)}
                  >
                    <img
                      src={item.fileSrc}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </div>
                  <p className="file-uploader-list-item__text">
                    {getCurrencyFormat(item.width)} X {getCurrencyFormat(item.height)} (
                    {getCurrencyFormat(Math.round(item.size ?? 0))} KBytes)
                  </p>
                  <p className="file-uploader-list-item__text">{item.file?.name}</p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default UploadFileByInputBox
