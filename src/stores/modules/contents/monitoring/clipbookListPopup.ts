import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { clipbookContentListProps } from '~/stores/modules/contents/monitoring/clipbook'
import { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'

export type clipbookDataListProps = {
  id: number
  name: string
}

export type clipbookListPageProps = {
  isOpen: boolean
  name: string
  type: string
  nameErr: string
  clipbookIdList: number[]
  clipbookDataList: clipbookDataListProps[]
  origin: number[]
  except: number[]
  isActive: boolean
  delClipbookIdList: number[]
  newsIdList: MonitoringSearchNewsDocumentDto[]
}

export type Props = {
  clipbookListPage: clipbookListPageProps
  clipbookContentList: clipbookContentListProps[]
}

// 초기값
export const initialState: Props = {
  clipbookListPage: {
    isOpen: false,
    type: 'any',
    name: '',
    nameErr: '',
    except: [],
    origin: [],
    clipbookDataList: [],
    isActive: false,
    clipbookIdList: [],
    delClipbookIdList: [],
    newsIdList: [],
  },
  clipbookContentList: [],
}

const clipbookListPopupSlice = createSlice({
  name: 'clipbookListPopupSlice',
  initialState,
  reducers: {
    clipbookPopupAction: (state, action: PayloadAction<clipbookListPageProps>) => {
      state.clipbookListPage = action.payload
    },
    clipbookContentListAction: (state, action: PayloadAction<clipbookContentListProps[]>) => {
      state.clipbookContentList = action.payload
    },
    initClipbookPopupAction: (
      state,
      action: PayloadAction<{
        isOpen: boolean
        type: string
        list: number[]
        origin: number[]
        except: number[]
        idList: MonitoringSearchNewsDocumentDto[]
      }>
    ) => {
      state.clipbookListPage = {
        isOpen: action.payload.isOpen,
        name: '',
        type: action.payload.type,
        nameErr: '',
        clipbookDataList: [],
        isActive: false,
        except: action.payload.except,
        origin: action.payload.origin,
        clipbookIdList: action.payload.list,
        delClipbookIdList: [],
        newsIdList: action.payload.idList,
      }
    },
    initStateClipbookListPopup: state => {
      state.clipbookListPage = {
        isOpen: false,
        type: 'any',
        name: '',
        nameErr: '',
        clipbookDataList: [],
        except: [],
        origin: [],
        isActive: false,
        clipbookIdList: [],
        delClipbookIdList: [],
        newsIdList: [],
      }
      state.clipbookContentList = []
    },
  },
})

export const { initStateClipbookListPopup, clipbookPopupAction, clipbookContentListAction, initClipbookPopupAction } =
  clipbookListPopupSlice.actions
export default clipbookListPopupSlice.reducer
