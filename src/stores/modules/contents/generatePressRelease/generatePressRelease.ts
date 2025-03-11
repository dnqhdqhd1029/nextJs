import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SelectListOptionItem } from '~/types/common'

export type requestDataProps = {
  product: string
  productErr: string
  message: string
  messageErr: string
  tone: string
  audience: string
  language: SelectListOptionItem
}

export type responseDataProps = {
  content: string
}

export interface Props {
  requestData: requestDataProps
  responseData: responseDataProps
}

// 초기값
export const initialState: Props = {
  requestData: {
    product: '',
    productErr: '',
    message: '',
    messageErr: '',
    tone: '',
    audience: '',
    language: { id: 'ko', name: '한국어' },
  },
  responseData: {
    content: '',
  },
}

const generatePressReleaseSlice = createSlice({
  name: 'generatePressReleaseSlice',
  initialState,
  reducers: {
    requestDataAction: (state, action: PayloadAction<requestDataProps>) => {
      state.requestData = action.payload
    },
    responseDataAction: (state, action: PayloadAction<responseDataProps>) => {
      state.responseData = action.payload
    },
  },
})

export const { requestDataAction, responseDataAction } = generatePressReleaseSlice.actions
export default generatePressReleaseSlice.reducer
