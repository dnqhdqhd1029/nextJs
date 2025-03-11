import { USER_PREVILLEGE_CODE } from '~/constants/common/user'
import { SelectListOptionItem } from '~/types/common'

export const extendedShareScopeList: SelectListOptionItem[] = [
  {
    id: USER_PREVILLEGE_CODE.WRITABLE.id,
    name: USER_PREVILLEGE_CODE.WRITABLE.name,
  },
  {
    id: USER_PREVILLEGE_CODE.READABLE.id,
    name: USER_PREVILLEGE_CODE.READABLE.name,
  },
  {
    id: USER_PREVILLEGE_CODE.PRIVATE.id,
    name: USER_PREVILLEGE_CODE.PRIVATE.name,
  },
]
export const extendedShareScopeTargetList: SelectListOptionItem[] = [
  {
    id: 'GROUP',
    name: '이 그룹',
  },
  {
    id: 'COMPANY',
    name: '전체 그룹',
  },
]

export const extendedCommonCodeTargetList: SelectListOptionItem[] = [
  {
    id: 'MONITORING_CATEGORY',
    name: 'MONITORING_CATEGORY',
  },
  {
    id: 'NEWS_INFO_TYPE',
    name: 'NEWS_INFO_TYPE',
  },
  {
    id: 'PUB_CYCLE',
    name: 'PUB_CYCLE',
  },
  {
    id: 'MEDIA_VALUE',
    name: 'MEDIA_VALUE',
  },
  {
    id: 'NEWS_PERIOD',
    name: 'NEWS_PERIOD',
  },
  {
    id: 'COVERAGE_NEWS_YN',
    name: 'COVERAGE_NEWS_YN',
  },
  {
    id: 'MEDIA_TYPE',
    name: 'MEDIA_TYPE',
  },
  {
    id: 'CLIPBOOK_NEWS_YN',
    name: 'CLIPBOOK_NEWS_YN',
  },
  {
    id: 'TONE',
    name: 'TONE',
  },
  {
    id: 'NEWS_SEARCH_MULTIMEDIA',
    name: 'NEWS_SEARCH_MULTIMEDIA',
  },
]
