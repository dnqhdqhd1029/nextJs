import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { pressInitParams } from '~/components/contents/pressMedia/PressSearch/defaultData'
import { UserDtoForGroup } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'

export interface mediaLocationListProps {
  name: string
  count: number
}

export interface searchRegisterPopupProps {
  isOpen: boolean
  type: string
  title: string
  titleErr: string
}

export interface fieldListProps {
  name: string
  count: number
}

export interface basicFieldPopupProps {
  isOpen: boolean
  type: string
  selectedValue: string
  selectedType: MbTagSearchTagItem[]
}

export interface mediaTypePopupProps {
  isOpen: boolean
  selectedValue: string
  selectedType: MbTagSearchTagItem[]
}

export interface keywordParamProps {
  journalistTagList: MbTagSearchTagItem[]
  newsKeyword: MbTagSearchTagItem[]
  field: MbTagSearchTagItem[]
  area: MbTagSearchTagItem[]
  mediaTagList: MbTagSearchTagItem[]
  mediaType: MbTagSearchTagItem[]
  occupation: MbTagSearchTagItem[]
  position: MbTagSearchTagItem[]
  keyword: MbTagSearchTagItem[]
  department: MbTagSearchTagItem[]
  informationType: SelectListOptionItem
  publishingPeriod: MbTagSearchTagItem[]

  positionValue: string
  keywordValue: string
  departmentValue: string
  newsKeywordValue: string
}

export interface additionalParamProps {
  mediaTargetList: MbTagSearchTagItem[]
  mediaField: MbTagSearchTagItem[]
  mediaArea: MbTagSearchTagItem[]
  mediaGroupList: MbTagSearchTagItem[]
  portal: MbTagSearchTagItem[]
  social: MbTagSearchTagItem[]
  languageParam: SelectListOptionItem
  count: SelectListOptionItem
  system: SelectListOptionItem
  limit: SelectListOptionItem
}

