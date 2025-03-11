import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment/moment'

import { extendedShareScopeList } from '~/components/contents/activity/common/defaultData'
import { FileType } from '~/stores/modules/contents/email/email'
import { companyInfoDataProps } from '~/stores/modules/contents/setting/setting'
import type { UserDtoForGroup } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'

export interface activityType {
  isLoading: boolean
  isOpen: boolean
  key: number
  activityTypeMsg?: string
  activityType: SelectListOptionItem
  activityTypeList: SelectListOptionItem[]
  content: string
  getEditorContentString: string
  receivedEditorContent: string
  contentErrorMessage: string
  title: string
  titleErr: string
  activityState: SelectListOptionItem
  activityStateList: SelectListOptionItem[]
  selectedTime: { hours: number; minutes: number }
  selectedDate: Date
  dateErrorMessage: string
  scrop: SelectListOptionItem
  recipientErr: string
  receiverGroup: string
  tagPressList: MbTagSearchTagItem[]
  tagList: MbTagSearchTagItem[]
  filesList: FileType[]
  deletefilesList: number[]
  ownerGroupList: SelectListOptionItem[]
  ownerChangedkey: SelectListOptionItem
}

export type Props = {
  sagaState: any
  activity: activityType
  isEditor: boolean
  editorData: string
  filesListLoading: boolean
  ownerId: number
  isWrite: boolean
  activityCancelPopup: boolean
}

// 초기값
export const initialState: Props = {
  sagaState: '',
  activity: {
    isLoading: true,
    isOpen: false,
    key: 0,
    activityType: { id: '', name: '' },
    activityTypeList: [],
    content: '',
    contentErrorMessage: '',
    getEditorContentString: '',
    receivedEditorContent: '',
    title: '',
    titleErr: '',
    activityState: { id: '', name: '' },
    activityStateList: [],
    selectedTime: { hours: 0, minutes: 0 },
    selectedDate: new Date(),
    dateErrorMessage: '',
    scrop: extendedShareScopeList[0],
    recipientErr: '',
    receiverGroup: 'press',
    tagPressList: [],
    tagList: [],
    filesList: [],
    deletefilesList: [],
    ownerGroupList: [],
    ownerChangedkey: { id: '', name: '' },
  },
  editorData: ``,
  filesListLoading: false,
  isEditor: false,
  ownerId: 0,
  isWrite: false,
  activityCancelPopup: false,
}

const activityPopupSlice = createSlice({
  name: 'activityPopupSlice',
  initialState,
  reducers: {
    editActivitySaga: state => {
      state.sagaState = ''
    },
    createActivitySaga: state => {
      state.sagaState = ''
    },
    activityCancelPopupAction: (state, action: PayloadAction<boolean>) => {
      state.activityCancelPopup = action.payload
    },
    activityAction: (state, action: PayloadAction<activityType>) => {
      state.activity = action.payload
      state.isWrite = true
    },
    filesListLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.filesListLoading = false
    },
    editorDataAction: (state, action: PayloadAction<{ content: string; isEdit: boolean; err: string }>) => {
      state.editorData = action.payload.content
      state.activity.contentErrorMessage = action.payload.err
      state.isEditor = true
      state.isWrite = action.payload.content !== ''
    },
    filesListAction: (state, action: PayloadAction<activityType>) => {
      state.activity = action.payload
      state.filesListLoading = false
      state.isWrite = true
    },
    getActivityPopupAction: (state, action: PayloadAction<{ params: activityType; ownerId: number }>) => {
      state.activity.title = action.payload.params.title
      state.activity.activityStateList = action.payload.params.activityStateList
      state.activity.activityState = action.payload.params.activityState
      state.activity.selectedDate = action.payload.params.selectedDate
      state.activity.selectedTime = action.payload.params.selectedTime
      state.activity.scrop = action.payload.params.scrop
      state.activity.content = action.payload.params.content
      state.activity.receivedEditorContent = action.payload.params.receivedEditorContent
      state.activity.tagList = action.payload.params.tagList
      state.activity.receiverGroup = action.payload.params.receiverGroup
      state.activity.tagPressList = action.payload.params.tagPressList
      state.activity.filesList = action.payload.params.filesList
      state.activity.ownerGroupList = action.payload.params.ownerGroupList
      state.activity.ownerChangedkey = action.payload.params.ownerChangedkey
      state.editorData = action.payload.params.content
      state.isEditor = true
      state.ownerId = action.payload.ownerId
    },
    initActivityPopupAction: (
      state,
      action: PayloadAction<{
        keyValue: number
        isOpen: boolean
        loading: boolean
        type: SelectListOptionItem[]
        state: SelectListOptionItem[]
        typeValue: SelectListOptionItem
        scrop: SelectListOptionItem
        targetDataList?: MbTagSearchTagItem[]
        title?: string
        receiverGroup?: string
      }>
    ) => {
      state.activityCancelPopup = false
      state.isWrite = false
      state.ownerId = 0
      state.editorData = ``
      state.isEditor = false
      state.filesListLoading = false
      state.activity = {
        isLoading: action.payload.loading,
        isOpen: action.payload.isOpen,
        key: action.payload.keyValue,
        activityType: action.payload.typeValue,
        activityTypeList: action.payload.type,
        content: '',
        contentErrorMessage: '',
        getEditorContentString: '',
        receivedEditorContent: '',
        title: action.payload.title ? action.payload.title : '',
        titleErr: '',
        activityState: action.payload.state.length > 0 ? action.payload.state[0] : { id: '', name: '' },
        activityStateList: action.payload.state,
        selectedTime: { hours: Number(moment().format('HH')), minutes: Number(moment().format('mm')) },
        selectedDate: new Date(),
        dateErrorMessage: '',
        scrop: action.payload.scrop,
        recipientErr: '',
        receiverGroup: action.payload.receiverGroup ? action.payload.receiverGroup : 'press',
        tagPressList: action.payload.targetDataList ? action.payload.targetDataList : [],
        tagList: [],
        filesList: [],
        deletefilesList: [],
        ownerGroupList: [],
        ownerChangedkey: { id: '', name: '' },
        activityTypeMsg: '',
      }
    },
  },
})

export const {
  editActivitySaga,
  getActivityPopupAction,
  createActivitySaga,
  initActivityPopupAction,
  activityAction,
  editorDataAction,
  filesListAction,
  filesListLoadingAction,
  activityCancelPopupAction,
} = activityPopupSlice.actions
export default activityPopupSlice.reducer
