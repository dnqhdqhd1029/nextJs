import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { defaultContentsTabListData } from '~/components/contents/activity/common/defaultData'
import { deletePopupProps } from '~/stores/modules/contents/monitoring/newsDetail'
import { pageCountProps } from '~/stores/modules/contents/myPurchase/myPurchase'
import {
  ActionCommentDto,
  ActionDto,
  ActionDtoForList,
  ActionLogDto,
  TagDto,
  UserDtoForGroup,
  type UserDtoForSimple,
} from '~/types/api/service'
import { NavigationLinkItem, StepItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { ESearchJournalistDocumentDto } from '~/types/contents/PressMedia'
import { UseGetActionListParams } from '~/utils/api/action/useGetActionList'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'

export interface dataOnChangeActionTypeProps {
  commentCount?: string
  owner?: string
  tagList?: string
  contentsCommentList?: string
  contentsActionLogList?: string
}

export interface dataOnChangeActionProps {
  commentCount?: number
  owner?: UserDtoForSimple
  tagList?: TagDto[]
  contentsCommentList?: ActionCommentDto[]
  contentsActionLogList?: contentsActionLogListProps[]
}

export interface searchContentListProps extends ActionDtoForList {
  categoryName?: string
  stateName?: string
}

export interface ownerPopupProps {
  isOpen: boolean
  key: number
  name: string
  activityId: number
  userData?: UserDtoForGroup
}

export interface contentsActionLogListProps extends ActionLogDto {
  workTypeNm?: string
  workFieldNm?: string
}

export interface getActionDataProps extends ActionDto {
  categoryName?: string
  stateName?: string
  shareCodeNm?: string
  commentCount?: number
}

export interface filterSubParamActionsProps {
  id: string
  isOpen: boolean
  subMenu?: filterSubParamActionsProps[]
  values: string[]
}
export interface tagPopupProps {
  isOpen: boolean
  tagList: MbTagSearchTagItem[]
}

export type FilterDateType = {
  fromDate: Date | null
  endDate: Date | null
}
export type userPopupProps = {
  isOpen: boolean
  email: string
  displayName: string
  phone: string
  mobile: string
  role: string
  keyValue: number
}

export type Props = {
  filterSubParamActions: filterSubParamActionsProps[]
  filterSubParam: NavigationLinkItem[]
  apiParams: UseGetActionListParams
  activityId: number
  isLimitFilter: number
  activityList: searchContentListProps[]
  pageCount: pageCountProps
  searchContentLoading: boolean
  getActionDataLoading: boolean

  activityParamKeywordButton: boolean
  activityParamKeyword: string
  searchContentKeyList: searchContentListProps[]
  isSelectedAllActionId: boolean
  isTagButton: boolean
  getActionData: null | getActionDataProps
  loadingGetActionData: boolean
  contentsTabList: StepItem[]
  contentsTab: string
  contentsActionLogList: contentsActionLogListProps[]
  contentsCommentText: string
  contentsCommentErrorText: string
  createComment: boolean
  eidtComment: number
  contentsCommentList: ActionCommentDto[]
  commmentCount: number

  commonCodeCategory: CommonCode[]
  commonCodeWorkType: CommonCode[]
  commonCodeState: CommonCode[]
  commonCodeStateFilter: CommonCode[]

  activityOwnerGroup: UserDtoForGroup[]
  tagPopup: tagPopupProps
  userPopup: userPopupProps
  ownerPopup: ownerPopupProps
  activityOwnerLayer: {
    layerOpen: boolean
    isList: boolean
  }
  commentPopup: {
    isOpen: boolean
    key: number
  }
  fileDownloadPopup: deletePopupProps
  searchLimitAlarm: boolean
}

// 초기값
export const initialState: Props = {
  filterSubParamActions: [],
  filterSubParam: [],
  apiParams: {
    groupId: 0,
    page: 1,
    size: 20,
    sort: ['updateAt!desc'],
  },
  activityId: 0,
  activityList: [],
  isLimitFilter: 0,
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  getActionDataLoading: false,
  searchContentLoading: false,
  activityParamKeyword: '',
  activityParamKeywordButton: false,
  loadingGetActionData: false,
  getActionData: null,
  contentsTabList: [],
  contentsTab: '',
  contentsActionLogList: [],
  contentsCommentText: '',
  contentsCommentErrorText: '',
  createComment: false,
  contentsCommentList: [],
  eidtComment: 0,
  commmentCount: 0,

  isTagButton: false,
  searchContentKeyList: [],
  isSelectedAllActionId: false,

  commonCodeCategory: [],
  commonCodeWorkType: [],
  commonCodeState: [],
  commonCodeStateFilter: [],

  tagPopup: {
    isOpen: false,
    tagList: [],
  },
  userPopup: {
    isOpen: false,
    email: '',
    keyValue: 0,
    displayName: '',
    phone: '',
    mobile: '',
    role: '',
  },
  ownerPopup: {
    isOpen: false,
    key: 0,
    activityId: 0,
    name: '',
  },
  activityOwnerGroup: [],
  activityOwnerLayer: { layerOpen: false, isList: false },
  commentPopup: {
    isOpen: false,
    key: 0,
  },
  fileDownloadPopup: {
    isOpen: false,
    title: '',
    key: 0,
  },
  searchLimitAlarm: false,
}

const activityListSlice = createSlice({
  name: 'activityListSlice',
  initialState,
  reducers: {
    searchLimitAlarmAction: (state, action: PayloadAction<boolean>) => {
      state.searchLimitAlarm = action.payload
    },
    fileDownloadPopupAction: (state, action: PayloadAction<deletePopupProps>) => {
      state.fileDownloadPopup = action.payload
    },
    actionLogListAction: (state, action: PayloadAction<contentsActionLogListProps[]>) => {
      state.contentsTab = 'log'
      state.contentsActionLogList = action.payload
      state.contentsCommentText = ''
      state.contentsCommentErrorText = ''
      state.eidtComment = 0
      state.createComment = false
      state.commentPopup = {
        isOpen: false,
        key: 0,
      }
    },
    commmentListAction: (state, action: PayloadAction<ActionCommentDto[]>) => {
      state.contentsTab = 'comment'
      state.contentsCommentList = action.payload
      state.contentsCommentText = ''
      state.contentsCommentErrorText = ''
      state.eidtComment = 0
      state.createComment = false
      state.commentPopup = {
        isOpen: false,
        key: 0,
      }
    },
    editCommentAction: (state, action: PayloadAction<{ param: number; content: string }>) => {
      state.eidtComment = action.payload.param
      state.createComment = false
      state.contentsCommentErrorText = ''
      state.contentsCommentText = action.payload.content
    },
    commentPopupAction: (state, action: PayloadAction<{ isOpen: boolean; key: number }>) => {
      state.commentPopup = action.payload
    },
    contentsCommentTextAction: (state, action: PayloadAction<{ err: string; content: string }>) => {
      state.contentsCommentErrorText = action.payload.err
      state.contentsCommentText = action.payload.content
    },
    createCommentAction: (state, action: PayloadAction<boolean>) => {
      state.createComment = action.payload
      state.eidtComment = 0
      state.contentsCommentText = ''
      state.contentsCommentErrorText = ''
    },
    contentsTabListAction: (state, action: PayloadAction<string>) => {
      state.contentsTab = action.payload
    },

    getActionDataAction: (state, action: PayloadAction<getActionDataProps>) => {
      state.getActionData = action.payload
      state.loadingGetActionData = false
      state.contentsTabList = defaultContentsTabListData
      state.contentsTab = 'content'
      state.activityId = action.payload?.actionId ? action.payload?.actionId : 0
    },
    initActionDataAction: state => {
      state.getActionData = null
      state.loadingGetActionData = false
      state.contentsTabList = []
      state.activityId = 0
      state.contentsTab = 'content'
    },

    userPopupAction: (state, action: PayloadAction<userPopupProps>) => {
      state.userPopup = action.payload
    },
    isSelectedAllActionIdAction: (state, action: PayloadAction<boolean>) => {
      state.isSelectedAllActionId = action.payload
    },
    activityParamKeywordAction: (state, action: PayloadAction<string>) => {
      state.activityParamKeyword = action.payload
    },
    activityParamKeywordButtonAction: (state, action: PayloadAction<boolean>) => {
      state.activityParamKeywordButton = action.payload
    },
    searchContentLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.searchContentLoading = action.payload
    },
    ownerPopupAction: (state, action: PayloadAction<ownerPopupProps>) => {
      state.ownerPopup = action.payload
    },
    initTagPopupAction: state => {
      state.tagPopup = {
        isOpen: false,
        tagList: [],
      }
    },
    doneTagAction: state => {
      state.searchContentKeyList = []
      state.tagPopup = {
        isOpen: false,
        tagList: [],
      }
    },
    getActionDataLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.getActionDataLoading = action.payload
    },
    commonCodeCategoryAction: (state, action: PayloadAction<CommonCode[]>) => {
      state.commonCodeCategory = action.payload
    },
    commonCodeWorkTypeAction: (state, action: PayloadAction<CommonCode[]>) => {
      state.commonCodeWorkType = action.payload
    },
    commonCodeStateAction: (state, action: PayloadAction<CommonCode[]>) => {
      state.commonCodeState = action.payload
    },
    commonCodeStateFilterAction: (state, action: PayloadAction<CommonCode[]>) => {
      state.commonCodeStateFilter = action.payload
    },
    isLimitFilterAction: (state, action: PayloadAction<number>) => {
      state.isLimitFilter = action.payload
    },
    tagPopupAction: (state, action: PayloadAction<tagPopupProps>) => {
      state.tagPopup = action.payload
    },
    activityIdParamsAction: (state, action: PayloadAction<number>) => {
      state.loadingGetActionData = false
      state.contentsTabList = []
      state.activityId = action.payload
      state.contentsTab = 'content'
    },
    activityOwnerLayerAction: (state, action: PayloadAction<boolean>) => {
      state.activityOwnerLayer.layerOpen = action.payload
      state.activityOwnerLayer.isList = false
    },
    getActivityOwnerLayerAction: (state, action: PayloadAction<UserDtoForGroup[]>) => {
      state.activityOwnerGroup = action.payload
      state.activityOwnerLayer.isList = true
    },
    setFilterSubParamActions: (state, action: PayloadAction<filterSubParamActionsProps[]>) => {
      state.filterSubParamActions = action.payload
      console.log('action.payload', action.payload)
    },
    searchContentKeyListAction: (
      state,
      action: PayloadAction<{
        param: searchContentListProps[]
        isTag: boolean
      }>
    ) => {
      state.searchContentKeyList = action.payload.param
      state.isSelectedAllActionId = false
      state.isTagButton = action.payload.isTag
    },
    setOnChangeFilterSearchOptionAction: (
      state,
      action: PayloadAction<{
        apiParams: UseGetActionListParams
        activityList: searchContentListProps[]
        pageCount: pageCountProps
        filterSubActions: filterSubParamActionsProps[]
      }>
    ) => {
      state.searchContentKeyList = []
      state.filterSubParamActions = action.payload.filterSubActions
      state.pageCount = action.payload.pageCount
      state.apiParams = action.payload.apiParams
      state.searchLimitAlarm = false
      state.activityList = action.payload.activityList
      state.activityId =
        action.payload.activityList.length > 0
          ? action.payload.activityList[0].actionId
            ? action.payload.activityList[0].actionId
            : 0
          : 0
      state.commmentCount =
        action.payload.activityList && action.payload.activityList.length > 0
          ? action.payload.activityList[0].actionId
            ? Number(action.payload.activityList[0].commentCount)
            : 0
          : 0
      state.contentsTab =
        action.payload.activityList &&
        action.payload.activityList.length > 0 &&
        action.payload.activityList[0].category !== 'PRESS_RELEASE' &&
        action.payload.activityList[0].category !== 'MAILING'
          ? 'comment'
          : ''
    },
    setOnChangeSearchOptionAction: (
      state,
      action: PayloadAction<{
        apiParams: UseGetActionListParams
        activityList: searchContentListProps[]
        pageCount: pageCountProps
        filterSubParam: NavigationLinkItem[]
        isResetSelectedNews: boolean
      }>
    ) => {
      if (action.payload.isResetSelectedNews) {
        state.searchContentKeyList = []
      }
      if (action.payload.filterSubParam.length > 0) {
        state.filterSubParam = action.payload.filterSubParam
      }
      state.pageCount = action.payload.pageCount
      state.apiParams = action.payload.apiParams
      state.searchLimitAlarm = false
      state.activityList = action.payload.activityList
      state.activityId =
        action.payload.activityList.length > 0
          ? action.payload.activityList[0].actionId
            ? action.payload.activityList[0].actionId
            : 0
          : 0
      state.commmentCount =
        action.payload.activityList && action.payload.activityList.length > 0
          ? action.payload.activityList[0].actionId
            ? Number(action.payload.activityList[0].commentCount)
            : 0
          : 0
      state.contentsTab =
        action.payload.activityList &&
        action.payload.activityList.length > 0 &&
        action.payload.activityList[0].category !== 'PRESS_RELEASE' &&
        action.payload.activityList[0].category !== 'MAILING'
          ? 'comment'
          : ''
    },
    setActivityInitDataAction: (
      state,
      action: PayloadAction<{
        apiParams: UseGetActionListParams
        activityId: number
        activityList: searchContentListProps[]
        pageCount: pageCountProps
        filterSubParam: NavigationLinkItem[]
        filterSubActions: filterSubParamActionsProps[]
        tempSearchKeywordOption: string
      }>
    ) => {
      if (action.payload.tempSearchKeywordOption !== '') {
        state.activityParamKeyword = action.payload.tempSearchKeywordOption
        state.activityParamKeywordButton = true
      } else {
        state.activityParamKeyword = ''
        state.activityParamKeywordButton = false
      }
      state.filterSubParamActions = action.payload.filterSubActions
      state.filterSubParam = action.payload.filterSubParam
      state.pageCount = action.payload.pageCount
      state.apiParams = action.payload.apiParams
      state.activityId = action.payload.activityId
      state.searchLimitAlarm = false
      state.activityList = action.payload.activityList

      state.searchContentLoading = false
    },
    getActionDataJustOnChangeAction: (state, action: PayloadAction<getActionDataProps>) => {
      state.getActionData = action.payload
    },
    commmentListJustOnChangeAction: (state, action: PayloadAction<ActionCommentDto[]>) => {
      state.contentsCommentList = action.payload
      state.eidtComment = 0
      state.contentsCommentText = ''
      state.commentPopup = {
        isOpen: false,
        key: 0,
      }
    },
    actionLogListJustOnChangeAction: (state, action: PayloadAction<contentsActionLogListProps[]>) => {
      state.contentsActionLogList = action.payload
    },
    activityListReOnChangeAction: (
      state,
      action: PayloadAction<{
        activityId: number
        activityList: searchContentListProps[]
        pageCount: pageCountProps
      }>
    ) => {
      state.activityId = action.payload.activityId
      state.activityList = action.payload.activityList
      state.searchContentKeyList = []
      state.pageCount = action.payload.pageCount
    },
    activityListJustOnChangeAction: (state, action: PayloadAction<searchContentListProps[]>) => {
      state.activityList = action.payload
    },
    initAction: state => {
      state.filterSubParamActions = []
      state.filterSubParam = []
      state.apiParams = {
        groupId: 0,
        page: 1,
        size: 20,
        sort: ['updateAt!desc'],
      }
      state.activityId = 0
      state.searchLimitAlarm = false
      state.activityList = []
      state.isLimitFilter = 0
      state.pageCount = {
        totalCount: 0,
        totalPageCount: 1,
      }
      state.getActionDataLoading = true
      state.searchContentLoading = true
      state.activityParamKeyword = ''
      state.activityParamKeywordButton = false
      state.loadingGetActionData = false
      state.getActionData = null
      state.contentsTabList = []
      state.contentsTab = ''
      state.contentsActionLogList = []
      state.contentsCommentText = ''
      state.contentsCommentErrorText = ''
      state.createComment = false
      state.contentsCommentList = []
      state.eidtComment = 0
      state.commmentCount = 0

      state.isTagButton = false
      state.searchContentKeyList = []
      state.isSelectedAllActionId = false

      state.commonCodeCategory = []
      state.commonCodeWorkType = []
      state.commonCodeState = []
      state.commonCodeStateFilter = []

      state.activityOwnerGroup = []
      state.activityOwnerLayer = { layerOpen: false, isList: false }
      state.tagPopup = {
        isOpen: false,
        tagList: [],
      }
      state.userPopup = {
        isOpen: false,
        email: '',
        keyValue: 0,
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
      }
      state.ownerPopup = {
        isOpen: false,
        key: 0,
        activityId: 0,
        name: '',
      }
      state.commentPopup = {
        isOpen: false,
        key: 0,
      }
      state.fileDownloadPopup = {
        isOpen: false,
        title: '',
        key: 0,
      }
    },
  },
})

