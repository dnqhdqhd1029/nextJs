import { useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import { FileType } from '~/stores/modules/contents/email/email'
import { apiGetMediaListImage } from '~/utils/api/image/apiGetMediaListImage'
import { getCurrencyFormat } from '~/utils/common/number'
import { useEmail } from '~/utils/hooks/contents/email/useEmail'

interface Props {
  item: FileType
}
const InputMediaList = (props: Props) => {
  const {
    inputMediaPopup,
    userSelectGroup,
    setInputMediaFileCheckPopupAction,
    setInputMediaImageCheckPopupAction,
    setDeleteInputMediaImagePopupAction,
  } = useEmail()
  const [loading, setLoading] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string>('')

  const checkedAction = async () => {
    if (props.item.id) {
      inputMediaPopup.radioSelected !== 'IMG'
        ? setInputMediaFileCheckPopupAction(props.item, isChecked, inputMediaPopup, inputMediaPopup.releaseFilesItems)
        : setInputMediaImageCheckPopupAction(props.item, isChecked, inputMediaPopup, inputMediaPopup.releaseImageItems)
    }
  }

  const getImage = async () => {
    setLoading(() => true)
    const imageSrc = await apiGetMediaListImage({
      id: Number(props.item.id),
      groupId: userSelectGroup,
    })
    setImageSrc(() => imageSrc)
    setLoading(() => false)
  }

  useEffect(() => {
    let isBoolean = false
    let list = inputMediaPopup.radioSelected === 'IMG' ? inputMediaPopup.imageItems : inputMediaPopup.filesItems
    const find = list.find(e => e.id === Number(props.item.id))
    isBoolean = !!find
    setIsChecked(() => isBoolean)
  }, [inputMediaPopup.radioSelected, inputMediaPopup.filesItems, inputMediaPopup.imageItems])

  useEffect(() => {
    let isBoolean = false
    let list =
      inputMediaPopup.radioSelected === 'IMG' ? inputMediaPopup.releaseImageItems : inputMediaPopup.releaseFilesItems
    const find = list.find(e => e.id === props.item.id)
    isBoolean = !!find
    setIsChecked(() => isBoolean)
  }, [inputMediaPopup.radioSelected, inputMediaPopup.releaseFilesItems, inputMediaPopup.releaseImageItems])

  useEffect(() => {
    if (props.item.id && inputMediaPopup.radioSelected === 'IMG') getImage()
  }, [props.item.id])

  return (
    <>
      {inputMediaPopup.radioSelected !== 'IMG' ? (
        <li>
          <div className={`file-uploader-button-list__item ${isChecked ? 'is-selected' : ''}`}>
            <p
              className="file-uploader-button-item__name"
              onClick={() => checkedAction()}
            >
              {props.item?.filename}
            </p>
            <p
              className="file-uploader-button-item__size"
              onClick={() => checkedAction()}
            >
              {props.item.size}KB
            </p>
            <Button
              label={'삭제'}
              cate={'ico-only'}
              size={'s'}
              color={'secondary'}
              icoLeft={true}
              icoLeftData={icoSvgData.trash}
              icoSize={16}
              onClick={() => setDeleteInputMediaImagePopupAction(Number(props.item.id))}
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
                onClick={() => setDeleteInputMediaImagePopupAction(Number(props.item.id))}
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
                    alt={props.item.filename}
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
                {props.item.width} X {props.item.height} ({getCurrencyFormat(Math.round(props.item.size ?? 0))}KB)
              </p>
              <p className="file-uploader-list-item__text">{props.item.filename}</p>
            </div>
          </div>
        </li>
      )}
    </>
  )
}

export default InputMediaList
