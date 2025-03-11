/**
 * @file UploadFileByDrop.tsx
 * @description drop 기능을 이용해 파일 업로더 컴포넌트
 */

import { useEffect } from 'react'
import cn from 'classnames'

import { useFileUpload } from '~/utils/hooks/common/useFileUpload'

interface Props {
  title?: string
}
const UploadFileByDrop = (props: Props) => {
  const fileSizeUnit = 'MB'
  const fileSizeLimit = 5
  const { isUploading, currentFiles, onFileChange, onFileDrop, onDeleteUserFile, errorStatus } = useFileUpload({
    fileSizeUnit,
    fileSizeLimit,
  })

  useEffect(() => {
    if (errorStatus) {
      console.log('>> 에러 발생 : ', errorStatus)
    }
  }, [errorStatus])

  return (
    <div className="file-uploader__section file-type2">
      <h2
        className="file-uploader__title"
        onDrop={onFileDrop}
      >
        {props.title}
      </h2>
      <section className={cn('fui-dropzone-root', { 'is-disabled': isUploading })}>
        <div className="files-ui-dropzone-children-container">
          <label> 클릭하거나 드래그해 파일을 올리세요.</label>
          <input
            type="file"
            className="file-uploader__input"
            onChangeCapture={onFileChange}
            multiple
            disabled={isUploading}
          />
          <p>여러 개를 한꺼번에 첨부할 수 있습니다. 최대 파일 크기는 5MB.</p>
        </div>
      </section>
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
                    {item.file?.name} ({item.size}
                    {fileSizeUnit})
                  </p>
                  {item.isImage && (
                    <>
                      <p>
                        size: {item.width} X {item.height}
                      </p>
                      <p>
                        image:{' '}
                        <img
                          src={item.fileSrc}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </p>
                    </>
                  )}
                </div>
                <button
                  type="button"
                  className="file-uploader__list-item-delete"
                  onClick={e => onDeleteUserFile(item)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default UploadFileByDrop
