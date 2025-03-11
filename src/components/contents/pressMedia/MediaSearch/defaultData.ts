import { USER_PREVILLEGE_CODE } from '~/constants/common/user'
import { SelectListOptionItem } from '~/types/common'

export const draftTab = [
  {
    id: 'press',
    name: '언론인 검색',
  },
  {
    id: 'media',
    name: '매체 검색',
  },
]

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

export const extendedCommonCodeTargetList: SelectListOptionItem[] = [
  {
    id: 'PUB_CYCLE',
    name: 'PUB_CYCLE',
  },
  {
    id: 'MEDIA_VALUE',
    name: 'MEDIA_VALUE',
  },
  {
    id: 'JOURNALIST_OCCUPATION',
    name: 'JOURNALIST_OCCUPATION',
  },
  {
    id: 'MEDIA_TYPE',
    name: 'MEDIA_TYPE',
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
    id: 'JRNLST_SOCIAL_FILTER_ID',
    name: 'JRNLST_SOCIAL_FILTER_ID',
  },
  {
    id: 'MEDIA_JRNLIST_NAME_REVEALED_YN',
    name: 'MEDIA_JRNLIST_NAME_REVEALED_YN',
  },
  {
    id: 'MEDIA_BLOCK_YN',
    name: 'MEDIA_BLOCK_YN',
  },
  {
    id: 'MEDIA_INFO_TYPE',
    name: 'MEDIA_INFO_TYPE',
  },
  {
    id: 'PORTAL_CODE',
    name: 'PORTAL_CODE',
  },
  {
    id: 'INDUSTRY',
    name: 'INDUSTRY',
  },
  {
    id: 'LOCATION',
    name: 'LOCATION',
  },
  {
    id: 'FILTER',
    name: 'FILTER',
  },
]

export const disclosureScopeFilterOptionList: SelectListOptionItem[] = [
  {
    id: '',
    name: '전체',
  },
  {
    id: USER_PREVILLEGE_CODE.WRITABLE.id,
    name: USER_PREVILLEGE_CODE.WRITABLE.shortName,
  },
  {
    id: USER_PREVILLEGE_CODE.READABLE.id,
    name: USER_PREVILLEGE_CODE.READABLE.shortName,
  },
  {
    id: USER_PREVILLEGE_CODE.PRIVATE.id,
    name: USER_PREVILLEGE_CODE.PRIVATE.shortName,
  },
]
