import { USER_PREVILLEGE_CODE } from '~/constants/common/user'
import { SelectListOptionItem } from '~/types/common'

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
export const defaultSortOptionsByData: SelectListOptionItem[] = [
  {
    id: 'updateAt',
    name: '수정일',
  },
  {
    id: 'regisAt',
    name: '생성일',
  },
  {
    id: 'title',
    name: '목록명',
  },
]

export const DefaultShareFilterOptionList: SelectListOptionItem[] = [
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

export const defaultBasicSavedSetting: SelectListOptionItem[] = [
  {
    id: 'DETAIL',
    name: '상세 정보',
  },
  {
    id: 'COPY',
    name: '복사하기',
  },
  {
    id: 'SHARE',
    name: '공유하기',
  },
]

export const defaultSavedSetting: SelectListOptionItem[] = [
  {
    id: 'DETAIL',
    name: '상세 정보',
  },
  {
    id: 'UPDATE',
    name: '수정하기',
  },
  {
    id: 'DELETE',
    name: '삭제하기',
  },
  {
    id: 'COPY',
    name: '복사하기',
  },
  {
    id: 'SHARE',
    name: '공유하기',
  },
  {
    id: 'ACTIVITY',
    name: '활동 추가',
  },
]
