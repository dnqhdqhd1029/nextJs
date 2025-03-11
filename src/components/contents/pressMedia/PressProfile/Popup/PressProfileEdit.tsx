import { MouseEvent, useEffect, useRef, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Popup from '~/components/common/ui/Popup'
import SocialItem from '~/components/contents/pressMedia/PressProfile/Popup/SocialItem'
import { usePressProfile } from '~/utils/hooks/contents/pressMedia/usePressProfile'
const PressProfileEdit = () => {
  const {
    pressPersonalParamsPopup,
    pressSocialList,
    pressPersonalNameAction,
    pressPersonalMediaNameAction,
    pressPersonalDepartmentAction,
    pressPersonalPositionAction,
    pressPersonalEmailAction,
    pressPersonalLandlineAction,
    pressPersonalMobileAction,
    pressPersonalFieldsAction,
    pressPersonalSubAddressNmAction,
    pressPersonalCareerNmAction,
    pressPersonalEducationAction,
    pressPersonalWritingsAction,
    pressPersonalAwardsAction,
    pressPersonalSocialAction,
    addressPopupHandle,
    closePressPersonalParamsAction,
    pressPersonalValidate,
    pressPersonalEdit,
    init,
  } = usePressProfile()
  const [isLoading, setIsLoading] = useState(false)
  const value = useRef(0)

  const actionButton = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(() => true)
    const check = await pressPersonalValidate(pressPersonalParamsPopup, pressSocialList)
    if (check) {
      const res = await pressPersonalEdit(pressPersonalParamsPopup, pressSocialList)
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
        isOpen={pressPersonalParamsPopup.isOpen}
        onClose={() => closePressPersonalParamsAction()}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'개인 추가 언론인 수정'}
        width={800}
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
              onClick={() => closePressPersonalParamsAction()}
            />
          </div>
        }
      >
        {/* <div className="popup-contents__section"> */}
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">이름, 매체명, 이메일은 필수 입력항목입니다.</p>
        </div>
        <ul className="grid-col2">
          <li>
            <FormTitle
              title="이름"
              required={true}
            />
            <FormInputText
              onChange={e => pressPersonalNameAction(e.target.value, pressPersonalParamsPopup)}
              failed={pressPersonalParamsPopup.nameErr !== ''}
              msg={pressPersonalParamsPopup.nameErr}
              value={pressPersonalParamsPopup.name}
            />
          </li>
          <li>
            <FormTitle
              title="매체명"
              required={true}
            />
            <FormInputText
              onChange={e => pressPersonalMediaNameAction(e.target.value, pressPersonalParamsPopup)}
              failed={pressPersonalParamsPopup.mediaNameErr !== ''}
              msg={pressPersonalParamsPopup.mediaNameErr}
              value={pressPersonalParamsPopup.mediaName}
            />
          </li>
          <li>
            <FormTitle title="부서" />
            <FormInputText
              onChange={e => pressPersonalDepartmentAction(e.target.value, pressPersonalParamsPopup)}
              value={pressPersonalParamsPopup.department}
            />
          </li>
          <li>
            <FormTitle title="직책" />
            <FormInputText
              onChange={e => pressPersonalPositionAction(e.target.value, pressPersonalParamsPopup)}
              value={pressPersonalParamsPopup.position}
            />
          </li>
          <li>
            <FormTitle
              title="이메일"
              required={true}
            />
            <FormInputText
              onChange={e => pressPersonalEmailAction(e.target.value, pressPersonalParamsPopup)}
              failed={pressPersonalParamsPopup.emailErr !== ''}
              msg={pressPersonalParamsPopup.emailErr}
              value={pressPersonalParamsPopup.email}
            />
          </li>
          <li>
            <FormTitle title="전화" />
            <FormInputText
              extraInputType={'normalPhone'}
              onChangeExtra={e => pressPersonalLandlineAction(e, pressPersonalParamsPopup)}
              value={pressPersonalParamsPopup.landline}
            />
          </li>
          <li>
            <FormTitle title="휴대전화" />
            <FormInputText
              extraInputType={'phone'}
              onChangeExtra={e => pressPersonalMobileAction(e, pressPersonalParamsPopup)}
              value={pressPersonalParamsPopup.mobile}
            />
          </li>
          <li>
            <FormTitle title="분야" />
            <FormInputText
              placeholder="콤마로 구분"
              onChange={e => pressPersonalFieldsAction(e.target.value, pressPersonalParamsPopup)}
              value={pressPersonalParamsPopup.fields}
            />
          </li>
          <li>
            <div className="form-address__section">
              <FormTitle title="주소" />
              <ul className="form-address__detail">
                <li className="search">
                  <FormInputText value={pressPersonalParamsPopup.address} />
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
                {/*    onChange={e => pressPersonalSubAddressNmAction(e.target.value, pressPersonalParamsPopup)}*/}
                {/*    value={pressPersonalParamsPopup.subAddressNm}*/}
                {/*  />*/}
                {/*</li>*/}
              </ul>
            </div>
          </li>
        </ul>
      </Popup>
    </>
  )
}

export default PressProfileEdit
