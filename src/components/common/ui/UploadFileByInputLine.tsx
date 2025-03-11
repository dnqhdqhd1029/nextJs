/**
 * @file UploadFileByInputLine.tsx
 * @description 라인 형식의 파일 업로더 컴포넌트
 */

import { useEffect, useState } from 'react'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { getCurrencyFormat } from '~/utils/common/number'
import { FileType, useFileUpload } from '~/utils/hooks/common/useFileUpload'

interface ExtendedFileType extends FileType {
  checked: boolean
}

const UploadFileByInputLine = () => {
  const [extendedFiles, setExtendedFiles] = useState<ExtendedFileType[]>([])
  const { currentFiles, isUploading, onFileChange, onDeleteUserFile, errorStatus } = useFileUpload({
    fileSizeUnit: 'KB',
    fileSizeLimit: 3096,
    fileLengthLimit: 9999,
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

  return (
    <div className="file-uploader-button__section">
      <ul className="interval-mt28">
        <li>
          <div className="popup-file-list__header">
            <p className="font-body__regular">
              ppt, pdf, xls, zip, hwp, doc 파일 형식의 3MB 이하 파일을 업로드 할 수 있습니다.
              <br />
              아래에서 파일을 선택하거나, 새로운 파일을 추가하세요.
            </p>

            <div className="file-uploader-button__header">
              <div className="file-uploader-button__group">
                <button
                  type="button"
                  className="file-uploader-button__upload"
                >
                  <span className="file-uploader-button__text">파일 업로드</span>
                </button>
                <input
                  type="file"
                  className="file-uploader-button__input"
                  multiple
                  onChangeCapture={onFileChange}
                  disabled={isUploading}
                  accept=".ppt, .PPT, .pdf, .PDF, .xls, .XLS, .xlsx, .XLSX, .zip, .ZIP, .hwp, .HWP, .doc, .DOC"
                />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="popup-file-list__group">
            <div className="file-uploader-button__list">
              <ul className="file-uploader-button-list__group">
                {extendedFiles &&
                  extendedFiles.length > 0 &&
                  extendedFiles.map(item => (
                    <li
                      key={item.id}
                      onClick={() => handleToggleThumb(item)}
                    >
                      <div className={cn('file-uploader-button-list__item', { 'is-selected': item.checked })}>
                        <p className="file-uploader-button-item__name">{item.file?.name}</p>
                        <p className="file-uploader-button-item__size">
                          {getCurrencyFormat(Math.round(item.size ?? 0))} KB
                        </p>
                        <button
                          type="button"
                          className="file-uploader-button-item__delete"
                          onClick={() => handleToggleThumb(item)}
                        >
                          <IcoSvg data={icoSvgData.trash} />
                          <span className="text">Delete (삭제)</span>
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default UploadFileByInputLine
