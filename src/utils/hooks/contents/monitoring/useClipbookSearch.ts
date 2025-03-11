import { ChangeEvent, useCallback, useEffect, useRef } from 'react'
import _ from 'lodash'
import moment from 'moment/moment'
import { useRouter } from 'next/router'

import {
  defaultBasicMonitoringSetting,
  defaultClipbookSetting,
  defaultOwnClipbookSetting,
  disclosureScopeFilterOptionList,
  extendedShareScopeList,
} from '~/components/contents/monitoring/Clipbook/Search/defaultData'
import { defaultClipbookSetting as DefaultCoverage } from '~/components/contents/monitoring/ClipbookPopup/defaultData'
import { ALLOWED_ORIGINS, SVC_DOMAIN_URL } from '~/constants/common'
import { shareCodeAction } from '~/stores/modules/contents/auth/auth'
import {
  categoryListAction,
  clipbookContentListAction,
  clipbookContentListButtonAction,
  clipbookContentListProps,
  clipbookCopyPopupAction,
  clipbookCopyPopupProps,
  clipbookDetailPopupAction,
  clipbookDetailPopupProps,
  clipbookListKeywordsAction,
  clipbookListParamsAction,
  clipbookListParamsProps,
  contentAllDeletePopupAction,
  contentAllDeletePopupProps,
  contentAllShareCodePopupAction,
  contentDeletePopupAction,
  contentDeletePopupProps,
  getOwnerLayerAction,
  initClipbookCopyPopupAction,
  initState,
  isLoadingAction,
  ownerLayerAction,
  ownerPopupAction,
  ownerPopupProps,
  pressReleaseInfoProps,
  resetClipbookListParamsAction,
  searchContentKeyListAction,
  sortByOwnerAction,
  userPopupAction,
} from '~/stores/modules/contents/monitoring/clipbook'
import {
  activityOpenAction,
  clipbbokPopupReceiverListAction,
  clipbookPopupAction,
  clipbookPopupPrjListAction,
  clipbookPopupProps,
  initClipbookPopupAction,
  keywordAction,
  setClipbookPopupInfoAction,
} from '~/stores/modules/contents/monitoring/clipbookPopup'
import { tagListParamsProps } from '~/stores/modules/contents/monitoring/monitoringTag'
import { sharedKeyAction } from '~/stores/modules/contents/shared/shared'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import {
  BaseResponseCommonObject,
  CreateClipBookDto,
  GroupDto,
  type PageClipBookDto,
  type UserDto,
  UserDtoForGroup,
} from '~/types/api/service'
import { NavigationLinkItem, SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { ClipbookCountDto } from '~/types/contents/Monitoring'
import { useAllDeleteClipbook, useDeleteClipbook } from '~/utils/api/clipbook/useDeleteClipbook'
import { apiGetClipbookCount, useGetClipbookCount } from '~/utils/api/clipbook/useGetClipbookCount'
import {
  apiGetClipbooks,
  apiGetClipbooksPrjList,
  getClipbooksPrjListParams,
  useGetClipbooks,
} from '~/utils/api/clipbook/useGetClipbooks'
import { usePostClipbookCopy } from '~/utils/api/clipbook/usePostClipbookCopy'
import { usePostClipbookCreate } from '~/utils/api/clipbook/usePostClipbookCreate'
import { usePostClipbookNameCheck } from '~/utils/api/clipbook/usePostClipbookNameCheck'
import { usePutClipbook, UsePutClipbookParams } from '~/utils/api/clipbook/usePutClipbook'
import { apiGetActiveGroupInfo } from '~/utils/api/group/useGetGroupSearch'
import { useAllClipbookSharePolicy, usePutSharePolicy } from '~/utils/api/setting/policy/usePutSharePolicy'
import { apiGetOneUser, useGetOneUserOption } from '~/utils/api/user/useGetOneUser'
import { apiAllGroupByUser } from '~/utils/api/user/usePutUserSelectGroup'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useMonitoringClipbookSearch = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    pageCount,
    clipbookContentList,
    clipbookContentListButton,
    clipbookContentLoading,
    clipbookListParams,
    sortByOwner,
    categoryList,
    ownerLayer,
    ownerGroup,
    ownerPopup,
    userPopup,
    isLoading,
    clipbookDetailPopup,
    contentDeletePopup,
    clipbookCopyPopup,
    clipbookListKeywords,
    optionButton,
    searchContentKeyList,
    contentAllDeletePopup,
    contentAllShareCodePopup,
  } = useAppSelector(state => state.monitoringClipbookSlice)
  const { clipbookPopup, activityOpen, keyword, keywordList, prjList } = useAppSelector(
    state => state.clipbookPopupSlice
  )
  const { isDemoLicense, licenseInfo, userInfo, shareCode, userSelectGroup, shareCodeData, timeZone } = useAppSelector(
    state => state.authSlice
  )

  const activityOpenRef = useRef<HTMLDivElement>(null)

  const createClipbook = usePostClipbookCreate()
  const apiPutSharePolicy = usePutSharePolicy()
  const apiAllClipbookSharePolicy = useAllClipbookSharePolicy()
  const checkClipbookName = usePostClipbookNameCheck()
  const deleteClipbook = useDeleteClipbook()
  const allDeleteClipbook = useAllDeleteClipbook()
  const updateClipbook = usePutClipbook()
  const clipbookCopy = usePostClipbookCopy()

  const { data: getClipbookCount } = useGetClipbookCount(
    { groupId: userSelectGroup },
    {
      enabled: categoryList.length < 1 && router.pathname === '/news/clipbook',
    }
  )

  const setInitClipbookCopyPopup = useCallback(() => dispatch(initClipbookCopyPopupAction()), [clipbookCopyPopup])

  const setInitClipbookPopup = useCallback(() => dispatch(initClipbookPopupAction()), [clipbookPopup])

  const setActivityOpenActionAction = useCallback(
    async (param: boolean) => {
      if (param) await getSearchActionByKeywordSearch('')
      dispatch(activityOpenAction(param))
    },
    [activityOpen]
  )

  const clipbookPopupKeywordsSearchDataAction = useCallback(
    async (e: ChangeEvent<HTMLInputElement>, hook: MbTagSearchTagItem[], key: NavigationLinkItem) => {
      let dataList = hook
      dataList = e.target.checked
        ? [...dataList, { id: key.id, label: key?.title || '', realLabel: key?.pathLink }]
        : dataList.filter(i => i.id.toString() !== key.id.toString())
      dispatch(clipbbokPopupReceiverListAction(dataList))
    },
    [prjList]
  )

  const clipbookPopupResetTagListOnChange = useCallback(async () => {
    dispatch(clipbbokPopupReceiverListAction([]))
  }, [prjList])

  const clipbookPopupTagCloseOnChange = useCallback(
    async (item: MbTagSearchTagItem, hook: MbTagSearchTagItem[]) => {
      dispatch(clipbbokPopupReceiverListAction(_.cloneDeep(hook).filter(tag => tag.id !== item.id)))
    },
    [prjList]
  )

  const setContentAllShareCodePopupOnChange = useCallback(
    (param: SelectListOptionItem, origin: contentAllDeletePopupProps) => {
      dispatch(
        contentAllShareCodePopupAction({
          ...origin,
          scrop: param,
        })
      )
    },
    [contentAllShareCodePopup.scrop]
  )

  const setContentAllShareCodePopup = useCallback(() => {
    dispatch(
      contentAllShareCodePopupAction({
        isOpen: false,
        key: [],
        scrop: shareCodeData.list,
      })
    )
  }, [contentAllShareCodePopup])

  const setSearchContentKeyList = useCallback(
    async (e: boolean, props: clipbookContentListProps, keyValue: clipbookContentListProps[]) => {
      let dataList: clipbookContentListProps[] = [...keyValue]
      if (e) {
        dataList = [...dataList, props]
      } else {
        dataList = dataList.filter(i => i?.clipBookId !== props?.clipBookId)
      }
      const isOption = await calculateButtonOption(dataList)
      dispatch(
        searchContentKeyListAction({ param: dataList, isDelete: isOption.isDelete, isShared: isOption.isShared })
      )
    },

    [searchContentKeyList]
  )

  const setAllSearchContentKeyList = useCallback(
    async (isCheck: boolean, origin: clipbookContentListProps[], clipbookItems: clipbookContentListProps[]) => {
      let isDelete = true
      let isShared = true
      let clipbookItemsList = [...clipbookItems]
      let dataList: clipbookContentListProps[] = clipbookItemsList.filter(
        item1 => !origin.some(item2 => item1.clipBookId === item2.clipBookId)
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
          if (dataListElement.clipBookId) {
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

  const clipbookListKeywordsOnChange = useCallback(
    async (e: string) => {
      dispatch(clipbookListKeywordsAction(e))
    },
    [clipbookListKeywords]
  )

  const clipbookPopupKeywordsOnChange = useCallback(
    async (e: string) => {
      dispatch(keywordAction(e))
    },
    [keyword]
  )

  const setClipbookPopupTitleOnChange = useCallback(
    (param: string, origin: clipbookPopupProps) => {
      const params = {
        ...origin,
        name: param,
        nameErr: '',
      }
      dispatch(clipbookPopupAction(params))
    },
    [clipbookPopup.name]
  )

  const setClipbookPopupCoverageIdOnChange = useCallback(
    async (param: SelectListOptionItem, origin: clipbookPopupProps) => {
      const params = {
        ...origin,
        coverageId: param,
      }
      dispatch(clipbookPopupAction(params))
      // if (param.id === 'COVERAGE') {
      //   await getSearchActionByKeyword('')
      // }
    },
    [clipbookPopup.coverageId]
  )

  const setClipbookPopupHandleShareSetting = useCallback(
    (param: SelectListOptionItem, origin: clipbookPopupProps) => {
      const params = {
        ...origin,
        scrop: param,
      }
      dispatch(clipbookPopupAction(params))
    },
    [clipbookPopup.scrop]
  )

  const setClipbookPopupHandleScropChanged = useCallback(
    (param: boolean, origin: clipbookPopupProps) => {
      const params = {
        ...origin,
        isScropChanged: param,
      }
      dispatch(clipbookPopupAction(params))
    },
    [clipbookPopup.isScropChanged]
  )

  const setClipbookPopupHandleSelectedUser = useCallback(
    (param: SelectListOptionItem, origin: clipbookPopupProps) => {
      const params = {
        ...origin,
        selectedUser: param,
      }
      dispatch(clipbookPopupAction(params))
    },
    [clipbookPopup.selectedUser]
  )

  const setClipbookCopyPopupTitleOnChange = useCallback(
    (param: string, origin: clipbookCopyPopupProps) => {
      const params = {
        ...origin,
        name: param,
        nameErr: '',
      }
      dispatch(clipbookCopyPopupAction(params))
    },
    [clipbookCopyPopup.name]
  )

  const setClipbookCopyPopupHandleCategory = useCallback(
    (param: SelectListOptionItem, origin: clipbookCopyPopupProps) => {
      const params = {
        ...origin,
        category: param,
      }
      dispatch(clipbookCopyPopupAction(params))
    },
    [clipbookCopyPopup.category]
  )

  const setClipbookCopyPopupHandleShareSetting = useCallback(
    (param: SelectListOptionItem, origin: clipbookCopyPopupProps) => {
      const params = {
        ...origin,
        scrop: param,
      }
      dispatch(clipbookCopyPopupAction(params))
    },
    [clipbookCopyPopup.scrop]
  )

  const setClipbookDetailPopupAction = useCallback(
    (e: clipbookDetailPopupProps) => dispatch(clipbookDetailPopupAction(e)),
    [clipbookDetailPopup]
  )

  const setOwnerLayerAction = useCallback(
    async (layerOpen: boolean, key: string) => dispatch(ownerLayerAction({ layerOpen, key })),
    [ownerLayer]
  )

  const setOwnerPopupAction = useCallback(
    async (param: ownerPopupProps) => dispatch(ownerPopupAction(param)),
    [ownerPopup]
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

  const setSelectedDeleteContent = useCallback(
    (param: contentDeletePopupProps) => dispatch(contentDeletePopupAction(param)),
    [contentDeletePopup]
  )

  const setClipbookContentListButtonAction = useCallback(
    (param: boolean) => dispatch(clipbookContentListButtonAction(param)),
    [clipbookContentListButton]
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

  const init = async () => {
    dispatch(initState())
    const count = await initCategoryList('', 'init')
    await getClipbookListData({
      title: '',
      page: 1,
      size: 20,
      ownerId: '',
      sort: ['updateAt!desc'],
      category: count,
      shareCode: { id: '', name: '전체' },
    })
  }

  const getClipbookListData = async (param: clipbookListParamsProps) => {
    let tempList: clipbookContentListProps[] = []
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 0,
    }
    dispatch(isLoadingAction(true))
    try {
      const { status, data, message } = await apiGetClipbooks({
        page: param.page,
        size: param.size,
        sort: param.sort[0],
        title: param.title,
        shareCode: param.shareCode.id,
        type: param.category.id,
        groupId: userSelectGroup,
        ownerId: param.ownerId !== '' ? Number(param.ownerId) : undefined,
      })

      if (status === 'S') {
        const res = data as PageClipBookDto
        if (res.content && res.content.length > 0) {
          for await (const content of res.content) {
            const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === content.shareCode)
            let temp: clipbookContentListProps = {
              ...content,
              isEdit: userInfo.userId === content.owner?.userId ? true : content.shareCode === 'WRITABLE',
              isOwner: userInfo.userId === content.owner?.userId,
              categoryName: content.type === 'COVERAGE' ? '커버리지' : '',
              settingList: defaultBasicMonitoringSetting,
              shareCodeNm: findShareScopeList?.name || '',
              //@ts-ignore
              pressReleaseInfo: content.prlist as pressReleaseInfoProps[],
            }
            if (userInfo.userId === content.owner?.userId) {
              temp.settingList = defaultOwnClipbookSetting
            } else if (content.shareCode === 'WRITABLE') {
              temp.settingList = defaultOwnClipbookSetting
            } else if (content.shareCode === 'READABLE') {
              if (userInfo.role === 'ADMIN') {
                temp.settingList = [
                  ...defaultClipbookSetting,
                  {
                    id: 'DELETE',
                    name: '삭제하기',
                  },
                ]
              } else {
                temp.settingList = defaultClipbookSetting
              }
            }
            tempList = [...tempList, temp]
          }
          tempPageCount = {
            totalCount: res.totalElements ?? 0,
            totalPageCount: res.totalPages ?? 0,
          }
        }
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}
    dispatch(
      clipbookContentListAction({
        list: tempList,
        pageCount: tempPageCount,
        apiDto: param,
      })
    )
  }

  const getSearchActionByKeyword = async (keyword: string, hook: clipbookListParamsProps) => {
    const data = {
      ...hook,
      title: keyword,
      page: 1,
      size: 20,
    }
    dispatch(clipbookListParamsAction({ props: data, isReset: true }))
    await getClipbookListData(data)
  }

  const handleChangeShareCode = async (e: SelectListOptionItem, hook: clipbookListParamsProps) => {
    const data = {
      ...hook,
      shareCode: e,
    }
    dispatch(clipbookListParamsAction({ props: data, isReset: true }))
    await getClipbookListData(data)
  }

  const handleChangeSize = async (e: number, hook: clipbookListParamsProps) => {
    const data = {
      ...hook,
      page: 1,
      size: e,
    }
    dispatch(clipbookListParamsAction({ props: data, isReset: true }))
    await getClipbookListData(data)
  }

  const handlePaginationChange = async (e: number, hook: clipbookListParamsProps) => {
    const data = {
      ...hook,
      page: e,
      size: hook.size,
    }
    dispatch(clipbookListParamsAction({ props: data, isReset: false }))
    await getClipbookListData(data)
  }

  const handleChangeSort = async (e: string[], hook: clipbookListParamsProps) => {
    const data = {
      ...hook,
      sort: e,
      page: 1,
    }
    dispatch(clipbookListParamsAction({ props: data, isReset: true }))
    await getClipbookListData(data)
  }

  const handleKeywordsChange = async (e: string, hook: clipbookListParamsProps) => {
    const data = {
      ...hook,
      title: e,
      page: 1,
      size: 20,
    }
    dispatch(clipbookListParamsAction({ props: data, isReset: true }))
    await getClipbookListData(data)
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

  const handleIsSendToMe = async (param: boolean, hook: clipbookListParamsProps) => {
    dispatch(sortByOwnerAction({ isOwner: param, ownerId: userInfo.userId ? userInfo?.userId.toString() : '' }))
    await getClipbookListData({
      ...hook,
      ownerId: param ? (userInfo.userId ? userInfo?.userId.toString() : '') : '',
    })
  }

  const handleChangeCategory = async (e: SelectListOptionItem, hook: clipbookListParamsProps) => {
    const data = {
      category: e,
      title: '',
      page: 1,
      size: 20,
      ownerId: '',
      sort: ['updateAt!desc'],
      shareCode: { id: '', name: '전체' },
    }
    await initCategoryList(data.category.id, 'init')
    await getClipbookListData(data)
  }

  const selectedAllShareCodeAction = async (
    scope: SelectListOptionItem,
    param: contentAllDeletePopupProps,
    apiDto: clipbookListParamsProps
  ) => {
    const { status, data, message } = await apiAllClipbookSharePolicy.mutateAsync({
      clipBookIdList: param.key.map(e => {
        return Number(e.id)
      }),
      shareCode: scope.id,
    })
    if (status === 'S') {
      openToast('선택한 클립북의 공유설정을 변경했습니다.', 'success')
      await getClipbookListData(apiDto)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const selectedAllDeleteAction = async (param: contentAllDeletePopupProps, apiDto: clipbookListParamsProps) => {
    const { status, data, message } = await allDeleteClipbook.mutateAsync({
      clipBookIdList: param.key.map(e => {
        return Number(e.id)
      }),
    })
    if (status === 'S') {
      openToast('선택한 클립북을 삭제했습니다.', 'success')
      await initCategoryList(apiDto.category.id, '')
      await getClipbookListData(apiDto)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const selectedDeleteAction = async (param: contentDeletePopupProps, apiDto: clipbookListParamsProps) => {
    const { status, data, message } = await deleteClipbook.mutateAsync(param.key)
    if (status === 'S') {
      openToast('클립북을 삭제했습니다.', 'success')
      await initCategoryList(apiDto.category.id, '')
      await getClipbookListData(apiDto)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setQueryParam = async (list: string[]) => {
    let res = ''
    if (list.length > 0) {
      for await (const re of list) {
        const query = re.split('=')
        if (query.length > 0) {
          switch (query[0]) {
            case 'normal':
              res = query[0]
              break
            case 'coverage':
              res = query[0]
              break
            default:
          }
        }
      }
    }
    return res
  }

  const initCategoryList = async (categoryType: string, type: string) => {
    let coverageCount = 0
    let normalCount = 0
    let params = { id: '', name: '전체 클립북', count: 0 }
    try {
      const { status, data, message } = await apiGetClipbookCount({ groupId: userSelectGroup })
      if (status === 'S') {
        const { COVERAGE, NORMAL } = data as ClipbookCountDto
        coverageCount = COVERAGE ? COVERAGE : 0
        normalCount = NORMAL ? NORMAL : 0
      }
      if (type === 'init') {
        if (window.location.search && window.location.search.substring(1).split('?').length > 0) {
          const subParams = window.location.search.substring(1).split('?')
          const querys = await setQueryParam(subParams)
          if (querys && querys === 'normal') {
            params = {
              id: 'NORMAL',
              name: '일반 클립북',
              count: normalCount,
            }
          } else if (querys && querys === 'coverage') {
            params = {
              id: 'COVERAGE',
              name: '커버리지 클립북',
              count: coverageCount,
            }
          }
        } else {
          params = {
            id: '',
            name: '전체 클립북',
            count: coverageCount + normalCount,
          }
        }
      } else {
        if (categoryType === '') {
          params = {
            id: '',
            name: '전체 클립북',
            count: coverageCount + normalCount,
          }
        } else if (categoryType === 'NORMAL') {
          params = {
            id: 'NORMAL',
            name: '일반 클립북',
            count: normalCount,
          }
        } else if (categoryType === 'COVERAGE') {
          params = {
            id: 'COVERAGE',
            name: '커버리지 클립북',
            count: coverageCount,
          }
        }
      }
    } catch (e) {}
    dispatch(
      categoryListAction({
        list: [
          {
            id: '',
            name: '전체 클립북',
            count: coverageCount + normalCount,
          },
          {
            id: 'NORMAL',
            name: '일반 클립북',
            count: normalCount,
          },
          {
            id: 'COVERAGE',
            name: '커버리지 클립북',
            count: coverageCount,
          },
        ],
        param: params,
      })
    )

    return params
  }

  const ownerChangeAction = async (props: ownerPopupProps, apiDto: clipbookListParamsProps) => {
    const param = {
      id: props.clipBookId,
      info: {
        type: props.type,
        title: props.title,
        ownerId: props.key,
      },
    }
    const { status, data, message } = await updateClipbook.mutateAsync(param)
    if (status === 'S') {
      openToast('소유자를 수정했습니다', 'success')
      await getClipbookListData(apiDto)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const selectedCopyAction = async (props: clipbookCopyPopupProps, apiDto: clipbookListParamsProps) => {
    let isProcess = false
    let param = { ...props }
    if (props.name === '') {
      param.nameErr = '복사할 클립북 이름을 입력해주세요.'
    } else if (props.name.length > 100) {
      param.nameErr = '이름은 100자를 넘을 수 없습니다.'
    } else {
      const { status, message } = await checkClipbookName.mutateAsync({
        oldName: '',
        newName: props.name,
        groupId: userSelectGroup,
      })
      if (status === 'S') {
        isProcess = true
      } else {
        param.nameErr = '같은 이름의 클립북이 이미 있습니다'
      }
    }

    if (isProcess) {
      const param = {
        clipBookId: props.key,
        title: props.name,
        groupId: licenseInfo.flagGroup ? Number(props.category.id) : userSelectGroup,
        shareCode: props.scrop.id,
      }
      const { status, data, message } = await clipbookCopy.mutateAsync(param)
      if (status === 'S') {
        openToast('클립북을 복사했습니다.', 'success')
        await initCategoryList(apiDto.category.id, '')
        await getClipbookListData(apiDto)
      } else {
        openToast(message?.message, 'error')
      }
    } else {
      openToast(param.nameErr, 'error')
      dispatch(clipbookCopyPopupAction(param))
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

  const calculateButtonOption = async (props: clipbookContentListProps[]) => {
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

  const filterOptionAction = async (keyOption: string, props: clipbookContentListProps[]) => {
    let temp: MbTagSearchTagItem[] = []
    if (props && props.length > 0) {
      for await (const shareCodeElement of props) {
        if (shareCodeElement?.clipBookId) {
          temp = [
            ...temp,
            {
              id: shareCodeElement?.clipBookId.toString(),
              label: shareCodeElement?.title || '',
            },
          ]
        }
      }
    }
    if (temp && temp.length > 0) {
      if (keyOption === 'share') {
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
      }
    }
  }

  const onMoveUrlClickCheck = (target: HTMLElement, clipBookId: number) => {
    let isCount = 0
    const isInList1 = target.closest('.list-type4-item__title type-flex-grow') !== null // Check if the target is within the list
    if (isInList1) {
      isCount += 1
    }
    const isInList2 = target.closest('.list-type4-item__check') !== null // Check if the target is within the list
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
      router.push(`/news/clipbook-result?clipbook_id=${clipBookId}`)
    }
  }

  const setOtherActions = async (e: SelectListOptionItem, props: clipbookContentListProps) => {
    if (e.id === 'UPDATE') {
      console.log('props', props)
      const findCoverageId = DefaultCoverage.find(i => i.id === props.type)
      const find = extendedShareScopeList.find(i => i.id === props.shareCode)
      const users = await getUserList()
      const userList =
        users.length > 0
          ? users.map(i => {
              return { id: i.userId, name: i.name }
            })
          : []
      const prjList =
        props.type === 'COVERAGE'
          ? props.pressReleaseInfo.length > 0
            ? props.pressReleaseInfo.map(k => {
                return { id: k.id, label: k?.title || '', realLabel: '' }
              })
            : []
          : []
      const findUser = userList.find(i => i.id === props.owner?.userId)
      const params = {
        isOpen: true,
        isOwner: props.isOwner,
        key: props?.clipBookId || 0,
        name: props?.title || '',
        oldName: props?.title || '',
        nameErr: '',
        coverageId: findCoverageId ? findCoverageId : { id: 'NORMAL', name: '일반 클립북' },
        scrop: find ? find : shareCodeData.clipbook,
        isScropChanged: false,
        userList: userList,
        selectedUser: findUser ? findUser : { id: userInfo.userId, name: userInfo.name },
      }
      // @ts-ignore
      dispatch(setClipbookPopupInfoAction({ params, prjList }))
    } else if (e.id === 'DELETE') {
      dispatch(
        contentDeletePopupAction({
          isOpen: true,
          key: props?.clipBookId || 0,
          title: `${props.title}(소유자 ${props.owner?.name})`,
        })
      )
    } else if (e.id === 'SHARE') {
      dispatch(
        sharedKeyAction({
          key: props?.clipBookId || 0,
          title: '클립북 공유 - ' + props?.title || '',
          editor: props?.title || '',
          type: 'CLIPBOOK',
          sharedUrl:
            process.env.MY_ENV_VAR === 'production'
              ? SVC_DOMAIN_URL.PROD
              : SVC_DOMAIN_URL.DEV + `/news/clipbook-result?clipbook_id=${props.clipBookId}`,
        })
      )
    } else if (e.id === 'DETAIL') {
      dispatch(clipbookDetailPopupAction({ isOpen: true, data: props }))
    } else if (e.id === 'COPY') {
      let param = {
        isOpen: true,
        key: Number(props.clipBookId),
        name: props.title + ' (1)',
        nameErr: '',
        categoryList: [],
        category: { id: '', name: '' },
        scrop: shareCodeData.clipbook,
      }
      if (licenseInfo.flagGroup) {
        const categoryList = await getGroupData()
        // @ts-ignore
        param.categoryList = categoryList.list
        param.category = categoryList.data
      }
      dispatch(clipbookCopyPopupAction(param))
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

  const shareCodeChangeAction = async (
    id: number,
    shareCode: string,
    type: string,
    title: string,
    apiDto: clipbookListParamsProps
  ) => {
    const param = {
      id,
      info: {
        type,
        title,
        shareCode,
      },
    }
    const { status, data, message } = await updateClipbook.mutateAsync(param)
    if (status === 'S') {
      openToast('공유 설정을 수정했습니다', 'success')
      await getClipbookListData(apiDto)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const checkValidation = async (props: clipbookPopupProps) => {
    let setTitleErr = ''
    let isProcess = false
    if (props.name === '') {
      setTitleErr = '클립북의 이름을 입력하세요'
    } else if (props.name.length > 100) {
      setTitleErr = '클립북명은 100자를 넘을 수 없습니다.'
    } else {
      if (props.key > 0) {
        if (props.oldName !== props.name) {
          const { status, message } = await checkClipbookName.mutateAsync({
            oldName: props.oldName,
            newName: props.name,
            groupId: userSelectGroup,
          })
          if (status === 'S') {
            isProcess = true
          } else {
            setTitleErr = '같은 이름의 클립북이 이미 있습니다'
          }
        } else {
          isProcess = true
        }
      } else {
        const { status, message } = await checkClipbookName.mutateAsync({
          oldName: '',
          newName: props.name,
          groupId: userSelectGroup,
        })
        if (status === 'S') {
          isProcess = true
        } else {
          setTitleErr = '같은 이름의 클립북이 이미 있습니다'
        }
      }
    }
    dispatch(
      clipbookPopupAction({
        ...props,
        nameErr: setTitleErr,
      })
    )
    return isProcess
  }

  const updateAction = async (
    props: clipbookPopupProps,
    list: MbTagSearchTagItem[],
    apiDto: clipbookListParamsProps
  ) => {
    const params: UsePutClipbookParams = {
      id: props.key,
      info: {
        type: props.coverageId.id,
        title: props.name,
        shareCode: props.scrop.id,
        ownerId: props.isOwner ? userInfo?.userId || 0 : Number(props.selectedUser.id),
        prIdList: [],
      },
    }
    if (props.coverageId.id === 'COVERAGE' && list.length > 0) {
      let temp: number[] = []
      for await (const param of list) {
        temp = [...temp, Number(param.id)]
      }
      params.info.prIdList = temp
    }
    const { status, message } = await updateClipbook.mutateAsync(params)
    if (status === 'S') {
      openToast('클립북을 수정했습니다.', 'success')
      dispatch(initClipbookPopupAction())
      await getClipbookListData(apiDto)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const createAction = async (
    props: clipbookPopupProps,
    list: MbTagSearchTagItem[],
    apiDto: clipbookListParamsProps
  ) => {
    const newDate = moment()
    const year = newDate.format('YYYY')
    const month = newDate.format('M')
    const day = newDate.format('D')
    const params: CreateClipBookDto = {
      title: props.name,
      type: props.coverageId.id,
      shareCode: props.scrop.id,
      chkDefault: props.isScropChanged,
      groupId: userSelectGroup,
      // startYear: year,
      // startMonth: month,
      // startDay: day,
      // endYear: year,
      // endMonth: month,
      // endDay: day,
    }
    if (props.coverageId.id === 'COVERAGE' && list.length > 0) {
      let temp: number[] = []
      for await (const param of list) {
        console.log('param', param)
        // @ts-ignore
        temp = [...temp, Number(param.id)]
      }
      params.prlist = temp
    }
    const { status, message } = await createClipbook.mutateAsync(params)
    if (status === 'S') {
      openToast('클립북을 만들었습니다.', 'success')
      if (props.isScropChanged) {
        await updatePolicy(props.scrop.id)
      }
      await initCategoryList(apiDto.category.id, '')
      await getClipbookListData(apiDto)
      dispatch(initClipbookPopupAction())
      //router.reload()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const updatePolicy = async (props: string) => {
    const param = {
      list: shareCode.list,
      jrnlstMediaSrch: shareCode.jrnlstMediaSrch,
      clipbook: props,
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

  const clipbookAction = async (
    props: clipbookPopupProps,
    list: MbTagSearchTagItem[],
    apiDto: clipbookListParamsProps
  ) => {
    if (props.key > 0) {
      await updateAction(props, list, apiDto)
    } else {
      await createAction(props, list, apiDto)
    }
  }

  const getSearchActionByKeywordSearch = async (props: string) => {
    const params = {
      groupId: userSelectGroup,
      keyword: props,
    }
    const { status, data, message } = await apiGetClipbooksPrjList(params)
    if (status === 'S') {
      const res = data as getClipbooksPrjListParams[]
      let newTagItems: NavigationLinkItem[] = []
      console.log('res', res)
      for await (const e of res) {
        newTagItems = [
          ...newTagItems,
          {
            id: e.mailingId.toString(),
            title: e.title,
            pathLink: e.companyId.toString(),
          },
        ]
      }
      dispatch(clipbookPopupPrjListAction(newTagItems))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const openClipbookPopup = () => {
    const params = {
      isOpen: true,
      isOwner: true,
      key: 0,
      oldName: '',
      name: '',
      nameErr: '',
      coverageId: { id: 'NORMAL', name: '일반 클립북' },
      scrop: shareCodeData.clipbook,
      isScropChanged: false,
      userList: [],
      selectedUser: { id: '', name: '' },
    }
    dispatch(clipbookPopupAction(params))
  }

  return {
    clipbookCopyPopup,
    userSelectGroup,
    licenseInfo,
    userInfo,
    pageCount,
    sortByOwner,
    clipbookContentList,
    clipbookContentListButton,
    clipbookContentLoading,
    clipbookListParams,
    categoryList,
    isLoading,
    ownerLayer,
    ownerGroup,
    ownerPopup,
    contentDeletePopup,
    userPopup,
    clipbookDetailPopup,
    clipbookPopup,
    activityOpenRef,
    activityOpen,
    keyword,
    keywordList,
    prjList,
    clipbookListKeywords,
    timeZone,
    optionButton,
    searchContentKeyList,
    contentAllDeletePopup,
    contentAllShareCodePopup,

    setOtherActions,
    ownerChangeAction,
    getSearchActionByKeyword,
    shareCodeChangeAction,
    selectedDeleteAction,
    selectedAllDeleteAction,
    ownerFunction,
    selectedCopyAction,
    openClipbookPopup,
    getSearchActionByKeywordSearch,
    checkValidation,
    clipbookAction,
    init,
    onMoveUrlClickCheck,
    filterOptionAction,
    selectedAllShareCodeAction,
    handleChangeCategory,
    handleIsSendToMe,
    handleKeywordsChange,
    handleChangeSize,
    handlePaginationChange,
    handleChangeSort,
    handleChangeShareCode,

    setUserProfilePopupAction,
    setSelectedDeleteContent,
    initSelectedAllDeleteContent,
    setOwnerPopupAction,
    setOwnerLayerAction,
    getOwnerLayer,
    setClipbookContentListButtonAction,
    setClipbookDetailPopupAction,
    setInitClipbookCopyPopup,
    setClipbookCopyPopupTitleOnChange,
    setClipbookCopyPopupHandleCategory,
    setClipbookCopyPopupHandleShareSetting,
    setActivityOpenActionAction,
    clipbookPopupKeywordsOnChange,
    setClipbookPopupTitleOnChange,
    setInitClipbookPopup,
    setClipbookPopupCoverageIdOnChange,
    setClipbookPopupHandleShareSetting,
    setClipbookPopupHandleScropChanged,
    setClipbookPopupHandleSelectedUser,
    clipbookPopupTagCloseOnChange,
    clipbookPopupResetTagListOnChange,
    clipbookPopupKeywordsSearchDataAction,
    clipbookListKeywordsOnChange,
    setAllSearchContentKeyList,
    setSearchContentKeyList,
    setContentAllShareCodePopup,
    setContentAllShareCodePopupOnChange,
  }
}
