import { useCallback, useEffect, useLayoutEffect } from 'react'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import { defaulUserPopupData } from '~/components/contents/admin/defaultData'
import { PASSWORD_PATTER_DESCRIPTION, PASSWORD_PATTERN, TELEPHONE_NUMBER_PATTERN } from '~/constants/common'
import {
  initAction,
  initUserProfilePopupAction,
  isLoadingAction,
  isOnlyActiveUserAction,
  requestSearchParamsAction,
  requestSearchParamsType,
  requestSearchTextAction,
  setListAction,
  userParamKeywordAction,
  userPopupProps,
  userProfilePopupAction,
} from '~/stores/modules/contents/admin/adminUser'
import { setUserInfoByAdminUser } from '~/stores/modules/contents/auth/auth'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import type { BaseResponseCommonObject, GroupDtoForUser, ModifyUserDtoRoleEnum, UserDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { PageableDataDto } from '~/types/contents/api'
import type { MbTagSearchTagItem } from '~/types/contents/Common'
import { useUnauthenticatedUser } from '~/utils/api/user/useDeleteUnauthenticatedUser'
import { apiGetUsers, useGetAllUsers } from '~/utils/api/user/useGetAllUsers'
import { apiGetOneUser, useGetOneUserOption } from '~/utils/api/user/useGetOneUser'
import { apiGetUserRegistReMailing, useGetUserResetPasswor } from '~/utils/api/user/useGetUserResetPassword'
import { usePostUserPasswordCheck } from '~/utils/api/user/usePostUserPasswordCheck'
import { usePutUser, UsePutUserParams } from '~/utils/api/user/usePutUser'
import { usePutUserStatus } from '~/utils/api/user/usePutUserStatus'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useAdminUser = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { isDemoLicense, licenseInfo, userInfo, timeZone } = useAppSelector(state => state.authSlice)
  const settingsRefinedValue = useAppSelector(state => state.userSettingSlice.refinedValue)
  const {
    commonParentCode,
    userPopup,
    userParamKeyword,
    requestSearchText,
    isLoading,
    requestSearchParams,
    pageCount,
    isOnlyActiveUser,
    userList,
    pageGroupList,
  } = useAppSelector(state => state.adminUserSlice)

  const checkUserPassword = usePostUserPasswordCheck()
  const updateUserInfo = usePutUser()
  const putUserStatus = usePutUserStatus()
  const deleteUser = useUnauthenticatedUser()

  const { data: apiGetUserResetPassword } = useGetUserResetPasswor({ id: userPopup.passwordAction })

  const setCloseUserPopup = useCallback(async () => {
    dispatch(
      initUserProfilePopupAction({
        isLoading: false,
        isOpen: false,
        keyValue: 0,
        type: '',
      })
    )
  }, [userPopup])

  const setOnChangeUserGroupList = useCallback(
    async (e: MbTagSearchTagItem[], hook: userPopupProps) => {
      let err = ''
      let dataList = [...hook.storedTagItems]
      if (e.length > 0) {
        err = ''
        dataList = e
      } else {
        err = '회원은 최소 1개의 그룹에 가입해야 합니다.'
      }
      dispatch(
        userProfilePopupAction({
          ...hook,
          storedTagItems: dataList,
          groupErrorMessage: err,
        })
      )
    },
    [userPopup.storedTagItems, userPopup.groupErrorMessage]
  )

  const setOnChangeGroupItemList = useCallback(
    async (i: boolean, e: MbTagSearchTagItem, hook: userPopupProps) => {
      let err = ''
      let dataList = [...hook.storedTagItems]
      if (!i) {
        dataList = [...dataList, e]
      } else {
        dataList = dataList.filter(k => k.id !== e.id)
      }
      if (dataList.length < 1) {
        err = '회원은 최소 1개의 그룹에 가입해야 합니다.'
        dataList = [...hook.storedTagItems]
      }
      dispatch(
        userProfilePopupAction({
          ...hook,
          storedTagItems: dataList,
          groupErrorMessage: err,
        })
      )
    },
    [userPopup.storedTagItems, userPopup.groupErrorMessage]
  )

  const setGroupItemListControl = useCallback(
    async (e: MbTagSearchTagItem, hook: userPopupProps) => {
      let err = ''
      let res = hook.storedTagItems.filter(item => item.id !== e.id)
      if (res.length < 1) {
        err = '회원은 최소 1개의 그룹에 가입해야 합니다.'
        res = [...hook.storedTagItems]
      }
      dispatch(
        userProfilePopupAction({
          ...hook,
          storedTagItems: res,
          groupErrorMessage: err,
        })
      )
    },
    [userPopup.storedTagItems, userPopup.groupErrorMessage]
  )

  const setUserProfilePopupAction = useCallback(
    async (e: boolean, userId: number, type: string) => {
      if (type === 'unauthenticedUserMailing') {
        const { status, data, message } = await apiGetUserRegistReMailing(userId)
        if (status === 'S') {
          openToast('회원 인증 이메일 재발송하였습니다.', 'success')
        } else {
          openToast(message?.message, 'error')
        }
      } else if (type === 'userProfile') {
        dispatch(
          userInformationPopupAction({
            isOpen: true,
            idKey: Number(userId),
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
      } else {
        if (type === 'password' && isDemoLicense) {
          openToast('데모체험에서는 일부 기능이 제한됩니다.', 'error')
        } else {
          const { status, data, message } = await apiGetOneUser(userId)
          if (status === 'S') {
            const res = data as UserDto
            const param: userPopupProps = {
              ...defaulUserPopupData,
              isOpen: true,
              type: type,
              keyValue: userId,
              isLoading: false,
            }
            if (type === 'userProfile') {
              param.email = res?.email || ''
              param.nickName = res?.displayName || '-'
              param.phone = res?.phone || ''
              param.mobile = res?.mobile || ''
              param.role = res?.role === 'ADMIN' ? '관리자' : '사용자'
              param.department = res?.department || ''
              param.position = res?.position || ''
              param.isOpen = true
            } else if (type === 'unauthenticedUserCancel') {
              param.email = res?.email || ''
              param.isOpen = true
            } else if (type === 'password') {
              param.name = res?.name || ''
              param.isOpen = true
            } else if (type === 'status') {
              param.email = res?.email || ''
              param.name = res?.name || ''
              param.userStatus = res?.stateCode || ''
              param.isOpen = true
            } else if (type === 'update') {
              if (res?.groups && res?.groups.length > 0) {
                const tempNewTagItems: MbTagSearchTagItem[] = []
                for await (const group of res?.groups) {
                  tempNewTagItems.push({
                    id: group.groupId ? group.groupId.toString() : uuid(),
                    label: group.name ?? '',
                  })
                }
                param.email = res?.email || ''
                param.name = res?.name || ''
                param.nickName = res?.nickname || ''
                param.phone = res?.phone || ''
                param.mobile = res?.mobile || ''
                param.permission = res?.role === 'ADMIN' ? 'ADMIN' : 'USER'
                param.department = res?.department || ''
                param.position = res?.position || ''
                param.nameErr = ''
                param.groupErrorMessage = ''
                param.storedTagItems = tempNewTagItems
                param.userGroupList = []
                param.groups = res?.groups || []
                param.isOpen = true
              } else {
                param.isOpen = false
              }
            }
            dispatch(userProfilePopupAction(param))
          } else {
            openToast(message?.message, 'error')
          }
        }
      }
    },
    [dispatch]
  )

  const handleStateChange = useCallback(
    async (e: boolean, hook: requestSearchParamsType) => {
      const param = {
        ...hook,
        page: 1,
        stateCode: {
          id: e ? 'ACTIVE' : '',
          name: e ? '활성' : '',
        },
      }
      dispatch(isOnlyActiveUserAction(e))
      await getUserList(param)
    },
    [dispatch]
  )

  const handleAuthChange = useCallback(
    async (e: SelectListOptionItem, hook: requestSearchParamsType) => {
      let tempRole = { id: '', name: '' }
      if (e.id === 'ADMIN') {
        tempRole = e
      } else if (e.id === 'USER') {
        tempRole = e
      } else if (e.id === 'ACTIVE') {
        tempRole = { id: '', name: '' }
      } else if (e.id === 'INACTIVE') {
        tempRole = { id: '', name: '' }
      } else if (e.id === 'UNCERTIFIED') {
        tempRole = { id: '', name: '' }
      } else if (e.id === 'LOCKED') {
        tempRole = { id: '', name: '' }
      }
      const param = {
        ...hook,
        role: tempRole,
        page: 1,
      }
      await getUserList(param)
    },
    [dispatch]
  )

  const handlePaginationChange = useCallback(
    async (e: number, hook: requestSearchParamsType) => {
      const param = {
        ...hook,
        page: e,
      }
      await getUserList(param)
    },
    [dispatch]
  )

  const handleKeywordsChange = useCallback(
    async (e: string, hook: requestSearchParamsType) => {
      const param = {
        ...hook,
        page: 1,
        keyword: e,
      }
      await getUserList(param)
    },
    [dispatch]
  )

  const handleChangeSize = useCallback(
    async (e: number, hook: requestSearchParamsType) => {
      const param = {
        ...hook,
        page: 1,
        size: e,
      }
      await getUserList(param)
    },
    [dispatch]
  )

  const handleChangeSort = useCallback(
    async (e: string[], hook: requestSearchParamsType) => {
      const param = {
        ...hook,
        sort: e,
      }
      await getUserList(param)
    },
    [dispatch]
  )

  const setUserParamKeywordAction = useCallback(
    async (e: string) => {
      dispatch(userParamKeywordAction(e))
    },
    [userParamKeyword]
  )

  const handleTagListChange = useCallback(
    async (tagList: MbTagSearchTagItem[], hook: userPopupProps) => {
      const newGroups: GroupDtoForUser[] = []
      for await (const tag of tagList) {
        const group = pageGroupList?.find(group => group.groupId?.toString() === tag.id)
        if (group) {
          newGroups.push(group as GroupDtoForUser)
        }
      }
      const param = {
        ...hook,
        page: 1,
        groups: newGroups,
      }
      dispatch(userProfilePopupAction(param))
    },
    [dispatch]
  )

  const requestSearchTextChange = useCallback(
    async (param: string) => {
      dispatch(requestSearchTextAction(param))
    },
    [requestSearchText]
  )

  const setUserStatusAction = useCallback(
    async (param: string, hook: userPopupProps) => {
      const params = {
        ...hook,
        page: 1,
        userStatus: param,
      }
      dispatch(userProfilePopupAction(params))
    },
    [dispatch]
  )

  const init = async () => {
    dispatch(initAction())
    await getUserList({
      page: 1,
      size: 20,
      sort: ['name!desc'],
      keyword: '',
      role: { id: '', name: '' },
      stateCode: { id: '', name: '' },
    })
  }

  const getUserList = async (param: requestSearchParamsType) => {
    dispatch(isLoadingAction(true))
    const {
      status,
      data: apiData,
      message,
    } = await apiGetUsers({
      page: param.page,
      size: param.size,
      role: param.role.id,
      sort: param.sort,
      keyword: param.keyword,
      stateCode: param.stateCode.id,
    })

    if (status === 'S') {
      const { content, totalElements, totalPages } = apiData as PageableDataDto<UserDto>
      dispatch(
        setListAction({
          apiDto: param,
          list: content,
          pageCount: {
            totalCount: totalElements ?? 0,
            totalPageCount: totalPages ?? 0,
          },
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
    dispatch(isLoadingAction(false))
  }
  const handleChange = async (param: string, hook: requestSearchParamsType) => {
    const params = {
      ...hook,
      page: 1,
      keyword: param,
    }
    await getUserList(params)
  }

  const setPhoneAction = async (param: string, item: userPopupProps) => {
    const params = {
      ...item,
      phone: param,
    }
    dispatch(userProfilePopupAction(params))
  }

  const setTelePhoneAction = async (param: string, item: userPopupProps) => {
    const params = {
      ...item,
      mobile: param,
    }
    dispatch(userProfilePopupAction(params))
  }

  const setPermissionAction = async (param: string, item: userPopupProps) => {
    const params = {
      ...item,
      permission: param,
    }
    dispatch(userProfilePopupAction(params))
  }

  const setNameAction = async (param: string, item: userPopupProps) => {
    const params = {
      ...item,
      name: param,
      nameErr: '',
    }
    dispatch(userProfilePopupAction(params))
  }

  const setNickNameAction = async (param: string, item: userPopupProps) => {
    const params = {
      ...item,
      nickName: param,
    }
    dispatch(userProfilePopupAction(params))
  }

  const setDepartmentAction = async (param: string, item: userPopupProps) => {
    const params = {
      ...item,
      department: param,
    }
    dispatch(userProfilePopupAction(params))
  }

  const setPositionAction = async (param: string, item: userPopupProps) => {
    const params = {
      ...item,
      position: param,
    }
    dispatch(userProfilePopupAction(params))
  }

  const setPassword = async (param: string, item: userPopupProps) => {
    const params = {
      ...item,
      password: param,
      passwordErr: '',
    }
    dispatch(userProfilePopupAction(params))
  }

  const validateAction = async (item: userPopupProps) => {
    let res = false
    let params = { ...item }
    if (params.name === '') {
      res = true
      params.nameErr = '이름은 필수항목입니다.'
    }
    if (params.mobile !== '' && !TELEPHONE_NUMBER_PATTERN.test(params.mobile)) {
      res = true
      params.mobileErr = '유효한 번호가 아닙니다.'
    }
    if (params.storedTagItems.length < 1) {
      res = true
      params.groupErrorMessage = '회원은 최소 1개의 그룹에 가입해야 합니다.'
    }
    dispatch(userProfilePopupAction(params))
    return !res
  }
  const editUserAction = async (item: userPopupProps, apiKey: requestSearchParamsType) => {
    const check = await validateAction(item)
    if (check) {
      const groups: number[] = []
      item.storedTagItems.map(group => {
        groups.push(Number(group.id))
      })

      const putUserProps: UsePutUserParams = {
        id: item.keyValue as number,
        userInfo: {
          name: item.name ?? '',
          nickname: item.nickName,
          role: item.permission as ModifyUserDtoRoleEnum,
          phone: item.phone ?? '',
          mobile: item.mobile ?? '',
          department: item.department ?? '',
          position: item.position ?? '',
          groups,
        },
      }
      const { status, data, message } = await updateUserInfo.mutateAsync(putUserProps)
      if (status === 'S') {
        const param = {
          ...userInfo,
          name: item.name,
          nickname: item.nickName,
          role: item.permission as ModifyUserDtoRoleEnum,
          phone: item.phone ?? '',
          mobile: item.mobile ?? '',
          department: item.department ?? '',
          position: item.position ?? '',
        }
        if (userInfo.userId === item.keyValue) {
          dispatch(setUserInfoByAdminUser(param))
          router.reload()
        } else {
          dispatch(
            initUserProfilePopupAction({
              isLoading: true,
              isOpen: false,
              type: '',
              keyValue: 0,
            })
          )
        }
        await getUserList(apiKey)
        openToast(message?.message, 'success')
      } else {
        openToast(message?.message, 'error')
      }
    }
  }

  const sendPasswordEmailAction = async (item: userPopupProps, apiKey: requestSearchParamsType) => {
    let params = { ...item }
    if (item.password === '') {
      params.passwordErr = '비밀번호는 필수항목입니다.'
    } else if (!PASSWORD_PATTERN.test(item.password)) {
      params.passwordErr = PASSWORD_PATTER_DESCRIPTION
    } else {
      const { status, data, message } = await checkUserPassword.mutateAsync({ password: item.password })
      if (status === 'S') {
        if (item.type === 'unauthenticedUserCancel') {
          await deleteUserAction(item, apiKey)
          params.isLoading = true
          params.isOpen = false
          params.type = ''
          params.keyValue = 0
        } else {
          params.passwordAction = item.keyValue
        }
      } else {
        params.passwordErr = '비밀번호가 일치하지 않습니다.'
      }
    }
    dispatch(userProfilePopupAction(params))
  }

  const deleteUserAction = async (item: userPopupProps, apiKey: requestSearchParamsType) => {
    const { status, data, message } = await deleteUser.mutateAsync({ id: Number(item.keyValue) })
    if (status === 'S') {
      openToast('회원 추가를 취소했습니다.', 'success')
      await getUserList(apiKey)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const changeUserStatusAction = async (item: userPopupProps, apiKey: requestSearchParamsType) => {
    const params = {
      id: Number(item.keyValue),
      status: item.userStatus === 'ACTIVE',
    }
    const { status, data, message } = await putUserStatus.mutateAsync(params)
    if (status === 'S') {
      const toastMessage =
        item.userStatus === 'ACTIVE'
          ? '회원을 활성화했습니다. 이 회원은 이제 서비스를 이용할 수 있습니다.'
          : '회원을 비활성화했습니다. 이 회원은 더 이상 서비스를 이용할 수 없습니다.'
      openToast(toastMessage, 'success')
      openToast('이 회원에게 알림 메일을 보냈습니다.', 'success')
      await getUserList(apiKey)
      dispatch(
        initUserProfilePopupAction({
          isLoading: false,
          isOpen: false,
          type: '',
          keyValue: 0,
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }

  useEffect(() => {
    if (!apiGetUserResetPassword) return
    const param = {
      isLoading: false,
      isOpen: false,
      type: '',
      keyValue: 0,
    }
    const { status, message } = apiGetUserResetPassword as BaseResponseCommonObject
    if (status === 'S') {
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
    dispatch(initUserProfilePopupAction(param))
  }, [apiGetUserResetPassword])

  return {
    isLoading,
    userInfo,
    licenseInfo,
    commonParentCode,
    userPopup,
    pageCount,
    requestSearchParams,
    userList,
    requestSearchText,
    timeZone,
    userParamKeyword,
    settingsRefinedValue,
    isOnlyActiveUser,

    changeUserStatusAction,
    handleChange,
    setNameAction,
    setNickNameAction,
    setPermissionAction,
    setPhoneAction,
    setTelePhoneAction,
    setDepartmentAction,
    setPositionAction,
    editUserAction,
    setPassword,
    sendPasswordEmailAction,
    deleteUserAction,
    init,

    handleStateChange,
    setUserParamKeywordAction,
    setUserStatusAction,
    handleTagListChange,
    setUserProfilePopupAction,
    handleAuthChange,
    handleChangeSort,
    handleChangeSize,
    handleKeywordsChange,
    handlePaginationChange,
    requestSearchTextChange,
    setGroupItemListControl,
    setOnChangeGroupItemList,
    setOnChangeUserGroupList,
    setCloseUserPopup,
  }
}
