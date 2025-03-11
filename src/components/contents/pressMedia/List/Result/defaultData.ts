import moment from 'moment'

import { filterSubParamActionsProps } from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import { NavigationLinkItem, SelectListOptionItem, type SortFilterOptionItem } from '~/types/common'

export const defaultSavedSearchListDto = {
  page: 1,
  size: 10000,
  sort: [`updateAt!desc`],
  groupId: 0,
}

export const extendedCommonCodeTargetList: SelectListOptionItem[] = [
  {
    id: 'PUBLISHER_TYPE',
    name: 'PUBLISHER_TYPE',
  },
  {
    id: 'MEDIA_VALUE',
    name: 'MEDIA_VALUE',
  },
  {
    id: 'ACTION_STATE',
    name: 'ACTION_STATE',
  },
  {
    id: 'JRNLST_SOCIAL_FILTER_ID',
    name: 'JRNLST_SOCIAL_FILTER_ID',
  },
  {
    id: 'JOURNALIST_OCCUPATION',
    name: 'JOURNALIST_OCCUPATION',
  },
  {
    id: 'MEDIA_INFO_TYPE',
    name: 'MEDIA_INFO_TYPE',
  },
  {
    id: 'PUB_CYCLE',
    name: 'PUB_CYCLE',
  },
  {
    id: 'PORTAL_CODE',
    name: 'PORTAL_CODE',
  },
  {
    id: 'MEDIA_TYPE',
    name: 'MEDIA_TYPE',
  },
  {
    id: 'ACTION_CATEGORY_ALL',
    name: 'ACTION_CATEGORY_ALL',
  },
  {
    id: 'ACTION_STATE_FILTER',
    name: 'ACTION_STATE_FILTER',
  },
  {
    id: 'JOURNALIST_INFO_TYPE',
    name: 'JOURNALIST_INFO_TYPE',
  },
  {
    id: 'LANGUAGE',
    name: 'LANGUAGE',
  },
  {
    id: 'MEDIA_COUNT',
    name: 'MEDIA_COUNT',
  },
  {
    id: 'JOURNALIST_BLOCK_YN',
    name: 'JOURNALIST_BLOCK_YN',
  },
  {
    id: 'MEDIA_JRNLIST_NAME_REVEALED_YN',
    name: 'MEDIA_JRNLIST_NAME_REVEALED_YN',
  },
  {
    id: 'MEDIA_BLOCK_YN',
    name: 'MEDIA_BLOCK_YN',
  },
]

export const ProfileTabs = [
  { title: '프로필', id: 'profile' },
  { title: '뉴스', id: 'news' },
  { title: '활동', id: 'activity' },
]

export const personalTabs = [
  { title: '프로필', id: 'profile' },
  { title: '활동', id: 'activity' },
]

export const mediaSortOptionsByData: SortFilterOptionItem[] = [
  {
    id: 'name',
    name: '매체명',
  },
  {
    id: 'values.combined_new',
    name: '매체 지수',
  },
]

export const pressSortOptionsByData: SelectListOptionItem[] = [
  {
    id: 'media.main.price',
    name: '매체 지수',
  },
  {
    id: 'name',
    name: '이름',
  },
  {
    id: 'media.main.name',
    name: '매체명',
  },
]

export const pressInitParams = {
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

export const mediaInitParams = {
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

export const subMediaFilterOptionsList: filterSubParamActionsProps[] = [
  {
    id: 'filterCategory',
    isOpen: false,
    values: [],
    subMenu: [],
  },
  {
    id: 'filterLocation',
    isOpen: false,
    values: [],
    subMenu: [],
  },
  {
    id: 'filterType',
    isOpen: false,
    values: [],
    subMenu: [],
  },
  {
    id: 'filterInformation',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterPubCycle',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterPortal',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterSourceType',
    isOpen: false,
    values: [],
  },
]

export const subMediaFilterListList: NavigationLinkItem[] = [
  {
    id: 'filterCategory',
    title: '매체 분야',
    subMenus: [],
  },
  {
    id: 'filterLocation',
    title: '매체 지역',
    subMenus: [],
  },
  {
    id: 'filterType',
    title: '매체 유형',
    subMenus: [],
  },
  {
    id: 'filterInformation',
    title: '매체 지수',
    subMenus: [],
  },
  {
    id: 'filterPubCycle',
    title: '발행 주기',
    subMenus: [],
  },
  {
    id: 'filterPortal',
    title: '포털 제휴',
    subMenus: [],
  },
  {
    id: 'filterSourceType',
    title: '정보 유형',
    subMenus: [],
  },
]

export const subJournalFilterOptionsList = [
  {
    id: 'filterCategory',
    isOpen: false,
    values: [],
    subMenu: [],
  },
  {
    id: 'filterLocation',
    isOpen: false,
    values: [],
    subMenu: [],
  },
  {
    id: 'filterOccupation',
    isOpen: false,
    values: [],
    subMenu: [],
  },
  {
    id: 'filterType',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterInformation',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterPubCycle',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterPortal',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterSocial',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterSourceType',
    isOpen: false,
    values: [],
  },
]

export const subJournalFilterListList = [
  {
    id: 'filterCategory',
    title: '분야',
    subMenus: [],
  },
  {
    id: 'filterLocation',
    title: '지역',
    subMenus: [],
  },
  {
    id: 'filterOccupation',
    title: '직종',
    subMenus: [],
  },
  {
    id: 'filterType',
    title: '매체 유형',
    subMenus: [],
  },
  {
    id: 'filterInformation',
    title: '매체 지수',
    subMenus: [],
  },
  {
    id: 'filterPubCycle',
    title: '발행 주기',
    subMenus: [],
  },
  {
    id: 'filterPortal',
    title: '포털 제휴',
    subMenus: [],
  },
  {
    id: 'filterSocial',
    title: '소셜 미디어',
    subMenus: [],
  },
  {
    id: 'filterSourceType',
    title: '정보 유형',
    subMenus: [],
  },
]
