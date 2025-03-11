/**
 * @file UploadImageByInput.tsx
 * @description 파일 업로더 컴포넌트
 */
import { useEffect, useState } from 'react'

import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { useFileUpload } from '~/utils/hooks/common/useFileUpload'

const UploadImageByInput = () => {
  // fileSizeUnit => 기획서 기준 KB
  const fileSizeUnit = 'MB'
  const limitedFileSize = 5
  // const { currentFiles, isUploading, onFileChange, onDeleteUserFile, errorStatus } = useFileUpload({ fileSizeUnit, limitedFileSize })
  const { currentFiles, isUploading, onFileChange, onDeleteUserFile, errorStatus } = useFileUpload({ fileSizeUnit })

  // 업로드 버튼, 마우스 효과 관련
  const [mouse, setMouse] = useState('')

  // 업로드한 이미지 클릭 시 (기획서 참고, 기능 개발)
  const [thumb, setThumb] = useState(false)

  useEffect(() => {
    console.log('>> currentFiles', currentFiles)
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
              <div className="file-uploader-list-button__group">
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
                  onMouseOver={() => setMouse('type-over')}
                  onMouseDown={() => setMouse('type-press')}
                  onMouseLeave={() => setMouse('')}
                  onMouseUp={() => setMouse('')}
                  multiple
                  disabled={isUploading}
                />
              </div>
            </div>
          </div>
        </li>

        {/* 서버에서 등록이 안 됨. 예시 이미지 */}
        <li>
          <div className="file-uploader-list__group">
            <div className="file-uploader-list-item__section">
              <button
                type="button"
                className="file-uploader-list-item__delete"
              >
                <IcoSvg data={icoSvgData.trash} />
                <span className="hidden">Delete (삭제)</span>
              </button>

              {/* 클릭한 이미지에 한 해서 is-selected 클래스 추가 */}
              <div
                className="file-uploader-list-item__thumb"
                onClick={() => setThumb(true)}
              >
                <img
                  src="/assets/png/temp.jpg"
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <p className="file-uploader-list-item__text">544 X 744 (0.01 MB)</p>
              <p className="file-uploader-list-item__text">선택 전 sample.jpg</p>
            </div>
          </div>
        </li>
        <li>
          <div className="file-uploader-list__group">
            <div className="file-uploader-list-item__section">
              <button
                type="button"
                className="file-uploader-list-item__delete"
              >
                <IcoSvg data={icoSvgData.trash} />
                <span className="hidden">Delete (삭제)</span>
              </button>

              {/* 클릭한 이미지에 한 해서 is-selected 클래스 추가 */}
              <div
                className="file-uploader-list-item__thumb is-selected"
                onClick={() => setThumb(true)}
              >
                <img
                  src="/assets/png/temp.jpg"
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <p className="file-uploader-list-item__text">544 X 744 (0.01 MB)</p>
              <p className="file-uploader-list-item__text">선택 후 sample.jpg</p>
            </div>
          </div>
        </li>

        {currentFiles &&
          currentFiles.length > 0 &&
          currentFiles.map((item, i) => (
            <li key={item.id}>
              <div className="file-uploader-list__group">
                <div className="file-uploader-list-item__section">
                  <button
                    type="button"
                    className="file-uploader-list-item__delete"
                    onClick={e => onDeleteUserFile(item)}
                  >
                    <IcoSvg data={icoSvgData.trash} />
                    <span className="hidden">Delete (삭제)</span>
                  </button>

                  {/* 클릭한 이미지에 한 해서 is-selected 클래스 추가 */}
                  <div
                    className={`file-uploader-list-item__thumb ${thumb ? 'is-selected' : ''}`}
                    onClick={() => setThumb(true)}
                  >
                    <img
                      src={item.fileSrc}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </div>
                  <p className="file-uploader-list-item__text">
                    {item.width} X {item.height} ({item.size} {fileSizeUnit})
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

export default UploadImageByInput
