import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ResponseNewsSrchCategoryDto, SearchNewsSrchCategoryDto, UserDtoForGroup } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'

export interface IJournalistSearchFilter {
  [key: string]: Array<{ key: string; value: number }>
}

export interface TabsProps {
  id: string
  title: string
}

export interface categoryListProps extends SelectListOptionItem {
  count: number
}

export interface pressMediaListDto {
  pressContent: pressMediaContentListProps[]
  mediaContent: pressMediaContentListProps[]
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

export interface mediaAdditionalParamProps {
  journalistTargetList: MbTagSearchTagItem[]
  portal: MbTagSearchTagItem[]
  languageParam: SelectListOptionItem
  isJournalist: SelectListOptionItem
  system: SelectListOptionItem
  limit: SelectListOptionItem
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

export interface mediaTypePopupProps {
  isOpen: boolean
  selectedValue: string
  selectedType: MbTagSearchTagItem[]
}

export interface mediaLocationListProps {
  name: string
  count: number
}

export interface mediaFieldListProps {
  name: string
  count: number
}

export interface mediaLocationPopupProps {
  isOpen: boolean
  type: string
  selectedValue: string
  selectedType: MbTagSearchTagItem[]
}

export interface searchRegisterPopupProps {
  isOpen: boolean
  type: string
  title: string
  titleErr: string
}

export interface mediaFieldPopupProps {
  isOpen: boolean
  type: string
  selectedValue: string
  selectedType: MbTagSearchTagItem[]
}

export interface pressSearchOptionProps {
  keywordParam: keywordParamProps
  additionalParam: additionalParamProps
}

export interface mediaSearchOptionProps {
  keywordParam: mediaKeywordParamProps
  additionalParam: mediaAdditionalParamProps
}
export interface Props {
  tab: TabsProps
  parentsCode: string
  searchActivate: boolean
  pressMediaListOption: boolean
  pressMediaList: pressMediaListDto
  pressMediaCategoryList: SelectListOptionItem[]
  pressSearchOption: pressSearchOptionProps
  mediaSearchOption: mediaSearchOptionProps
  informationTypeList: SelectListOptionItem[]
  pubCycleList: SelectListOptionItem[]
  mediaValueList: SelectListOptionItem[]
  journalistOccupationList: SelectListOptionItem[]
  mediaTypeList: SelectListOptionItem[]
  mediaTypePopup: mediaTypePopupProps
  mediaLocationPopup: mediaLocationPopupProps
  mediaTypePopupList: CommonCode[]
  mediaLocationPopupList: string[]
  mediaLocationList: mediaLocationListProps[]
  mediaFieldPopupList: string[]
  mediaFieldList: mediaFieldListProps[]
  journalistInfoTypeList: SelectListOptionItem[]
  languageList: SelectListOptionItem[]
  mediaCountList: SelectListOptionItem[]
  journalistBlockYNList: SelectListOptionItem[]
  journalistSocialFilterList: SelectListOptionItem[]
  pressMediaGroupList: categoryListProps[]
  portalList: SelectListOptionItem[]
  filterDataList: IJournalistSearchFilter | null
  mediaFieldPopup: mediaFieldPopupProps
  basicFieldPopup: mediaFieldPopupProps
  basicFieldList: mediaFieldListProps[]
  searchRegisterPopup: searchRegisterPopupProps
  mediaBlockYNList: SelectListOptionItem[]
  mediaNameRevealedYNList: SelectListOptionItem[]
  mediaInfoTypeList: SelectListOptionItem[]
}

// 초기값
export const initialState: Props = {
  tab: {
    id: 'press',
    title: '언론인 검색',
  },
  searchActivate: false,
  parentsCode: 'FILTER',
  pressMediaListOption: false,
  pressMediaList: {
    pressContent: [],
    mediaContent: [],
  },
  pressMediaCategoryList: [],

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
  informationTypeList: [],

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
  searchRegisterPopup: {
    isOpen: false,
    type: '',
    title: '',
    titleErr: '',
  },

  filterDataList: null,
  pubCycleList: [],
  mediaValueList: [],
  journalistOccupationList: [],
  mediaTypeList: [],
  mediaTypePopupList: [],
  mediaLocationPopupList: [],
  mediaLocationList: [],
  mediaFieldPopupList: [],
  mediaFieldList: [],
  basicFieldList: [],
  journalistInfoTypeList: [],
  languageList: [],
  mediaCountList: [],
  journalistBlockYNList: [],
  journalistSocialFilterList: [],
  portalList: [],
  pressMediaGroupList: [],
  mediaBlockYNList: [],
  mediaNameRevealedYNList: [],
  mediaInfoTypeList: [],
}

const pressMediaSearchOptionsSlice = createSlice({
  name: 'pressMediaSearchOptionsSlice',
  initialState,
  reducers: {
    pressSearchOptionAction: (state, action: PayloadAction<keywordParamProps>) => {
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
    mediaSearchOptionAction: (state, action: PayloadAction<mediaKeywordParamProps>) => {
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
    resetSearchOption: state => {
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

      state.pressSearchOption = initialState.pressSearchOption
      state.mediaSearchOption = initialState.mediaSearchOption
      state.searchActivate = false
    },
    searchRegisterPopupAction: (state, action: PayloadAction<searchRegisterPopupProps>) => {
      state.searchRegisterPopup = action.payload
    },
    mediaLocationPopupListAction: (state, action: PayloadAction<string[]>) => {
      state.mediaLocationPopupList = action.payload
    },
    mediaFieldPopupListAction: (state, action: PayloadAction<string[]>) => {
      state.mediaFieldPopupList = action.payload
    },
    mediaLocationListAction: (state, action: PayloadAction<mediaLocationListProps[]>) => {
      state.mediaLocationList = action.payload
    },
    mediaFieldListAction: (state, action: PayloadAction<mediaFieldListProps[]>) => {
      state.mediaFieldList = action.payload
    },
    basicFieldListAction: (state, action: PayloadAction<mediaFieldListProps[]>) => {
      state.basicFieldList = action.payload
    },
    mediaTypePopupListAction: (state, action: PayloadAction<CommonCode[]>) => {
      state.mediaTypePopupList = action.payload
    },
    mediaTypePopupAction: (state, action: PayloadAction<mediaTypePopupProps>) => {
      state.mediaTypePopup = action.payload
    },
    mediaLocationPopupAction: (state, action: PayloadAction<mediaLocationPopupProps>) => {
      state.mediaLocationPopup = action.payload
    },
    mediaFieldPopupAction: (state, action: PayloadAction<mediaFieldPopupProps>) => {
      state.mediaFieldPopup = action.payload
    },
    basicFieldPopupAction: (state, action: PayloadAction<mediaFieldPopupProps>) => {
      state.basicFieldPopup = action.payload
    },
    filterDataListAction: (state, action: PayloadAction<IJournalistSearchFilter>) => {
      state.filterDataList = action.payload
    },
    pressMediaGroupListAction: (state, action: PayloadAction<categoryListProps[]>) => {
      console.log('action.payload', action.payload)
      state.pressMediaGroupList = action.payload
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
    journalistSocialFilterListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.journalistSocialFilterList = action.payload
    },
    tabAction: (state, action: PayloadAction<TabsProps>) => {
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
      state.pressSearchOption = initialState.pressSearchOption
      state.mediaSearchOption = initialState.mediaSearchOption
      state.searchActivate = false
      state.tab = action.payload
    },
    pressMediaListOptionAction: (state, action: PayloadAction<boolean>) => {
      state.pressMediaListOption = action.payload
    },
    pressMediaListPressTypeAction: (state, action: PayloadAction<pressMediaContentListProps[]>) => {
      state.pressMediaList.pressContent = action.payload
    },
    pressMediaListMediaTypeAction: (state, action: PayloadAction<pressMediaContentListProps[]>) => {
      state.pressMediaList.mediaContent = action.payload
    },
    pressMediaDataAction: (
      state,
      action: PayloadAction<{
        type: string
        searchActivate: boolean
        pressParams: pressSearchOptionProps
        mediaParams: mediaSearchOptionProps
      }>
    ) => {
      state.tab = {
        id: action.payload.type,
        title: action.payload.type === 'press' ? '언론인 검색' : '매체 검색',
      }
      state.searchActivate = action.payload.searchActivate
      state.pressMediaListOption = false
      state.pressMediaCategoryList = []
      state.pressSearchOption = action.payload.pressParams
      state.mediaSearchOption = action.payload.mediaParams
    },
    pressMediaInit: state => {
      state.tab = {
        id: 'press',
        title: '언론인 검색',
      }
      state.searchActivate = false
      state.pressMediaListOption = false
      state.pressMediaCategoryList = []
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
      state.informationTypeList = []

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
      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }

      state.filterDataList = null
      state.pubCycleList = []
      state.mediaValueList = []
      state.journalistOccupationList = []
      state.mediaTypeList = []
      state.mediaTypePopupList = []
      state.mediaLocationPopupList = []
      state.mediaLocationList = []
      state.mediaFieldPopupList = []
      state.mediaFieldList = []
      state.journalistInfoTypeList = []
      state.languageList = []
      state.mediaCountList = []
      state.journalistBlockYNList = []
      state.journalistSocialFilterList = []
      state.portalList = []
      state.pressMediaGroupList = []
      state.mediaBlockYNList = []
      state.mediaNameRevealedYNList = []
      state.mediaInfoTypeList = []
    },
    initAction: () => initialState,
  },
})

export const {
  initAction,
  portalListAction,
  tabAction,
  pressMediaListPressTypeAction,
  pressMediaListMediaTypeAction,
  pressMediaListOptionAction,
  pubCycleListAction,
  mediaValueListAction,
  journalistOccupationListAction,
  mediaTypeListAction,
  mediaTypePopupAction,
  mediaTypePopupListAction,
  mediaLocationPopupAction,
  mediaLocationPopupListAction,
  mediaLocationListAction,
  pressSearchOptionAction,
  journalistInfoTypeListAction,
  languageListAction,
  mediaCountListAction,
  journalistBlockYNListAction,
  journalistSocialFilterListAction,
  filterDataListAction,
  pressAdditionalParamAction,
  pressMediaGroupListAction,
  mediaFieldPopupAction,
  mediaFieldListAction,
  basicFieldPopupAction,
  mediaFieldPopupListAction,
  resetSearchOption,
  searchRegisterPopupAction,
  pressMediaInit,
  mediaAdditionalParamAction,
  mediaSearchOptionAction,
  mediaNameRevealedYNListAction,
  mediaBlockYNListAction,
  mediaInfoTypeListAction,
  pressMediaDataAction,
  basicFieldListAction,
} = pressMediaSearchOptionsSlice.actions

export default pressMediaSearchOptionsSlice.reducer
