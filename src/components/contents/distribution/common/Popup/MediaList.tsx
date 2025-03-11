import { useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import { FileType, mediaPopupType } from '~/stores/modules/contents/email/email'
import { apiGetMediaListImage } from '~/utils/api/image/apiGetMediaListImage'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { usePressRelese } from '~/utils/hooks/contents/pressRelease/usePressRelease'

interface Props {
  item: FileType
  mediaPopup: mediaPopupType
  setEditorMediaFileCheckPopupAction: Function
  setEditorMediaImageCheckPopupAction: Function
  setDeleteMediaImagePopupAction: Function
}
const MediaList = (props: Props) => {
  const {
    item,
    mediaPopup,
    setEditorMediaFileCheckPopupAction,
    setEditorMediaImageCheckPopupAction,
    setDeleteMediaImagePopupAction,
  } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string>('')
  const { userSelectGroup } = useAppSelector(state => state.authSlice)

  const checkedAction = async () => {
    if (item.id) {
      mediaPopup.radioSelected !== 'IMG'
        ? setEditorMediaFileCheckPopupAction(item, imageSrc, isChecked, mediaPopup, mediaPopup.filesItems)
        : setEditorMediaImageCheckPopupAction(item, imageSrc, isChecked, mediaPopup, mediaPopup.imageItems)
    }
  }

  const getImage = async () => {
    setLoading(() => true)
    const data = await apiGetMediaListImage({
      id: Number(item.id),
      groupId: userSelectGroup,
    })

    if (typeof data === 'string' && !!data) setImageSrc(() => data)
    // else openToast('미디어 자료실 이미지를 불러오는데 실패했습니다.', 'error')
    setLoading(() => false)
  }

  useEffect(() => {
    let isBoolean = false
    let list = mediaPopup.radioSelected === 'IMG' ? mediaPopup.imageItems : mediaPopup.filesItems
    const find = list.find(e => e.id === Number(item.id))
    isBoolean = !!find
    setIsChecked(() => isBoolean)
  }, [mediaPopup.radioSelected, mediaPopup.filesItems, mediaPopup.imageItems])

  useEffect(() => {
    let isBoolean = false
    let list = mediaPopup.radioSelected === 'IMG' ? mediaPopup.releaseImageItems : mediaPopup.releaseFilesItems
    const find = list.find(e => e.id === item.id)
    isBoolean = !!find
    setIsChecked(() => isBoolean)
  }, [mediaPopup.radioSelected, mediaPopup.releaseFilesItems, mediaPopup.releaseImageItems])

  useEffect(() => {
    if (item.id && mediaPopup.radioSelected === 'IMG') getImage()
  }, [item.id])

  return (
    <>
      {mediaPopup.radioSelected !== 'IMG' ? (
        <li>
          <div className={`file-uploader-button-list__item ${isChecked ? 'is-selected' : ''}`}>
            <p
              className="file-uploader-button-item__name"
              onClick={() => checkedAction()}
            >
              {item?.filename}
            </p>
            <p
              className="file-uploader-button-item__size"
              onClick={() => checkedAction()}
            >
              {item.size}KB
            </p>
            <Button
              label={'삭제'}
              cate={'ico-only'}
              size={'s'}
              color={'secondary'}
              icoLeft={true}
              icoLeftData={icoSvgData.trash}
              icoSize={16}
              onClick={() => setDeleteMediaImagePopupAction(Number(item.id))}
            />
          </div>
        </li>
      ) : (
        <li>
          <div className="file-uploader-list__group">
            <div className="file-uploader-list-item__section">
              <button
                type="button"
                className="file-uploader-list-item__delete"
                onClick={() => setDeleteMediaImagePopupAction(Number(item.id))}
              >
                <IcoSvg data={icoSvgData.trash} />
                <span className="hidden">Delete (삭제)</span>
              </button>
              <div
                className="file-uploader-list-item__thumb is-selected"
                onClick={() => checkedAction()}
              >
                {loading ? (
                  <Skeleton
                    width={'201px'}
                    height={'132px'}
                  />
                ) : (
                  <img
                    src={imageSrc}
                    alt={item.filename}
                    width={100}
                    height={100}
                  />
                )}

                {isChecked && (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `url(/assets/svg/check-circle-fill-white2.svg) no-repeat 50%/36px`,
                      content: '',
                    }}
                  />
                )}
              </div>
              <p className="file-uploader-list-item__text">
                {item.width} X {item.height} ({item.size}KB)
              </p>
              <p className="file-uploader-list-item__text">{item.filename}</p>
            </div>
          </div>
        </li>
      )}
    </>
  )
}

export default MediaList
