import { ChangeEvent, useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/router'

import {
  extendedCommonCodeTargetList,
  extendedShareScopeList,
  subActivityFilterListList,
  subActivityFilterOptionsList,
} from '~/components/contents/activity/common/defaultData'
import { initActivityPopupAction } from '~/stores/modules/contents/activity/activityPopup'
import {
  ActionListParams,
  actionListParamsProps,
  contentsActionLogListProps,
  FilterKey,
  filterSearchDataProps,
  filterSubParamActionsProps,
  initListProps,
  ownerPopupProps,
  searchContentListProps,
  tagPopupProps,
} from '~/stores/modules/contents/activity/searchActivity'
import {
  actionListParamsAction,
  actionLogListAction,
  activityOpenAction,
  activityOwnerLayerAction,
  commentPopupAction,
  commmentListAction,
  commonCodeCategoryAction,
  commonCodeStateAction,
  commonCodeStateFilterAction,
  commonCodeWorkTypeAction,
  contentsCommentTextAction,
  contentsTabListAction,
  createCommentAction,
  doneTagAction,
  editCommentAction,
  filterSearchDataAction,
  getActionDataAction,
  getActionDataKeyAction,
  getActivityOwnerLayerAction,
  initAction,
  initActionDataAction,
  initListAction,
  initTagPopupAction,
  isLimitFilterAction,
  isSelectedAllActionIdAction,
  ownerPopupAction,
  reloadAction,
  searchContentKeyListAction,
  searchContentListAction,
  searchContentListButtonAction,
  searchContentLoadingAction,
  searchNaviLinksAction,
  setActivityInitDataAction,
  setFilterSubParamActions,
  tagPopupAction,
  userPopupAction,
} from '~/stores/modules/contents/activity/searchActivity'
import { initEmailPopupAction } from '~/stores/modules/contents/email/email'
import { pageCountProps } from '~/stores/modules/contents/myPurchase/myPurchase'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import {
  ActionCommentDto,
  ActionDto,
  ActionFilterDto,
  ActionLogDto,
  AttachedDto,
  BaseResponseCommonObject,
  type CodeNameCountDto,
  GroupDto,
  PageActionCommentDto,
  PageActionDtoForList,
  TagDto,
  TaggingTargetDto,
  type UserDto,
  type UserDtoForGroup,
} from '~/types/api/service'
import { NavigationLinkItem, type SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem, TagSearchCreateLayerItem } from '~/types/contents/Common'
import { apiGetActionListByConfition, UseGetActionListParams } from '~/utils/api/action/useGetActionList'
import { useGetOneAction } from '~/utils/api/action/useGetOneAction'
import { usePostGetActionFilter } from '~/utils/api/action/usePostGetActionFilter'
import { usePutActionUpdate } from '~/utils/api/action/usePutActionUpdate'
import { useDeleteActionComment } from '~/utils/api/actionComment/useDeleteActionComment'
import { useGetActionCommentList } from '~/utils/api/actionComment/useGetActionCommentList'
import { usePostActionCommentCreate } from '~/utils/api/actionComment/usePostActionCommentCreate'
import { usePutActionComment } from '~/utils/api/actionComment/usePutActionComment'
import { useGetActionEcel } from '~/utils/api/actionExcel/useActionExcel'
import { useGetActionLogs } from '~/utils/api/actionLog/useGetActionLogs'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import { apiGetActiveGroupInfo } from '~/utils/api/group/useGetGroupSearch'
import { TaggingProps, usePostTaggingAdd } from '~/utils/api/tagging/usePostTaggingAdd'
import { usePostTaggingExcept } from '~/utils/api/tagging/usePostTaggingExcept'
import { usePostTaggingReset } from '~/utils/api/tagging/usePostTaggingReset'
import { useGetOneUserOption } from '~/utils/api/user/useGetOneUser'
import { getObjectFromBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

type actionListProps = {
  filtered: ActionListParams
  common?: actionProps
}

type actionProps = {
  commonCodeCategory: CommonCode[]
  commonCodeState: CommonCode[]
  commonCodeStateFilter: CommonCode[]
}

export const useSearchActivity = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const activityOpenRef = useRef<HTMLDivElement>(null)
  const {
    searchContentListButton,
    searchContentList,
    activityOpen,
    pageCount,
    actionListParams,
    searchNaviLinks,
    filterSearchData,
    searchContentKeyList,
    commonCodeCategory,
    commonCodeState,
    commonCodeStateFilter,
    noticeNewActivity,
    isInit,
    searchContentLoading,
    contentsTabList,
    contentsTab,
    contentsCommentList,
    createComment,
    getActionDataKey,
    getActionData,
    loadingGetActionData,
    commmentCount,
    contentsCommentText,
    userPopup,
    commentPopup,
    eidtComment,
    contentsActionLogList,
    commonCodeWorkType,
    activityOwnerLayer,
    activityOwnerGroup,
    ownerPopup,
    isSelectedAllActionId,
    tagPopup,
    isTagButton,
    isLimitFilter,

    filterSubParamActions,
    filterSubParam,
    apiParams,
    activityId,
    activityList,
  } = useAppSelector(state => state.searchActivitySlice)
  const { isDemoLicense, licenseInfo, userInfo, userSelectGroup, shareCodeData } = useAppSelector(
    state => state.authSlice
  )

  const getActionFilters = usePostGetActionFilter()
  const createActionComment = usePostActionCommentCreate()
  const deleteActionComment = useDeleteActionComment()
  const editActionComment = usePutActionComment()
  const editActionById = usePutActionUpdate()
  const actionTaggingAdd = usePostTaggingAdd()
  const actionTaggingReset = usePostTaggingReset()
  const actionTaggingAddExcept = usePostTaggingExcept()
  const actionIdExcel = useGetActionEcel()

  const { data: apiGetOneUser } = useGetOneUserOption(userPopup.keyValue > 0 ? userPopup.keyValue : 0)
  const {
    status: getActionDataLoading,
    data: getActionOriginData,
    refetch: refetchActionOriginData,
  } = useGetOneAction(
    {
      id: activityId,
      groupId: userSelectGroup,
    },
    {
      enabled: activityId > 0 && router.pathname === '/activity/search',
    }
  )
  const { data: getActionCommentList, refetch: refetchActionCommentList } = useGetActionCommentList(
    {
      actionId: getActionDataKey,
      groupId: userSelectGroup,
      page: 1,
      size: 1000,
    },
    {
      enabled:
        contentsTab === 'comment' &&
        getActionDataKey > 0 &&
        contentsTabList &&
        contentsTabList.length > 0 &&
        router.pathname === '/activity/search',
    }
  )
  const { data: getActionLogList, refetch: refetchActionLogList } = useGetActionLogs(
    {
      actionId: getActionDataKey,
      groupId: userSelectGroup,
      page: 1,
      size: 1000,
    },
    {
      enabled:
        contentsTab === 'log' &&
        getActionDataKey > 0 &&
        contentsTabList &&
        contentsTabList.length > 0 &&
        router.pathname === '/activity/search',
    }
  )

  const initSearchActivityAction = useCallback(() => dispatch(initAction()), [])
  const setTagPopupAction = useCallback((e: tagPopupProps) => dispatch(tagPopupAction(e)), [tagPopup])
  const setInitTagPopupAction = useCallback(() => dispatch(initTagPopupAction()), [tagPopup])

  const tagEdit = useCallback(
    async (e: MbTagSearchTagItem[]) => {
      let list: number[] = []
      if (e.length > 0) {
        for await (const i of e) {
          list = [...list, Number(i)]
        }
      }
      dispatch(
        tagPopupAction({
          isOpen: true,
          type: 'list',
          title: '태그 수정',
          selectedKey: 'add',
          tagList: [],
          targetIdList: list,
        })
      )
    },
    [tagPopup.isOpen]
  )

  const setTagPopupStyleAction = useCallback(
    (e: string, hooks: tagPopupProps) => {
      const param = {
        ...hooks,
        type: e,
        title: e === 'total' ? '전체 태그' : '태그 수정',
      }
      dispatch(tagPopupAction(param))
    },
    [tagPopup.type]
  )

  const setTagPopupSelectedKeyAction = useCallback(
    (e: string, hooks: tagPopupProps) => {
      const param = {
        ...hooks,
        tagList: [],
        selectedKey: e,
      }
      dispatch(tagPopupAction(param))
    },
    [tagPopup.selectedKey]
  )

  const setTagPopupCreateTagAction = useCallback(
    (item: TagDto, hooks: tagPopupProps) => {
      let newTags = _.cloneDeep(hooks.tagList)
      const isExist = newTags.find(tag => tag.id === item.tagId?.toString())
      if (!isExist) {
        newTags.push({
          id: item.tagId?.toString() ?? '',
          label: item.name ?? '',
        })
      }
      dispatch(
        tagPopupAction({
          ...hooks,
          tagList: newTags,
        })
      )
    },
    [tagPopup.tagList]
  )

  const setTagPopupTagStatusAction = useCallback(
    (e: ChangeEvent<HTMLInputElement>, item: TagSearchCreateLayerItem, hooks: tagPopupProps) => {
      const isChecked = e.target.checked
      let newTags = _.cloneDeep(hooks.tagList)
      if (isChecked) {
        const isExist = newTags.find(tag => tag.id === item.id)
        if (!isExist) {
          newTags.push({
            id: item.id,
            label: item.name,
          })
        }
      } else {
        newTags = newTags.filter(tag => tag.id !== item.id)
      }
      dispatch(
        tagPopupAction({
          ...hooks,
          tagList: newTags,
        })
      )
    },
    [tagPopup.tagList]
  )

  const setTagPopupTagCloseAction = useCallback(
    (item: MbTagSearchTagItem, hooks: tagPopupProps) =>
      dispatch(
        tagPopupAction({
          ...hooks,
          tagList: _.cloneDeep(hooks.tagList).filter(tag => tag.id !== item.id),
        })
      ),
    [tagPopup.tagList]
  )

  const setOpenfilterSubParamActions = useCallback(
    (e: filterSubParamActionsProps[]) => dispatch(setFilterSubParamActions(e)),
    [filterSubParamActions]
  )

  const setTagPopupResetTagAction = useCallback(
    (hooks: tagPopupProps) =>
      dispatch(
        tagPopupAction({
          ...hooks,
          tagList: [],
        })
      ),
    [tagPopup.tagList]
  )

  const setContentsCommentTextAction = useCallback(
    (e: string) => dispatch(contentsCommentTextAction(e)),
    [contentsCommentText]
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
  const setCommentPopupAction = useCallback(
    (param: { isOpen: boolean; key: number }) => dispatch(commentPopupAction(param)),
    [commentPopup]
  )
  const setOwnerPopupAction = useCallback((param: ownerPopupProps) => dispatch(ownerPopupAction(param)), [ownerPopup])

  const setSearchContentListButtonAction = useCallback(
    (param: boolean) => dispatch(searchContentListButtonAction(param)),
    [searchContentListButton]
  )
  const setActivityOpenActionAction = useCallback(
    (param: boolean) => dispatch(activityOpenAction(param)),
    [activityOpen]
  )
  const setFilterSearchOpenAction = useCallback(
    (param: filterSearchDataProps) => dispatch(filterSearchDataAction(param)),
    [filterSearchData]
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
  const setCreateCommentAction = useCallback((param: boolean) => dispatch(createCommentAction(param)), [createComment])
  const setContentsTabListAction = useCallback((param: string) => dispatch(contentsTabListAction(param)), [contentsTab])
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
  const setActionDataKeyAction = useCallback(
    (param: string, count: number, category: string) => {
      const actionProps: actionListProps = {
        filtered: {
          ...actionListParams,
          categoryList: filterSearchData.category.data,
          state_filter: filterSearchData.state.data,
          ownerIdList: filterSearchData.owner.data,
          tagIdList: filterSearchData.tag.data,
          journalistIdList: [],
          mediaIdList: filterSearchData.media.data,
          projectIdList: [],
          periodStart: filterSearchData.date.fromDate,
          periodEnd: filterSearchData.date.endDate,
          mediaOpen: filterSearchData.media.isOpen,
          categoryOpen: filterSearchData.category.isOpen,
          tagOpen: filterSearchData.tag.isOpen,
          stateOpen: filterSearchData.state.isOpen,
          ownerOpen: filterSearchData.owner.isOpen,
          isCheckedReset: false,
        },
      }
      dispatch(getActionDataKeyAction({ key: Number(param), count, category }))
      router.push('/activity/search', {
        // @ts-ignore
        query: {
          activity_id: Number(param),
          ...actionProps.filtered,
        },
      })
    },
    [getActionDataKey]
  )

  const handleKeywordsChange = useCallback(
    async (e: string, hook: actionListParamsProps) => {
      dispatch(
        actionListParamsAction({
          ...hook,
          title: e,
        })
      )
    },
    [actionListParams.title]
  )

  const setSearchContentKeyList = useCallback(
    async (e: ChangeEvent<HTMLInputElement>, actionKey: searchContentListProps, hook: MbTagSearchTagItem[]) => {
      //@ts-ignore
      let tempIsTag = actionKey.owner.id === userInfo.userId ? true : actionKey.shareCode === 'WRITABLE'
      let dataList: MbTagSearchTagItem[] = [...hook]
      if (e.target.checked) {
        dataList = [
          ...dataList,
          {
            id: actionKey.actionId?.toString() || '',
            label: actionKey.title?.toString() || '',
            subData: actionKey.commentCount,
            className: tempIsTag ? 'isTag' : '',
          },
        ]
      } else {
        dataList = dataList.filter(i => i.id !== actionKey.actionId?.toString())
      }
      const isOption = await calculateButtonOption(dataList)
      // console.log('isOption', isOption)
      dispatch(searchContentKeyListAction({ param: dataList, isTag: isOption.isTag }))
    },
    [searchContentKeyList]
  )

  const setAllSearchContentKeyList = useCallback(
    async (e: ChangeEvent<HTMLInputElement>, hook: searchContentListProps[]) => {
      let dataList: MbTagSearchTagItem[] = []
      let isTag = true
      if (hook.length > 0) {
        if (e.target.checked) {
          for await (const dataListElement of hook) {
            if (dataListElement.actionId) {
              let tempIsTag =
                //@ts-ignore
                dataListElement.owner.id === userInfo.userId ? true : dataListElement.shareCode === 'WRITABLE'
              if (isTag) {
                //@ts-ignore
                if (!dataListElement.owner.id === userInfo.userId) {
                  //@ts-ignore
                  if (dataListElement.shareCode !== 'WRITABLE') {
                    isTag = false
                  }
                }
              }
              dataList = [
                ...dataList,
                {
                  id: dataListElement.actionId?.toString() || '',
                  label: dataListElement.title?.toString() || '',
                  subData: dataListElement.commentCount,
                  className: tempIsTag ? 'isTag' : '',
                },
              ]
            }
          }
        } else {
          for await (const dataListElement of hook) {
            const find = dataList.findIndex(e => e.id === dataListElement.actionId?.toString())
            if (find > -1) {
              if (isTag) {
                //@ts-ignore
                if (!dataListElement.isOwner) {
                  //@ts-ignore
                  if (dataListElement.shareCode !== 'WRITABLE') {
                    isTag = false
                  }
                }
              }
              dataList.splice(find, 1)
            }
          }
        }
      }
      dispatch(searchContentKeyListAction({ param: dataList, isTag }))
    },
    [searchContentKeyList]
  )

  const setAllSearchContentKeyListData = useCallback(
    async (e: boolean, hook: actionListParamsProps, filter: filterSearchDataProps, page: pageCountProps) => {
      if (e) {
        dispatch(isSelectedAllActionIdAction(true))
        const param = {
          title: hook.title,
          shareCode: '',
          groupId: userSelectGroup,
          categoryList: filter.category.data,
          state_filter: filter.state.data,
          ownerIdList: filter.owner.data,
          tagIdList: filter.tag.data,
          journalistIdList: [],
          mediaIdList: filter.media.data,
          periodStartYear: filter.date.fromDate !== null ? moment(filter.date.fromDate).format('YYYY') : '',
          periodStartMonth: filter.date.fromDate !== null ? moment(filter.date.fromDate).format('MM') : '',
          periodStartDay: filter.date.fromDate !== null ? moment(filter.date.fromDate).format('DD') : '',
          periodEndYear: filter.date.endDate !== null ? moment(filter.date.endDate).format('YYYY') : '',
          periodEndMonth: filter.date.endDate !== null ? moment(filter.date.endDate).format('MM') : '',
          periodEndDay: filter.date.endDate !== null ? moment(filter.date.endDate).format('DD') : '',
          projectIdList: [],
          page: 1,
          size: hook.size * page.totalPageCount + 1,
          sort: hook.sort,
        }
        const { status, data, message } = await apiGetActionListByConfition(param)
        if (status === 'S') {
          const res = data as PageActionDtoForList
          if (res.content && res.content.length > 0) {
            let dataList: MbTagSearchTagItem[] = []
            let isTag = true
            for await (const paramElement of res.content) {
              if (paramElement.actionId) {
                let tempIsTag =
                  //@ts-ignore
                  paramElement.owner.id === userInfo.userId ? true : paramElement.shareCode === 'WRITABLE'
                if (isTag) {
                  //@ts-ignore
                  if (userInfo.userId !== paramElement.owner?.userId) {
                    //@ts-ignore
                    if (paramElement.shareCode !== 'WRITABLE') {
                      isTag = false
                    }
                  }
                }
                dataList = [
                  ...dataList,
                  {
                    id: paramElement.actionId?.toString() || '',
                    label: paramElement.title?.toString() || '',
                    subData: paramElement.commentCount,
                    className: tempIsTag ? 'isTag' : '',
                  },
                ]
              }
            }
            dispatch(searchContentKeyListAction({ param: dataList, isTag }))
          } else {
            dispatch(isSelectedAllActionIdAction(false))
          }
        } else {
          dispatch(isSelectedAllActionIdAction(false))
        }
      } else {
        dispatch(searchContentKeyListAction({ param: [], isTag: false }))
      }
    },
    [searchContentKeyList]
  )

  const handleChangeSort = useCallback(
    async (e: string[], hook: actionListParamsProps, filterHook: filterSearchDataProps) => {
      const actionProps: actionListProps = {
        filtered: {
          ...hook,
          sort: e,
          page: 1,
          categoryList: filterHook.category.data,
          state_filter: filterHook.state.data,
          ownerIdList: filterHook.owner.data,
          tagIdList: filterHook.tag.data,
          journalistIdList: [],
          mediaIdList: filterHook.media.data,
          projectIdList: [],
          periodStart: filterHook.date.fromDate,
          periodEnd: filterHook.date.endDate,
          mediaOpen: filterHook.media.isOpen,
          categoryOpen: filterHook.category.isOpen,
          tagOpen: filterHook.tag.isOpen,
          stateOpen: filterHook.state.isOpen,
          ownerOpen: filterHook.owner.isOpen,
          isCheckedReset: false,
        },
      }
      await router.push('/activity/search', {
        // @ts-ignore
        query: {
          activity_id: Number(getActionDataKey),
          ...actionProps.filtered,
        },
      })
      await getActionList(actionProps, '')
    },
    [actionListParams.sort]
  )

  const handlePaginationChange = useCallback(
    async (e: number, hook: actionListParamsProps, filterHook: filterSearchDataProps) => {
      const actionProps: actionListProps = {
        filtered: {
          ...hook,
          page: e,
          size: hook.size,
          categoryList: filterHook.category.data,
          state_filter: filterHook.state.data,
          ownerIdList: filterHook.owner.data,
          tagIdList: filterHook.tag.data,
          journalistIdList: [],
          mediaIdList: filterHook.media.data,
          projectIdList: [],
          periodStart: filterHook.date.fromDate,
          periodEnd: filterHook.date.endDate,
          mediaOpen: filterHook.media.isOpen,
          categoryOpen: filterHook.category.isOpen,
          tagOpen: filterHook.tag.isOpen,
          stateOpen: filterHook.state.isOpen,
          ownerOpen: filterHook.owner.isOpen,
          isCheckedReset: false,
        },
      }
      await router.push('/activity/search', {
        // @ts-ignore
        query: {
          activity_id: Number(getActionDataKey),
          ...actionProps.filtered,
        },
      })
      await getActionList(actionProps, '')
    },
    [actionListParams.page, actionListParams.size]
  )

  const handleChangeSize = useCallback(
    async (e: number, hook: actionListParamsProps, filterHook: filterSearchDataProps) => {
      const actionProps: actionListProps = {
        filtered: {
          ...hook,
          page: 1,
          size: e,
          categoryList: filterHook.category.data,
          state_filter: filterHook.state.data,
          ownerIdList: filterHook.owner.data,
          tagIdList: filterHook.tag.data,
          journalistIdList: [],
          mediaIdList: filterHook.media.data,
          projectIdList: [],
          periodStart: filterHook.date.fromDate,
          periodEnd: filterHook.date.endDate,
          mediaOpen: filterHook.media.isOpen,
          categoryOpen: filterHook.category.isOpen,
          tagOpen: filterHook.tag.isOpen,
          stateOpen: filterHook.state.isOpen,
          ownerOpen: filterHook.owner.isOpen,
          isCheckedReset: false,
        },
      }
      dispatch(searchContentKeyListAction({ param: [], isTag: false }))
      await router.push('/activity/search', {
        // @ts-ignore
        query: {
          activity_id: Number(getActionDataKey),
          ...actionProps.filtered,
        },
      })
      await getActionList(actionProps, '')
    },
    [actionListParams.size, actionListParams.page]
  )

  const resetFilter = useCallback(async () => {
    const res = {
      page: actionListParams.page,
      size: actionListParams.size,
      sort: actionListParams.sort,
      groupId: userSelectGroup,
      isCheckedReset: true,
    }
    await router.push('/activity/search')
    await getActionList({ filtered: res }, '')
  }, [filterSearchData])

  const setFilterSearchDateAction = useCallback(
    async (date: Date, key: string, param: filterSearchDataProps, hook: actionListParamsProps) => {
      const params = {
        ...param,
        date: {
          isOpen: true,
          fromDate: key === 'fromDate' ? date : param.date.fromDate,
          endDate: key === 'endDate' ? date : param.date.endDate,
        },
      }
      if (params.date.endDate !== null && params.date.fromDate !== null) {
        const actionProps: actionListProps = {
          filtered: {
            ...hook,
            categoryList: param.category.data,
            state_filter: param.state.data,
            ownerIdList: param.owner.data,
            tagIdList: param.tag.data,
            journalistIdList: [],
            mediaIdList: param.media.data,
            projectIdList: [],
            periodStart: params.date.fromDate,
            periodEnd: params.date.endDate,
            periodOpen: true,
            mediaOpen: param.media.isOpen,
            categoryOpen: param.category.isOpen,
            tagOpen: param.tag.isOpen,
            stateOpen: param.state.isOpen,
            ownerOpen: param.owner.isOpen,
            isCheckedReset: true,
          },
        }
        // console.log('...actionProps.filtered', {
        //   ...actionProps.filtered,
        //   periodStart: actionProps.filtered.periodStart?.toString(),
        //   periodEnd: actionProps.filtered.periodEnd?.toString(),
        // })
        await router.push('/activity/search', {
          // @ts-ignore
          query: {
            activity_id: Number(getActionDataKey),
            ...actionProps.filtered,
            periodStart: moment(actionProps.filtered.periodStart).format('YYYY-MM-DD'),
            periodEnd: moment(actionProps.filtered.periodEnd).format('YYYY-MM-DD'),
          },
        })
        await getActionList(actionProps, '')
      } else {
        dispatch(filterSearchDataAction(params))
      }
    },
    [filterSearchData.date.fromDate, filterSearchData.date.endDate]
  )

  const setFilterSearchDeleteDateAction = useCallback(
    async (param: filterSearchDataProps, hook: actionListParamsProps) => {
      const actionProps: actionListProps = {
        filtered: {
          ...hook,
          categoryList: param.category.data,
          state_filter: param.state.data,
          ownerIdList: param.owner.data,
          tagIdList: param.tag.data,
          journalistIdList: [],
          mediaIdList: param.media.data,
          projectIdList: [],
          periodStart: null,
          periodEnd: null,
          periodOpen: false,
          mediaOpen: param.media.isOpen,
          categoryOpen: param.category.isOpen,
          tagOpen: param.tag.isOpen,
          stateOpen: param.state.isOpen,
          ownerOpen: param.owner.isOpen,
          isCheckedReset: true,
        },
      }
      await router.push('/activity/search', {
        // @ts-ignore
        query: {
          activity_id: Number(getActionDataKey),
          ...actionProps.filtered,
        },
      })
      await getActionList(actionProps, '')
    },
    [filterSearchData.date]
  )

  const setFilterSearchDataAction = useCallback(
    async (
      e: ChangeEvent<HTMLInputElement>,
      param: filterSearchDataProps,
      key: FilterKey,
      id: string,
      hook: actionListParamsProps
    ) => {
      let dataList = param[key].data
      dataList = e.target.checked ? [...dataList, id] : dataList.filter(i => i !== id)
      const actionProps: actionListProps = {
        filtered: {
          ...hook,
          categoryList: key === 'category' ? dataList : param.category.data,
          state_filter: key === 'state' ? dataList : param.state.data,
          ownerIdList: key === 'owner' ? dataList : param.owner.data,
          tagIdList: key === 'tag' ? dataList : param.tag.data,
          journalistIdList: [],
          mediaIdList: key === 'media' ? dataList : param.media.data,
          projectIdList: [],
          periodStart: param.date.fromDate,
          periodEnd: param.date.endDate,
          periodOpen: param.date.isOpen,
          mediaOpen: key === 'media' ? true : param.media.isOpen,
          categoryOpen: key === 'category' ? true : param.category.isOpen,
          tagOpen: key === 'tag' ? true : param.tag.isOpen,
          stateOpen: key === 'state' ? true : param.state.isOpen,
          ownerOpen: key === 'owner' ? true : param.owner.isOpen,
          isCheckedReset: true,
        },
      }
      // console.log('actionProps', actionProps.filtered)
      // console.log('actionProps', actionProps.filtered.categoryList?.length)
      // console.log('actionProps', actionProps.filtered.state_filter?.length)
      // console.log('actionProps', actionProps.filtered.ownerIdList?.length)
      // console.log('actionProps', actionProps.filtered.tagIdList?.length)
      // console.log('actionProps', actionProps.filtered.mediaIdList?.length)

      await checkMaxLimitFilter(actionProps)
      await router.push('/activity/search', {
        // @ts-ignore
        query: {
          activity_id: Number(getActionDataKey),
          ...actionProps.filtered,
        },
      })
      await getActionList(actionProps, '')
    },
    [
      filterSearchData.state,
      filterSearchData.tag,
      filterSearchData.category,
      filterSearchData.media,
      filterSearchData.owner,
    ]
  )

  const setFilterSearchDeleteDataAction = useCallback(
    async (param: filterSearchDataProps, key: FilterKey, hook: actionListParamsProps) => {
      const actionProps: actionListProps = {
        filtered: {
          ...hook,
          categoryList: key === 'category' ? [] : param.category.data,
          state_filter: key === 'state' ? [] : param.state.data,
          ownerIdList: key === 'owner' ? [] : param.owner.data,
          tagIdList: key === 'tag' ? [] : param.tag.data,
          journalistIdList: [],
          mediaIdList: key === 'media' ? [] : param.media.data,
          projectIdList: [],
          periodStart: param.date.fromDate,
          periodEnd: param.date.endDate,
          periodOpen: param.date.isOpen,
          mediaOpen: key === 'media' ? false : param.media.isOpen,
          categoryOpen: key === 'category' ? false : param.category.isOpen,
          tagOpen: key === 'tag' ? false : param.tag.isOpen,
          stateOpen: key === 'state' ? false : param.state.isOpen,
          ownerOpen: key === 'owner' ? false : param.owner.isOpen,
          isCheckedReset: true,
        },
      }
      await router.push('/activity/search', {
        // @ts-ignore
        query: {
          activity_id: Number(getActionDataKey),
          ...actionProps.filtered,
        },
      })
      getActionList(actionProps, '')
    },
    [
      filterSearchData.state,
      filterSearchData.tag,
      filterSearchData.category,
      filterSearchData.media,
      filterSearchData.owner,
    ]
  )

  const checkMaxLimitFilter = async (idKey: actionListProps) => {
    let temp = false
    let temp_categoryList = idKey?.filtered?.categoryList ? idKey?.filtered?.categoryList.length : 0
    let temp_state_filter = idKey?.filtered?.state_filter ? idKey?.filtered?.state_filter.length : 0
    let temp_ownerIdList = idKey?.filtered?.ownerIdList ? idKey?.filtered?.ownerIdList.length : 0
    let temp_tagIdList = idKey?.filtered?.tagIdList ? idKey?.filtered?.tagIdList.length : 0
    let temp_mediaIdList = idKey?.filtered?.mediaIdList ? idKey?.filtered?.mediaIdList.length : 0
    if (temp_categoryList + temp_state_filter + temp_ownerIdList + temp_tagIdList + temp_mediaIdList >= 30) {
      temp = true
    }
    //dispatch(isLimitFilterAction(temp))
  }
  const commentEdit = async (idKey: number, comment: string) => {
    const { status, data, message } = await editActionComment.mutateAsync({
      id: idKey,
      info: { comment },
    })
    if (status === 'S') {
      openToast(message?.message, 'success')
      await refetchSearch('reload')
      await refetchActionCommentList()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const commentDelete = async (idKey: number) => {
    const { status, data, message } = await deleteActionComment.mutateAsync(idKey)
    if (status === 'S') {
      openToast(message?.message, 'success')
      await refetchSearch('reload')
      await refetchActionCommentList()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const ownerChangeAction = async (idKey: ownerPopupProps) => {
    const { status, data, message } = await editActionById.mutateAsync({
      id: idKey.activityId,
      request: { groupId: userSelectGroup, ownerId: idKey.key },
    })
    if (status === 'S') {
      dispatch(ownerPopupAction({ isOpen: false, key: 0, name: '', activityId: 0 }))
      openToast(message?.message, 'success')
      await refetchSearch('reload')
      await refetchActionOriginData()
    } else {
      openToast(message?.message, 'error')
    }
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
        find.subMenus = await filterAdjust(filterData.codeNameCountListOwner)
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
    //dispatch(searchNaviLinksAction(params))
  }

  const activityAction = async (e: NavigationLinkItem) => {
    dispatch(activityOpenAction(false))
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

  const haveComment = async (actionId: number, comment: string) => {
    const { status, data, message } = await createActionComment.mutateAsync({
      actionId,
      comment,
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      openToast(message?.message, 'success')
      await refetchSearch('reload')
      await refetchActionCommentList()
    } else {
      openToast(message?.message, 'error')
    }
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

  const getCommonCode = async (parentCode: string) => {
    let res: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode })
    if (status === 'S') {
      res = data as CommonCode[]
      if (parentCode === 'ACTION_CATEGORY_ALL') {
        dispatch(commonCodeCategoryAction(res))
      } else if (parentCode === 'ACTION_STATE') {
        dispatch(commonCodeStateAction(res))
      } else if (parentCode === 'ACTION_LOG_WORKTYPE') {
        dispatch(commonCodeWorkTypeAction(res))
      } else {
        dispatch(commonCodeStateFilterAction(res))
      }
    } else {
      openToast(message?.message, 'error')
    }
    return res
  }

  const getSearchActionByKeyword = async (
    keyword: string,
    hook: actionListParamsProps,
    filterHook: filterSearchDataProps
  ) => {
    const actionProps: actionListProps = {
      filtered: {
        ...hook,
        title: keyword,
        categoryList: filterHook.category.data,
        state_filter: filterHook.state.data,
        ownerIdList: filterHook.owner.data,
        tagIdList: filterHook.tag.data,
        journalistIdList: [],
        mediaIdList: filterHook.media.data,
        projectIdList: [],
        periodStart: filterHook.date.fromDate,
        periodEnd: filterHook.date.endDate,
        mediaOpen: filterHook.media.isOpen,
        categoryOpen: filterHook.category.isOpen,
        tagOpen: filterHook.tag.isOpen,
        stateOpen: filterHook.state.isOpen,
        ownerOpen: filterHook.owner.isOpen,
        isCheckedReset: false,
      },
    }
    await getActionList(actionProps, '')
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
    // if (param.userId === userInfo.userId) {
    //   await router.push('/setting/member')
    // } else {
    //   dispatch(
    //     userPopupAction({
    //       isOpen: false,
    //       email: '',
    //       displayName: '',
    //       phone: '',
    //       mobile: '',
    //       role: '',
    //       keyValue: Number(param.userId),
    //     })
    //   )
    // }
  }

  const resetKeyword = async (hook: actionListParamsProps, filterHook: filterSearchDataProps) => {
    const actionProps: actionListProps = {
      filtered: {
        ...hook,
        title: '',
        categoryList: filterHook.category.data,
        state_filter: filterHook.state.data,
        ownerIdList: filterHook.owner.data,
        tagIdList: filterHook.tag.data,
        journalistIdList: [],
        mediaIdList: filterHook.media.data,
        projectIdList: [],
        periodStart: filterHook.date.fromDate,
        periodEnd: filterHook.date.endDate,
        mediaOpen: filterHook.media.isOpen,
        categoryOpen: filterHook.category.isOpen,
        tagOpen: filterHook.tag.isOpen,
        stateOpen: filterHook.state.isOpen,
        ownerOpen: filterHook.owner.isOpen,
        isCheckedReset: false,
      },
    }
    dispatch(searchContentListButtonAction(false))
    await router.push('/activity/search', {
      // @ts-ignore
      query: {
        activity_id: Number(getActionDataKey),
        ...actionProps.filtered,
      },
    })
    await getActionList(actionProps, '')
  }

  const getActivityData = async (params: UseGetActionListParams) => {
    let activityData: PageActionDtoForList | null = null
    dispatch(searchContentLoadingAction(true))
    try {
      const { status, data, message } = await apiGetActionListByConfition(params)
      if (status === 'S') {
        activityData = data as PageActionDtoForList
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}
    dispatch(searchContentLoadingAction(false))
    return activityData
  }

  const getActionList = async (item: actionListProps, type: string) => {
    // console.log('getActionList', item)
    const param = {
      title: item.filtered.title !== '' ? item.filtered.title : '',
      shareCode: '',
      groupId: userSelectGroup,
      categoryList:
        item.filtered.categoryList && item.filtered.categoryList.length > 0 ? item.filtered.categoryList : [],
      state_filter:
        item.filtered.state_filter && item.filtered.state_filter.length > 0 ? item.filtered.state_filter : [],
      ownerIdList: item.filtered.ownerIdList && item.filtered.ownerIdList.length > 0 ? item.filtered.ownerIdList : [],
      tagIdList: item.filtered.tagIdList && item.filtered.tagIdList.length > 0 ? item.filtered.tagIdList : [],
      journalistIdList: [],
      mediaIdList: item.filtered.mediaIdList && item.filtered.mediaIdList.length > 0 ? item.filtered.mediaIdList : [],
      periodStartYear: item.filtered.periodStart ? moment(item.filtered.periodStart).format('YYYY') : '',
      periodStartMonth: item.filtered.periodStart ? moment(item.filtered.periodStart).format('MM') : '',
      periodStartDay: item.filtered.periodStart ? moment(item.filtered.periodStart).format('DD') : '',
      periodEndYear: item.filtered.periodEnd ? moment(item.filtered.periodEnd).format('YYYY') : '',
      periodEndMonth: item.filtered.periodEnd ? moment(item.filtered.periodEnd).format('MM') : '',
      periodEndDay: item.filtered.periodEnd ? moment(item.filtered.periodEnd).format('DD') : '',
      projectIdList: [],
      page: item.filtered.page ? item.filtered.page : actionListParams.page,
      size: item.filtered.size ? item.filtered.size : actionListParams.size,
      sort: item.filtered.sort ? item.filtered.sort : actionListParams.sort,
    }
    dispatch(searchContentLoadingAction(true))
    const { status, data, message } = await apiGetActionListByConfition(param)
    if (status === 'S') {
      const res = data as PageActionDtoForList
      await initSearchContentList(res, item, type)
    } else {
      openToast(message?.message, 'error')
    }
    dispatch(searchContentLoadingAction(false))
  }

  // const setQueryParam = async (list: string[], query: ActionListParams) => {
  //   let res = query
  //   for await (const re of list) {
  //     const query = re.split('=')
  //     if (query.length > 0) {
  //       switch (query[0]) {
  //         case 'activity_id':
  //           res.activity_id = Number(query[1])
  //           break
  //         case 'page':
  //           res.page = Number(query[1])
  //           break
  //         case 'size':
  //           res.size = Number(query[1])
  //           break
  //         case 'sort':
  //           res.sort = [query[1]]
  //           break
  //         case 'isCheckedReset':
  //           res.isCheckedReset = JSON.parse(query[1])
  //           break
  //         case 'stateOpen':
  //           res.stateOpen = JSON.parse(query[1])
  //           break
  //         case 'ownerOpen':
  //           res.ownerOpen = JSON.parse(query[1])
  //           break
  //         case 'tagOpen':
  //           res.tagOpen = JSON.parse(query[1])
  //           break
  //         case 'categoryOpen':
  //           res.categoryOpen = JSON.parse(query[1])
  //           break
  //         case 'mediaOpen':
  //           res.mediaOpen = JSON.parse(query[1])
  //           break
  //         case 'title':
  //           res.title = query[1]
  //           break
  //         case 'categoryList':
  //           // @ts-ignore
  //           res.categoryList = [...res.categoryList, query[1]]
  //           break
  //         case 'state_filter':
  //           res.state_filter = [...res.state_filter, query[1]]
  //           break
  //         case 'ownerIdList':
  //           res.ownerIdList = [...res.ownerIdList, query[1]]
  //           break
  //         case 'tagIdList':
  //           res.tagIdList = [...res.tagIdList, query[1]]
  //           break
  //         case 'journalistIdList':
  //           res.journalistIdList = [...res.journalistIdList, query[1]]
  //           break
  //         case 'mediaIdList':
  //           res.mediaIdList = [...res.mediaIdList, query[1]]
  //           break
  //         case 'periodStart':
  //           res.periodStart = query[1] === '' ? null : new Date(query[1])
  //           break
  //         case 'periodEnd':
  //           res.periodEnd = query[1] === '' ? null : new Date(query[1])
  //           break
  //         default:
  //       }
  //     }
  //   }
  //
  //   return res
  // }

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
    let apiParams: UseGetActionListParams = {
      title: '',
      shareCode: '',
      groupId: userSelectGroup,
      categoryList: [],
      state_filter: [],
      ownerIdList: [],
      tagIdList: [],
      journalistIdList: [],
      mediaIdList: [],
      projectIdList: [],
      page: 1,
      size: 20,
      sort: ['updateAt!desc'],
    }
    let tempFilterSubActions = [
      {
        id: 'category',
        isOpen: false,
        values: [],
      },
      {
        id: 'state',
        isOpen: false,
        subMenu: [],
        values: [],
      },
      {
        id: 'owner',
        isOpen: false,
        values: [],
      },
      {
        id: 'campagn',
        isOpen: false,
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
      console.log(
        'filterPeriodStart',
        moment(
          `${conditions.filterPeriodStartYear}-${conditions.filterPeriodStartMonth}-${conditions.filterPeriodStartDay}`
        ).format('YYYY-MM-DD')
      )
      const find = tempFilterSubActions.findIndex(e => e.id === 'date')
      if (!isNaN(find)) {
        // @ts-ignore
        tempFilterSubActions[find].values = ['DIRECT']
      }
      apiParams.periodEndDay = conditions.filterPeriodEndDay
      apiParams.periodEndMonth = conditions.filterPeriodEndMonth
      apiParams.periodEndYear = conditions.filterPeriodEndYear
      apiParams.periodStartDay = conditions.filterPeriodStartDay
      apiParams.periodStartMonth = conditions.filterPeriodStartMonth
      apiParams.periodStartYear = conditions.filterPeriodStartYear
      res = {
        apiParams,
        tempFilterSubActions,
        activityId: conditions?.activityId || 0,
      }
    }
    return res
  }

  const init = async () => {
    let commonCategory: CommonCode[] = []
    let commonState: CommonCode[] = []
    let commonStateFilter: CommonCode[] = []
    let searchContentList: searchContentListProps[] = []
    let activityId = 0
    let filterSub = subActivityFilterListList
    let filterSubActions = subActivityFilterOptionsList
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 1,
    }
    let apiParams: UseGetActionListParams = {
      title: '',
      shareCode: '',
      groupId: userSelectGroup,
      categoryList: [],
      state_filter: [],
      ownerIdList: [],
      tagIdList: [],
      journalistIdList: [],
      mediaIdList: [],
      projectIdList: [],
      page: 1,
      size: 20,
      sort: ['updateAt!desc'],
    }
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
          }
        }
      }
      for (const re of extendedCommonCodeTargetList) {
        if (re.id === 'ACTION_CATEGORY_ALL') {
          commonCategory = await getCommonCode(re.id)
        } else if (re.id === 'ACTION_STATE') {
          commonState = await getCommonCode(re.id)
        } else if (re.id === 'ACTION_STATE_FILTER') {
          commonStateFilter = await getCommonCode(re.id)
        } else if (re.id === 'ACTION_LOG_WORKTYPE') {
          await getCommonCode(re.id)
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
          filterSub = await getFilter()
          tempPageCount = {
            totalCount: res.totalElements ?? 0,
            totalPageCount: res.totalPages ?? 0,
          }
        }
      }
    } catch (e) {}
    dispatch(
      setActivityInitDataAction({
        apiParams: apiParams,
        activityId: activityId,
        activityList: searchContentList,
        pageCount: tempPageCount,
        filterSubParam: filterSub,
        filterSubActions: filterSubActions,
      })
    )
    console.log('', {
      searchContentList,
      tempPageCount,
      filterSub,
      filterSubActions,
      activityId,
    })
  }

  const initSearchContentList = async (data: PageActionDtoForList, item: actionListProps, type: string) => {
    const param: initListProps = {
      searchContentList: [],
      pageCount: {
        totalCount: data.totalElements ?? 0,
        totalPageCount: data.totalPages ?? 0,
      },
    }
    const tempCommonCodeCategory = item.common ? item.common.commonCodeCategory : commonCodeCategory
    const tempCommonCodeState = item.common ? item.common.commonCodeState : commonCodeState
    const tempCommonCodeStateFilter = item.common ? item.common.commonCodeStateFilter : commonCodeStateFilter
    if (data.content && data.content.length > 0) {
      for await (const paramElement of data.content) {
        const temp = {
          ...paramElement,
          categoryName: '',
          stateName: '',
        }
        const findCategory = tempCommonCodeCategory.find(e => e.code === paramElement.category)
        if (findCategory) {
          temp.categoryName = findCategory.name
        }
        if (paramElement.category !== 'MAILING' && paramElement.category !== 'PRESS_RELEASE') {
          const findStateFilter = tempCommonCodeStateFilter.find(e => e.code === paramElement.state_filter)
          if (findStateFilter) {
            temp.stateName = findStateFilter.name
          }
        } else {
          const findState = tempCommonCodeState.find(e => e.code === paramElement.state)
          if (findState) {
            temp.stateName = findState.name
          }
        }
        param.searchContentList = [...param.searchContentList, temp]
      }
    }
    if (type === 'reload') {
      dispatch(searchContentListAction({ searchContentList: param.searchContentList, pageCount: param.pageCount }))
    } else {
      dispatch(initListAction({ item: param, param: item.filtered }))
    }
  }

  const initDetailContent = async (data: ActionDto) => {
    const temp = {
      ...data,
      categoryName: '',
      stateName: '',
      shareCodeNm: '',
      commentCount: 0,
    }
    const findShareScopeList = extendedShareScopeList.find(e => e.id === data.shareCode)
    if (findShareScopeList) {
      temp.shareCodeNm = findShareScopeList.name
    }
    const findCategory = commonCodeCategory.find(e => e.code === data.category)
    if (findCategory) {
      temp.categoryName = findCategory.name
    }
    //@ts-ignore
    if (data.commentCount) {
      //@ts-ignore
      temp.commentCount = data.commentCount
    }
    //@ts-ignore
    if (data.mailingForAction) {
      //@ts-ignore
      temp.mailingForAction = data.mailingForAction
    }
    if (data.category !== 'MAILING' && data.category !== 'PRESS_RELEASE') {
      const findStateFilter = commonCodeStateFilter.find(e => e.code === data.stateFilter)
      if (findStateFilter) {
        temp.stateName = findStateFilter.name
      }
    } else {
      const findState = commonCodeState.find(e => e.code === data.state)
      if (findState) {
        temp.stateName = findState.name
      }
    }
    dispatch(getActionDataAction(temp))
  }

  const initActionLogContent = async (data: ActionLogDto[]) => {
    let res: contentsActionLogListProps[] = []
    if (data.length > 0 && commonCodeWorkType.length > 0) {
      for await (const actionLogDto of data) {
        const temp = {
          ...actionLogDto,
          workTypeNm: '',
        }
        const findState = commonCodeWorkType.find(e => e.code === actionLogDto.workType)
        if (findState) {
          temp.workTypeNm = findState.name
        }
        res = [...res, temp]
      }
    }
    dispatch(actionLogListAction(res))
  }

  const actionTaggingAddFunction = async (param: TaggingProps) => {
    const { status, data, message } = await actionTaggingAdd.mutateAsync(param)
    if (status === 'S') {
      openToast(message?.message, 'success')
      await init()
    } else {
      openToast(message?.message, 'error')
    }
    return status
  }

  const actionTaggingExceptFunction = async (param: TaggingProps) => {
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
      openToast(message?.message, 'success')
      await init()
    } else {
      openToast(message?.message, 'error')
    }
    return status
  }

  const actionTaggingResetFunction = async (param: TaggingProps) => {
    const { status, data, message } = await actionTaggingReset.mutateAsync(param)
    if (status === 'S') {
      openToast(message?.message, 'success')
      await init()
    } else {
      openToast(message?.message, 'error')
    }
    return status
  }

  const editTaggingAction = async (popup: tagPopupProps) => {
    let res = undefined
    let param: TaggingProps = {
      category: 'ACTION',
      tagIdList: [],
      targetList: [],
    }
    if (popup.tagList.length > 0) {
      for (const tagIdListElement of popup.tagList) {
        param.tagIdList = [...param.tagIdList, Number(tagIdListElement.id)]
      }
    }
    if (popup.targetIdList.length > 0) {
      for (const targetIdElement of popup.targetIdList) {
        param.targetList = [
          ...param.targetList,
          {
            targetId: Number(targetIdElement),
            newsIndexName: '',
          },
        ]
      }
    }
    if (param.tagIdList.length > 0 && param.targetList.length > 0) {
      if (popup.selectedKey === 'add') {
        res = await actionTaggingAddFunction(param)
      } else if (popup.selectedKey === 'delete') {
        res = await actionTaggingExceptFunction(param)
      } else {
        res = await actionTaggingResetFunction(param)
      }
    }
    if (res === 'S') {
      dispatch(doneTagAction())
    }
  }

  const refetchSearch = async (type: string) => {
    const actionProps: actionListProps = {
      filtered: {
        ...actionListParams,
        categoryList: filterSearchData.category.data,
        state_filter: filterSearchData.state.data,
        ownerIdList: filterSearchData.owner.data,
        tagIdList: filterSearchData.tag.data,
        journalistIdList: [],
        mediaIdList: filterSearchData.media.data,
        projectIdList: [],
        periodStart: filterSearchData.date.fromDate,
        periodEnd: filterSearchData.date.endDate,
        mediaOpen: filterSearchData.media.isOpen,
        categoryOpen: filterSearchData.category.isOpen,
        tagOpen: filterSearchData.tag.isOpen,
        stateOpen: filterSearchData.state.isOpen,
        ownerOpen: filterSearchData.owner.isOpen,
        isCheckedReset: false,
      },
    }
    dispatch(reloadAction())
    await router.push('/activity/search', {
      // @ts-ignore
      query: {
        activity_id: Number(getActionDataKey),
        ...actionProps.filtered,
      },
    })
    await getActionList(actionProps, type)
  }

  const exportToExcel = async (keyValueList: MbTagSearchTagItem[]) => {
    const param = {
      groupId: userSelectGroup,
      actionIdList: keyValueList.map(e => {
        return Number(e.id)
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
      openToast('내보내기에 성공하였습니다', 'success')
    } else {
      openToast('내보내기에 실패하였습니다', 'error')
    }
  }
  const calculateButtonOption = async (props: MbTagSearchTagItem[]) => {
    let res = {
      isTag: true,
    }
    if (props.length > 0) {
      for await (const mbTagSearchTagItem of props) {
        if (mbTagSearchTagItem.className !== 'both') {
          if (mbTagSearchTagItem.className !== 'isTag') {
            res.isTag = false
          }
        }
      }
    }

    return res
  }

  const moveToSearchByTag = async (param: number) => {
    try {
      const res = {
        page: 1,
        size: 20,
        sort: ['updateAt!desc'],
        groupId: userSelectGroup,
        isCheckedReset: true,
        title: '',
        categoryList: [],
        state_filter: [],
        ownerIdList: [],
        tagIdList: [param.toString()],
        journalistIdList: [],
        mediaIdList: [],
        projectIdList: [],
        periodStart: null,
        periodEnd: null,
        mediaOpen: false,
        categoryOpen: false,
        tagOpen: false,
        stateOpen: false,
        ownerOpen: false,
      }
      //const filtered = await getFilter(res)
      // const params: actionListProps = {
      //   filtered,
      //   common: {
      //     commonCodeCategory,
      //     commonCodeState,
      //     commonCodeStateFilter,
      //   },
      // }
      // console.log('params', params)
      // await router.push('/activity/search', {
      //   // @ts-ignore
      //   query: {
      //     activity_id: Number(getActionDataKey),
      //     ...params.filtered,
      //   },
      // })
      //await getActionList(params, '')
    } catch (e) {}
  }

  useEffect(() => {
    if (!getActionOriginData) return
    const { status, data, message } = getActionOriginData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as ActionDto
      initDetailContent(res)
    } else {
      openToast(message?.message, 'error')
      dispatch(initActionDataAction())
    }
  }, [getActionOriginData])

  useEffect(() => {
    if (!getActionCommentList) return
    const { status, data, message } = getActionCommentList as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as PageActionCommentDto
      dispatch(commmentListAction(res.content as ActionCommentDto[]))
    }
  }, [getActionCommentList])

  useEffect(() => {
    if (!getActionLogList) return
    const { status, data, message } = getActionLogList as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as PageActionCommentDto
      initActionLogContent(res.content as ActionLogDto[])
    }
  }, [getActionLogList])

  useEffect(() => {
    if (!apiGetOneUser) return
    const { status, data: apiData, message } = apiGetOneUser as BaseResponseCommonObject
    if (status === 'S') {
      const res = apiData as UserDto
      dispatch(
        userPopupAction({
          isOpen: true,
          email: res?.email || '',
          displayName: res?.displayName || '-',
          phone: res?.phone || '',
          mobile: res?.mobile || '',
          role: res?.role === 'ADMIN' ? '관리자' : '사용자',
          keyValue: Number(res.userId),
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }, [apiGetOneUser])

  return {
    actionListParams,
    userSelectGroup,
    licenseInfo,
    userInfo,
    searchNaviLinks,
    filterSearchData,
    pageCount,
    activityOpen,
    activityOpenRef,
    searchContentList,
    searchContentListButton,
    searchContentKeyList,
    noticeNewActivity,
    isInit,
    searchContentLoading,
    contentsTabList,
    contentsTab,
    contentsCommentList,
    createComment,
    getActionDataLoading,
    getActionData,
    getActionDataKey,
    loadingGetActionData,
    userPopup,
    commmentCount,
    contentsCommentText,
    commentPopup,
    eidtComment,
    contentsActionLogList,
    activityOwnerLayer,
    activityOwnerGroup,
    ownerPopup,
    isSelectedAllActionId,
    tagPopup,
    isTagButton,
    isLimitFilter,

    filterSubParamActions,
    filterSubParam,
    apiParams,
    activityId,
    activityList,

    exportToExcel,
    init,
    activityAction,
    getSearchActionByKeyword,
    resetKeyword,
    refetchSearch,
    moveToSearchByTag,
    ownerFunction,
    haveComment,
    commentDelete,
    commentEdit,
    ownerChangeAction,
    editTaggingAction,

    tagEdit,
    setAllSearchContentKeyListData,
    setActivityOwnerLayerAction,
    setEditCommentAction,
    setContentsCommentTextAction,
    setUserProfilePopupAction,
    initSearchActivityAction,
    setActionDataKeyAction,
    setCreateCommentAction,
    setContentsTabListAction,
    setAllSearchContentKeyList,
    setFilterSearchDeleteDateAction,
    setSearchContentListButtonAction,
    handleKeywordsChange,
    handleChangeSort,
    setActivityOpenActionAction,
    handlePaginationChange,
    handleChangeSize,
    setFilterSearchDateAction,
    setFilterSearchOpenAction,
    setFilterSearchDataAction,
    setFilterSearchDeleteDataAction,
    resetFilter,
    setSearchContentKeyList,
    setCommentPopupAction,
    setOwnerPopupAction,
    getActivityOwnerLayer,
    setTagPopupAction,
    setTagPopupStyleAction,
    setInitTagPopupAction,
    setTagPopupSelectedKeyAction,
    setTagPopupCreateTagAction,
    setTagPopupTagStatusAction,
    setTagPopupTagCloseAction,
    setTagPopupResetTagAction,

    setOpenfilterSubParamActions,
  }
}
