import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  subJournalFilterOptionsList,
  subMediaFilterOptionsList,
} from '~/components/contents/pressMedia/SearchResult/defaultData'
import { deletePopupProps } from '~/stores/modules/contents/monitoring/newsDetail'
import { duplicationMediaPopupProps, isMediaUserBlockProps } from '~/stores/modules/contents/pressMedia/mediaProfile'
import { userPopupProps } from '~/stores/modules/contents/pressMedia/pressListManagement'
import {
  ActionDtoForList,
  ContactUserAddedDto,
  ESearchJournalistCondDto,
  ESearchMediaCondDto,
  JournalistAutoCompleteDto,
  MediaAutoCompleteDto,
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

export interface mediaContentListProps extends JournalistMediaGroupItem {
  isEdit: boolean
  isOwner: boolean
  settingList: SelectListOptionItem[]
  shareCodeNm: string
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

export interface pageCountProps {
  totalCount: number
  totalPageCount: number
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

export interface mediaAdditionalParamProps {
  journalistTargetList: MbTagSearchTagItem[]
  portal: MbTagSearchTagItem[]
  languageParam: SelectListOptionItem
  isJournalist: SelectListOptionItem
  system: SelectListOptionItem
  limit: SelectListOptionItem
}

export interface pressSearchOptionProps {
  keywordParam: keywordParamProps
  additionalParam: additionalParamProps
}

export interface searchRegisterPopupProps {
  isOpen: boolean
  type: string
  title: string
  titleErr: string
}

export interface mediaSearchOptionProps {
  keywordParam: mediaKeywordParamProps
  additionalParam: mediaAdditionalParamProps
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

export interface filterSubParamActionsProps {
  id: string
  isOpen: boolean
  subMenu?: filterSubParamActionsProps[]
  values: string[]
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
export type blockedEmailSenderPopupProps = {
  isOpen: boolean
  type: string
  status: string
  idKey: string
  email?: string
}

export type searchRegisterListPopupProps = {
  isOpen: boolean
  name: string
  kind: string
  type: string
  nameErr: string
  origin: number[]
  except: number[]
  isActive: boolean
  searchRegistIdList: number[]
  mediaIdList: ESearchMediaDocumentDto[]
  journalIdList: ESearchJournalistDocumentDto[]
}

export type journalDecodeListProps = {
  beemail: string
  mobile: string
  landline: string
  landlineShared: string
  fax: string
}

export type mediaDecodeListProps = {
  beemail: string
  mobile: string
  landline: string
  landlineShared: string
  fax: string
}

export interface searchContentListProps extends ActionDtoForList {
  categoryName?: string
  stateName?: string
}

export interface mediaSubTypeListProps {
  extra: string
  id: string
  name: string
  data: CommonCode[]
}

export interface Props {
  profileImageId: number
  contentListImageId: number
  isTagButton: boolean
  isSelectedAllNewsId: boolean
  searchContentListButton: boolean
  searchContentKeyList: ESearchJournalistDocumentDto[] | ESearchMediaDocumentDto[]
  isOwner: boolean
  pressListParams: pressSearchOptionProps
  mediaListParams: mediaSearchOptionProps
  pressDto: ESearchJournalistCondDto
  mediaDto: ESearchMediaCondDto
  pageCount: pageCountProps
  journalLoading: boolean
  mediaLoading: boolean
  newsLoading: boolean
  activityLoading: boolean
  countLoading: boolean
  filterMediaSubParamActions: filterSubParamActionsProps[]
  filterJournalSubParamActions: filterSubParamActionsProps[]
  filterMediaSubParam: NavigationLinkItem[]
  filterJournalSubParam: NavigationLinkItem[]
  journalApiList: ESearchJournalistDocumentDto[]
  mediaApiList: ESearchMediaDocumentDto[]
  journalIdKey: number
  mediaIdKey: number
  journalIdKeyParam: ESearchJournalistDocumentDto | null
  mediaIdKeyParam: ESearchMediaDocumentDto | null
  listDefine: string
  mediaParamsExpandButton: boolean
  pressParamsExpandButton: boolean
  mediaParamKeyword: string
  pressParamKeyword: string
  mediaParamKeywordButton: boolean
  pressParamKeywordButton: boolean
  isJournalUserBlock: isMediaUserBlockProps
  isMediaUserBlock: isMediaUserBlockProps
  searchRegisterPopup: searchRegisterPopupProps
  isLimitFilter: number

  pressNewsList: pressNewsData[]

  filterInformation: SelectListOptionItem[]
  filterMediaInfoType: SelectListOptionItem[]
  filterPubCycle: SelectListOptionItem[]
  publisherTypeList: SelectListOptionItem[]
  filterPortalCode: SelectListOptionItem[]
  filterMediaType: SelectListOptionItem[]
  actionStateFilterList: SelectListOptionItem[]
  actionCategoryList: SelectListOptionItem[]
  journalistOccupationList: SelectListOptionItem[]
  journalistSocialFilterList: SelectListOptionItem[]
  actionStateList: SelectListOptionItem[]
  mediaSubTypeList: mediaSubTypeListProps[]
  activityListTotalCount: number
  newsListTotalCount: number

  journalContactInfo: ContactUserAddedDto | null
  journalContactBlockedInfo: number
  journalEmailBlocking: boolean
  mediaContactInfo: ContactUserAddedDto | null
  mediaEmailBlocking: boolean
  journalDecodeList: journalDecodeListProps
  mediaDecodeList: mediaDecodeListProps
  journalTab: string
  mediaTab: string
  isSearchedNewsOpen: boolean
  mediaCheckDuplicateParam: MediaAutoCompleteDto | null
  pressCheckDuplicateParam: JournalistAutoCompleteDto | null
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

  duplicationMediaPopup: duplicationMediaPopupProps
  duplicationPressPopup: duplicationMediaPopupProps
  addPersonalContactPopup: addPersonalContactProps
  pressMediaErrPopup: pressMediaErrPopupProps
  pressMediaUnBlockPopup: pressMediaUnBlockPopupProps
  blockedEmailSenderPopup: blockedEmailSenderPopupProps
  userPopup: userPopupProps
  fileDownloadPopup: deletePopupProps
  searchLimitAlarm: boolean
}

// 초기값
export const initialState: Props = {
  profileImageId: 0,
  contentListImageId: 0,
  listDefine: '',
  isTagButton: false,
  isSelectedAllNewsId: false,
  searchContentListButton: false,
  mediaParamsExpandButton: false,
  pressParamsExpandButton: false,
  searchContentKeyList: [],
  isOwner: false,
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
  journalApiList: [],
  mediaApiList: [],
  journalIdKey: 0,
  mediaIdKey: 0,
  journalIdKeyParam: null,
  mediaIdKeyParam: null,
  journalContactInfo: null,
  journalContactBlockedInfo: 0,
  journalEmailBlocking: false,
  journalDecodeList: {
    beemail: '',
    mobile: '',
    landline: '',
    landlineShared: '',
    fax: '',
  },
  mediaContactInfo: null,
  mediaEmailBlocking: false,
  mediaDecodeList: {
    beemail: '',
    mobile: '',
    landline: '',
    landlineShared: '',
    fax: '',
  },
  journalTab: 'profile',
  mediaTab: 'profile',
  isSearchedNewsOpen: false,
  mediaCheckDuplicateParam: null,
  pressCheckDuplicateParam: null,

  journalNewsCountPage: 10,
  newsListByJournalId: [],
  journalActivityCountPage: 10,
  activityListByJournalId: [],
  isJournalUserBlock: {
    blockedUserId: 0,
    companyId: 0,
    licenseId: 0,
    blockedAt: '',
    unblockRequestBy: null,
    unblockRequestCnt: 0,
  },

  mediaNewsCountPage: 10,
  newsListByMediaId: [],
  mediaActivityCountPage: 10,
  activityListByMediaId: [],
  isMediaUserBlock: {
    blockedUserId: 0,
    companyId: 0,
    licenseId: 0,
    blockedAt: '',
    unblockRequestBy: null,
    unblockRequestCnt: 0,
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
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  journalLoading: true,
  mediaLoading: true,
  newsLoading: false,
  activityLoading: false,
  countLoading: false,
  filterMediaSubParamActions: subMediaFilterOptionsList,
  filterJournalSubParamActions: subJournalFilterOptionsList,
  filterMediaSubParam: [],
  filterJournalSubParam: [],
  mediaParamKeyword: '',
  pressParamKeyword: '',
  mediaParamKeywordButton: false,
  pressParamKeywordButton: false,

  pressNewsList: [],

  searchRegisterPopup: {
    isOpen: false,
    type: '',
    title: '',
    titleErr: '',
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
  pressMediaUnBlockPopup: {
    isOpen: false,
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
  userPopup: {
    isOpen: false,
    email: '',
    keyValue: 0,
    displayName: '',
    phone: '',
    mobile: '',
    role: '',
  },
  fileDownloadPopup: {
    isOpen: false,
    title: '',
    key: 0,
  },
  isLimitFilter: 0,
  activityListTotalCount: 0,
  newsListTotalCount: 0,

  filterInformation: [],
  filterMediaInfoType: [],
  filterPubCycle: [],
  filterPortalCode: [],
  filterMediaType: [],
  actionCategoryList: [],
  actionStateFilterList: [],
  publisherTypeList: [],
  journalistOccupationList: [],
  journalistSocialFilterList: [],
  actionStateList: [],
  mediaSubTypeList: [],

  searchLimitAlarm: false,
}

const pressMediaSearchResultSlice = createSlice({
  name: 'pressMediaSearchResultSlice',
  initialState,
  reducers: {
    isSearchedNewsOpenAction: (state, action: PayloadAction<boolean>) => {
      state.isSearchedNewsOpen = action.payload
    },
    blockedEmailSenderPopupAction: (state, action: PayloadAction<blockedEmailSenderPopupProps>) => {
      state.blockedEmailSenderPopup = action.payload
    },
    pressMediaErrPopupAction: (state, action: PayloadAction<pressMediaErrPopupProps>) => {
      state.pressMediaErrPopup = action.payload
    },
    fileDownloadPopupAction: (state, action: PayloadAction<deletePopupProps>) => {
      state.fileDownloadPopup = action.payload
    },
    pressMediaUnBlockPopupAction: (state, action: PayloadAction<pressMediaUnBlockPopupProps>) => {
      state.pressMediaUnBlockPopup = action.payload
    },
    isJournalUserBlockAction: (state, action: PayloadAction<isMediaUserBlockProps>) => {
      state.isJournalUserBlock = action.payload
    },
    isMediaUserBlockAction: (state, action: PayloadAction<isMediaUserBlockProps>) => {
      state.isMediaUserBlock = action.payload
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
      state.mediaDecodeList = {
        beemail: '',
        mobile: '',
        landline: '',
        landlineShared: '',
        fax: '',
      }
      state.mediaActivityCountPage = 10
      state.activityListByMediaId = []
      state.newsListTotalCount = action.payload.totalCount
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
    activityListByNewActivity: (
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
    activityListByMediaIdAction: (
      state,
      action: PayloadAction<{ list: searchContentListProps[]; page: number; mediaTab: string; totalCount: number }>
    ) => {
      state.activityListByMediaId = action.payload.list
      state.mediaActivityCountPage = action.payload.page
      state.mediaTab = action.payload.mediaTab
      state.mediaDecodeList = {
        beemail: '',
        mobile: '',
        landline: '',
        landlineShared: '',
        fax: '',
      }
      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
      state.activityListTotalCount = action.payload.totalCount
    },
    mediaActivityListByNewActivity: (
      state,
      action: PayloadAction<{ list: searchContentListProps[]; page: number; mediaTab: string }>
    ) => {
      state.activityListByMediaId = action.payload.list
      state.mediaActivityCountPage = action.payload.page
      state.mediaTab = action.payload.mediaTab
      state.mediaDecodeList = {
        beemail: '',
        mobile: '',
        landline: '',
        landlineShared: '',
        fax: '',
      }
      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
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
    addPersonalContactAction: (state, action: PayloadAction<addPersonalContactProps>) => {
      state.addPersonalContactPopup = action.payload
    },
    searchLimitAlarmAction: (state, action: PayloadAction<boolean>) => {
      state.searchLimitAlarm = action.payload
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
    journalTabAction: (state, action: PayloadAction<string>) => {
      state.journalTab = action.payload
    },
    mediaTabAction: (state, action: PayloadAction<string>) => {
      state.mediaTab = action.payload
    },
    filterMediaTypeAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.filterMediaType = action.payload
    },
    filterPubCycleAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.filterPubCycle = action.payload
    },
    publisherTypeAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.publisherTypeList = action.payload
    },
    actionStateFilterAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.actionStateFilterList = action.payload
    },
    actionCategoryListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      console.log('actionCategoryListAction', action.payload)
      state.actionCategoryList = action.payload
    },
    journalistOccupationListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.journalistOccupationList = action.payload
    },
    actionStateListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.actionStateList = action.payload
    },
    journalistSocialFilterListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.journalistSocialFilterList = action.payload
    },
    filterPortalCodeAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.filterPortalCode = action.payload
    },
    filterMediaInfoTypeAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.filterMediaInfoType = action.payload
    },
    filterInformationAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.filterInformation = action.payload
    },
    mediaSubTypeListAction: (state, action: PayloadAction<mediaSubTypeListProps[]>) => {
      state.mediaSubTypeList = action.payload
    },
    searchRegisterPopupAction: (state, action: PayloadAction<searchRegisterPopupProps>) => {
      state.searchRegisterPopup = action.payload
    },
    mediaParamKeywordAction: (state, action: PayloadAction<string>) => {
      state.mediaParamKeyword = action.payload
    },
    pressParamKeywordAction: (state, action: PayloadAction<string>) => {
      state.pressParamKeyword = action.payload
    },
    mediaParamKeywordButtonAction: (state, action: PayloadAction<boolean>) => {
      state.mediaParamKeywordButton = action.payload
    },
    pressParamKeywordButtonAction: (state, action: PayloadAction<boolean>) => {
      state.pressParamKeywordButton = action.payload
    },
    newsLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.newsLoading = action.payload
    },
    activityLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.activityLoading = action.payload
    },
    journalLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.journalLoading = action.payload
    },
    mediaLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.mediaLoading = action.payload
    },
    countLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.countLoading = action.payload
    },
    setFilterMediaSubParamActions: (state, action: PayloadAction<filterSubParamActionsProps[]>) => {
      state.filterMediaSubParamActions = action.payload
    },
    setFilterJournalSubParamActions: (state, action: PayloadAction<filterSubParamActionsProps[]>) => {
      state.filterJournalSubParamActions = action.payload
    },
    mediaParamsExpandButtonAction: (state, action: PayloadAction<boolean>) => {
      state.mediaParamsExpandButton = action.payload
    },
    pressParamsExpandButtonAction: (state, action: PayloadAction<boolean>) => {
      state.pressParamsExpandButton = action.payload
    },
    journalContactInfoAction: (
      state,
      action: PayloadAction<{ journalContactInfo: ContactUserAddedDto | null; isBlocked: number }>
    ) => {
      state.journalContactInfo = action.payload.journalContactInfo
      state.journalContactBlockedInfo = action.payload.isBlocked
    },
    journalEmailBlockingAction: (state, action: PayloadAction<boolean>) => {
      state.journalEmailBlocking = action.payload
    },
    mediaContactInfoAction: (state, action: PayloadAction<ContactUserAddedDto | null>) => {
      state.mediaContactInfo = action.payload
    },
    setSearchContentKeyListAction: (
      state,
      action: PayloadAction<ESearchJournalistDocumentDto[] | ESearchMediaDocumentDto[]>
    ) => {
      state.searchContentKeyList = action.payload
    },
    mediaEmailBlockingAction: (state, action: PayloadAction<boolean>) => {
      state.mediaEmailBlocking = action.payload
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
    isSelectedAllNewsIdAction: (state, action: PayloadAction<boolean>) => {
      state.isSelectedAllNewsId = action.payload
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
    isLimitFilterAction: (state, action: PayloadAction<number>) => {
      state.isLimitFilter = action.payload
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
      }>
    ) => {
      state.mediaTab = 'profile'
      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
      state.mediaActivityCountPage = 10
      state.activityListByMediaId = []
      if (action.payload.isResetSelectedNews) {
        state.searchContentKeyList = []
      }
      if (action.payload.mediaFilterSub.length > 0) {
        state.filterMediaSubParam = action.payload.mediaFilterSub
      }
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.mediaApiList = action.payload.mediaData
      state.mediaDto = action.payload.dto
      state.mediaListParams = action.payload.props
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
        journalFilterSub: NavigationLinkItem[]
        isResetSelectedNews: boolean
        journalDecodeList: journalDecodeListProps
      }>
    ) => {
      state.journalTab = 'profile'
      state.journalNewsCountPage = 10
      state.newsListByJournalId = []
      state.journalActivityCountPage = 10
      state.activityListByJournalId = []
      if (action.payload.isResetSelectedNews) {
        state.searchContentKeyList = []
      }
      if (action.payload.journalFilterSub.length > 0) {
        state.filterJournalSubParam = action.payload.journalFilterSub
      }
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.journalApiList = action.payload.journalData
      state.pressDto = action.payload.dto
      state.pressListParams = action.payload.props
      state.journalDecodeList = action.payload.journalDecodeList
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
      state.searchContentKeyList = []
      state.mediaTab = 'profile'
      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
      state.mediaActivityCountPage = 10
      state.activityListByMediaId = []
      state.filterMediaSubParamActions = action.payload.tempFilterSubParam
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.mediaApiList = action.payload.mediaData
      state.mediaDto = action.payload.dto
      state.mediaListParams = action.payload.props
      state.mediaIdKeyParam =
        action.payload.mediaData.length > 0 ? (action.payload.mediaData[0] ? action.payload.mediaData[0] : null) : null
      state.mediaIdKey =
        action.payload.mediaData.length > 0
          ? action.payload.mediaData[0].mid
            ? action.payload.mediaData[0].mid
            : 0
          : 0
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
      state.searchContentKeyList = []
      state.journalTab = 'profile'
      state.journalNewsCountPage = 10
      state.newsListByJournalId = []
      state.journalActivityCountPage = 10
      state.activityListByJournalId = []
      state.filterJournalSubParamActions = action.payload.tempFilterSubParam
      state.pageCount = action.payload.pageCount
      state.searchLimitAlarm = false
      state.journalApiList = action.payload.journalData
      state.pressDto = action.payload.dto
      state.pressListParams = action.payload.props
      state.journalDecodeList = action.payload.journalDecodeList
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
    registerJournalPhotoPopupAction: (state, action: PayloadAction<registerJournalPhotoPopupProps>) => {
      state.registerJournalPhotoPopup = action.payload
    },
    pressNewsListAction: (state, action: PayloadAction<pressNewsData[]>) => {
      state.pressNewsList = action.payload
    },
    registerMediaPhotoPopupAction: (state, action: PayloadAction<registerMediaPhotoPopupProps>) => {
      state.registerMediaPhotoPopup = action.payload
    },
    checkSearchResultUserMediaAction: (state, action: PayloadAction<MediaAutoCompleteDto | null>) => {
      state.mediaCheckDuplicateParam = action.payload
    },
    checkSearchResultUserPressAction: (state, action: PayloadAction<JournalistAutoCompleteDto | null>) => {
      state.pressCheckDuplicateParam = action.payload
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
    setResultListInitDataAction: (
      state,
      action: PayloadAction<{
        listDefine: string
        journalistId: number
        mediaId: number
        mediaFilterSub: NavigationLinkItem[]
        journalFilterSub: NavigationLinkItem[]
        pressParam: pressSearchOptionProps
        mediaParam: mediaSearchOptionProps
        tempMediaIdParams: ESearchMediaDocumentDto | null
        tempJournalIdParams: ESearchJournalistDocumentDto | null
        pageCount: pageCountProps
        pressDto: ESearchJournalistCondDto
        mediaDto: ESearchMediaCondDto
        tempJournalList: ESearchJournalistDocumentDto[]
        tempMediaList: ESearchMediaDocumentDto[]
        mediaFilterSubActions: filterSubParamActionsProps[]
        pressFilterSubActions: filterSubParamActionsProps[]
        journalDecodeList: journalDecodeListProps
        tempSearchKeywordOption: string
      }>
    ) => {
      state.listDefine = action.payload.listDefine
      if (action.payload.tempSearchKeywordOption !== '') {
        state.mediaParamKeyword = action.payload.listDefine === 'media' ? action.payload.tempSearchKeywordOption : ''
        state.pressParamKeyword = action.payload.listDefine !== 'media' ? action.payload.tempSearchKeywordOption : ''
        state.mediaParamKeywordButton = action.payload.listDefine === 'media'
        state.pressParamKeywordButton = action.payload.listDefine !== 'media'
      } else {
        state.mediaParamKeyword = ''
        state.pressParamKeyword = ''
        state.mediaParamKeywordButton = false
        state.pressParamKeywordButton = false
      }
      state.filterJournalSubParamActions = action.payload.pressFilterSubActions
      state.filterJournalSubParam = action.payload.journalFilterSub
      state.pressDto = action.payload.pressDto
      state.pressListParams = action.payload.pressParam
      state.searchLimitAlarm = false
      state.journalApiList = action.payload.tempJournalList
      state.journalIdKey = action.payload.journalistId
      state.journalIdKeyParam = action.payload.tempJournalIdParams
      state.journalDecodeList = action.payload.journalDecodeList

      state.filterMediaSubParamActions = action.payload.mediaFilterSubActions
      state.filterMediaSubParam = action.payload.mediaFilterSub
      state.mediaDto = action.payload.mediaDto
      state.mediaListParams = action.payload.mediaParam
      state.searchLimitAlarm = false
      state.mediaApiList = action.payload.tempMediaList
      state.mediaIdKey = action.payload.mediaId
      state.mediaIdKeyParam = action.payload.tempMediaIdParams

      state.pageCount = action.payload.pageCount
      state.journalLoading = false
      state.mediaLoading = false
    },
    initAction: state => {
      state.listDefine = ''
      state.isTagButton = false
      state.isSelectedAllNewsId = false
      state.searchContentListButton = false
      state.mediaParamsExpandButton = false
      state.pressParamsExpandButton = false
      state.searchContentKeyList = []
      state.isOwner = false
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
      state.journalApiList = []
      state.mediaApiList = []
      state.journalIdKey = 0
      state.mediaIdKey = 0
      state.journalIdKeyParam = null
      state.mediaIdKeyParam = null
      state.journalContactInfo = null
      state.journalContactBlockedInfo = 0
      state.journalEmailBlocking = false
      state.journalDecodeList = {
        beemail: '',
        mobile: '',
        landline: '',
        landlineShared: '',
        fax: '',
      }
      state.mediaContactInfo = null
      state.mediaEmailBlocking = false
      state.mediaDecodeList = {
        beemail: '',
        mobile: '',
        landline: '',
        landlineShared: '',
        fax: '',
      }
      state.journalTab = 'profile'
      state.mediaTab = 'profile'
      state.isSearchedNewsOpen = false
      state.mediaCheckDuplicateParam = null
      state.pressCheckDuplicateParam = null

      state.journalNewsCountPage = 10
      state.newsListByJournalId = []
      state.journalActivityCountPage = 10
      state.activityListByJournalId = []
      state.isJournalUserBlock = {
        blockedUserId: 0,
        companyId: 0,
        licenseId: 0,
        blockedAt: '',
        unblockRequestBy: null,
        unblockRequestCnt: 0,
      }

      state.mediaNewsCountPage = 10
      state.newsListByMediaId = []
      state.mediaActivityCountPage = 10
      state.activityListByMediaId = []
      state.isMediaUserBlock = {
        blockedUserId: 0,
        companyId: 0,
        licenseId: 0,
        blockedAt: '',
        unblockRequestBy: null,
        unblockRequestCnt: 0,
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
      state.pageCount = {
        totalCount: 0,
        totalPageCount: 1,
      }
      state.journalLoading = true
      state.mediaLoading = true
      state.newsLoading = false
      state.activityLoading = false
      state.filterMediaSubParamActions = subMediaFilterOptionsList
      state.filterJournalSubParamActions = subJournalFilterOptionsList
      state.filterMediaSubParam = []
      state.filterJournalSubParam = []
      state.mediaParamKeyword = ''
      state.pressParamKeyword = ''
      state.mediaParamKeywordButton = false
      state.pressParamKeywordButton = false

      state.searchRegisterPopup = {
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
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
      state.pressMediaUnBlockPopup = {
        isOpen: false,
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
      state.userPopup = {
        isOpen: false,
        email: '',
        keyValue: 0,
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
      }
      state.fileDownloadPopup = {
        isOpen: false,
        title: '',
        key: 0,
      }
      state.isLimitFilter = 0

      state.pressNewsList = []

      state.filterInformation = []
      state.filterMediaInfoType = []
      state.filterPubCycle = []
      state.publisherTypeList = []
      state.filterPortalCode = []
      state.filterMediaType = []
      state.actionCategoryList = []
      state.actionStateFilterList = []
      state.journalistOccupationList = []
      state.journalistSocialFilterList = []
      state.actionStateList = []
      state.mediaSubTypeList = []

      state.searchLimitAlarm = false
      state.profileImageId = 0
      state.contentListImageId = 0
    },
  },
})

export const {
  initAction,
  setFilterMediaSubParamActions,
  setFilterJournalSubParamActions,
  setResultListInitDataAction,
  journalLoadingAction,
  mediaLoadingAction,
  searchContentKeyMediaListAction,
  isSelectedAllNewsIdAction,
  pressParamsExpandButtonAction,
  mediaParamsExpandButtonAction,
  mediaParamKeywordButtonAction,
  mediaParamKeywordAction,
  mediaIdParamsAction,
  searchRegisterPopupAction,
  isLimitFilterAction,
  afterPressRegistAddPressParamAction,
  afterPressRegistAddPressListAction,
  afterMediaRegistAddMediaParamAction,
  afterMediaRegistAddMediaListAction,
  filterInformationAction,
  filterMediaInfoTypeAction,
  filterPubCycleAction,
  filterPortalCodeAction,
  filterMediaTypeAction,
  setOnChangeMediaSearchOptionAction,
  setOnChangeMediaFilterSearchOptionAction,
  actionCategoryListAction,
  actionStateFilterAction,
  publisherTypeAction,
  pressParamKeywordButtonAction,
  pressIdParamsAction,
  pressParamKeywordAction,
  searchContentKeyPressListAction,
  journalistOccupationListAction,
  journalistSocialFilterListAction,
  setOnChangePressFilterSearchOptionAction,
  setOnChangePressSearchOptionAction,
  journalContactInfoAction,
  journalEmailBlockingAction,
  newsListByJournalIdAction,
  newsLoadingAction,
  registerJournalPhotoPopupAction,
  profileByJournalIdAction,
  activityListByJournalIdAction,
  fileDownloadPopupAction,
  activityListByMediaIdAction,
  activityLoadingAction,
  countLoadingAction,
  actionStateListAction,
  addPersonalContactAction,
  pressMediaErrPopupAction,
  isJournalUserBlockAction,
  pressMediaUnBlockPopupAction,
  blockedEmailSenderPopupAction,
  mediaSubTypeListAction,
  newsListByMediaIdAction,
  registerMediaPhotoPopupAction,
  isMediaUserBlockAction,
  mediaEmailBlockingAction,
  mediaContactInfoAction,
  profileByMediaIdAction,
  isSearchedNewsOpenAction,
  checkSearchResultUserMediaAction,
  checkSearchResultUserPressAction,
  duplicationMediaPopupAction,
  duplicationPressPopupAction,
  userPopupAction,
  pressNewsListAction,
  searchLimitAlarmAction,
  profileImageIdAction,
  contentListImageIdAction,
  setProfileImageIdAction,
  activityListByNewActivity,
  mediaActivityListByNewActivity,
  setSearchContentKeyListAction,
} = pressMediaSearchResultSlice.actions

export default pressMediaSearchResultSlice.reducer
