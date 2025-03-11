import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'

import { userPopupProps } from '~/stores/modules/contents/pressMedia/pressListManagement'
import {
  addPersonalContactProps,
  mediaContentListProps,
  pageCountProps,
  pressMediaErrPopupProps,
  pressMediaUnBlockPopupProps,
  registerJournalPhotoPopupProps,
  registerMediaPhotoPopupProps,
  searchRegisterListPopupProps,
} from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import {
  ActionDtoForList,
  ContactUserAddedDto,
  type ESearchNewsCondDto,
  JournalistAutoCompleteDto,
  MediaAutoCompleteDto,
} from '~/types/api/service'
import { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import { ESearchJournalistDocumentDto, ESearchMediaDocumentDto } from '~/types/contents/PressMedia'

export interface dataOnChangeActionTypeProps {
  personalContacts?: string
  emailBlock?: string
  isMediaUserBlock?: string
}

export interface dataOnChangeActionProps {
  personalContacts?: number
  emailBlock?: number
  isMediaUserBlock?: string
}

export type journalDecodeListProps = {
  beemail: string
  mobile: string
  landline: string
  landlineShared: string
  fax: string
}

export type mediaPersonalParamsProps = {
  isOpen: boolean
  key: number
  mediaName: string
  mediaNameErr: string
  email: string
  emailErr: string
  website: string
  websiteErr: string
  landline: string
  mobile: string
  fields: string
  address: string
  subAddressNm: string
  mediaBookLists: MbTagSearchTagItem[]
}

export type duplicationMediaPopupProps = {
  isOpen: boolean
  key: number
  targetName: string
}

export type journalNewsCountPaginationInfoProps = {
  page: number
  size: number
}

export type newsDtoProps = {
  periodStartYear: string
  periodStartMonth: string
  periodStartDay: string
  periodEndYear: string
  periodEndMonth: string
  periodEndDay: string
  sort: string[]
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

export type CountPageProps = {
  totalCount: number
  totalPageCount: number
  page: number
  size: number
}

export type isMediaUserBlockProps = {
  blockedUserId: number
  companyId?: number
  licenseId?: number
  blockedAt?: string
  unblockRequestBy?: null
  unblockRequestCnt?: number
}

export interface Props {
  listDefine: string
  profileImageId: number

  newsLoading: boolean
  activityLoading: boolean

  mediaIdKey: number
  mediaCheckDuplicateParam: MediaAutoCompleteDto | null
  mediaIdKeyParam: ESearchMediaDocumentDto | null
  mediaContactInfo: ContactUserAddedDto | null
  mediaEmailBlocking: boolean
  isMediaUserBlock: isMediaUserBlockProps
  mediaNewsCountPage: pageCountProps
  mediaNewsCountPaginationInfo: journalNewsCountPaginationInfoProps
  newsListByMediaId: MonitoringSearchNewsDocumentDto[]
  mediaGroupMediaKey: string
  mediaGroupJournalist: ESearchJournalistDocumentDto[]
  mediaGroupSubMediaList: ESearchMediaDocumentDto[]
  mediaGroupTab: string
  activityTabList: SelectListOptionItem[]
  activityTab: SelectListOptionItem
  activityDataList: MonitoringSearchNewsDocumentDto[] | searchContentListProps[]
  activityDataListPaginationInfo: CountPageProps
  mediaGroupJournalistCountPage: CountPageProps
  mediaGroupSubMediaListCountPage: CountPageProps

  newsDto: ESearchNewsCondDto
  activityParamKeyword: string

  actionStateFilterList: SelectListOptionItem[]
  actionCategoryList: SelectListOptionItem[]
  searchRegisterList: mediaContentListProps[]
  filterPortalCode: SelectListOptionItem[]
  commonCodeState: SelectListOptionItem[]
  publisherTypeList: SelectListOptionItem[]

  blockedEmailSenderPopup: blockedEmailSenderPopupProps
  registerJournalPhotoPopup: registerJournalPhotoPopupProps
  registerMediaPhotoPopup: registerMediaPhotoPopupProps
  searchRegisterListPopup: searchRegisterListPopupProps
  pressMediaUnBlockPopup: pressMediaUnBlockPopupProps
  addPersonalContactPopup: addPersonalContactProps
  pressMediaErrPopup: pressMediaErrPopupProps
  duplicationMediaPopup: duplicationMediaPopupProps
  mediaPersonalParamsPopup: mediaPersonalParamsProps
  addressPopup: boolean
  userPopup: userPopupProps
}

// 초기값
export const initialState: Props = {
  listDefine: '',
  profileImageId: 0,

  mediaIdKey: 0,
  mediaIdKeyParam: null,
  mediaContactInfo: null,
  mediaCheckDuplicateParam: null,
  mediaEmailBlocking: false,
  isMediaUserBlock: {
    blockedUserId: 0,
    companyId: 0,
    licenseId: 0,
    blockedAt: '',
    unblockRequestBy: null,
    unblockRequestCnt: 0,
  },
  mediaNewsCountPage: {
    totalCount: 0,
    totalPageCount: 1,
  },
  mediaNewsCountPaginationInfo: {
    page: 1,
    size: 15,
  },
  newsListByMediaId: [],
  mediaGroupMediaKey: '',
  mediaGroupJournalist: [],
  mediaGroupSubMediaList: [],
  mediaGroupJournalistCountPage: {
    totalCount: 0,
    totalPageCount: 1,
    page: 1,
    size: 15,
  },
  mediaGroupSubMediaListCountPage: {
    totalCount: 0,
    totalPageCount: 1,
    page: 1,
    size: 15,
  },
  mediaGroupTab: 'journalist',
  activityTabList: [],
  activityTab: { id: '', name: '' },
  activityDataList: [],
  activityDataListPaginationInfo: {
    totalCount: 0,
    totalPageCount: 0,
    page: 1,
    size: 8,
  },

  newsDto: {
    timezone: '',
    groupId: 0,
    periodStartYear: moment().subtract({ year: 2 }).format('YYYY'),
    periodStartMonth: moment().subtract({ year: 2 }).format('MM'),
    periodStartDay: moment().subtract({ year: 2 }).format('DD'),
    periodEndYear: moment().format('YYYY'),
    periodEndMonth: moment().format('MM'),
    periodEndDay: moment().format('DD'),
    sort: [`inserted!desc`, `newsid!desc`],
    page: 1,
    size: 8,
  },

  newsLoading: false,
  activityLoading: false,

  actionStateFilterList: [],
  actionCategoryList: [],
  searchRegisterList: [],
  filterPortalCode: [],
  commonCodeState: [],
  publisherTypeList: [],

  activityParamKeyword: '',

  blockedEmailSenderPopup: {
    isOpen: false,
    type: '',
    status: '',
    idKey: '',
  },
  registerMediaPhotoPopup: {
    isOpen: false,
    type: '',
    imageUrl: '',
    filesList: [],
  },
  registerJournalPhotoPopup: {
    isOpen: false,
    type: '',
    imageUrl: '',
    filesList: [],
  },
  searchRegisterListPopup: {
    isOpen: false,
    kind: '',
    type: 'any',
    name: '',
    nameErr: '',
    isActive: false,
    except: [],
    origin: [],
    searchRegistIdList: [],
    mediaIdList: [],
    journalIdList: [],
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
  duplicationMediaPopup: {
    isOpen: false,
    key: 0,
    targetName: '',
  },
  mediaPersonalParamsPopup: {
    isOpen: false,
    key: 0,
    mediaName: '',
    mediaNameErr: '',
    email: '',
    emailErr: '',
    websiteErr: '',
    website: '',
    landline: '',
    mobile: '',
    fields: '',
    address: '',
    subAddressNm: '',
    mediaBookLists: [],
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
  addressPopup: false,
}

const mediaProfileSlice = createSlice({
  name: 'mediaProfileSlice',
  initialState,
  reducers: {
    actionStateFilterAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.actionStateFilterList = action.payload
    },
    actionCategoryListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.actionCategoryList = action.payload
    },
    filterPortalCodeAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.filterPortalCode = action.payload
    },
    commonCodeStateAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.commonCodeState = action.payload
    },
    publisherTypeAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.publisherTypeList = action.payload
    },
    mediaGroupJournalistCountPageAction: (state, action: PayloadAction<CountPageProps>) => {
      state.mediaGroupJournalistCountPage = action.payload
    },
    mediaGroupJournalistAction: (
      state,
      action: PayloadAction<{ journalData: ESearchJournalistDocumentDto[]; pageCount: CountPageProps }>
    ) => {
      state.mediaGroupJournalist = action.payload.journalData
      state.mediaGroupJournalistCountPage = action.payload.pageCount
    },
    mediaGroupSubMediaListAction: (
      state,
      action: PayloadAction<{ mediaData: ESearchMediaDocumentDto[]; pageCount: CountPageProps }>
    ) => {
      state.mediaGroupSubMediaList = action.payload.mediaData
      state.mediaGroupSubMediaListCountPage = action.payload.pageCount
    },
    mediaContactInfoAction: (state, action: PayloadAction<ContactUserAddedDto | null>) => {
      state.mediaContactInfo = action.payload
    },
    mediaEmailBlockingAction: (state, action: PayloadAction<boolean>) => {
      state.mediaEmailBlocking = action.payload
    },
    searchRegisterListAction: (state, action: PayloadAction<mediaContentListProps[]>) => {
      state.searchRegisterList = action.payload
    },
    profileImageIdAction: (state, action: PayloadAction<number>) => {
      state.profileImageId = action.payload
      state.registerMediaPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
    },
    setResultInitDataAction: (
      state,
      action: PayloadAction<{
        listDefine: string
        mediaId: number
        tempMediaIdParams: ESearchMediaDocumentDto | null
        dto: ESearchNewsCondDto
        tempMediaGroupMediaKey: string
      }>
    ) => {
      state.listDefine = action.payload.listDefine
      state.mediaIdKey = action.payload.mediaId
      state.mediaIdKeyParam = action.payload.tempMediaIdParams
      state.newsDto = action.payload.dto
      state.mediaGroupMediaKey = action.payload.tempMediaGroupMediaKey
    },
    mediaIdKeyParamAction: (state, action: PayloadAction<ESearchMediaDocumentDto>) => {
      state.mediaIdKeyParam = action.payload
    },
    isMediaUserBlockAction: (state, action: PayloadAction<isMediaUserBlockProps>) => {
      state.isMediaUserBlock = action.payload
    },
    blockedEmailSenderPopupAction: (state, action: PayloadAction<blockedEmailSenderPopupProps>) => {
      state.blockedEmailSenderPopup = action.payload
    },
    registerJournalPhotoPopupAction: (state, action: PayloadAction<registerJournalPhotoPopupProps>) => {
      state.registerJournalPhotoPopup = action.payload
    },
    registerMediaPhotoPopupAction: (state, action: PayloadAction<registerMediaPhotoPopupProps>) => {
      state.registerMediaPhotoPopup = action.payload
    },
    duplicationMediaPopupAction: (state, action: PayloadAction<duplicationMediaPopupProps>) => {
      state.duplicationMediaPopup = action.payload
    },
    mediaCheckDuplicateParamAction: (state, action: PayloadAction<MediaAutoCompleteDto | null>) => {
      state.mediaCheckDuplicateParam = action.payload
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
        isActive: false,
        nameErr: '',
        except: action.payload.except,
        origin: action.payload.origin,
        searchRegistIdList: action.payload.list,
        mediaIdList: action.payload.mediaIdList,
        journalIdList: action.payload.journalIdList,
      }
    },
    addressPopupAction: (state, action: PayloadAction<boolean>) => {
      state.addressPopup = action.payload
    },
    userPopupAction: (state, action: PayloadAction<userPopupProps>) => {
      state.userPopup = action.payload
    },
    mediaPersonalParamsAction: (state, action: PayloadAction<mediaPersonalParamsProps>) => {
      state.mediaPersonalParamsPopup = action.payload
    },
    searchRegisterListPopupAction: (state, action: PayloadAction<searchRegisterListPopupProps>) => {
      state.searchRegisterListPopup = action.payload
    },
    pressMediaUnBlockPopupAction: (state, action: PayloadAction<pressMediaUnBlockPopupProps>) => {
      state.pressMediaUnBlockPopup = action.payload
    },
    addPersonalContactAction: (state, action: PayloadAction<addPersonalContactProps>) => {
      state.addPersonalContactPopup = action.payload
    },
    pressMediaErrPopupAction: (state, action: PayloadAction<pressMediaErrPopupProps>) => {
      state.pressMediaErrPopup = action.payload
    },
    mediaGroupTabAction: (state, action: PayloadAction<string>) => {
      state.mediaGroupTab = action.payload
    },
    newsLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.newsLoading = action.payload
    },
    activityLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.activityLoading = action.payload
    },
    setActivityDataListAction: (
      state,
      action: PayloadAction<{
        list: MonitoringSearchNewsDocumentDto[] | searchContentListProps[]
        pagination: CountPageProps
      }>
    ) => {
      state.activityDataList = action.payload.list
      state.activityDataListPaginationInfo = action.payload.pagination
    },
    setMediaActivityDataListAction: (
      state,
      action: PayloadAction<{
        list: MonitoringSearchNewsDocumentDto[] | searchContentListProps[]
        pagination: CountPageProps
      }>
    ) => {
      state.activityDataList = action.payload.list
      state.activityDataListPaginationInfo = action.payload.pagination
    },
    newsListByPressMediaIdAction: (
      state,
      action: PayloadAction<{
        list: MonitoringSearchNewsDocumentDto[]
        page: pageCountProps
        size: journalNewsCountPaginationInfoProps
      }>
    ) => {
      state.newsListByMediaId = action.payload.list
      state.mediaNewsCountPage = action.payload.page
      state.mediaNewsCountPaginationInfo = action.payload.size
    },
    setActivityTabAction: (
      state,
      action: PayloadAction<{
        list: SelectListOptionItem[]
        tab: SelectListOptionItem
      }>
    ) => {
      state.activityTabList = action.payload.list
      state.activityTab = action.payload.tab
    },
    setMediaActivityTabAction: (
      state,
      action: PayloadAction<{
        list: SelectListOptionItem[]
        tab: SelectListOptionItem
      }>
    ) => {
      state.activityTabList = action.payload.list
      state.activityTab = action.payload.tab
    },
    setChangeActivityTabAction: (state, action: PayloadAction<SelectListOptionItem>) => {
      state.activityTab = action.payload
      state.activityDataList = []
    },
    setMediaChangeActivityTabAction: (state, action: PayloadAction<SelectListOptionItem>) => {
      state.activityTab = action.payload
      state.activityDataList = []
    },
    activityParamKeywordAction: (state, action: PayloadAction<string>) => {
      state.activityParamKeyword = action.payload
    },
    initAction: state => {
      state.profileImageId = 0
      state.listDefine = ''

      state.mediaIdKey = 0
      state.mediaIdKeyParam = null
      state.mediaContactInfo = null
      state.mediaCheckDuplicateParam = null
      state.mediaEmailBlocking = false
      state.isMediaUserBlock = {
        blockedUserId: 0,
        companyId: 0,
        licenseId: 0,
        blockedAt: '',
        unblockRequestBy: null,
        unblockRequestCnt: 0,
      }
      state.mediaNewsCountPage = {
        totalCount: 0,
        totalPageCount: 1,
      }
      state.mediaNewsCountPaginationInfo = {
        page: 1,
        size: 15,
      }
      state.newsListByMediaId = []
      state.mediaGroupMediaKey = ''
      state.mediaGroupJournalist = []
      state.mediaGroupSubMediaList = []
      state.mediaGroupJournalistCountPage = {
        totalCount: 0,
        totalPageCount: 1,
        page: 1,
        size: 15,
      }
      state.mediaGroupSubMediaListCountPage = {
        totalCount: 0,
        totalPageCount: 1,
        page: 1,
        size: 15,
      }
      state.mediaGroupTab = 'journalist'
      state.activityTabList = []
      state.activityTab = { id: '', name: '' }
      state.activityDataList = []
      state.activityDataListPaginationInfo = {
        totalCount: 0,
        totalPageCount: 0,
        page: 1,
        size: 8,
      }

      state.newsDto = {
        timezone: '',
        groupId: 0,
        periodStartYear: moment().subtract({ year: 2 }).format('YYYY'),
        periodStartMonth: moment().subtract({ year: 2 }).format('MM'),
        periodStartDay: moment().subtract({ year: 2 }).format('DD'),
        periodEndYear: moment().format('YYYY'),
        periodEndMonth: moment().format('MM'),
        periodEndDay: moment().format('DD'),
        sort: [`inserted!desc`, `newsid!desc`],
        page: 1,
        size: 8,
      }

      state.newsLoading = false
      state.activityLoading = false

      state.actionStateFilterList = []
      state.actionCategoryList = []
      state.searchRegisterList = []
      state.filterPortalCode = []
      state.commonCodeState = []
      state.publisherTypeList = []

      state.activityParamKeyword = ''

      state.blockedEmailSenderPopup = {
        isOpen: false,
        type: '',
        status: '',
        idKey: '',
      }
      state.registerMediaPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.registerJournalPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
      state.searchRegisterListPopup = {
        isOpen: false,
        kind: '',
        type: 'any',
        name: '',
        nameErr: '',
        isActive: false,
        except: [],
        origin: [],
        searchRegistIdList: [],
        mediaIdList: [],
        journalIdList: [],
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
      state.duplicationMediaPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.mediaPersonalParamsPopup = {
        isOpen: false,
        key: 0,
        mediaName: '',
        mediaNameErr: '',
        email: '',
        emailErr: '',
        websiteErr: '',
        website: '',
        landline: '',
        mobile: '',
        fields: '',
        address: '',
        subAddressNm: '',
        mediaBookLists: [],
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
      state.addressPopup = false
    },
  },
})

