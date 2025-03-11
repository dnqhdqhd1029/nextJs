import {
  ElasticSearchReturnDtoJournalistDocumentDto,
  ElasticSearchReturnDtoMediaDocumentDto,
  ESearchJournalistCondDto,
  ESearchMediaCondDto,
  JournalistDocumentDto,
  JournalistSrchDto,
  MediaDocumentDto,
  MediaSrchDto,
  NameCountDto,
} from '~/types/api/service'
import { OwnerRegisUpdateUser, UserPrevillege } from '~/types/common/Api'
import type { MbSearchFilterItem } from '~/types/contents/Common'
import type { CommonSearchValues } from '~/types/contents/Common'
import type {
  ESearchContDto,
  ESearchJournalistDocumentDto,
  ESearchMediaDocumentDto,
  JournalistMediaCustomSearchItem,
  JournalistMediaGroupItem,
  PressMediaCustomSearchListItem,
} from '~/types/contents/PressMedia'

export type ESearchContDto = ESearchMediaCondDto & ESearchJournalistCondDto

export type JournalistMediaCustomSearchItem = JournalistSrchDto & MediaSrchDto

export interface JournalistMediaGroupItem {
  jrnlstListId?: number
  mediaListId?: number
  title: string
  groupId: number
  projectId: number | null
  shareCode: UserPrevillege
  journalist?: number[]
  media?: number[]
  journalistCount?: number
  mediaCount?: number
  owner: OwnerRegisUpdateUser
  register: OwnerRegisUpdateUser
  updater: OwnerRegisUpdateUser
  updateAt: string
  regisAt: string
}

// Elastic Search "media" key의 세부 필드
export interface ESearchDocumentMediaItemDto {
  id?: string
  name?: string
  type?: string
  type_code?: string
  subtype?: string
  subtype_code?: string
  stat?: string
  edit?: string
  pub_cycle?: string
  pub_cycle_code?: string
  price?: string
  portals?: string[]
  coverage?: {
    field?: string[]
    categ?: string[]
  }
  location?: {
    country_code?: string
    country?: string
    country_eng?: string
    address?: string
  }
}

// Elastic Search Email
export interface ESearchDocumentEmailItemDto {
  beemail?: string
  nested?: {
    email?: string
    id?: string
    mid?: string
  }[]
  shared?: {
    healthy?: string[]
  }
  tag?: string[]
}

// Elastic Search Website
export interface ESearchDocumentWebsiteItemDto {
  url?: string
  http_code?: string
  on_error?: boolean
  revive?: boolean
  check_at?: string
}

// Elastic Searchn Contacts
export interface ESearchDocumentContactsItemDto {
  main?: {
    phone?: string[]
    address?: string
    country?: string
    country_code?: string
    fax?: string[]
  }
  department?: {
    title?: string
    email?: string[]
  }[]
  all?: {
    beemail?: string
  }
}

// Elastic Search Coverage
export interface ESearchDocumentCoverageItemDto {
  category?: string[]
  field?: string[]
}

// Elastic Search Messenger
export interface ESearchDocumentMessengerItemDto {
  nested?: {
    id?: string
    provider?: string
  }[]
}

// Elastic Search Social
export interface ESearchDocumentSocialItemDto {
  nested?: {
    channel?: string
    channel_code?: string
    link?: string
  }[]
}

// Elastic Search 언론인 검색결과 아이템
export interface ESearchJournalistDocumentDto extends JournalistDocumentDto {
  media?: {
    main?: ESearchDocumentMediaItemDto
    others: ESearchDocumentMediaItemDto[]
  }
  coverage?: ESearchDocumentCoverageItemDto
  social?: ESearchDocumentSocialItemDto
  website?: ESearchDocumentWebsiteItemDto
  department?: string
  role?: string
  program?: string[]
  landline?: string[]
  landline_shared?: string[]
  mobile?: string[]
  fax?: string[]
  email?: ESearchDocumentEmailItemDto
  messenger?: ESearchDocumentMessengerItemDto
}

// Elsatic Search 미디어 검색결과 아이템
export interface ESearchMediaDocumentDto extends MediaDocumentDto {
  coverage?: ESearchDocumentCoverageItemDto
  contacts?: ESearchDocumentContactsItemDto
  portals?: string[]
  values?: {
    abc?: string
    combined?: string
  }
  fax?: string[]
  website?: ESearchDocumentWebsiteItemDto
  email?: ESearchDocumentEmailItemDto
}

export interface PressMediaSearchResultItem {
  mediaId?: number
  subcategory?: string
  count?: number
  address?: string
  awards?: string
  career?: string
  countMedia?: number
  department?: string
  education?: string
  email?: string
  emailError?: boolean
  fax?: string
  fieldsByUser?: string
  isSharedMail?: boolean
  journalistId?: number
  landline?: string
  mediaName?: string
  mobile?: string
  mobileOpen?: boolean
  name?: string
  occupationCode?: string
  photo?: string
  position?: string
  profileOpen?: boolean
  programs?: string
  receivePr?: boolean
  regisAt?: string
  socialDtos?: string[]
  updateAt?: string
  visible?: boolean
  writings?: string
  flagEmail?: boolean
}

