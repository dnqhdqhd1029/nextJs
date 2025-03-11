import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { defaultContentsTabListData } from '~/components/contents/activity/common/defaultData'
import { pageCountProps } from '~/stores/modules/contents/myPurchase/myPurchase'
import { ActionCommentDto, ActionDto, ActionDtoForList, ActionLogDto, UserDtoForGroup } from '~/types/api/service'
import { NavigationLinkItem, StepItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { UseGetActionListParams } from '~/utils/api/action/useGetActionList'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'

export type FilterKey = 'category' | 'state' | 'owner' | 'campagn' | 'tag' | 'media'
export type filterSearchDataProps = {
  category: {
    data: string[]
    isOpen: boolean
  }
  state: {
    data: string[]
    isOpen: boolean
  }
  owner: {
    data: string[]
    text: string
    isOpen: boolean
  }
  campagn: {
    data: string[]
    text: string
    isOpen: boolean
  }
  tag: {
    data: string[]
    text: string
    isOpen: boolean
  }
  media: {
    data: string[]
    text: string
    isOpen: boolean
  }
  date: {
    fromDate: Date | null
    endDate: Date | null
    isOpen: boolean
  }
}
export interface ownerPopupProps {
  isOpen: boolean
  key: number
  name: string
  activityId: number
}

export interface ActionListParams {
  activity_id?: number
  title?: string
  shareCode?: string
  groupId?: number
  categoryList?: string[]
  state_filter?: string[]
  ownerIdList?: string[]
  tagIdList?: string[]
  journalistIdList?: string[]
  mediaIdList?: string[]
  periodStartYear?: string
  periodStartMonth?: string
  periodStartDay?: string
  periodEndYear?: string
  periodEndMonth?: string
  periodEndDay?: string
  projectIdList?: string[]
  periodStart?: Date | null
  periodEnd?: Date | null
  periodOpen?: boolean
  categoryOpen?: boolean
  stateOpen?: boolean
  ownerOpen?: boolean
  tagOpen?: boolean
  mediaOpen?: boolean
  ownerText?: string
  tagText?: string
  mediaText?: string
  page?: number
  size?: number
  sort?: string[]
  isCheckedReset?: boolean
}

export interface searchContentListProps extends ActionDtoForList {
  categoryName?: string
  stateName?: string
  titleForManage?: string
}
export interface mailingForActionProps {
  mailingId: number
  category: string
  sendNow: null | boolean
  includeUser: boolean
  sender: {
    userId: number
    name: string
    nickname: string
    displayName: string
  }
  state: string
  startAt: string
}

export interface getActionDataProps extends ActionDto {
  categoryName?: string
  stateName?: string
  shareCodeNm?: string
  commentCount?: number
}
export interface actionListParamsProps {
  title: string
  page: number
  size: number
  sort: string[]
}

export interface filterSubParamActionsProps {
  id: string
  isOpen: boolean
  subMenu?: filterSubParamActionsProps[]
  values: string[]
}

export type initListProps = {
  pageCount: pageCountProps
  searchContentList: searchContentListProps[]
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
export interface contentsActionLogListProps extends ActionLogDto {
  workTypeNm?: string
}
export interface tagPopupProps {
  isOpen: boolean
  title: string
  type: string
  selectedKey: string
  tagList: MbTagSearchTagItem[]
  targetIdList: number[]
}

export type Props = {
  filterSubParamActions: filterSubParamActionsProps[]
  filterSubParam: NavigationLinkItem[]
  apiParams: UseGetActionListParams
  activityId: number
  activityList: searchContentListProps[]

  searchNaviLinks: NavigationLinkItem[]
  filterSearchData: filterSearchDataProps
  filterLoading: boolean
  actionListParams: actionListParamsProps
  pageCount: pageCountProps
  activityOpen: boolean
  searchContentList: searchContentListProps[]
  searchContentListButton: boolean
  searchContentKeyList: MbTagSearchTagItem[]
  commonCodeCategory: CommonCode[]
  commonCodeState: CommonCode[]
  commonCodeStateFilter: CommonCode[]
  commonCodeWorkType: CommonCode[]
  noticeNewActivity: boolean
  isInit: boolean
  searchContentLoading: boolean
  contentsTabList: StepItem[]
  contentsTab: string
  contentsCommentText: string
  contentsCommentList: ActionCommentDto[]
  contentsActionLogList: contentsActionLogListProps[]
  createComment: boolean
  eidtComment: number
  getActionDataKey: number
  getActionData: null | getActionDataProps
  loadingGetActionData: boolean
  userPopup: userPopupProps
  commmentCount: number
  commentPopup: {
    isOpen: boolean
    key: number
  }
  ownerPopup: ownerPopupProps
  activityOwnerLayer: {
    layerOpen: boolean
    isList: boolean
  }
  activityOwnerGroup: UserDtoForGroup[]
  isSelectedAllActionId: boolean
  tagPopup: tagPopupProps
  noticeNewEmail: boolean
  isTagButton: boolean
  isLimitFilter: number
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

  searchNaviLinks: [],
  filterSearchData: {
    category: {
      data: [],
      isOpen: false,
    },
    state: {
      data: [],
      isOpen: false,
    },
    owner: {
      data: [],
      text: '',
      isOpen: false,
    },
    campagn: {
      data: [],
      text: '',
      isOpen: false,
    },
    tag: {
      data: [],
      text: '',
      isOpen: false,
    },
    media: {
      data: [],
      text: '',
      isOpen: false,
    },
    date: {
      fromDate: null,
      endDate: null,
      isOpen: false,
    },
  },
  filterLoading: true,
  actionListParams: {
    title: '',
    page: 1,
    size: 20,
    sort: ['updateAt!desc'],
  },
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  activityOpen: false,
  searchContentList: [],
  searchContentLoading: false,
  searchContentKeyList: [],
  searchContentListButton: false,
  commonCodeCategory: [],
  commonCodeState: [],
  commonCodeStateFilter: [],
  commonCodeWorkType: [],
  noticeNewActivity: false,
  isInit: true,
  contentsTabList: [],
  contentsTab: '',
  contentsCommentList: [],
  contentsActionLogList: [],
  contentsCommentText: '',
  createComment: false,
  eidtComment: 0,
  getActionDataKey: 0,
  getActionData: null,
  loadingGetActionData: false,
  userPopup: {
    isOpen: false,
    email: '',
    keyValue: 0,
    displayName: '',
    phone: '',
    mobile: '',
    role: '',
  },
  commmentCount: 0,
  commentPopup: {
    isOpen: false,
    key: 0,
  },
  ownerPopup: {
    isOpen: false,
    key: 0,
    activityId: 0,
    name: '',
  },
  noticeNewEmail: false,
  activityOwnerLayer: { layerOpen: false, isList: false },
  activityOwnerGroup: [],
  isSelectedAllActionId: false,
  tagPopup: {
    isOpen: false,
    title: '',
    type: '',
    selectedKey: 'add',
    tagList: [],
    targetIdList: [],
  },
  isTagButton: false,
  isLimitFilter: 0,
}

const searchActivitySlice = createSlice({
  name: 'searchActivitySlice',
  initialState,
  reducers: {
    isLimitFilterAction: (state, action: PayloadAction<number>) => {
      state.isLimitFilter = action.payload
    },
    tagPopupAction: (state, action: PayloadAction<tagPopupProps>) => {
      state.tagPopup = action.payload
    },
    doneTagAction: state => {
      state.searchContentKeyList = []
      state.tagPopup = {
        isOpen: false,
        title: '',
        type: '',
        selectedKey: 'add',
        tagList: [],
        targetIdList: [],
      }
    },
    initTagPopupAction: state => {
      state.tagPopup = {
        isOpen: false,
        title: '',
        type: '',
        selectedKey: 'add',
        tagList: [],
        targetIdList: [],
      }
    },
    isSelectedAllActionIdAction: (state, action: PayloadAction<boolean>) => {
      state.isSelectedAllActionId = action.payload
    },
    editCommentAction: (state, action: PayloadAction<{ param: number; content: string }>) => {
      state.eidtComment = action.payload.param
      state.createComment = false
      state.contentsCommentText = action.payload.content
    },
    activityOwnerLayerAction: (state, action: PayloadAction<boolean>) => {
      state.activityOwnerLayer.layerOpen = action.payload
      state.activityOwnerLayer.isList = false
    },
    getActivityOwnerLayerAction: (state, action: PayloadAction<UserDtoForGroup[]>) => {
      state.activityOwnerGroup = action.payload
      state.activityOwnerLayer.isList = true
    },
    commentPopupAction: (state, action: PayloadAction<{ isOpen: boolean; key: number }>) => {
      state.commentPopup = action.payload
    },
    ownerPopupAction: (state, action: PayloadAction<ownerPopupProps>) => {
      state.ownerPopup = action.payload
    },
    ownerResetPopupAction: state => {
      state.ownerPopup = { isOpen: false, key: 0, name: '', activityId: 0 }
      state.noticeNewActivity = true
    },
    contentsCommentTextAction: (state, action: PayloadAction<string>) => {
      state.contentsCommentText = action.payload
    },
    commmentListAction: (state, action: PayloadAction<ActionCommentDto[]>) => {
      state.contentsCommentList = action.payload
      state.contentsCommentText = ''
      state.eidtComment = 0
      state.createComment = false
      state.commentPopup = {
        isOpen: false,
        key: 0,
      }
    },
    actionLogListAction: (state, action: PayloadAction<contentsActionLogListProps[]>) => {
      state.contentsActionLogList = action.payload
      state.contentsCommentText = ''
      state.eidtComment = 0
      state.createComment = false
      state.commentPopup = {
        isOpen: false,
        key: 0,
      }
    },
    userPopupAction: (state, action: PayloadAction<userPopupProps>) => {
      state.userPopup = action.payload
    },
    searchNaviLinksAction: (state, action: PayloadAction<NavigationLinkItem[]>) => {
      console.log(' action.payload', action.payload)
      state.searchNaviLinks = action.payload
    },
    getActionDataAction: (state, action: PayloadAction<getActionDataProps>) => {
      state.getActionData = action.payload
      state.loadingGetActionData = false
      state.contentsTabList = defaultContentsTabListData
    },
    initActionDataAction: state => {
      state.getActionData = null
      state.loadingGetActionData = false
      state.contentsTabList = []
      state.getActionDataKey = 0
    },
    contentsTabListAction: (state, action: PayloadAction<string>) => {
      state.contentsTab = action.payload
    },
    createCommentAction: (state, action: PayloadAction<boolean>) => {
      state.createComment = action.payload
      state.eidtComment = 0
      state.contentsCommentText = ''
    },
    searchContentKeyListAction: (state, action: PayloadAction<{ param: MbTagSearchTagItem[]; isTag: boolean }>) => {
      state.searchContentKeyList = action.payload.param
      state.isSelectedAllActionId = false
      state.isTagButton = action.payload.isTag
    },
    filterSearchDataAction: (state, action: PayloadAction<filterSearchDataProps>) => {
      state.filterSearchData = action.payload
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
    searchContentListButtonAction: (state, action: PayloadAction<boolean>) => {
      state.searchContentListButton = action.payload
    },
    activityOpenAction: (state, action: PayloadAction<boolean>) => {
      state.activityOpen = action.payload
    },
    actionListParamsAction: (state, action: PayloadAction<actionListParamsProps>) => {
      state.actionListParams = action.payload
    },
    filterLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.filterLoading = action.payload
    },
    noticeNewActivityAction: (state, action: PayloadAction<boolean>) => {
      state.noticeNewActivity = action.payload
    },
    reloadAction: state => {
      state.noticeNewEmail = false
      state.isInit = false
      state.noticeNewActivity = false
    },
    initListAction: (state, action: PayloadAction<{ item: initListProps; param: ActionListParams }>) => {
      if (action.payload.param.isCheckedReset && action.payload.param.isCheckedReset) {
        state.searchContentKeyList = []
      }
      state.noticeNewEmail = false
      state.isInit = false
      state.noticeNewActivity = false
      state.searchContentList = action.payload.item.searchContentList
      state.pageCount = action.payload.item.pageCount
      state.filterSearchData = {
        ...state.filterSearchData,
        category: {
          data:
            action.payload.param.categoryList && action.payload.param.categoryList.length > 0
              ? action.payload.param.categoryList
              : [],
          isOpen: action.payload.param.categoryOpen ? action.payload.param.categoryOpen : false,
        },
        state: {
          data:
            action.payload.param.state_filter && action.payload.param.state_filter.length > 0
              ? action.payload.param.state_filter
              : [],
          isOpen: action.payload.param.stateOpen ? action.payload.param.stateOpen : false,
        },
        owner: {
          text: action.payload.param.ownerText ? action.payload.param.ownerText : '',
          data:
            action.payload.param.ownerIdList && action.payload.param.ownerIdList.length > 0
              ? action.payload.param.ownerIdList
              : [],
          isOpen: action.payload.param.ownerOpen ? action.payload.param.ownerOpen : false,
        },
        media: {
          text: action.payload.param.mediaText ? action.payload.param.mediaText : '',
          data:
            action.payload.param.mediaIdList && action.payload.param.mediaIdList.length > 0
              ? action.payload.param.mediaIdList
              : [],
          isOpen: action.payload.param.mediaOpen ? action.payload.param.mediaOpen : false,
        },
        tag: {
          text: action.payload.param.tagText ? action.payload.param.tagText : '',
          data:
            action.payload.param.tagIdList && action.payload.param.tagIdList.length > 0
              ? action.payload.param.tagIdList
              : [],
          isOpen: action.payload.param.tagOpen ? action.payload.param.tagOpen : false,
        },
        date: {
          fromDate: action.payload.param.periodStart ? action.payload.param.periodStart : null,
          endDate: action.payload.param.periodEnd ? action.payload.param.periodEnd : null,
          isOpen: action.payload.param.periodOpen ? action.payload.param.periodOpen : false,
        },
      }
      state.actionListParams = {
        title: action.payload.param.title ? action.payload.param.title : state.actionListParams.title,
        page: action.payload.param.page ? action.payload.param.page : state.actionListParams.page,
        size: action.payload.param.size ? action.payload.param.size : state.actionListParams.size,
        sort: action.payload.param.sort ? action.payload.param.sort : state.actionListParams.sort,
      }
      state.getActionDataKey =
        action.payload.item.searchContentList && action.payload.item.searchContentList.length > 0
          ? action.payload.item.searchContentList[0].actionId
            ? action.payload.param.activity_id
              ? Number(action.payload.param.activity_id)
              : Number(action.payload.item.searchContentList[0].actionId)
            : 0
          : 0
      state.commmentCount =
        action.payload.item.searchContentList && action.payload.item.searchContentList.length > 0
          ? action.payload.item.searchContentList[0].actionId
            ? Number(action.payload.item.searchContentList[0].commentCount)
            : 0
          : 0
      console.log(
        'action.payload.item.searchContentList[0].category',
        action.payload.item.searchContentList[0].category
      )
      state.contentsTab =
        action.payload.item.searchContentList &&
        action.payload.item.searchContentList.length > 0 &&
        action.payload.item.searchContentList[0].category !== 'PRESS_RELEASE' &&
        action.payload.item.searchContentList[0].category !== 'MAILING'
          ? 'comment'
          : ''
    },
    searchContentListAction: (state, action: PayloadAction<initListProps>) => {
      state.searchContentList = action.payload.searchContentList
      state.pageCount = action.payload.pageCount
    },
    getActionDataKeyAction: (state, action: PayloadAction<{ key: number; count: number; category: string }>) => {
      state.getActionDataKey = action.payload.key
      state.commmentCount = action.payload.count
      state.contentsTab =
        action.payload.category !== 'PRESS_RELEASE' && action.payload.category !== 'MAILING' ? 'comment' : ''
    },
    pageCountAction: (state, action: PayloadAction<initListProps>) => {
      state.pageCount = action.payload.pageCount
    },
    searchContentLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.searchContentLoading = action.payload
    },
    setFilterTagAction: (state, action: PayloadAction<string>) => {
      state.filterSearchData.tag.data = [action.payload]
      state.filterSearchData.tag.isOpen = true
    },
    noticeNewEmailAction: (state, action: PayloadAction<boolean>) => {
      state.noticeNewEmail = action.payload
    },
    setFilterSubParamActions: (state, action: PayloadAction<filterSubParamActionsProps[]>) => {
      state.filterSubParamActions = action.payload
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
      }>
    ) => {
      state.filterSubParamActions = action.payload.filterSubActions
      state.filterSubParam = action.payload.filterSubParam
      state.pageCount = action.payload.pageCount
      state.apiParams = action.payload.apiParams
      state.activityId = action.payload.activityId
      state.activityList = action.payload.activityList
    },
    initAction: state => {
      Object.assign(state, initialState)
    },
  },
})

