import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Pagination from '~/components/common/ui/Pagination'
import Skeleton from '~/components/common/ui/Skeleton'
import InputMediaList from '~/components/contents/distribution/common/Popup/inputMediaList'
import { useNewswireRelease } from '~/utils/hooks/contents/newswireRelease/useNewswireRelease'

const fileSizeUnit = 'MB'
const fileSizeLimit = 5

const InputMediaPopupFileContent = () => {
  const {
    inputMediaPopup,
    setInputMediaPopupSizeAction,
    setInputMediaFileImagePopupAction,
    mediaUploadFile,
    setInputMediaFileCheckPopupAction,
    setInputMediaImageCheckPopupAction,
    setDeleteInputMediaImagePopupAction,
  } = useNewswireRelease()
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const dragRef = useRef<HTMLDivElement | null>(null)

  const onChangeFiles = useCallback(
    async (e: ChangeEvent<HTMLInputElement> | any) => {
      let selectFiles = []
      if (e.type === 'drop') {
        selectFiles = e.dataTransfer.files
      } else {
        selectFiles = e.target.files
      }
      if (selectFiles && selectFiles.length > 0) {
        const result = await mediaUploadFile(selectFiles, fileSizeUnit, fileSizeLimit, 'file')
        result.length > 0 && (await setInputMediaFileImagePopupAction(result, inputMediaPopup))
      }
    },
    [inputMediaPopup.imageList]
  )

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer?.files) {
      setIsDragging(true)
    }
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault()
      e.stopPropagation()

      onChangeFiles(e)
      setIsDragging(false)
    },
    [onChangeFiles]
  )

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn)
      dragRef.current.addEventListener('dragleave', handleDragOut)
      dragRef.current.addEventListener('dragover', handleDragOver)
      dragRef.current.addEventListener('drop', handleDrop)
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop])

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener('dragenter', handleDragIn)
      dragRef.current.removeEventListener('dragleave', handleDragOut)
      dragRef.current.removeEventListener('dragover', handleDragOver)
      dragRef.current.removeEventListener('drop', handleDrop)
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop])

  useEffect(() => {
    initDragEvents()
    return () => resetDragEvents()
  }, [initDragEvents, resetDragEvents])

  return (
    <ul className="interval-mt28">
      <li>
        <p className="font-body__regular">아래에서 파일을 선택하거나, 새로운 파일을 추가하세요</p>
      </li>
      <li>
        <div
          className="file-uploader__section file-type2"
          ref={dragRef}
        >
          <section className={cn('fui-dropzone-root', { 'is-disabled': isDragging })}>
            <div className="files-ui-dropzone-children-container">
              <label htmlFor="fileUpload_inputMediaPopup_file">
                {' '}
                클릭하거나 드래그해 파일을 올리세요.
                <span>여러 개를 한꺼번에 첨부할 수 있습니다. 최대 파일 크기는 5MB.</span>
              </label>
              <input
                id={'fileUpload_inputMediaPopup_file'}
                type="file"
                className="file-uploader__input"
                onChangeCapture={onChangeFiles}
                multiple={true}
                style={{ display: 'none' }}
              />
            </div>
          </section>
        </div>
      </li>
      <li>
        {inputMediaPopup.isLoading ? (
          <div className="popup-file-list__group">
            <div className="popup-file-list__upload">
              <div className="file-uploader-button__list">
                <ul className="file-uploader-button-list__group">
                  {Array.from({ length: 10 }, () => Array(10).fill(0)).map((e, index) => (
                    <div
                      style={{ width: 1074, height: 45, margin: '7px 12px' }}
                      key={index}
                    >
                      <Skeleton
                        width={'1074px'}
                        height={'45px'}
                      />
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="popup-file-list__group">
              <div className="popup-file-list__upload">
                <div className="file-uploader-button__list">
                  <ul className="file-uploader-button-list__group">
                    {inputMediaPopup.filesList &&
                      inputMediaPopup.filesList.map((e, index) => (
                        <InputMediaList
                          key={index.toString() + e.id + 'file-uploader-list__area fileList'}
                          item={e}
                          inputMediaPopup={inputMediaPopup}
                          setInputMediaFileCheckPopupAction={setInputMediaFileCheckPopupAction}
                          setInputMediaImageCheckPopupAction={setInputMediaImageCheckPopupAction}
                          setDeleteInputMediaImagePopupAction={setDeleteInputMediaImagePopupAction}
                        />
                      ))}
                  </ul>
                </div>
              </div>
              <div
                className="popup-file-list__pagination"
                style={{ paddingBottom: 20, paddingTop: 20 }}
              >
                <Pagination
                  type={'n1'}
                  viewCount={inputMediaPopup.size}
                  page={inputMediaPopup.page}
                  count={inputMediaPopup.totalPageCount}
                  onPageChange={e => setInputMediaPopupSizeAction(e, inputMediaPopup)}
                />
              </div>
            </div>
          </>
        )}
      </li>
    </ul>
  )
}

export default InputMediaPopupFileContent