export const {
  activityParamKeywordAction,
  initAction,
  actionCategoryListAction,
  actionStateFilterAction,
  setResultInitDataAction,
  mediaContactInfoAction,
  mediaEmailBlockingAction,
  isMediaUserBlockAction,
  blockedEmailSenderPopupAction,
  registerJournalPhotoPopupAction,
  initSearchRegisterListPopupAction,
  searchRegisterListPopupAction,
  searchRegisterListAction,
  pressMediaUnBlockPopupAction,
  addPersonalContactAction,
  pressMediaErrPopupAction,
  newsLoadingAction,
  activityLoadingAction,
  newsListByPressMediaIdAction,
  filterPortalCodeAction,
  commonCodeStateAction,
  publisherTypeAction,
  registerMediaPhotoPopupAction,
  mediaGroupJournalistAction,
  mediaGroupSubMediaListAction,
  mediaGroupTabAction,
  mediaGroupJournalistCountPageAction,
  setActivityDataListAction,
  setActivityTabAction,
  setChangeActivityTabAction,
  duplicationMediaPopupAction,
  mediaCheckDuplicateParamAction,
  mediaPersonalParamsAction,
  addressPopupAction,
  userPopupAction,
  profileImageIdAction,
  setMediaActivityTabAction,
  setMediaActivityDataListAction,
  setMediaChangeActivityTabAction,
  mediaIdKeyParamAction,
} = mediaProfileSlice.actions

export default mediaProfileSlice.reducer
