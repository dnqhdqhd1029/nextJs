import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'

import { duplicationMediaPopupProps } from '~/stores/modules/contents/pressMedia/mediaProfile'
import { userPopupProps } from '~/stores/modules/contents/pressMedia/pressListManagement'
import { mediaSubTypeListProps } from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import { isUserBlockProps } from '~/stores/modules/contents/pressMedia/pressProfile'
import { contentDeletePopupProps } from '~/stores/modules/contents/pressMedia/savedSearch'
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

export interface mediaTypePopupProps {
  isOpen: boolean
  selectedValue: string
  selectedType: MbTagSearchTagItem[]
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
  arrayJournalAuth: boolean
  searchActivate: boolean
  arrayMediaAuth: boolean
  pageCount: pageCountProps
  pressDto: ESearchJournalistCondDto
  mediaDto: ESearchMediaCondDto
  arrayJournalList: JournalistMediaGroupItem[]
  arrayMediaList: JournalistMediaGroupItem[]
  originArrayJournalList: JournalistMediaGroupItem[]
  originArrayMediaList: JournalistMediaGroupItem[]
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
  actionCategoryList: SelectListOptionItem[]
  publisherTypeList: SelectListOptionItem[]
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
  isLimitFilter: number
  mediaLoading: boolean
  journalLoading: boolean
  journalArrayId: number
  mediaArrayId: number
  journalDecodeList: journalDecodeListProps
  filterJournalSubParam: NavigationLinkItem[]
  filterMediaSubParam: NavigationLinkItem[]
  journalIdKeyParam: ESearchJournalistDocumentDto | null
  mediaIdKeyParam: ESearchMediaDocumentDto | null
  filterMediaSubParamActions: filterSubParamActionsProps[]
  filterJournalSubParamActions: filterSubParamActionsProps[]
  isJournalUserBlock: isUserBlockProps
  isMediaUserBlock: isUserBlockProps

  mediaParamKeywordButton: boolean
  pressParamKeywordButton: boolean

  mediaCheckDuplicateParam: MediaAutoCompleteDto | null
  pressCheckDuplicateParam: JournalistAutoCompleteDto | null

  mediaTypePopupList: CommonCode[]
  mediaLocationList: mediaLocationListProps[]
  mediaFieldList: mediaFieldListProps[]
  filterDataList: IJournalistSearchFilter | null
  mediaFieldPopupList: string[]
  mediaLocationPopupList: string[]

  duplicationMediaPopup: duplicationMediaPopupProps
  duplicationPressPopup: duplicationMediaPopupProps
  mediaTypePopup: mediaTypePopupProps
  mediaLocationPopup: mediaLocationPopupProps
  mediaFieldPopup: mediaFieldPopupProps
  pressMediaUnBlockPopup: pressMediaUnBlockPopupProps
  addPersonalContactPopup: addPersonalContactProps
  pressMediaErrPopup: pressMediaErrPopupProps
  blockedEmailSenderPopup: blockedEmailSenderPopupProps
  searchRegisterPopup: searchRegisterPopupProps
  userPopup: userPopupProps
  contentDeletePopup: contentDeletePopupProps

  pressParamKeyword: string
  mediaParamKeyword: string

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
  arrayJournalAuth: false,
  arrayMediaAuth: false,
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  savedJournalListLoading: false,
  savedMediaListLoading: false,
  arrayJournalList: [],
  arrayMediaList: [],
  originArrayJournalList: [],
  originArrayMediaList: [],
  journalArrayId: 0,
  mediaArrayId: 0,
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

  mediaCheckDuplicateParam: null,
  pressCheckDuplicateParam: null,

  mediaSubTypeList: [],
  filterInformation: [],
  filterMediaInfoType: [],
  filterPubCycle: [],
  filterPortalCode: [],
  actionStateFilterList: [],
  actionCategoryList: [],
  publisherTypeList: [],
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
  mediaLocationList: [],
  mediaFieldList: [],
  filterDataList: null,
  mediaFieldPopupList: [],
  mediaLocationPopupList: [],

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

  searchLimitAlarm: false,
}

