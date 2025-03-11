import { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import TagList from '~/components/common/ui/TagList'
import { defaultPermissionList } from '~/components/contents/admin/defaultData'
import GroupSearchForm from '~/components/contents/common/forms/GroupSearchForm/GroupSearch'
import { useAddUser } from '~/utils/hooks/contents/admin/useAddUser'

const AuthStep = () => {
  const router = useRouter()
  const {
    step,
    registerType,
    handlePagestepAction,
    emailDataChecked,
    authType,
    setAuthTypeAction,
    groupItemList,
    groupErr,
    currentGroup,
    originGroupList,
    setGroupListAction,
    setGroupItemListControl,
    setGroupItemListDeleteControl,
    emailData,
    setUserGroupItem,
    authDataLoading,
    addNewUserAction,
  } = useAddUser()

  return (
    <Fragment>
      <div style={{ display: step === 'authority' ? 'block' : 'none' }}>
        <div className={cn('setting-member__section')}>
          <ul className="interval-line-list28">
            <li>
              <div className="mb-contents-pb16__group">
                <h3 className="setting__headings6">회원에게 부여할 권한을 선택하세요.</h3>
              </div>
              <div
                className="ipt-btn__section"
                style={{ marginTop: 18 }}
              >
                <FormTitle
                  title="권한"
                  required={true}
                />
                <ul className="ipt-btn__list--row">
                  {defaultPermissionList.map((e, i) => (
                    <li key={'AuthStep.auth' + i.toString()}>
                      <FormBasicRadio
                        label={e.name}
                        name={'AuthStep.auth' + e.id.toString()}
                        id={'AuthStep.auth' + e.id.toString()}
                        checked={authType === e.id}
                        onChange={() => setAuthTypeAction(e.id)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <div className="mb-contents-pb16__group">
                <h3 className="setting__headings6">회원이 사용할 그룹을 선택하세요.</h3>
              </div>
              {}
              <div
                className="form-pb0 w480"
                style={{ marginTop: 18 }}
              >
                <div className="select-form__section select-form-btn">
                  <FormTitle
                    title="그룹"
                    required={true}
                  />
                  <GroupSearchForm
                    isOpen={step === 'authority'}
                    errMsg={''}
                    tagValueList={groupItemList}
                    onChangeTagList={e => setUserGroupItem(e, groupItemList)}
                  />
                  <TagList
                    tagItems={groupItemList}
                    isDeleteAll={false}
                    onTagItemClose={e => setGroupItemListControl(e, groupItemList)}
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="mb-contents-footer__section">
          <div className="buttons__group type-between">
            <div className="buttons__group type-left">
              <Button
                label={'이전'}
                cate={'default-ico-text'}
                size={'m'}
                color={'tertiary'}
                icoLeft={true}
                icoLeftData={icoSvgData.chevronThickLeft}
                onClick={() => handlePagestepAction('email', registerType, currentGroup)}
              />
              <Button
                label={'취소'}
                cate={'default'}
                size={'m'}
                color={'tertiary'}
                onClick={() => handlePagestepAction('', registerType, currentGroup)}
              />
            </div>
            <Button
              label={'확인'}
              cate={'default-ico-text'}
              size={'m'}
              color={'primary'}
              icoRight={true}
              isLoading={authDataLoading}
              disabled={authDataLoading}
              icoRightData={icoSvgData.chevronThickRight}
              onClick={() => addNewUserAction(emailData, authType, groupItemList)}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default AuthStep
