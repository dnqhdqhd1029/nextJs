import { Fragment, MouseEvent, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import TagList from '~/components/common/ui/TagList'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const PersonalStep = () => {
  const {
    categoryData,
    categoryDataInformationHandle,
    mediaPersonalParams,
    mediaPersonalNameAction,
    mediaPersonalMediaNameAction,
    mediaPersonalFieldsAction,
    mediaPersonalEmailAction,
    mediaPersonalMobileAction,
    mediaPersonalLandlineAction,
    mediaPersonalSubAddressNmAction,
    setMediaListPopupAction,
    mediaPersonalDeleteJrnlstListsAction,
    mediaPersonalAllDeleteJrnlstListsAction,
    addressPopupHandle,
    mediaPersonalAddAction,
    mediaPersonalValidate,
  } = useRegisterPressMedia()
  const [isLoading, setIsLoading] = useState(false)

  const actionAndNext = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(() => true)
    const check = await mediaPersonalValidate(mediaPersonalParams)
    if (check) {
      await mediaPersonalAddAction(mediaPersonalParams)
    }
    setIsLoading(() => false)
  }

  return (
    <Fragment>
      {categoryData.nextStep === 'personal' && (
        <Fragment>
          <ul className="interval-mt14">
            <li>
              <p className="font-body__regular">추가할 매체 정보를 입력하세요.</p>
            </li>
            <li>
              <ul className="grid-col2">
                <li>
                  <FormTitle
                    title="매체명"
                    required={true}
                  />
                  <FormInputText
                    onChange={e => mediaPersonalMediaNameAction(e.target.value, mediaPersonalParams)}
                    failed={mediaPersonalParams.mediaNameErr !== ''}
                    msg={mediaPersonalParams.mediaNameErr}
                    value={mediaPersonalParams.mediaName}
                  />
                </li>
                <li>
                  <FormTitle title="웹사이트" />
                  <FormInputText
                    placeholder={'https://'}
                    onChange={e => mediaPersonalNameAction(e.target.value, mediaPersonalParams)}
                    failed={mediaPersonalParams.websiteErr !== ''}
                    msg={mediaPersonalParams.websiteErr}
                    value={mediaPersonalParams.website}
                  />
                </li>
                <li>
                  <FormTitle title="이메일" />
                  <FormInputText
                    onChange={e => mediaPersonalEmailAction(e.target.value, mediaPersonalParams)}
                    failed={mediaPersonalParams.emailErr !== ''}
                    msg={mediaPersonalParams.emailErr}
                    value={mediaPersonalParams.email}
                  />
                </li>
                <li>
                  <FormTitle title="전화" />
                  <FormInputText
                    extraInputType={'normalPhone'}
                    onChangeExtra={e => mediaPersonalLandlineAction(e, mediaPersonalParams)}
                    value={mediaPersonalParams.landline}
                  />
                </li>
                <li>
                  <FormTitle title="팩스" />
                  <FormInputText
                    extraInputType={'normalPhone'}
                    onChangeExtra={e => mediaPersonalMobileAction(e, mediaPersonalParams)}
                    value={mediaPersonalParams.mobile}
                  />
                </li>
                <li>
                  <FormTitle title="분야" />
                  <FormInputText
                    placeholder="콤마로 구분"
                    onChange={e => mediaPersonalFieldsAction(e.target.value, mediaPersonalParams)}
                    value={mediaPersonalParams.fields}
                  />
                </li>
                <li>
                  <div className="form-address__section">
                    <FormTitle title="주소" />
                    <ul className="form-address__detail">
                      <li className="search">
                        <FormInputText
                          value={mediaPersonalParams.address}
                          onChange={e => mediaPersonalSubAddressNmAction(e.target.value, mediaPersonalParams)}
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
                      {/*    onChange={e => mediaPersonalSubAddressNmAction(e.target.value, mediaPersonalParams)}*/}
                      {/*    value={mediaPersonalParams.subAddressNm}*/}
                      {/*  />*/}
                      {/*</li>*/}
                    </ul>
                  </div>
                </li>
                <li>
                  <FormTitle title="미디어목록" />
                  <Button
                    label={'목록 선택'}
                    cate={'default'}
                    size={'m'}
                    color={'tertiary'}
                    onClick={() => setMediaListPopupAction(true, mediaPersonalParams.mediaBookLists)}
                  />
                  <TagList
                    tagItems={mediaPersonalParams.mediaBookLists}
                    onTagItemClose={e => mediaPersonalDeleteJrnlstListsAction(e, mediaPersonalParams)}
                    onAllTagItemClose={() => mediaPersonalAllDeleteJrnlstListsAction(mediaPersonalParams)}
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
