import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  defaultContentsTabListData,
  defaultNewsWireContentsTabListData,
  defaultReleaseContentsTabListData,
} from '~/components/contents/activity/common/defaultData'
import {
  ActionCommentDto,
  ActionDto,
  ActionLogDto,
  TagDto,
  UserDtoForGroup,
  type UserDtoForSimple,
} from '~/types/api/service'
import { SelectListOptionItem, StepItem } from '~/types/common'
import { UseGetActionMailReceiverParams } from '~/utils/api/actionMailReceiver/useActionMailReceiver'
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

export interface getActionDataProps extends ActionDto {
  categoryName?: string
  stateName?: string
  shareCodeNm?: string
  commentCount: number
}

export interface ownerPopupProps {
  isOpen: boolean
  key: number
  name: string
  activityId: number
  userData?: UserDtoForGroup
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
  workFieldNm?: string
}

export type templatePopupProps = {
  isOpen: boolean
  value: string
  valueErr: string
  content: string
}

export type contentsActionStatusDetailProps = {
  failCount: number
  successCount: number
  openCount: number
  totalCount: number
  rejectCount: number
}

export type Props = {
  contentsTabList: StepItem[]
  contentsTab: string
  getActionData: null | getActionDataProps
  userPopup: userPopupProps
  commentPopup: {
    isOpen: boolean
    key: number
  }
  contentsCommentText: string
  contentsCommentErrorText: string
  contentsCommentList: ActionCommentDto[]
  contentsActionLogList: contentsActionLogListProps[]
  createComment: boolean
  eidtComment: number
  getActionDataKey: number
  commonCodeCategory: CommonCode[]
  commonCodeState: CommonCode[]
  commonCodeStateFilter: CommonCode[]
  commonCodeUpdateFieldName: CommonCode[]
  commonCodeWorkType: CommonCode[]
  isWorkListOpen: boolean
  actionDelete: {
    isOpen: boolean
    key: number
    target: string
  }
  ownerPopup: ownerPopupProps
  activityOwnerLayer: {
    layerOpen: boolean
    isList: boolean
  }
  activityOwnerGroup: UserDtoForGroup[]
  noticeNewActivity: boolean
  activityRecordWorkList: SelectListOptionItem[]
  templatePopup: templatePopupProps
  getActionDataLoading: boolean
  noticeNewEmail: boolean
  contentsActionStatusList: UseGetActionMailReceiverParams[]
  contentsActionStatusDetail: contentsActionStatusDetailProps
}

