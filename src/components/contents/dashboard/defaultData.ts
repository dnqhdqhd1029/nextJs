import { GadgetItem } from '~/stores/modules/contents/dashboard/dashboardSlice'
import { SelectListOptionItem } from '~/types/common'

export const monitoringSettingHeight = 2.7
export const monitoringGraphHeight = 3.38
export const MAX_TABLE_COUNT = 30

export const defaultKeywordMonitoringType: SelectListOptionItem[] = [
  { id: 'news', name: '뉴스 목록' },
  { id: 'graph', name: '그래프' },
]

export const lineOptions: ApexCharts.ApexOptions = {
  chart: {
    height: 250,
    type: 'line',
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 3,
    curve: 'smooth',
  },
  grid: {
    row: {
      colors: ['#f7f7f7', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: ['11/1', '11/2', '11/3', '11/4', '11/5', '11/6', '11/7'],
  },
  yaxis: {
    min: 0,
    max: 1000,
    tickAmount: 5,
  },
  markers: {
    size: 6,
  },
  fill: {
    opacity: 1,
  },
  colors: ['#00bf8c'],
}

export const defaultKeywordMonitoringSubType: SelectListOptionItem[] = [
  { id: 'line', name: '선형 그래프' },
  { id: 'bar', name: '막대 그래프' },
]

export const gadgetList: GadgetItem[] = [
  {
    id: 'activity',
    name: '활동',
    count: 10,
    url: '/activity/search',
  },
  {
    id: 'pressRelease',
    name: '보도자료 배포',
    count: 10,
    url: '/activity/search',
  },
  {
    id: 'pressList',
    name: '언론인 리스트',
    count: 10,
    url: '/contacts/list',
  },
  {
    id: 'mediaList',
    name: '미디어 리스트',
    count: 10,
    url: '/media/list',
  },
  {
    id: 'pressCustomSearch',
    name: '언론인 맞춤 검색',
    count: 10,
    url: '/contacts/saved-search-manage',
  },
  {
    id: 'mediaCustomSearch',
    name: '미디어 맞춤 검색',
    count: 10,
    url: '/media/saved-search-manage',
  },
  {
    id: 'clipbook',
    name: '클립북',
    count: 10,
    url: '/news/clipbook',
  },
  {
    id: 'coverageClipbook',
    name: '커버리지 클립북',
    count: 10,
    url: '/news/clipbook',
  },
  {
    id: 'monitoring',
    name: '모니터링',
    count: 10,
    url: '/news/saved-search-manage',
  },
  {
    id: 'keywordMonitoring',
    name: '키워드 모니터링',
    url: '/news/monitoring',
  },
  {
    id: 'project',
    name: '프로젝트',
    count: 10,
    url: '',
  },
  {
    id: 'group',
    name: '그룹',
    count: 10,
    url: '',
  },
  {
    id: 'pressBriefing',
    name: '미디어 소식',
    count: 10,
    url: '/media-briefing',
  },
]
