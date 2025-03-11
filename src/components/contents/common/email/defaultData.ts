import type { TabItem } from '~/components/common/ui/Tabs'
import { USER_PREVILLEGE_CODE } from '~/constants/common/user'
import type { SelectListOptionItem } from '~/types/common'

export const defaultSendEmailTemplateTypeList = [
  {
    id: 'no',
    title: '사용안함',
  },
  {
    id: 'use',
    title: '사용',
  },
]
export const defaultSendEmailTypeList = [
  {
    id: 'now',
    title: '즉시',
  },
  {
    id: 'reserved',
    title: '예약',
  },
]
export const extendedShareScopeList: SelectListOptionItem[] = [
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
export const settingReceiverList: TabItem[] = [
  { title: '언론인 리스트', id: 'pressList' },
  { title: '매체 리스트', id: 'mediaList' },
  { title: '언론인', id: 'press' },
  { title: '매체명', id: 'media' },
]
