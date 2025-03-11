import { useRef } from 'react'

import Button from '~/components/common/ui/Button'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import Skeleton from '~/components/common/ui/Skeleton'
import { newsLetterList } from '~/components/contents/userSetting/UserProfile/defaultData'
import { PASSWORD_PATTER_DESCRIPTION } from '~/constants/common'
import { useValidate } from '~/utils/hooks/common/useValidate'
import { useUserProfile } from '~/utils/hooks/contents/setting/useUserProfile'

const UpdateUserProfilePopup = () => {
  const { getInputRef } = useValidate()
  const {
    isLoading,
    updateUserProfilePopupTypes,
    updateUserProfilePopupAction,
    setCheckPassword,
    updateUserProfile,
    landingDataList,
    setNickNameAction,
    setNameAction,
    setNewsLetterAction,
    setTelePhoneAction,
    setPhoneAction,
    setDepartmentAction,
    setPositionAction,
    setLandingDataAction,
  } = useUserProfile()

  const currentPasswdRef = useRef<HTMLInputElement>(null)

  return (
    <Popup
      isOpen={updateUserProfilePopupTypes.isOpen}
      title={updateUserProfilePopupTypes.title}
      onClose={() => updateUserProfilePopupAction(false, '')}
      width={500}
      height={updateUserProfilePopupTypes.type === 'passwordCheck' ? 280 : 700}
      hasCloseButton
      buttons={
        <div className="popup-footer__section">
          <Button
            label={updateUserProfilePopupTypes.confirmTitle}
            cate={'default'}
            size={'m'}
            color={'primary'}
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => updateUserProfile(updateUserProfilePopupTypes)}
          />
          <Button
            label={'취소'}
            cate={'default'}
            size={'m'}
            color={'link-dark'}
            onClick={() => updateUserProfilePopupAction(false, '')}
          />
        </div>
      }
    >
      {updateUserProfilePopupTypes.type === 'passwordCheck' ? (
        <div>
          <div
            className="popup-contents-text__group"
            style={{ marginBottom: 18 }}
          >
            <p className="font-body__regular">회원 정보를 수정하려면 회원님의 비밀번호를 입력하세요.</p>
          </div>
          <FormInputText
            id="user-passwd"
            name="user-passwd"
            title="비밀번호"
            inputType="password"
            required={true}
            getInputRef={ref => getInputRef(ref, currentPasswdRef)}
            value={updateUserProfilePopupTypes.password}
            onChange={e => setCheckPassword(e.target.value, updateUserProfilePopupTypes)}
            failed={updateUserProfilePopupTypes.passwordErr !== ''}
            msg={updateUserProfilePopupTypes.passwordErr}
          />
        </div>
      ) : (
        <ul>
          <li>
            <FormInputText
              title={'이름'}
              required={true}
              onChange={e => setNameAction(e.target.value, updateUserProfilePopupTypes)}
              failed={updateUserProfilePopupTypes.nameErr !== ''}
              msg={updateUserProfilePopupTypes.nameErr}
              value={updateUserProfilePopupTypes.name}
            />
          </li>
          <li>
            <FormInputText
              title={'표시이름'}
              onChange={e => setNickNameAction(e.target.value, updateUserProfilePopupTypes)}
              value={updateUserProfilePopupTypes.nickName}
            />
          </li>
          <li>
            <FormInputText
              title={'부서'}
              onChange={e => setDepartmentAction(e.target.value, updateUserProfilePopupTypes)}
              value={updateUserProfilePopupTypes.department}
            />
          </li>
          <li>
            <FormInputText
              title={'직책'}
              onChange={e => setPositionAction(e.target.value, updateUserProfilePopupTypes)}
              value={updateUserProfilePopupTypes.position}
            />
          </li>
          <li>
            <FormInputText
              title={'전화'}
              extraInputType={'normalPhone'}
              onChangeExtra={e => setPhoneAction(e, updateUserProfilePopupTypes)}
              value={updateUserProfilePopupTypes.phone}
            />
          </li>
          <li>
            <FormInputText
              title={'휴대전화'}
              extraInputType={'phone'}
              onChangeExtra={e => setTelePhoneAction(e, updateUserProfilePopupTypes)}
              failed={updateUserProfilePopupTypes.telePhoneErr !== ''}
              msg={updateUserProfilePopupTypes.telePhoneErr}
              value={updateUserProfilePopupTypes.telePhone}
            />
          </li>
          {/*<li>*/}
          {/*  <FormTitle*/}
          {/*    title={'랜딩 페이지'}*/}
          {/*    required={true}*/}
          {/*  />*/}
          {/*  <Select*/}
          {/*    options={landingDataList}*/}
          {/*    value={updateUserProfilePopupTypes.landingData}*/}
          {/*    onChange={e => setLandingDataAction(e, updateUserProfilePopupTypes)}*/}
          {/*  />*/}
          {/*</li>*/}
          <li>
            <div className="ipt-btn__section">
              <FormTitle
                title="뉴스레터"
                required={true}
              />
              <FormInputBtn
                type="checkbox"
                name="isNewsLetterContent"
                id="isNewsLetterContent"
                label="뉴스레터 수신에 동의합니다"
                checked={updateUserProfilePopupTypes.isNewsLetter === 'yes'}
                onChange={event =>
                  setNewsLetterAction(event.target.checked ? 'yes' : 'no', updateUserProfilePopupTypes)
                }
              />
              {/*<ul className="ipt-btn__list--row">*/}
              {/*  {newsLetterList.map((e, i) => (*/}
              {/*    <li key={'userProfile_newsLetterList' + i.toString()}>*/}
              {/*      <FormBasicRadio*/}
              {/*        label={e.name}*/}
              {/*        name={'userProfile.newsLetterList' + e.id.toString()}*/}
              {/*        id={'userProfile.newsLetterList' + e.id.toString()}*/}
              {/*        checked={updateUserProfilePopupTypes.isNewsLetter === e.id}*/}
              {/*        onChange={() => setNewsLetterAction(e.id, updateUserProfilePopupTypes)}*/}
              {/*      />*/}
              {/*    </li>*/}
              {/*  ))}*/}
              {/*</ul>*/}
            </div>
          </li>
        </ul>
      )}
    </Popup>
  )
}

export default UpdateUserProfilePopup
