import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { GroupDtoForUser } from '~/types/api/service'
import { type MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'

export type Props = {
  commonParentCode: string
  step: string
  registerType: string
  emailData: emailDataProps
  emailDataLoading: boolean
  emailDataChecked: boolean
  authDataLoading: boolean
  authType: string
  originGroupList: Array<MbTagSearchTagItem & { isDefalt?: boolean }>
  groupItemList: MbTagSearchTagItem[]
  groupErr: string
  excelIdList: string[]
}

export type excelListProps = {
  id: string
  email: string
  date: string
  link?: string
  media?: string
  author?: string
}

export type emailDataProps = {
  targetEmail: MbTagSearchTagItem[]
  emailErr: string
  email: string
  excelList: excelListProps[]
  execelIdList: string[]
  excelFileList: MbTagSearchTagItem[]
}

// 초기값
export const initialState: Props = {
  commonParentCode: '',
  step: '',
  registerType: '',
  emailData: {
    targetEmail: [],
    emailErr: '',
    email: '',
    excelList: [],
    execelIdList: [],
    excelFileList: [],
  },
  excelIdList: [],
  authType: 'USER',
  originGroupList: [],
  groupItemList: [],
  groupErr: '',
  emailDataChecked: false,
  emailDataLoading: false,
  authDataLoading: false,
}

const addUserSlice = createSlice({
  name: 'addUserSlice',
  initialState,
  reducers: {
    initStepAction: state => {
      console.log('initStepAction')
      state.step = ''
      state.registerType = ''
      state.emailData = {
        targetEmail: [],
        emailErr: '',
        email: '',
        excelList: [],
        execelIdList: [],
        excelFileList: [],
      }
      state.excelIdList = []
      state.authType = 'USER'
      state.originGroupList = []
      state.groupItemList = []
      state.groupErr = ''
      state.emailDataChecked = false
      state.emailDataLoading = false
      state.authDataLoading = false
    },
    excelIdListAction: (state, action: PayloadAction<string[]>) => {
      state.excelIdList = action.payload
    },
    startStepAction: (state, action: PayloadAction<{ step: string; registerType: string; group: GroupDtoForUser }>) => {
      state.step = action.payload.step
      state.registerType = action.payload.registerType
      state.groupItemList = [
        {
          id: action.payload?.group?.groupId?.toString() || '',
          label: action.payload?.group?.name || '',
          isDefault: true,
        },
      ]
      state.emailData = {
        targetEmail: [],
        emailErr: '',
        email: '',
        excelList: [],
        execelIdList: [],
        excelFileList: [],
      }
      state.excelIdList = []
      state.authType = 'USER'
      state.originGroupList = []
      state.groupErr = ''
      state.emailDataChecked = false
      state.emailDataLoading = false
      state.authDataLoading = false
    },
    stepAction: (state, action: PayloadAction<{ step: string; registerType: string; group: GroupDtoForUser }>) => {
      state.step = action.payload.step
      state.registerType = action.payload.registerType
      state.groupItemList = [
        {
          id: action.payload?.group?.groupId?.toString() || '',
          label: action.payload?.group?.name || '',
          isDefault: true,
        },
      ]
    },
    groupErrAction: (state, action: PayloadAction<string>) => {
      state.groupErr = action.payload
    },
    groupListAction: (state, action: PayloadAction<MbTagSearchTagItem[]>) => {
      state.groupItemList = action.payload
    },
    authTypeAction: (state, action: PayloadAction<string>) => {
      state.authType = action.payload
    },
    emailDataAction: (state, action: PayloadAction<emailDataProps>) => {
      if (action.payload.targetEmail.length > 0) {
        state.emailDataChecked = true
      } else state.emailDataChecked = action.payload.excelList.length > 0
      state.emailData = action.payload
      state.emailDataLoading = false
      console.log('action.payload', action.payload)
      console.log('state.emailData', state.emailData)
      console.log('state.emailDataChecked', state.emailDataChecked)
      console.log('state.emailDataLoading', state.emailDataLoading)
    },
    emailDataLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.emailDataLoading = action.payload
    },
    authDataLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.authDataLoading = action.payload
    },
    deleteEmailDataAction: (state, action: PayloadAction<emailDataProps>) => {
      console.log('deleteEmailDataAction', action.payload)
      state.emailData = action.payload
      state.emailDataLoading = false
      state.excelIdList = []
    },
  },
})

export const {
  groupErrAction,
  groupListAction,
  authTypeAction,
  initStepAction,
  emailDataLoadingAction,
  stepAction,
  emailDataAction,
  authDataLoadingAction,
  excelIdListAction,
  deleteEmailDataAction,
  startStepAction,
} = addUserSlice.actions
export default addUserSlice.reducer
