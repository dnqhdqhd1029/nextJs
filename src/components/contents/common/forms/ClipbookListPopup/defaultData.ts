import { USER_PREVILLEGE_CODE } from '~/constants/common/user'
import { SelectListOptionItem } from '~/types/common'

export const defaultBasicMonitoringSetting: SelectListOptionItem[] = [
  {
    id: 'SHARE',
    name: '공유하기',
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
