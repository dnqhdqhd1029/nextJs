import { ChangeEvent, useCallback, useEffect } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

import { extendedCommonCodeTargetList } from '~/components/contents/admin/defaultData'
import { API_LIST_TYPE_MAX_COUNT, EMAIL_PATTERN, EMAIL_PATTERN_DESCRIPTION } from '~/constants/common'
import { USER_STATE_CODE } from '~/constants/common/user'
import {
  companyGroupOptionsAction,
  groupPopupProps,
  initAction,
  initGroupNmChangePopupAction,
  initRequestPopupTypesAction,
  initUserProfilePopupAction,
  isLoadingAction,
  requestPopupTypesAction,
  requestPopupTypesProps,
  requestSearchParamsType,
  requestSearchTextAction,
  setListAction,
  setPageGroupListAction,
  userProfilePopupAction,
} from '~/stores/modules/contents/admin/adminGroup'
import { setUserSelectGroupAction, UserInfoAuth } from '~/stores/modules/contents/auth/auth'
import { selectDefaultUserGroupAction, setCurrentGroupAction } from '~/stores/modules/contents/header/header'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import type { BaseResponseCommonObject, GroupDtoForUser, UserDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { PageableDataDto } from '~/types/contents/api'
import { MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'
import { usePostInquiry, UsePostInquiryParams } from '~/utils/api/additionalServices/useGetLicenseInfo'
import { apiGetAuth } from '~/utils/api/auth/useGetAuth'
import { apiGetCommonCode, CommonCode, useGetCommonCode } from '~/utils/api/common/useGetCommonCode'
import { useDeleteGroup } from '~/utils/api/group/useDeleteGroup'
import { apiGetAllGroups, useGetAllGroups } from '~/utils/api/group/useGetAllGroups'
import { apiGetGroupSearch, type GroupDto, useGetGroupSearch } from '~/utils/api/group/useGetGroupSearch'
import { apiGetGroupUserDeleteCheck } from '~/utils/api/group/useGetGroupUserDeleteCheck'
import { useAdminGetAllUsers, useGetOneGroup } from '~/utils/api/group/useGetOneGroup'
import { usePostGroupCreate } from '~/utils/api/group/usePostGroupCreate'
import { usePostGroupNameCheck } from '~/utils/api/group/usePostGroupNameCheck'
import { usePostGroupUserUpdate } from '~/utils/api/group/usePostGroupUserUpdate'
import { usePutGroupNameChange, UsePutGroupNameChangeParams } from '~/utils/api/group/usePutGroupNameChange'
import { useGetAdminMenuAccess } from '~/utils/api/user/useGetAdminMenuAccess'
import { apiGetUsers } from '~/utils/api/user/useGetAllUsers'
import { apiGetOneUser, useGetOneUserOption } from '~/utils/api/user/useGetOneUser'
import { usePostUserPasswordCheck } from '~/utils/api/user/usePostUserPasswordCheck'
import { usePutUserSelectGroup } from '~/utils/api/user/usePutUserSelectGroup'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'
import { useUserSort } from '~/utils/hooks/contents/admin/useUserSort'

export const useAdminGroup = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { getSortedUserArray } = useUserSort()

  const {
    commonParentCode,
    requestPopupTypes,
    searchUserId,
    userPopup,
    requestSearchParams,
    pageCount,
    groupList,
    companyGroupOptions,
    userList,
    pageGroupList,
    requestSearchText,
    isLoading,
  } = useAppSelector(state => state.adminGroupSlice)
  const { licenseInfo, userInfo, timeZone } = useAppSelector(state => state.authSlice)
  const { currentGroup } = useAppSelector(state => state.headerSlice)

  const updateUserSelectGroup = usePutUserSelectGroup()
  const updateGroupUsers = usePostGroupUserUpdate()
  const apiInquiryAction = usePostInquiry()
  const checkGroupName = usePostGroupNameCheck()
  const createGroup = usePostGroupCreate()
  const updateGroupName = usePutGroupNameChange()
  const checkUserPassword = usePostUserPasswordCheck()
  const deleteGroup = useDeleteGroup()

  const { data: apiGetOneUser } = useGetOneUserOption(userPopup.keyValue > 0 ? userPopup.keyValue : 0)
  const { data: apiGetOneGroup } = useGetOneGroup(userPopup.groupKey > 0 ? userPopup.groupKey : 0)

  const requestSearchTextChange = useCallback(
    (e: string) => {
      dispatch(requestSearchTextAction(e))
    },
    [requestSearchText]
  )

  const initUserProfilePopupActionChange = useCallback(() => {
    dispatch(
      initUserProfilePopupAction({
        isLoading: false,
        isOpen: false,
        keyValue: 0,
        type: '',
      })
    )
  }, [])

  const setOpenCreatGroup = useCallback(
    (e: boolean, userId: number, type: string) => {
      const param = {
        isLoading: true,
        isOpen: e,
        userId: userId,
        type: type,
        keyValue: 0,
      }
      dispatch(initGroupNmChangePopupAction(param))
    },
    [dispatch]
  )

  const setUserProfilePopupAction = useCallback(
    (e: boolean, userId: number, type: string) => {
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
    },
    [dispatch]
  )

  const setGroupNmChangePopupAction = useCallback(
    (e: boolean, group: GroupDto, type: string) => {
      if (type === 'delete' && group.users.length > 0) {
        openToast('그룹에 속한 회원이 있습니다. 삭제하려면 그룹에 속한 회원이 없어야 합니다.', 'warning')
      } else {
        const param = {
          isLoading: true,
          isOpen: e,
          type: type,
          keyValue: group?.groupId ? Number(group.groupId) : 0,
        }
        dispatch(initGroupNmChangePopupAction(param))
      }
    },
    [dispatch]
  )

  const searchUserIdActionChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>, hook: requestSearchParamsType) => {
      const flag = e.target.checked
      const param = {
        ...hook,
        page: 1,
        searchUserId: flag && userInfo?.userId ? userInfo?.userId : 0,
      }
      await adminGroup(param)
    },
    [dispatch]
  )

  const handlePaginationChange = useCallback(
    async (e: number, hook: requestSearchParamsType) => {
      const param = {
        ...hook,
        page: e,
      }
      await adminGroup(param)
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
      await adminGroup(param)
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
      await adminGroup(param)
    },
    [dispatch]
  )

  const handleChangeSort = useCallback(
    async (e: string[], hook: requestSearchParamsType) => {
      const param = {
        ...hook,
        sort: e,
      }
      await adminGroup(param)
    },
    [dispatch]
  )

  const handleAuthChange = useCallback(
    async (e: SelectListOptionItem, hook: requestSearchParamsType) => {
      const param = {
        ...hook,
        page: 1,
        searchUserId: e.id === '' ? -1 : Number(e.id),
      }
      await adminGroup(param)
    },
    [dispatch]
  )

  const handleTagListChange = useCallback(
    async (tagList: MbTagSearchTagItem[], hook: groupPopupProps) => {
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

  const openRequestPopup = useCallback(
    async (param: requestPopupTypesProps) => {
      const params = {
        type: 'login',
        titleErr: '',
        title: '',
        contents: '',
        contentsErr: '',
        filesList: [],
        selectedList: param.selectedList,
        selectedValue: param.selectedList.length > 0 ? param.selectedList[0] : param.selectedValue,
        isOpen: true,
        name: '',
        nameErr: '',
        phoneNm: '',
        phoneNmErr: '',
        email: '',
        emailErr: '',
        telephone: '',
      }
      dispatch(requestPopupTypesAction(params))
    },
    [dispatch]
  )

  const settingLayerItems = [
    {
      title: '그룹명 수정',
      setFunc: (group: GroupDto) => setGroupNmChangePopupAction(false, group, 'nameChange'),
    },
    {
      title: '그룹 회원 관리',
      setFunc: (group: GroupDto) => setGroupNmChangePopupAction(false, group, 'userManagement'),
    },
    {
      title: '삭제하기',
      setFunc: (group: GroupDto) => setGroupNmChangePopupAction(true, group, 'delete'),
    },
  ]

  const requestPopupUserAction = async (e: requestPopupTypesProps) => {
    let params: UsePostInquiryParams = {
      request: {
        whyCode: e.selectedValue.id,
        title: e.title,
        content: e.contents,
      },
      fileList: [],
    }
    if (e.filesList && e.filesList.length > 0) {
      for await (const newFile of e.filesList) {
        if (newFile.file) params.fileList = [...params.fileList, newFile.file]
      }
    }
    const { status, data, message } = await apiInquiryAction.mutateAsync(params)
    if (status === 'S') {
      dispatch(initRequestPopupTypesAction())
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setRequestPopupAction = async (e: requestPopupTypesProps) => {
    if (e.title === '') {
      const params = {
        ...e,
        titleErr: '제목을 입력해주세요',
      }
      dispatch(requestPopupTypesAction(params))
    } else if (e.type === 'customer' && !EMAIL_PATTERN.test(e.email)) {
      const params = {
        ...e,
        emailErr: EMAIL_PATTERN_DESCRIPTION,
      }
      dispatch(requestPopupTypesAction(params))
    } else if (e.type === 'customer' && e.name === '') {
      const params = {
        ...e,
        nameErr: '이름을 입력해주세요',
      }
      dispatch(requestPopupTypesAction(params))
    } else {
      await requestPopupUserAction(e)
    }
  }

  const handleChange = async (param: string, hook: requestSearchParamsType) => {
    const params = {
      ...hook,
      page: 1,
      keyword: param,
    }
    await adminGroup(params)
  }

  const setPassword = async (param: string, item: groupPopupProps) => {
    const params = {
      ...item,
      password: param,
      passwordErr: '',
    }
    dispatch(userProfilePopupAction(params))
  }

  const setGroupUserItem = useCallback(
    async (e: MbTagSearchTagItem[], props: groupPopupProps) => {
      let dataList = [...props.nameList]
      if (e.length > 0) {
        dataList = e
      }
      dispatch(
        userProfilePopupAction({
          ...props,
          nameList: dataList,
        })
      )
    },
    [userPopup.nameList]
  )

  const setUserItem = useCallback(
    async (i: boolean, e: MbTagSearchTagItem, props: groupPopupProps) => {
      let dataList = [...props.nameList]
      if (!i) {
        dataList = [...dataList, e]
      } else {
        dataList = dataList.filter(k => k.id !== e.id)
      }
      dispatch(
        userProfilePopupAction({
          ...props,
          nameList: dataList,
        })
      )
    },
    [userPopup.nameList]
  )

  const setClearUserItemAction = useCallback(
    async (item: groupPopupProps) => {
      if (item.nameList && item.nameList.some(e => e.subData.length < 2)) {
        openToast('회원은 최소 1개의 그룹에 가입해야 합니다.', 'error')
      } else {
        dispatch(
          userProfilePopupAction({
            ...item,
            nameList: [],
          })
        )
      }
    },
    [userPopup.nameList]
  )

  const setUserItemListControl = useCallback(
    async (e: MbTagSearchTagItem, item: groupPopupProps) => {
      const selectedUser = item.nameList.find(item => item.id === e.id)
      if (selectedUser?.subData && selectedUser?.subData.length < 2) {
        openToast('회원은 최소 1개의 그룹에 가입해야 합니다.', 'error')
      } else {
        dispatch(
          userProfilePopupAction({
            ...item,
            nameList: item.nameList.filter(item => item.id !== e.id),
          })
        )
      }
    },
    [userPopup.nameList]
  )

  const setGroupNmAction = async (param: string, item: groupPopupProps) => {
    const params = {
      ...item,
      groupNm: param,
      groupNmErr: '',
    }
    dispatch(userProfilePopupAction(params))
  }

  const setDeleteTagListAction = async (hook: groupPopupProps, tag: MbTagSearchTagItem): Promise<boolean> => {
    const { status, message } = await apiGetGroupUserDeleteCheck({
      groupId: hook.groupKey,
      userId: parseInt(tag.id),
    })

    if (status === 'S') {
      return Promise.resolve(true)
    } else {
      openToast(message?.message, 'error')
    }
    return Promise.resolve(false)
  }

  const setTagTargetNameListAction = async (hook: groupPopupProps, nameList: MbTagSearchTagItem[]) => {
    dispatch(
      userProfilePopupAction({
        ...hook,
        nameList,
      })
    )
  }

  const createGroupValidate = async (item: groupPopupProps) => {
    let res = false
    let params = { ...item }
    if (params.groupNm === '') {
      res = true
      params.groupNmErr = '그룹명을 입력해 주세요.'
    }
    //
    // if (params.nameList.length < 1) {
    //   res = true
    //   params.nameListErr = '회원을 선택해 주세요.'
    //   openToast('회원을 선택해 주세요.', 'warning')
    // }

    dispatch(userProfilePopupAction(params))
    return !res
  }

  const editGroupAction = async (item: groupPopupProps, apiParam: requestSearchParamsType) => {
    const putGroupNameChangeProps: UsePutGroupNameChangeParams = {
      id: item.groupKey ?? 0,
      groupInfo: {
        name: item.groupNm,
        isDefault: item.isDefault,
      },
    }
    const { status, data, message } = await updateGroupName.mutateAsync(putGroupNameChangeProps)
    if (status === 'S') {
      openToast(message?.message, 'success')
      const param = {
        isLoading: false,
        isOpen: false,
        type: '',
        keyValue: 0,
      }
      dispatch(initGroupNmChangePopupAction(param))
      dispatch(
        setCurrentGroupAction({
          groupId: item.groupKey ?? 0,
          name: item.groupNm,
          isDefault: item.isDefault,
        })
      )
      await adminGroup(apiParam)
    } else {
      openToast(message?.message, 'error')
    }
  }
  const editGroupCheckAction = async (item: groupPopupProps, apiParam: requestSearchParamsType) => {
    let isProcess = false
    let params = { ...item }
    if (params.groupNm === '') {
      params.groupNmErr = '그룹명을 입력해 주세요.'
      isProcess = true
    } else {
      const { status, data, message } = await checkGroupName.mutateAsync({
        oldName: item.oldGroupNm,
        newName: item.groupNm,
      })
      if (status === 'S') {
        const code = data as unknown
        if (code === 'NotChange') {
          params.groupNmErr = '이전과 동일한 그룹명입니다.'
          isProcess = true
          isProcess = true
        } else if (code === 'GroupNameExist') {
          params.groupNmErr = '같은 이름의 그룹이 이미 존재합니다.'
          isProcess = true
        } else if (code === 'GROUP_NAME_CHANGE_OK') {
          await editGroupAction(item, apiParam)
        }
      } else {
        params.groupNmErr = message?.message || ''
        isProcess = true
      }
    }
    if (isProcess) {
      dispatch(userProfilePopupAction(params))
    }
  }

  const createGroupAction = async (item: groupPopupProps, apiParam: requestSearchParamsType) => {
    const cheked = await createGroupValidate(item)
    if (cheked) {
      const tempUserList: number[] = []
      for await (const number of item.nameList) tempUserList.push(Number(number.id))
      const { status, data, message } = await checkGroupName.mutateAsync({ oldName: '', newName: item.groupNm })
      if (status === 'S') {
        const { status, data, message } = await createGroup.mutateAsync({ name: item.groupNm, users: tempUserList })
        if (status === 'S') {
          openToast(`"${item.groupNm}" 그룹을 생성했습니다.`, 'success')
          dispatch(
            initUserProfilePopupAction({
              isLoading: false,
              isOpen: false,
              type: '',
              keyValue: 0,
            })
          )
          await adminGroup(apiParam)
        } else {
          openToast(message?.message, 'error')
        }
      } else {
        openToast(message?.message, 'error')
      }
    }
  }

  const changeGroupAndMove = async (group: GroupDto, currents: GroupDtoForUser) => {
    let temp = currents
    const { status, message } = await updateUserSelectGroup.mutateAsync({ id: group.groupId as number })
    if (status === 'S') {
      temp = group as GroupDtoForUser
      dispatch(setUserSelectGroupAction(group.groupId))
      router.reload()
    } else {
      openToast(message?.message, 'error')
    }
    dispatch(selectDefaultUserGroupAction({ currentGroup: temp, groupBar: status !== 'S', isLoading: false }))
  }

  const checkOutGroup = async (item: GroupDto, currents: GroupDtoForUser) => {
    if (!item.groupId) return
    if (currentGroup?.groupId === item.groupId) return
    const check = item.users.find(e => e.userId === userInfo.userId)
    if (check) {
      await changeGroupAndMove(item, currents)
    } else {
      openToast(`이 그룹의 회원이 아닙니다. 가입해야 접속할 수 있습니다.`, 'error')
    }
  }

  const groupDeleteAction = async (item: groupPopupProps, apiParam: requestSearchParamsType) => {
    let params = { ...item }
    if (params.password === '') {
      params.passwordErr = '비밀번호는 필수항목입니다.'
      dispatch(userProfilePopupAction(params))
    } else {
      const { status, data } = await checkUserPassword.mutateAsync({ password: item.password })
      if (status === 'S' && data) {
        const { status: finStatus, message } = await deleteGroup.mutateAsync({
          id: item.groupKey,
        })
        if (finStatus === 'S') {
          openToast(`"${item?.name}" 그룹을 삭제했습니다.`, 'success')
          dispatch(
            initUserProfilePopupAction({
              isLoading: false,
              isOpen: false,
              type: '',
              keyValue: 0,
            })
          )
          await adminGroup(apiParam)
        } else {
          openToast(message?.message, 'error')
        }
      } else {
        params.passwordErr = '비밀번호가 일치하지 않습니다.'
        dispatch(userProfilePopupAction(params))
      }
    }
  }

  const groupUserManageCheckAction = async (item: groupPopupProps, apiParam: requestSearchParamsType) => {
    let params = { ...item }
    const { status, data, message } = await updateGroupUsers.mutateAsync({
      groupId: item.groupKey,
      users: item.nameList.map(e => Number(e.id)),
    })
    if (status === 'S') {
      openToast(message?.message, 'success')
      dispatch(
        initGroupNmChangePopupAction({
          isLoading: false,
          isOpen: false,
          type: '',
          keyValue: 0,
        })
      )
      await adminGroup(apiParam)
    } else {
      params.nameListErr = message?.message || ''
      dispatch(userProfilePopupAction(params))
    }
  }

  const setGroupDto = async (res: GroupDto) => {
    const param = {
      ...userPopup,
      isLoading: false,
    }
    if (userPopup.type === 'nameChange') {
      param.oldGroupNm = res.name
      param.groupNm = res.name
      param.isDefault = res.isDefault ?? false
      param.isOpen = true
    } else if (userPopup.type === 'userManagement') {
      let newTagItems: MbTagSearchTagItem[] = []
      const newUsers = getSortedUserArray(res.users)
      for await (const newUser of newUsers) {
        const isUncertified =
          newUser.stateCode === USER_STATE_CODE.UNCERTIFIED || newUser.stateCode === USER_STATE_CODE.INACTIVE
        const matchUser = userList.find(e => e.id === newUser.userId?.toString())
        newTagItems = [
          ...newTagItems,
          {
            id: newUser.userId?.toString() ?? '',
            label:
              newUser.nickname && newUser.nickname !== ''
                ? newUser.nickname
                : newUser.name && newUser.name !== ''
                ? newUser.name
                : newUser.email && newUser.email !== ''
                ? newUser.email
                : '',
            type: isUncertified ? 'n2' : 'n3',
            subData: matchUser?.subData ?? [],
          },
        ]
      }
      param.nameList = newTagItems
      param.isOpen = true
    } else if (userPopup.type === 'delete') {
      param.name = res.name
      param.isOpen = true
    }

    dispatch(userProfilePopupAction(param))
  }

  const getCommonCode = async (code: string) => {
    let res: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: code })
    if (status === 'S') {
      res = data as CommonCode[]
    }
    return res
  }

  const userAllGroup = async () => {
    let res: GroupDto[] = []
    const { status, data, message } = await apiGetAllGroups()
    if (status === 'S') {
      res = data as GroupDto[]
    }
    return res
  }

  const adminGroup = async (param: requestSearchParamsType) => {
    dispatch(isLoadingAction(true))
    const { status, data, message } = await apiGetGroupSearch({
      page: param.page,
      size: param.size,
      sort: param.sort,
      keyword: param.keyword,
      userId: param.searchUserId,
    })
    if (status === 'S') {
      const { content, totalElements, totalPages } = data as PageableDataDto<GroupDto>
      dispatch(
        setListAction({
          list: content,
          pageCount: {
            totalCount: totalElements ?? 0,
            totalPageCount: totalPages ?? 0,
          },
          apiDto: param,
        })
      )
      const tempUserList = await userListData()
      dispatch(companyGroupOptionsAction({ company: tempUserList.tempList, users: tempUserList.newUserList }))
    }
    dispatch(isLoadingAction(false))
  }

  const userListData = async () => {
    let tempList: SelectListOptionItem[] = [
      {
        id: '0',
        name: '전체 회원',
      },
    ]
    let newUserList: MbTagSearchResultItem[] = []
    const { status, data, message } = await apiGetUsers({
      page: 1,
      size: API_LIST_TYPE_MAX_COUNT,
      sort: ['name!desc'],
    })
    if (status === 'S') {
      const { content } = data as PageableDataDto<UserDto>
      if (content && content.length > 0) {
        for await (const resItem of content) {
          const name =
            resItem.stateCode === USER_STATE_CODE.UNCERTIFIED
              ? resItem.email
              : resItem.displayName === ''
              ? resItem.name
              : resItem.displayName
          tempList = [
            ...tempList,
            {
              id: resItem.userId ? resItem.userId.toString() : '',
              name: name ?? '',
            },
          ]
          newUserList = [
            ...newUserList,
            {
              id: resItem.userId?.toString() ?? '',
              label:
                resItem.nickname && resItem.nickname !== ''
                  ? resItem.nickname
                  : resItem.name && resItem.name !== ''
                  ? resItem.name
                  : resItem.email && resItem.email !== ''
                  ? resItem.email
                  : '',
              checked: false,
              subData: resItem.groups ?? [],
            },
          ]
        }
      }
    }
    return {
      tempList,
      newUserList,
    }
  }

  const init = async () => {
    let tempRequestType: CommonCode[] = []
    let tempGroupList: GroupDto[] = []
    dispatch(initAction())
    try {
      for await (const re of extendedCommonCodeTargetList) {
        if (re.id === 'INQUIRY_WHY_CODE') {
          tempRequestType = await getCommonCode(re.id)
          const list = tempRequestType.map(e => {
            return { id: e.code, name: e.name }
          })
          dispatch(
            requestPopupTypesAction({
              ...requestPopupTypes,
              selectedValue: list[0],
              selectedList: list,
            })
          )
        } else if (re.id === 'GROUP') {
          tempGroupList = await userAllGroup()
          dispatch(setPageGroupListAction(tempGroupList))
        } else if (re.id === 'USER') {
          const tempUserList = await userListData()
          dispatch(companyGroupOptionsAction({ company: tempUserList.tempList, users: tempUserList.newUserList }))
        }
      }
      await adminGroup({
        page: 1,
        size: 20,
        sort: ['regisAt!desc'],
        keyword: '',
        searchUserId: -1,
      })
    } catch (e) {}
  }

  useEffect(() => {
    if (!apiGetOneGroup) return
    const { status, data: apiData, message } = apiGetOneGroup as BaseResponseCommonObject
    if (status === 'S') {
      const res = apiData as GroupDto
      setGroupDto(res)
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
  }, [apiGetOneGroup])

  useEffect(() => {
    if (!apiGetOneUser) return
    const { status, data: apiData, message } = apiGetOneUser as BaseResponseCommonObject
    if (status === 'S') {
      const res = apiData as UserDto
      const param = {
        ...userPopup,
        isOpen: true,
        isLoading: false,
        email: res?.email || '',
        nickName: res?.displayName || '-',
        phone: res?.phone || '',
        mobile: res?.mobile || '',
        role: res?.role === 'ADMIN' ? '관리자' : '사용자',
      }
      dispatch(userProfilePopupAction(param))
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
    isLoading,
    userInfo,
    licenseInfo,
    commonParentCode,
    userPopup,
    pageCount,
    requestSearchParams,
    groupList,
    settingLayerItems,
    companyGroupOptions,
    searchUserId,
    requestPopupTypes,
    userList,
    requestSearchText,
    timeZone,
    currentGroup,

    editGroupCheckAction,
    handleChange,
    setGroupNmAction,
    setTagTargetNameListAction,
    createGroupAction,
    setRequestPopupAction,
    groupUserManageCheckAction,
    setDeleteTagListAction,
    setPassword,
    groupDeleteAction,
    checkOutGroup,
    init,

    setUserItemListControl,
    openRequestPopup,
    searchUserIdActionChange,
    handleTagListChange,
    setUserProfilePopupAction,
    setOpenCreatGroup,
    handleAuthChange,
    handleChangeSort,
    handleChangeSize,
    handleKeywordsChange,
    handlePaginationChange,
    requestSearchTextChange,
    setGroupNmChangePopupAction,
    setUserItem,
    setGroupUserItem,
    setClearUserItemAction,
    initUserProfilePopupActionChange,
  }
}
