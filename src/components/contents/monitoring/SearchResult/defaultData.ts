import moment from 'moment/moment'

import type { TabItem } from '~/components/common/ui/Tabs'
import { USER_PREVILLEGE_CODE } from '~/constants/common/user'
import { filterSubParamActionsProps } from '~/stores/modules/contents/monitoring/monitoringSearch'
import { NavigationLinkItem, SelectListOptionItem } from '~/types/common'

export const newsSortOptionList: SelectListOptionItem[] = [
  {
    id: 'latest',
    name: '최신순',
  },
  {
    id: 'oldest',
    name: '과거순',
  },
  {
    id: 'mediaValue',
    name: '매체 지수',
  },
  {
    id: 'mediaName',
    name: '매체명',
  },
  {
    id: 'manualSort',
    name: '수동 정렬',
  },
]

export const defaultEditOptionsByData: SelectListOptionItem[] = [
  {
    id: 'tag',
    name: '태그 수정',
  },
  {
    id: 'tone',
    name: '논조 수정',
  },
]
const chartHeight = 280

export const lineOptions: ApexCharts.ApexOptions = {
  chart: {
    height: chartHeight,
    type: 'line',
    zoom: {
      enabled: true,
    },
    toolbar: {
      show: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  grid: {
    show: true,
    borderColor: '#e1e3e3',
    position: 'back',
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
    padding: {
      bottom: 5,
    },
  },
  xaxis: {
    categories: ['5/1', '5/2', '5/3', '5/4', '5/5', '5/6', '5/7', '5/8', '5/9', '5/10', '5/11', '5/12'],
    labels: {
      rotate: -90,
      rotateAlways: true,
      style: {
        fontSize: '11px', // 폰트 크기 조정
      },
    },
    axisTicks: {
      height: 20, // X축 높이 조정
    },
  },
  yaxis: {
    min: 0,
    labels: {
      formatter: function (val: number) {
        // 정수로 포맷팅
        return parseInt(val.toString()).toString()
      },
    },
  },
  markers: {
    size: 4,
  },
  colors: ['#18b7cc'],
}

export const lineSeries = [
  {
    name: '뉴스 건수',
    data: [600, 400, 410, 500, 350, 640, 800, 700, 820, 1000, 830, 840],
  },
]

export const pieOptionsCommon: ApexCharts.ApexOptions = {
  chart: {
    type: 'donut',
    height: chartHeight,
    zoom: {
      enabled: true,
    },
    toolbar: {
      show: true,
    },
  },
  stroke: {
    width: 0,
  },
  colors: ['#198754', '#0094a8', '#ffca08', '#0dcaf0', '#dc3545'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
  plotOptions: {
    pie: {
      expandOnClick: false,
    },
  },
}

export const pieSeries1 = [50.1, 30.9, 19]
export const pieSeries2 = [38, 30, 15, 10, 7]

export const pieOptions1: ApexCharts.ApexOptions = {
  ...pieOptionsCommon,
  labels: ['긍정', '부정', '중립'],
}

export const pieOptions2: ApexCharts.ApexOptions = {
  ...pieOptionsCommon,
  labels: ['소비자 온라인', '업계 온라인', '잡지', '인쇄 매체', '공중파 TV'],
}

export const columnOptions: ApexCharts.ApexOptions = {
  chart: {
    type: 'bar',
    height: chartHeight,
    zoom: {
      enabled: true,
    },
    toolbar: {
      show: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      distributed: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['5/1', '5/2', '5/3', '5/4', '5/5', '5/6', '5/7'],
  },
  yaxis: {
    min: 0,
    labels: {
      formatter: function (val: number) {
        // 정수로 포맷팅
        return parseInt(val.toString()).toString()
      },
    },
  },
  fill: {
    opacity: 1,
  },
  colors: ['#198754', '#0094a8', '#ffca08', '#0dcaf0', '#dc3545'],
}

export const columnSeries = [
  {
    name: '뉴스 건수',
    data: [16, 18, 30, 82, 150, 17, 25],
  },
]
export const defaultAPiParams = {
  newsIdList: [],
  timezone: '',
  periodStartYear: moment().format('YYYY'),
  periodStartMonth: moment().format('MM'),
  periodStartDay: moment().subtract({ days: 7 }).format('DD'),
  periodEndYear: moment().format('YYYY'),
  periodEndMonth: moment().format('MM'),
  periodEndDay: moment().format('DD'),
  page: 1,
  size: 10,
  sort: [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`],
  groupId: 0,
}

//https://local.svc.d.mediabee.kr:4189/news/monitoring
export const defaultFilterOptionsByData: SelectListOptionItem[] = [
  {
    id: 'inserted',
    name: '날짜',
  },
  {
    id: '_score',
    name: '관련성',
  },
  {
    id: 'char_len',
    name: '글자수',
  },
]

export const defaultReportFormOptionList: SelectListOptionItem[] = [
  {
    id: 'isEmail',
    name: '이메일 본문',
  },
  {
    id: 'isWord',
    name: '워드 첨부',
  },
  {
    id: 'isPdf',
    name: 'PDF 첨부',
  },
  // {
  //   id: 'tag',
  //   name: '태그',
  // },
]

export const newsAutoGroupingOptionList: SelectListOptionItem[] = [
  {
    id: 'mediaType',
    name: '매체 유형',
  },
  {
    id: 'mediaValue',
    name: '매체 지수',
  },
  {
    id: 'tone',
    name: '논조',
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

export const defaultBasicMonitoringSetting: SelectListOptionItem[] = [
  {
    id: 'SHARE',
    name: '공유하기',
  },
]

export const tagPopupNaviLinks: TabItem[] = [
  {
    id: 'add',
    title: '추가',
  },
  {
    id: 'delete',
    title: '제외',
  },
  {
    id: 'replace',
    title: '대체(모두 제외 후 추가)',
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

export const subNewsFilterListList: NavigationLinkItem[] = [
  {
    id: 'filterPeriod',
    title: '기간',
    subMenus: [],
  },
  {
    id: 'filterCategoryList',
    title: '미디어유형',
    subMenus: [],
  },
  {
    id: 'filterInformation',
    title: '매체 지수',
    subMenus: [],
  },
  {
    id: 'filterMediaNameList',
    title: '매체명',
    subMenus: [],
  },
  {
    id: 'filterTone',
    title: '논조',
    subMenus: [],
  },
  {
    id: 'filterMultimedia',
    title: '멀티미디어',
    subMenus: [],
  },
  {
    id: 'filterSourceType',
    title: '정보 유형',
    subMenus: [],
  },
]

export const defaultMonitoringListParams = {
  timezone: '',
  periodStartYear: moment().subtract({ month: 1 }).format('YYYY'),
  periodStartMonth: moment().subtract({ month: 1 }).format('MM'),
  periodStartDay: moment().subtract({ month: 1 }).format('DD'),
  periodEndYear: moment().format('YYYY'),
  periodEndMonth: moment().format('MM'),
  periodEndDay: moment().format('DD'),
  page: 1,
  size: 20,
  sort: [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`],
  groupId: 0,
}

export const defaultMonitoringParams = {
  period: { id: '', name: '선택' },
  startPeriod: new Date(),
  endPeriod: new Date(),
  periodTag: [],
  and: '',
  or: '',
  not: '',
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
  existMultimedia: [],
}

export const subNewsFilterOptionsList: filterSubParamActionsProps[] = [
  {
    id: 'filterPeriod',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterCategoryList',
    isOpen: false,
    subMenu: [],
    values: [],
  },
  {
    id: 'filterInformation',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterMediaNameList',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterTone',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterMultimedia',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterSourceType',
    isOpen: false,
    values: [],
  },
]

export const extendedCommonCodeTargetList: SelectListOptionItem[] = [
  {
    id: 'MONITORING_CATEGORY',
    name: 'MONITORING_CATEGORY',
  },
  {
    id: 'NEWS_MONITORING_PERIOD',
    name: 'NEWS_MONITORING_PERIOD',
  },
  {
    id: 'TONE',
    name: 'TONE',
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
    id: 'MEDIA_SUB_TYPE',
    name: 'MEDIA_SUB_TYPE',
  },
  {
    id: 'NEWS_SEARCH_MULTIMEDIA',
    name: 'NEWS_SEARCH_MULTIMEDIA',
  },
]
