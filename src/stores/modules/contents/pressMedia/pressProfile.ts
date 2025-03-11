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
import { pressSocialListProps } from '~/stores/modules/contents/pressMedia/registerPressMedia'
import {
  ActionDtoForList,
  ContactUserAddedDto,
  type ESearchNewsCondDto,
  JournalistAutoCompleteDto,
} from '~/types/api/service'
import { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import { ESearchJournalistDocumentDto, ESearchMediaDocumentDto } from '~/types/contents/PressMedia'

export interface dataOnChangeActionTypeProps {
  personalContacts?: string
  emailBlock?: string
  isJournalUserBlock?: string
}

export interface dataOnChangeActionProps {
  personalContacts?: number
  emailBlock?: number
  isJournalUserBlock?: string
}

export type journalDecodeListProps = {
  beemail: string
  mobile: string
  landline: string
  landlineShared: string
  fax: string
}

export type journalNewsCountPaginationInfoProps = {
  page: number
  size: number
}

export type PaginationInfoProps = {
  page: number
  size: number
  totalCount: number
  totalPageCount: number
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

export type duplicationJournalPopupPropsProps = {
  isOpen: boolean
  key: number
  targetName: string
}
export interface searchContentListProps extends ActionDtoForList {
  categoryName?: string
  stateName?: string
  titleForManage?: string
}

export type wordCloudTagTypeListProps = {
  name: string
  value: number
}

export type blockedEmailSenderPopupProps = {
  isOpen: boolean
  type: string
  status: string
  idKey: string
}

export type isUserBlockProps = {
  blockedUserId: number
  companyId?: number
  licenseId?: number
  blockedAt?: string
  unblockRequestBy?: null
  unblockRequestCnt?: number
}

export type pressPersonalParamsProps = {
  isOpen: boolean
  key: number
  name: string
  nameErr: string
  mediaName: string
  mediaNameErr: string
  department: string
  position: string
  email: string
  emailErr: string
  landline: string
  mobile: string
  fields: string
  address: string
  subAddressNm: string
  career: string
  education: string
  writings: string
  awards: string
  jrnlstLists: MbTagSearchTagItem[]
}

export interface Props {
  profileImageId: number
  listDefine: string

  newsLoading: boolean
  activityLoading: boolean

  mediaIdKey: number
  mediaIdKeyParam: ESearchMediaDocumentDto | null
  mediaContactInfo: ContactUserAddedDto | null
  mediaEmailBlocking: boolean
  isMediaUserBlock: number
  mediaNewsCountPage: pageCountProps
  mediaNewsCountPaginationInfo: journalNewsCountPaginationInfoProps
  newsListByMediaId: MonitoringSearchNewsDocumentDto[]

  newsDto: ESearchNewsCondDto
  journalIdKey: number
  journalGroupMediaKey: number
  journalGroupMediaParam: ESearchMediaDocumentDto | null
  journalIdKeyParam: ESearchJournalistDocumentDto | null
  journalContactInfo: ContactUserAddedDto | null
  journalContactBlockedInfo: number
  journalEmailBlocking: boolean
  journalDecodeList: journalDecodeListProps
  journalNewsCountPage: pageCountProps
  journalNewsCountPaginationInfo: journalNewsCountPaginationInfoProps
  isJournalUserBlock: isUserBlockProps
  newsListByJournalId: MonitoringSearchNewsDocumentDto[]
  activityTabList: SelectListOptionItem[]
  activityTab: SelectListOptionItem
  activityDataList: MonitoringSearchNewsDocumentDto[] | searchContentListProps[]
  activityDataListPaginationInfo: PaginationInfoProps
  activityParamKeyword: string
  newsListParamKeyword: string
  wordCloudTagType: SelectListOptionItem
  wordCloudTagTypeList: wordCloudTagTypeListProps[]
  journalCheckDuplicateParam: JournalistAutoCompleteDto | null

  actionStateFilterList: SelectListOptionItem[]
  actionCategoryList: SelectListOptionItem[]
  searchRegisterList: mediaContentListProps[]
  filterPortalCode: SelectListOptionItem[]
  journalistTagTypeList: SelectListOptionItem[]
  commonCodeState: SelectListOptionItem[]
  publisherTypeList: SelectListOptionItem[]
  pressSocialList: pressSocialListProps[]
  jrnlstSocialUserAddList: SelectListOptionItem[]

  blockedEmailSenderPopup: blockedEmailSenderPopupProps
  registerJournalPhotoPopup: registerJournalPhotoPopupProps
  registerMediaPhotoPopup: registerMediaPhotoPopupProps
  searchRegisterListPopup: searchRegisterListPopupProps
  pressMediaUnBlockPopup: pressMediaUnBlockPopupProps
  addPersonalContactPopup: addPersonalContactProps
  pressMediaErrPopup: pressMediaErrPopupProps
  duplicationJournalPopup: duplicationJournalPopupPropsProps
  pressPersonalParamsPopup: pressPersonalParamsProps
  userPopup: userPopupProps
  addressPopup: boolean
}

// 초기값
export const initialState: Props = {
  profileImageId: 0,
  listDefine: '',

  mediaIdKey: 0,
  mediaIdKeyParam: null,
  mediaContactInfo: null,
  mediaEmailBlocking: false,
  isMediaUserBlock: 0,
  mediaNewsCountPage: {
    totalCount: 0,
    totalPageCount: 1,
  },
  mediaNewsCountPaginationInfo: {
    page: 1,
    size: 15,
  },
  newsListByMediaId: [],

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
  journalIdKey: 0,
  journalGroupMediaKey: 0,
  journalGroupMediaParam: null,
  journalIdKeyParam: null,
  journalContactInfo: null,
  journalContactBlockedInfo: 0,
  journalEmailBlocking: false,
  isJournalUserBlock: {
    blockedUserId: 0,
    companyId: 0,
    licenseId: 0,
    blockedAt: '',
    unblockRequestBy: null,
    unblockRequestCnt: 0,
  },
  journalDecodeList: {
    beemail: '',
    mobile: '',
    landline: '',
    landlineShared: '',
    fax: '',
  },
  journalNewsCountPage: {
    totalCount: 0,
    totalPageCount: 0,
  },
  journalNewsCountPaginationInfo: {
    page: 1,
    size: 8,
  },
  newsListByJournalId: [],
  activityTabList: [],
  activityTab: { id: '', name: '' },
  activityDataList: [],
  activityDataListPaginationInfo: {
    totalCount: 0,
    totalPageCount: 0,
    page: 1,
    size: 8,
  },
  activityParamKeyword: '',
  newsListParamKeyword: '',
  wordCloudTagType: { id: '', name: '' },
  wordCloudTagTypeList: [],
  journalCheckDuplicateParam: null,

  newsLoading: false,
  activityLoading: false,

  actionStateFilterList: [],
  actionCategoryList: [],
  searchRegisterList: [],
  filterPortalCode: [],
  commonCodeState: [],
  publisherTypeList: [],
  journalistTagTypeList: [],
  pressSocialList: [],
  jrnlstSocialUserAddList: [],

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
  duplicationJournalPopup: {
    isOpen: false,
    key: 0,
    targetName: '',
  },
  pressPersonalParamsPopup: {
    isOpen: false,
    key: 0,
    name: '',
    nameErr: '',
    mediaName: '',
    mediaNameErr: '',
    department: '',
    position: '',
    email: '',
    emailErr: '',
    landline: '',
    mobile: '',
    fields: '',
    address: '',
    subAddressNm: '',
    career: '',
    education: '',
    writings: '',
    awards: '',
    jrnlstLists: [],
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

const pressProfileSlice = createSlice({
  name: 'pressProfileSlice',
  initialState,
  reducers: {
    activityParamKeywordAction: (state, action: PayloadAction<string>) => {
      state.activityParamKeyword = action.payload
    },
    newsListParamKeywordAction: (state, action: PayloadAction<string>) => {
      state.newsListParamKeyword = action.payload
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
    journalistTagTypeListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.journalistTagTypeList = action.payload
      state.wordCloudTagType = action.payload[0]
    },
    pressSocialListAction: (state, action: PayloadAction<pressSocialListProps[]>) => {
      state.pressSocialList = action.payload
    },
    initPressPersonalParamsActionAction: (
      state,
      action: PayloadAction<{ param: pressPersonalParamsProps; list: pressSocialListProps[] }>
    ) => {
      state.pressPersonalParamsPopup = action.payload.param
      state.pressSocialList = action.payload.list
    },
    wordCloudTagTypeListAction: (state, action: PayloadAction<wordCloudTagTypeListProps[]>) => {
      state.wordCloudTagTypeList = action.payload
    },
    mediaContactInfoAction: (state, action: PayloadAction<ContactUserAddedDto>) => {
      state.mediaContactInfo = action.payload
    },
    mediaEmailBlockingAction: (state, action: PayloadAction<boolean>) => {
      state.mediaEmailBlocking = action.payload
    },
    searchRegisterListAction: (state, action: PayloadAction<mediaContentListProps[]>) => {
      state.searchRegisterList = action.payload
    },
    wordCloudTagTypeAction: (state, action: PayloadAction<SelectListOptionItem>) => {
      state.wordCloudTagType = action.payload
    },
    pressPersonalParamsAction: (state, action: PayloadAction<pressPersonalParamsProps>) => {
      state.pressPersonalParamsPopup = action.payload
    },
    addressPopupAction: (state, action: PayloadAction<boolean>) => {
      state.addressPopup = action.payload
    },
    userPopupAction: (state, action: PayloadAction<userPopupProps>) => {
      state.userPopup = action.payload
    },
    setChangeActivityTabAction: (state, action: PayloadAction<SelectListOptionItem>) => {
      state.activityTab = action.payload
      state.activityDataList = []
    },
    jrnlstSocialUserAddListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.jrnlstSocialUserAddList = action.payload
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
    setActivityDataListAction: (
      state,
      action: PayloadAction<{
        list: MonitoringSearchNewsDocumentDto[] | searchContentListProps[]
        pagination: PaginationInfoProps
      }>
    ) => {
      state.activityDataList = action.payload.list
      state.activityDataListPaginationInfo = action.payload.pagination
    },
    setResultInitDataAction: (
      state,
      action: PayloadAction<{
        listDefine: string
        journalistId: number
        tempMediaIdParams: ESearchMediaDocumentDto | null
        tempJournalIdParams: ESearchJournalistDocumentDto | null
        tempJournalDecodeList: journalDecodeListProps
        dto: ESearchNewsCondDto
        journalGroupMediaKey: number
      }>
    ) => {
      state.listDefine = action.payload.listDefine
      state.journalIdKey = action.payload.journalistId
      state.journalIdKeyParam = action.payload.tempJournalIdParams
      state.mediaIdKeyParam = action.payload.tempMediaIdParams
      state.journalDecodeList = action.payload.tempJournalDecodeList
      console.log('journalDecodeList', action.payload.tempJournalDecodeList)
      state.newsDto = action.payload.dto
      state.journalGroupMediaKey = action.payload.journalGroupMediaKey
    },
    isMediaUserBlockAction: (state, action: PayloadAction<number>) => {
      state.isMediaUserBlock = action.payload
    },
    journalIdKeyParamAction: (state, action: PayloadAction<ESearchJournalistDocumentDto>) => {
      state.journalIdKeyParam = action.payload
    },
    journalGroupMediaParamAction: (state, action: PayloadAction<ESearchMediaDocumentDto | null>) => {
      state.journalGroupMediaParam = action.payload
    },
    journalCheckDuplicateParamAction: (state, action: PayloadAction<JournalistAutoCompleteDto | null>) => {
      state.journalCheckDuplicateParam = action.payload
    },
    isJournalUserBlockAction: (state, action: PayloadAction<isUserBlockProps>) => {
      state.isJournalUserBlock = action.payload
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
    profileImageIdAction: (state, action: PayloadAction<number>) => {
      state.profileImageId = action.payload
      state.registerJournalPhotoPopup = {
        isOpen: false,
        type: '',
        imageUrl: '',
        filesList: [],
      }
    },
    newsLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.newsLoading = action.payload
    },
    activityLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.activityLoading = action.payload
    },
    newsListByJournalPagingAction: (state, action: PayloadAction<journalNewsCountPaginationInfoProps>) => {
      state.journalNewsCountPaginationInfo = action.payload
    },
    openDuplicationJournalAction: (state, action: PayloadAction<duplicationJournalPopupPropsProps>) => {
      state.duplicationJournalPopup = action.payload
    },
    newsListByPressMediaIdAction: (
      state,
      action: PayloadAction<{
        list: MonitoringSearchNewsDocumentDto[]
        page: pageCountProps
        size: journalNewsCountPaginationInfoProps
      }>
    ) => {
      state.newsListByJournalId = action.payload.list
      state.journalNewsCountPage = action.payload.page
      state.journalNewsCountPaginationInfo = action.payload.size
      state.newsListByMediaId = action.payload.list
      state.mediaNewsCountPage = action.payload.page
      state.mediaNewsCountPaginationInfo = action.payload.size
    },
    initAction: state => {
      state.profileImageId = 0
      state.listDefine = ''

      state.mediaIdKey = 0
      state.mediaIdKeyParam = null
      state.mediaContactInfo = null
      state.mediaEmailBlocking = false
      state.isMediaUserBlock = 0
      state.mediaNewsCountPage = {
        totalCount: 0,
        totalPageCount: 1,
      }
      state.mediaNewsCountPaginationInfo = {
        page: 1,
        size: 15,
      }
      state.newsListByMediaId = []

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
      state.journalIdKey = 0
      state.journalGroupMediaKey = 0
      state.journalGroupMediaParam = null
      state.journalIdKeyParam = null
      state.journalContactInfo = null
      state.journalContactBlockedInfo = 0
      state.journalEmailBlocking = false
      state.isJournalUserBlock = {
        blockedUserId: 0,
        companyId: 0,
        licenseId: 0,
        blockedAt: '',
        unblockRequestBy: null,
        unblockRequestCnt: 0,
      }
      state.journalDecodeList = {
        beemail: '',
        mobile: '',
        landline: '',
        landlineShared: '',
        fax: '',
      }
      state.journalNewsCountPage = {
        totalCount: 0,
        totalPageCount: 0,
      }
      state.journalNewsCountPaginationInfo = {
        page: 1,
        size: 8,
      }
      state.newsListByJournalId = []
      state.activityTabList = []
      state.activityTab = { id: '', name: '' }
      state.activityDataList = []
      state.activityDataListPaginationInfo = {
        totalCount: 0,
        totalPageCount: 0,
        page: 1,
        size: 8,
      }
      state.activityParamKeyword = ''
      state.newsListParamKeyword = ''
      state.wordCloudTagType = { id: '', name: '' }
      state.wordCloudTagTypeList = []
      state.journalCheckDuplicateParam = null

      state.newsLoading = false
      state.activityLoading = false

      state.actionStateFilterList = []
      state.actionCategoryList = []
      state.searchRegisterList = []
      state.filterPortalCode = []
      state.commonCodeState = []
      state.publisherTypeList = []
      state.journalistTagTypeList = []
      state.pressSocialList = []
      state.jrnlstSocialUserAddList = []

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
      state.duplicationJournalPopup = {
        isOpen: false,
        key: 0,
        targetName: '',
      }
      state.pressPersonalParamsPopup = {
        isOpen: false,
        key: 0,
        name: '',
        nameErr: '',
        mediaName: '',
        mediaNameErr: '',
        department: '',
        position: '',
        email: '',
        emailErr: '',
        landline: '',
        mobile: '',
        fields: '',
        address: '',
        subAddressNm: '',
        career: '',
        education: '',
        writings: '',
        awards: '',
        jrnlstLists: [],
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
  initAction,
  journalContactInfoAction,
  actionCategoryListAction,
  journalEmailBlockingAction,
  actionStateFilterAction,
  setResultInitDataAction,
  mediaContactInfoAction,
  mediaEmailBlockingAction,
  isJournalUserBlockAction,
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
  newsListByJournalPagingAction,
  filterPortalCodeAction,
  registerMediaPhotoPopupAction,
  journalGroupMediaParamAction,
  commonCodeStateAction,
  publisherTypeAction,
  setActivityDataListAction,
  setActivityTabAction,
  setChangeActivityTabAction,
  journalistTagTypeListAction,
  wordCloudTagTypeAction,
  wordCloudTagTypeListAction,
  journalCheckDuplicateParamAction,
  openDuplicationJournalAction,
  pressPersonalParamsAction,
  pressSocialListAction,
  jrnlstSocialUserAddListAction,
  addressPopupAction,
  initPressPersonalParamsActionAction,
  userPopupAction,
  activityParamKeywordAction,
  newsListParamKeywordAction,
  profileImageIdAction,
  journalIdKeyParamAction,
} = pressProfileSlice.actions

export default pressProfileSlice.reducer
