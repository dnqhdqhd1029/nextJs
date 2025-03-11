import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { mediaInitParams } from '~/components/contents/pressMedia/MediaSearch/defaultData'
import { mediaLocationListProps } from '~/stores/modules/contents/pressMedia/pressSearch'
import { UserDtoForGroup } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'

export interface basicLocationPopupProps {
  isOpen: boolean
  type: string
  selectedValue: string
  selectedType: MbTagSearchTagItem[]
}

export interface IJournalistSearchFilter {
  [key: string]: Array<{ key: string; value: number }>
}

export interface pressMediaListDto {
  pressContent: pressMediaContentListProps[]
  mediaContent: pressMediaContentListProps[]
}
export interface mediaFieldListProps {
  name: string
  count: number
}

export interface basicFieldPopupProps {
  isOpen: boolean
  type: string
  selectedValue: string
  selectedType: MbTagSearchTagItem[]
}

export interface fieldListProps {
  name: string
  count: number
}

export interface mediaFieldPopupProps {
  isOpen: boolean
  type: string
  selectedValue: string
  selectedType: MbTagSearchTagItem[]
}

export interface pressMediaContentListProps {
  isOwner: boolean
  settingList: SelectListOptionItem[]
  shareCodeNm: string
  conditions: string
  title: string
  shareCode?: string
  contact_id: number
  shareTargetCode?: string
  owner?: UserDtoForGroup
  regisAt?: Date
  updateAt?: Date
  register?: UserDtoForGroup
  updater?: UserDtoForGroup
}

export interface mediaTypePopupProps {
  isOpen: boolean
  selectedValue: string
  selectedType: MbTagSearchTagItem[]
}

export interface mediaAdditionalParamProps {
  journalistTargetList: MbTagSearchTagItem[]
  portal: MbTagSearchTagItem[]
  languageParam: SelectListOptionItem
  isJournalist: SelectListOptionItem
  system: SelectListOptionItem
  limit: SelectListOptionItem
}

export interface searchRegisterPopupProps {
  isOpen: boolean
  type: string
  title: string
  titleErr: string
}

export interface mediaKeywordParamProps {
  mediaTagList: MbTagSearchTagItem[]
  mediaType: MbTagSearchTagItem[]
  mediaField: MbTagSearchTagItem[]
  mediaArea: MbTagSearchTagItem[]
  mediaGroupList: MbTagSearchTagItem[]
  publishingPeriod: MbTagSearchTagItem[]
  keyword: MbTagSearchTagItem[]
  keywordValue: string
  informationType: SelectListOptionItem
}

export interface mediaSearchOptionProps {
  keywordParam: mediaKeywordParamProps
  additionalParam: mediaAdditionalParamProps
}

export type Props = {
  categoryData: SelectListOptionItem
  pressMediaList: pressMediaListDto
  searchActivate: boolean
  pressMediaListOption: boolean

  industryList: string[]
  locationList: string[]
  filterDataList: IJournalistSearchFilter | null
  pubCycleList: SelectListOptionItem[]
  mediaValueList: SelectListOptionItem[]
  journalistOccupationList: SelectListOptionItem[]
  mediaTypeList: SelectListOptionItem[]
  journalistInfoTypeList: SelectListOptionItem[]
  languageList: SelectListOptionItem[]
  mediaCountList: SelectListOptionItem[]
  journalistBlockYNList: SelectListOptionItem[]
  journalistSocialFilterList: SelectListOptionItem[]
  portalList: SelectListOptionItem[]
  mediaNameRevealedYNList: SelectListOptionItem[]
  mediaBlockYNList: SelectListOptionItem[]
  mediaInfoTypeList: SelectListOptionItem[]
  mediaTypePopupList: CommonCode[]
  mediaFieldList: mediaFieldListProps[]
  mediaSearchOption: mediaSearchOptionProps
  mediaLocationList: mediaLocationListProps[]

  searchRegisterPopup: searchRegisterPopupProps
  mediaTypePopup: mediaTypePopupProps
  mediaFieldPopup: mediaFieldPopupProps
  mediaLocationPopup: basicLocationPopupProps
}
// 초기값
export const initialState: Props = {
  categoryData: { id: 'media', name: '매체 검색' },
  searchActivate: false,
  pressMediaListOption: false,

  pressMediaList: {
    pressContent: [],
    mediaContent: [],
  },

  mediaSearchOption: {
    keywordParam: {
      mediaTagList: [],
      mediaType: [],
      mediaField: [],
      mediaArea: [],
      keyword: [],
      keywordValue: '',
      mediaGroupList: [],
      informationType: { id: '', name: '' },
      publishingPeriod: [],
    },
    additionalParam: {
      journalistTargetList: [],
      portal: [],
      languageParam: { id: '', name: '' },
      isJournalist: { id: '', name: '' },
      system: { id: '', name: '' },
      limit: { id: '', name: '' },
    },
  },

  locationList: [],
  industryList: [],
  filterDataList: null,
  pubCycleList: [],
  mediaValueList: [],
  journalistOccupationList: [],
  mediaTypeList: [],
  journalistInfoTypeList: [],
  languageList: [],
  mediaCountList: [],
  journalistBlockYNList: [],
  journalistSocialFilterList: [],
  portalList: [],
  mediaNameRevealedYNList: [],
  mediaBlockYNList: [],
  mediaInfoTypeList: [],
  mediaTypePopupList: [],
  mediaFieldList: [],
  mediaLocationList: [],

  searchRegisterPopup: {
    isOpen: false,
    type: '',
    title: '',
    titleErr: '',
  },
  mediaTypePopup: {
    isOpen: false,
    selectedValue: '',
    selectedType: [],
  },
  mediaFieldPopup: {
    isOpen: false,
    type: '',
    selectedValue: '',
    selectedType: [],
  },
  mediaLocationPopup: {
    isOpen: false,
    type: '',
    selectedValue: '',
    selectedType: [],
  },
}

