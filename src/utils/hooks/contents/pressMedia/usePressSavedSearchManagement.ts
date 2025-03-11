import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import {
  defaultBasicSavedSetting,
  defaultSavedSetting,
  disclosureScopeFilterOptionList,
  extendedShareScopeTargetList,
} from '~/components/contents/pressMedia/SearchManagement/defaultData'
import { ALLOWED_ORIGINS, SVC_DOMAIN_URL } from '~/constants/common'
import {
  categoryListAction,
  categoryListProps,
  contentDeletePopupAction,
  contentDeletePopupProps,
  getOwnerLayerAction,
  initAction,
  initPressPopupAction,
  initSavedSearchPopupAction,
  ownerLayerAction,
  ownerPopupAction,
  ownerPopupProps,
  pressContentListAction,
  pressContentListButtonAction,
  pressContentListProps,
  pressListParamsAction,
  pressListParamsProps,
  pressParamKeywordAction,
  pressPopupAction,
  pressPopupProps,
  resetPressListParamsAction,
  savedSearchPopupAction,
  savedSearchPopupProps,
  sortByOwnerAction,
  userPopupAction,
} from '~/stores/modules/contents/pressMedia/pressSearchManagement'
import { sharedKeyAction } from '~/stores/modules/contents/shared/shared'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import { BaseResponseCommonObject, GroupDto, type UserDto, UserDtoForGroup } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { PageableDataDto } from '~/types/contents/api'
import type { PressMediaCustomSearchListItem } from '~/types/contents/PressMedia'
import { apiGetMediasrchCount, useGetMediasrchCount } from '~/utils/api/contact/useSavedSearchCount'
import { useDeleteJournalistCustomSearch } from '~/utils/api/customSearch/journalist/useDeleteJournalistCustomSearch'
import {
  apiGetJournalistCustomSearchList,
  useGetJournalistCustomSearchList,
} from '~/utils/api/customSearch/journalist/useGetJournalistCustomSearchList'
import { usePostJournalistCustomSearchNameCheck } from '~/utils/api/customSearch/journalist/usePostJournalistCustomSearchNameCheck'
import { usePutJournalistCustomSearch } from '~/utils/api/customSearch/journalist/usePutJournalistCustomSearch'
import { apiGetActiveGroupInfo } from '~/utils/api/group/useGetGroupSearch'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const usePressSavedSearchManagement = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    categoryList,
    categoryData,
    pageCount,
    pressContentList,
    pressContentListButton,
    pressContentLoading,
    pressListParams,
    pressPopup,
    sortByOwner,
    ownerLayer,
    ownerGroup,
    ownerPopup,
    userPopup,
    contentDeletePopup,
    savedSearchPopup,
    pressListKeywordParams,
  } = useAppSelector(state => state.pressSearchManagementSlice)
  const { isDemoLicense, licenseInfo, userInfo, userSelectGroup, timeZone } = useAppSelector(state => state.authSlice)

  const journalistCustomSearchNameCheck = usePostJournalistCustomSearchNameCheck()
  const deleteJournalistCustomSearch = useDeleteJournalistCustomSearch()
  const journalistCustomSearch = usePutJournalistCustomSearch()

  const {
    isLoading,
    data: journalistCustomSearchListData,
    refetch: refetchJournalistCustomSearch,
  } = useGetJournalistCustomSearchList(
    {
      page: pressListParams.page,
      groupId: userSelectGroup,
      size: pressListParams.size,
      sort: [pressListParams.sort[0]],
      ownerId: pressListParams.ownerId !== '' ? Number(pressListParams.ownerId) : undefined,
      title: pressListParams.title,
      shareCode: pressListParams.shareCode.id,
    },
    {
      enabled: categoryData.id === 'press' && router.pathname === '/contacts/saved-search-manage',
    }
  )

  const setInitSavedSearchPopupAction = useCallback(() => dispatch(initSavedSearchPopupAction()), [savedSearchPopup])
  const setInitManagementPopupAction = useCallback(() => dispatch(initPressPopupAction()), [pressPopup])
  const setOwnerLayerAction = useCallback(
    async (layerOpen: boolean, key: string) => dispatch(ownerLayerAction({ layerOpen, key })),
    [ownerLayer]
  )

  const setSavedSearchPopupTitleOnChange = useCallback(
    async (param: string, origin: savedSearchPopupProps) => {
      const params = {
        ...origin,
        name: param,
        nameErr: '',
      }
      dispatch(savedSearchPopupAction(params))
    },
    [savedSearchPopup.name]
  )

  const setSavedSearchPopupShareSettingOnChange = useCallback(
    async (param: SelectListOptionItem, origin: savedSearchPopupProps) => {
      const params = {
        ...origin,
        scrop: param,
      }
      dispatch(savedSearchPopupAction(params))
    },
    [savedSearchPopup.scrop]
  )

  const setSavedSearchPopupTargetShareSettingOnChange = useCallback(
    async (param: SelectListOptionItem, origin: savedSearchPopupProps) => {
      const params = {
        ...origin,
        scropTarget: param,
      }
      dispatch(savedSearchPopupAction(params))
    },
    [savedSearchPopup.scropTarget]
  )

  const setSavedSearchPopupSelectedUserChange = useCallback(
    async (param: SelectListOptionItem, origin: savedSearchPopupProps) => {
      const params = {
        ...origin,
        selectedUser: param,
      }
      dispatch(savedSearchPopupAction(params))
    },
    [savedSearchPopup.selectedUser]
  )

  const handleIsSendToMe = useCallback(
    (param: boolean) =>
      dispatch(sortByOwnerAction({ isOwner: param, ownerId: userInfo.userId ? userInfo?.userId.toString() : '' })),
    [sortByOwner]
  )
  const setOwnerPopupAction = useCallback(
    async (param: ownerPopupProps) => dispatch(ownerPopupAction(param)),
    [ownerPopup]
  )

  const setSelectedDeleteContent = useCallback(
    (param: contentDeletePopupProps) => dispatch(contentDeletePopupAction(param)),
    [contentDeletePopup]
  )

  const setManagementContentListButtonAction = useCallback(
    (param: boolean) => dispatch(pressContentListButtonAction(param)),
    [pressContentListButton]
  )

  const handlePressListKeywordParamsChange = useCallback(
    (param: string) => dispatch(pressParamKeywordAction(param)),
    [pressListKeywordParams]
  )

  const setUserProfilePopupAction = useCallback(
    () =>
      dispatch(
        userPopupAction({
          isOpen: false,
          email: '',
          keyValue: 0,
          displayName: '',
          phone: '',
          mobile: '',
          role: '',
        })
      ),
    [userPopup]
  )

  const getOwnerLayer = useCallback(async () => {
    let list: UserDtoForGroup[] = []
    list = await getUserList()
    dispatch(getOwnerLayerAction(list))
  }, [ownerGroup, ownerLayer])

  const openPopup = useCallback(
    (e: string, key: number, target: string) => {
      dispatch(
        pressPopupAction({
          isOpen: true,
          type: e,
          title: e === 'create' ? '태그 만들기' : e === 'delete' ? '태그 삭제' : '태그 수정',
          confirmText: e === 'create' ? '저장' : e === 'delete' ? '삭제' : '수정',
          value: e !== 'create' ? target : '',
          valueErr: '',
          key,
          target,
        })
      )
    },
    [pressPopup]
  )

  const inputValueOnChange = useCallback(
    (e: string, hook: pressPopupProps) => {
      dispatch(
        pressPopupAction({
          ...hook,
          value: e,
          valueErr: '',
        })
      )
    },
    [pressPopup.value, pressPopup.valueErr]
  )

  const handleChangeShareCode = useCallback(
    async (e: SelectListOptionItem, hook: pressListParamsProps) => {
      dispatch(
        pressListParamsAction({
          ...hook,
          shareCode: e,
        })
      )
    },
    [pressListParams.shareCode]
  )

  const handleChangeSize = useCallback(
    async (e: number, hook: pressListParamsProps) => {
      dispatch(
        pressListParamsAction({
          ...hook,
          page: 1,
          size: e,
        })
      )
    },
    [pressListParams.size, pressListParams.page]
  )

  const handlePaginationChange = useCallback(
    async (e: number, hook: pressListParamsProps) => {
      dispatch(
        pressListParamsAction({
          ...hook,
          page: e,
          size: hook.size,
        })
      )
    },
    [pressListParams.size, pressListParams.page]
  )

  const handleChangeSort = useCallback(
    async (e: string[], hook: pressListParamsProps) => {
      dispatch(
        pressListParamsAction({
          ...hook,
          sort: e,
          page: 1,
        })
      )
    },
    [pressListParams.sort]
  )

  const handleKeywordsChange = useCallback(
    async (e: string, hook: pressListParamsProps) => {
      dispatch(
        pressListParamsAction({
          ...hook,
          title: e,
          page: 1,
          size: 20,
        })
      )
    },
    [pressListParams.title]
  )

  const resetKeyword = async (hook: pressListParamsProps) => {
    dispatch(
      resetPressListParamsAction({
        params: {
          ...hook,
          title: '',
        },
        button: false,
      })
    )
  }

  const getSearchActionByKeyword = async (keyword: string, hook: pressListParamsProps) => {
    dispatch(
      pressListParamsAction({
        ...hook,
        title: keyword,
        page: 1,
        size: 20,
      })
    )
  }

  const ownerFunction = async (keyword: number) => {
    dispatch(
      userInformationPopupAction({
        isOpen: true,
        idKey: Number(keyword),
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

  const selectedDeleteAction = async (param: contentDeletePopupProps) => {
    const { status, data, message } = await deleteJournalistCustomSearch.mutateAsync(param.key)
    if (status === 'S') {
      openToast(message?.message, 'success')
      await getMediasrchCount()
      await refetchJournalistCustomSearch()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const ownerChangeAction = async (props: ownerPopupProps) => {
    const param = {
      id: props.pressId,
      journalistInfo: {
        groupId: userSelectGroup,
        ownerId: props.key,
      },
    }
    const { status, data, message } = await journalistCustomSearch.mutateAsync(param)
    if (status === 'S') {
      openToast('소유자를 수정했습니다', 'success')
      await refetchJournalistCustomSearch()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const getUserList = async () => {
    let list: UserDtoForGroup[] = []
    const { status, data, message } = await apiGetActiveGroupInfo(userSelectGroup)
    if (status === 'S') {
      const res = data as GroupDto
      list = res.users && res.users?.length > 0 ? res.users : ([] as UserDtoForGroup[])
    } else {
      openToast(message?.message, 'error')
    }

    return list
  }

  const getOwnerInformation = async (e: number) => {
    let res: UserDto | null = null
    const { status, data, message } = await apiGetOneUser(e)
    if (status === 'S') {
      res = data as UserDto
    } else {
      openToast(message?.message, 'error')
    }
    return res
  }

  const getMediasrchCount = async () => {
    const { status, data, message } = await apiGetMediasrchCount(userSelectGroup)
    if (status === 'S') {
      const res = data as { mediaSrchCount: number; journalistSrchCount: number }
      const params = [
        {
          id: 'press',
          name: '언론인',
          count: res.journalistSrchCount,
        },
        {
          id: 'media',
          name: '매체',
          count: res.mediaSrchCount,
        },
      ]
      dispatch(categoryListAction(params))
    }
  }

  const categoryDataHandle = (e: categoryListProps) => {
    router.push(e.id === 'media' ? '/media/saved-search-manage' : '/contacts/saved-search-manage')
  }

  const init = async () => {
    dispatch(initAction())
    await getMediasrchCount()
  }

  const setOtherActions = async (e: SelectListOptionItem, props: pressContentListProps) => {
    if (e.id === 'UPDATE') {
      const findGroup = extendedShareScopeTargetList.find(e => e.id === props.shareTargetCode)
      const users = await getUserList()
      const userList =
        users.length > 0
          ? users.map(i => {
              return { id: i.userId?.toString(), name: i.name }
            })
          : []
      console.log('findGroup', findGroup)
      dispatch(
        savedSearchPopupAction({
          isOpen: true,
          isOwner: props.isOwner,
          key: props.contact_id,
          name: props.title,
          originName: props.title,
          nameErr: '',
          scrop: { id: props?.shareCode ? props.shareCode.toString() : '', name: props.shareCodeNm },
          scropTarget: findGroup ? findGroup : { id: 'GROUP', name: '이 그룹' },
          // @ts-ignore
          userList: userList,
          selectedUser: {
            id: props.owner?.userId ? props.owner?.userId.toString() : '',
            name: props.owner?.name || '',
          },
        })
      )
    } else if (e.id === 'DELETE') {
      dispatch(
        contentDeletePopupAction({
          isOpen: true,
          key: props?.contact_id || 0,
          title: `${props.title}(소유자 ${props.owner?.name})`,
        })
      )
    } else if (e.id === 'SHARE') {
      dispatch(
        sharedKeyAction({
          key: props.contact_id || 0,
          title: '언론인 맞춤 검색 공유 - ' + props?.title || '',
          editor: props?.title || '',
          type: 'SAVED_SEARCH_JOURNALIST',
          sharedUrl:
            process.env.MY_ENV_VAR === 'production'
              ? SVC_DOMAIN_URL.PROD
              : SVC_DOMAIN_URL.DEV + `/contacts/saved-search?journal_contact_id=${props.contact_id}`,
        })
      )
    }
  }

  const shareCodeChangeAction = async (id: number, shareCode: string) => {
    const param = {
      id,
      journalistInfo: {
        groupId: userSelectGroup,
        shareCode,
      },
    }
    const { status, data, message } = await journalistCustomSearch.mutateAsync(param)
    if (status === 'S') {
      openToast('공유 설정을 수정했습니다', 'success')
      await refetchJournalistCustomSearch()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const initList = async (prop: PageableDataDto<PressMediaCustomSearchListItem>) => {
    let param: pressContentListProps[] = []
    if (prop.content && prop.content.length > 0) {
      for await (const content of prop.content) {
        const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === content.shareCode)
        let temp: pressContentListProps = {
          contact_id: 0,
          conditions: content?.conditions || '',
          isOwner: userInfo.userId === content.owner?.userId,
          settingList: defaultBasicSavedSetting,
          shareCodeNm: findShareScopeList?.name || '',
          title: content?.title || '',
          shareCode: content?.shareCode || '',
          shareTargetCode: content?.shareTargetCode || '',
        }
        if (content.mediaSrchId) {
          temp.contact_id = content.mediaSrchId
        }
        if (content.jrnlstSrchId) {
          temp.contact_id = content.jrnlstSrchId
        }
        if (content.owner) {
          temp.owner = content.owner
        }
        if (content.regisAt) {
          temp.regisAt = content.regisAt
        }
        if (content.updateAt) {
          temp.updateAt = content.updateAt
        }
        if (content.register) {
          temp.register = content.register
        }
        if (content.updater) {
          temp.updater = content.updater
        }
        if (userInfo.userId === content.owner?.userId) {
          temp.settingList = defaultSavedSetting
        } else if (content.shareCode === 'WRITABLE') {
          temp.settingList = defaultSavedSetting
        } else if (content.shareCode === 'READABLE') {
          if (userInfo.role === 'ADMIN') {
            temp.settingList = [
              ...defaultBasicSavedSetting,
              {
                id: 'DELETE',
                name: '삭제하기',
              },
            ]
          } else {
            temp.settingList = defaultBasicSavedSetting
          }
        }
        param = [...param, temp]
      }
    }
    dispatch(
      pressContentListAction({
        list: param,
        pageCount: {
          totalCount: prop.totalElements ?? 0,
          totalPageCount: prop.totalPages ?? 0,
        },
      })
    )
  }

  const checkValidation = async (props: savedSearchPopupProps) => {
    let setTitleErr = ''
    let isProcess = false
    if (props.name === '') {
      setTitleErr = '검색명을 입력하세요'
    } else if (props.name.length > 100) {
      setTitleErr = '검색명은 100자를 넘을 수 없습니다.'
    } else {
      if (props.originName === props.name) {
        isProcess = true
      } else {
        const { status, message } = await journalistCustomSearchNameCheck.mutateAsync({
          oldName: '',
          newName: props.name,
        })
        if (status === 'S') {
          isProcess = true
        } else {
          setTitleErr = '같은 이름의 검색명이 이미 있습니다'
        }
      }
    }
    dispatch(
      savedSearchPopupAction({
        ...props,
        nameErr: setTitleErr,
      })
    )
    return isProcess
  }

  const onMoveUrlClickCheck = (target: HTMLElement, contact_id: number) => {
    let isCount = 0
    const isInList1 = target.closest('.list-type4-item__title type-flex-grow') !== null // Check if the target is within the list
    if (isInList1) {
      isCount += 1
    }
    const isInList3 = target.closest('.list-type4-item__share-filter') !== null // Check if the target is within the list
    if (isInList3) {
      isCount += 1
    }
    const isInList4 = target.closest('.list-type4-item__share-group') !== null // Check if the target is within the list
    if (isInList4) {
      isCount += 1
    }
    const isInList5 = target.closest('.list-type4-item__more') !== null // Check if the target is within the list
    if (isInList5) {
      isCount += 1
    }
    if (isCount === 0) {
      router.push(`/contacts/saved-search?journal_contact_id=${contact_id}`)
    }
  }

  const updateSavedSearch = async (props: savedSearchPopupProps) => {
    const param = {
      id: props.key,
      journalistInfo: {
        groupId: userSelectGroup,
        title: props.name,
        shareCode: props.scrop.id,
        shareTargetCode: props.scropTarget.id,
        ownerId: Number(props.selectedUser.id),
      },
    }
    const { status, data, message } = await journalistCustomSearch.mutateAsync(param)
    if (status === 'S') {
      openToast('맞춤 검색을 수정했습니다', 'success')
      await refetchJournalistCustomSearch()
    } else {
      openToast(message?.message, 'error')
    }
  }

  useEffect(() => {
    if (!journalistCustomSearchListData) return
    const { status, data, message } = journalistCustomSearchListData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as PageableDataDto<PressMediaCustomSearchListItem>
      initList(res)
    } else {
      openToast(message?.message, 'error')
    }
  }, [journalistCustomSearchListData])

  return {
    userSelectGroup,
    licenseInfo,
    userInfo,
    pageCount,
    sortByOwner,
    pressContentList,
    pressContentListButton,
    pressContentLoading,
    pressListParams,
    pressPopup,
    ownerLayer,
    ownerGroup,
    ownerPopup,
    contentDeletePopup,
    userPopup,
    savedSearchPopup,
    isLoading,
    pressListKeywordParams,
    timeZone,
    categoryList,
    categoryData,

    categoryDataHandle,
    init,
    setOtherActions,
    ownerChangeAction,
    resetKeyword,
    getSearchActionByKeyword,
    shareCodeChangeAction,
    selectedDeleteAction,
    ownerFunction,
    checkValidation,
    updateSavedSearch,
    onMoveUrlClickCheck,

    handlePressListKeywordParamsChange,
    setUserProfilePopupAction,
    setSelectedDeleteContent,
    setOwnerPopupAction,
    setOwnerLayerAction,
    getOwnerLayer,
    handleIsSendToMe,
    openPopup,
    inputValueOnChange,
    setInitManagementPopupAction,
    handleKeywordsChange,
    handleChangeSize,
    handlePaginationChange,
    setManagementContentListButtonAction,
    handleChangeSort,
    handleChangeShareCode,
    setSavedSearchPopupSelectedUserChange,
    setSavedSearchPopupTargetShareSettingOnChange,
    setSavedSearchPopupShareSettingOnChange,
    setSavedSearchPopupTitleOnChange,
    setInitSavedSearchPopupAction,
  }
}
