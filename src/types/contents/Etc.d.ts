import { Layout } from 'react-grid-layout'

import { SelectListOptionItem } from '~/types/common'
import { dashboardContentType } from '~/utils/hooks/contents/dashboard/useDashboard'

export interface UserListUrlParameters {
  page?: number
  size?: number
  role?: string
  sort?: string[]
  keyword?: string
  stateCode?: string
}

export interface GridItemOption {
  title?: string
  keywordId?: string
  data?: dashboardContentType
  count?: number
  tableLength?: SelectListOptionItem
  monitoringTarget?: SelectListOptionItem
  monitoringType?: SelectListOptionItem
  chartType?: SelectListOptionItem
  maxCount?: number
  seeMoreCount?: number
  totalCount?: number
  conditions?: string
}

export interface GridItem extends Layout {
  option?: GridItemOption
}

export interface Layouts {
  [key: string]: GridItem[]
}

export interface GridState {
  breakpoints: string
  layouts: Layouts
}
