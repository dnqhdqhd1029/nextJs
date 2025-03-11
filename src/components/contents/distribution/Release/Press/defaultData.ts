import type { TabItem } from '~/components/common/ui/Tabs'
import { USER_PREVILLEGE_CODE } from '~/constants/common/user'
import type { SelectListOptionItem } from '~/types/common'

export const defaultSteps = [
  {
    id: 'setting',
    title: '설정',
  },
  {
    id: 'template',
    title: '템플릿',
  },
  {
    id: 'content',
    title: '내용',
  },
  {
    id: 'confitm',
    title: '확인',
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

export const defaultMediaListTab: TabItem[] = [
  { title: '이미지', id: 'IMG' },
  { title: '파일', id: 'FILE' },
]

export const defaultTemplateTabs = [
  { name: '샘플', id: 'sample' },
  { name: '저장', id: 'register' },
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
