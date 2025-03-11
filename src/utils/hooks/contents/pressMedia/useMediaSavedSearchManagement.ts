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
  initMediaPopupAction,
  initSavedSearchPopupAction,
  mediaContentListAction,
  mediaContentListButtonAction,
  mediaContentListProps,
  mediaListParamsAction,
  mediaListParamsProps,
  mediaParamKeywordAction,
  mediaPopupAction,
  mediaPopupProps,
  ownerLayerAction,
  ownerPopupAction,
  ownerPopupProps,
  resetMediaListParamsAction,
  savedSearchPopupAction,
  savedSearchPopupProps,
  sortByOwnerAction,
  userPopupAction,
} from '~/stores/modules/contents/pressMedia/mediaSearchManagement'
import { sharedKeyAction } from '~/stores/modules/contents/shared/shared'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import { BaseResponseCommonObject, GroupDto, type UserDto, UserDtoForGroup } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { PageableDataDto } from '~/types/contents/api'
import type { PressMediaCustomSearchListItem } from '~/types/contents/PressMedia'
import { apiGetMediasrchCount } from '~/utils/api/contact/useSavedSearchCount'
import { useDeleteMediaCustomSearch } from '~/utils/api/customSearch/media/useDeleteMediaCustomSearch'
import { useGetMediaCustomSearchList } from '~/utils/api/customSearch/media/useGetMediaCustomSearchList'
import { usePostMediaCustomSearchNameCheck } from '~/utils/api/customSearch/media/usePostMediaCustomSearchNameCheck'
import { usePutMediaCustomSearch } from '~/utils/api/customSearch/media/usePutMediaCustomSearch'
import { apiGetActiveGroupInfo } from '~/utils/api/group/useGetGroupSearch'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useMediaSavedSearchManagement = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    categoryList,
    categoryData,
    pageCount,
    mediaContentList,
    mediaContentListButton,
    mediaContentLoading,
    mediaListParams,
    mediaPopup,
    sortByOwner,
    ownerLayer,
    ownerGroup,
    ownerPopup,
    userPopup,
    contentDeletePopup,
    savedSearchPopup,
    mediaListKeywordParams,
  } = useAppSelector(state => state.mediaSearchManagementSlice)
  const { isDemoLicense, licenseInfo, userInfo, userSelectGroup, timeZone } = useAppSelector(state => state.authSlice)

  const mediaCustomSearchNameCheck = usePostMediaCustomSearchNameCheck()
  const mediaCustomSearch = usePutMediaCustomSearch()
  const deleteMediaCustomSearch = useDeleteMediaCustomSearch()

  const {
    isLoading,
    data: mediaCustomSearchListData,
    refetch: refetchMediaCustomSearch,
  } = useGetMediaCustomSearchList(
    {
      page: mediaListParams.page,
      groupId: userSelectGroup,
      size: mediaListParams.size,
      sort: [mediaListParams.sort[0]],
      ownerId: mediaListParams.ownerId !== '' ? Number(mediaListParams.ownerId) : undefined,
      title: mediaListParams.title,
      shareCode: mediaListParams.shareCode.id,
    },
    {
      enabled: categoryData.id === 'media' && router.pathname === '/media/saved-search-manage',
    }
  )

  const setInitSavedSearchPopupAction = useCallback(() => dispatch(initSavedSearchPopupAction()), [savedSearchPopup])
  const setInitManagementPopupAction = useCallback(() => dispatch(initMediaPopupAction()), [mediaPopup])
  const setOwnerLayerAction = useCallback(
    async (layerOpen: boolean, key: string) => dispatch(ownerLayerAction({ layerOpen, key })),
    [ownerLayer]
  )

  const handleMediaListKeywordParamsChange = useCallback(
    (param: string) => dispatch(mediaParamKeywordAction(param)),
    [mediaListKeywordParams]
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

  const setSelectedDeleteContent = useCallback(
    (param: contentDeletePopupProps) => dispatch(contentDeletePopupAction(param)),
    [contentDeletePopup]
  )

  const setManagementContentListButtonAction = useCallback(
    (param: boolean) => dispatch(mediaContentListButtonAction(param)),
    [mediaContentListButton]
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
        mediaPopupAction({
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
    [mediaPopup]
  )

  const inputValueOnChange = useCallback(
    (e: string, hook: mediaPopupProps) => {
      dispatch(
        mediaPopupAction({
          ...hook,
          value: e,
          valueErr: '',
        })
      )
    },
    [mediaPopup.value, mediaPopup.valueErr]
  )

  const handleChangeShareCode = useCallback(
    async (e: SelectListOptionItem, hook: mediaListParamsProps) => {
      dispatch(
        mediaListParamsAction({
          ...hook,
          shareCode: e,
        })
      )
    },
    [mediaListParams.shareCode]
  )

  const handleChangeSize = useCallback(
    async (e: number, hook: mediaListParamsProps) => {
      dispatch(
        mediaListParamsAction({
          ...hook,
          page: 1,
          size: e,
        })
      )
    },
    [mediaListParams.size, mediaListParams.page]
  )

  const handlePaginationChange = useCallback(
    async (e: number, hook: mediaListParamsProps) => {
      dispatch(
        mediaListParamsAction({
          ...hook,
          page: e,
          size: hook.size,
        })
      )
    },
    [mediaListParams.size, mediaListParams.page]
  )

  const handleChangeSort = useCallback(
    async (e: string[], hook: mediaListParamsProps) => {
      dispatch(
        mediaListParamsAction({
          ...hook,
          sort: e,
          page: 1,
        })
      )
    },
    [mediaListParams.sort]
  )

  const handleKeywordsChange = useCallback(
    async (e: string, hook: mediaListParamsProps) => {
      dispatch(
        mediaListParamsAction({
          ...hook,
          title: e,
          page: 1,
          size: 20,
        })
      )
    },
    [mediaListParams.title]
  )

  const resetKeyword = async (hook: mediaListParamsProps) => {
    dispatch(
      resetMediaListParamsAction({
        params: {
          ...hook,
          title: '',
        },
        button: false,
      })
    )
  }

  const getSearchActionByKeyword = async (keyword: string, hook: mediaListParamsProps) => {
    dispatch(
      mediaListParamsAction({
        ...hook,
        title: keyword,
        page: 1,
        size: 20,
      })
    )
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
        const { status, message } = await mediaCustomSearchNameCheck.mutateAsync({
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

  const selectedDeleteAction = async (param: contentDeletePopupProps) => {
    const { status, data, message } = await deleteMediaCustomSearch.mutateAsync(param.key)
    if (status === 'S') {
      openToast(message?.message, 'success')
      await getMediasrchCount()
      await refetchMediaCustomSearch()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const ownerChangeAction = async (props: ownerPopupProps) => {
    const param = {
      id: props.mediaId,
      mediaInfo: {
        groupId: userSelectGroup,
        ownerId: props.key,
      },
    }
    const { status, data, message } = await mediaCustomSearch.mutateAsync(param)
    if (status === 'S') {
      openToast('소유자를 수정했습니다', 'success')
      await refetchMediaCustomSearch()
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

  const categoryDataHandle = (e: categoryListProps) => {
    router.push(e.id === 'media' ? '/media/saved-search-manage' : '/contacts/saved-search-manage')
  }

  const init = async () => {
    dispatch(initAction())
    await getMediasrchCount()
  }

  const setOtherActions = async (e: SelectListOptionItem, props: mediaContentListProps) => {
    if (e.id === 'UPDATE') {
      const findGroup = extendedShareScopeTargetList.find(e => e.id === props.shareTargetCode)
      const users = await getUserList()
      const userList =
        users.length > 0
          ? users.map(i => {
              return { id: i.userId?.toString(), name: i.name }
            })
          : []
      console.log('props.shareTargetCode', props.shareTargetCode)
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
          key: props?.contact_id || 0,
          title: '미디어 맞춤 검색 공유 - ' + props?.title || '',
          editor: props?.title || '',
          type: 'SAVED_SEARCH_MEDIA',
          sharedUrl:
            process.env.MY_ENV_VAR === 'production'
              ? SVC_DOMAIN_URL.PROD
              : SVC_DOMAIN_URL.DEV + `/media/saved-search?media_contact_id=${props.contact_id}`,
        })
      )
    }
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
      router.push(`/media/saved-search?media_contact_id=${contact_id}`)
    }
  }

  const updateSavedSearch = async (props: savedSearchPopupProps) => {
    const param = {
      id: props.key,
      mediaInfo: {
        groupId: userSelectGroup,
        title: props.name,
        shareCode: props.scrop.id,
        shareTargetCode: props.scropTarget.id,
        ownerId: Number(props.selectedUser.id),
      },
    }
    const { status, data, message } = await mediaCustomSearch.mutateAsync(param)
    if (status === 'S') {
      openToast('맞춤 검색을 수정했습니다', 'success')
      await refetchMediaCustomSearch()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const shareCodeChangeAction = async (id: number, shareCode: string) => {
    const param = {
      id,
      mediaInfo: {
        groupId: userSelectGroup,
        shareCode,
      },
    }
    const { status, data, message } = await mediaCustomSearch.mutateAsync(param)
    if (status === 'S') {
      openToast('공유 설정을 수정했습니다', 'success')
      await refetchMediaCustomSearch()
    } else {
      openToast(message?.message, 'error')
    }
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

  const initList = async (prop: PageableDataDto<PressMediaCustomSearchListItem>) => {
    let param: mediaContentListProps[] = []
    if (prop.content && prop.content.length > 0) {
      for await (const content of prop.content) {
        const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === content.shareCode)
        let temp: mediaContentListProps = {
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
      mediaContentListAction({
        list: param,
        pageCount: {
          totalCount: prop.totalElements ?? 0,
          totalPageCount: prop.totalPages ?? 0,
        },
      })
    )
  }

  useEffect(() => {
    if (!mediaCustomSearchListData) return
    const { status, data, message } = mediaCustomSearchListData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as PageableDataDto<PressMediaCustomSearchListItem>
      initList(res)
    } else {
      openToast(message?.message, 'error')
    }
  }, [mediaCustomSearchListData])

  return {
    categoryList,
    categoryData,
    userSelectGroup,
    licenseInfo,
    userInfo,
    pageCount,
    sortByOwner,
    mediaContentList,
    mediaContentListButton,
    mediaContentLoading,
    mediaListParams,
    mediaPopup,
    ownerLayer,
    ownerGroup,
    ownerPopup,
    contentDeletePopup,
    userPopup,
    savedSearchPopup,
    isLoading,
    mediaListKeywordParams,
    timeZone,

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

    handleMediaListKeywordParamsChange,
    setSavedSearchPopupTitleOnChange,
    setInitSavedSearchPopupAction,
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
  }
}
