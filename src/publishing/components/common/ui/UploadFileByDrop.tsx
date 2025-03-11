/**
 * @file UploadImageByDrop.tsx
 * @description drop 기능을 이용해 파일 업로더 컴포넌트
 */

import { useEffect } from 'react'

import { useFileUpload } from '~/utils/hooks/common/useFileUpload'

const UploadImageByDrop = () => {
  const fileSizeUnit = 'MB'
  const fileSizeLimit = 5
  const { isUploading, currentFiles, onFileChange, onFileDrop, onDeleteUserFile, errorStatus } = useFileUpload({
    fileSizeUnit,
    fileSizeLimit,
  })

  useEffect(() => {
    console.log('>> currentFiles', currentFiles)
  }, [currentFiles])

  useEffect(() => {
    console.log('>> 에러 발생 : ', errorStatus)
  }, [errorStatus])

  useEffect(() => {
    console.log('>> isUploading', isUploading)
  }, [isUploading])

  return (
    <div className="file-uploader__section file-type2">
      <h2
        className="file-uploader__title"
        onDrop={onFileDrop}
      >
        내용
      </h2>
      <section className={`fui-dropzone-root ${isUploading ? 'is-disabled' : ''}`}>
        <div className="files-ui-dropzone-children-container">
          <label> 업로드할 파일을 이 영역으로 클릭하거나 드래그합니다.</label>
          <input
            type="file"
            className="file-uploader__input"
            onChangeCapture={onFileChange}
            multiple
            disabled={isUploading}
          />
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

export default UploadImageByDrop
