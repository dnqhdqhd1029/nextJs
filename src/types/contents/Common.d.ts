import { ChangeEvent, CSSProperties, Dispatch, MouseEvent, ReactNode, SetStateAction } from 'react'

import { type ESearchContDto, ESearchJournalistDocumentDto, PressMediaSearchFilter } from '~/types/contents/PressMedia'

export type MbSearchTagFunctionTypes =
  | 'inputSearch' // 검색어 입력 input, checkbox가 포함된 검색 결과 리스트, tag 표시
  | 'inputOnly' // tag로 표시할 값을 입력할 input, tag 표시
  | 'inputSearchPopup' // 검색어 입력 input, checkbox가 포함된 검색 결과 리스트, 모든 결과를 표시할 Popup 띄우는 버튼, tag 표시
  | 'buttonSelect' // 목록 리스트를 보여주는 버튼, checkbox가 포함된 결과 검색 결과 리스트, tag 표시
  | 'buttonSelectList' // 목록 리스트를 보여주는 버튼, select 타입의 1개만 선택할 수 있는 결과 리스트, tag 표시
  | 'buttonSelectSearch' // 목록 리스트를 보여주는 버튼, 결과 목록을 검색할 수 있는 input, checkbox가 포함된 검색 결과 리스트, tag 표시
  | 'buttonSelectPopup' // 목록 리스트를 보여주는 버튼, checkbox가 포함된 검색 결과 리스트, 모든 결과를 표시할 Popup 띄우는 버튼, tag 표시
  | 'inputTagAdd' // tag로 표시할 값을 입력할 input, tag 추가 버튼, tag 표시

export interface MbTagSearchExpandedItemObject {
  title: string
  items: MbTagSearchExpandedTagItem[]
}

export interface MbTagSearchExpandedTagItem {
  id: string
  label: string
  subLabel?: number | string | undefined
  checked: boolean
}

export interface MbTagSearchTagItem {
  /** MbTagSearchResultItem과 매치할 고유 ID */
  id: string

  /** 태그 이름 */
  label: string

  /** label을 ReactNode로 표시했을 경우 real label */
  realLabel?: string

  className?: string

  deleteDisabled?: boolean

  type?: string

  /** 추가 정보 */
  subData?: any

  isDefault?: boolean
}

export interface MbTagSearchResultItem {
  /** MbTagSearchTagItem과 매치할 고유 ID */
  id: string

  /** 아이템 이름 */
  label: string

  /** label을 ReactNode로 표시했을 경우 real label */
  realLabel?: string

  /** 아이템 추가 정보 */
  subLabel?: string | number

  /** 서브 data */
  subData?: any

  /** 체크 상태 여부 */
  checked: boolean

  /** className */
  className?: string

  /** functionType */
  functionType?: string

  /** select 가능 여부 true: 불가 / false: 가능 */
  isDisabled?: boolean
}

export interface TagSearchListType {
  title: string
  tooltipNode?: ReactNode
  key: string
  functionType: MbSearchTagFunctionTypes
  searchListData: MbTagSearchResultItem[]
  storedTagItems?: MbTagSearchTagItem[]
  upperItems?: MbTagSearchExpandedItemObject
  lowerItems?: MbTagSearchExpandedItemObject
  expandedPopupTitle?: string
  defaultDateItemId?: string
  isHidden?: boolean
  hasDateRange?: boolean
  isTagAddButtonInInputSearch?: boolean
  maxTagLimit?: number
  maxTagLimitTitle?: string
}

export interface CommonSearchValues {
  [key: string]: MbTagSearchTagItem[]
}

export interface TagSearchListDataProps {
  storedValues?: CommonSearchValues
  upperItems?: MbTagSearchExpandedItemObject
  lowerItems?: MbTagSearchExpandedItemObject
  expandedPopupTitle?: string
  initialLoading?: boolean
}

interface SimpleSearchListItem {
  imageSrc: string
  id: number
  name: string
  subData: string
}

export interface GnbItem {
  title: string
  subMenus?: GnbItem[]
  id?: string
  link?: string
}

interface SettingItems<T> {
  title: string
  setFunc: (item: T) => void
}

export interface TableHeader {
  title: string
  id: string
  classname?: string
  width?: string
}

export interface TableData {
  thId?: string
  td: JSX.Element | string
}

export type TableRow = TableData[]

export interface TableProps {
  header?: TableHeader[]
  rows?: TableRow[]
}

export interface FilteredTagItem {
  id: string
  label: string
  isDisableToBeDeleted?: boolean
}

