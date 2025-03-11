import { ChangeEvent, useCallback, useEffect, useRef } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'

import {
  defaultWorkTypeData,
  extendedCommonCodeTargetList,
  extendedShareScopeList,
  subActivityFilterListList,
  subActivityFilterOptionsList,
} from '~/components/contents/activity/common/defaultData'
import {
  actionLogListAction,
  actionLogListJustOnChangeAction,
  activityListJustOnChangeAction,
  activityListReOnChangeAction,
  activityOwnerLayerAction,
  activityParamKeywordAction,
  activityParamKeywordButtonAction,
  commentPopupAction,
  commmentListAction,
  commmentListJustOnChangeAction,
  commonCodeCategoryAction,
  commonCodeStateAction,
  commonCodeStateFilterAction,
  commonCodeWorkTypeAction,
  contentsCommentTextAction,
  contentsTabListAction,
  createCommentAction,
  dataOnChangeActionProps,
  dataOnChangeActionTypeProps,
  doneTagAction,
  editCommentAction,
  fileDownloadPopupAction,
  filterSubParamActionsProps,
  getActionDataAction,
  getActionDataJustOnChangeAction,
  getActionDataLoadingAction,
  getActionDataProps,
  getActivityOwnerLayerAction,
  initAction,
  initActionDataAction,
  initTagPopupAction,
  isLimitFilterAction,
  isSelectedAllActionIdAction,
  ownerPopupAction,
  ownerPopupProps,
  searchContentKeyListAction,
  searchContentListProps,
  searchContentLoadingAction,
  searchLimitAlarmAction,
  setActivityInitDataAction,
  setFilterSubParamActions,
  setOnChangeFilterSearchOptionAction,
  setOnChangeSearchOptionAction,
  tagPopupAction,
  userPopupAction,
} from '~/stores/modules/contents/activity/activityList'
import { initActivityPopupAction } from '~/stores/modules/contents/activity/activityPopup'
import { contentsActionLogListProps } from '~/stores/modules/contents/activity/searchActivity'
import { initEmailPopupAction } from '~/stores/modules/contents/email/email'
import { pageCountProps } from '~/stores/modules/contents/myPurchase/myPurchase'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import {
  ActionCommentDto,
  ActionDto,
  ActionFilterDto,
  ActionLogDto,
  BaseResponseCommonObject,
  type CodeNameCountDto,
  GroupDto,
  PageActionCommentDto,
  PageActionDtoForList,
  TagDto,
  type UserDto,
  type UserDtoForGroup,
} from '~/types/api/service'
import { NavigationLinkItem, type SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { apiGetActionListByConfition, UseGetActionListParams } from '~/utils/api/action/useGetActionList'
import { apiGetOneAction } from '~/utils/api/action/useGetOneAction'
import { usePostGetActionFilter } from '~/utils/api/action/usePostGetActionFilter'
import { usePutActionUpdate } from '~/utils/api/action/usePutActionUpdate'
import { useDeleteActionComment } from '~/utils/api/actionComment/useDeleteActionComment'
import { apiGetActionCommentList } from '~/utils/api/actionComment/useGetActionCommentList'
import { usePostActionCommentCreate } from '~/utils/api/actionComment/usePostActionCommentCreate'
import { usePutActionComment } from '~/utils/api/actionComment/usePutActionComment'
import { useGetActionEcel } from '~/utils/api/actionExcel/useActionExcel'
import { apiGetActionLogs } from '~/utils/api/actionLog/useGetActionLogs'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import { apiGetActiveGroupInfo } from '~/utils/api/group/useGetGroupSearch'
import { usePutmailingControlUpdate } from '~/utils/api/mailing/useMailingControl'
import { TaggingProps, usePostTaggingAdd } from '~/utils/api/tagging/usePostTaggingAdd'
import { usePostTaggingExcept } from '~/utils/api/tagging/usePostTaggingExcept'
import { usePostTaggingReset } from '~/utils/api/tagging/usePostTaggingReset'
import { apiGetOneUser, useGetOneUserOption } from '~/utils/api/user/useGetOneUser'
import { getObjectFromBase64, setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useActivityList = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const activityOpenRef = useRef<HTMLDivElement>(null)
  const {
    contentsCommentErrorText,
    filterSubParamActions,
    filterSubParam,
    apiParams,
    activityId,
    activityList,
    isLimitFilter,
    searchContentLoading,
    pageCount,
    commonCodeCategory,
    commonCodeWorkType,
    commonCodeState,
    commonCodeStateFilter,
    activityParamKeyword,
    activityParamKeywordButton,
    searchContentKeyList,
    isSelectedAllActionId,
    isTagButton,
    tagPopup,
    userPopup,
    ownerPopup,
    getActionData,
    contentsTabList,
    contentsTab,
    contentsActionLogList,
    contentsCommentText,
    createComment,
    contentsCommentList,
    eidtComment,
    commentPopup,
    activityOwnerGroup,
    activityOwnerLayer,
    fileDownloadPopup,
    searchLimitAlarm,
  } = useAppSelector(state => state.activityListSlice)
  const { isDemoLicense, licenseInfo, userInfo, userSelectGroup, shareCodeData, timeZone, frequentlyUsedCommonCode } =
    useAppSelector(state => state.authSlice)

  const getActionFilters = usePostGetActionFilter()
  const createActionComment = usePostActionCommentCreate()
  const deleteActionComment = useDeleteActionComment()
  const editActionComment = usePutActionComment()
  const editActionById = usePutActionUpdate()
  const editMailingControlById = usePutmailingControlUpdate()
  const actionTaggingAdd = usePostTaggingAdd()
  const actionTaggingReset = usePostTaggingReset()
  const actionTaggingAddExcept = usePostTaggingExcept()
  const actionIdExcel = useGetActionEcel()

  const setSelectedExcelFileData = useCallback(
    async (e: number, i: string, isOpen: boolean) =>
      dispatch(
        fileDownloadPopupAction({
          key: e,
          title: i,
          isOpen,
        })
      ),
    [fileDownloadPopup]
  )

  const getActivityOwnerLayer = useCallback(async () => {
    let list: UserDtoForGroup[] = []
    const { status, data, message } = await apiGetActiveGroupInfo(userSelectGroup)
    if (status === 'S') {
      const res = data as GroupDto
      list = res.users && res.users?.length > 0 ? res.users : ([] as UserDtoForGroup[])
    } else {
      openToast(message?.message, 'error')
    }
    dispatch(getActivityOwnerLayerAction(list))
  }, [activityOwnerLayer])

  const setActivityOwnerLayerAction = useCallback(
    (param: boolean) => dispatch(activityOwnerLayerAction(param)),
    [activityOwnerLayer]
  )

  const setEditCommentAction = useCallback(
    (param: number, content: string) =>
      dispatch(
        editCommentAction({
          param,
          content,
        })
      ),
    [eidtComment]
  )

  const setContentsCommentTextAction = useCallback(
    (e: string, origin: string) => {
      let param = {
        content: e,
        err: '',
      }
      if (e && e.length >= 5000) {
        param = {
          content: origin,
          err: '댓글은 5000자를 넘을 수 없습니다.',
        }
      }
      dispatch(contentsCommentTextAction(param))
    },
    [contentsCommentText]
  )

  const setKeyDownContentsCommentTextAction = useCallback(
    (e: React.RefObject<HTMLTextAreaElement>, i: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const adminText = e.current
      if (adminText !== null) {
        //엔터키를 누를때마다 줄바꿈 되도록 하는 코드
        if (adminText && i.key === 'Enter') {
          adminText.value = `${adminText.value}\n`
        }

        // if (adminText && adminText.scrollHeight > adminText.clientHeight) {
        //   adminText.style.height = `${adminText.scrollHeight}px`
        // } else if (adminText && adminText.scrollHeight <= adminText.clientHeight) {
        //   adminText.style.height = `${adminText.scrollHeight - 21}px`
        // }
        dispatch(contentsCommentTextAction({ content: adminText.value, err: '' }))
      }
    },
    [contentsCommentText]
  )

  const setCommentPopupAction = useCallback(
    (param: { isOpen: boolean; key: number }) => dispatch(commentPopupAction(param)),
    [commentPopup]
  )

  const setCreateCommentAction = useCallback((param: boolean) => dispatch(createCommentAction(param)), [createComment])

  const setInitTagPopupAction = useCallback(() => dispatch(initTagPopupAction()), [tagPopup])

  const setOwnerPopupAction = useCallback((param: ownerPopupProps) => dispatch(ownerPopupAction(param)), [ownerPopup])

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

  const setSearchContentKeyList = useCallback(
    async (e: boolean, actionKey: searchContentListProps, hook: searchContentListProps[]) => {
      let dataList: searchContentListProps[] = [...hook]
      if (e) {
        dataList = [...dataList, actionKey]
      } else {
        dataList = dataList.filter(i => i?.actionId !== actionKey?.actionId)
      }
      const isOption = await calculateButtonOption(dataList)
      dispatch(searchContentKeyListAction({ param: dataList, isTag: isOption }))
    },
    [searchContentKeyList]
  )

  const setAllSearchContentKeyList = useCallback(
    async (isCheck: boolean, origin: searchContentListProps[], newItems: searchContentListProps[]) => {
      let isTagChecked = true
      let newItemsList = [...newItems]
      let dataList: searchContentListProps[] = newItemsList.filter(
        item1 => !origin.some(item2 => item1.actionId === item2.actionId)
      )
      for await (const newItemsListElement of dataList) {
        if (isTagChecked) {
          isTagChecked =
            newItemsListElement.owner?.userId === userInfo.userId ? true : newItemsListElement.shareCode === 'WRITABLE'
        }
      }
      if (isCheck) {
        for await (const dataListElement of origin) {
          if (dataListElement.actionId) {
            if (isTagChecked) {
              isTagChecked =
                dataListElement.owner?.userId === userInfo.userId ? true : dataListElement.shareCode === 'WRITABLE'
            }
            dataList = [...dataList, dataListElement]
          }
        }
      }
      dispatch(searchContentKeyListAction({ param: dataList, isTag: isTagChecked }))
    },
    [searchContentKeyList]
  )

  const tagEdit = useCallback(
    async (origin: searchContentListProps[]) => {
      let resList: any[] = []
      let res: MbTagSearchTagItem[] = []
      if (origin && origin.length > 0) {
        for await (const reOrigin of origin) {
          // @ts-ignore
          if (reOrigin.tagList && reOrigin.tagList.length > 0) {
            // @ts-ignore
            resList = resList.concat(reOrigin.tagList)
          }
        }
        if (resList.length > 0) {
          for await (const tagging of resList) {
            if (tagging.tagId && Number(tagging.tagId) > 0 && tagging.tagName && tagging.tagName !== '') {
              const find = res.find(e => e.id === tagging.tagId?.toString())
              if (!find) {
                res = [
                  ...res,
                  {
                    id: tagging.tagId?.toString(),
                    label: tagging?.tagName,
                  },
                ]
              }
            }
          }
        }
        if (res.length > 0) {
          res = res.sort((a, b) => a.label.localeCompare(b.label))
        }
        dispatch(
          tagPopupAction({
            isOpen: true,
            tagList: res,
          })
        )
      }
    },
    [tagPopup.isOpen, tagPopup.tagList]
  )

  const setOpenfilterSubParamActions = useCallback(
    (e: filterSubParamActionsProps[]) => dispatch(setFilterSubParamActions(e)),
    [filterSubParamActions]
  )
  const setActivityParamKeywordButtonActions = useCallback(
    (e: boolean) => dispatch(activityParamKeywordButtonAction(e)),
    [activityParamKeywordButton]
  )

  const setActivityParamKeywordActionActions = useCallback(
    (e: string) => dispatch(activityParamKeywordAction(e)),
    [activityParamKeyword]
  )
  const getActivityData = async (params: UseGetActionListParams) => {
    let activityData: PageActionDtoForList | null = null
    try {
      const { status, data, message } = await apiGetActionListByConfition(params)
      if (status === 'S') {
        activityData = data as PageActionDtoForList
      }
    } catch (e) {}
    return activityData
  }

  const setQueryParam = async (list: string[]) => {
    let res = ''
    if (list.length > 0) {
      for await (const re of list) {
        const query = re.split('=')
        if (query.length > 0) {
          switch (query[0]) {
            case 'filter':
              res = query[1]
              break
            default:
          }
        }
      }
    }
    return res
  }

  const conditionConvert = async (filter: string) => {
    let res = null
    let isFilter = false
    let tempSearchKeywordOption = ''
    let apiParams: UseGetActionListParams = {
      groupId: userSelectGroup,
      page: 1,
      size: 20,
      sort: ['updateAt!desc'],
      timezone: timeZone,
    }
    let tempFilterSubActions = [
      {
        id: 'category',
        isOpen: true,
        values: [],
      },
      {
        id: 'state',
        isOpen: true,
        subMenu: [],
        values: [],
      },
      {
        id: 'owner',
        isOpen: true,
        values: [],
      },
      {
        id: 'tag',
        isOpen: false,
        values: [],
      },
      {
        id: 'media',
        isOpen: false,
        values: [],
      },
      {
        id: 'date',
        isOpen: false,
        values: [],
      },
    ]
    let conditions = getObjectFromBase64(filter)
    console.log('conditions', conditions)
    if (conditions && conditions !== '') {
      if (conditions.page && conditions.page !== 0) {
        apiParams.page = Number(conditions.page)
      }
      if (conditions.size && conditions.size !== 0) {
        apiParams.size = Number(conditions.size)
      }
      if (conditions.sort && conditions.sort.length > 0) {
        apiParams.sort = conditions.sort
      }
      if (conditions.title && conditions.title !== '') {
        apiParams.title = conditions.title
        tempSearchKeywordOption = conditions.title
        isFilter = true
      }
      if (conditions.categoryList && conditions.categoryList.length > 0) {
        apiParams.categoryList = conditions.categoryList
        isFilter = true
        const find = tempFilterSubActions.findIndex(e => e.id === 'category')
        if (!isNaN(find)) {
          tempFilterSubActions[find].values = conditions.categoryList
        }
      }
      if (conditions.state_filter && conditions.state_filter.length > 0) {
        apiParams.state_filter = conditions.state_filter
        isFilter = true
        const find = tempFilterSubActions.findIndex(e => e.id === 'state')
        if (!isNaN(find)) {
          tempFilterSubActions[find].values = conditions.state_filter
        }
      }
      if (conditions.mediaIdList && conditions.mediaIdList.length > 0) {
        apiParams.mediaIdList = conditions.mediaIdList
        isFilter = true
        const find = tempFilterSubActions.findIndex(e => e.id === 'media')
        if (!isNaN(find)) {
          tempFilterSubActions[find].values = conditions.mediaIdList
        }
      }
      if (conditions.ownerIdList && conditions.ownerIdList.length > 0) {
        apiParams.ownerIdList = conditions.ownerIdList
        isFilter = true
        const find = tempFilterSubActions.findIndex(e => e.id === 'owner')
        if (!isNaN(find)) {
          tempFilterSubActions[find].values = conditions.ownerIdList
        }
      }
      if (conditions.tagIdList && conditions.tagIdList.length > 0) {
        apiParams.tagIdList = conditions.tagIdList
        isFilter = true
        const find = tempFilterSubActions.findIndex(e => e.id === 'tag')
        if (!isNaN(find)) {
          tempFilterSubActions[find].values = conditions.tagIdList
        }
      }
      if (
        conditions.periodEndDay &&
        conditions.periodEndDay !== '' &&
        conditions.periodEndMonth &&
        conditions.periodEndMonth !== '' &&
        conditions.periodEndYear &&
        conditions.periodEndYear !== '' &&
        conditions.periodStartDay &&
        conditions.periodStartDay !== '' &&
        conditions.periodStartMonth &&
        conditions.periodStartMonth !== '' &&
        conditions.periodStartYear &&
        conditions.periodStartYear !== ''
      ) {
        isFilter = true
        apiParams.periodEndDay = conditions.periodEndDay
        apiParams.periodEndMonth = conditions.periodEndMonth
        apiParams.periodEndYear = conditions.periodEndYear
        apiParams.periodStartDay = conditions.periodStartDay
        apiParams.periodStartMonth = conditions.periodStartMonth
        apiParams.periodStartYear = conditions.periodStartYear
      }
      res = {
        apiParams,
        tempFilterSubActions,
        activityId: conditions?.activityId || 0,
        tempSearchKeywordOption,
        isFilter,
      }
    }
    return res
  }

  const getCommonCode = async (parentCode: string) => {
    let res: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode })
    if (status === 'S') {
      res = data as CommonCode[]
    } else {
      openToast(message?.message, 'error')
    }
    return res
  }
  const setContentsTabListAction = (type: string, paramKey: number) => {
    if (type === 'log') {
      getActionLogList(paramKey)
    } else if (type === 'content') {
      dispatch(contentsTabListAction('content'))
    } else {
      getActionCommentList(paramKey)
    }
  }

  const setAddExtraCustomDateFilterSearch = async (
    apiParam: UseGetActionListParams,
    item: filterSubParamActionsProps[],
    startDate: string,
    endDate: string
  ) => {
    let filterDto = {
      ...apiParam,
      page: 1,
      periodStartYear: '',
      periodStartMonth: '',
      periodStartDay: '',
      periodEndYear: '',
      periodEndMonth: '',
      periodEndDay: '',
    }
    let tempFilterSubParam = [...item]

    for await (const filterSubParamActionsProp of tempFilterSubParam) {
      if (filterSubParamActionsProp.id === 'category') {
        filterDto.categoryList = filterSubParamActionsProp.values
      } else if (filterSubParamActionsProp.id === 'state') {
        filterDto.state_filter = filterSubParamActionsProp.values
      } else if (filterSubParamActionsProp.id === 'owner') {
        filterDto.ownerIdList = filterSubParamActionsProp.values
      } else if (filterSubParamActionsProp.id === 'tag') {
        filterDto.tagIdList = filterSubParamActionsProp.values
      } else if (filterSubParamActionsProp.id === 'media') {
        filterDto.mediaIdList = filterSubParamActionsProp.values
      } else if (filterSubParamActionsProp.id === 'date' && startDate !== null && endDate !== null) {
        filterDto.periodStartYear = moment(startDate).format('YYYY')
        filterDto.periodStartMonth = moment(startDate).format('MM')
        filterDto.periodStartDay = moment(startDate).format('DD')
        filterDto.periodEndYear = moment(endDate).format('YYYY')
        filterDto.periodEndMonth = moment(endDate).format('MM')
        filterDto.periodEndDay = moment(endDate).format('DD')
      }
    }
    await filterApiAction(filterDto, tempFilterSubParam)
  }
  const getActionCommentList = async (paramKey: number) => {
    const { status, data, message } = await apiGetActionCommentList({
      actionId: paramKey,
      groupId: userSelectGroup,
      page: 1,
      size: 1000,
    })
    if (status === 'S') {
      const res = data as PageActionCommentDto
      dispatch(commmentListAction(res.content as ActionCommentDto[]))
    }
  }

  const getActionLogList = async (paramKey: number) => {
    let logList: contentsActionLogListProps[] = []
    const { status, data, message } = await apiGetActionLogs({
      actionId: paramKey,
      groupId: userSelectGroup,
      page: 1,
      size: 1000,
    })
    if (status === 'S') {
      const res = data as PageActionCommentDto
      const content = res.content as ActionLogDto[]
      if (content.length > 0 && commonCodeWorkType.length > 0) {
        for await (const actionLogDto of content) {
          const temp = {
            ...actionLogDto,
            workTypeNm: '',
            workFieldNm: '',
          }
          const findState = commonCodeWorkType.find(e => e.code === actionLogDto.workType)
          if (findState) {
            temp.workTypeNm = findState.name
          }
          if (actionLogDto.field && actionLogDto.field !== '') {
            const findField = defaultWorkTypeData.find(e => e.id === actionLogDto.field)
            if (findField) {
              temp.workFieldNm = findField.title
            }
          }
          logList = [...logList, temp]
        }
      }
      dispatch(actionLogListAction(logList))
    }
  }

  const getActionOriginData = async (paramKey: number) => {
    let preloadCommonCode: CommonCode[] = []
    let commonCategory: CommonCode[] = []
    let commonStateFilter: CommonCode[] = []
    let commonState: CommonCode[] = []
    dispatch(getActionDataLoadingAction(true))
    for (const re of extendedCommonCodeTargetList) {
      const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === re.id)
      if (find) {
        //@ts-ignore
        preloadCommonCode = find.commonCodeList
      } else {
        preloadCommonCode = await getCommonCode(re.id)
      }
      if (re.id === 'ACTION_CATEGORY_ALL') {
        commonCategory = preloadCommonCode
      } else if (re.id === 'ACTION_STATE') {
        commonState = preloadCommonCode
      } else if (re.id === 'ACTION_STATE_FILTER') {
        commonStateFilter = preloadCommonCode
      }
    }
    const { status, data, message } = await apiGetOneAction({ id: paramKey, groupId: userSelectGroup })
    if (status === 'S') {
      const res = data as ActionDto
      const temp = {
        ...res,
        categoryName: '',
        stateName: '',
        shareCodeNm: '',
        commentCount: 0,
      }
      const findShareScopeList = extendedShareScopeList.find(e => e.id === res.shareCode)
      if (findShareScopeList) {
        temp.shareCodeNm = findShareScopeList.name
      }
      const findCategory = commonCategory.find(e => e.code === res.category)
      if (findCategory) {
        temp.categoryName = findCategory.name
      }
      //@ts-ignore
      if (res.commentCount) {
        //@ts-ignore
        temp.commentCount = res.commentCount
      }
      //@ts-ignore
      if (res.mailingForAction) {
        //@ts-ignore
        temp.mailingForAction = res.mailingForAction
      }
      if (res.category !== 'MAILING' && res.category !== 'PRESS_RELEASE' && res.category !== 'NEWSWIRE_RELEASE') {
        const findStateFilter = commonStateFilter.find(e => e.code === res.stateFilter)
        if (findStateFilter) {
          temp.stateName = findStateFilter.name
        }
        await getActionCommentList(paramKey)
      } else {
        const findState = commonState.find(e => e.code === res.state)
        if (findState) {
          temp.stateName = findState.name
        }
      }
      console.log('getActionOriginData', temp)
      dispatch(getActionDataAction(temp))
    }
    dispatch(getActionDataLoadingAction(false))
  }

  const init = async () => {
    let commonCategory: CommonCode[] = []
    let commonState: CommonCode[] = []
    let commonStateFilter: CommonCode[] = []
    let preloadCommonCode: CommonCode[] = []
    let searchContentList: searchContentListProps[] = []
    let activityId = 0
    let tempSearchKeywordOption = ''
    let filterSub = subActivityFilterListList
    let filterSubActions = subActivityFilterOptionsList
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 1,
    }
    let apiParams: UseGetActionListParams = {
      groupId: userSelectGroup,
      page: 1,
      size: 20,
      sort: ['updateAt!desc'],
      timezone: timeZone,
    }

    dispatch(initAction())
    try {
      if (window.location.search && window.location.search.substring(1).split('?').length > 0) {
        const subParams = window.location.search.substring(1).split('?')
        const querys = await setQueryParam(subParams)
        if (querys && querys !== '') {
          const dto = await conditionConvert(querys)
          console.log('dto', dto)
          if (dto) {
            apiParams = dto.apiParams
            activityId = Number(dto.activityId)
            filterSubActions = dto.tempFilterSubActions
            tempSearchKeywordOption = dto.tempSearchKeywordOption
          }
        }
      }
      for (const re of extendedCommonCodeTargetList) {
        const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === re.id)
        if (find) {
          //@ts-ignore
          preloadCommonCode = find.commonCodeList
        } else {
          preloadCommonCode = await getCommonCode(re.id)
        }
        if (re.id === 'ACTION_CATEGORY_ALL') {
          commonCategory = preloadCommonCode
          dispatch(commonCodeCategoryAction(commonCategory))
        } else if (re.id === 'ACTION_STATE') {
          commonState = preloadCommonCode
          dispatch(commonCodeStateAction(commonState))
        } else if (re.id === 'ACTION_STATE_FILTER') {
          commonStateFilter = preloadCommonCode
          dispatch(commonCodeStateFilterAction(commonStateFilter))
        } else if (re.id === 'ACTION_LOG_WORKTYPE') {
          dispatch(commonCodeWorkTypeAction(preloadCommonCode))
        }
      }
      const res = await getActivityData(apiParams)
      if (res) {
        if (res.content && res.content.length > 0) {
          for await (const paramElement of res.content) {
            const temp = {
              ...paramElement,
              categoryName: '',
              stateName: '',
            }

            const findCategory = commonCategory.find(e => e.code === paramElement.category)
            if (findCategory) {
              temp.categoryName = findCategory.name
            }
            if (paramElement.category !== 'MAILING' && paramElement.category !== 'PRESS_RELEASE') {
              const findStateFilter = commonStateFilter.find(e => e.code === paramElement.state_filter)
              if (findStateFilter) {
                temp.stateName = findStateFilter.name
              }
            } else {
              const findState = commonState.find(e => e.code === paramElement.state)
              if (findState) {
                temp.stateName = findState.name
              }
            }
            searchContentList = [...searchContentList, temp]
          }
          if (searchContentList.length > 0) {
            const find = searchContentList.find(k => k.actionId === activityId)
            if (find) {
              activityId = find?.actionId ? find?.actionId : 0
            } else {
              activityId = searchContentList[0]?.actionId ? searchContentList[0]?.actionId : 0
            }
          } else {
            activityId = 0
          }
          tempPageCount = {
            totalCount: res.totalElements ?? 0,
            totalPageCount: res.totalPages ?? 0,
          }
        }
      }
      filterSub = await getFilter()
      if (activityId > 0) {
        await getActionOriginData(activityId)
      } else {
        dispatch(initActionDataAction())
      }
      dispatch(
        setActivityInitDataAction({
          apiParams: apiParams,
          activityId: activityId,
          activityList: searchContentList,
          pageCount: tempPageCount,
          filterSubParam: filterSub,
          filterSubActions: filterSubActions,
          tempSearchKeywordOption,
        })
      )
    } catch (e) {}
  }

  const getFilter = async () => {
    let res: NavigationLinkItem[] = []
    const { status, data, message } = await getActionFilters.mutateAsync({
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      const filterData = data as ActionFilterDto
      res = await activityFilterList(filterData)
    } else {
      openToast(message?.message, 'error')
    }

    return res
  }

  const activityFilterList = async (filterData: ActionFilterDto) => {
    let params: NavigationLinkItem[] = [
      {
        id: 'category',
        title: '유형',
        subMenus: [],
      },
      {
        id: 'state',
        title: '상태',
        subMenus: [],
      },
      {
        id: 'owner',
        title: '소유자',
        subMenus: [],
      },
      {
        id: 'campagn',
        title: '캠페인',
        subMenus: [],
      },
      {
        id: 'tag',
        title: '태그',
        subMenus: [],
      },
      {
        id: 'media',
        title: '매체명',
        subMenus: [],
      },
      {
        id: 'date',
        title: '기간',
        subMenus: [],
      },
    ]
    if (filterData.codeNameCountListCategory && filterData.codeNameCountListCategory.length > 0) {
      const find = params.find(e => e.id === 'category')
      if (find) {
        find.subMenus = await filterAdjust(filterData.codeNameCountListCategory)
      }
    }
    if (filterData.codeNameCountListState && filterData.codeNameCountListState.length > 0) {
      const find = params.find(e => e.id === 'state')
      if (find) {
        find.subMenus = await filterAdjust(filterData.codeNameCountListState)
      }
    }
    if (filterData.codeNameCountListOwner && filterData.codeNameCountListOwner.length > 0) {
      const find = params.find(e => e.id === 'owner')
      if (find) {
        const userFilterList = await filterAdjust(filterData.codeNameCountListOwner)
        const findUserIndex = userFilterList.findIndex(k => k.id.toString() === userInfo?.userId?.toString())
        const [item] = userFilterList.splice(findUserIndex, 1)
        userFilterList.unshift(item)
        find.subMenus = userFilterList
      }
    }
    if (filterData.codeNameCountListTag && filterData.codeNameCountListTag.length > 0) {
      const find = params.find(e => e.id === 'tag')
      if (find) {
        find.subMenus = await filterAdjust(filterData.codeNameCountListTag)
      }
    }
    if (filterData.codeNameCountListMedia && filterData.codeNameCountListMedia.length > 0) {
      const find = params.find(e => e.id === 'media')
      if (find) {
        find.subMenus = await filterAdjust(filterData.codeNameCountListMedia)
      }
    }

    return params
  }

  const filterAdjust = async (list: CodeNameCountDto[]) => {
    let res: NavigationLinkItem[] = []
    for await (const paramElement of list) {
      const temp: any = {
        id: paramElement.code,
        title: paramElement.name,
        subMenus:
          paramElement.count && paramElement.count > 0 ? Array.from({ length: paramElement.count }, (v, i) => i) : [],
      }
      res = [...res, temp]
    }
    return res
  }

  const setInitFilterSubParamActions = async (apiParam: UseGetActionListParams) => {
    const param = {
      ...apiParam,
      categoryList: [],
      state_filter: [],
      ownerIdList: [],
      tagIdList: [],
      journalistIdList: [],
      mediaIdList: [],
      periodStartYear: '',
      periodStartMonth: '',
      periodStartDay: '',
      periodEndYear: '',
      periodEndMonth: '',
      periodEndDay: '',
      projectIdList: [],
      page: 1,
    }
    dispatch(isLimitFilterAction(0))
    await filterApiAction(param, subActivityFilterOptionsList)
  }

  const filterApiAction = async (
    filterDto: UseGetActionListParams,
    tempFilterSubParam: filterSubParamActionsProps[]
  ) => {
    let searchContentList: searchContentListProps[] = []
    dispatch(searchContentLoadingAction(true))
    try {
      const res = await getActivityData(filterDto)
      if (res) {
        if (res.content && res.content.length > 0) {
          for await (const paramElement of res.content) {
            const temp = {
              ...paramElement,
              categoryName: '',
              stateName: '',
            }
            const findCategory = commonCodeCategory.find(e => e.code === paramElement.category)
            if (findCategory) {
              temp.categoryName = findCategory.name
            }
            if (paramElement.category !== 'MAILING' && paramElement.category !== 'PRESS_RELEASE') {
              const findStateFilter = commonCodeStateFilter.find(e => e.code === paramElement.state_filter)
              if (findStateFilter) {
                temp.stateName = findStateFilter.name
              }
            } else {
              const findState = commonCodeState.find(e => e.code === paramElement.state)
              if (findState) {
                temp.stateName = findState.name
              }
            }
            searchContentList = [...searchContentList, temp]
          }
        }
        const filter = setObjectToBase64({
          ...filterDto,
          activityId:
            searchContentList.length > 0 ? (searchContentList[0].actionId ? searchContentList[0].actionId : 0) : 0,
        })
        if (searchContentList.length > 0 && searchContentList[0].actionId) {
          await getActionOriginData(searchContentList[0].actionId)
        } else {
          dispatch(initActionDataAction())
        }
        dispatch(
          setOnChangeFilterSearchOptionAction({
            apiParams: filterDto,
            activityList: searchContentList,
            filterSubActions: tempFilterSubParam,
            pageCount: {
              totalCount: res.totalElements ?? 0,
              totalPageCount: res.totalPages ?? 0,
            },
          })
        )
        await router.replace(`/activity/search?filter=${filter}`, undefined, { shallow: true })
      }
    } catch (e) {}
    dispatch(searchContentLoadingAction(false))
  }

  const setActivityIdParamsAction = async (
    actionKey: number,
    filterDto: UseGetActionListParams,
    tempCommonCodeCategory: CommonCode[],
    tempCommonCodeStateFilter: CommonCode[],
    tempCommonCodeState: CommonCode[]
  ) => {
    if (actionKey !== activityId) {
      console.log('actionKey', actionKey)
      const filter = setObjectToBase64({
        ...filterDto,
        activityId: actionKey,
      })
      await router.replace(`/activity/search?filter=${filter}`, undefined, { shallow: true })
      if (actionKey > 0) {
        await getActionOriginData(actionKey)
      } else {
        dispatch(initActionDataAction())
      }
    }
  }

  const setTagFilterSearch = async (
    e: string,
    item: filterSubParamActionsProps[],
    apiParam: UseGetActionListParams
  ) => {
    let tempFilterSubParam = [...item]
    console.log('1', tempFilterSubParam)
    const find = tempFilterSubParam.findIndex(e => e.id === 'tag')
    if (!isNaN(find)) {
      console.log('3', tempFilterSubParam[find].values)
      tempFilterSubParam[find] = {
        ...tempFilterSubParam[find],
        values: [e],
      }
      console.log('4', tempFilterSubParam)
      const filterDto = {
        ...apiParam,
        page: 1,
        tagIdList: [e],
      }
      console.log('filterDto', filterDto)
      await filterApiAction(filterDto, tempFilterSubParam)
    }
  }

  const setAddExtraFilterSearch = async (
    e: ChangeEvent<HTMLInputElement>,
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: UseGetActionListParams
  ) => {
    let filterCount = 0
    let filterDto = {
      ...apiParam,
      page: 1,
      periodStartYear: '',
      periodStartMonth: '',
      periodStartDay: '',
      periodEndYear: '',
      periodEndMonth: '',
      periodEndDay: '',
    }
    let tempFilterSubParam = [...item]
    tempFilterSubParam[keyValue] = {
      ...tempFilterSubParam[keyValue],
      values: e.target.checked
        ? [...tempFilterSubParam[keyValue].values, key.id]
        : tempFilterSubParam[keyValue].values.filter(e => e !== key.id),
    }

    for await (const filterSubParamActionsProp of tempFilterSubParam) {
      if (filterSubParamActionsProp.id === 'category') {
        filterDto.categoryList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'state') {
        filterDto.state_filter = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'owner') {
        filterDto.ownerIdList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'tag') {
        filterDto.tagIdList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'media') {
        filterDto.mediaIdList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (
        filterSubParamActionsProp.id === 'date' &&
        apiParam.periodStartYear &&
        apiParam.periodStartMonth &&
        apiParam.periodStartDay &&
        apiParam.periodEndYear &&
        apiParam.periodEndMonth &&
        apiParam.periodEndDay
      ) {
        filterDto.periodStartYear = apiParam.periodStartYear
        filterDto.periodStartMonth = apiParam.periodStartMonth
        filterDto.periodStartDay = apiParam.periodStartDay
        filterDto.periodEndYear = apiParam.periodEndYear
        filterDto.periodEndMonth = apiParam.periodEndMonth
        filterDto.periodEndDay = apiParam.periodEndDay
      }
    }
    if (filterCount > 30) {
      openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    } else {
      dispatch(isLimitFilterAction(filterCount))
      await filterApiAction(filterDto, tempFilterSubParam)
    }
  }

  const setAddAllExtraFilterSearch = async (
    key: NavigationLinkItem[],
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: UseGetActionListParams
  ) => {
    let filterCount = 0
    let filterDto = {
      ...apiParam,
      page: 1,
      periodStartYear: '',
      periodStartMonth: '',
      periodStartDay: '',
      periodEndYear: '',
      periodEndMonth: '',
      periodEndDay: '',
    }
    let tempFilterSubParam = [...item]
    let getIdParams = key.map(e => e.id)
    let difference = tempFilterSubParam[keyValue].values.filter(item => !getIdParams.includes(item))
    tempFilterSubParam[keyValue] = {
      ...tempFilterSubParam[keyValue],
      values: difference.concat(getIdParams),
    }

    for await (const filterSubParamActionsProp of tempFilterSubParam) {
      if (filterSubParamActionsProp.id === 'category') {
        filterDto.categoryList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'state') {
        filterDto.state_filter = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'owner') {
        filterDto.ownerIdList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'tag') {
        filterDto.tagIdList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'media') {
        filterDto.mediaIdList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (
        filterSubParamActionsProp.id === 'date' &&
        apiParam.periodStartYear &&
        apiParam.periodStartMonth &&
        apiParam.periodStartDay &&
        apiParam.periodEndYear &&
        apiParam.periodEndMonth &&
        apiParam.periodEndDay
      ) {
        filterDto.periodStartYear = apiParam.periodStartYear
        filterDto.periodStartMonth = apiParam.periodStartMonth
        filterDto.periodStartDay = apiParam.periodStartDay
        filterDto.periodEndYear = apiParam.periodEndYear
        filterDto.periodEndMonth = apiParam.periodEndMonth
        filterDto.periodEndDay = apiParam.periodEndDay
      }
    }
    if (filterCount > 30) {
      openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    } else {
      dispatch(isLimitFilterAction(filterCount))
      await filterApiAction(filterDto, tempFilterSubParam)
    }
  }

  const setExtractExtraFilterSearch = async (
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: UseGetActionListParams
  ) => {
    let filterCount = 0
    let filterDto = {
      ...apiParam,
      page: 1,
      periodStartYear: '',
      periodStartMonth: '',
      periodStartDay: '',
      periodEndYear: '',
      periodEndMonth: '',
      periodEndDay: '',
    }
    let tempFilterSubParam = [...item]
    tempFilterSubParam[keyValue] = {
      ...tempFilterSubParam[keyValue],
      values: [],
    }
    for await (const filterSubParamActionsProp of tempFilterSubParam) {
      if (filterSubParamActionsProp.id === 'category') {
        filterDto.categoryList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'state') {
        filterDto.state_filter = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'owner') {
        filterDto.ownerIdList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'tag') {
        filterDto.tagIdList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'media') {
        filterDto.mediaIdList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (
        filterSubParamActionsProp.id === 'date' &&
        apiParam.periodStartYear &&
        apiParam.periodStartMonth &&
        apiParam.periodStartDay &&
        apiParam.periodEndYear &&
        apiParam.periodEndMonth &&
        apiParam.periodEndDay
      ) {
        filterDto.periodStartYear = apiParam.periodStartYear
        filterDto.periodStartMonth = apiParam.periodStartMonth
        filterDto.periodStartDay = apiParam.periodStartDay
        filterDto.periodEndYear = apiParam.periodEndYear
        filterDto.periodEndMonth = apiParam.periodEndMonth
        filterDto.periodEndDay = apiParam.periodEndDay
      }
    }
    if (filterCount > 30) {
      openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    } else {
      dispatch(isLimitFilterAction(filterCount))
      await filterApiAction(filterDto, tempFilterSubParam)
    }
  }

  const setExtractExtraDateFilterSearch = async (
    item: filterSubParamActionsProps[],
    apiParam: UseGetActionListParams
  ) => {
    let filterCount = 0
    let filterDto = {
      ...apiParam,
      page: 1,
      periodStartYear: '',
      periodStartMonth: '',
      periodStartDay: '',
      periodEndYear: '',
      periodEndMonth: '',
      periodEndDay: '',
    }
    let tempFilterSubParam = [...item]
    for await (const filterSubParamActionsProp of tempFilterSubParam) {
      if (filterSubParamActionsProp.id === 'category') {
        filterDto.categoryList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'state') {
        filterDto.state_filter = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'owner') {
        filterDto.ownerIdList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'tag') {
        filterDto.tagIdList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'media') {
        filterDto.mediaIdList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      }
    }
    if (filterCount > 30) {
      openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    } else {
      dispatch(isLimitFilterAction(filterCount))
      await filterApiAction(filterDto, tempFilterSubParam)
    }
  }

  const handlePressChangeSize = async (e: number, params: UseGetActionListParams) => {
    const apiParam = {
      ...params,
      page: 1,
      size: e,
    }
    await getActivityBySearchOption(apiParam, 'size')
  }

  const handlePressPaginationChange = async (e: number, params: UseGetActionListParams) => {
    if (Number(e) * Number(params.size) >= 20000) {
      dispatch(searchLimitAlarmAction(true))
    } else {
      await getActivityBySearchOption(
        {
          ...params,
          page: e,
          size: params.size,
        },
        'page'
      )
    }
  }

  const getSearchActionByKeyword = async (e: string, filterDto: UseGetActionListParams) => {
    const apiParam = {
      ...filterDto,
      title: e,
      page: 1,
    }
    await getActivityBySearchOption(apiParam, 'title')
  }

  const commentDelete = async (
    idKey: number,
    actionId: number,
    origin: getActionDataProps | null,
    originList: searchContentListProps[]
  ) => {
    let contentsCommentList: ActionCommentDto[] = []
    const { status, data, message } = await deleteActionComment.mutateAsync(idKey)
    if (status === 'S') {
      contentsCommentList = await newActionCommentList(actionId)
      console.log('contentsCommentList', contentsCommentList)
      await dataOnChangeAction(
        { contentsCommentList: 'change', commentCount: 'change' },
        { contentsCommentList: contentsCommentList, commentCount: contentsCommentList.length },
        origin
      )
      await dataListOnChangeAction(
        originList,
        actionId,
        { commentCount: 'change' },
        { commentCount: contentsCommentList.length }
      )
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const commentEdit = async (idKey: number, comment: string, actionId: number) => {
    let contentsCommentList: ActionCommentDto[] = []
    const { status, data, message } = await editActionComment.mutateAsync({
      id: idKey,
      info: { comment },
    })
    if (status === 'S') {
      contentsCommentList = await newActionCommentList(actionId)
      await dataOnChangeAction(
        { contentsCommentList: 'change' },
        { contentsCommentList: contentsCommentList, commentCount: contentsCommentList.length }
      )
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const haveComment = async (
    actionId: number,
    comment: string,
    origin: getActionDataProps | null,
    originList: searchContentListProps[]
  ) => {
    let contentsCommentList: ActionCommentDto[] = []
    const { status, data, message } = await createActionComment.mutateAsync({
      actionId,
      comment,
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      contentsCommentList = await newActionCommentList(actionId)
      await dataOnChangeAction(
        { contentsCommentList: 'change', commentCount: 'change' },
        { contentsCommentList: contentsCommentList, commentCount: contentsCommentList.length },
        origin
      )
      await dataListOnChangeAction(
        originList,
        actionId,
        { commentCount: 'change' },
        { commentCount: contentsCommentList.length }
      )
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const getActivityBySearchOption = async (filterDto: UseGetActionListParams, type: string) => {
    let tempFilterSub: NavigationLinkItem[] = []
    let searchContentList: searchContentListProps[] = []
    dispatch(searchContentLoadingAction(true))
    const res = await getActivityData(filterDto)
    if (res) {
      if (res.content && res.content.length > 0) {
        for await (const paramElement of res.content) {
          const temp = {
            ...paramElement,
            categoryName: '',
            stateName: '',
          }
          const findCategory = commonCodeCategory.find(e => e.code === paramElement.category)
          if (findCategory) {
            temp.categoryName = findCategory.name
          }
          if (paramElement.category !== 'MAILING' && paramElement.category !== 'PRESS_RELEASE') {
            const findStateFilter = commonCodeStateFilter.find(e => e.code === paramElement.state_filter)
            if (findStateFilter) {
              temp.stateName = findStateFilter.name
            }
          } else {
            const findState = commonCodeState.find(e => e.code === paramElement.state)
            if (findState) {
              temp.stateName = findState.name
            }
          }
          searchContentList = [...searchContentList, temp]
        }
        if (type === 'dto') {
          tempFilterSub = await getFilter()
        }
      }
      const filter = setObjectToBase64({
        ...filterDto,
        activityId:
          searchContentList.length > 0 ? (searchContentList[0].actionId ? searchContentList[0].actionId : 0) : 0,
      })
      if (searchContentList.length > 0 && searchContentList[0].actionId) {
        await getActionOriginData(searchContentList[0].actionId)
      } else {
        dispatch(initActionDataAction())
      }
      dispatch(
        setOnChangeSearchOptionAction({
          apiParams: filterDto,
          activityList: searchContentList,
          filterSubParam: tempFilterSub,
          pageCount: {
            totalCount: res.totalElements ?? 0,
            totalPageCount: res.totalPages ?? 0,
          },
          isResetSelectedNews: type === 'size' ? true : type === 'dto',
        })
      )
      await router.replace(`/activity/search?filter=${filter}`, undefined, { shallow: true })
    }
    dispatch(searchContentLoadingAction(false))
  }

  const activityAction = async (e: NavigationLinkItem) => {
    if (e.id === 'email') {
      dispatch(initEmailPopupAction({ key: 1, name: userInfo.name ?? '-', scrop: shareCodeData.distribute }))
    } else if (e.id === 'press-release' && e.pathLink) {
      await router.push(e.pathLink)
    } else if (e.id === 'newswire' && e.pathLink) {
      await router.push(e.pathLink)
    } else {
      let typeValue = { id: '', name: '' }
      let typeList: SelectListOptionItem[] = []
      for await (const eElement of commonCodeCategory) {
        if (eElement.code !== 'NEWSWIRE_RELEASE' && eElement.code !== 'PRESS_RELEASE' && eElement.code !== 'MAILING') {
          if (e.title === eElement.name) {
            typeValue = {
              id: eElement.code,
              name: eElement.name,
            }
          }
          typeList = [
            ...typeList,
            {
              id: eElement.code,
              name: eElement.name,
            },
          ]
        }
      }
      const stateList = commonCodeStateFilter.map(e => {
        return { id: e.code, name: e.name }
      })
      dispatch(
        initActivityPopupAction({
          keyValue: 0,
          isOpen: true,
          loading: false,
          type: typeList,
          state: stateList,
          typeValue,
          scrop: shareCodeData.action,
        })
      )
    }
  }

  const ownerChangeAction = async (
    idKey: ownerPopupProps,
    actionId: number,
    origin: getActionDataProps | null,
    originList: searchContentListProps[],
    dto: UseGetActionListParams,
    pageCount: pageCountProps
  ) => {
    let contentsActionLogList: contentsActionLogListProps[] = []
    let tempOwner = {
      userId: idKey.key,
      name: idKey.userData ? idKey.userData.name : '',
      nickname: idKey.userData ? idKey.userData.nickname : '',
      displayName: idKey.userData ? idKey.userData.displayName : '',
      stateCode: idKey.userData ? idKey.userData.stateCode : '',
    }
    let res = {
      message: '',
      status: '',
    }
    if (origin) {
      if (
        origin?.category !== 'MAILING' &&
        origin?.category !== 'PRESS_RELEASE' &&
        origin?.category !== 'NEWSWIRE_RELEASE'
      ) {
        const { status, data, message } = await editActionById.mutateAsync({
          id: idKey.activityId,
          request: { groupId: userSelectGroup, ownerId: idKey.key },
        })
        res = {
          message: message?.message || '',
          status: status as string,
        }
      } else {
        const { status, data, message } = await editMailingControlById.mutateAsync({
          id: idKey.activityId,
          modify_share_code_owner_dto: {
            groupId: userSelectGroup,
            ownerId: idKey.key,
          },
        })
        res = {
          message: message?.message || '',
          status: status as string,
        }
      }
    }
    if (res.status === 'S') {
      dispatch(ownerPopupAction({ isOpen: false, key: 0, name: '', activityId: 0 }))
      contentsActionLogList = await newActionLogList(actionId)
      await dataOnChangeAction(
        { contentsActionLogList: 'change', owner: 'change' },
        { contentsActionLogList: contentsActionLogList, owner: tempOwner },
        origin
      )
      await dataListReOnChangeAction(dto, originList, actionId, pageCount)
      openToast(res.message, 'success')
    } else {
      openToast(res.message, 'error')
    }
  }

  const dataListReOnChangeAction = async (
    dto: UseGetActionListParams,
    origin: searchContentListProps[],
    keyId: number,
    pageCount: pageCountProps
  ) => {
    let commonCategory: CommonCode[] = []
    let commonState: CommonCode[] = []
    let commonStateFilter: CommonCode[] = []
    let preloadCommonCode: CommonCode[] = []
    let activityId = keyId
    let searchContentList: searchContentListProps[] = origin
    let tempPageCount = pageCount
    //dispatch(searchContentLoadingAction(true))
    try {
      for (const re of extendedCommonCodeTargetList) {
        const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === re.id)
        if (find) {
          //@ts-ignore
          preloadCommonCode = find.commonCodeList
        } else {
          preloadCommonCode = await getCommonCode(re.id)
        }
        if (re.id === 'ACTION_CATEGORY_ALL') {
          commonCategory = preloadCommonCode
        } else if (re.id === 'ACTION_STATE') {
          commonState = preloadCommonCode
        } else if (re.id === 'ACTION_STATE_FILTER') {
          commonStateFilter = preloadCommonCode
        }
      }
      const res = await getActivityData(dto)
      if (res) {
        if (res.content && res.content.length > 0) {
          searchContentList = []
          for await (const paramElement of res.content) {
            const temp = {
              ...paramElement,
              categoryName: '',
              stateName: '',
            }

            const findCategory = commonCategory.find(e => e.code === paramElement.category)
            if (findCategory) {
              temp.categoryName = findCategory.name
            }
            if (paramElement.category !== 'MAILING' && paramElement.category !== 'PRESS_RELEASE') {
              const findStateFilter = commonStateFilter.find(e => e.code === paramElement.state_filter)
              if (findStateFilter) {
                temp.stateName = findStateFilter.name
              }
            } else {
              const findState = commonState.find(e => e.code === paramElement.state)
              if (findState) {
                temp.stateName = findState.name
              }
            }
            searchContentList = [...searchContentList, temp]
          }
          if (searchContentList.length > 0) {
            const find = searchContentList.find(k => k.actionId === activityId)
            if (find) {
              activityId = find?.actionId ? find?.actionId : 0
            } else {
              activityId = searchContentList[0]?.actionId ? searchContentList[0]?.actionId : 0
            }
          } else {
            activityId = 0
          }
          tempPageCount = {
            totalCount: res.totalElements ?? 0,
            totalPageCount: res.totalPages ?? 0,
          }
        }
      }
      if (activityId !== keyId) {
        await getActionOriginData(activityId)
      }
    } catch (e) {}
    dispatch(
      activityListReOnChangeAction({
        activityId: activityId,
        activityList: searchContentList,
        pageCount: tempPageCount,
      })
    )
    //dispatch(searchContentLoadingAction(false))
  }

  const dataListOnChangeAction = async (
    origin: searchContentListProps[],
    keyId: number,
    type: dataOnChangeActionTypeProps,
    props: dataOnChangeActionProps
  ) => {
    let tempActivityList: searchContentListProps[] = [...origin]
    const findIndex = tempActivityList.findIndex(e => Number(e.actionId) === keyId)
    if (findIndex !== -1) {
      tempActivityList[findIndex] = {
        ...tempActivityList[findIndex],
        ...(type.commentCount === 'change' && props.commentCount !== undefined
          ? { commentCount: props.commentCount }
          : {}),
        ...(type.owner === 'change' && props.owner ? { owner: props.owner } : {}),
      }
    }
    dispatch(activityListJustOnChangeAction(tempActivityList))
  }

  const dataOnChangeAction = async (
    type: dataOnChangeActionTypeProps,
    props: dataOnChangeActionProps,
    origin?: getActionDataProps | null
  ) => {
    let actionData: getActionDataProps | null = origin ? { ...origin } : null
    if (actionData) {
      if (type.commentCount === 'change') {
        actionData.commentCount = props.commentCount ? props.commentCount : 0
        dispatch(getActionDataJustOnChangeAction(actionData))
      }
      if (type.owner === 'change' && props.owner) {
        actionData.owner = props.owner
        dispatch(getActionDataJustOnChangeAction(actionData))
      }
    }
    if (type.contentsCommentList === 'change' && props.contentsCommentList) {
      dispatch(commmentListJustOnChangeAction(props.contentsCommentList))
    }
    if (type.contentsActionLogList === 'change' && props.contentsActionLogList) {
      dispatch(actionLogListJustOnChangeAction(props.contentsActionLogList))
    }
  }

  const newActionCommentList = async (paramKey: number) => {
    let res: ActionCommentDto[] = []
    const { status, data, message } = await apiGetActionCommentList({
      actionId: paramKey,
      groupId: userSelectGroup,
      page: 1,
      size: 1000,
    })
    if (status === 'S') {
      const apiData = data as PageActionCommentDto
      res = apiData.content as ActionCommentDto[]
    }
    console.log('newActionCommentList', res)
    return res
  }

  const newActionLogList = async (paramKey: number) => {
    let logList: contentsActionLogListProps[] = []
    const { status, data, message } = await apiGetActionLogs({
      actionId: paramKey,
      groupId: userSelectGroup,
      page: 1,
      size: 1000,
    })
    if (status === 'S') {
      const res = data as PageActionCommentDto
      const content = res.content as ActionLogDto[]
      if (content.length > 0 && commonCodeWorkType.length > 0) {
        for await (const actionLogDto of content) {
          const temp = {
            ...actionLogDto,
            workTypeNm: '',
            workFieldNm: '',
          }
          const findState = commonCodeWorkType.find(e => e.code === actionLogDto.workType)
          if (findState) {
            temp.workTypeNm = findState.name
          }
          if (actionLogDto.field && actionLogDto.field !== '') {
            const findField = defaultWorkTypeData.find(e => e.id === actionLogDto.field)
            if (findField) {
              temp.workFieldNm = findField.title
            }
          }
          logList = [...logList, temp]
        }
      }
    }

    return logList
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

  const ownerFunction = async (param: UserDtoForGroup) => {
    dispatch(
      userInformationPopupAction({
        isOpen: true,
        idKey: Number(param.userId),
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

  const editTaggingAction = async (
    props: MbTagSearchTagItem[],
    targetIdList: searchContentListProps[],
    type: string,
    dto: UseGetActionListParams,
    origin: searchContentListProps[],
    keyId: number,
    pageCount: pageCountProps
  ) => {
    let res = undefined
    let param: TaggingProps = {
      category: 'ACTION',
      tagIdList: [],
      targetList: [],
    }
    if (props.length > 0) {
      for (const tagIdListElement of props) {
        param.tagIdList = [...param.tagIdList, Number(tagIdListElement.id)]
      }
    }
    if (targetIdList.length > 0) {
      for (const targetIdElement of targetIdList) {
        param.targetList = [
          ...param.targetList,
          {
            targetId: Number(targetIdElement.actionId),
            newsIndexName: '',
          },
        ]
      }
    }
    if (param.tagIdList.length > 0 && param.targetList.length > 0) {
      if (type === 'add') {
        res = await actionTaggingAddFunction(param, dto, origin, keyId, pageCount)
      } else if (type === 'delete') {
        res = await actionTaggingExceptFunction(param, dto, origin, keyId, pageCount)
      } else {
        res = await actionTaggingResetFunction(param, dto, origin, keyId, pageCount)
      }
    }
    if (res === 'S') {
      dispatch(doneTagAction())
    }
  }

  const actionTaggingAddFunction = async (
    param: TaggingProps,
    dto: UseGetActionListParams,
    originList: searchContentListProps[],
    keyId: number,
    pageCount: pageCountProps
  ) => {
    const { status, data, message } = await actionTaggingAdd.mutateAsync(param)
    if (status === 'S') {
      await getActionOriginData(keyId)
      await dataListReOnChangeAction(dto, originList, keyId, pageCount)
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
    return status
  }

  const actionTaggingExceptFunction = async (
    param: TaggingProps,
    dto: UseGetActionListParams,
    origin: searchContentListProps[],
    keyId: number,
    pageCount: pageCountProps
  ) => {
    let params = {
      category: param.category,
      tagIdList: param.tagIdList,
      targetIdList: param.targetList.map(e => {
        return Number(e.targetId)
      }),
    }
    // @ts-ignore
    const { status, data, message } = await actionTaggingAddExcept.mutateAsync(params)
    if (status === 'S') {
      await getActionOriginData(keyId)
      await dataListReOnChangeAction(dto, origin, keyId, pageCount)
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
    return status
  }

  const actionTaggingResetFunction = async (
    param: TaggingProps,
    dto: UseGetActionListParams,
    origin: searchContentListProps[],
    keyId: number,
    pageCount: pageCountProps
  ) => {
    const { status, data, message } = await actionTaggingReset.mutateAsync(param)
    if (status === 'S') {
      await getActionOriginData(keyId)
      await dataListReOnChangeAction(dto, origin, keyId, pageCount)
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
    return status
  }

  const calculateButtonOption = async (props: searchContentListProps[]) => {
    let isTag = true
    if (props.length > 0) {
      for await (const mbTagSearchTagItem of props) {
        let tempIsTag =
          mbTagSearchTagItem.owner?.userId === userInfo.userId ? true : mbTagSearchTagItem.shareCode === 'WRITABLE'
        if (isTag) {
          isTag = tempIsTag
        }
      }
    }

    return isTag
  }

  const handleChangeSort = async (e: string[], filterDto: UseGetActionListParams) => {
    const apiParam = {
      ...filterDto,
      sort: e,
      page: 1,
    }
    await getActivityBySearchOption(apiParam, 'sort')
  }

  const handleActivityChangeSort = async (e: SelectListOptionItem, i: SelectListOptionItem, sortValue: string) => {
    let sort = [`${e.id}!${i.id}`]
    if (sortValue !== 'order') {
      if (e.id === 'updateAt') {
        sort = ['updateAt!desc']
      } else if (e.id === 'regisAt') {
        sort = ['regisAt!desc']
      } else if (e.id === 'title') {
        sort = ['title!asc']
      }
    }
    const apiParam = {
      ...apiParams,
      sort: sort,
      page: 1,
    }
    await getActivityBySearchOption(apiParam, 'sort')
  }

  const exportToExcel = async (keyValueList: searchContentListProps[]) => {
    const param = {
      groupId: userSelectGroup,
      actionIdList: keyValueList.map(e => {
        return Number(e.actionId)
      }),
    }
    const res = await actionIdExcel.mutateAsync(param)
    if (res) {
      const excel = res as Blob
      const blob = new Blob([excel], { type: 'ms-vnd/excel' })

      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = downloadUrl
      // @ts-ignore
      link.download = '활동 목록 내보내기(downloaded_file).xlsx'
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(downloadUrl)
      document.body.removeChild(link)
    } else {
      openToast('내보내기에 실패하였습니다', 'error')
    }
  }

  return {
    userSelectGroup,
    licenseInfo,
    userInfo,
    activityOpenRef,
    filterSubParamActions,
    filterSubParam,
    apiParams,
    activityId,
    activityList,
    isLimitFilter,
    pageCount,
    searchContentLoading,
    commonCodeCategory,
    commonCodeWorkType,
    commonCodeState,
    commonCodeStateFilter,
    activityParamKeyword,
    activityParamKeywordButton,
    searchContentKeyList,
    isSelectedAllActionId,
    isTagButton,
    tagPopup,
    userPopup,
    ownerPopup,
    getActionData,
    contentsTabList,
    contentsTab,
    contentsActionLogList,
    contentsCommentText,
    createComment,
    contentsCommentList,
    eidtComment,
    commentPopup,
    fileDownloadPopup,
    activityOwnerGroup,
    activityOwnerLayer,
    contentsCommentErrorText,
    timeZone,
    searchLimitAlarm,

    init,
    setInitFilterSubParamActions,
    setExtractExtraFilterSearch,
    setAddAllExtraFilterSearch,
    setAddExtraFilterSearch,
    handlePressChangeSize,
    handlePressPaginationChange,
    getSearchActionByKeyword,
    activityAction,
    exportToExcel,
    handleChangeSort,
    handleActivityChangeSort,
    editTaggingAction,
    ownerFunction,
    ownerChangeAction,
    haveComment,
    commentEdit,
    commentDelete,
    setTagFilterSearch,
    setActivityIdParamsAction,
    setContentsTabListAction,
    setAddExtraCustomDateFilterSearch,
    setExtractExtraDateFilterSearch,

    setSearchContentKeyList,
    setAllSearchContentKeyList,
    tagEdit,
    setOpenfilterSubParamActions,
    setActivityParamKeywordActionActions,
    setActivityParamKeywordButtonActions,
    setInitTagPopupAction,
    setUserProfilePopupAction,
    setOwnerPopupAction,
    setSelectedExcelFileData,
    setCreateCommentAction,
    setContentsCommentTextAction,
    setKeyDownContentsCommentTextAction,
    setCommentPopupAction,
    setEditCommentAction,
    setActivityOwnerLayerAction,
    getActivityOwnerLayer,
  }
}
