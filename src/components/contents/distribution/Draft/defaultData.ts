import { USER_PREVILLEGE_CODE } from '~/constants/common/user'
import { SelectListOptionItem } from '~/types/common'

export const draftTab = [
  {
    id: 'PRESS_RELEASE',
    value: '/press-release',
    title: '보도자료',
  },
  {
    id: 'MAILING',
    value: '/mailing',
    title: '이메일',
  },
  {
    id: 'NEWSWIRE',
    value: '/newswire',
    title: '뉴스와이어',
  },
]

export const draftCategoryList = [
  {
    id: 'ALL',
    title: '전체',
  },
  {
    id: 'PRESS_RELEASE',
    title: '보도자료',
  },
  {
    id: 'MAILING',
    title: '이메일',
  },
  {
    id: 'NEWSWIRE_RELEASE',
    title: '뉴스와이어',
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

export const extendedShareScopeList: SelectListOptionItem[] = [
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