export interface FilteredTagList {
  title: string
  id: string
  tags: FilteredTagItem[]
}

export type ReturnValueCalcurateDateRange = Pick<MbSearchFilterItem, 'selectedDateValue' | 'dateRange'>

export interface MbSearchFilterItem {
  id: string
  title: string
  count?: number
  checked?: boolean
  radioType?: boolean
  subItems?: MbSearchFilterItem[]
  checkedItems?: MbSearchFilterItem[]
  isRestricted?: boolean
  selectedItem?: MbSearchFilterItem | null
  checkedCount?: number
  filteredItems?: MbSearchFilterItem[]
  searchTerm?: string
  dateType?: boolean
  dateRange?: {
    startDate: string | null
    endDate: string | null
  }
  filteredFlag?: boolean
  selectedDateValue?: string
  disabled?: boolean
  directDate?: boolean
  dateValue?: string
  overflowProperty?: string
}

export interface TagSearchCreateLayerItem {
  id: string
  name: string
  isChecked?: boolean
  count?: number
}

export interface ContentListItem {
  /** 제목 */
  title: string

  /** 제목 링크 */
  titleLink?: string

  /** 보도 상태 */
  status: string

  /** 저자 */
  author: string

  /** 날짜: 월일 */
  date: string

  /** 날짜: 연도 */
  year: string

  /** icon SVG code */
  icon?: string[]

  /** 해당 연도의 글들 중 첫번째인지의 여부 */
  firstOfYearItem?: boolean
}

export interface LogListItem {
  /** 날짜 */
  date: string

  /** 이름 */
  name: string

  /** 이름 링크 */
  nameLink?: string

  /** 활동 내역 */
  activity: string
}

export interface PeopleListItem {
  /** 고유 id */
  id: string

  /** 언론인 이름 */
  name?: string

  /** 아이템 선택 여부 */
  isSelected?: boolean

  /** 아이템 checked 여부 */
  isChecked?: boolean

  /** 아이템 check input 숨김 */
  disableCheck?: boolean

  /** 언론인 페이지 링크 */
  nameLink?: string

  /** 유저 개인적으로 추가했는지 여부 */
  isAddedPersonally?: boolean

  /** 언론인 사진 주소 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageSrc?: any

  /** 언론인 사진 CSS Styles **/
  imageStyle?: CSSProperties

  /** 미디어 가치 */
  mediaValue?: number

  /** 미디어 가치 숨김 */
  disableMediaValue?: boolean

  /** 주소 */
  location?: string

  /** 소속 미디어 */
  media?: string

  /** 소속 미디어 id */
  mediaId?: number

  hasMediaLink?: boolean

  /** 소속 미디어의 파트 */
  department?: string

  /** 소속 미디어에서의 직무 */
  position?: string

  /** 언론인 관련 태그 */
  partTags?: string[]

  /** 언론이 관련 뉴스 */
  relatedNews?: ContentListItem[]

  /** 관련 뉴스 보이기 여부 */
  isRelatedNewsShow?: boolean

  /** 관련 뉴스 목록 중 보이는 갯수 최대 index */
  relatedNewsMaxIndex?: number

  /** 관련 뉴스 전부 펼치고 닫기 */
  isRelatedNewsLayerAllOpen?: boolean
}

export interface MemoListItem {
  /** 고유 id */
  id: string

  /** 체크 여부 */
  isChecked?: boolean

  /** 선택 여부 */
  isSelected?: boolean

  /** 메모 내용 */
  contents: string

  /** 메모 작성자 */
  author?: string

  /** 메모 타입 */
  activityType?: string

  /** 메모 타입 코드 */
  activityTypeCode?: string

  /** 메모 작성일 */
  date?: string

  /** 메모 작성 시간 */
  time?: string

  /** 업무 상태 */
  status?: string

  /** 댓글 수 */
  commentSize?: number

  /** 수정 일자 */
  updateDate?: string

  /** 생성 일자 */
  createDate?: string
}

export interface PeopleWeakListItem {
  id: string
  name?: string
  imageSrc?: string
  imageStyle?: CSSProperties
  subName?: string
  subNameId?: string
  department?: string
  hasSubNameLink?: boolean
  tags?: string
}

export interface SearchListItemAuthor {
  id: number
  name: string
  journalistInfo?: ESearchJournalistDocumentDto
}

export interface SearchListItem {
  /** 고유 id */
  id: string

  /** 체크 상태 */
  isChecked: boolean