const mediaSearchSlice = createSlice({
  name: 'mediaSearchSlice',
  initialState,
  reducers: {
    locationListAction: (state, action: PayloadAction<string[]>) => {
      state.locationList = action.payload
    },
    industryListAction: (state, action: PayloadAction<string[]>) => {
      state.industryList = action.payload
    },
    filterDataListAction: (state, action: PayloadAction<IJournalistSearchFilter | null>) => {
      state.filterDataList = action.payload
    },
    mediaTypePopupAction: (state, action: PayloadAction<mediaTypePopupProps>) => {
      state.mediaTypePopup = action.payload
    },
    mediaFieldPopupAction: (state, action: PayloadAction<mediaFieldPopupProps>) => {
      state.mediaFieldPopup = action.payload
    },
    mediaTypePopupListAction: (state, action: PayloadAction<CommonCode[]>) => {
      state.mediaTypePopupList = action.payload
    },
    resetSearchOption: state => {
      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.mediaFieldPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
      state.mediaLocationPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }

      state.searchActivate = false
      state.mediaSearchOption = mediaInitParams
    },

    searchRegisterPopupAction: (state, action: PayloadAction<searchRegisterPopupProps>) => {
      state.searchRegisterPopup = action.payload
    },
    pressMediaListPressTypeAction: (state, action: PayloadAction<pressMediaContentListProps[]>) => {
      state.pressMediaList.pressContent = action.payload
    },
    pressMediaListMediaTypeAction: (state, action: PayloadAction<pressMediaContentListProps[]>) => {
      state.pressMediaList.mediaContent = action.payload
    },
    pressMediaListOptionAction: (state, action: PayloadAction<boolean>) => {
      state.pressMediaListOption = action.payload
    },
    mediaLocationListAction: (state, action: PayloadAction<mediaLocationListProps[]>) => {
      state.mediaLocationList = action.payload
    },
    mediaSearchOptionAction: (state, action: PayloadAction<mediaKeywordParamProps>) => {
      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.mediaFieldPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
      state.mediaLocationPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }

      state.mediaSearchOption.keywordParam = action.payload
      if (action.payload.mediaTagList.length > 0) {
        state.searchActivate = true
      } else if (action.payload.mediaType.length > 0) {
        state.searchActivate = true
      } else if (action.payload.mediaField.length > 0) {
        state.searchActivate = true
      } else if (action.payload.mediaArea.length > 0) {
        state.searchActivate = true
      } else if (action.payload.mediaGroupList.length > 0) {
        state.searchActivate = true
      } else if (action.payload.publishingPeriod.length > 0) {
        state.searchActivate = true
      } else if (action.payload.keyword.length > 0) {
        state.searchActivate = true
      } else if (action.payload.keywordValue !== '') {
        state.searchActivate = true
      } else if (action.payload.informationType.id !== '') {
        state.searchActivate = true
      } else if (state.mediaSearchOption.additionalParam.languageParam.id !== '') {
        state.searchActivate = true
      } else if (state.mediaSearchOption.additionalParam.isJournalist.id !== '') {
        state.searchActivate = true
      } else if (state.mediaSearchOption.additionalParam.system.id !== '') {
        state.searchActivate = true
      } else if (state.mediaSearchOption.additionalParam.limit.id !== '') {
        state.searchActivate = true
      } else if (state.mediaSearchOption.additionalParam.journalistTargetList.length > 0) {
        state.searchActivate = true
      } else {
        state.searchActivate = state.mediaSearchOption.additionalParam.portal.length > 0
      }
    },
    mediaAdditionalParamAction: (state, action: PayloadAction<mediaAdditionalParamProps>) => {
      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.mediaFieldPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
      state.mediaLocationPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }

      state.mediaSearchOption.additionalParam = action.payload
      if (state.mediaSearchOption.keywordParam.mediaTagList.length > 0) {
        state.searchActivate = true
      } else if (state.mediaSearchOption.keywordParam.mediaType.length > 0) {
        state.searchActivate = true
      } else if (state.mediaSearchOption.keywordParam.mediaField.length > 0) {
        state.searchActivate = true
      } else if (state.mediaSearchOption.keywordParam.mediaArea.length > 0) {
        state.searchActivate = true
      } else if (state.mediaSearchOption.keywordParam.mediaGroupList.length > 0) {
        state.searchActivate = true
      } else if (state.mediaSearchOption.keywordParam.publishingPeriod.length > 0) {
        state.searchActivate = true
      } else if (state.mediaSearchOption.keywordParam.keyword.length > 0) {
        state.searchActivate = true
      } else if (state.mediaSearchOption.keywordParam.keywordValue !== '') {
        state.searchActivate = true
      } else if (state.mediaSearchOption.keywordParam.informationType.id !== '') {
        state.searchActivate = true
      } else if (action.payload.languageParam.id !== '') {
        state.searchActivate = true
      } else if (action.payload.isJournalist.id !== '') {
        state.searchActivate = true
      } else if (action.payload.system.id !== '') {
        state.searchActivate = true
      } else if (action.payload.limit.id !== '') {
        state.searchActivate = true
      } else if (action.payload.journalistTargetList.length > 0) {
        state.searchActivate = true
      } else {
        state.searchActivate = action.payload.portal.length > 0
      }
    },
    mediaDataAction: (
      state,
      action: PayloadAction<{
        searchActivate: boolean
        mediaParams: mediaSearchOptionProps
      }>
    ) => {
      state.categoryData = { id: 'media', name: '매체 검색' }
      state.searchActivate = action.payload.searchActivate
      state.pressMediaListOption = false
      state.mediaSearchOption = action.payload.mediaParams
    },
    initAction: state => {
      state.categoryData = { id: 'media', name: '매체 검색' }
      state.searchActivate = false
      state.pressMediaListOption = false

      state.pressMediaList = {
        pressContent: [],
        mediaContent: [],
      }

      state.mediaSearchOption = {
        keywordParam: {
          mediaTagList: [],
          mediaType: [],
          mediaField: [],
          mediaArea: [],
          keyword: [],
          keywordValue: '',
          mediaGroupList: [],
          informationType: { id: '', name: '' },
          publishingPeriod: [],
        },
        additionalParam: {
          journalistTargetList: [],
          portal: [],
          languageParam: { id: '', name: '' },
          isJournalist: { id: '', name: '' },
          system: { id: '', name: '' },
          limit: { id: '', name: '' },
        },
      }

      state.locationList = []
      state.industryList = []
      state.filterDataList = null
      state.pubCycleList = []
      state.mediaValueList = []
      state.journalistOccupationList = []
      state.mediaTypeList = []
      state.journalistInfoTypeList = []
      state.languageList = []
      state.mediaCountList = []
      state.journalistBlockYNList = []
      state.journalistSocialFilterList = []
      state.portalList = []
      state.mediaNameRevealedYNList = []
      state.mediaBlockYNList = []
      state.mediaInfoTypeList = []
      state.mediaTypePopupList = []
      state.mediaFieldList = []
      state.mediaLocationList = []

      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.mediaFieldPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
      state.mediaLocationPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
    },
    pubCycleListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.pubCycleList = action.payload
    },
    mediaValueListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.mediaValueList = action.payload
    },
    journalistOccupationListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.journalistOccupationList = action.payload
    },
    mediaTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.mediaTypeList = action.payload
    },
    journalistInfoTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.journalistInfoTypeList = action.payload
    },
    languageListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.languageList = action.payload
    },
    mediaCountListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.mediaCountList = action.payload
    },
    journalistBlockYNListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.journalistBlockYNList = action.payload
    },
    journalistSocialFilterListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.journalistSocialFilterList = action.payload
    },
    portalListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      console.log('portalList', action.payload)
      state.portalList = action.payload
    },
    mediaNameRevealedYNListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.mediaNameRevealedYNList = action.payload
    },
    mediaBlockYNListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.mediaBlockYNList = action.payload
    },
    mediaInfoTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.mediaInfoTypeList = action.payload
    },
    mediaFieldListAction: (state, action: PayloadAction<mediaFieldListProps[]>) => {
      state.mediaFieldList = action.payload
    },
    mediaLocationPopupAction: (state, action: PayloadAction<basicLocationPopupProps>) => {
      state.mediaLocationPopup = action.payload
    },
  },
})

export const {
  initAction,
  searchRegisterPopupAction,
  pressMediaListOptionAction,
  pressMediaListPressTypeAction,
  pressMediaListMediaTypeAction,
  mediaSearchOptionAction,
  resetSearchOption,
  mediaAdditionalParamAction,
  locationListAction,
  industryListAction,
  filterDataListAction,
  mediaDataAction,

  pubCycleListAction,
  mediaValueListAction,
  journalistOccupationListAction,
  mediaTypeListAction,
  journalistInfoTypeListAction,
  languageListAction,
  mediaCountListAction,
  journalistBlockYNListAction,
  journalistSocialFilterListAction,
  portalListAction,
  mediaNameRevealedYNListAction,
  mediaBlockYNListAction,
  mediaInfoTypeListAction,
  mediaTypePopupAction,
  mediaTypePopupListAction,
  mediaFieldPopupAction,
  mediaFieldListAction,
  mediaLocationPopupAction,
  mediaLocationListAction,
} = mediaSearchSlice.actions
export default mediaSearchSlice.reducer
