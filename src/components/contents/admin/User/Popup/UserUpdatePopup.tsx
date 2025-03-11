import { useRef, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import TagList from '~/components/common/ui/TagList'
import { defaultPermissionList } from '~/components/contents/admin/defaultData'
import GroupSearchForm from '~/components/contents/common/forms/GroupSearchForm/GroupSearch'
import { useAdminUser } from '~/utils/hooks/contents/admin/useAdminUser'

const UserUpdatePopup = () => {
  const {
    requestSearchParams,
    userPopup,
    setCloseUserPopup,
    setUserProfilePopupAction,
    setOnChangeUserGroupList,
    setGroupItemListControl,
    setNameAction,
    setNickNameAction,
    setPermissionAction,
    setPhoneAction,
    setTelePhoneAction,
    setDepartmentAction,
    setPositionAction,
    editUserAction,
  } = useAdminUser()
  const [isLoading, setIsLoading] = useState(false)

  const editUser = async () => {
    setIsLoading(() => true)
    await editUserAction(userPopup, requestSearchParams)
    setIsLoading(() => false)
  }

  return (
    <Popup
      isOpen={userPopup.isOpen && userPopup.type === 'update'}
      title={'회원 정보 수정'}
      onClose={() => setCloseUserPopup()}
      width={500}
      hasCloseButton
      buttons={
        <div className="popup-footer__section">
          <Button
            label={'취소'}
            cate={'default'}
            size={'m'}
            color={'link-dark'}
            disabled={isLoading}
            onClick={() => setCloseUserPopup()}
          />
          <Button
            label={'저장'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => editUser()}
          />
        </div>
      }
    >
      <ul>
        <li>
          <FormInputText
            title={'이름'}
            required={true}
            onChange={e => setNameAction(e.target.value, userPopup)}
            failed={userPopup.nameErr !== ''}
            msg={userPopup.nameErr}
            value={userPopup.name}
          />
        </li>
        <li>
          <FormInputText
            title={'표시이름'}
            onChange={e => setNickNameAction(e.target.value, userPopup)}
            value={userPopup.nickName}
          />
        </li>
        <li>
          <div className="ipt-text__area">
            <FormTitle title="이메일" />
            <p className="ipt-text-readonly">{userPopup.email}</p>
          </div>
        </li>
        <li>
          <div className="ipt-btn__section">
            <FormTitle
              title="권한"
              required={true}
            />
            <ul className="ipt-btn__list--row">
              {defaultPermissionList.map((e, i) => (
                <li key={'editUser.auth' + i.toString()}>
                  <FormBasicRadio
                    label={e.name}
                    name={'editUser.auth' + e.id.toString()}
                    id={'editUser.auth' + e.id.toString()}
                    checked={userPopup.permission === e.id}
                    onChange={() => setPermissionAction(e.id, userPopup)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li>
          <div className="select-form__section select-form-btn">
            <FormTitle
              title="그룹"
              required={true}
            />
            <GroupSearchForm
              isOpen={userPopup.isOpen && userPopup.type === 'update'}
              errMsg={userPopup.groupErrorMessage}
              tagValueList={userPopup.storedTagItems}
              onChangeTagList={e => setOnChangeUserGroupList(e, userPopup)}
            />
            <TagList
              tagItems={userPopup.storedTagItems}
              isDeleteAll={false}
              onTagItemClose={e => setGroupItemListControl(e, userPopup)}
            />
          </div>
        </li>
        <li>
          <FormInputText
            title={'부서'}
            onChange={e => setDepartmentAction(e.target.value, userPopup)}
            value={userPopup.department}
          />
        </li>
        <li>
          <FormInputText
            title={'직책'}
            onChange={e => setPositionAction(e.target.value, userPopup)}
            value={userPopup.position}
          />
        </li>
        <li>
          <FormInputText
            title={'전화'}
            extraInputType={'normalPhone'}
            onChangeExtra={e => setPhoneAction(e, userPopup)}
            value={userPopup.phone}
          />
        </li>
        <li>
          <FormInputText
            title={'휴대전화'}
            extraInputType={'phone'}
            onChangeExtra={e => setTelePhoneAction(e, userPopup)}
            failed={userPopup.mobileErr !== ''}
            msg={userPopup.mobileErr}
            value={userPopup.mobile}
          />
        </li>
      </ul>
    </Popup>
  )
}

export default UserUpdatePopup
