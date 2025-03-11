import { useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'

import Button from '~/components/common/ui/Button'
import FormMsg from '~/components/common/ui/FormMsg'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import { FileType } from '~/stores/modules/contents/email/email'
import { apiGetMediaListImage } from '~/utils/api/image/apiGetMediaListImage'
import { useNewswireRelease } from '~/utils/hooks/contents/newswireRelease/useNewswireRelease'

interface Props {
  item: FileType
  editable?: boolean
}
const UploadImageListItem = (props: Props) => {
  const {
    mediaPopup,
    userSelectGroup,
    setEditorMediaFileCheckPopupAction,
    setEditorMediaImageCheckPopupAction,
    setDeleteMediaImagePopupAction,
    contentPageDataDeleteUserFile,
    contentPageData,
    contentPageDataFilesDescOnChange,
  } = useNewswireRelease()
  const [loading, setLoading] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string>('')

  const errorMsg = contentPageData.filesErrorList.find(e => e.id === props.item.id)?.errorMsg

  const checkedAction = async () => {
    if (props.item.id) {
      mediaPopup.radioSelected !== 'IMG'
        ? setEditorMediaFileCheckPopupAction(props.item, imageSrc, isChecked, mediaPopup, mediaPopup.filesItems)
        : setEditorMediaImageCheckPopupAction(props.item, imageSrc, isChecked, mediaPopup, mediaPopup.imageItems)
    }
  }

  const getImage = async () => {
    setLoading(() => true)
    const data = await apiGetMediaListImage({
      id: Number(props.item.id),
      groupId: userSelectGroup,
    })

    if (typeof data === 'string' && !!data) {
      setImageSrc(() => data)
    }
    // else openToast('미디어 자료실 이미지를 불러오는데 실패했습니다.', 'error')
    setLoading(() => false)
  }

  useEffect(() => {
    let isBoolean = false
    let list = mediaPopup.radioSelected === 'IMG' ? mediaPopup.imageItems : mediaPopup.filesItems
    const find = list.find(e => e.id === Number(props.item.id))
    isBoolean = !!find
    setIsChecked(() => isBoolean)
  }, [mediaPopup.radioSelected, mediaPopup.filesItems, mediaPopup.imageItems])

  useEffect(() => {
    let isBoolean = false
    let list = mediaPopup.radioSelected === 'IMG' ? mediaPopup.releaseImageItems : mediaPopup.releaseFilesItems
    const find = list.find(e => e.id === props.item.id)
    isBoolean = !!find
    setIsChecked(() => isBoolean)
  }, [mediaPopup.radioSelected, mediaPopup.releaseFilesItems, mediaPopup.releaseImageItems])

  useEffect(() => {
    if (props.item.id && mediaPopup.radioSelected === 'IMG') {
      getImage()
    }
  }, [props.item.id])

  console.log(props.item)
  return (
    <>
      <li>
        <div className="file-uploader-list__group no-padding">
          <div className="file-uploader-list-item__section">
            <ul className="distribute-media__list">
              <li>
                <div className="distribute-media__item">
                  <div className="distribute-media-item__thumb">
                    <Image
                      src={(props.item.id && imageSrc) || props.item.fileSrc || ''}
                      width={240}
                      height={160}
                      alt="temp 이미지"
                    />
                    {props.editable && (
                      <div className="thumb-delete">
                        <button
                          type="button"
                          className="thumb-delete__button"
                          onClick={e => contentPageDataDeleteUserFile(props.item, contentPageData)}
                        >
                          <span className="hidden">삭제</span>
                        </button>
                      </div>
                    )}
                  </div>
                  {props.editable ? (
                    <div className="distribute-media-item__textarea">
                      <div
                        className={cn('textarea__group', {
                          'is-succeeded': !contentPageData.filesErrorList.find(e => e.id === props.item.id),
                          'is-failed': contentPageData.filesErrorList.find(e => e.id === props.item.id),
                        })}
                      >
                        <textarea
                          rows={2}
                          placeholder="이미지 설명을 입력하세요."
                          value={contentPageData.filesList.find(e => e.id === props.item.id)?.description || ''}
                          onChange={e =>
                            contentPageDataFilesDescOnChange(e.target.value, props.item.id || '', contentPageData)
                          }
                          style={{
                            resize: 'none',
                          }}
                        />
                      </div>
                      {contentPageData.filesErrorList.find(e => e.id === props.item.id) && (
                        <FormMsg
                          msg={errorMsg}
                          type={'error'}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="distribute-media-item__desc">
                      {contentPageData.filesList.find(e => e.id === props.item.id)?.description || ''}
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </>
  )
}

export default UploadImageListItem
