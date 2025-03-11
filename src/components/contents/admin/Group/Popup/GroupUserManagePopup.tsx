import { useState } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import Button from '~/components/common/ui/Button'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import TagElement from '~/components/common/ui/TagElement'
import TagList from '~/components/common/ui/TagList'
import UserSearchForm from '~/components/contents/common/forms/UserSearchForm/UserSearch'
import { useAdminGroup } from '~/utils/hooks/contents/admin/useAdminGroup'

const GroupUserManagePopup = () => {
  const {
    userPopup,
    requestSearchParams,
    setUserProfilePopupAction,
    setUserItemListControl,
    setClearUserItemAction,
    setGroupUserItem,
    initUserProfilePopupActionChange,
    groupUserManageCheckAction,
  } = useAdminGroup()
  const [isLoading, setIsLoading] = useState(false)

  const groupUserManageCheck = async () => {
    setIsLoading(() => true)
    await groupUserManageCheckAction(userPopup, requestSearchParams)
    setIsLoading(() => false)
  }
  return (
    <Popup
      isOpen={userPopup.isOpen && userPopup.type === 'userManagement'}
      title={'그룹 회원 관리'}
      onClose={() => initUserProfilePopupActionChange()}
      width={500}
      hasCloseButton
      height={500}
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
            label={'확인'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => groupUserManageCheck()}
          />
        </div>
      }
    >
      <ul>
        <li>
          {!userPopup.isLoading && (
            <TagElement
              tagName={'div'}
              className={cn('ipt-text__area', { 'is-failed': userPopup.nameListErr !== '' })}
              autoComplete={uuid()}
            >
              <div className="select-form__section select-form-input">
                <FormTitle title="회원" />
                <UserSearchForm
                  isOpen={userPopup.isOpen && userPopup.type === 'userManagement'}
                  errMsg={userPopup.nameListErr}
                  tagValueList={userPopup.nameList}
                  onChangeTagList={e => setGroupUserItem(e, userPopup)}
                />
                <TagList
                  tagItems={userPopup.nameList}
                  onTagItemClose={e => setUserItemListControl(e, userPopup)}
                  onAllTagItemClose={() => setClearUserItemAction(userPopup)}
                />
              </div>
            </TagElement>
          )}
        </li>
      </ul>
    </Popup>
  )
}

export default GroupUserManagePopup
