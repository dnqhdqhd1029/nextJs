import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'

import {
  subJournalFilterOptionsList,
  subMediaFilterOptionsList,
} from '~/components/contents/pressMedia/SavedSearch/defaultData'
import { duplicationMediaPopupProps, isMediaUserBlockProps } from '~/stores/modules/contents/pressMedia/mediaProfile'
import { userPopupProps } from '~/stores/modules/contents/pressMedia/pressListManagement'
import {
  additionalParamProps,
  keywordParamProps,
  mediaAdditionalParamProps,
  mediaKeywordParamProps,
} from '~/stores/modules/contents/pressMedia/pressMediaSearch'
import {
  mediaSearchOptionProps,
  mediaSubTypeListProps,
  pressSearchOptionProps,
} from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import {
  basicFieldPopupProps,
  basicLocationPopupProps,
  fieldListProps,
} from '~/stores/modules/contents/pressMedia/pressSearch'
import {
  ActionDtoForList,
  ContactUserAddedDto,
  ESearchJournalistCondDto,
  ESearchMediaCondDto,
  JournalistAutoCompleteDto,
  JournalistSrchDto,
  MediaAutoCompleteDto,
  MediaSrchDto,
  UserDtoForGroup,
} from '~/types/api/service'
import { NavigationLinkItem, SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import {
  ESearchJournalistDocumentDto,
  ESearchMediaDocumentDto,
  JournalistMediaGroupItem,
} from '~/types/contents/PressMedia'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'
import { FileType } from '~/utils/hooks/common/useFileDragAndDrop'

export interface dataOnChangeActionTypeProps {
  personalContacts?: string
  emailBlock?: string
  isJournalUserBlock?: string
  isMediaUserBlock?: string
}

export interface dataOnChangeActionProps {
  personalContacts?: number
  emailBlock?: number
  isJournalUserBlock?: string
  isMediaUserBlock?: string
}

export interface mediaFieldListProps {
  name: string
  count: number
}
export interface IJournalistSearchFilter {
  [key: string]: Array<{ key: string; value: number }>
}

export interface searchRegisterPopupProps {
  isOpen: boolean
  type: string
  title: string
  titleErr: string
}

export interface contentDeletePopupProps {
  isOpen: boolean
  key: number
  title: string
  type: string
}

export interface searchContentListProps extends ActionDtoForList {
  categoryName?: string
  stateName?: string
}
export type blockedEmailSenderPopupProps = {
  isOpen: boolean
  type: string
  status: string
  idKey: string
}
export type addPersonalContactProps = {
  isOpen: boolean
  type: string
  email: string
  emailErr: string
  website: string
  websiteErr: string
  fax: string
  phone: string
  telephone: string
  address: string
}
export type pressMediaErrPopupProps = {
  isOpen: boolean
  newsTitle: string
  type: string
  key: number
  title: string
  titleErr: string
  contents: string
  contentErr: string
}
export type pressMediaUnBlockPopupProps = {
  isOpen: boolean
  type: string
  key: number
  title: string
  titleErr: string
  contents: string
  contentErr: string
}

export type registerMediaPhotoPopupProps = {
  isOpen: boolean
  type: string
  imageUrl: string
  filesList: FileType[]
}

export type registerJournalPhotoPopupProps = {
  isOpen: boolean
  type: string
  imageUrl: string
  filesList: FileType[]
}

export interface mediaFieldPopupProps {
  isOpen: boolean
  type: string
  selectedValue: string
  selectedType: MbTagSearchTagItem[]
}

export type journalDecodeListProps = {
  beemail: string
  mobile: string
  landline: string
  landlineShared: string
  fax: string
}

export interface mediaLocationListProps {
  name: string
  count: number
}

export interface mediaLocationPopupProps {
  isOpen: boolean
  type: string
  selectedValue: string
  selectedType: MbTagSearchTagItem[]
}

export interface filterSubParamActionsProps {
  id: string
  isOpen: boolean
  subMenu?: filterSubParamActionsProps[]
  values: string[]
}

export interface pageCountProps {
  totalCount: number
  totalPageCount: number
}

export interface pressNewsItem {
  newsid: number
  title: string
  inserted: string
  authors: string
  mname: string
}

export interface pressNewsData {
  journalistId: number
  newsList: pressNewsItem[]
}

export interface mediaTypePopupProps {
  isOpen: boolean
  selectedValue: string
  selectedType: MbTagSearchTagItem[]
}

export type savedSearchPopupProps = {
  isOpen: boolean
  isOwner: boolean
  type: string
  key: number
  name: string
  nameErr: string
  scrop: SelectListOptionItem
  scropTarget: SelectListOptionItem
  userList: SelectListOptionItem[]
  selectedUser: SelectListOptionItem
  originName: string
}

export type Props = {
  profileImageId: number
  contentListImageId: number
  listDefine: string
  isOwner: boolean
  editPageOpen: boolean
  isFilterSubParam: boolean
  savedJournalListLoading: boolean
  savedMediaListLoading: boolean
  savedJournalAuth: boolean
  searchActivate: boolean
  searchDropBoxActivate: boolean
  savedMediaAuth: boolean
  pageCount: pageCountProps
  pressDto: ESearchJournalistCondDto
  mediaDto: ESearchMediaCondDto
  savedJournalList: JournalistSrchDto[]
  savedMediaList: MediaSrchDto[]
  originSavedJournalList: JournalistSrchDto[]
  originSavedMediaList: MediaSrchDto[]
  savedJournalListKeyword: string
  savedMediaListKeyword: string
  journalApiList: ESearchJournalistDocumentDto[]
  mediaApiList: ESearchMediaDocumentDto[]
  journalIdKey: number
  mediaIdKey: number
  mediaSubTypeList: mediaSubTypeListProps[]
  filterInformation: SelectListOptionItem[]
  filterMediaInfoType: SelectListOptionItem[]
  filterPubCycle: SelectListOptionItem[]
  filterPortalCode: SelectListOptionItem[]
  actionStateFilterList: SelectListOptionItem[]
  publisherTypeList: SelectListOptionItem[]
  actionCategoryList: SelectListOptionItem[]
  journalistSocialFilterList: SelectListOptionItem[]
  journalistOccupationList: SelectListOptionItem[]
  actionStateList: SelectListOptionItem[]
  filterMediaType: SelectListOptionItem[]
  journalistInfoTypeList: SelectListOptionItem[]
  languageList: SelectListOptionItem[]
  mediaCountList: SelectListOptionItem[]
  journalistBlockYNList: SelectListOptionItem[]
  mediaNameRevealedYNList: SelectListOptionItem[]
  mediaBlockYNList: SelectListOptionItem[]
  basicFieldList: fieldListProps[]
  isLimitFilter: number
  pressListParams: pressSearchOptionProps
  mediaListParams: mediaSearchOptionProps
  pressSearchOptionParams: pressSearchOptionProps
  mediaSearchOptionParams: mediaSearchOptionProps
  mediaLoading: boolean
  journalLoading: boolean
  countLoading: boolean
  savedJournalKey: number
  savedMediaKey: number
  journalDecodeList: journalDecodeListProps
  filterJournalSubParam: NavigationLinkItem[]
  filterMediaSubParam: NavigationLinkItem[]
  journalIdKeyParam: ESearchJournalistDocumentDto | null
  mediaIdKeyParam: ESearchMediaDocumentDto | null
  filterMediaSubParamActions: filterSubParamActionsProps[]
  filterJournalSubParamActions: filterSubParamActionsProps[]
  isJournalUserBlock: isMediaUserBlockProps
  isMediaUserBlock: isMediaUserBlockProps
  activityListTotalCount: number
  newsListTotalCount: number

  mediaParamKeywordButton: boolean
  pressParamKeywordButton: boolean

  mediaTypePopupList: CommonCode[]
  basicLocationList: mediaFieldListProps[]
  mediaLocationList: mediaLocationListProps[]
  mediaFieldList: mediaFieldListProps[]
  filterDataList: IJournalistSearchFilter | null
  mediaFieldPopupList: string[]
  mediaLocationPopupList: string[]

  mediaTypePopup: mediaTypePopupProps
  mediaLocationPopup: mediaLocationPopupProps
  mediaFieldPopup: mediaFieldPopupProps
  basicLocationPopup: basicLocationPopupProps
  basicFieldPopup: basicFieldPopupProps
  pressMediaUnBlockPopup: pressMediaUnBlockPopupProps
  addPersonalContactPopup: addPersonalContactProps
  pressMediaErrPopup: pressMediaErrPopupProps
  blockedEmailSenderPopup: blockedEmailSenderPopupProps
  searchRegisterPopup: searchRegisterPopupProps
  duplicationMediaPopup: duplicationMediaPopupProps
  duplicationPressPopup: duplicationMediaPopupProps
  userPopup: userPopupProps
  contentDeletePopup: contentDeletePopupProps
  savedSearchPopup: savedSearchPopupProps

  pressParamKeyword: string
  mediaParamKeyword: string

  mediaCheckDuplicateParam: MediaAutoCompleteDto | null
  pressCheckDuplicateParam: JournalistAutoCompleteDto | null
  isSearchedNewsOpen: boolean

  isTagButton: boolean
  isSelectedAllNewsId: boolean
  searchContentListButton: boolean
  mediaParamsExpandButton: boolean
  pressParamsExpandButton: boolean
  searchContentKeyList: ESearchJournalistDocumentDto[] | ESearchMediaDocumentDto[]

  journalTab: string
  mediaTab: string

  newsLoading: boolean
  activityLoading: boolean

  journalContactInfo: ContactUserAddedDto | null
  journalContactBlockedInfo: number
  journalEmailBlocking: boolean
  mediaContactInfo: ContactUserAddedDto | null
  mediaEmailBlocking: boolean

  journalNewsCountPage: number
  newsListByJournalId: MonitoringSearchNewsDocumentDto[]
  registerJournalPhotoPopup: registerJournalPhotoPopupProps
  journalActivityCountPage: number
  activityListByJournalId: searchContentListProps[]

  mediaNewsCountPage: number
  newsListByMediaId: MonitoringSearchNewsDocumentDto[]
  registerMediaPhotoPopup: registerMediaPhotoPopupProps
  mediaActivityCountPage: number
  activityListByMediaId: searchContentListProps[]

  pressNewsList: pressNewsData[]

  searchLimitAlarm: boolean
}

// 초기값
export const initialState: Props = {
  profileImageId: 0,
  contentListImageId: 0,
  listDefine: '',
  isOwner: false,
  editPageOpen: false,
  isFilterSubParam: false,
  searchActivate: false,
  searchDropBoxActivate: false,
  savedJournalAuth: false,
  savedMediaAuth: false,
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  savedJournalListLoading: false,
  savedMediaListLoading: false,
  savedJournalList: [],
  savedMediaList: [],
  originSavedJournalList: [],
  originSavedMediaList: [],
  savedJournalKey: 0,
  savedMediaKey: 0,
  savedJournalListKeyword: '',
  savedMediaListKeyword: '',

  isTagButton: false,
  isSelectedAllNewsId: false,
  searchContentListButton: false,
  mediaParamsExpandButton: false,
  pressParamsExpandButton: false,
  mediaParamKeywordButton: false,
  pressParamKeywordButton: false,
  searchContentKeyList: [],
  pressListParams: {
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
  mediaListParams: {
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
  pressSearchOptionParams: {
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
  mediaSearchOptionParams: {
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
  pressDto: {
    page: 1,
    size: 20,
    sort: ['media.main.price!desc'],
    groupId: 0,
  },
  mediaDto: {
    page: 1,
    size: 20,
    sort: ['values.combined!desc'],
    groupId: 0,
  },
  pressParamKeyword: '',
  mediaParamKeyword: '',
  journalApiList: [],
  mediaApiList: [],
  journalIdKey: 0,
  mediaIdKey: 0,
  mediaLoading: false,
  journalLoading: false,
  countLoading: false,

  journalDecodeList: {
    beemail: '',
    mobile: '',
    landline: '',
    landlineShared: '',
    fax: '',
  },
  isLimitFilter: 0,
  filterJournalSubParam: [],
  journalIdKeyParam: null,
  filterJournalSubParamActions: [],

  filterMediaSubParam: [],
  mediaIdKeyParam: null,
  filterMediaSubParamActions: [],

  mediaSubTypeList: [],
  filterInformation: [],
  filterMediaInfoType: [],
  filterPubCycle: [],
  filterPortalCode: [],
  actionStateFilterList: [],
  publisherTypeList: [],
  actionCategoryList: [],
  journalistSocialFilterList: [],
  journalistOccupationList: [],
  actionStateList: [],
  filterMediaType: [],
  journalistInfoTypeList: [],
  languageList: [],
  mediaCountList: [],
  mediaNameRevealedYNList: [],
  journalistBlockYNList: [],
  mediaBlockYNList: [],
  mediaTypePopupList: [],
  basicLocationList: [],
  mediaLocationList: [],
  mediaFieldList: [],
  filterDataList: null,
  mediaFieldPopupList: [],
  mediaLocationPopupList: [],
  basicFieldList: [],

  isJournalUserBlock: {
    blockedUserId: 0,
    companyId: 0,
    licenseId: 0,
    blockedAt: '',
    unblockRequestBy: null,
    unblockRequestCnt: 0,
  },
  isMediaUserBlock: {
    blockedUserId: 0,
    companyId: 0,
    licenseId: 0,
    blockedAt: '',
    unblockRequestBy: null,
    unblockRequestCnt: 0,
  },

  journalTab: 'profile',
  mediaTab: 'profile',
  mediaCheckDuplicateParam: null,
  pressCheckDuplicateParam: null,
  isSearchedNewsOpen: false,

  journalNewsCountPage: 10,
  newsListByJournalId: [],
  journalActivityCountPage: 10,
  activityListByJournalId: [],
  journalContactInfo: null,
  journalContactBlockedInfo: 0,
  journalEmailBlocking: false,

  newsLoading: false,
  activityLoading: false,

  mediaNewsCountPage: 10,
  newsListByMediaId: [],
  mediaActivityCountPage: 10,
  activityListByMediaId: [],
  mediaContactInfo: null,
  mediaEmailBlocking: false,
  activityListTotalCount: 0,
  newsListTotalCount: 0,

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
  basicLocationPopup: {
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
  registerJournalPhotoPopup: {
    isOpen: false,
    type: '',
    imageUrl: '',
    filesList: [],
  },
  registerMediaPhotoPopup: {
    isOpen: false,
    type: '',
    imageUrl: '',
    filesList: [],
  },
  pressMediaUnBlockPopup: {
    isOpen: false,
    type: '',
    key: 0,
    title: '',
    titleErr: '',
    contents: '',
    contentErr: '',
  },
  addPersonalContactPopup: {
    isOpen: false,
    type: '',
    email: '',
    emailErr: '',
    website: '',
    websiteErr: '',
    fax: '',
    phone: '',
    telephone: '',
    address: '',
  },
  userPopup: {
    isOpen: false,
    email: '',
    keyValue: 0,
    displayName: '',
    phone: '',
    mobile: '',
    role: '',
  },
  contentDeletePopup: {
    isOpen: false,
    title: '',
    key: 0,
    type: '',
  },
  duplicationMediaPopup: {
    isOpen: false,
    key: 0,
    targetName: '',
  },
  duplicationPressPopup: {
    isOpen: false,
    key: 0,
    targetName: '',
  },
  pressMediaErrPopup: {
    isOpen: false,
    newsTitle: '',
    type: '',
    key: 0,
    title: '',
    titleErr: '',
    contents: '',
    contentErr: '',
  },
  blockedEmailSenderPopup: {
    isOpen: false,
    type: '',
    status: '',
    idKey: '',
  },
  searchRegisterPopup: {
    isOpen: false,
    type: '',
    title: '',
    titleErr: '',
  },
  savedSearchPopup: {
    isOpen: false,
    isOwner: false,
    type: '',
    key: 0,
    name: '',
    originName: '',
    nameErr: '',
    scrop: { id: '', name: '' },
    scropTarget: { id: '', name: '' },
    userList: [],
    selectedUser: { id: '', name: '' },
  },

  pressNewsList: [],

  searchLimitAlarm: false,
}

const savedSearchSlice = createSlice({
  name: 'savedSearchSlice',
  initialState,
  reducers: {
    searchLimitAlarmAction: (state, action: PayloadAction<boolean>) => {
      state.searchLimitAlarm = action.payload
    },
    savedSearchPopupAction: (state, action: PayloadAction<savedSearchPopupProps>) => {
      state.savedSearchPopup = action.payload
    },
    searchContentKeyMediaListAction: (
      state,
      action: PayloadAction<{
        param: ESearchMediaDocumentDto[]
        isTag: boolean
      }>
    ) => {
      state.editPageOpen = false
      state.searchContentKeyList = action.payload.param
      state.isSelectedAllNewsId = false
      state.isTagButton = action.payload.isTag
    },
    searchContentKeyPressListAction: (
      state,
      action: PayloadAction<{
        param: ESearchJournalistDocumentDto[]
        isTag: boolean
      }>
    ) => {
      state.editPageOpen = false
      state.searchContentKeyList = action.payload.param
      state.isSelectedAllNewsId = false
      state.isTagButton = action.payload.isTag
    },
    activityListByJournalIdAction: (
      state,
      action: PayloadAction<{ list: searchContentListProps[]; page: number; journalTab: string; totalCount: number }>
    ) => {
      state.activityListByJournalId = action.payload.list
      state.journalActivityCountPage = action.payload.page
      state.journalTab = action.payload.journalTab
      state.journalDecodeList = {
        beemail: '',
        mobile: '',
        landline: '',
        landlineShared: '',
        fax: '',
      }
      state.journalNewsCountPage = 10
      state.newsListByJournalId = []
      state.activityListTotalCount = action.payload.totalCount
    },
    newsListByJournalIdAction: (
      state,
      action: PayloadAction<{
        list: MonitoringSearchNewsDocumentDto[]
        page: number
        journalTab: string
        totalCount: number
      }>
    ) => {
      state.newsListByJournalId = action.payload.list
      state.journalNewsCountPage = action.payload.page
      state.journalTab = action.payload.journalTab
      state.journalDecodeList = {
        beemail: '',
        mobile: '',
        landline: '',
        landlineShared: '',
        fax: '',
      }
      state.journalActivityCountPage = 10
      state.activityListByJournalId = []
      state.newsListTotalCount = action.payload.totalCount
    },
    profileByJournalIdAction: (
      state,
      action: PayloadAction<{
        journalTab: string
        list: journalDecodeListProps
      }>
    ) => {
      state.activityListByJournalId = []
      state.journalActivityCountPage = 10
      state.journalTab = action.payload.journalTab
      state.journalDecodeList = action.payload.list
      state.journalNewsCountPage = 10
      state.newsListByJournalId = []
    },
    profileByMediaIdAction: (
      state,
      action: PayloadAction<{
        mediaTab: string
      }>
    ) => {
      state.activityListByMediaId = []
      state.mediaActivityCountPage = 10
      state.mediaTab = action.payload.mediaTab
      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
    },
    setFilterJournalSubParamActions: (state, action: PayloadAction<filterSubParamActionsProps[]>) => {
      state.filterJournalSubParamActions = action.payload
    },
    setFilterMediaSubParamActions: (state, action: PayloadAction<filterSubParamActionsProps[]>) => {
      state.filterMediaSubParamActions = action.payload
    },
    journalEmailBlockingAction: (state, action: PayloadAction<boolean>) => {
      state.journalEmailBlocking = action.payload
    },
    mediaEmailBlockingAction: (state, action: PayloadAction<boolean>) => {
      state.mediaEmailBlocking = action.payload
    },
    registerJournalPhotoPopupAction: (state, action: PayloadAction<registerJournalPhotoPopupProps>) => {
      state.registerJournalPhotoPopup = action.payload
    },
    searchRegisterPopupAction: (state, action: PayloadAction<searchRegisterPopupProps>) => {
      state.searchRegisterPopup = action.payload
    },
    registerMediaPhotoPopupAction: (state, action: PayloadAction<registerMediaPhotoPopupProps>) => {
      state.registerMediaPhotoPopup = action.payload
    },
    blockedEmailSenderPopupAction: (state, action: PayloadAction<blockedEmailSenderPopupProps>) => {
      state.blockedEmailSenderPopup = action.payload
    },
    pressMediaErrPopupAction: (state, action: PayloadAction<pressMediaErrPopupProps>) => {
      state.pressMediaErrPopup = action.payload
    },
    pressParamKeywordAction: (state, action: PayloadAction<string>) => {
      state.pressParamKeyword = action.payload
    },
    checkSavedSearchUserMediaAction: (state, action: PayloadAction<MediaAutoCompleteDto | null>) => {
      state.mediaCheckDuplicateParam = action.payload
    },
    checkSavedSearchUserPressAction: (state, action: PayloadAction<JournalistAutoCompleteDto | null>) => {
      state.pressCheckDuplicateParam = action.payload
    },
    mediaParamKeywordButtonAction: (state, action: PayloadAction<boolean>) => {
      state.mediaParamKeywordButton = action.payload
    },
    mediaParamsExpandButtonAction: (state, action: PayloadAction<boolean>) => {
      state.mediaParamsExpandButton = action.payload
    },
    pressParamKeywordButtonAction: (state, action: PayloadAction<boolean>) => {
      state.pressParamKeywordButton = action.payload
    },
    pressParamsExpandButtonAction: (state, action: PayloadAction<boolean>) => {
      state.pressParamsExpandButton = action.payload
    },
    isSearchedNewsOpenAction: (state, action: PayloadAction<boolean>) => {
      state.isSearchedNewsOpen = action.payload
    },
    userPopupAction: (state, action: PayloadAction<userPopupProps>) => {
      state.userPopup = action.payload
    },
    isFilterSubParamAction: (state, action: PayloadAction<boolean>) => {
      state.isFilterSubParam = action.payload
    },
    contentDeletePopupAction: (state, action: PayloadAction<contentDeletePopupProps>) => {
      state.contentDeletePopup = action.payload
    },
    isMediaFilterSubParamAction: (
      state,
      action: PayloadAction<{
        isFilterSubParam: boolean
        dto: ESearchMediaCondDto
        mediaData: ESearchMediaDocumentDto[]
        pageCount: pageCountProps
        mediaFilterSub: NavigationLinkItem[]
        mediaFilterSubActions: filterSubParamActionsProps[]
      }>
    ) => {
      state.mediaTab = 'profile'
      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
      state.mediaActivityCountPage = 10
      state.activityListByMediaId = []
      state.isFilterSubParam = false
      state.editPageOpen = false
      state.searchActivate = true
      state.searchDropBoxActivate = false
      state.searchContentKeyList = []
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.mediaApiList = action.payload.mediaData
      state.mediaDto = action.payload.dto
      state.filterMediaSubParamActions = action.payload.mediaFilterSubActions
      state.filterMediaSubParam = action.payload.mediaFilterSub
      state.mediaIdKeyParam =
        action.payload.mediaData.length > 0 ? (action.payload.mediaData[0] ? action.payload.mediaData[0] : null) : null
      state.mediaIdKey =
        action.payload.mediaData.length > 0
          ? action.payload.mediaData[0].mid
            ? action.payload.mediaData[0].mid
            : 0
          : 0
    },
    isPressFilterSubParamAction: (
      state,
      action: PayloadAction<{
        isFilterSubParam: boolean
        dto: ESearchJournalistCondDto
        journalData: ESearchJournalistDocumentDto[]
        pageCount: pageCountProps
        journalDecodeList: journalDecodeListProps
        journalFilterSub: NavigationLinkItem[]
        filterJournalSubParamActions: filterSubParamActionsProps[]
      }>
    ) => {
      state.journalTab = 'profile'
      state.journalNewsCountPage = 10
      state.newsListByJournalId = []
      state.journalActivityCountPage = 10
      state.activityListByJournalId = []
      state.journalDecodeList = action.payload.journalDecodeList
      state.isFilterSubParam = false
      state.editPageOpen = false
      state.searchActivate = true
      state.searchDropBoxActivate = false
      state.searchContentKeyList = []
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.journalApiList = action.payload.journalData
      state.pressDto = action.payload.dto
      state.filterJournalSubParamActions = action.payload.filterJournalSubParamActions
      state.filterJournalSubParam = action.payload.journalFilterSub
      state.journalIdKeyParam =
        action.payload.journalData.length > 0
          ? action.payload.journalData[0]
            ? action.payload.journalData[0]
            : null
          : null
      state.journalIdKey =
        action.payload.journalData.length > 0
          ? action.payload.journalData[0].jrnlst_id
            ? action.payload.journalData[0].jrnlst_id
            : 0
          : 0
    },
    duplicationMediaPopupAction: (state, action: PayloadAction<duplicationMediaPopupProps>) => {
      state.duplicationMediaPopup = action.payload
    },
    duplicationPressPopupAction: (state, action: PayloadAction<duplicationMediaPopupProps>) => {
      state.duplicationPressPopup = action.payload
    },
    isSelectedAllNewsIdAction: (state, action: PayloadAction<boolean>) => {
      state.isSelectedAllNewsId = action.payload
    },
    pressEditPageOpenAction: (
      state,
      action: PayloadAction<{ editPageOpen: boolean; pressListParams: pressSearchOptionProps }>
    ) => {
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
      state.basicLocationPopup = {
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
      state.registerJournalPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.registerMediaPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.pressMediaUnBlockPopup = {
        isOpen: false,
        type: '',
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.addPersonalContactPopup = {
        isOpen: false,
        type: '',
        email: '',
        emailErr: '',
        website: '',
        websiteErr: '',
        fax: '',
        phone: '',
        telephone: '',
        address: '',
      }
      state.userPopup = {
        isOpen: false,
        email: '',
        keyValue: 0,
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
      }
      state.contentDeletePopup = {
        isOpen: false,
        title: '',
        key: 0,
        type: '',
      }
      state.duplicationMediaPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.duplicationPressPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.pressMediaErrPopup = {
        isOpen: false,
        newsTitle: '',
        type: '',
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.blockedEmailSenderPopup = {
        isOpen: false,
        type: '',
        status: '',
        idKey: '',
      }
      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }
      state.savedSearchPopup = {
        isOpen: false,
        isOwner: false,
        type: '',
        key: 0,
        name: '',
        originName: '',
        nameErr: '',
        scrop: { id: '', name: '' },
        scropTarget: { id: '', name: '' },
        userList: [],
        selectedUser: { id: '', name: '' },
      }
      state.searchActivate = true
      state.searchDropBoxActivate = false
      state.editPageOpen = action.payload.editPageOpen
      state.pressSearchOptionParams = action.payload.pressListParams
    },
    mediaEditPageOpenAction: (
      state,
      action: PayloadAction<{ editPageOpen: boolean; mediaListParams: mediaSearchOptionProps }>
    ) => {
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
      state.basicLocationPopup = {
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
      state.registerJournalPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.registerMediaPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.pressMediaUnBlockPopup = {
        isOpen: false,
        type: '',
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.addPersonalContactPopup = {
        isOpen: false,
        type: '',
        email: '',
        emailErr: '',
        website: '',
        websiteErr: '',
        fax: '',
        phone: '',
        telephone: '',
        address: '',
      }
      state.userPopup = {
        isOpen: false,
        email: '',
        keyValue: 0,
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
      }
      state.contentDeletePopup = {
        isOpen: false,
        title: '',
        key: 0,
        type: '',
      }
      state.duplicationMediaPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.duplicationPressPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.pressMediaErrPopup = {
        isOpen: false,
        newsTitle: '',
        type: '',
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.blockedEmailSenderPopup = {
        isOpen: false,
        type: '',
        status: '',
        idKey: '',
      }
      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }
      state.savedSearchPopup = {
        isOpen: false,
        isOwner: false,
        type: '',
        key: 0,
        name: '',
        originName: '',
        nameErr: '',
        scrop: { id: '', name: '' },
        scropTarget: { id: '', name: '' },
        userList: [],
        selectedUser: { id: '', name: '' },
      }
      state.searchActivate = true
      state.searchDropBoxActivate = false
      state.editPageOpen = action.payload.editPageOpen
      state.mediaSearchOptionParams = action.payload.mediaListParams
    },
    mediaLocationPopupListAction: (state, action: PayloadAction<string[]>) => {
      state.mediaLocationPopupList = action.payload
    },
    mediaFieldPopupAction: (state, action: PayloadAction<mediaFieldPopupProps>) => {
      state.mediaFieldPopup = action.payload
    },
    basicLocationPopupAction: (state, action: PayloadAction<basicFieldPopupProps>) => {
      state.basicLocationPopup = action.payload
    },
    basicLocationListAction: (state, action: PayloadAction<mediaLocationListProps[]>) => {
      state.basicLocationList = action.payload
    },
    mediaLocationPopupAction: (state, action: PayloadAction<mediaLocationPopupProps>) => {
      state.mediaLocationPopup = action.payload
    },
    mediaTypePopupAction: (state, action: PayloadAction<mediaTypePopupProps>) => {
      state.mediaTypePopup = action.payload
    },
    mediaTypePopupListAction: (state, action: PayloadAction<CommonCode[]>) => {
      state.mediaTypePopupList = action.payload
    },
    mediaLocationListAction: (state, action: PayloadAction<mediaLocationListProps[]>) => {
      state.mediaLocationList = action.payload
    },
    mediaFieldListAction: (state, action: PayloadAction<mediaFieldListProps[]>) => {
      state.mediaFieldList = action.payload
    },
    filterDataListAction: (state, action: PayloadAction<IJournalistSearchFilter | null>) => {
      state.filterDataList = action.payload
    },
    pressMediaUnBlockPopupAction: (state, action: PayloadAction<pressMediaUnBlockPopupProps>) => {
      state.pressMediaUnBlockPopup = action.payload
    },
    mediaFieldPopupListAction: (state, action: PayloadAction<string[]>) => {
      state.mediaFieldPopupList = action.payload
    },
    mediaBlockYNListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.mediaBlockYNList = action.payload
    },
    mediaNameRevealedYNListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.mediaNameRevealedYNList = action.payload
    },
    journalistBlockYNListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.journalistBlockYNList = action.payload
    },
    mediaCountListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.mediaCountList = action.payload
    },
    journalistInfoTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.journalistInfoTypeList = action.payload
    },
    languageListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.languageList = action.payload
    },
    isJournalUserBlockAction: (state, action: PayloadAction<isMediaUserBlockProps>) => {
      state.isJournalUserBlock = action.payload
    },
    isMediaUserBlockAction: (state, action: PayloadAction<isMediaUserBlockProps>) => {
      state.isMediaUserBlock = action.payload
    },
    savedJournalListLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.savedJournalListLoading = action.payload
    },
    savedMediaListLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.savedMediaListLoading = action.payload
    },
    pressNewsListAction: (state, action: PayloadAction<pressNewsData[]>) => {
      state.pressNewsList = action.payload
    },
    mediaLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.mediaLoading = action.payload
    },
    journalLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.journalLoading = action.payload
    },
    savedJournalListKeywordAction: (state, action: PayloadAction<string>) => {
      state.savedJournalListKeyword = action.payload
    },
    resetSavedJournalListKeywordAction: (state, action: PayloadAction<JournalistSrchDto[]>) => {
      state.savedJournalListKeyword = ''
      state.savedJournalList = action.payload
    },
    addPersonalContactAction: (state, action: PayloadAction<addPersonalContactProps>) => {
      state.addPersonalContactPopup = action.payload
    },
    savedMediaListKeywordAction: (state, action: PayloadAction<string>) => {
      state.savedMediaListKeyword = action.payload
    },
    mediaParamKeywordAction: (state, action: PayloadAction<string>) => {
      state.mediaParamKeyword = action.payload
    },
    mediaIdParamsAction: (state, action: PayloadAction<ESearchMediaDocumentDto>) => {
      state.mediaIdKey = action.payload.mid || 0
      state.mediaIdKeyParam = action.payload
      state.mediaTab = 'profile'
      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
      state.mediaActivityCountPage = 10
      state.activityListByMediaId = []
    },
    resetSavedMediaListKeywordAction: (state, action: PayloadAction<MediaSrchDto[]>) => {
      state.savedMediaListKeyword = ''
      state.savedMediaList = action.payload
    },
    mediaSubTypeListAction: (state, action: PayloadAction<mediaSubTypeListProps[]>) => {
      state.mediaSubTypeList = action.payload
    },
    filterInformationAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.filterInformation = action.payload
    },
    filterMediaInfoTypeAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.filterMediaInfoType = action.payload
    },
    filterPubCycleAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.filterPubCycle = action.payload
    },
    filterPortalCodeAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.filterPortalCode = action.payload
    },
    actionStateFilterAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.actionStateFilterList = action.payload
    },
    publisherTypeAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.publisherTypeList = action.payload
    },
    actionCategoryListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.actionCategoryList = action.payload
    },
    afterMediaRegistAddMediaParamAction: (
      state,
      action: PayloadAction<{ list: ESearchMediaDocumentDto[]; mediaParam: ESearchMediaDocumentDto }>
    ) => {
      state.mediaApiList = action.payload.list
      state.mediaIdKeyParam = action.payload.mediaParam
    },
    afterMediaRegistAddMediaListAction: (
      state,
      action: PayloadAction<{ list: ESearchMediaDocumentDto[]; mediaParam: ESearchMediaDocumentDto }>
    ) => {
      state.searchContentKeyList = []
      state.mediaApiList = action.payload.list
      state.mediaIdKeyParam = action.payload.mediaParam
    },
    afterPressRegistAddPressParamAction: (
      state,
      action: PayloadAction<{ list: ESearchJournalistDocumentDto[]; pressParam: ESearchJournalistDocumentDto }>
    ) => {
      state.journalApiList = action.payload.list
      state.journalIdKeyParam = action.payload.pressParam
    },
    afterPressRegistAddPressListAction: (
      state,
      action: PayloadAction<{ list: ESearchJournalistDocumentDto[]; pressParam: ESearchJournalistDocumentDto }>
    ) => {
      state.searchContentKeyList = []
      state.journalApiList = action.payload.list
      state.journalIdKeyParam = action.payload.pressParam
    },
    journalContactInfoAction: (
      state,
      action: PayloadAction<{ journalContactInfo: ContactUserAddedDto | null; isBlocked: number }>
    ) => {
      state.journalContactInfo = action.payload.journalContactInfo
      state.journalContactBlockedInfo = action.payload.isBlocked
    },
    mediaContactInfoAction: (state, action: PayloadAction<ContactUserAddedDto | null>) => {
      state.mediaContactInfo = action.payload
    },
    journalistSocialFilterListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.journalistSocialFilterList = action.payload
    },
    journalistOccupationListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.journalistOccupationList = action.payload
    },
    actionStateListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.actionStateList = action.payload
    },
    newsLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.newsLoading = action.payload
    },
    countLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.countLoading = action.payload
    },
    newsListByMediaIdAction: (
      state,
      action: PayloadAction<{
        list: MonitoringSearchNewsDocumentDto[]
        page: number
        mediaTab: string
        totalCount: number
      }>
    ) => {
      state.newsListByMediaId = action.payload.list
      state.mediaNewsCountPage = action.payload.page
      state.mediaTab = action.payload.mediaTab
      state.mediaActivityCountPage = 10
      state.activityListByMediaId = []
      state.newsListTotalCount = action.payload.totalCount
    },
    activityLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.activityLoading = action.payload
    },
    filterMediaTypeAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.filterMediaType = action.payload
    },
    isLimitFilterAction: (state, action: PayloadAction<number>) => {
      state.isLimitFilter = action.payload
    },
    contentListImageIdAction: (state, action: PayloadAction<number>) => {
      state.contentListImageId = action.payload
    },
    profileImageIdAction: (state, action: PayloadAction<number>) => {
      state.profileImageId = action.payload
    },
    setProfileImageIdAction: (state, action: PayloadAction<number>) => {
      state.profileImageId = action.payload
      state.contentListImageId = action.payload
      state.registerJournalPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.registerMediaPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
    },
    setOnChangeMediaFilterSearchOptionAction: (
      state,
      action: PayloadAction<{
        props: mediaSearchOptionProps
        dto: ESearchMediaCondDto
        mediaData: ESearchMediaDocumentDto[]
        pageCount: pageCountProps
        tempFilterSubParam: filterSubParamActionsProps[]
      }>
    ) => {
      state.mediaTab = 'profile'
      state.searchContentKeyList = []
      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
      state.mediaActivityCountPage = 10
      state.activityListByMediaId = []
      state.editPageOpen = false
      state.mediaListParams = action.payload.props
      state.mediaDto = action.payload.dto
      state.searchLimitAlarm = false
      state.mediaApiList = action.payload.mediaData
      state.mediaIdKeyParam =
        action.payload.mediaData.length > 0 ? (action.payload.mediaData[0] ? action.payload.mediaData[0] : null) : null
      state.mediaIdKey =
        action.payload.mediaData.length > 0
          ? action.payload.mediaData[0].mid
            ? action.payload.mediaData[0].mid
            : 0
          : 0
      state.pageCount = action.payload.pageCount
      state.filterMediaSubParamActions = action.payload.tempFilterSubParam
    },
    setOnChangePressFilterSearchOptionAction: (
      state,
      action: PayloadAction<{
        props: pressSearchOptionProps
        dto: ESearchJournalistCondDto
        journalData: ESearchJournalistDocumentDto[]
        pageCount: pageCountProps
        tempFilterSubParam: filterSubParamActionsProps[]
        journalDecodeList: journalDecodeListProps
      }>
    ) => {
      state.editPageOpen = false
      state.searchContentKeyList = []
      state.journalTab = 'profile'
      state.journalNewsCountPage = 10
      state.newsListByJournalId = []
      state.journalActivityCountPage = 10
      state.activityListByJournalId = []
      state.journalDecodeList = action.payload.journalDecodeList
      state.pressListParams = action.payload.props
      state.pressDto = action.payload.dto
      state.searchLimitAlarm = false
      state.journalApiList = action.payload.journalData
      state.journalIdKeyParam =
        action.payload.journalData.length > 0
          ? action.payload.journalData[0]
            ? action.payload.journalData[0]
            : null
          : null
      state.journalIdKey =
        action.payload.journalData.length > 0
          ? action.payload.journalData[0].jrnlst_id
            ? action.payload.journalData[0].jrnlst_id
            : 0
          : 0
      state.pageCount = action.payload.pageCount
      state.filterJournalSubParamActions = action.payload.tempFilterSubParam
    },
    activityListByMediaIdAction: (
      state,
      action: PayloadAction<{ list: searchContentListProps[]; page: number; mediaTab: string; totalCount: number }>
    ) => {
      state.activityListByMediaId = action.payload.list
      state.mediaActivityCountPage = action.payload.page
      state.mediaTab = action.payload.mediaTab
      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
      state.activityListTotalCount = action.payload.totalCount
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
      state.basicLocationPopup = {
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
      state.registerJournalPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.registerMediaPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.pressMediaUnBlockPopup = {
        isOpen: false,
        type: '',
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.addPersonalContactPopup = {
        isOpen: false,
        type: '',
        email: '',
        emailErr: '',
        website: '',
        websiteErr: '',
        fax: '',
        phone: '',
        telephone: '',
        address: '',
      }
      state.userPopup = {
        isOpen: false,
        email: '',
        keyValue: 0,
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
      }
      state.contentDeletePopup = {
        isOpen: false,
        title: '',
        key: 0,
        type: '',
      }
      state.duplicationMediaPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.duplicationPressPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.pressMediaErrPopup = {
        isOpen: false,
        newsTitle: '',
        type: '',
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.blockedEmailSenderPopup = {
        isOpen: false,
        type: '',
        status: '',
        idKey: '',
      }
      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }
      state.savedSearchPopup = {
        isOpen: false,
        isOwner: false,
        type: '',
        key: 0,
        name: '',
        originName: '',
        nameErr: '',
        scrop: { id: '', name: '' },
        scropTarget: { id: '', name: '' },
        userList: [],
        selectedUser: { id: '', name: '' },
      }
      state.pressSearchOptionParams = initialState.pressListParams
      state.mediaSearchOptionParams = initialState.mediaListParams
      state.searchActivate = false
      state.searchDropBoxActivate = false
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
      state.basicLocationPopup = {
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
      state.registerJournalPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.registerMediaPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.pressMediaUnBlockPopup = {
        isOpen: false,
        type: '',
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.addPersonalContactPopup = {
        isOpen: false,
        type: '',
        email: '',
        emailErr: '',
        website: '',
        websiteErr: '',
        fax: '',
        phone: '',
        telephone: '',
        address: '',
      }
      state.userPopup = {
        isOpen: false,
        email: '',
        keyValue: 0,
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
      }
      state.contentDeletePopup = {
        isOpen: false,
        title: '',
        key: 0,
        type: '',
      }
      state.duplicationMediaPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.duplicationPressPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.pressMediaErrPopup = {
        isOpen: false,
        newsTitle: '',
        type: '',
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.blockedEmailSenderPopup = {
        isOpen: false,
        type: '',
        status: '',
        idKey: '',
      }
      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }
      state.savedSearchPopup = {
        isOpen: false,
        isOwner: false,
        type: '',
        key: 0,
        name: '',
        originName: '',
        nameErr: '',
        scrop: { id: '', name: '' },
        scropTarget: { id: '', name: '' },
        userList: [],
        selectedUser: { id: '', name: '' },
      }

      state.pressSearchOptionParams.additionalParam = action.payload
      if (state.pressSearchOptionParams.keywordParam.journalistTagList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.keywordParam.newsKeyword.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.keywordParam.field.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.keywordParam.area.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.keywordParam.mediaTagList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.keywordParam.mediaType.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.keywordParam.occupation.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.keywordParam.position.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.keywordParam.keyword.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.keywordParam.department.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.keywordParam.publishingPeriod.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.keywordParam.newsKeywordValue !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.keywordParam.positionValue !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.keywordParam.keywordValue !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.keywordParam.departmentValue !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.keywordParam.informationType.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.languageParam.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.count.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.system.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.limit.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaTargetList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaField.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaArea.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaGroupList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.portal.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.social.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else {
        state.searchActivate = false
        state.searchDropBoxActivate = false
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
      state.basicLocationPopup = {
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
      state.registerJournalPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.registerMediaPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.pressMediaUnBlockPopup = {
        isOpen: false,
        type: '',
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.addPersonalContactPopup = {
        isOpen: false,
        type: '',
        email: '',
        emailErr: '',
        website: '',
        websiteErr: '',
        fax: '',
        phone: '',
        telephone: '',
        address: '',
      }
      state.userPopup = {
        isOpen: false,
        email: '',
        keyValue: 0,
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
      }
      state.contentDeletePopup = {
        isOpen: false,
        title: '',
        key: 0,
        type: '',
      }
      state.duplicationMediaPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.duplicationPressPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.pressMediaErrPopup = {
        isOpen: false,
        newsTitle: '',
        type: '',
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.blockedEmailSenderPopup = {
        isOpen: false,
        type: '',
        status: '',
        idKey: '',
      }
      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }
      state.savedSearchPopup = {
        isOpen: false,
        isOwner: false,
        type: '',
        key: 0,
        name: '',
        originName: '',
        nameErr: '',
        scrop: { id: '', name: '' },
        scropTarget: { id: '', name: '' },
        userList: [],
        selectedUser: { id: '', name: '' },
      }
      state.mediaSearchOptionParams.keywordParam = action.payload
      if (action.payload.mediaTagList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaType.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaField.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaArea.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaGroupList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.publishingPeriod.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.keyword.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.keywordValue !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.informationType.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.mediaSearchOptionParams.additionalParam.languageParam.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.mediaSearchOptionParams.additionalParam.isJournalist.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.mediaSearchOptionParams.additionalParam.system.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.mediaSearchOptionParams.additionalParam.limit.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.mediaSearchOptionParams.additionalParam.journalistTargetList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.mediaSearchOptionParams.additionalParam.portal.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else {
        state.searchActivate = false
        state.searchDropBoxActivate = false
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
      state.basicLocationPopup = {
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
      state.registerJournalPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.registerMediaPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.pressMediaUnBlockPopup = {
        isOpen: false,
        type: '',
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.addPersonalContactPopup = {
        isOpen: false,
        type: '',
        email: '',
        emailErr: '',
        website: '',
        websiteErr: '',
        fax: '',
        phone: '',
        telephone: '',
        address: '',
      }
      state.userPopup = {
        isOpen: false,
        email: '',
        keyValue: 0,
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
      }
      state.contentDeletePopup = {
        isOpen: false,
        title: '',
        key: 0,
        type: '',
      }
      state.duplicationMediaPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.duplicationPressPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.pressMediaErrPopup = {
        isOpen: false,
        newsTitle: '',
        type: '',
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.blockedEmailSenderPopup = {
        isOpen: false,
        type: '',
        status: '',
        idKey: '',
      }
      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }
      state.savedSearchPopup = {
        isOpen: false,
        isOwner: false,
        type: '',
        key: 0,
        name: '',
        originName: '',
        nameErr: '',
        scrop: { id: '', name: '' },
        scropTarget: { id: '', name: '' },
        userList: [],
        selectedUser: { id: '', name: '' },
      }
      state.mediaSearchOptionParams.additionalParam = action.payload
      if (state.mediaSearchOptionParams.keywordParam.mediaTagList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.mediaSearchOptionParams.keywordParam.mediaType.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.mediaSearchOptionParams.keywordParam.mediaField.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.mediaSearchOptionParams.keywordParam.mediaArea.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.mediaSearchOptionParams.keywordParam.mediaGroupList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.mediaSearchOptionParams.keywordParam.publishingPeriod.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.mediaSearchOptionParams.keywordParam.keyword.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.mediaSearchOptionParams.keywordParam.keywordValue !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.mediaSearchOptionParams.keywordParam.informationType.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.languageParam.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.isJournalist.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.system.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.limit.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.journalistTargetList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.portal.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else {
        state.searchActivate = false
        state.searchDropBoxActivate = false
      }
    },
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
      state.basicLocationPopup = {
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
      state.registerJournalPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.registerMediaPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.pressMediaUnBlockPopup = {
        isOpen: false,
        type: '',
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.addPersonalContactPopup = {
        isOpen: false,
        type: '',
        email: '',
        emailErr: '',
        website: '',
        websiteErr: '',
        fax: '',
        phone: '',
        telephone: '',
        address: '',
      }
      state.userPopup = {
        isOpen: false,
        email: '',
        keyValue: 0,
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
      }
      state.contentDeletePopup = {
        isOpen: false,
        title: '',
        key: 0,
        type: '',
      }
      state.duplicationMediaPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.duplicationPressPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.pressMediaErrPopup = {
        isOpen: false,
        newsTitle: '',
        type: '',
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.blockedEmailSenderPopup = {
        isOpen: false,
        type: '',
        status: '',
        idKey: '',
      }
      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }
      state.savedSearchPopup = {
        isOpen: false,
        isOwner: false,
        type: '',
        key: 0,
        name: '',
        originName: '',
        nameErr: '',
        scrop: { id: '', name: '' },
        scropTarget: { id: '', name: '' },
        userList: [],
        selectedUser: { id: '', name: '' },
      }

      state.pressSearchOptionParams.keywordParam = action.payload
      if (action.payload.journalistTagList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.newsKeyword.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.field.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.area.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaTagList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.mediaType.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.occupation.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.position.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.keyword.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.department.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.publishingPeriod.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.newsKeywordValue !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.positionValue !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.keywordValue !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.departmentValue !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (action.payload.informationType.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.additionalParam.languageParam.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.additionalParam.count.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.additionalParam.system.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.additionalParam.limit.id !== '') {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.additionalParam.mediaTargetList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.additionalParam.mediaField.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.additionalParam.mediaArea.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.additionalParam.mediaGroupList.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.additionalParam.portal.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else if (state.pressSearchOptionParams.additionalParam.social.length > 0) {
        state.searchActivate = true
        state.searchDropBoxActivate = true
      } else {
        state.searchActivate = false
        state.searchDropBoxActivate = false
      }
    },
    pressIdParamsAction: (
      state,
      action: PayloadAction<{
        param: ESearchJournalistDocumentDto
        beemail: string
        mobile: string
        landline: string
        landlineShared: string
        fax: string
      }>
    ) => {
      state.journalIdKey = action.payload.param.jrnlst_id || 0
      state.journalIdKeyParam = action.payload.param
      state.journalDecodeList = {
        beemail: action.payload.beemail,
        mobile: action.payload.mobile,
        landline: action.payload.landline,
        landlineShared: action.payload.landlineShared,
        fax: action.payload.fax,
      }
      state.journalTab = 'profile'
      state.journalNewsCountPage = 10
      state.newsListByJournalId = []
      state.journalActivityCountPage = 10
      state.activityListByJournalId = []
    },
    setinitMediaListAction: (
      state,
      action: PayloadAction<{
        listDefine: string
        mediaId: number
        mediaFilterSub: NavigationLinkItem[]
        tempMediaIdParams: ESearchMediaDocumentDto | null
        pageCount: pageCountProps
        tempMediaList: ESearchMediaDocumentDto[]
        mediaFilterSubActions: filterSubParamActionsProps[]
        tempSearchKeywordOption: string
      }>
    ) => {
      state.listDefine = action.payload.listDefine
      if (action.payload.tempSearchKeywordOption !== '') {
        state.mediaParamKeyword = action.payload.tempSearchKeywordOption
        state.pressParamKeyword = ''
        state.pressParamKeywordButton = false
        state.mediaParamKeywordButton = true
      } else {
        state.mediaParamKeyword = ''
        state.pressParamKeyword = ''
        state.pressParamKeywordButton = false
        state.mediaParamKeywordButton = false
      }
      state.filterMediaSubParamActions = action.payload.mediaFilterSubActions
      state.filterMediaSubParam = action.payload.mediaFilterSub
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.mediaApiList = action.payload.tempMediaList
      state.mediaIdKey = action.payload.mediaId
      state.mediaIdKeyParam = action.payload.tempMediaIdParams
    },
    setinitPressListAction: (
      state,
      action: PayloadAction<{
        listDefine: string
        journalistId: number
        journalFilterSub: NavigationLinkItem[]
        tempJournalIdParams: ESearchJournalistDocumentDto | null
        pageCount: pageCountProps
        tempJournalList: ESearchJournalistDocumentDto[]
        pressFilterSubActions: filterSubParamActionsProps[]
        journalDecodeList: journalDecodeListProps
        tempSearchKeywordOption: string
      }>
    ) => {
      state.listDefine = action.payload.listDefine
      if (action.payload.tempSearchKeywordOption !== '') {
        state.mediaParamKeyword = ''
        state.pressParamKeyword = action.payload.tempSearchKeywordOption
        state.pressParamKeywordButton = true
        state.mediaParamKeywordButton = false
      } else {
        state.mediaParamKeyword = ''
        state.pressParamKeyword = ''
        state.pressParamKeywordButton = false
        state.mediaParamKeywordButton = false
      }
      state.filterJournalSubParamActions = action.payload.pressFilterSubActions
      state.filterJournalSubParam = action.payload.journalFilterSub
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.journalApiList = action.payload.tempJournalList
      state.journalIdKey = action.payload.journalistId
      state.journalIdKeyParam = action.payload.tempJournalIdParams
      state.journalDecodeList = action.payload.journalDecodeList
    },
    setResetPressSavedSearchListAction: (
      state,
      action: PayloadAction<{
        tempSavedJournalList: JournalistSrchDto[]
      }>
    ) => {
      state.savedJournalList = action.payload.tempSavedJournalList
      state.originSavedJournalList = action.payload.tempSavedJournalList
    },
    setResetMediaSavedSearchListAction: (
      state,
      action: PayloadAction<{
        tempSavedMediaList: MediaSrchDto[]
      }>
    ) => {
      state.savedMediaList = action.payload.tempSavedMediaList
      state.originSavedMediaList = action.payload.tempSavedMediaList
    },
    setFilterPressMediaDataAction: (
      state,
      action: PayloadAction<{
        pressDto: ESearchJournalistCondDto
        mediaDto: ESearchMediaCondDto
        pressParam: pressSearchOptionProps
        mediaParam: mediaSearchOptionProps
        tempSavedJournalList: JournalistSrchDto[]
        tempSavedMediaList: MediaSrchDto[]
        journal_saved_search: number
        media_saved_search: number
        savedJournalAuth: boolean
        savedMediaAuth: boolean
        tempOwnerKey: number
        tempIsFilter: boolean
      }>
    ) => {
      state.savedJournalAuth = action.payload.savedJournalAuth
      state.savedMediaAuth = action.payload.savedMediaAuth
      state.pressDto = action.payload.pressDto
      state.mediaDto = action.payload.mediaDto
      state.pressListParams = action.payload.pressParam
      state.mediaListParams = action.payload.mediaParam
      state.savedJournalList = action.payload.tempSavedJournalList
      state.savedMediaList = action.payload.tempSavedMediaList
      state.originSavedJournalList = action.payload.tempSavedJournalList
      state.originSavedMediaList = action.payload.tempSavedMediaList
      state.isOwner = action.payload.tempOwnerKey > 0
      if (action.payload.journal_saved_search > 0) {
        state.savedJournalKey = action.payload.journal_saved_search
        state.savedMediaKey = 0
      } else if (action.payload.media_saved_search > 0) {
        state.savedJournalKey = 0
        state.savedMediaKey = action.payload.media_saved_search
      } else {
        state.savedJournalKey = 0
        state.savedMediaKey = 0
      }
      state.isFilterSubParam = action.payload.tempIsFilter
    },
    setChangePressSavedSearchTargetIdAction: (
      state,
      action: PayloadAction<{
        pressDto: ESearchJournalistCondDto
        pressParam: pressSearchOptionProps
        journal_saved_search: number
        savedJournalAuth: boolean
      }>
    ) => {
      state.listDefine = 'press'
      state.searchActivate = false
      state.searchDropBoxActivate = false
      state.editPageOpen = false
      state.searchContentKeyList = []
      state.pressDto = action.payload.pressDto
      state.pressListParams = action.payload.pressParam
      state.savedJournalKey = action.payload.journal_saved_search
      state.savedMediaKey = 0
      state.savedJournalAuth = action.payload.savedJournalAuth
    },
    setChangeMediaSavedSearchTargetIdAction: (
      state,
      action: PayloadAction<{
        mediaDto: ESearchMediaCondDto
        mediaParam: mediaSearchOptionProps
        media_saved_search: number
        savedMediaAuth: boolean
      }>
    ) => {
      state.listDefine = 'media'
      state.searchActivate = false
      state.searchDropBoxActivate = false
      state.editPageOpen = false
      state.searchContentKeyList = []
      state.mediaDto = action.payload.mediaDto
      state.mediaListParams = action.payload.mediaParam
      state.savedJournalKey = 0
      state.savedMediaKey = action.payload.media_saved_search
      state.savedMediaAuth = action.payload.savedMediaAuth
    },
    setOnChangeMediaSearchOptionAction: (
      state,
      action: PayloadAction<{
        props: mediaSearchOptionProps
        dto: ESearchMediaCondDto
        mediaData: ESearchMediaDocumentDto[]
        pageCount: pageCountProps
        mediaFilterSub: NavigationLinkItem[]
        isResetSelectedNews: boolean
        type: string
      }>
    ) => {
      state.listDefine = 'media'
      state.mediaTab = 'profile'
      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
      state.mediaActivityCountPage = 10
      state.activityListByMediaId = []
      state.searchActivate = true
      state.searchDropBoxActivate = false
      state.editPageOpen = false
      if (action.payload.isResetSelectedNews) {
        state.searchContentKeyList = []
      }
      state.mediaDto = action.payload.dto
      state.mediaListParams = action.payload.props
      state.searchLimitAlarm = false
      state.mediaApiList = action.payload.mediaData
      state.mediaIdKeyParam =
        action.payload.mediaData.length > 0 ? (action.payload.mediaData[0] ? action.payload.mediaData[0] : null) : null
      state.mediaIdKey =
        action.payload.mediaData.length > 0
          ? action.payload.mediaData[0].mid
            ? action.payload.mediaData[0].mid
            : 0
          : 0
      state.pageCount = action.payload.pageCount
      if (action.payload.mediaFilterSub.length > 0) {
        state.filterMediaSubParam = action.payload.mediaFilterSub
      }
      if (action.payload.type === 'dto') {
        state.filterMediaSubParamActions = subMediaFilterOptionsList
      }
    },
    setOnChangeMediaAction: (
      state,
      action: PayloadAction<{
        mediaData: ESearchMediaDocumentDto[]
        pageCount: pageCountProps
        mediaFilterSub: NavigationLinkItem[]
      }>
    ) => {
      state.mediaTab = 'profile'
      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
      state.mediaActivityCountPage = 10
      state.activityListByMediaId = []
      state.filterMediaSubParamActions = subMediaFilterOptionsList
      state.filterMediaSubParam = action.payload.mediaFilterSub
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.mediaApiList = action.payload.mediaData
      state.mediaIdKeyParam =
        action.payload.mediaData.length > 0 ? (action.payload.mediaData[0] ? action.payload.mediaData[0] : null) : null
      state.mediaIdKey =
        action.payload.mediaData.length > 0
          ? action.payload.mediaData[0].mid
            ? action.payload.mediaData[0].mid
            : 0
          : 0
    },
    setOnChangePressSearchOptionAction: (
      state,
      action: PayloadAction<{
        props: pressSearchOptionProps
        dto: ESearchJournalistCondDto
        journalData: ESearchJournalistDocumentDto[]
        pageCount: pageCountProps
        journalDecodeList: journalDecodeListProps
        journalFilterSub: NavigationLinkItem[]
        isResetSelectedNews: boolean
        type: string
      }>
    ) => {
      state.listDefine = 'press'
      state.searchActivate = true
      state.searchDropBoxActivate = false
      state.editPageOpen = false
      state.journalTab = 'profile'
      state.journalNewsCountPage = 10
      state.newsListByJournalId = []
      state.journalActivityCountPage = 10
      state.activityListByJournalId = []
      state.journalDecodeList = action.payload.journalDecodeList
      if (action.payload.isResetSelectedNews) {
        state.searchContentKeyList = []
      }
      state.pressDto = action.payload.dto
      state.pressListParams = action.payload.props
      state.searchLimitAlarm = false
      state.journalApiList = action.payload.journalData

      state.journalIdKeyParam =
        action.payload.journalData.length > 0
          ? action.payload.journalData[0]
            ? action.payload.journalData[0]
            : null
          : null
      state.journalIdKey =
        action.payload.journalData.length > 0
          ? action.payload.journalData[0].jrnlst_id
            ? action.payload.journalData[0].jrnlst_id
            : 0
          : 0
      state.pageCount = action.payload.pageCount
      if (action.payload.journalFilterSub.length > 0) {
        state.filterJournalSubParam = action.payload.journalFilterSub
      }
      if (action.payload.type === 'dto') {
        state.filterJournalSubParamActions = subJournalFilterOptionsList
      }
    },
    setOnChangePressAction: (
      state,
      action: PayloadAction<{
        journalData: ESearchJournalistDocumentDto[]
        pageCount: pageCountProps
        journalDecodeList: journalDecodeListProps
        journalFilterSub: NavigationLinkItem[]
      }>
    ) => {
      state.journalTab = 'profile'
      state.journalNewsCountPage = 10
      state.newsListByJournalId = []
      state.journalActivityCountPage = 10
      state.activityListByJournalId = []
      state.journalDecodeList = action.payload.journalDecodeList
      state.filterJournalSubParamActions = subJournalFilterOptionsList
      state.filterJournalSubParam = action.payload.journalFilterSub
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.journalApiList = action.payload.journalData
      state.journalIdKeyParam =
        action.payload.journalData.length > 0
          ? action.payload.journalData[0]
            ? action.payload.journalData[0]
            : null
          : null
      state.journalIdKey =
        action.payload.journalData.length > 0
          ? action.payload.journalData[0].jrnlst_id
            ? action.payload.journalData[0].jrnlst_id
            : 0
          : 0
    },
    basicFieldListAction: (state, action: PayloadAction<fieldListProps[]>) => {
      state.basicFieldList = action.payload
    },
    basicFieldPopupAction: (state, action: PayloadAction<basicFieldPopupProps>) => {
      state.basicFieldPopup = action.payload
    },
    setFilterMediaDataActionByKeyword: (
      state,
      action: PayloadAction<{
        tempSavedMediaList: MediaSrchDto[]
      }>
    ) => {
      state.savedMediaList = action.payload.tempSavedMediaList
    },
    setFilterPressDataActionByKeyword: (
      state,
      action: PayloadAction<{
        tempSavedJournalList: JournalistSrchDto[]
      }>
    ) => {
      state.savedJournalList = action.payload.tempSavedJournalList
    },
    initSearchAction: state => {
      state.listDefine = ''
      state.isOwner = false
      state.editPageOpen = false
      state.isFilterSubParam = false
      state.searchActivate = false
      state.searchDropBoxActivate = false
      state.savedJournalAuth = false
      state.savedMediaAuth = false
      state.pageCount = {
        totalCount: 0,
        totalPageCount: 1,
      }
      state.savedJournalListLoading = false
      state.savedMediaListLoading = false
      state.savedJournalList = []
      state.savedMediaList = []
      state.originSavedJournalList = []
      state.originSavedMediaList = []
      state.savedJournalKey = 0
      state.savedMediaKey = 0
      state.savedJournalListKeyword = ''
      state.savedMediaListKeyword = ''

      state.isTagButton = false
      state.isSelectedAllNewsId = false
      state.searchContentListButton = false
      state.mediaParamsExpandButton = false
      state.pressParamsExpandButton = false
      state.mediaParamKeywordButton = false
      state.pressParamKeywordButton = false
      state.searchContentKeyList = []
      state.pressListParams = {
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
      state.mediaListParams = {
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
      state.pressDto = {
        page: 1,
        size: 20,
        sort: ['media.main.price!desc'],
        groupId: 0,
      }
      state.mediaDto = {
        page: 1,
        size: 20,
        sort: ['values.combined!desc'],
        groupId: 0,
      }
      state.pressParamKeyword = ''
      state.mediaParamKeyword = ''
      state.journalApiList = []
      state.mediaApiList = []
      state.journalIdKey = 0
      state.mediaIdKey = 0
      state.mediaLoading = true
      state.journalLoading = true

      state.journalDecodeList = {
        beemail: '',
        mobile: '',
        landline: '',
        landlineShared: '',
        fax: '',
      }
      state.isLimitFilter = 0
      state.filterJournalSubParam = []
      state.journalIdKeyParam = null
      state.filterJournalSubParamActions = []

      state.filterMediaSubParam = []
      state.mediaIdKeyParam = null
      state.filterMediaSubParamActions = []

      state.mediaSubTypeList = []
      state.filterInformation = []
      state.filterMediaInfoType = []
      state.filterPubCycle = []
      state.filterPortalCode = []
      state.actionStateFilterList = []
      state.publisherTypeList = []
      state.actionCategoryList = []
      state.journalistSocialFilterList = []
      state.journalistOccupationList = []
      state.actionStateList = []
      state.filterMediaType = []
      state.journalistInfoTypeList = []
      state.languageList = []
      state.mediaCountList = []
      state.mediaNameRevealedYNList = []
      state.journalistBlockYNList = []
      state.mediaBlockYNList = []
      state.mediaTypePopupList = []
      state.basicLocationList = []
      state.mediaLocationList = []
      state.mediaFieldList = []
      state.filterDataList = null
      state.mediaFieldPopupList = []
      state.mediaLocationPopupList = []
      state.basicFieldList = []

      state.isJournalUserBlock = {
        blockedUserId: 0,
        companyId: 0,
        licenseId: 0,
        blockedAt: '',
        unblockRequestBy: null,
        unblockRequestCnt: 0,
      }
      state.isMediaUserBlock = {
        blockedUserId: 0,
        companyId: 0,
        licenseId: 0,
        blockedAt: '',
        unblockRequestBy: null,
        unblockRequestCnt: 0,
      }

      state.journalTab = 'profile'
      state.mediaTab = 'profile'
      state.mediaCheckDuplicateParam = null
      state.pressCheckDuplicateParam = null
      state.isSearchedNewsOpen = false

      state.journalNewsCountPage = 10
      state.newsListByJournalId = []
      state.journalActivityCountPage = 10
      state.activityListByJournalId = []
      state.journalContactInfo = null
      state.journalContactBlockedInfo = 0
      state.journalEmailBlocking = false

      state.newsLoading = false
      state.activityLoading = false

      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
      state.mediaActivityCountPage = 10
      state.activityListByMediaId = []
      state.mediaContactInfo = null
      state.mediaEmailBlocking = false

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
      state.basicLocationPopup = {
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
      state.registerJournalPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.registerMediaPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.pressMediaUnBlockPopup = {
        isOpen: false,
        type: '',
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.addPersonalContactPopup = {
        isOpen: false,
        type: '',
        email: '',
        emailErr: '',
        website: '',
        websiteErr: '',
        fax: '',
        phone: '',
        telephone: '',
        address: '',
      }
      state.userPopup = {
        isOpen: false,
        email: '',
        keyValue: 0,
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
      }
      state.contentDeletePopup = {
        isOpen: false,
        title: '',
        key: 0,
        type: '',
      }
      state.duplicationMediaPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.duplicationPressPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.pressMediaErrPopup = {
        isOpen: false,
        newsTitle: '',
        type: '',
        key: 0,
        title: '',
        titleErr: '',
        contents: '',
        contentErr: '',
      }
      state.blockedEmailSenderPopup = {
        isOpen: false,
        type: '',
        status: '',
        idKey: '',
      }
      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      }
      state.savedSearchPopup = {
        isOpen: false,
        isOwner: false,
        type: '',
        key: 0,
        name: '',
        originName: '',
        nameErr: '',
        scrop: { id: '', name: '' },
        scropTarget: { id: '', name: '' },
        userList: [],
        selectedUser: { id: '', name: '' },
      }

      state.pressNewsList = []

      state.searchLimitAlarm = false
      state.profileImageId = 0
      state.contentListImageId = 0
    },
  },
})

export const {
  initSearchAction,
  savedJournalListKeywordAction,
  savedMediaListKeywordAction,
  filterInformationAction,
  filterMediaInfoTypeAction,
  filterPubCycleAction,
  filterPortalCodeAction,
  actionStateFilterAction,
  actionCategoryListAction,
  publisherTypeAction,
  afterPressRegistAddPressParamAction,
  afterPressRegistAddPressListAction,
  afterMediaRegistAddMediaParamAction,
  afterMediaRegistAddMediaListAction,
  journalistSocialFilterListAction,
  journalistOccupationListAction,
  actionStateListAction,
  filterMediaTypeAction,
  mediaSubTypeListAction,
  savedJournalListLoadingAction,
  savedMediaListLoadingAction,
  pressNewsListAction,
  mediaLoadingAction,
  journalLoadingAction,
  setFilterPressMediaDataAction,
  setFilterMediaDataActionByKeyword,
  setFilterPressDataActionByKeyword,
  setinitPressListAction,
  isJournalUserBlockAction,
  isMediaUserBlockAction,
  setinitMediaListAction,
  journalistInfoTypeListAction,
  languageListAction,
  mediaCountListAction,
  journalistBlockYNListAction,
  mediaNameRevealedYNListAction,
  mediaBlockYNListAction,
  mediaTypePopupListAction,
  mediaLocationListAction,
  mediaFieldListAction,
  filterDataListAction,
  mediaFieldPopupListAction,
  mediaTypePopupAction,
  mediaLocationPopupAction,
  mediaFieldPopupAction,
  mediaLocationPopupListAction,
  resetSavedMediaListKeywordAction,
  resetSavedJournalListKeywordAction,
  searchContentKeyMediaListAction,
  searchContentKeyPressListAction,
  isSelectedAllNewsIdAction,
  pressEditPageOpenAction,
  isFilterSubParamAction,
  pressParamsExpandButtonAction,
  mediaParamKeywordButtonAction,
  pressParamKeywordButtonAction,
  mediaParamsExpandButtonAction,
  pressParamKeywordAction,
  profileByJournalIdAction,
  profileByMediaIdAction,
  newsListByJournalIdAction,
  newsLoadingAction,
  activityLoadingAction,
  countLoadingAction,
  activityListByJournalIdAction,
  registerJournalPhotoPopupAction,
  pressMediaUnBlockPopupAction,
  addPersonalContactAction,
  pressMediaErrPopupAction,
  blockedEmailSenderPopupAction,
  searchRegisterPopupAction,
  registerMediaPhotoPopupAction,
  pressIdParamsAction,
  pressSearchOptionAction,
  resetSearchOption,
  pressAdditionalParamAction,
  setFilterJournalSubParamActions,
  setOnChangePressFilterSearchOptionAction,
  setOnChangeMediaFilterSearchOptionAction,
  isLimitFilterAction,
  mediaSearchOptionAction,
  setOnChangePressSearchOptionAction,
  journalContactInfoAction,
  mediaContactInfoAction,
  journalEmailBlockingAction,
  mediaEmailBlockingAction,
  setChangePressSavedSearchTargetIdAction,
  setResetPressSavedSearchListAction,
  setResetMediaSavedSearchListAction,
  setChangeMediaSavedSearchTargetIdAction,
  setOnChangeMediaSearchOptionAction,
  setFilterMediaSubParamActions,
  mediaAdditionalParamAction,
  mediaParamKeywordAction,
  mediaIdParamsAction,
  newsListByMediaIdAction,
  activityListByMediaIdAction,
  checkSavedSearchUserMediaAction,
  checkSavedSearchUserPressAction,
  duplicationMediaPopupAction,
  duplicationPressPopupAction,
  isSearchedNewsOpenAction,
  userPopupAction,
  isPressFilterSubParamAction,
  isMediaFilterSubParamAction,
  contentDeletePopupAction,
  setOnChangePressAction,
  setOnChangeMediaAction,
  savedSearchPopupAction,
  basicFieldListAction,
  basicFieldPopupAction,
  basicLocationPopupAction,
  basicLocationListAction,
  searchLimitAlarmAction,
  mediaEditPageOpenAction,
  profileImageIdAction,
  contentListImageIdAction,
  setProfileImageIdAction,
} = savedSearchSlice.actions

export default savedSearchSlice.reducer
