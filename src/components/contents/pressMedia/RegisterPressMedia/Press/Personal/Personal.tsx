import { Fragment, MouseEvent, useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Select from '~/components/common/ui/Select'
import TagList from '~/components/common/ui/TagList'
import SocialItem from '~/components/contents/pressMedia/RegisterPressMedia/Press/Personal/SocialItem'
import type { SelectListOptionItem } from '~/types/common'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const PersonalStep = () => {
  const {
    categoryData,
    pressPersonalParams,
    categoryDataInformationHandle,
    pressSocialList,
    pressPersonalNameAction,
    pressPersonalPositionAction,
    pressPersonalDepartmentAction,
    pressPersonalMediaNameAction,
    pressPersonalFieldsAction,
    pressPersonalEmailAction,
    pressPersonalMobileAction,
    pressPersonalLandlineAction,
    pressPersonalSubAddressNmAction,
    setPressListPopupAction,
    pressPersonalDeleteJrnlstListsAction,
    pressPersonalAllDeleteJrnlstListsAction,
    pressPersonalCareerNmAction,
    pressPersonalEducationAction,
    pressPersonalWritingsAction,
    pressPersonalAwardsAction,
    pressPersonalSocialAction,
    addressPopupHandle,
    pressPersonalAddAction,
    pressPersonalValidate,
    initPressUser,
  } = useRegisterPressMedia()
  const [isLoading, setIsLoading] = useState(false)

  const actionAndNext = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(() => true)
    const check = await pressPersonalValidate(pressPersonalParams, pressSocialList)
    if (!check) {
      await pressPersonalAddAction(pressPersonalParams, pressSocialList)
    }
    setIsLoading(() => false)
  }

  useEffect(() => {
    if (categoryData.nextStep === 'personal') {
      initPressUser()
    }
  }, [])
  return (
    <Fragment>
      {categoryData.nextStep === 'personal' && (
        <Fragment>
          <ul className="interval-mt14">
            <li>
              <p className="font-body__regular">추가할 언론인 정보를 입력하세요.</p>
            </li>
            <li>
              <ul className="grid-col2">
                <li>
                  <FormTitle
                    title="이름"
                    required={true}
                  />
                  <FormInputText
                    onChange={e => pressPersonalNameAction(e.target.value, pressPersonalParams)}
                    failed={pressPersonalParams.nameErr !== ''}
                    msg={pressPersonalParams.nameErr}
                    value={pressPersonalParams.name}
                  />
                </li>
                <li>
                  <FormTitle
                    title="매체명"
                    required={true}
                  />
                  <FormInputText
                    onChange={e => pressPersonalMediaNameAction(e.target.value, pressPersonalParams)}
                    failed={pressPersonalParams.mediaNameErr !== ''}
                    msg={pressPersonalParams.mediaNameErr}
                    value={pressPersonalParams.mediaName}
                  />
                </li>
                <li>
                  <FormTitle title="부서" />
                  <FormInputText
                    onChange={e => pressPersonalDepartmentAction(e.target.value, pressPersonalParams)}
                    value={pressPersonalParams.department}
                  />
                </li>
                <li>
                  <FormTitle title="직책" />
                  <FormInputText
                    onChange={e => pressPersonalPositionAction(e.target.value, pressPersonalParams)}
                    value={pressPersonalParams.position}
                  />
                </li>
                <li>
                  <FormTitle
                    title="이메일"
                    required={true}
                  />
                  <FormInputText
                    onChange={e => pressPersonalEmailAction(e.target.value, pressPersonalParams)}
                    failed={pressPersonalParams.emailErr !== ''}
                    msg={pressPersonalParams.emailErr}
                    value={pressPersonalParams.email}
                  />
                </li>
                <li>
                  <FormTitle title="전화" />
                  <FormInputText
                    extraInputType={'normalPhone'}
                    onChangeExtra={e => pressPersonalLandlineAction(e, pressPersonalParams)}
                    value={pressPersonalParams.landline}
                  />
                </li>
                <li>
                  <FormTitle title="휴대전화" />
                  <FormInputText
                    extraInputType={'phone'}
                    onChangeExtra={e => pressPersonalMobileAction(e, pressPersonalParams)}
                    value={pressPersonalParams.mobile}
                  />
                </li>
                <li>
                  <FormTitle title="분야" />
                  <FormInputText
                    placeholder="콤마로 구분"
                    onChange={e => pressPersonalFieldsAction(e.target.value, pressPersonalParams)}
                    value={pressPersonalParams.fields}
                  />
                </li>
                <li>
                  <div className="form-address__section">
                    <FormTitle title="주소" />
                    <ul className="form-address__detail">
                      <li className="search">
                        <FormInputText value={pressPersonalParams.address} />
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
                      {/*    onChange={e => pressPersonalSubAddressNmAction(e.target.value, pressPersonalParams)}*/}
                      {/*    value={pressPersonalParams.subAddressNm}*/}
                      {/*  />*/}
                      {/*</li>*/}
                    </ul>
                  </div>
                </li>
                <li>
                  <FormTitle title="언론인 리스트" />
                  <Button
                    label={'리스트 선택'}
                    cate={'default'}
                    size={'m'}
                    color={'tertiary'}
                    onClick={() => setPressListPopupAction(true, pressPersonalParams.jrnlstLists)}
                  />
                  <TagList
                    tagItems={pressPersonalParams.jrnlstLists}
                    onTagItemClose={e => pressPersonalDeleteJrnlstListsAction(e, pressPersonalParams)}
                    onAllTagItemClose={() => pressPersonalAllDeleteJrnlstListsAction(pressPersonalParams)}
                  />
                </li>
              </ul>
            </li>
          </ul>
          <div className="mb-contents-footer__section">
            <div className="buttons__group">
              <Button
                label={'저장'}
                cate={'default'}
                size={'m'}
                color={'primary'}
                isLoading={isLoading}
                disabled={isLoading}
                onClick={e => actionAndNext(e)}
              />
              <Button
                label={'취소'}
                cate={'default'}
                size={'m'}
                color={'tertiary'}
                disabled={isLoading}
                onClick={() => categoryDataInformationHandle('information', categoryData)}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default PersonalStep