const pressMediaListResultSlice = createSlice({
  name: 'pressMediaListResultSlice',
  initialState,
  reducers: {
    searchContentKeyMediaListAction: (
      state,
      action: PayloadAction<{
        param: ESearchMediaDocumentDto[]
        isTag: boolean
      }>
    ) => {
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
      state.searchContentKeyList = action.payload.param
      state.isSelectedAllNewsId = false
      state.isTagButton = action.payload.isTag
    },
    activityListByJournalIdAction: (
      state,
      action: PayloadAction<{ list: searchContentListProps[]; page: number; journalTab: string }>
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
    },
    pressActivityListFromListResult: (
      state,
      action: PayloadAction<{ list: searchContentListProps[]; page: number; journalTab: string }>
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
    },
    newsListByJournalIdAction: (
      state,
      action: PayloadAction<{ list: MonitoringSearchNewsDocumentDto[]; page: number; journalTab: string }>
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
    searchLimitAlarmAction: (state, action: PayloadAction<boolean>) => {
      state.searchLimitAlarm = action.payload
    },
    duplicationMediaPopupAction: (state, action: PayloadAction<duplicationMediaPopupProps>) => {
      state.duplicationMediaPopup = action.payload
    },
    duplicationPressPopupAction: (state, action: PayloadAction<duplicationMediaPopupProps>) => {
      state.duplicationPressPopup = action.payload
    },
    userPopupAction: (state, action: PayloadAction<userPopupProps>) => {
      state.userPopup = action.payload
    },
    contentDeletePopupAction: (state, action: PayloadAction<contentDeletePopupProps>) => {
      state.contentDeletePopup = action.payload
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
    isMediaFilterSubParamAction: (
      state,
      action: PayloadAction<{
        dto: ESearchMediaCondDto
        mediaData: ESearchMediaDocumentDto[]
        pageCount: pageCountProps
        mediaFilterSub: NavigationLinkItem[]
        mediaFilterSubActions: filterSubParamActionsProps[]
      }>
    ) => {
      state.listDefine = 'media'
      state.mediaTab = 'profile'
      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
      state.mediaActivityCountPage = 10
      state.activityListByMediaId = []
      state.searchContentKeyList = []
      state.isFilterSubParam = false
      state.editPageOpen = false
      state.searchActivate = true
      state.mediaDto = action.payload.dto
      state.searchLimitAlarm = false
      state.mediaApiList = action.payload.mediaData
      state.pageCount = action.payload.pageCount
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
        dto: ESearchJournalistCondDto
        journalData: ESearchJournalistDocumentDto[]
        pageCount: pageCountProps
        journalDecodeList: journalDecodeListProps
        journalFilterSub: NavigationLinkItem[]
        filterJournalSubParamActions: filterSubParamActionsProps[]
      }>
    ) => {
      state.listDefine = 'press'
      state.journalTab = 'profile'
      state.journalNewsCountPage = 10
      state.newsListByJournalId = []
      state.journalActivityCountPage = 10
      state.activityListByJournalId = []
      state.isFilterSubParam = false
      state.editPageOpen = false
      state.searchActivate = true
      state.searchContentKeyList = []
      state.pressDto = action.payload.dto
      state.searchLimitAlarm = false
      state.journalApiList = action.payload.journalData
      state.pageCount = action.payload.pageCount
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
      state.journalDecodeList = action.payload.journalDecodeList
    },
    isFilterSubParamAction: (state, action: PayloadAction<boolean>) => {
      state.isFilterSubParam = action.payload
    },
    isSelectedAllNewsIdAction: (state, action: PayloadAction<boolean>) => {
      state.isSelectedAllNewsId = action.payload
    },
    editPageOpenAction: (state, action: PayloadAction<boolean>) => {
      state.editPageOpen = action.payload
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
    filterDataListAction: (state, action: PayloadAction<IJournalistSearchFilter>) => {
      state.filterDataList = action.payload
    },
    pressMediaUnBlockPopupAction: (state, action: PayloadAction<pressMediaUnBlockPopupProps>) => {
      state.pressMediaUnBlockPopup = action.payload
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
    isJournalUserBlockAction: (state, action: PayloadAction<isUserBlockProps>) => {
      state.isJournalUserBlock = action.payload
    },
    isMediaUserBlockAction: (state, action: PayloadAction<isUserBlockProps>) => {
      state.isMediaUserBlock = action.payload
    },
    savedJournalListLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.savedJournalListLoading = action.payload
    },
    savedMediaListLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.savedMediaListLoading = action.payload
    },
    mediaLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.mediaLoading = action.payload
    },
    journalLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.journalLoading = action.payload
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
      action: PayloadAction<{
        list: ESearchMediaDocumentDto[]
        mediaParam: ESearchMediaDocumentDto
        apiDto?: ESearchMediaCondDto
        tempPageCount?: pageCountProps
        filterSub?: NavigationLinkItem[]
        filterSubActions?: filterSubParamActionsProps[]
        isReset?: boolean
      }>
    ) => {
      state.searchContentKeyList = []
      state.mediaApiList = action.payload.list
      state.mediaIdKeyParam = action.payload.mediaParam
      state.mediaIdKey = action.payload.mediaParam.mid || 0
      if (
        action.payload.isReset &&
        action.payload.apiDto &&
        action.payload.filterSubActions &&
        action.payload.filterSub &&
        action.payload.tempPageCount
      ) {
        state.mediaDto = action.payload.apiDto
        state.filterMediaSubParamActions = action.payload.filterSubActions
        state.filterMediaSubParam = action.payload.filterSub
        state.pageCount = action.payload.tempPageCount
      }
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
      action: PayloadAction<{
        list: ESearchJournalistDocumentDto[]
        pressParam: ESearchJournalistDocumentDto
        apiDto?: ESearchJournalistCondDto
        tempPageCount?: pageCountProps
        filterSub?: NavigationLinkItem[]
        filterSubActions?: filterSubParamActionsProps[]
        journalDecodeList?: journalDecodeListProps
        isReset?: boolean
      }>
    ) => {
      state.searchContentKeyList = []
      state.journalApiList = action.payload.list
      state.journalIdKeyParam = action.payload.pressParam
      state.journalIdKey = action.payload.pressParam.jrnlst_id || 0
      if (
        action.payload.isReset &&
        action.payload.apiDto &&
        action.payload.filterSubActions &&
        action.payload.filterSub &&
        action.payload.journalDecodeList &&
        action.payload.tempPageCount
      ) {
        state.pressDto = action.payload.apiDto
        state.filterMediaSubParamActions = action.payload.filterSubActions
        state.filterMediaSubParam = action.payload.filterSub
        state.pageCount = action.payload.tempPageCount
        state.journalDecodeList = action.payload.journalDecodeList
      }
    },
    savedJournalListKeywordAction: (state, action: PayloadAction<string>) => {
      state.savedJournalListKeyword = action.payload
    },
    resetSavedJournalListKeywordAction: (state, action: PayloadAction<JournalistMediaGroupItem[]>) => {
      state.savedJournalListKeyword = ''
      state.arrayJournalList = action.payload
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
    resetSavedMediaListKeywordAction: (state, action: PayloadAction<JournalistMediaGroupItem[]>) => {
      state.savedMediaListKeyword = ''
      state.arrayMediaList = action.payload
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
    actionCategoryListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.actionCategoryList = action.payload
    },
    publisherTypeAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.publisherTypeList = action.payload
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
    newsListByMediaIdAction: (
      state,
      action: PayloadAction<{ list: MonitoringSearchNewsDocumentDto[]; page: number; mediaTab: string }>
    ) => {
      state.newsListByMediaId = action.payload.list
      state.mediaNewsCountPage = action.payload.page
      state.mediaTab = action.payload.mediaTab
      state.mediaActivityCountPage = 10
      state.activityListByMediaId = []
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
    setOnChangeMediaFilterSearchOptionAction: (
      state,
      action: PayloadAction<{
        dto: ESearchMediaCondDto
        mediaData: ESearchMediaDocumentDto[]
        pageCount: pageCountProps
        tempFilterSubParam: filterSubParamActionsProps[]
      }>
    ) => {
      state.mediaTab = 'profile'
      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
      state.mediaActivityCountPage = 10
      state.activityListByMediaId = []
      state.searchContentKeyList = []
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
        dto: ESearchJournalistCondDto
        tempFilterSubParam: filterSubParamActionsProps[]
        pageCount: pageCountProps
        journalData: ESearchJournalistDocumentDto[]
        journalDecodeList: journalDecodeListProps
      }>
    ) => {
      state.searchContentKeyList = []
      state.journalTab = 'profile'
      state.journalNewsCountPage = 10
      state.newsListByJournalId = []
      state.journalActivityCountPage = 10
      state.activityListByJournalId = []
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
      state.journalDecodeList = action.payload.journalDecodeList
    },
    activityListByMediaIdAction: (
      state,
      action: PayloadAction<{ list: searchContentListProps[]; page: number; mediaTab: string }>
    ) => {
      state.activityListByMediaId = action.payload.list
      state.mediaActivityCountPage = action.payload.page
      state.mediaTab = action.payload.mediaTab
      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
    },
    mediaActivityListFromListResult: (
      state,
      action: PayloadAction<{ list: searchContentListProps[]; page: number; mediaTab: string }>
    ) => {
      state.activityListByMediaId = action.payload.list
      state.mediaActivityCountPage = action.payload.page
      state.mediaTab = action.payload.mediaTab
      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
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
      state.searchActivate = false
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
        state.pressParamKeyword = ''
        state.mediaParamKeyword = action.payload.tempSearchKeywordOption
        state.mediaParamKeywordButton = true
        state.pressParamKeywordButton = false
      } else {
        state.pressParamKeyword = ''
        state.mediaParamKeyword = ''
        state.mediaParamKeywordButton = false
        state.pressParamKeywordButton = false
      }
      state.filterMediaSubParamActions = action.payload.mediaFilterSubActions
      state.mediaIdKey = action.payload.mediaId
      state.searchLimitAlarm = false
      state.mediaApiList = action.payload.tempMediaList
      state.filterMediaSubParam = action.payload.mediaFilterSub
      state.mediaIdKeyParam = action.payload.tempMediaIdParams
      state.pageCount = action.payload.pageCount
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
        state.pressParamKeyword = action.payload.tempSearchKeywordOption
        state.mediaParamKeyword = ''
        state.mediaParamKeywordButton = false
        state.pressParamKeywordButton = true
      } else {
        state.pressParamKeyword = ''
        state.mediaParamKeyword = ''
        state.mediaParamKeywordButton = false
        state.pressParamKeywordButton = false
      }
      state.filterJournalSubParamActions = action.payload.pressFilterSubActions
      state.journalIdKey = action.payload.journalistId
      state.searchLimitAlarm = false
      state.journalApiList = action.payload.tempJournalList
      state.filterJournalSubParam = action.payload.journalFilterSub
      state.journalIdKeyParam = action.payload.tempJournalIdParams
      state.pageCount = action.payload.pageCount
      state.journalDecodeList = action.payload.journalDecodeList
    },
    setResetPressSavedSearchListAction: (
      state,
      action: PayloadAction<{
        tempSavedJournalList: JournalistMediaGroupItem[]
      }>
    ) => {
      state.arrayJournalList = action.payload.tempSavedJournalList
      state.originArrayJournalList = action.payload.tempSavedJournalList
    },
    setResetMediaSavedSearchListAction: (
      state,
      action: PayloadAction<{
        tempSavedMediaList: JournalistMediaGroupItem[]
      }>
    ) => {
      state.arrayMediaList = action.payload.tempSavedMediaList
      state.originArrayMediaList = action.payload.tempSavedMediaList
    },
    setFilterPressMediaDataAction: (
      state,
      action: PayloadAction<{
        pressDto: ESearchJournalistCondDto
        mediaDto: ESearchMediaCondDto
        tempArrayJournalList: JournalistMediaGroupItem[]
        tempArrayMediaList: JournalistMediaGroupItem[]
        journalArrayId: number
        mediaArrayId: number
        arrayJournalAuth: boolean
        arrayMediaAuth: boolean
        tempIsFilter: boolean
        tempOwnerKey: number
      }>
    ) => {
      state.isFilterSubParam = action.payload.tempIsFilter
      state.isOwner = action.payload.tempOwnerKey > 0
      state.pressDto = action.payload.pressDto
      state.mediaDto = action.payload.mediaDto
      state.arrayJournalAuth = action.payload.arrayJournalAuth
      state.arrayMediaAuth = action.payload.arrayMediaAuth
      state.arrayJournalList = action.payload.tempArrayJournalList
      state.arrayMediaList = action.payload.tempArrayMediaList
      state.originArrayJournalList = action.payload.tempArrayJournalList
      state.originArrayMediaList = action.payload.tempArrayMediaList
      if (action.payload.journalArrayId > 0) {
        state.journalArrayId = action.payload.journalArrayId
        state.mediaArrayId = 0
      } else if (action.payload.mediaArrayId > 0) {
        state.journalArrayId = 0
        state.mediaArrayId = action.payload.mediaArrayId
      } else {
        state.journalArrayId = 0
        state.mediaArrayId = 0
      }
    },
    setChangePressSavedSearchTargetIdAction: (
      state,
      action: PayloadAction<{
        pressDto: ESearchJournalistCondDto
        journalArrayId: number
        arrayJournalAuth: boolean
      }>
    ) => {
      state.listDefine = 'press'
      state.pressDto = action.payload.pressDto
      state.journalArrayId = action.payload.journalArrayId
      state.mediaArrayId = 0
      state.arrayJournalAuth = action.payload.arrayJournalAuth
    },
    setChangeMediaSavedSearchTargetIdAction: (
      state,
      action: PayloadAction<{
        mediaDto: ESearchMediaCondDto
        mediaArrayId: number
        arrayMediaAuth: boolean
      }>
    ) => {
      state.listDefine = 'media'
      state.mediaDto = action.payload.mediaDto
      state.journalArrayId = 0
      state.mediaArrayId = action.payload.mediaArrayId
      state.arrayMediaAuth = action.payload.arrayMediaAuth
    },
    setOnChangeMediaAction: (
      state,
      action: PayloadAction<{
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
      state.editPageOpen = false
      state.searchActivate = true
      state.searchContentKeyList = []
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.mediaApiList = action.payload.mediaData
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
    setOnChangeMediaSearchOptionAction: (
      state,
      action: PayloadAction<{
        dto: ESearchMediaCondDto
        mediaData: ESearchMediaDocumentDto[]
        pageCount: pageCountProps
        isResetSelectedNews: boolean
      }>
    ) => {
      state.mediaTab = 'profile'
      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
      state.mediaActivityCountPage = 10
      state.activityListByMediaId = []
      state.editPageOpen = false
      state.searchActivate = true
      if (action.payload.isResetSelectedNews) {
        state.searchContentKeyList = []
      }
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
    },
    setOnChangePressSearchOptionAction: (
      state,
      action: PayloadAction<{
        dto: ESearchJournalistCondDto
        journalData: ESearchJournalistDocumentDto[]
        pageCount: pageCountProps
        journalDecodeList: journalDecodeListProps
        isResetSelectedNews: boolean
      }>
    ) => {
      state.listDefine = 'press'
      state.journalTab = 'profile'
      state.journalNewsCountPage = 10
      state.newsListByJournalId = []
      state.journalActivityCountPage = 10
      state.activityListByJournalId = []
      if (action.payload.isResetSelectedNews) {
        state.searchContentKeyList = []
      }
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
      state.journalDecodeList = action.payload.journalDecodeList
    },
    setOnChangePressOptionIdAction: (
      state,
      action: PayloadAction<{
        journalData: ESearchJournalistDocumentDto[]
        pageCount: pageCountProps
        journalDecodeList: journalDecodeListProps
        journalFilterSub: NavigationLinkItem[]
        filterJournalSubParamActions: filterSubParamActionsProps[]
      }>
    ) => {
      state.listDefine = 'press'
      state.editPageOpen = false
      state.searchActivate = true
      state.journalTab = 'profile'
      state.journalNewsCountPage = 10
      state.newsListByJournalId = []
      state.journalActivityCountPage = 10
      state.activityListByJournalId = []
      state.searchContentKeyList = []
      state.journalDecodeList = action.payload.journalDecodeList
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.journalApiList = action.payload.journalData
      state.filterJournalSubParam = action.payload.journalFilterSub
      state.filterJournalSubParamActions = action.payload.filterJournalSubParamActions
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
    checkMediaListUserMediaAction: (state, action: PayloadAction<MediaAutoCompleteDto | null>) => {
      state.mediaCheckDuplicateParam = action.payload
    },
    checkPressListUserPressAction: (state, action: PayloadAction<JournalistAutoCompleteDto | null>) => {
      state.pressCheckDuplicateParam = action.payload
    },
    setFilterMediaDataActionByKeyword: (
      state,
      action: PayloadAction<{
        tempSavedMediaList: JournalistMediaGroupItem[]
      }>
    ) => {
      state.arrayMediaList = action.payload.tempSavedMediaList
    },
    setFilterPressDataActionByKeyword: (
      state,
      action: PayloadAction<{
        tempSavedJournalList: JournalistMediaGroupItem[]
      }>
    ) => {
      state.arrayJournalList = action.payload.tempSavedJournalList
    },
    initSearchAction: state => {
      state.listDefine = ''
      state.isOwner = false
      state.editPageOpen = false
      state.isFilterSubParam = false
      state.searchActivate = false
      state.arrayJournalAuth = false
      state.arrayMediaAuth = false
      state.pageCount = {
        totalCount: 0,
        totalPageCount: 1,
      }
      state.savedJournalListLoading = true
      state.savedMediaListLoading = true
      state.arrayJournalList = []
      state.arrayMediaList = []
      state.originArrayJournalList = []
      state.originArrayMediaList = []
      state.journalArrayId = 0
      state.mediaArrayId = 0
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

      state.mediaCheckDuplicateParam = null
      state.pressCheckDuplicateParam = null

      state.mediaSubTypeList = []
      state.filterInformation = []
      state.filterMediaInfoType = []
      state.filterPubCycle = []
      state.filterPortalCode = []
      state.actionStateFilterList = []
      state.actionCategoryList = []
      state.publisherTypeList = []
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
      state.mediaLocationList = []
      state.mediaFieldList = []
      state.filterDataList = null
      state.mediaFieldPopupList = []
      state.mediaLocationPopupList = []

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
  journalistSocialFilterListAction,
  journalistOccupationListAction,
  actionStateListAction,
  filterMediaTypeAction,
  mediaSubTypeListAction,
  savedJournalListLoadingAction,
  savedMediaListLoadingAction,
  mediaLoadingAction,
  afterPressRegistAddPressParamAction,
  afterPressRegistAddPressListAction,
  afterMediaRegistAddMediaParamAction,
  afterMediaRegistAddMediaListAction,
  journalLoadingAction,
  searchLimitAlarmAction,
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
  resetSavedMediaListKeywordAction,
  resetSavedJournalListKeywordAction,
  searchContentKeyMediaListAction,
  searchContentKeyPressListAction,
  isSelectedAllNewsIdAction,
  editPageOpenAction,
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
  activityListByJournalIdAction,
  pressActivityListFromListResult,
  registerJournalPhotoPopupAction,
  pressMediaUnBlockPopupAction,
  addPersonalContactAction,
  pressMediaErrPopupAction,
  blockedEmailSenderPopupAction,
  searchRegisterPopupAction,
  registerMediaPhotoPopupAction,
  pressIdParamsAction,
  resetSearchOption,
  mediaActivityListFromListResult,
  setFilterJournalSubParamActions,
  setOnChangePressFilterSearchOptionAction,
  setOnChangeMediaFilterSearchOptionAction,
  isLimitFilterAction,
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
  mediaParamKeywordAction,
  mediaIdParamsAction,
  newsListByMediaIdAction,
  activityListByMediaIdAction,
  duplicationMediaPopupAction,
  checkMediaListUserMediaAction,
  checkPressListUserPressAction,
  duplicationPressPopupAction,
  userPopupAction,
  contentDeletePopupAction,
  isPressFilterSubParamAction,
  isMediaFilterSubParamAction,
  setOnChangePressOptionIdAction,
  setOnChangeMediaAction,
  profileImageIdAction,
  contentListImageIdAction,
  setProfileImageIdAction,
} = pressMediaListResultSlice.actions
export default pressMediaListResultSlice.reducer
