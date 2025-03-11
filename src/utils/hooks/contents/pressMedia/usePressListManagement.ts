import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import {
  defaultBasicSavedSetting,
  defaultSavedSetting,
  disclosureScopeFilterOptionList,
} from '~/components/contents/pressMedia/List/Search/defaultData'
import { ALLOWED_ORIGINS, SVC_DOMAIN_URL } from '~/constants/common'
import { initActivityPopupAction } from '~/stores/modules/contents/activity/activityPopup'
import { shareCodeAction } from '~/stores/modules/contents/auth/auth'
import { tagetListOpenEmailPopupAction } from '~/stores/modules/contents/email/email'
import { pressReleaseDataExtraAction } from '~/stores/modules/contents/extraData/extra'
import {
  categoryListAction,
  categoryListProps,
  contentAllDeletePopupAction,
  contentAllDeletePopupProps,
  contentAllShareCodePopupAction,
  contentAllShareCodePopupProps,
  contentDeletePopupAction,
  contentDeletePopupProps,
  getOwnerLayerAction,
  initAction,
  initPressGroupPopupAction,
  initPressPopupAction,
  isSelectedAllActionIdAction,
  ownerLayerAction,
  ownerPopupAction,
  ownerPopupProps,
  pageCountProps,
  pressContentDetailPopupAction,
  pressContentListAction,
  pressContentListButtonAction,
  pressContentListProps,
  pressGroupPopupAction,
  pressGroupPopupProps,
  pressListParamsAction,
  pressListParamsProps,
  pressParamKeywordAction,
  pressPopupAction,
  pressPopupProps,
  resetPressListParamsAction,
  searchContentKeyListAction,
  sortByOwnerAction,
  userPopupAction,
} from '~/stores/modules/contents/pressMedia/pressListManagement'
import { isReActionAction } from '~/stores/modules/contents/pressMedia/pressMediaListManagement'
import { sharedKeyAction } from '~/stores/modules/contents/shared/shared'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import { BaseResponseCommonObject, GroupDto, type UserDto, UserDtoForGroup } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { PageableDataDto } from '~/types/contents/api'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { ESearchJournalistDocumentDto, JournalistMediaGroupItem } from '~/types/contents/PressMedia'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import { apiGetPressMediaGroupCount } from '~/utils/api/contact/usePressMediaListCount'
import { apiGetActiveGroupInfo } from '~/utils/api/group/useGetGroupSearch'
import {
  useAllDeleteJournalistGroup,
  useDeleteJournalistGroup,
} from '~/utils/api/groupList/journalist/useDeleteJournalistGroup'
import { apiGetJournalistGroup, useGetJournalistGroup } from '~/utils/api/groupList/journalist/useGetJournalistGroup'
import { usePostJournalistGroupCopy } from '~/utils/api/groupList/journalist/usePostJournalistGroupCopy'
import { usePostJournalistCreate } from '~/utils/api/groupList/journalist/usePostJournalistGroupCreate'
import { usePostJournalistGroupNameCheck } from '~/utils/api/groupList/journalist/usePostJournalistGroupNameCheck'
import {
  useAllJournalistGroupShareCode,
  usePutJournalistGroup,
} from '~/utils/api/groupList/journalist/usePutJournalistGroup'
import { usePutSharePolicy } from '~/utils/api/setting/policy/usePutSharePolicy'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { apiAllGroupByUser } from '~/utils/api/user/usePutUserSelectGroup'
import { getNewsDateFormat } from '~/utils/common/date'
import { setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const usePressListManagement = () => {
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
    pressGroupPopup,
    pressContentDetailPopup,
    searchContentKeyList,
    isSelectedAllActionId,
    contentAllDeletePopup,
    contentAllShareCodePopup,
    optionButton,
    pressListKeywordParams,
  } = useAppSelector(state => state.pressListManagementSlice)
  const { isDemoLicense, licenseInfo, userInfo, userSelectGroup, shareCodeData, shareCode, timeZone } = useAppSelector(
    state => state.authSlice
  )

  const journalistGroupNameCheck = usePostJournalistGroupNameCheck()
  const deleteJournalistGroup = useDeleteJournalistGroup()
  const allDeleteJournalistGroup = useAllDeleteJournalistGroup()
  const journalistEditGroup = usePutJournalistGroup()
  const allJournalistGroupShareCode = useAllJournalistGroupShareCode()
  const createJournalistGroup = usePostJournalistCreate()
  const apiPutSharePolicy = usePutSharePolicy()
  const copyJournalistGroup = usePostJournalistGroupCopy()

  const {
    isLoading,
    data: journalistCustomSearchListData,
    refetch: refetchJournalistCustomSearch,
  } = useGetJournalistGroup(
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
      enabled: categoryData.id === 'press' && router.pathname === '/contacts/list',
    }
  )

  const setInitPressGroupPopupAction = useCallback(() => dispatch(initPressGroupPopupAction()), [pressGroupPopup])
  const setInitManagementPopupAction = useCallback(() => dispatch(initPressPopupAction()), [pressPopup])
  const setOwnerLayerAction = useCallback(
    async (layerOpen: boolean, key: string) => dispatch(ownerLayerAction({ layerOpen, key })),
    [ownerLayer]
  )

  const setSearchContentKeyList = useCallback(
    async (e: boolean, props: pressContentListProps, keyValue: pressContentListProps[]) => {
      let dataList: pressContentListProps[] = [...keyValue]
      if (e) {
        dataList = [...dataList, props]
      } else {
        dataList = dataList.filter(i => i?.jrnlstListId !== props?.jrnlstListId)
      }
      const isOption = await calculateButtonOption(dataList)
      dispatch(
        searchContentKeyListAction({ param: dataList, isDelete: isOption.isDelete, isShared: isOption.isShared })
      )
    },
    [searchContentKeyList]
  )

  const setAllSearchContentKeyList = useCallback(
    async (isCheck: boolean, origin: pressContentListProps[], pressItems: pressContentListProps[]) => {
      let isDelete = true
      let isShared = true
      let pressItemsList = [...pressItems]
      let dataList: pressContentListProps[] = pressItemsList.filter(
        item1 => !origin.some(item2 => item1.jrnlstListId === item2.jrnlstListId)
      )
      for await (const dataListElement of dataList) {
        if (isDelete) {
          if (!dataListElement.isOwner) {
            if (dataListElement.shareCode !== 'WRITABLE') {
              isDelete = false
            }
          }
        }
        if (isShared) {
          if (!dataListElement.isOwner) {
            isShared = false
          }
        }
      }
      if (isCheck) {
        for await (const dataListElement of origin) {
          if (dataListElement.jrnlstListId) {
            if (isDelete) {
              if (!dataListElement.isOwner) {
                if (dataListElement.shareCode !== 'WRITABLE') {
                  isDelete = false
                }
              }
            }
            if (isShared) {
              if (!dataListElement.isOwner) {
                isShared = false
              }
            }
            dataList = [...dataList, dataListElement]
          }
        }
      }
      dispatch(searchContentKeyListAction({ param: dataList, isDelete, isShared }))
    },
    [searchContentKeyList]
  )

  const setInitPressContentDetailPopupAction = useCallback(
    () => dispatch(pressContentDetailPopupAction({ isOpen: false, data: null })),
    [pressContentDetailPopup]
  )
  const setPressGroupPopupAction = useCallback(() => {
    dispatch(
      pressGroupPopupAction({
        isOpen: true,
        isOwner: true,
        title: '언론인 리스트 만들기',
        confirmText: '저장',
        type: 'create',
        originName: '',
        key: 0,
        name: '',
        nameErr: '',
        scrop: shareCodeData.list,
        targetGroup: { id: '', name: '' },
        isDefaultChecked: false,
        groupList: [],
        userList: [],
        selectedUser: { id: '', name: '' },
      })
    )
  }, [pressGroupPopup])

  const setContentAllShareCodePopup = useCallback(() => {
    dispatch(
      contentAllShareCodePopupAction({
        isOpen: false,
        key: [],
        scrop: shareCodeData.list,
      })
    )
  }, [contentAllShareCodePopup])

  const setContentAllShareCodePopupOnChange = useCallback(
    (param: SelectListOptionItem, origin: contentAllShareCodePopupProps) => {
      dispatch(
        contentAllShareCodePopupAction({
          ...origin,
          scrop: param,
        })
      )
    },
    [contentAllShareCodePopup.scrop]
  )

  const setPressGroupPopupTitleOnChange = useCallback(
    async (param: string, origin: pressGroupPopupProps) => {
      let params = {
        ...origin,
        name: param,
        nameErr: '',
      }
      if (param && param.length >= 100) {
        params = {
          ...origin,
          nameErr: '리스트명은 100자를 넘을 수 없습니다.',
        }
      }
      dispatch(pressGroupPopupAction(params))
    },
    [pressGroupPopup.name, pressGroupPopup.nameErr]
  )

  const setPressGroupPopupShareSettingOnChange = useCallback(
    async (param: SelectListOptionItem, origin: pressGroupPopupProps) => {
      const params = {
        ...origin,
        scrop: param,
      }
      dispatch(pressGroupPopupAction(params))
    },
    [pressGroupPopup.scrop]
  )

  const setPressGroupPopupDefaultChecked = useCallback(
    async (param: boolean, origin: pressGroupPopupProps) => {
      const params = {
        ...origin,
        isDefaultChecked: param,
      }
      dispatch(pressGroupPopupAction(params))
    },
    [pressGroupPopup.isDefaultChecked]
  )

  const setPressGroupPopupGroupTargetOnChange = useCallback(
    async (param: SelectListOptionItem, origin: pressGroupPopupProps) => {
      const params = {
        ...origin,
        targetGroup: param,
      }
      dispatch(pressGroupPopupAction(params))
    },
    [pressGroupPopup.targetGroup]
  )

  const setPressGroupPopupSelectedUserChange = useCallback(
    async (param: SelectListOptionItem, origin: pressGroupPopupProps) => {
      const params = {
        ...origin,
        selectedUser: param,
      }
      dispatch(pressGroupPopupAction(params))
    },
    [pressGroupPopup.selectedUser]
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

  const initSelectedAllDeleteContent = useCallback(
    () =>
      dispatch(
        contentAllDeletePopupAction({
          isOpen: false,
          key: [],
        })
      ),
    [contentAllDeletePopup]
  )

  const setManagementContentListButtonAction = useCallback(
    (param: boolean) => dispatch(pressContentListButtonAction(param)),
    [pressContentListButton]
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
      const data = {
        ...hook,
        shareCode: e,
      }
      dispatch(pressListParamsAction({ props: data, isReset: true }))
    },
    [pressListParams.shareCode]
  )

  const handleChangeSize = useCallback(
    async (e: number, hook: pressListParamsProps) => {
      const data = {
        ...hook,
        page: 1,
        size: e,
      }
      dispatch(pressListParamsAction({ props: data, isReset: true }))
    },
    [pressListParams.size, pressListParams.page]
  )

  const handlePaginationChange = useCallback(
    async (e: number, hook: pressListParamsProps) => {
      const data = {
        ...hook,
        page: e,
        size: hook.size,
      }
      dispatch(pressListParamsAction({ props: data, isReset: false }))
    },
    [pressListParams.size, pressListParams.page]
  )

  const handleChangeSort = useCallback(
    async (e: string[], hook: pressListParamsProps) => {
      const data = {
        ...hook,
        sort: e,
        page: 1,
      }
      dispatch(pressListParamsAction({ props: data, isReset: true }))
    },
    [pressListParams.sort]
  )

  const handlePressListKeywordParamsChange = useCallback(
    async (e: string) => {
      dispatch(pressParamKeywordAction(e))
    },
    [pressListKeywordParams]
  )

  const handleKeywordsChange = useCallback(
    async (e: string, hook: pressListParamsProps) => {
      const data = {
        ...hook,
        title: e,
        page: 1,
        size: 20,
      }
      dispatch(pressListParamsAction({ props: data, isReset: true }))
    },
    [pressListParams.title]
  )

  const getSearchActionByKeyword = async (keyword: string, hook: pressListParamsProps) => {
    const data = {
      ...hook,
      title: keyword,
      page: 1,
      size: 20,
    }
    dispatch(pressListParamsAction({ props: data, isReset: true }))
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

  const selectedDeleteAction = async (param: contentDeletePopupProps) => {
    const { status, data, message } = await deleteJournalistGroup.mutateAsync({ id: param.key })
    if (status === 'S') {
      openToast('목록을 삭제했습니다.', 'success')
      await getMediasrchCount()
      await refetchJournalistCustomSearch()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const selectedAllShareCodeAction = async (scope: SelectListOptionItem, param: contentAllDeletePopupProps) => {
    if (param.key.length > 0) {
      const { status, data, message } = await allJournalistGroupShareCode.mutateAsync({
        jrnlstListIdList: param.key.map(e => {
          return Number(e.id)
        }),
        shareCode: scope.id,
      })
      if (status === 'S') {
        openToast('선택한 리스트의 공유 설정을 수정했습니다.', 'success')
        await refetchJournalistCustomSearch()
      } else {
        openToast(message?.message, 'error')
      }
    }
  }

  const selectedAllDeleteAction = async (param: contentAllDeletePopupProps) => {
    if (param.key.length > 0) {
      const { status, message } = await allDeleteJournalistGroup.mutateAsync({
        jrnlstListIdList: param.key.map(e => {
          return Number(e.id)
        }),
      })
      if (status === 'S') {
        openToast('선택된 리스트가 삭제되었습니다', 'success')
        await refetchJournalistCustomSearch()
        dispatch(isReActionAction(true))
      } else {
        openToast(message?.message, 'error')
      }
    }
  }

  const ownerChangeAction = async (props: ownerPopupProps) => {
    const param = {
      id: props.pressId,
      journalistInfo: {
        title: props.title,
        ownerId: props.key,
        groupId: userSelectGroup,
      },
    }
    const { status, data, message } = await journalistEditGroup.mutateAsync(param)
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

  const init = async () => {
    dispatch(initAction())
    await getMediasrchCount()
  }

  const getCommonCode = async (code: string) => {
    let res: SelectListOptionItem[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: code })
    if (status === 'S') {
      const codeData = data as CommonCode[]
      let list = codeData.map(e => {
        return { id: e.code, name: e.name }
      })
      res = list as SelectListOptionItem[]
    } else {
      openToast(message?.message, 'error')
      return res
    }
    return res
  }

  const getMediasrchCount = async () => {
    const { status, data, message } = await apiGetPressMediaGroupCount(userSelectGroup)
    if (status === 'S') {
      const res = data as { mediaCount: number; journalistCount: number }
      const params = [
        {
          id: 'press',
          name: '언론인',
          count: res.journalistCount,
        },
        {
          id: 'media',
          name: '매체',
          count: res.mediaCount,
        },
      ]
      dispatch(categoryListAction(params))
    }
  }

  const setOtherActions = async (e: SelectListOptionItem, props: pressContentListProps) => {
    if (e.id === 'UPDATE') {
      const users = await getUserList()
      const userList =
        users.length > 0
          ? users.map(i => {
              return { id: i?.userId?.toString() || '', name: i?.name || '' }
            })
          : []
      dispatch(
        pressGroupPopupAction({
          title: '언론인 리스트 수정',
          confirmText: '수정',
          type: 'edit',
          isOpen: true,
          originName: props.title,
          isOwner: props.isOwner,
          key: props?.jrnlstListId || 0,
          name: props.title,
          nameErr: '',
          scrop: { id: props?.shareCode ? props.shareCode.toString() : '', name: props.shareCodeNm },
          targetGroup: { id: 'GROUP', name: '이 그룹' },
          isDefaultChecked: false,
          groupList: [],
          userList: userList,
          selectedUser: {
            id: props.owner?.userId ? props.owner?.userId.toString() : '',
            name: props.owner?.name || '',
          },
        })
      )
    } else if (e.id === 'DETAIL') {
      dispatch(
        pressContentDetailPopupAction({
          isOpen: true,
          data: props,
        })
      )
    } else if (e.id === 'COPY') {
      const categoryList = await getGroupData()
      dispatch(
        pressGroupPopupAction({
          title: '언론인 리스트 복사',
          confirmText: '복사',
          type: 'copy',
          isOpen: true,
          isOwner: props.isOwner,
          key: props?.jrnlstListId || 0,
          name: props.title + '(1)',
          originName: props.title,
          nameErr: '',
          scrop: { id: props?.shareCode ? props.shareCode.toString() : '', name: props.shareCodeNm },
          targetGroup: categoryList.data,
          isDefaultChecked: false,
          groupList: categoryList.list,
          userList: [],
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
          key: props?.jrnlstListId || 0,
          title: `${props.title}(소유자 ${props.owner?.name})`,
        })
      )
    } else if (e.id === 'SHARE') {
      dispatch(
        sharedKeyAction({
          key: props?.jrnlstListId || 0,
          title: '언론인 리스트 공유 - ' + props?.title || '',
          editor: props?.title || '',
          type: 'JOURNALIST_LIST',
          sharedUrl:
            process.env.MY_ENV_VAR === 'production'
              ? SVC_DOMAIN_URL.PROD
              : SVC_DOMAIN_URL.DEV + `/contacts/list-result?jrnlstList_id=${props.jrnlstListId}`,
        })
      )
    } else if (e.id === 'ACTIVITY') {
      let temp: MbTagSearchTagItem[] = []
      let typeList: SelectListOptionItem[] = []
      if (props) {
        temp = [
          ...temp,
          {
            id: props.jrnlstListId?.toString() ?? uuid(),
            label: `${props?.title} ${Number(props?.journalistCount) || 0}명`,
            className: 'jrnlstListId',
          },
        ]
        const actionCategoryList = await getCommonCode('ACTION_CATEGORY_ALL')
        const actionStateFilterList = await getCommonCode('ACTION_STATE_FILTER')
        if (actionCategoryList && actionCategoryList.length > 0) {
          for await (const eElement of actionCategoryList) {
            if (eElement.id !== 'NEWSWIRE_RELEASE' && eElement.id !== 'PRESS_RELEASE' && eElement.id !== 'MAILING') {
              typeList = [
                ...typeList,
                {
                  id: eElement.id,
                  name: eElement.name,
                },
              ]
            }
          }
        }
        dispatch(
          initActivityPopupAction({
            keyValue: 0,
            isOpen: true,
            loading: false,
            title: '',
            type: [{ id: '', name: '선택' }, ...typeList],
            state: actionStateFilterList,
            typeValue: { id: '', name: '선택' },
            scrop: shareCodeData.action,
            targetDataList: temp,
            receiverGroup: 'pressList',
          })
        )
      }
    }
  }

  const getGroupData = async () => {
    let res: { list: SelectListOptionItem[]; data: SelectListOptionItem } = {
      list: [],
      data: { id: '', name: '' },
    }
    const { status, data, message } = await apiAllGroupByUser()
    if (status === 'S') {
      const list = data as GroupDto[]
      if (list) {
        for (const groupDto of list) {
          if (groupDto.groupId && groupDto.name) {
            if (userSelectGroup === groupDto.groupId) {
              res.data = {
                id: groupDto.groupId.toString(),
                name: groupDto.name.toString() + `(현재 그룹)`,
              }
              res.list = [
                ...res.list,
                {
                  id: groupDto.groupId.toString(),
                  name: groupDto.name.toString() + `(현재 그룹)`,
                },
              ]
            } else {
              res.list = [
                ...res.list,
                {
                  id: groupDto.groupId.toString(),
                  name: groupDto.name.toString(),
                },
              ]
            }
          }
        }
      }
    } else {
      openToast(message?.message, 'error')
    }

    return res
  }

  const shareCodeChangeAction = async (id: number, shareCodeProps: string, title: string) => {
    const param = {
      id,
      journalistInfo: {
        title,
        shareCode: shareCodeProps,
        groupId: userSelectGroup,
      },
    }
    const { status, data, message } = await journalistEditGroup.mutateAsync(param)
    if (status === 'S') {
      openToast('공유 설정을 수정했습니다', 'success')
      await refetchJournalistCustomSearch()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const initList = async (prop: PageableDataDto<JournalistMediaGroupItem>) => {
    let param: pressContentListProps[] = []
    if (prop.content && prop.content.length > 0) {
      for await (const content of prop.content) {
        const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === content.shareCode)
        let temp: pressContentListProps = {
          ...content,
          isOwner: userInfo.userId === content.owner?.userId,
          settingList: defaultBasicSavedSetting,
          shareCodeNm: findShareScopeList?.name || '',
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

  const calculateButtonOption = async (props: pressContentListProps[]) => {
    let res = {
      isDelete: true,
      isShared: true,
    }
    if (props.length > 0) {
      for await (const dataListElement of props) {
        if (res.isDelete) {
          if (!dataListElement.isOwner) {
            if (dataListElement.shareCode !== 'WRITABLE') {
              res.isDelete = false
            }
          }
        }
        if (res.isShared) {
          if (!dataListElement.isOwner) {
            res.isShared = false
          }
        }
      }
    }

    return res
  }

  const onMoveUrlClickCheck = (target: HTMLElement, jrnlstListId: number) => {
    let isCount = 0
    const isInList1 = target.closest('.list-type4-item__check') !== null // Check if the target is within the list
    if (isInList1) {
      isCount += 1
    }
    const isInList2 = target.closest('.list-type4-item__title') !== null // Check if the target is within the list
    if (isInList2) {
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
      router.push(`/contacts/list-result?jrnlstList_id=${jrnlstListId}`)
    }
  }

  const categoryDataHandle = (e: categoryListProps) => {
    router.push(e.id === 'media' ? '/media/list' : '/contacts/list')
  }

  const checkValidation = async (props: pressGroupPopupProps) => {
    let setTitleErr = ''
    let isProcess = false
    if (props.name === '') {
      setTitleErr = '리스트명을 입력하세요.'
    } else if (props.name.length >= 100) {
      setTitleErr = '리스트명은 100자를 넘을 수 없습니다.'
    } else {
      if (props.originName === props.name) {
        isProcess = true
      } else {
        const { status, message } = await journalistGroupNameCheck.mutateAsync({
          oldName: '',
          newName: props.name,
          groupId: userSelectGroup,
        })
        if (status === 'S') {
          isProcess = true
        } else {
          setTitleErr = '같은 이름의 리스트명이 이미 있습니다.'
        }
      }
    }
    dispatch(
      pressGroupPopupAction({
        ...props,
        nameErr: setTitleErr,
      })
    )
    return isProcess
  }

  const updatePolicy = async (props: string) => {
    const param = {
      list: props,
      jrnlstMediaSrch: shareCode.jrnlstMediaSrch,
      clipbook: shareCode.clipbook,
      news_search: shareCode.news_search,
      project: shareCode.project,
      action: shareCode.action,
      distribute: shareCode.distribute,
    }
    const { status, message } = await apiPutSharePolicy.mutateAsync({
      id: userInfo?.userId || 0,
      policyInfo: param,
    })
    if (status === 'S') {
      dispatch(shareCodeAction(param))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const createPressGroupAction = async (props: pressGroupPopupProps) => {
    const { status, message } = await createJournalistGroup.mutateAsync({
      title: props.name,
      groupId: userSelectGroup,
      shareCode: props.scrop.id,
    })
    if (status === 'S') {
      openToast('목록을 만들었습니다.', 'success')
      if (props.isDefaultChecked) {
        await updatePolicy(props.scrop.id)
      }
      await getMediasrchCount()
      await refetchJournalistCustomSearch()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const copyPressGroupAction = async (props: pressGroupPopupProps) => {
    const { status, message } = await copyJournalistGroup.mutateAsync({
      jrnlstListId: Number(props.key) ?? 0,
      title: props.name,
      groupId: Number(props.targetGroup.id) ?? 0,
      shareCode: props.scrop.id,
    })
    if (status === 'S') {
      openToast('목록을 복사했습니다.', 'success')
      await getMediasrchCount()
      await refetchJournalistCustomSearch()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const editPressGroupAction = async (props: pressGroupPopupProps) => {
    const { status, message } = await journalistEditGroup.mutateAsync({
      id: props.key,
      journalistInfo: {
        title: props.name,
        ownerId: Number(props.selectedUser.id),
        shareCode: props.scrop.id,
        groupId: userSelectGroup,
      },
    })
    if (status === 'S') {
      openToast('목록을 수정했습니다.', 'success')
      await refetchJournalistCustomSearch()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const pressGroupAction = async (props: pressGroupPopupProps) => {
    if (props.type === 'create') {
      await createPressGroupAction(props)
    } else if (props.type === 'copy') {
      await copyPressGroupAction(props)
    } else if (props.type === 'edit') {
      await editPressGroupAction(props)
    }
  }

  const filterOptionAction = async (keyOption: string, props: pressContentListProps[]) => {
    let temp: MbTagSearchTagItem[] = []
    if (props && props.length > 0) {
      for await (const shareCodeElement of props) {
        if (shareCodeElement?.jrnlstListId) {
          temp = [
            ...temp,
            {
              id: shareCodeElement?.jrnlstListId.toString(),
              label: `${shareCodeElement.title} ${(Number(shareCodeElement?.journalistCount) || 0).toString()}명`,
              className: 'jrnlstListId',
            },
          ]
        }
      }
    }
    if (temp && temp.length > 0) {
      if (keyOption === 'release') {
        dispatch(
          pressReleaseDataExtraAction({
            journalistId: [],
            mediaId: [],
            jrnlstListId: temp,
            mediaListId: [],
            targetRelease: [],
          })
        )
        await router.push({
          pathname: '/press-release',
          query: {
            targetList: true,
          },
        })
      } else if (keyOption === 'share') {
        dispatch(
          contentAllShareCodePopupAction({
            isOpen: true,
            key: temp,
            scrop: shareCodeData.list,
          })
        )
      } else if (keyOption === 'delete') {
        dispatch(
          contentAllDeletePopupAction({
            isOpen: true,
            key: temp,
          })
        )
      } else {
        dispatch(
          tagetListOpenEmailPopupAction({
            name: userInfo.name,
            scrop: shareCodeData.distribute,
            tagPressList: temp,
            receiverGroup: 'pressList',
          })
        )
      }
    }
  }

  useEffect(() => {
    if (!journalistCustomSearchListData) return
    const { status, data, message } = journalistCustomSearchListData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as PageableDataDto<JournalistMediaGroupItem>
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
    pressGroupPopup,
    isLoading,
    pressContentDetailPopup,
    searchContentKeyList,
    isSelectedAllActionId,
    contentAllDeletePopup,
    contentAllShareCodePopup,
    optionButton,
    pressListKeywordParams,
    timeZone,
    categoryList,
    categoryData,

    init,
    setOtherActions,
    ownerChangeAction,
    getSearchActionByKeyword,
    shareCodeChangeAction,
    selectedDeleteAction,
    ownerFunction,
    checkValidation,
    pressGroupAction,
    filterOptionAction,
    selectedAllDeleteAction,
    selectedAllShareCodeAction,
    categoryDataHandle,
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
    setPressGroupPopupSelectedUserChange,
    setPressGroupPopupGroupTargetOnChange,
    setPressGroupPopupShareSettingOnChange,
    setPressGroupPopupTitleOnChange,
    setInitPressGroupPopupAction,
    setPressGroupPopupDefaultChecked,
    setInitPressContentDetailPopupAction,
    setPressGroupPopupAction,
    setAllSearchContentKeyList,
    setSearchContentKeyList,
    initSelectedAllDeleteContent,
    setContentAllShareCodePopup,
    setContentAllShareCodePopupOnChange,
  }
}
