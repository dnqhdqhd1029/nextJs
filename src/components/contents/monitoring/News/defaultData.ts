import { USER_PREVILLEGE_CODE } from '~/constants/common/user'
import { SelectListOptionItem } from '~/types/common'

export const defaultEditOptionsByData: SelectListOptionItem[] = [
  {
    id: 'share',
    name: '공유하기',
  },
  {
    id: 'find',
    name: '유사 뉴스 찾기',
  },
  {
    id: 'copy',
    name: '뉴스 원본 URL 복사',
  },
  {
    id: 'report',
    name: '잘못 수집된 뉴스 신고',
  },
]

export const defaultNonUrlUserNewsEditOptionsByData: SelectListOptionItem[] = [
  {
    id: 'eidt',
    name: '수정하기',
  },
  {
    id: 'delete',
    name: '삭제하기',
  },
  {
    id: 'share',
    name: '공유하기',
  },
  {
    id: 'find',
    name: '유사 뉴스 찾기',
  },
]

export const defaultUserNewsEditOptionsByData: SelectListOptionItem[] = [
  {
    id: 'eidt',
    name: '수정하기',
  },
  {
    id: 'delete',
    name: '삭제하기',
  },
  {
    id: 'share',
    name: '공유하기',
  },
  {
    id: 'find',
    name: '유사 뉴스 찾기',
  },
  {
    id: 'copy',
    name: '뉴스 원본 URL 복사',
  },
]

export const extendedCommonCodeTargetList: SelectListOptionItem[] = [
  {
    id: 'TONE',
    name: 'TONE',
  },
  {
    id: 'MEDIA_SUB_TYPE',
    name: 'MEDIA_SUB_TYPE',
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

export const defaultBasicMonitoringSetting: SelectListOptionItem[] = [
  {
    id: 'SHARE',
    name: '공유하기',
  },
]