export const {
  reloadAction,
  noticeNewEmailAction,
  activityOpenAction,
  searchNaviLinksAction,
  filterSearchDataAction,
  actionListParamsAction,
  filterLoadingAction,
  searchContentListButtonAction,
  initListAction,
  commonCodeCategoryAction,
  commonCodeStateFilterAction,
  commonCodeStateAction,
  pageCountAction,
  searchContentListAction,
  searchContentKeyListAction,
  noticeNewActivityAction,
  searchContentLoadingAction,
  contentsTabListAction,
  createCommentAction,
  setFilterTagAction,
  getActionDataAction,
  getActionDataKeyAction,
  initAction,
  userPopupAction,
  commmentListAction,
  contentsCommentTextAction,
  commentPopupAction,
  editCommentAction,
  actionLogListAction,
  commonCodeWorkTypeAction,
  activityOwnerLayerAction,
  getActivityOwnerLayerAction,
  ownerPopupAction,
  initActionDataAction,
  isSelectedAllActionIdAction,
  ownerResetPopupAction,
  tagPopupAction,
  initTagPopupAction,
  doneTagAction,
  isLimitFilterAction,

  setActivityInitDataAction,
  setFilterSubParamActions,
} = searchActivitySlice.actions
export default searchActivitySlice.reducer