export interface pressSearchOptionProps {
  keywordParam: keywordParamProps
  additionalParam: additionalParamProps
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

export interface pressMediaListDto {
  pressContent: pressMediaContentListProps[]
  mediaContent: pressMediaContentListProps[]
}

export interface IJournalistSearchFilter {
  [key: string]: Array<{ key: string; value: number }>
}

export interface mediaFieldListProps {
  name: string
  count: number
}

export interface basicLocationPopupProps {
  isOpen: boolean
  type: string
  selectedValue: string
  selectedType: MbTagSearchTagItem[]
}

export type Props = {
  categoryData: SelectListOptionItem
  pressMediaList: pressMediaListDto
  searchActivate: boolean
  pressMediaListOption: boolean
  pressSearchOption: pressSearchOptionProps

  basicFieldList: fieldListProps[]
  mediaFieldList: fieldListProps[]
  industryList: string[]
  locationList: string[]
  pubCycleList: SelectListOptionItem[]
  mediaValueList: SelectListOptionItem[]
  journalistOccupationList: SelectListOptionItem[]
  mediaTypeList: SelectListOptionItem[]
  mediaTypePopupList: CommonCode[]
  basicLocationList: fieldListProps[]
  mediaLocationList: fieldListProps[]
  journalistInfoTypeList: SelectListOptionItem[]
  languageList: SelectListOptionItem[]
  mediaCountList: SelectListOptionItem[]
  journalistBlockYNList: SelectListOptionItem[]
  journalistSocialFilterList: SelectListOptionItem[]
  portalList: SelectListOptionItem[]
  mediaNameRevealedYNList: SelectListOptionItem[]
  mediaBlockYNList: SelectListOptionItem[]
  mediaInfoTypeList: SelectListOptionItem[]
  filterDataList: IJournalistSearchFilter | null

  searchRegisterPopup: searchRegisterPopupProps
  basicFieldPopup: basicFieldPopupProps
  mediaFieldPopup: basicFieldPopupProps
  mediaLocationPopup: basicLocationPopupProps
  mediaTypePopup: mediaTypePopupProps
  basicLocationPopup: basicLocationPopupProps
}

// 초기값
export const initialState: Props = {
  categoryData: { id: 'press', name: '언론인 검색' },
  searchActivate: false,
  pressMediaListOption: false,

  pressMediaList: {
    pressContent: [],
    mediaContent: [],
  },

  pressSearchOption: {
    keywordParam: {
      journalistTagList: [],
      newsKeyword: [],
      newsKeywordValue: '',
      field: [],
      area: [],
      mediaTagList: [],
      mediaType: [],
      occupation: [],
      position: [],
      positionValue: '',
      keyword: [],
      keywordValue: '',
      department: [],
      departmentValue: '',
      informationType: { id: '', name: '' },
      publishingPeriod: [],
    },
    additionalParam: {
      mediaTargetList: [],
      mediaField: [],
      mediaArea: [],
      mediaGroupList: [],
      portal: [],
      social: [],
      languageParam: { id: '', name: '' },
      count: { id: '', name: '' },
      system: { id: '', name: '' },
      limit: { id: '', name: '' },
    },
  },

  industryList: [],
  locationList: [],
  pubCycleList: [],
  mediaValueList: [],
  mediaTypePopupList: [],
  basicLocationList: [],
  mediaLocationList: [],
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
  filterDataList: null,
  basicFieldList: [],
  mediaFieldList: [],

  searchRegisterPopup: {
    isOpen: false,
    type: '',
    title: '',
    titleErr: '',
  },
  mediaFieldPopup: {
    isOpen: false,
    type: '',
    selectedValue: '',
    selectedType: [],
  },
  basicFieldPopup: {
    isOpen: false,
    type: '',
    selectedValue: '',
    selectedType: [],
  },
  mediaTypePopup: {
    isOpen: false,
    selectedValue: '',
    selectedType: [],
  },
  mediaLocationPopup: {
    isOpen: false,
    type: '',
    selectedValue: '',
    selectedType: [],
  },
  basicLocationPopup: {
    isOpen: false,
    type: '',
    selectedValue: '',
    selectedType: [],
  },
}

const pressSearchSlice = createSlice({
  name: 'pressSearchSlice',
  initialState,
  reducers: {
    industryListAction: (state, action: PayloadAction<string[]>) => {
      state.industryList = action.payload
    },
    basicFieldListAction: (state, action: PayloadAction<fieldListProps[]>) => {
      state.basicFieldList = action.payload
    },
    mediaFieldListAction: (state, action: PayloadAction<fieldListProps[]>) => {
      state.mediaFieldList = action.payload
    },
    mediaTypePopupAction: (state, action: PayloadAction<mediaTypePopupProps>) => {
      state.mediaTypePopup = action.payload
    },
    basicFieldPopupAction: (state, action: PayloadAction<basicFieldPopupProps>) => {
      state.basicFieldPopup = action.payload
    },
    mediaFieldPopupAction: (state, action: PayloadAction<basicFieldPopupProps>) => {
      state.mediaFieldPopup = action.payload
    },
    basicLocationPopupAction: (state, action: PayloadAction<basicFieldPopupProps>) => {
      state.basicLocationPopup = action.payload
    },
    mediaLocationPopupAction: (state, action: PayloadAction<basicLocationPopupProps>) => {
      state.mediaLocationPopup = action.payload
    },
    locationListAction: (state, action: PayloadAction<string[]>) => {
      state.locationList = action.payload
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
    pressSearchOptionAction: (state, action: PayloadAction<keywordParamProps>) => {
      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }
      state.mediaFieldPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
      state.basicFieldPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.mediaLocationPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
      state.basicLocationPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }

      state.pressSearchOption.keywordParam = action.payload
      if (action.payload.journalistTagList.length > 0) {
        state.searchActivate = true
      } else if (action.payload.newsKeyword.length > 0) {
        state.searchActivate = true
      } else if (action.payload.field.length > 0) {
        state.searchActivate = true
      } else if (action.payload.area.length > 0) {
        state.searchActivate = true
      } else if (action.payload.mediaTagList.length > 0) {
        state.searchActivate = true
      } else if (action.payload.mediaType.length > 0) {
        state.searchActivate = true
      } else if (action.payload.occupation.length > 0) {
        state.searchActivate = true
      } else if (action.payload.position.length > 0) {
        state.searchActivate = true
      } else if (action.payload.keyword.length > 0) {
        state.searchActivate = true
      } else if (action.payload.department.length > 0) {
        state.searchActivate = true
      } else if (action.payload.publishingPeriod.length > 0) {
        state.searchActivate = true
      } else if (action.payload.newsKeywordValue !== '') {
        state.searchActivate = true
      } else if (action.payload.positionValue !== '') {
        state.searchActivate = true
      } else if (action.payload.keywordValue !== '') {
        state.searchActivate = true
      } else if (action.payload.departmentValue !== '') {
        state.searchActivate = true
      } else if (action.payload.informationType.id !== '') {
        state.searchActivate = true
      } else if (state.pressSearchOption.additionalParam.languageParam.id !== '') {
        state.searchActivate = true
      } else if (state.pressSearchOption.additionalParam.count.id !== '') {
        state.searchActivate = true
      } else if (state.pressSearchOption.additionalParam.system.id !== '') {
        state.searchActivate = true
      } else if (state.pressSearchOption.additionalParam.limit.id !== '') {
        state.searchActivate = true
      } else if (state.pressSearchOption.additionalParam.mediaTargetList.length > 0) {
        state.searchActivate = true
      } else if (state.pressSearchOption.additionalParam.mediaField.length > 0) {
        state.searchActivate = true
      } else if (state.pressSearchOption.additionalParam.mediaArea.length > 0) {
        state.searchActivate = true
      } else if (state.pressSearchOption.additionalParam.mediaGroupList.length > 0) {
        state.searchActivate = true
      } else if (state.pressSearchOption.additionalParam.portal.length > 0) {
        state.searchActivate = true
      } else {
        state.searchActivate = state.pressSearchOption.additionalParam.social.length > 0
      }
    },
    pressAdditionalParamAction: (state, action: PayloadAction<additionalParamProps>) => {
      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }
      state.mediaFieldPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
      state.basicFieldPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.mediaLocationPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
      state.basicLocationPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }

      state.pressSearchOption.additionalParam = action.payload
      if (state.pressSearchOption.keywordParam.journalistTagList.length > 0) {
        state.searchActivate = true
      } else if (state.pressSearchOption.keywordParam.newsKeyword.length > 0) {
        state.searchActivate = true
      } else if (state.pressSearchOption.keywordParam.field.length > 0) {
        state.searchActivate = true
      } else if (state.pressSearchOption.keywordParam.area.length > 0) {
        state.searchActivate = true
      } else if (state.pressSearchOption.keywordParam.mediaTagList.length > 0) {
        state.searchActivate = true
      } else if (state.pressSearchOption.keywordParam.mediaType.length > 0) {
        state.searchActivate = true
      } else if (state.pressSearchOption.keywordParam.occupation.length > 0) {
        state.searchActivate = true
      } else if (state.pressSearchOption.keywordParam.position.length > 0) {
        state.searchActivate = true
      } else if (state.pressSearchOption.keywordParam.keyword.length > 0) {
        state.searchActivate = true
      } else if (state.pressSearchOption.keywordParam.department.length > 0) {
        state.searchActivate = true
      } else if (state.pressSearchOption.keywordParam.publishingPeriod.length > 0) {
        state.searchActivate = true
      } else if (state.pressSearchOption.keywordParam.newsKeywordValue !== '') {
        state.searchActivate = true
      } else if (state.pressSearchOption.keywordParam.positionValue !== '') {
        state.searchActivate = true
      } else if (state.pressSearchOption.keywordParam.keywordValue !== '') {
        state.searchActivate = true
      } else if (state.pressSearchOption.keywordParam.departmentValue !== '') {
        state.searchActivate = true
      } else if (state.pressSearchOption.keywordParam.informationType.id !== '') {
        state.searchActivate = true
      } else if (action.payload.languageParam.id !== '') {
        state.searchActivate = true
      } else if (action.payload.count.id !== '') {
        state.searchActivate = true
      } else if (action.payload.system.id !== '') {
        state.searchActivate = true
      } else if (action.payload.limit.id !== '') {
        state.searchActivate = true
      } else if (action.payload.mediaTargetList.length > 0) {
        state.searchActivate = true
      } else if (action.payload.mediaField.length > 0) {
        state.searchActivate = true
      } else if (action.payload.mediaArea.length > 0) {
        state.searchActivate = true
      } else if (action.payload.mediaGroupList.length > 0) {
        state.searchActivate = true
      } else if (action.payload.portal.length > 0) {
        state.searchActivate = true
      } else {
        state.searchActivate = action.payload.social.length > 0
      }
    },
    pressMediaDataAction: (
      state,
      action: PayloadAction<{
        searchActivate: boolean
        pressParams: pressSearchOptionProps
      }>
    ) => {
      state.categoryData = { id: 'press', name: '언론인 검색' }
      state.searchActivate = action.payload.searchActivate
      state.pressMediaListOption = false
      state.pressSearchOption = action.payload.pressParams
    },
    resetSearchOption: state => {
      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }
      state.mediaFieldPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
      state.basicFieldPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.mediaLocationPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
      state.basicLocationPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }

      state.searchActivate = false
      state.pressSearchOption = pressInitParams
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
    mediaTypePopupListAction: (state, action: PayloadAction<CommonCode[]>) => {
      state.mediaTypePopupList = action.payload
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
    basicLocationListAction: (state, action: PayloadAction<mediaLocationListProps[]>) => {
      state.basicLocationList = action.payload
    },
    mediaLocationListAction: (state, action: PayloadAction<mediaLocationListProps[]>) => {
      state.mediaLocationList = action.payload
    },
    filterDataListAction: (state, action: PayloadAction<IJournalistSearchFilter | null>) => {
      state.filterDataList = action.payload
    },
    initAction: state => {
      state.categoryData = { id: 'press', name: '언론인 검색' }
      state.searchActivate = false
      state.pressMediaListOption = false

      state.pressMediaList = {
        pressContent: [],
        mediaContent: [],
      }

      state.pressSearchOption = {
        keywordParam: {
          journalistTagList: [],
          newsKeyword: [],
          newsKeywordValue: '',
          field: [],
          area: [],
          mediaTagList: [],
          mediaType: [],
          occupation: [],
          position: [],
          positionValue: '',
          keyword: [],
          keywordValue: '',
          department: [],
          departmentValue: '',
          informationType: { id: '', name: '' },
          publishingPeriod: [],
        },
        additionalParam: {
          mediaTargetList: [],
          mediaField: [],
          mediaArea: [],
          mediaGroupList: [],
          portal: [],
          social: [],
          languageParam: { id: '', name: '' },
          count: { id: '', name: '' },
          system: { id: '', name: '' },
          limit: { id: '', name: '' },
        },
      }

      state.industryList = []
      state.locationList = []
      state.pubCycleList = []
      state.mediaValueList = []
      state.mediaTypePopupList = []
      state.basicLocationList = []
      state.mediaLocationList = []
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
      state.filterDataList = null
      state.basicFieldList = []
      state.mediaFieldList = []

      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }
      state.mediaFieldPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
      state.basicFieldPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
      state.mediaTypePopup = {
        isOpen: false,
        selectedValue: '',
        selectedType: [],
      }
      state.mediaLocationPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
      state.basicLocationPopup = {
        isOpen: false,
        type: '',
        selectedValue: '',
        selectedType: [],
      }
    },
  },
})

export const {
  initAction,
  industryListAction,
  locationListAction,
  pressMediaListOptionAction,
  searchRegisterPopupAction,
  resetSearchOption,
  pressMediaDataAction,
  pressMediaListPressTypeAction,
  pressMediaListMediaTypeAction,
  pressSearchOptionAction,

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
  filterDataListAction,
  basicFieldPopupAction,
  basicFieldListAction,
  mediaFieldListAction,
  mediaTypePopupAction,
  mediaTypePopupListAction,
  basicLocationPopupAction,
  basicLocationListAction,
  pressAdditionalParamAction,
  mediaLocationPopupAction,
  mediaLocationListAction,
  mediaFieldPopupAction,
} = pressSearchSlice.actions
export default pressSearchSlice.reducer
