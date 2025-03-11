import { ChangeEvent, ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'

// LayoutKeys의 타입을 바탕으로 한 페이지 타입 정의
export type PageType<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: LayoutKeys
  PublishingLayout?: LayoutKeys
}

// Layouts.ts 에서 export 한 Layouts 객체의 key 값들을 LayoutKeys 타입으로 정의
export type LayoutKeys =
  | 'LAYOUT1'
  | 'LAYOUT2'
  | 'LAYOUT3'
  | 'LAYOUT4'
  | 'LAYOUT5'
  | 'LAYOUT6'
  | 'LOGOONLY'
  | 'GUIDE'
  | 'BLANK'
  | 'SSR'
  | 'EMPTY'
  | 'LICENSE_EXPIRED'
  | 'PAYMENT'

export interface PostPositionPattern {
  pattern: string
  replaces: string[]
}

export interface NavigationLinkItem {
  id: string
  link?: string
  pathLink?: string
  title?: string
  isAdmin?: boolean
  subMenus?: NavigationLinkItem[]
}

export type Size = 'm' | 'l' | 's' | 'es' | 'navbar' | 's16' | 's24' | 's32' | 's48' | 's50' | 's100'

export type Cate =
  | 'default'
  | 'default-ico-only'
  | 'default-ico-text'
  | 'check-number'
  | 'gray'
  | 'ico-only'
  | 'link-ico'
  | 'link-ico-text'
  | 'link-ico-text-sns'
  | 'link-text'
  | 'link-text-arrow'

export type Color =
  | 'primary'
  | 'outline-primary'
  | 'invisible-primary'
  | 'secondary'
  | 'outline-secondary'
  | 'invisible-secondary'
  | 'tertiary'
  | 'outline-tertiary'
  | 'invisible-tertiary'
  | 'link'
  | 'link-dark'
  | 'success'
  | 'outline-success'
  | 'danger'
  | 'outline-danger'
  | 'light'
  | 'dark'
  | 'outline-dark'
  | 'outline-form'
  | 'gray'
  | 'body-text'
  | 'body-selected'
  | 'body-link'
  | 'alert'
  | 'white'
  | 'gray-400'
  | 'gray-450'
  | 'gray-500'
  | 'gray-600'
  | 'gray-700'
  | 'gray-800'
  | 'transparent'
  | 'blue-700'
  | 'alert-info-text'

/** useRef에 사용하는 setTimeout, setInterval용 interface */
export interface TimeoutRef {
  current: NodeJS.Timeout | null
}

export interface StepItem {
  id: string
  title: string
}

export interface ApexChartsOptionsProps {
  options: ApexCharts.ApexOptions
}

export type FileSizeUnit = 'kb' | 'mb' | 'KB' | 'MB'

export interface ValueType {
  value: string
}

export interface LoginResult {
  userId: string
  accessToken: string
  landingPage: string | null
  selectedGroupId: number | null
}

export interface RefreshTokenResult {
  accessToken: string
}

export interface TokenInfo {
  userId: string
  memberId: number
  sub: string
  iat: number
  exp: number
}

export interface InputBtnProps {
  /** Input name prop */
  name?: string

  /** Input id prop */
  id: string

  /** Input type prop */
  type?: 'radio' | 'checkbox'

  /** Input title prop */
  title?: string

  /** Input required prop */
  required?: boolean

  /** Input tooltip prop */
  tooltip?: boolean

  /** Input label prop */
  label?: string

  /** Input label class prop */
  labelClass?: string

  /** label node */
  isLabelNode?: boolean

  /** Input checked prop */
  checked?: boolean

  /** Input default check */
  defaultChecked?: boolean

  /** Input readOnly prop */
  readOnly?: boolean

  /** Input disabled prop */
  disabled?: boolean

  /** Count 표시 */
  count?: number | string

  /** Sub label 표시 */
  subLabel?: string | number

  /** Message */
  msg?: string

  /** Success status */
  succeeded?: boolean

  /** Failed */
  failed?: boolean

  /** Tooltip ReactNode */
  children?: ReactNode

  /** 설명 */
  desc?: string

  /** 기록 */
  history?: string

  /** reverse type */
  reverse?: boolean

  isOwnerIcon?: boolean

  checkDataLimit?: number

  checkDataLength?: number

  checkDataMinAmount?: number

  checkDataLimitDisable?: string

  iptCheckboxIcoPerson?: boolean

  /** 강조할 문자 */
  highlightedString?: string

  /** Change event hook */
  changeEventHook?: (e: ChangeEvent<HTMLInputElement>) => Promise<boolean>

  /**
   * Onchange event
   * @param {ChangeEvent<HTMLInputElement>} e change event
   * @returns
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void

  onClickEvent?: () => void
}

export interface InputBtnListProps extends Omit<InputBtnProps, 'id' | 'children'> {
  /** Group item children */
  children: ReactElement<InputBtnProps> | ReactElement<InputBtnProps>[]

  /** Tooltip용 children */
  tooltipChildren?: ReactNode
}

export interface PaginationInfo {
  /**
   * 보이는 페이지 수
   */
  viewCount: number

  /**
   * 현재 페이지
   */
  currentPage: number

  /**
   * 클릭된 페이지
   */
  clickedPage: number

  /**
   * 전체 페이지 수
   */
  totalPage: number

  /**
   * prev 버튼 활성화 여부
   */
  isPrevDisabled: boolean

  /**
   * next 버튼 활성화 여부
   */
  isNextDisabled: boolean

  /**
   * 보이는 페이지 목록
   */
  pages: number[]
}

export interface SelectListOptionItem {
  /** option id */
  id: string

  /** option 이름 */
  name: string

  /** option extra */
  extra?: string
}

export interface SortFilterOptionItem {
  id: string
  name: string
  disabled?: boolean
}

export interface MessagePopupButton {
  id: string
  label: string
  cate?: Cate
  color?: Color
}
