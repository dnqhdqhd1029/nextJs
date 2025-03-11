import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { type SelectListOptionItem } from '~/types/common'
import { FileType } from '~/utils/hooks/common/useFileDragAndDrop'

export type Props = {
  itemType: string
  itemKey: string
  selectedList: SelectListOptionItem[]
  selectedValue: SelectListOptionItem
  popupTypes: PopupTypesProps
  servicePopup: boolean
  itemList: itemListProps[]
}

export type itemListProps = {
  count: number
  price: number
  computedPrice: number
}

export type PopupTypesProps = {
  isOpen: boolean
  type: string
  selectedList: SelectListOptionItem[]
  selectedValue: SelectListOptionItem
  titleErr: string
  title: string
  contents: string
  contentsErr: string
  filesList: FileType[]
}
// 초기값
export const initialState: Props = {
  itemType: '',
  itemKey: '',
  popupTypes: {
    isOpen: false,
    type: '',
    selectedList: [],
    selectedValue: { id: '', name: '' },
    titleErr: '',
    title: '',
    contents: '',
    contentsErr: '',
    filesList: [],
  },
  itemList: [],
  servicePopup: false,
  selectedList: [],
  selectedValue: { id: '', name: '' },
}

const additionalServicesSlice = createSlice({
  name: 'additionalServicesSlice',
  initialState,
  reducers: {
    selectedAction: (state, action: PayloadAction<{ item: SelectListOptionItem; list: SelectListOptionItem[] }>) => {
      state.selectedValue = action.payload.item
      state.selectedList = action.payload.list
    },
    selectedValueAction: (state, action: PayloadAction<SelectListOptionItem>) => {
      state.selectedValue = action.payload
      state.itemType = ''
      state.itemKey = ''
    },
    itemListAction: (state, action: PayloadAction<itemListProps[]>) => {
      state.itemList = action.payload
    },
    popupTypesAction: (state, action: PayloadAction<PopupTypesProps>) => {
      state.popupTypes = action.payload
    },
    servicePopupAction: (state, action: PayloadAction<boolean>) => {
      state.servicePopup = action.payload
    },
    itemTypeAction: (state, action: PayloadAction<{ itemType: string; itemKey: string }>) => {
      state.itemType = action.payload.itemType
      state.itemKey = action.payload.itemKey
    },
    initPopupTypesAction: state => {
      state.popupTypes = {
        isOpen: false,
        type: '',
        selectedList: state.popupTypes.selectedList,
        selectedValue: { id: '', name: '' },
        titleErr: '',
        title: '',
        contents: '',
        contentsErr: '',
        filesList: [],
      }
    },
  },
})

export const {
  selectedValueAction,
  selectedAction,
  initPopupTypesAction,
  itemTypeAction,
  popupTypesAction,
  servicePopupAction,
  itemListAction,
} = additionalServicesSlice.actions
export default additionalServicesSlice.reducer
