/**
 * @file UploadFileByInput.tsx
 * @description 파일 업로더 컴포넌트
 */
import { useEffect } from 'react'
import cn from 'classnames'

import type { UploadFileProps } from '~/utils/hooks/common/useFileUpload'
import { useFileUpload } from '~/utils/hooks/common/useFileUpload'

interface UploadFileByInputProps extends UploadFileProps {
  type?: string
}

const UploadFileByInput = ({
  type = 'file-type1',
  fileSizeLimit,
  fileSizeUnit,
  onlyOneFile,
}: UploadFileByInputProps) => {
  const { currentFiles, isUploading, onFileChange, onDeleteUserFile, errorStatus } = useFileUpload({
    fileSizeUnit,
    fileSizeLimit,
    onlyOneFile,
  })

  useEffect(() => {
    if (errorStatus) {
      console.log('>> 에러 발생 : ', errorStatus)
    }
  }, [errorStatus])

  return (
    <div className={cn('file-uploader__section', type)}>
      <h2 className="file-uploader__title">첨부</h2>
      <div className="file-uploader__button-container">
        <button
          type="button"
          className="file-uploader__button"
          disabled={isUploading}
        >
          <span className="file-uploader__button-text">파일 찾기</span>
        </button>
        <input
          type="file"
          className="file-uploader__input"
          onChangeCapture={onFileChange}
          multiple
          disabled={isUploading}
        />
        <p className="file-uploader__desc">
          {fileSizeLimit}
          {fileSizeUnit} 이하 이미지와 문서 첨부 가능
        </p>
      </div>
      {currentFiles && currentFiles.length > 0 && (
        <div className="file-uploader__list-container">
          <ul className="file-uploader__list">
            {currentFiles.map((item, i) => (
              <li
                className="file-uploader__list-item"
                key={item.id}
              >
                <div>
                  <p className="file-uploader__list-item-title">
                    {item.file?.name}
                    {/*({item.size}*/}
                    {/*{fileSizeUnit})*/}
                  </p>
                  {/*<div>{item.isImage}</div>*/}

                  {/*{item.isImage && (*/}
                  {/*  <>*/}
                  {/*    <p>*/}
                  {/*      size: {item.width} X {item.height}*/}
                  {/*    </p>*/}
                  {/*    <p>*/}
                  {/*      image:{' '}*/}
                  {/*      <img*/}
                  {/*        src={item.fileSrc}*/}
                  {/*        alt=""*/}
                  {/*        width={100}*/}
                  {/*        height={100}*/}
                  {/*      />*/}
                  {/*    </p>*/}
                  {/*  </>*/}
                  {/*)}*/}
                </div>
                <button
                  type="button"
                  className="file-uploader__list-item-delete"
                  onClick={e => onDeleteUserFile(item)}
                >
                  파일 삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default UploadFileByInput
