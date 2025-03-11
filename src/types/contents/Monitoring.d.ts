import { ClipBookDto, ESearchNewsCondDto, MonitoringSearchNewsDocumentDto, NewsSrchDto } from '~/types/api/service'
import { ElasticSearchReturnDtoNewsDocumentDto, NewsDocumentDto } from '~/types/api/service'
import type { MbSearchFilterItem } from '~/types/contents/Common'
import type { CommonSearchValues } from '~/types/contents/Common'
import { ESearchContDto } from '~/types/contents/PressMedia'

export interface MonitoringSearchNewsDocumentDto
  extends Omit<NewsDocumentDto, 'link' | 'video_img_link' | 'photo_urls'> {
  mapped?: {
    jid?: {
      by_email?: string[]
      by_name?: string[]
    }
    jname?: string[]
    mid?: string
    mname?: string
    pid?: string[]
  }
  link?: string
  video_img_link?: string
  photo_urls?: string[]
  unmapped?: string[]
}

export interface ClipbookCountDto {
  ALL: number
  COVERAGE: number
  NORMAL: number
}

export interface MonitoringCountDto {
  [key: string]: number
}

export type MonitoringNewsSearchFilter = Omit<ElasticSearchReturnDtoNewsDocumentDto, 'totalElements', 'name'>

export interface MonitoringListSizeItem {
  code: string
  size: number
}

export interface MonitoringClipbookSearchUrlParameters {
  page?: number
  size?: number
  sort?: string[]
  ownerId?: number
  filter?: string
  newsId?: string
  startDate?: string
  listId?: string
  type?: string
  normalSize?: number
  coverageSize?: number
  listFilter?: string
  listSort?: string
  isAsideFilterOpen?: boolean
  pageMode?: string
  filterActivated?: boolean
}

export interface MonitoringAnalysisGraphData {
  dailyNewsCountList: MediaNameCountType[]
  toneCountList: MediaNameCountType[]
  newsCountListByUpperMedia: MediaNameCountType[]
  mediaTypeList: MediaNameCountType[]
}

export interface MediaNameCountType {
  name: string
  count: number
}

export interface NewsNotiNodeParams {
  targetId?: number
  targetName?: string
  targetJournalist?: string
  myNews?: boolean
  item?: MonitoringSearchNewsDocumentDto
}

export interface PeriodValues {
  [key: string]: string
}

export interface StepFileTagItem {
  id: string
  name: string
}

export interface RegisterExcelItem {
  id: string
  title?: string
  date?: string
  link?: string
  media?: string
  authors?: string[]
}

export interface GetApiClipbookListParams {
  normalSize?: number
  coverageSize?: number
  isMyItem?: boolean
  isRecall?: boolean
}

export interface ClipbookListSelectListItem {
  title: string
  items: ClipBookDto[]
  type: string
}

export interface AdjustClipBookResultItemToSearchValuesParams {
  item?: ClipBookDto
  isNewItem?: boolean
}

export interface ClipBookResultParams {
  page?: number
  size?: number
  sort?: string[]
  filter?: string
  searchValues?: CommonSearchValues
  sideFilterValues?: ESearchNewsCondDto
  sideFilterItems?: MbSearchFilterItem[]
  isNewItem?: boolean
  periodValues?: ClipBookPeriodValues
}

export interface ClipBookPeriodValues {
  periodStartYear?: string
  periodStartMonth?: string
  periodStartDay?: string
  periodEndYear?: string
  periodEndMonth?: string
  periodEndDay?: string
}

export interface ClipBookListParams {
  tab?: string
  page?: number
  size?: number
  groupId?: number
  ownerId?: number
  sort?: string[]
  keyword?: string
  shareCode?: string
  myButtonToggle?: boolean
}

export interface ApiMediaValuePointData {
  [key: string]: number
}

export interface MediaValuePointItem {
  startPoint: number
  endPoint: number
  minValue: number
  maxValue: number
}

export interface MonitoringListSelectListItem {
  title: string
  items: NewsSrchDto[]
  type: string
  totalSize: number
  currentRequestSize?: number
}

export interface MonitoringListAndResultParams {
  page?: number
  size?: number
  sort?: string[]
  filter?: string
  item?: NewsSrchDto
  searchValues?: CommonSearchValues
  sideFilterValues?: ESearchNewsCondDto
  isNewItem?: boolean
}

export interface AdjustMonitoringItemToSearchValuesParams {
  item?: NewsSrchDto
  isNewItem?: boolean
}

export interface NewsTagParams {
  page?: number
  size?: number
  sort?: string[]
  keyword?: string
}

export interface MonitoringNewsSearchResultParams {
  page?: number
  size?: number
  sort?: string[]
  filter?: string
  searchValues?: CommonSearchValues
  sideFilterValues?: ESearchContDto
  sideFilterItems?: MbSearchFilterItem[]
  isNewItem?: boolean
}

export interface MbClipbookManagementItem {
  id: string
  name: string
  checked: boolean
  editDisabled: boolean
  isMyItem: boolean
}

export interface MbClipbookSimpleListItem {
  id: string
  name: string
  checked: boolean
  editDisabled: boolean
  isMyItem: boolean
}

export interface AdjustedNewsSearchResultListParams<T> {
  data: T[]
  checkedItemIds?: number[]
  emphasisWords?: string[]
}
