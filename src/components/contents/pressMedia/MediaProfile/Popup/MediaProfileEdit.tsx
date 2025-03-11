import { MouseEvent, useEffect, useRef, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import { useMediaProfile } from '~/utils/hooks/contents/pressMedia/useMediaProfile'
const MediaProfileEdit = () => {
  const {
    mediaPersonalParamsPopup,
    mediaPersonalMediaNameAction,
    mediaPersonalNameAction,
    mediaPersonalEmailAction,
    mediaPersonalLandlineAction,
    mediaPersonalMobileAction,
    mediaPersonalFieldsAction,
    mediaPersonalSubAddressNmAction,
    addressPopupHandle,
    closeMediaPersonalPopupAction,
    mediaPersonalValidate,
    mediaPersonalEdit,
    init,
  } = useMediaProfile()
  const [isLoading, setIsLoading] = useState(false)
  const value = useRef(0)

  const actionButton = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(() => true)
    const check = await mediaPersonalValidate(mediaPersonalParamsPopup)
    if (check) {
      const res = await mediaPersonalEdit(mediaPersonalParamsPopup)
      if (res === 'S') {
        value.current++
      } else {
        setIsLoading(() => false)
      }
    }
    setIsLoading(() => false)
  }

  useEffect(() => {
    if (value.current !== 0) {
      const action = setInterval(() => {
        console.log(value.current) // value의 현재 값인 vaule.current를 가져오도록 한다.
        setIsLoading(() => false)
        value.current = 0
        init()
      }, 1500)
      return () => clearInterval(action)
    }
  }, [value.current])
  return (
    <>
      <Popup
        isOpen={mediaPersonalParamsPopup.isOpen}
        onClose={() => closeMediaPersonalPopupAction()}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'개인 추가 미디어 수정'}
        width={900}
        buttons={
          <div className="popup-footer__section type2">
            <Button
              label={'수정'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={e => actionButton(e)}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              disabled={isLoading}
              color={'link-dark'}
              onClick={() => closeMediaPersonalPopupAction()}
            />
          </div>
        }
      >
        <div className="popup-contents__section">
          <div className="mb-contents-pb16__group">
            <p className="font-body__regular">매체명은 필수 입력항목입니다.</p>
          </div>
          <ul className="grid-col2">
            <li>
              <FormTitle
                title="매체명"
                required={true}
              />
              <FormInputText
                onChange={e => mediaPersonalMediaNameAction(e.target.value, mediaPersonalParamsPopup)}
                failed={mediaPersonalParamsPopup.mediaNameErr !== ''}
                msg={mediaPersonalParamsPopup.mediaNameErr}
                value={mediaPersonalParamsPopup.mediaName}
              />
            </li>
            <li>
              <FormTitle title="웹사이트" />
              <FormInputText
                placeholder={'https://'}
                onChange={e => mediaPersonalNameAction(e.target.value, mediaPersonalParamsPopup)}
                failed={mediaPersonalParamsPopup.websiteErr !== ''}
                msg={mediaPersonalParamsPopup.websiteErr}
                value={mediaPersonalParamsPopup.website}
              />
            </li>
            <li>
              <FormTitle title="이메일" />
              <FormInputText
                onChange={e => mediaPersonalEmailAction(e.target.value, mediaPersonalParamsPopup)}
                failed={mediaPersonalParamsPopup.emailErr !== ''}
                msg={mediaPersonalParamsPopup.emailErr}
                value={mediaPersonalParamsPopup.email}
              />
            </li>
            <li>
              <FormTitle title="전화" />
              <FormInputText
                extraInputType={'normalPhone'}
                onChangeExtra={e => mediaPersonalLandlineAction(e, mediaPersonalParamsPopup)}
                value={mediaPersonalParamsPopup.landline}
              />
            </li>
            <li>
              <FormTitle title="팩스" />
              <FormInputText
                extraInputType={'normalPhone'}
                onChangeExtra={e => mediaPersonalMobileAction(e, mediaPersonalParamsPopup)}
                value={mediaPersonalParamsPopup.mobile}
              />
            </li>
            <li>
              <FormTitle title="분야" />
              <FormInputText
                placeholder="콤마로 구분"
                onChange={e => mediaPersonalFieldsAction(e.target.value, mediaPersonalParamsPopup)}
                value={mediaPersonalParamsPopup.fields}
              />
            </li>
            <li>
              <div className="form-address__section">
                <FormTitle title="주소" />
                <ul className="form-address__detail">
                  <li className="search">
                    <FormInputText
                      value={mediaPersonalParamsPopup.address}
                      onChange={e => mediaPersonalSubAddressNmAction(e.target.value, mediaPersonalParamsPopup)}
                    />
                    <Button
                      label={'주소 검색'}
                      cate={'default'}
                      size={'m'}
                      color={'tertiary'}
                      onClick={() => addressPopupHandle(true)}
                    />
                  </li>
                  {/*<li>*/}
                  {/*  <FormInputText*/}
                  {/*    onChange={e => mediaPersonalSubAddressNmAction(e.target.value, mediaPersonalParamsPopup)}*/}
                  {/*    value={mediaPersonalParamsPopup.subAddressNm}*/}
                  {/*  />*/}
                  {/*</li>*/}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </Popup>
    </>
  )
}

export default MediaProfileEdit
