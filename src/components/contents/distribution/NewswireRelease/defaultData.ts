import type { TabItem } from '~/components/common/ui/Tabs'
import { USER_PREVILLEGE_CODE } from '~/constants/common/user'
import type { SelectListOptionItem } from '~/types/common'

export const defaultSteps = [
  {
    id: 'content',
    title: '내용',
  },
  {
    id: 'setting',
    title: '설정',
  },
  {
    id: 'confirm',
    title: '확인',
  },
]

export const defaultPublishComTypeList = [
  {
    id: 'my',
    name: '내 회사',
  },
  {
    id: 'other',
    name: '다른 회사',
  },
]

export const defaultPublishLanguageList = [
  { id: 'ko', name: '한국어' },
  { id: 'en', name: '영어' },
  { id: 'jp', name: '일본어' },
  { id: 'zh', name: '중국어' },
]

export const defaultPublishTypeList = [
  {
    id: 'now',
    name: '즉시',
  },
  {
    id: 'reserved',
    name: '예약',
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

export const defaultRegion = { id: 'KOR', name: '대한민국' }

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

export const stateCodeList = {
  '': '전체',
  FIN: '완료',
  RES: '예약',
}
