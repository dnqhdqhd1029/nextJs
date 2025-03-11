import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

import { initUserProfilePopupAction } from '~/stores/modules/contents/admin/adminUser'
import { initUserPopupAction, userPopupAction } from '~/stores/modules/contents/myLicense/myLicense'
import { licenseInformationPopupAction, userInformationPopupAction } from '~/stores/modules/contents/user/user'
import type { BaseResponseCommonObject, UserDto } from '~/types/api/service'
import { useGetOneUserOption } from '~/utils/api/user/useGetOneUser'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useMyLicense = () => {
  const dispatch = useAppDispatch()

  const { userPopup } = useAppSelector(state => state.myLicenseSlice)
  const { licenseInfo, userInfo, isDemoLicense } = useAppSelector(state => state.authSlice)

  const { data: apiGetOneUser } = useGetOneUserOption(userPopup.key > 0 ? userPopup.key : 0)

  const setUserProfilePopupAction = useCallback(() => dispatch(initUserPopupAction()), [userPopup])

  const openDetailPopupAction = useCallback(() => {
    const params = {
      ...userPopup,
      isOpen: true,
      type: 'detail',
    }
    dispatch(userPopupAction(params))
  }, [userPopup])

  const openLicensePopup = (id: number) => {
    dispatch(
      licenseInformationPopupAction({
        isOpen: true,
        idKey: id,
        license: null,
      })
    )
  }

  const openUserProfilePopupAction = (id: number) => {
    dispatch(
      userInformationPopupAction({
        isOpen: true,
        idKey: Number(id),
        userId: 0,
        name: '',
        email: '',
        mobile: '',
        phone: '',
        nickname: '',
        displayName: '',
        stateCode: '',
        role: '',
        department: '',
        position: '',
        timezone: '',
        landingPage: '',
        selectedGroupId: 0,
        receiveLetter: true,
        regisAt: '',
        lastLoginAt: '',
        passwdChangeAt: '',
        company: {
          companyId: 0,
          name: '',
          totalMembers: '',
          wsite: '',
        },
        groups: [],
      })
    )
  }

  useEffect(() => {
    if (!apiGetOneUser) return
    const { status, data: apiData, message } = apiGetOneUser as BaseResponseCommonObject
    if (status === 'S') {
      const res = apiData as UserDto
      const param = {
        email: res?.email || '',
        nickName: res?.displayName || '-',
        phone: res?.phone || '',
        mobile: res?.mobile || '',
        role: res?.role === 'ADMIN' ? '관리자' : '사용자',
        isOpen: true,
        type: 'userProfile',
        key: 0,
      }
      dispatch(userPopupAction(param))
    } else {
      const param = {
        isLoading: false,
        isOpen: false,
        type: '',
        keyValue: 0,
      }
      openToast(message?.message, 'error')
      dispatch(initUserProfilePopupAction(param))
    }
  }, [apiGetOneUser])

  return {
    licenseInfo,
    userPopup,
    isDemoLicense,
    userInfo,

    openUserProfilePopupAction,
    openLicensePopup,

    openDetailPopupAction,
    setUserProfilePopupAction,
  }
}