  /** 선택 상태 */
  isSelected?: boolean

  /** 체크 상태 사용여부 */
  isDisabled?: boolean

  /** 제목 */
  title: string

  /** 제목 링크 */
  titleLink?: string | null

  /** 미디어 */
  media?: string

  /** 미디어 id */
  mediaId?: number

  /** 작성자 */
  authors: SearchListItemAuthor[]

  /** 작성일 */
  date: string

  /** 이미지 있음 */
  hasImage?: boolean

  /** 동영상 있음 */
  hasVideo?: boolean

  /** 미디어 가치 */
  mediaValue?: number

  /** 논조 */
  tone?: string

  /** 내용 */
  contents?: string

  /** 검색된 단어 */
  searchWord?: string

  /** 검색된 단어 복수 개 */
  searchWords?: string[]

  /** 유저가 추가했는지 여부 */
  isPersonal?: boolean

  extraInfo?: any
}

export interface MbSideListItem {
  id: string
  title: string
  count?: number
}

export interface ShareItem {
  id: string
  name: string
  shortName?: string
}

export interface SettingOption {
  title: string
  id: string
  isAvaliableToBeDisabled?: boolean
}

export interface SummaryListItem {
  /** 고유 id */
  id: string

  /** 아이템 checked 여부 */
  isChecked?: boolean

  /** 공유설정 수정 금지 */
  disableUpdateShare?: boolean

  /** 삭제 금지 **/
  disableDelete?: boolean

  /** 아이템 이름 */
  name: string

  /** 아이템 이름 링크 */
  nameLink?: string

  /** 소유자 여부 */
  isMyItem?: boolean

  /** 알람 여부 */
  isAlarm?: boolean

  /** 태그 태깅 수(활동) */
  taggingCount?: number

  /** 커버리지 여부 */
  isCoverage?: boolean

  /** 아이템 수 */
  itemCounter?: number

  /** 아이템 단위 */
  itemUnit?: string

  /** 추가 정보 */
  customInfo?: string

  /** 공유대상 그룹 */
  shareTargetCode?: string

  /** 그룹 scope */
  groupScope?: {
    id: 'ALL' | 'HIDDEN' | 'SHOW' | 'FIXED'
    name: string
  }

  /** 카테고리 */
  category?: string

  /** 공유 범위 */
  shareScope?: ShareItem

  /** 공유 범위 목록 */
  shareScopeList?: ShareItem[]

  /** 공유 범위 선택 */
  onShareScopeSelected?: (item: ShareItem) => void

  /** 공유 대상 */
  shareTarget?: ShareItem

  /** 공유 대상 목록 */
  shareTargetList?: ShareItem[]

  /** 공유 대상 선택 **/
  onShareTargetSelected?: (item: ShareItem) => void

  /** 생성 수정 이력 */
  logHistory?: {
    /** 이력 내용 */
    comment: string

    /** 날짜 */
    date: string
  }

  /** 설정 옵션 */
  settingOptions?: SettingOption[]

  /** checkbox 클릭 event */
  onCheck?: (e: ChangeEvent<HTMLInputElement>, item: SummaryListItem) => void

  /** 설정 옵션 클릭 이벤트 */
  onSettingOptionClick?: (e: MouseEvent<HTMLButtonElement>, item: SummaryListItem, option: SettingOption) => void

  /** additional data */
  [key: string]: unknown
}

export interface TextListItem {
  /** 아이템 id */
  id: string

  /** 컨텐츠 text */
  contents: string

  /** 작성자 */
  author: string

  /** 작성자 링크 */
  authorLink?: string

  /** 작성일 */
  date: string
}

export interface ItemInterfaceWidthIsSelected {
  isSelected?: boolean
  id: string
}

export interface ResultListProps<T extends ItemInterfaceWidthIsSelected> {
  resultList: T[]
  routerQueryNames: string[]
  specificCondition?: boolean
  selectedIdDispatch: Dispatch<SetStateAction<number | undefined>>
  queryName?: string
}

export interface AsideFilterParams {
  tabName: string
  base: MbSearchFilterItem[]
  filters: PressMediaSearchFilter
  searchValues?: ESearchContDto
  resultSize?: number
}

export interface SortedNewsItem {
  id: number
  title: string
  linkUrl: string
  date: string
  mediaName: string
  mediaId: number
  authors: SearchListItemAuthor[]
  tone: string
  mediaValue: number
  subtype: string
}

export interface SortedNewsGroup {
  id: string
  name: string
  items: SortedNewsItem[]
}