// 초기값
export const initialState: Props = {
  commonCodeCategory: [],
  commonCodeState: [],
  commonCodeStateFilter: [],
  commonCodeUpdateFieldName: [],
  commonCodeWorkType: [],
  getActionDataKey: 0,
  contentsTabList: [],
  contentsTab: '',
  contentsCommentList: [],
  contentsActionLogList: [],
  contentsCommentText: '',
  contentsCommentErrorText: '',
  createComment: false,
  eidtComment: 0,
  getActionData: null,
  userPopup: {
    isOpen: false,
    email: '',
    keyValue: 0,
    displayName: '',
    phone: '',
    mobile: '',
    role: '',
  },
  commentPopup: {
    isOpen: false,
    key: 0,
  },
  isWorkListOpen: false,
  actionDelete: {
    isOpen: false,
    key: 0,
    target: '',
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
  noticeNewActivity: false,
  activityRecordWorkList: [],
  templatePopup: {
    isOpen: false,
    value: '',
    valueErr: '',
    content: '',
  },
  contentsActionStatusList: [],
  contentsActionStatusDetail: {
    failCount: 0,
    successCount: 0,
    openCount: 0,
    totalCount: 0,
    rejectCount: 0,
  },
  getActionDataLoading: false,
}

const recordActivitySlice = createSlice({
  name: 'recordActivitySlice',
  initialState,
  reducers: {
    templatePopupAction: (state, action: PayloadAction<templatePopupProps>) => {
      state.templatePopup = action.payload
    },
    noticeRecordNewActivityAction: (state, action: PayloadAction<boolean>) => {
      state.noticeNewActivity = action.payload
    },
    noticeRecordNewEmailAction: (state, action: PayloadAction<boolean>) => {
      state.noticeNewEmail = action.payload
    },
    activityOwnerLayerAction: (state, action: PayloadAction<boolean>) => {
      state.activityOwnerLayer.layerOpen = action.payload
      state.activityOwnerLayer.isList = false
    },
    getActivityOwnerLayerAction: (state, action: PayloadAction<UserDtoForGroup[]>) => {
      state.activityOwnerGroup = action.payload
      state.activityOwnerLayer.isList = true
    },
    ownerPopupAction: (state, action: PayloadAction<ownerPopupProps>) => {
      state.ownerPopup = action.payload
    },
    actionDeleteAction: (state, action: PayloadAction<{ isOpen: boolean; target: string; key: number }>) => {
      state.actionDelete = {
        isOpen: action.payload.isOpen,
        key: action.payload.key,
        target: action.payload.target,
      }
    },
    editCommentAction: (state, action: PayloadAction<{ param: number; content: string }>) => {
      state.eidtComment = action.payload.param
      state.createComment = false
      state.contentsCommentErrorText = ''
      state.contentsCommentText = action.payload.content
    },
    isWorkListOpenAction: (state, action: PayloadAction<boolean>) => {
      state.isWorkListOpen = action.payload
    },
    getActionDataLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.getActionDataLoading = action.payload
    },
    getActionDataJustOnChangeAction: (state, action: PayloadAction<getActionDataProps | null>) => {
      state.getActionData = action.payload
    },
    commmentListJustOnChangeAction: (state, action: PayloadAction<ActionCommentDto[]>) => {
      state.contentsCommentList = action.payload
      state.contentsCommentText = ''
      state.eidtComment = 0
      state.commentPopup = {
        isOpen: false,
        key: 0,
      }
    },
    actionLogListJustOnChangeAction: (state, action: PayloadAction<contentsActionLogListProps[]>) => {
      state.contentsActionLogList = action.payload
    },
    commentPopupAction: (state, action: PayloadAction<{ isOpen: boolean; key: number }>) => {
      state.commentPopup = action.payload
    },
    contentsCommentTextAction: (state, action: PayloadAction<{ err: string; content: string }>) => {
      state.contentsCommentErrorText = action.payload.err
      state.contentsCommentText = action.payload.content
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
    commonCodeUpdateFieldNameAction: (state, action: PayloadAction<CommonCode[]>) => {
      state.commonCodeUpdateFieldName = action.payload
    },
    commmentListAction: (state, action: PayloadAction<ActionCommentDto[]>) => {
      state.contentsCommentList = action.payload
      state.contentsCommentText = ''
      state.contentsCommentErrorText = ''
      state.eidtComment = 0
      state.createComment = false
      if (state.getActionData && state.getActionData.commentCount) {
        state.getActionData.commentCount = action.payload.length
      }
      state.commentPopup = {
        isOpen: false,
        key: 0,
      }
    },
    actionLogListAction: (state, action: PayloadAction<contentsActionLogListProps[]>) => {
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
    actionStatusListAction: (state, action: PayloadAction<UseGetActionMailReceiverParams[]>) => {
      state.contentsActionStatusList = action.payload
      state.contentsCommentText = ''
      state.contentsCommentErrorText = ''
      state.eidtComment = 0
      state.createComment = false
      state.commentPopup = {
        isOpen: false,
        key: 0,
      }
    },
    actionStatusDetailListAction: (state, action: PayloadAction<contentsActionStatusDetailProps>) => {
      state.contentsActionStatusDetail = action.payload
    },
    userPopupAction: (state, action: PayloadAction<userPopupProps>) => {
      state.userPopup = action.payload
    },
    getActionDataAction: (
      state,
      action: PayloadAction<{
        category: string
        buttonList: SelectListOptionItem[]
        params: getActionDataProps | null
        state: string
      }>
    ) => {
      state.activityRecordWorkList = action.payload.buttonList
      if (action.payload.params) {
        state.getActionData = action.payload.params
      }
      if (
        action.payload.category !== 'PRESS_RELEASE' &&
        action.payload.category !== 'MAILING' &&
        action.payload.category !== 'NEWSWIRE_RELEASE'
      ) {
        state.contentsTabList = defaultContentsTabListData
      } else {
        // @ts-ignore
        if (action.payload.category === 'NEWSWIRE_RELEASE') {
          state.contentsTabList = defaultNewsWireContentsTabListData
        } else {
          if (action.payload.state === 'FIN_COMPLETE_SENDING') {
            state.contentsTabList = defaultReleaseContentsTabListData
          } else {
            state.contentsTabList = defaultContentsTabListData
          }
        }
      }
      state.contentsTab = 'content'
    },
    setActionDataFromOtherAction: (
      state,
      action: PayloadAction<{
        category: string
        buttonList: SelectListOptionItem[]
        params: getActionDataProps | null
        state: string
      }>
    ) => {
      state.activityRecordWorkList = action.payload.buttonList
      if (action.payload.params) {
        state.getActionData = action.payload.params
      }
      if (action.payload.category !== 'PRESS_RELEASE' && action.payload.category !== 'MAILING') {
        state.contentsTabList = defaultContentsTabListData
      } else {
        // @ts-ignore
        if (action.payload.category === 'NEWSWIRE_RELEASE') {
          state.contentsTabList = defaultContentsTabListData
        } else {
          if (action.payload.state === 'FIN_COMPLETE_SENDING') {
            state.contentsTabList = defaultReleaseContentsTabListData
          } else {
            state.contentsTabList = defaultContentsTabListData
          }
        }
      }
    },
    contentsTabListAction: (state, action: PayloadAction<string>) => {
      state.contentsTab = action.payload
    },
    createCommentAction: (state, action: PayloadAction<boolean>) => {
      state.createComment = action.payload
      state.eidtComment = 0
      state.contentsCommentText = ''
      state.contentsCommentErrorText = ''
    },
    initRecordActivity: (state, action: PayloadAction<number>) => {
      state.commonCodeCategory = []
      state.commonCodeState = []
      state.commonCodeStateFilter = []
      state.commonCodeUpdateFieldName = []
      state.commonCodeWorkType = []
      state.getActionDataKey = action.payload
      state.contentsTabList = []
      state.contentsTab = ''
      state.contentsCommentList = []
      state.contentsActionLogList = []
      state.contentsCommentText = ''
      state.contentsCommentErrorText = ''
      state.createComment = false
      state.eidtComment = 0
      state.getActionData = null
      state.userPopup = {
        isOpen: false,
        email: '',
        keyValue: 0,
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
      }
      state.commentPopup = {
        isOpen: false,
        key: 0,
      }
    },
    initAction: state => {
      Object.assign(state, initialState)
    },
  },
})

export const {
  actionStatusListAction,
  noticeRecordNewEmailAction,
  activityOwnerLayerAction,
  getActivityOwnerLayerAction,
  ownerPopupAction,
  contentsTabListAction,
  createCommentAction,
  getActionDataAction,
  initAction,
  userPopupAction,
  commmentListAction,
  contentsCommentTextAction,
  commentPopupAction,
  editCommentAction,
  actionLogListAction,
  commonCodeCategoryAction,
  commonCodeWorkTypeAction,
  commonCodeStateAction,
  commonCodeStateFilterAction,
  initRecordActivity,
  isWorkListOpenAction,
  actionDeleteAction,
  noticeRecordNewActivityAction,
  templatePopupAction,
  actionStatusDetailListAction,
  commonCodeUpdateFieldNameAction,
  getActionDataLoadingAction,
  getActionDataJustOnChangeAction,
  commmentListJustOnChangeAction,
  actionLogListJustOnChangeAction,
  setActionDataFromOtherAction,
} = recordActivitySlice.actions
export default recordActivitySlice.reducer
