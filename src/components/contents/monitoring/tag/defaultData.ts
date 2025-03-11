import { SelectListOptionItem } from '~/types/common'

export const defaultTagSortOptionsByData: SelectListOptionItem[] = [
  {
    id: 'updateAt',
    name: '수정일',
  },
  {
    id: 'regisAt',
    name: '생성일',
  },
  {
    id: 'name',
    name: '태그명',
  },
  {
    id: 'count',
    name: '활동수',
  },
]

export const defaultTagSettingList: SelectListOptionItem[] = [
  {
    id: 'edit',
    name: '태그 수정',
  },
  {
    id: 'delete',
    name: '삭제하기',
  },
]