export type PressMediaCustomSearchListItem = MediaSrchDto & JournalistSrchDto

export type PressMediaSearchFilter = Omit<
  ElasticSearchReturnDtoJournalistDocumentDto & ElasticSearchReturnDtoMediaDocumentDto,
  'totalElements',
  'name'
>

export interface SearchLocationParams {
  name: string
  category?: string
  groupId?: number
}

export interface SearchSubFieldParams {
  name: string
  category?: string
  groupId?: number
}

export interface PressMediaSearchParams extends Omit<ESearchMediaCondDto, 'page' | 'size'> {
  tab?: string
  page?: number
  size?: number
  mediaQuery?: string
  pressQuery?: string
  timeStamp?: string
  filter?: string
  isFilterChanged?: boolean
  selectedItemId?: string
  customSearchMode?: string
  customListId?: number
  fromProfilePage?: boolean
  mediaId?: number
  journalistId?: number
  pressListTab?: string
  pressListPage?: number
  recordTab?: string
  recordPage?: number
  newsPage?: number
  filterActivated?: boolean
}

export interface SubFieldType {
  name: string
  subData: NameCountDto[]
}

export interface PressMediaListIds {
  jrnlstListId?: number
  mediaListId?: number
}

export interface SideListItem {
  id: string
  title: string
  count?: number
}

export interface MbPressMediaCustomSearchListSelectListItem {
  title: string
  items: JournalistMediaCustomSearchItem[]
  type: string
}

export interface AdjustCustomSearchItemToSearchValuesParams {
  item?: PressMediaCustomSearchListItem
  isNewItem?: boolean
  tab?: string
  searchParams?: PressMediaCustomSearchResultParams
}

export interface PressMediaCustomSearchResultParams {
  page?: number
  size?: number
  sort?: string[]
  filter?: string
  tab?: string
  searchValues?: CommonSearchValues
  sideFilterValues?: ESearchContDto
  sideFilterItems?: MbSearchFilterItem[]
  isNewItem?: boolean
}

export interface CustomSearchManagementParams {
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

export interface MbPressMediaGroupListSelectListItem {
  title: string
  items: JournalistMediaGroupItem[]
  type: string
}

export interface AdjustPressMediaGroupListItemToSearchValuesParams {
  item?: JournalistMediaGroupItem
  isNewItem?: boolean
  tab?: string
}

export interface PressMediaListResultParams {
  page?: number
  size?: number
  sort?: string[]
  filter?: string
  tab?: string
  searchValues?: CommonSearchValues
  sideFilterValues?: ESearchContDto
  sideFilterItems?: MbSearchFilterItem[]
  isNewItem?: boolean
}

export interface PressMediaListParams {
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

interface SearchExtraUtilContentProps {
  isPageLoadCompleted: boolean
  enabledFunctions: string[]
}

export interface NotiNodeParams {
  targetId?: number
  targetName?: string
  targetTags?: string
}

export interface MediaInformationProps {
  mediaId?: number
  hasBackButton?: boolean
  onRemoveInfo?: () => void
  hasTab?: boolean
  hasSeeMore?: boolean
  hasMoreList?: boolean
  isPersonal?: boolean
  isPersonalDataForProfilePage?: boolean
  hasTitleLink?: boolean
  reloadList?: string
  isPageLoadCompleted?: boolean
  onGroupListChanged?: () => void
  onSetPersonalData?: (flag: boolean) => void
  isProfilePage?: boolean
  onProfileDeleted?: () => void
  onGoToProfile?: (id: number) => void
  onMediaDataLoaded?: (mediaData: ESearchMediaDocumentDto) => void
  onLoadFailed?: () => void
}

export type ReturnTypeOfDecodedData = string | false

interface PressNotiNodeParams {
  targetId?: number
  mediaId?: number
  targetName?: string
  targetPositionInfo?: string
}

export interface RecordItem {
  type: string
  title?: string
  writer?: string
  icon?: string[]
  date?: number
}

export interface StepFileTagItem {
  id: string
  name: string
}

export interface SocialMediaItem {
  id: string
  statusId: string
  statusLabel: string
  content: string
}

export interface StatusItem {
  id: string
  label: string
}

export interface RegisterExcelItem {
  id: string
  name?: string
  mediaName: string
  email?: string
  department?: string
  position?: string
  landline?: string
  mobile?: string
  fields?: string
  address?: string
  wsite?: string
  fax?: string
}

export interface PressMediaSearchResultParams {
  page?: number
  size?: number
  sort?: string[]
  filter?: string
  tab?: string
  searchValues?: CommonSearchValues
  sideFilterValues?: ESearchContDto
  sideFilterItems?: MbSearchFilterItem[]
}

export interface PressMediaProfileQuery {
  contacts_id?: string
  media_id?: string
  source_type?: string
}

export interface MbListManagementItem {
  id: string
  name: string
  checked: boolean
  editDisabled: boolean
  isMyItem: boolean
}

export interface AdjustedPressMediaSearchResultListParams<T> {
  data: T[]
  isFromProfile?: boolean
  checkedItemIds?: number[]
  temporaryCheckedItemIds?: number[]
  newsSearch?: boolean
}
