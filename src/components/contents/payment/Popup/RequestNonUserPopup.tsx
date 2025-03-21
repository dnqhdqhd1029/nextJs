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
import type { SelectListOptionItem } from '~/types/common'
import { usePayments } from '~/utils/hooks/contents/payment/usePayments'

const RequestNonUserPopup = () => {
  const {
    onDeleteUserFile,
    onChangeFiles,
    requestPopupTypes,
    setInitRequestPopupTypesAction,
    setPopupApplicantTelePhoneAction,
    setPopupApplicantNameAction,
    setPopupApplicantEmailAction,
    setPopupPhoneCallNmAction,
    setPopupTitleAction,
    setPopupContentAction,
    setRequestPopupAction,
  } = usePayments()

  const titleForManageRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Popup
        isOpen={requestPopupTypes.isOpen && requestPopupTypes.type === 'customer'}
        onClose={() => setInitRequestPopupTypesAction()}
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
              onClick={() => setRequestPopupAction(requestPopupTypes)}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={() => setInitRequestPopupTypesAction()}
            />
          </div>
        }
      >
        <ul className="grid-col2">
          <li>
            <FormInputText
              title={'이름'}
              required={true}
              onChange={e => setPopupApplicantNameAction(e.target.value, requestPopupTypes)}
              failed={requestPopupTypes.nameErr !== ''}
              msg={requestPopupTypes.nameErr}
              value={requestPopupTypes.name}
            />
          </li>
          <li>
            <FormInputText
              title={'이메일'}
              required={true}
              onChange={e => setPopupApplicantEmailAction(e.target.value, requestPopupTypes)}
              failed={requestPopupTypes.emailErr !== ''}
              msg={requestPopupTypes.emailErr}
              value={requestPopupTypes.email}
            />
          </li>
          <li>
            <FormInputText
              title={'전화'}
              extraInputType={'normalPhone'}
              onChangeExtra={e => setPopupPhoneCallNmAction(e, requestPopupTypes)}
              failed={requestPopupTypes.phoneNmErr !== ''}
              msg={requestPopupTypes.phoneNmErr}
              value={requestPopupTypes.phoneNm}
            />
          </li>
          <li>
            <FormInputText
              title={'휴대전화'}
              extraInputType={'phone'}
              onChangeExtra={e => setPopupApplicantTelePhoneAction(e, requestPopupTypes)}
              value={requestPopupTypes.telephone}
            />
          </li>
        </ul>
        <ul>
          <li>
            <FormTitle
              title="제목"
              required={true}
            />
            <FormInputText
              required={true}
              onChange={e => setPopupTitleAction(e.target.value, requestPopupTypes)}
              getInputRef={ref => titleForManageRef.current}
              failed={requestPopupTypes.titleErr !== ''}
              msg={requestPopupTypes.titleErr}
              value={requestPopupTypes.title}
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
                onChange={e => setPopupContentAction(e.target.value, requestPopupTypes)}
                value={requestPopupTypes.contents}
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
                    onChangeCapture={e => onChangeFiles(e, requestPopupTypes)}
                    multiple
                  />
                </div>
                <p className="file-uploader-button__text">5MB 이하 이미지와 문서 첨부 가능</p>
              </div>
            </div>
            <div className="file-uploader__list-container">
              <ul className="file-uploader__list">
                {requestPopupTypes.filesList.map((item, i) => (
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
                      onClick={e => onDeleteUserFile(item, requestPopupTypes)}
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

export default RequestNonUserPopup
