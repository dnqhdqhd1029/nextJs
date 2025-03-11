/**
 * @file RequestPopup.tsx
 * @description 문의하기 팝업
 */

import { useRef } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import FileUpload from '~/components/contents/additionalServices/FileUpload/FileUpload'
import type { SelectListOptionItem } from '~/types/common'
import { useAdditionalServices } from '~/utils/hooks/contents/additionalServices/useAdditionalServices'

const RequestPopup = () => {
  const {
    onChangeFiles,
    popupTypes,
    setInitPopupTypesAction,
    setPopupSelectedValueAction,
    onDeleteUserFile,
    selectedValue,
    setPopupTitleAction,
    setPopupContentAction,
    setPopupAction,
  } = useAdditionalServices()
  const titleForManageRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Popup
        isOpen={popupTypes.isOpen}
        onClose={() => setInitPopupTypesAction()}
        hasCloseButton
        title={'문의하기'}
        width={800}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={() => setPopupAction(popupTypes, selectedValue.id)}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={() => setInitPopupTypesAction()}
            />
          </div>
        }
      >
        <ul>
          <li>
            <FormTitle
              title="분류"
              required={true}
            />
            <Select
              options={popupTypes.selectedList}
              onChange={(option: SelectListOptionItem) => setPopupSelectedValueAction(option, popupTypes)}
              value={popupTypes.selectedValue}
            />
          </li>
          <li>
            <FormTitle
              title="제목"
              required={true}
            />
            <FormInputText
              required={true}
              onChange={e => setPopupTitleAction(e.target.value, popupTypes)}
              getInputRef={ref => titleForManageRef.current}
              failed={popupTypes.titleErr !== ''}
              msg={popupTypes.titleErr}
              value={popupTypes.title}
            />
          </li>
          <li>
            <FormTitle
              title="내용"
              required={false}
            />
            <div className="textarea__group">
              <textarea
                placeholder=""
                rows={6}
                onChange={e => setPopupContentAction(e.target.value, popupTypes)}
                value={popupTypes.contents}
              ></textarea>
            </div>
          </li>
          <li style={{ marginTop: 20 }}>
            <FormTitle title="첨부" />
            <div className="file-uploader-button__section type-only">
              <div className="file-uploader-button__header">
                <div className="file-uploader-button__group">
                  <button
                    type="button"
                    className="file-uploader-button__upload"
                  >
                    <span className="file-uploader-button__text">파일 찾기</span>
                  </button>
                  <input
                    type="file"
                    className="file-uploader-button__input"
                    onChangeCapture={e => onChangeFiles(e, popupTypes)}
                    multiple
                  />
                </div>
                <p className="file-uploader-button__text">5MB 이하 이미지와 문서 첨부 가능</p>
              </div>
            </div>
            <div className="file-uploader__list-container">
              <ul className="file-uploader__list">
                {popupTypes.filesList.map((item, i) => (
                  <li
                    className="file-uploader__list-item"
                    key={item.id}
                  >
                    <div>
                      <p className="file-uploader__list-item-title">
                        {item?.file?.name || item.filename} ({item.size}
                        {'kb'})
                      </p>
                    </div>
                    <button
                      type="button"
                      className="file-uploader__list-item-delete"
                      onClick={e => onDeleteUserFile(item, popupTypes)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </Popup>
    </>
  )
}

export default RequestPopup
