import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SelectListOptionItem } from '~/types/common'
import {
  ESearchJournalistDocumentDto,
  ESearchMediaDocumentDto,
  JournalistMediaGroupItem,
} from '~/types/contents/PressMedia'

export interface mediaContentListProps extends JournalistMediaGroupItem {
  isEdit: boolean
  isOwner: boolean
  settingList: SelectListOptionItem[]
  shareCodeNm: string
}

export type searchRegisterListProps = {
  id: number
  name: string
}

export type searchRegisterListPopupProps = {
  isOpen: boolean
  name: string
  kind: string
  type: string
  nameErr: string
  searchRegistList: searchRegisterListProps[]
  origin: number[]
  except: number[]
  isActive: boolean
  searchRegistIdList: number[]
  mediaIdList: ESearchMediaDocumentDto[]
  journalIdList: ESearchJournalistDocumentDto[]
}

interface Props {
  searchRegisterList: mediaContentListProps[]
  searchRegisterListPopup: searchRegisterListPopupProps
}
// 초기값
export const initialState: Props = {
  searchRegisterListPopup: {
    isOpen: false,
    kind: '',
    type: 'any',
    name: '',
    nameErr: '',
    isActive: false,
    searchRegistList: [],
    except: [],
    origin: [],
    searchRegistIdList: [],
    mediaIdList: [],
    journalIdList: [],
  },
  searchRegisterList: [],
}

const pressMediaListBookPopupSlice = createSlice({
  name: 'pressMediaListBookPopupSlice',
  initialState,
  reducers: {
    initPressMediaListBookPopupAction: state => {
      state.searchRegisterList = []
      state.searchRegisterListPopup = {
        isOpen: false,
        kind: '',
        type: 'any',
        searchRegistList: [],
        name: '',
        nameErr: '',
        isActive: false,
        except: [],
        origin: [],
        searchRegistIdList: [],
        mediaIdList: [],
        journalIdList: [],
      }
    },
    searchRegisterListAction: (state, action: PayloadAction<mediaContentListProps[]>) => {
      state.searchRegisterList = action.payload
    },
    searchRegisterListPopupAction: (state, action: PayloadAction<searchRegisterListPopupProps>) => {
      state.searchRegisterListPopup = action.payload
    },
    initSearchRegisterListPopupAction: (
      state,
      action: PayloadAction<{
        isOpen: boolean
        type: string
        kind: string
        list: number[]
        origin: number[]
        except: number[]
        mediaIdList: ESearchMediaDocumentDto[]
        journalIdList: ESearchJournalistDocumentDto[]
      }>
    ) => {
      state.searchRegisterListPopup = {
        isOpen: action.payload.isOpen,
        name: '',
        kind: action.payload.kind,
        type: action.payload.type,
        searchRegistList: [],
        isActive: false,
        nameErr: '',
        except: action.payload.except,
        origin: action.payload.origin,
        searchRegistIdList: action.payload.list,
        mediaIdList: action.payload.mediaIdList,
        journalIdList: action.payload.journalIdList,
      }
    },
  },
})

export const {
  searchRegisterListPopupAction,
  searchRegisterListAction,
  initSearchRegisterListPopupAction,
  initPressMediaListBookPopupAction,
} = pressMediaListBookPopupSlice.actions
export default pressMediaListBookPopupSlice.reducer
