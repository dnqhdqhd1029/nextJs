import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import TagList from '~/components/common/ui/TagList'
import UserSearchForm from '~/components/contents/common/forms/UserSearchForm/UserSearch'
import { ALLOWED_ORIGINS, SVC_DOMAIN_URL } from '~/constants/common'
import { useAdminGroup } from '~/utils/hooks/contents/admin/useAdminGroup'

const CreateGroupPopup = () => {
  const {
    licenseInfo,
    requestSearchParams,
    userPopup,
    setUserProfilePopupAction,
    setUserItemListControl,
    setClearUserItemAction,
    initUserProfilePopupActionChange,
    setGroupUserItem,
    setGroupNmAction,
    createGroupAction,
  } = useAdminGroup()
  const [isLoading, setIsLoading] = useState(false)

  const createGroup = async () => {
    setIsLoading(() => true)
    await createGroupAction(userPopup, requestSearchParams)
    setIsLoading(() => false)
  }

  return (
    <Popup
      isOpen={userPopup.isOpen && userPopup.type === 'create'}
      title={'그룹 추가'}
      onClose={() => initUserProfilePopupActionChange()}
      width={550}
      height={600}
      hasCloseButton
      contentSectionOverflow={'visible'}
      buttons={
        <div className="popup-footer__section">
          <Button
            label={'취소'}
            cate={'default'}
            size={'m'}
            color={'link-dark'}
            disabled={isLoading}
            onClick={() => initUserProfilePopupActionChange()}
          />
          <Button
            label={'저장'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => createGroup()}
          />
        </div>
      }
    >
      <div className="mb-contents-pb16__group">
        <p className="font-body__regular">
          그룹 기능을 이용하면 사내에서 부서별 작업공간을 만들거나, 대행사의 경우 고객사 용도로 사용할 수 있습니다.
          <br />
          그룹은 {Number(licenseInfo?.groupLimit || 0)}개까지 만들 수 있습니다. 그 이상 추가하려면{' '}
          <Button
            label={'고객센터'}
            cate={'link-text'}
            size={'m'}
            color={'body-link'}
            onClick={() =>
              window.open(process.env.MY_ENV_VAR === 'production' ? SVC_DOMAIN_URL.PROD : SVC_DOMAIN_URL.DEV + `/help`)
            }
          />
          로 문의하세요.
        </p>
      </div>
      <ul>
        <li>
          <FormInputText
            title={'그룹명'}
            required={true}
            onChange={e => setGroupNmAction(e.target.value, userPopup)}
            failed={userPopup.groupNmErr !== ''}
            msg={userPopup.groupNmErr}
            value={userPopup.groupNm}
          />
        </li>
        <li>
          <div className="select-form__section select-form-input">
            <FormTitle title="회원" />
            <UserSearchForm
              isOpen={userPopup.isOpen && userPopup.type === 'create'}
              errMsg={userPopup.nameListErr}
              tagValueList={userPopup.nameList}
              onChangeTagList={e => setGroupUserItem(e, userPopup)}
            />
            <TagList
              tagItems={userPopup.nameList}
              isDeleteAll={false}
              onTagItemClose={e => setUserItemListControl(e, userPopup)}
              onAllTagItemClose={() => setClearUserItemAction(userPopup)}
            />
          </div>
        </li>
      </ul>
    </Popup>
  )
}

export default CreateGroupPopup
