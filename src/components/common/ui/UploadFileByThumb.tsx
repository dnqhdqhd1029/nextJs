/**
 * @file UploadFileByThumb.tsx
 * @description 파일 업로더 컴포넌트
 */
import { useEffect } from 'react'
import cn from 'classnames'

import Backdrop from '~/components/common/ui/Backdrop'
import Loader from '~/components/common/ui/Loader'
import { ACCEPT_IMAGE_EXT } from '~/constants/common'
import { FileSizeUnit } from '~/types/common'
import { openToast } from '~/utils/common/toast'
import { useFileUpload } from '~/utils/hooks/common/useFileUpload'
import { FileType } from '~/utils/hooks/common/useFileUpload'

interface Props {
  fileSizeLimit?: number
  fileSizeUnit?: FileSizeUnit
  fileLengthLimit?: number
  onFileChanged: (files: FileType[]) => void
}

const UploadFileByThumb = ({ onFileChanged, fileSizeLimit = 5, fileSizeUnit = 'MB', fileLengthLimit = 1 }: Props) => {
  const { currentFiles, isUploading, onFileChange, onDeleteUserFile, errorStatus } = useFileUpload({
    fileSizeUnit,
    fileSizeLimit,
    fileLengthLimit,
    onlyOneFile: true,
  })

  useEffect(() => {
    if (errorStatus) {
      console.log('>> 에러 발생 : ', errorStatus)
    }
  }, [errorStatus])

  useEffect(() => {
    if (currentFiles) {
      if (currentFiles.length > 0) {
        if (!currentFiles[0].isImage) {
          openToast('jpg, gif, png 이미지만 등록 가능합니다.', 'error')
        } else {
          onFileChanged && onFileChanged(currentFiles)
        }
      }
    }
  }, [currentFiles])

  return (
    <div className="file-uploader-thumb__section">
      <div className="file-uploader-thumb__area">
        <div className="file-uploader-thumb__group">
          {currentFiles &&
            currentFiles.length > 0 &&
            currentFiles[0].isImage !== undefined &&
            currentFiles[0].isImage && (
              <>
                <img
                  src={currentFiles[0].fileSrc}
                  alt=""
                />
                <p>{currentFiles[0].fileSrc}</p>
              </>
            )}
        </div>
        <div className="file-uploader-thumb__button position-relative">
          <p className={cn('file-uploader-thumb__button-text', { disabled: isUploading })}>파일 선택</p>
          <input
            type="file"
            className="file-uploader-thumb__button-input"
            onChangeCapture={onFileChange}
            disabled={isUploading}
            accept={ACCEPT_IMAGE_EXT}
          />
          {isUploading && (
            <>
              <Backdrop
                isOpen={isUploading}
                className="position-absolute border__rounded"
              />
              <Loader screen={'absolute'} />
            </>
          )}
        </div>
      </div>
      <p className="font-body__regular">
        사진은 jpg, png, gif 파일로 최대 {fileSizeLimit}
        {fileSizeUnit} 이내
      </p>
    </div>
  )
}

export default UploadFileByThumb
