import { useCallback, useEffect } from 'react'
import moment from 'moment/moment'
import { useRouter } from 'next/router'

import {
  defaultBasicMonitoringSetting,
  defaultMonitoringSetting,
  defaultMonitoringSettingPublic,
  disclosureScopeFilterOptionList,
  extendedShareScopeList,
  extendedShareScopeTargetList,
  monitoringInitParams,
} from '~/components/contents/monitoring/Management/defaultData'
import { ALLOWED_ORIGINS, SVC_DOMAIN_URL } from '~/constants/common'
import {
  categoryCommonCodeListAction,
  categoryListAction,
  categoryListProps,
  contentDeletePopupAction,
  contentDeletePopupProps,
  getOwnerLayerAction,
  initManagementPopupAction,
  initState,
  isLoadingAction,
  managementContentListAction,
  managementContentListButtonAction,
  managementContentListProps,
  managementListParamsAction,
  managementListParamsContextAction,
  managementListParamsProps,
  managementPopupAction,
  managementPopupProps,
  monitoringPopupProps,
  ownerLayerAction,
  ownerPopupAction,
  ownerPopupProps,
  resetManagementListParamsAction,
  sortByOwnerAction,
  userPopupAction,
} from '~/stores/modules/contents/monitoring/management'
import { editMonitoringPopupAction } from '~/stores/modules/contents/monitoring/monitoringPopup'
import { setCurrentNewsSrchId, setNewsAlertsPopupAction } from '~/stores/modules/contents/newsAlert/newsAlert'
import { sharedKeyAction } from '~/stores/modules/contents/shared/shared'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import {
  BaseResponseCommonObject,
  ESearchNewsCondDto,
  GroupDto,
  type PageNewsSrchDto,
  type TagDto,
  type UserDto,
  UserDtoForGroup,
} from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { MonitoringCountDto } from '~/types/contents/Monitoring'
import { apiGetCommonCode, CommonCode, useGetCommonCode } from '~/utils/api/common/useGetCommonCode'
import { apiGetActiveGroupInfo } from '~/utils/api/group/useGetGroupSearch'
import { useDeleteMonitoring } from '~/utils/api/monitoring/useDeleteMonitoring'
import { apiGetMonitoringCount, useGetMonitoringCount } from '~/utils/api/monitoring/useGetMonitoringCount'
import { apiGetMonitoringSearch, useGetMonitoringSearch } from '~/utils/api/monitoring/useGetMonitoringSearch'
import { usePutMonitoringUpdate } from '~/utils/api/monitoring/usePutMonitoringUpdate'
import { apiGetOneUser, useGetOneUserOption } from '~/utils/api/user/useGetOneUser'
import { getObjectFromBase64, setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useMonitoringManagement = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    isLoading,
    pageCount,
    managementContentList,
    managementContentListButton,
    managementContentLoading,
    managementListParams,
    managementPopup,
    sortByOwner,
    categoryList,
    categoryCommonCodeList,
    ownerLayer,
    ownerGroup,
    ownerPopup,
    userPopup,
    categoryTotalList,
    contentDeletePopup,
    managementListParamsContext,
  } = useAppSelector(state => state.monitoringManagementSlice)
  const { isDemoLicense, licenseInfo, userInfo, userSelectGroup, shareCodeData, timeZone } = useAppSelector(
    state => state.authSlice
  )
  const mainProductInfo = licenseInfo.productList?.find(e => e.name === licenseInfo.mainProductName)

  const updateMonitoringCustomSearch = usePutMonitoringUpdate()
  const deleteMonitoring = useDeleteMonitoring()

  const setInitManagementPopupAction = useCallback(() => dispatch(initManagementPopupAction()), [managementPopup])
  const setOwnerLayerAction = useCallback(
    async (layerOpen: boolean, key: string) => dispatch(ownerLayerAction({ layerOpen, key })),
    [ownerLayer]
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
    (param: boolean) => dispatch(managementContentListButtonAction(param)),
    [managementContentListButton]
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
    const { status, data, message } = await apiGetActiveGroupInfo(userSelectGroup)
    if (status === 'S') {
      const res = data as GroupDto
      list = res.users && res.users?.length > 0 ? res.users : ([] as UserDtoForGroup[])
    } else {
      openToast(message?.message, 'error')
    }
    dispatch(getOwnerLayerAction(list))
  }, [ownerGroup, ownerLayer])

  const openPopup = useCallback(
    (e: string, key: number, target: string) => {
      dispatch(
        managementPopupAction({
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
    [managementPopup]
  )

  const inputValueOnChange = useCallback(
    (e: string, hook: managementPopupProps) => {
      dispatch(
        managementPopupAction({
          ...hook,
          value: e,
          valueErr: '',
        })
      )
    },
    [managementPopup.value, managementPopup.valueErr]
  )

  const managementListParamsContextChange = useCallback(
    async (e: string) => {
      dispatch(managementListParamsContextAction(e))
    },
    [managementListParamsContext]
  )

  const handleKeywordsChange = async (e: string, hook: managementListParamsProps) => {
    await getMonitoringTypeList({
      ...hook,
      title: e,
      page: 1,
      size: 20,
    })
  }

  const handleChangeShareCode = async (e: SelectListOptionItem, hook: managementListParamsProps) => {
    await getMonitoringTypeList({
      ...hook,
      shareCode: e,
      page: 1,
    })
  }

  const handleChangeSize = async (e: number, hook: managementListParamsProps) => {
    await getMonitoringTypeList({
      ...hook,
      page: 1,
      size: e,
    })
  }

  const handlePaginationChange = async (e: number, hook: managementListParamsProps) => {
    await getMonitoringTypeList({
      ...hook,
      page: e,
      size: hook.size,
    })
  }

  const handleChangeSort = async (e: string[], hook: managementListParamsProps) => {
    await getMonitoringTypeList({
      ...hook,
      sort: e,
      page: 1,
    })
  }

  const getSearchActionByKeyword = async (keyword: string, hook: managementListParamsProps) => {
    await getMonitoringTypeList({
      ...hook,
      title: keyword,
      page: 1,
      size: 20,
    })
  }

  const getCommonCode = async () => {
    let res: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: 'MONITORING_CATEGORY' })
    if (status === 'S') {
      res = data as CommonCode[]
      dispatch(categoryCommonCodeListAction(res))
    }

    return res
  }

  const getMonitoringCount = async (propList: CommonCode[]) => {
    let res: categoryListProps[] = []
    let categoryParam = { id: 'ALL', name: '전체' }
    let count = 0
    let tempCommonList = propList
    let categoryTotalList = []
    if (tempCommonList.length < 1) {
      tempCommonList = await getCommonCode()
    }
    categoryTotalList = tempCommonList.map(e => {
      return { id: e.code, name: e.name }
    })
    const { status, data, message } = await apiGetMonitoringCount(userSelectGroup)
    if (status === 'S') {
      const param = data as MonitoringCountDto
      if (tempCommonList.length > 0 && param) {
        categoryParam =
          managementListParams.category.id !== '' ? managementListParams.category : { id: 'ALL', name: '전체' }
        console.log('MonitoringCountDto', param)
        console.log('tempCommonList', tempCommonList)

        for await (const commonCode of tempCommonList) {
          if (param[commonCode.code] && (param[commonCode.code] as number) > 0) {
            let temp = {
              id: commonCode.code,
              name: commonCode.name,
              count: param[commonCode.code] as number,
            }
            console.log('temp', temp)
            count += Number(param[commonCode.code])
            res = [...res, temp]
          }
        }
        res.unshift({ id: 'ALL', name: '전체', count })
      }
    }
    dispatch(categoryListAction({ list: res, param: categoryParam, categoryTotalList }))

    return { id: 'ALL', name: '전체', count }
  }

  const getMonitoringTypeList = async (param: managementListParamsProps, commonCode?: CommonCode[]) => {
    let res: managementContentListProps[] = []
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 0,
    }
    try {
      const { status, data, message } = await apiGetMonitoringSearch({
        page: param.page,
        size: param.size,
        groupId: userSelectGroup,
        category: param.category.id,
        ownerId: param.ownerId !== '' ? Number(param.ownerId) : undefined,
        sort: param.sort[0],
        title: param.title,
        shareCode: param.shareCode.id,
      })
      if (status === 'S') {
        const props = data as PageNewsSrchDto
        if (props.content && props.content.length > 0) {
          for await (const content of props.content) {
            const categoryCommonCode = categoryCommonCodeList.length > 0 ? categoryCommonCodeList : commonCode
            const findCategory = categoryCommonCode && categoryCommonCode.find(e => e.code === content.category)
            const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === content.shareCode)
            let temp: managementContentListProps = {
              ...content,
              isOwner: userInfo.userId === content.owner?.userId,
              notice: false,
              categoryName: findCategory ? findCategory.name : '알수없음',
              settingList: defaultBasicMonitoringSetting,
              shareCodeNm: findShareScopeList?.name || '',
            }
            if (userInfo.userId === content.owner?.userId) {
              temp.settingList = defaultMonitoringSetting
            } else if (content.shareCode === 'WRITABLE') {
              temp.settingList = defaultMonitoringSetting
            } else if (content.shareCode === 'READABLE') {
              if (userInfo.role === 'ADMIN') {
                temp.settingList = [
                  ...defaultBasicMonitoringSetting,
                  {
                    id: 'DELETE',
                    name: '삭제하기',
                  },
                ]
              } else {
                temp.settingList = defaultBasicMonitoringSetting
              }
            }
            if (!mainProductInfo?.newsNoticeOn) {
              temp.settingList = temp.settingList.filter(e => e.id !== 'NOTIFY')
            }
            res = [...res, temp]
          }
          tempPageCount = {
            totalCount: props.totalElements ?? 0,
            totalPageCount: props.totalPages ?? 0,
          }
        }
      }
    } catch (e) {}
    dispatch(
      managementContentListAction({
        list: res,
        pageCount: tempPageCount,
        apiDto: param,
      })
    )
  }
  const handleIsSendToMe = async (param: boolean, hook: managementListParamsProps) => {
    dispatch(sortByOwnerAction({ isOwner: param, ownerId: userInfo.userId ? userInfo?.userId.toString() : '' }))
    await getMonitoringTypeList({
      ...hook,
      ownerId: param ? (userInfo.userId ? userInfo?.userId.toString() : '') : '',
    })
  }

  const init = async () => {
    dispatch(initState())
    const commonCode = await getCommonCode()
    const monitoringCount = await getMonitoringCount(commonCode)
    await getMonitoringTypeList(
      {
        title: '',
        page: 1,
        size: 20,
        ownerId: '',
        sort: ['updateAt!desc'],
        category: monitoringCount,
        shareCode: { id: '', name: '전체' },
      },
      commonCode
    )
  }

  const handleChangeCategory = async (e: SelectListOptionItem, hook: managementListParamsProps) => {
    await getMonitoringCount([])
    await getMonitoringTypeList({
      title: '',
      page: 1,
      size: 20,
      ownerId: '',
      sort: ['updateAt!desc'],
      shareCode: { id: '', name: '전체' },
      category: e,
    })
  }

  const onMoveUrlClickCheck = (target: HTMLElement, newsSrchId: number) => {
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
      router.push(`/news/monitoring?monitoring_id=${newsSrchId}`)
    }
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

  const selectedDeleteAction = async (param: contentDeletePopupProps, apiDto: managementListParamsProps) => {
    const { status, data, message } = await deleteMonitoring.mutateAsync(param.key)
    if (status === 'S') {
      openToast('모니터링을 삭제했습니다.', 'success')
      await getMonitoringCount([])
      await getMonitoringTypeList(apiDto)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const ownerChangeAction = async (props: ownerPopupProps, apiDto: managementListParamsProps) => {
    const param = {
      id: props.monitoringId,
      info: {
        groupId: userSelectGroup,
        ownerId: props.key,
      },
    }
    const { status, data, message } = await updateMonitoringCustomSearch.mutateAsync(param)
    if (status === 'S') {
      openToast('소유자를 수정했습니다', 'success')
      await getMonitoringTypeList(apiDto)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setOtherActions = async (
    e: SelectListOptionItem,
    props: managementContentListProps,
    categorys: SelectListOptionItem[]
  ) => {
    if (e.id === 'UPDATE') {
      if (props.conditions) {
        const conditions = getObjectFromBase64(props.conditions)
        console.log('getObjectFromBase64', getObjectFromBase64(props.conditions))
        const findShareCode = extendedShareScopeList.find(i => i.id === props.shareCode)
        const findTargetCode = extendedShareScopeTargetList.find(i => i.id === props.shareTargetCode)
        const param = {
          key: props?.newsSrchId || 0,
          name: props?.title || '',
          categoryList: categorys,
          category: { id: props.category?.toString(), name: props.categoryName },
          scrop: findShareCode ? findShareCode : shareCodeData.news_search,
          target: findTargetCode ? findTargetCode : { id: 'GROUP', name: '이 그룹' },
          keyword: {
            and: conditions.and,
            or: conditions.or,
            not: conditions.not,
          },
          extra: {
            mediaType: conditions.mediaType,
            mediaValue: conditions.mediaValue,
            mediaTagList: conditions.mediaTagList,
            journalistTagList: conditions.journalistTagList,
            tone: conditions.tone,
            tag: conditions.tag,
            url: conditions.url,
            publishingPeriod: conditions.publishingPeriod,
            existMultimedia: conditions?.existMultimedia || [],
            mediaBookList: conditions.mediaBookList,
            clipbook: conditions.clipbook,
            clipbookValue: conditions.clipbookValue,
            coverage: conditions.coverage,
            informationType: conditions.informationType,
          },
        }
        console.log('param', param)
        // @ts-ignore
        dispatch(editMonitoringPopupAction(param))
      }
    } else if (e.id === 'DELETE') {
      dispatch(
        contentDeletePopupAction({
          isOpen: true,
          key: props?.newsSrchId || 0,
          title: `${props.title}(소유자 ${props.owner?.name})`,
        })
      )
    } else if (e.id === 'NOTIFY') {
      const newsAlertList = managementContentList.filter(e => e.isNewsAlert)
      if (newsAlertList && newsAlertList.length >= 20 && !props.isNewsAlert) {
        openToast(
          '더 이상 뉴스 알리미를 설정할 수 없습니다. 뉴스 알리미는 개인당 최대 20개까지 설정할 수 있습니다.',
          'warning'
        )
        return
      }
      dispatch(setCurrentNewsSrchId(props.newsSrchId || 0))
      setTimeout(
        () =>
          dispatch(
            setNewsAlertsPopupAction({
              isOpen: true,
            })
          ),
        50
      )
    } else if (e.id === 'SHARE') {
      dispatch(
        sharedKeyAction({
          key: props?.newsSrchId || 0,
          title: '모니터링 공유 - ' + props?.title || '',
          editor: props?.title || '',
          type: 'MONITORING',
          sharedUrl:
            process.env.MY_ENV_VAR === 'production'
              ? SVC_DOMAIN_URL.PROD
              : SVC_DOMAIN_URL.DEV + `/news/monitoring?monitoring_id=${props.newsSrchId}`,
        })
      )
    }
  }

  const shareCodeChangeAction = async (id: number, shareCodeAs: string, apiDto: managementListParamsProps) => {
    const param = {
      id,
      info: {
        groupId: userSelectGroup,
        shareCode: shareCodeAs,
      },
    }
    const { status, data, message } = await updateMonitoringCustomSearch.mutateAsync(param)
    if (status === 'S') {
      openToast('공유 설정을 수정했습니다', 'success')
      await getMonitoringTypeList(apiDto)
    } else {
      openToast(message?.message, 'error')
    }
  }

  return {
    userSelectGroup,
    licenseInfo,
    userInfo,
    pageCount,
    sortByOwner,
    managementContentList,
    managementContentListButton,
    managementContentLoading,
    managementListParams,
    managementPopup,
    categoryList,
    isLoading,
    ownerLayer,
    ownerGroup,
    ownerPopup,
    contentDeletePopup,
    userPopup,
    categoryTotalList,
    managementListParamsContext,
    timeZone,

    setOtherActions,
    ownerChangeAction,
    getSearchActionByKeyword,
    shareCodeChangeAction,
    selectedDeleteAction,
    ownerFunction,
    onMoveUrlClickCheck,
    handleChangeCategory,
    init,
    handleIsSendToMe,
    handleKeywordsChange,
    handleChangeSize,
    handlePaginationChange,
    handleChangeSort,
    handleChangeShareCode,

    setUserProfilePopupAction,
    setSelectedDeleteContent,
    setOwnerPopupAction,
    setOwnerLayerAction,
    getOwnerLayer,
    openPopup,
    inputValueOnChange,
    setInitManagementPopupAction,
    getMonitoringTypeList,

    setManagementContentListButtonAction,

    managementListParamsContextChange,
  }
}
