import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { MbTagSearchTagItem, ShareItem } from '~/types/contents/Common'

export type userAutoSaveDataProps = {
  groupId: number
  keyValue: number
  keyName: string
}

export type pressReleaseDataProps = {
  journalistId: MbTagSearchTagItem[]
  mediaId: MbTagSearchTagItem[]
  jrnlstListId: MbTagSearchTagItem[]
  mediaListId: MbTagSearchTagItem[]
  targetRelease: MbTagSearchTagItem[]
}

export type Props = {
  sagaState: any
  pressReleaseData: pressReleaseDataProps
  newsDuplicationIdList: number[]
  mediaDuplicationIdList: number[]
  pressDuplicationIdList: number[]
  userPressListAutoSaveData: userAutoSaveDataProps[]
  userMediaListAutoSaveData: userAutoSaveDataProps[]
  userClipbookListAutoSaveData: userAutoSaveDataProps[]
}

// 초기값
export const initialState: Props = {
  sagaState: '',
  pressReleaseData: {
    journalistId: [],
    mediaId: [],
    jrnlstListId: [],
    mediaListId: [],
    targetRelease: [],
  },
  newsDuplicationIdList: [],
  mediaDuplicationIdList: [],
  pressDuplicationIdList: [],
  userPressListAutoSaveData: [],
  userMediaListAutoSaveData: [],
  userClipbookListAutoSaveData: [],
}

const extraSlice = createSlice({
  name: 'extraSlice',
  initialState,
  reducers: {
    mediaDuplicationIdListSaga: (state, action: PayloadAction<number[]>) => {
      state.sagaState = action.payload
    },
    pressDuplicationIdListSaga: (state, action: PayloadAction<number[]>) => {
      state.sagaState = action.payload
    },
    newsDuplicationIdListSaga: (state, action: PayloadAction<number[]>) => {
      state.sagaState = action.payload
    },
    pressReleaseDataExtraAction: (state, action: PayloadAction<pressReleaseDataProps>) => {
      state.pressReleaseData = action.payload
    },
    newsDuplicationIdListAction: (state, action: PayloadAction<number[]>) => {
      state.newsDuplicationIdList = action.payload
    },
    mediaDuplicationIdListAction: (state, action: PayloadAction<number[]>) => {
      state.mediaDuplicationIdList = action.payload
    },
    pressDuplicationIdListAction: (state, action: PayloadAction<number[]>) => {
      state.pressDuplicationIdList = action.payload
    },
    userPressListAutoSaveDataAction: (state, action: PayloadAction<userAutoSaveDataProps[]>) => {
      state.userPressListAutoSaveData = action.payload
    },
    userMediaListAutoSaveDataAction: (state, action: PayloadAction<userAutoSaveDataProps[]>) => {
      state.userMediaListAutoSaveData = action.payload
    },
    userClipbookListAutoSaveDataAction: (state, action: PayloadAction<userAutoSaveDataProps[]>) => {
      console.log('action.payload', action.payload)
      state.userClipbookListAutoSaveData = action.payload
    },
    userAutoSaveDataInitAction: state => {
      state.userClipbookListAutoSaveData = []
      state.userPressListAutoSaveData = []
      state.userPressListAutoSaveData = []
    },
  },
})

export const {
  userAutoSaveDataInitAction,
  userPressListAutoSaveDataAction,
  userMediaListAutoSaveDataAction,
  userClipbookListAutoSaveDataAction,
  pressReleaseDataExtraAction,
  mediaDuplicationIdListSaga,
  pressDuplicationIdListSaga,
  mediaDuplicationIdListAction,
  newsDuplicationIdListAction,
  newsDuplicationIdListSaga,
  pressDuplicationIdListAction,
} = extraSlice.actions
export default extraSlice.reducer
