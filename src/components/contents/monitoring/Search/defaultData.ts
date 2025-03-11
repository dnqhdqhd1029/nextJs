import { SelectListOptionItem } from '~/types/common'

export const monitoringInitParams = {
  and: '',
  or: '',
  not: '',
  period: { id: '', name: '선택' },
  startPeriod: new Date(),
  endPeriod: new Date(),
  periodTag: [],
  mediaType: [],
  mediaValue: { id: '', name: '선택' },
  mediaTagList: [],
  journalistTagList: [],
  tone: [],
  tag: [],
  url: '',
  publishingPeriod: [],
  mediaBookList: [],
  clipbookValue: [],
  clipbook: { id: '', name: '선택' },
  coverage: { id: '', name: '선택' },
  informationType: { id: '', name: '선택' },
}

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