export const {
  initTagPopupAction,
  getActionDataLoadingAction,
  initAction,
  commonCodeCategoryAction,
  commonCodeStateAction,
  commonCodeStateFilterAction,
  commonCodeWorkTypeAction,
  isLimitFilterAction,
  setActivityInitDataAction,
  setFilterSubParamActions,
  searchContentLoadingAction,
  setOnChangeFilterSearchOptionAction,
  setOnChangeSearchOptionAction,
  activityParamKeywordAction,
  activityParamKeywordButtonAction,
  searchContentKeyListAction,
  tagPopupAction,
  isSelectedAllActionIdAction,
  userPopupAction,
  doneTagAction,
  ownerPopupAction,
  initActionDataAction,
  getActionDataAction,
  contentsTabListAction,
  createCommentAction,
  contentsCommentTextAction,
  commentPopupAction,
  editCommentAction,
  commmentListAction,
  actionLogListAction,
  activityIdParamsAction,
  fileDownloadPopupAction,
  activityOwnerLayerAction,
  getActivityOwnerLayerAction,
  searchLimitAlarmAction,
  getActionDataJustOnChangeAction,
  commmentListJustOnChangeAction,
  actionLogListJustOnChangeAction,
  activityListJustOnChangeAction,
  activityListReOnChangeAction,
} = activityListSlice.actions
export default activityListSlice.reducer
