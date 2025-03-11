import type { MbSearchFilterItem } from '~/types/contents/Common'
import { UseGetActionListParams } from '~/utils/api/action/useGetActionList'

export interface GetActionListParams {
  page?: number
  size?: number
  sort?: string[]
  filter?: string
  filterItems?: MbSearchFilterItem[]
  searchValues?: UseGetActionListParams
  filterSearchValues?: UseGetActionListParams
  isNewItem?: boolean
  selectId?: number
}

export interface NewsTagParams {
  page?: number
  size?: number
  sort?: string[]
  keyword?: string
}
