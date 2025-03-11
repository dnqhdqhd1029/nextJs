import { SelectListOptionItem } from '~/types/common'

export const defaultDayMap = {
  monday: '월',
  tuesday: '화',
  wednesday: '수',
  thursday: '목',
  friday: '금',
  saturday: '토',
  sunday: '일',
}

export const defaultNewsAlertsButtonList: SelectListOptionItem[] = [
  {
    id: 'edit',
    name: '수정하기',
  },
  {
    id: 'delete',
    name: '삭제하기',
  },
]

export const defaultSortOptionsByData: SelectListOptionItem[] = [
  {
    id: 'regisAt',
    name: '설정일',
  },
  {
    id: 'newsSrchName',
    name: '모니터링 이름',
  },
]
