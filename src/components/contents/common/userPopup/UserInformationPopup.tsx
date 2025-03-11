import { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import cn from 'classnames'

import FormTitle from '~/components/common/ui/FormTitle'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import Popup from '~/components/common/ui/Popup'
import Tooltips from '~/components/common/ui/Tooltips'
import {
  initialState as userSliceInit,
  initUserInformationPopupAction,
  userInformationPopupAction,
  userInformationPopupProps,
} from '~/stores/modules/contents/user/user'
import type { UserDto } from '~/types/api/service'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'
const UserInformationPopup = () => {
  const dispatch = useAppDispatch()
  const { userInformationPopup } = useAppSelector(state => state.userSlice)

  const getOwnerInformation = async (e: number) => {
    let res: userInformationPopupProps = userSliceInit.userInformationPopup
    const { status, data, message } = await apiGetOneUser(e)
    if (status === 'S') {
      const userData = data as UserDto
      res = {
        ...userInformationPopup,
        name: userData?.name || '',
        displayName: userData?.displayName || '',
        email: userData?.email || '',
        // @ts-ignore
        department: userData?.department || '',
        // @ts-ignore
        position: userData?.position || '',
        phone: userData?.phone || '',
        mobile: userData?.mobile || '',
        role: res?.role === 'ADMIN' ? '관리자' : '사용자',
        stateCode: userData?.stateCode || '',
      }
    }
    dispatch(userInformationPopupAction(res))
  }

  const closePopup = () => {
    dispatch(initUserInformationPopupAction())
  }

  useEffect(() => {
    if (userInformationPopup.isOpen && userInformationPopup.idKey) {
      getOwnerInformation(userInformationPopup.idKey)
    }
  }, [userInformationPopup.isOpen])
  return (
    <Popup
      isOpen={userInformationPopup.isOpen}
      title={'회원 정보'}
      onClose={() => closePopup()}
      width={500}
      hasCloseButton
      showFooter={false}
    >
      <dl className="dl-table-type1__section">
        <dt>
          <p className="dl-table-type1__text">이름</p>
        </dt>
        <dd>
          <div className="form-title__group">
            {userInformationPopup.stateCode === 'ACTIVE' ? (
              <>{userInformationPopup?.name || '-'} </>
            ) : (
              <div className={cn('tooltips__group')}>
                <a
                  data-tooltip-id={'tooltipId' ?? undefined}
                  data-tooltip-place={'top'}
                  data-tooltip-html={'비활성화된 회원입니다.'}
                  data-tooltip-offset={7}
                  href={undefined}
                  target={'_self'}
                  style={{ textDecoration: 'line-through' }}
                >
                  {userInformationPopup?.name || '-'}{' '}
                </a>
                <Tooltip
                  id={'tooltipId' ?? undefined}
                  className="tooltips__item"
                />
              </div>
            )}
          </div>
        </dd>
        <dt>
          <p className="dl-table-type1__text">표시 이름</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">{userInformationPopup?.displayName || '-'}</p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">이메일</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            <a
              href={`mailto:${userInformationPopup?.email || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button-link-text colors-body-link "
            >
              <span className="button__label button-link-text__label size-m">{userInformationPopup?.email || '-'}</span>
            </a>
          </p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">부서</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">{userInformationPopup?.department || '-'}</p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">직책</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">{userInformationPopup?.position || '-'}</p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">전화</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">{userInformationPopup?.phone || '-'}</p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">휴대전화</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">{userInformationPopup?.mobile || '-'}</p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">권한</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">{userInformationPopup?.role || '-'}</p>
        </dd>
      </dl>
    </Popup>
  )
}

export default UserInformationPopup
