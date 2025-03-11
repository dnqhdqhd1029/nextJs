/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react'

import { USER_PREVILLEGE_CODE } from '~/constants/common/user'
import { TagSearchListType } from '~/types/contents/Common'

export interface PageableDataDto<T> {
  totalPages?: number
  totalElements?: number
  size?: number
  content: T[]
  number?: number
  sort?: {
    empty?: boolean
    sorted?: boolean
    unsorted?: boolean
  }
  first?: boolean
  last?: boolean
  pageable?: {
    offset?: number
    pageNumber?: number
    pageSize?: number
    paged?: boolean
    sort?: {
      empty?: boolean
      sorted?: boolean
      unsorted?: boolean
    }
    unpaged?: boolean
  }
  numberOfElements?: number
  empty?: boolean
}

export type UserPrevillege = keyof typeof USER_PREVILLEGE_CODE

export interface AutoCompleteProps<T> {
  tagSearchList: TagSearchListType[]
  setTagSearchList: Dispatch<SetStateAction<TagSearchListType[]>>
  afterLoadComplete?: (data: T[], countArrayName: number, setCountArrayFunc?: Dispatch<SetStateAction<number>>) => void
}
