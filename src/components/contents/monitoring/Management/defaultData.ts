import { USER_PREVILLEGE_CODE } from '~/constants/common/user'
import { monitoringPopupProps } from '~/stores/modules/contents/monitoring/management'
import { SelectListOptionItem } from '~/types/common'
export const defaultMonitoringPopupSteps: SelectListOptionItem[] = [
  {
    id: '1',
    name: '검색조건',
  },
  {
    id: '2',
    name: '템플릿',
  },
  {
    id: '3',
    name: '이메일',
  },
  {
    id: '4',
    name: '알림',
  },
]

export const monitoringInitParams = {
  and: '',
  or: '',
  not: '',
  period: { id: '', name: '선택' },
  startPeriod: new Date(),
  endPeriod: new Date(),
  periodTag: [],
  mediaType: [],
  mediaValue: { id: '', name: '선택' },
  mediaTagList: [],
  journalistTagList: [],
  tone: [],
  tag: [],
  url: '',
  publishingPeriod: [],
  mediaBookList: [],
  clipbookValue: [],
  clipbook: { id: '', name: '선택' },
  coverage: { id: '', name: '선택' },
  informationType: { id: '', name: '선택' },
}

export const defaultMonitoringPopup: monitoringPopupProps = {
  isOpen: true,
  type: 'create',
  key: 0,
  step: '1',
  title: '뉴스 맞춤 검색 설정',
  confirmText: '수정',
  name: '',
  nameErr: '',
  category: { id: '', name: '' },
  scrop: { id: '', name: '' },
  target: { id: '', name: '' },
  categoryList: [],
  isDefault: false,
  keyword: {
    and: '',
    or: '',
    not: '',
  },
  extra: {
    mediaType: [],
    mediaLevel: { id: '', name: '' },
    media: [],
    author: [],
    tone: { id: '', name: '' },
    tag: [],
    url: '',
    publishPeriod: { id: '', name: '' },
    mediaList: [],
    clipbook: { id: '', name: '' },
    coverage: { id: '', name: '' },
    system: { id: '', name: '' },
  },
}

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
    name: '이름',
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

export const extendedShareScopeTargetList: SelectListOptionItem[] = [
  {
    id: 'GROUP',
    name: '이 그룹',
  },
  {
    id: 'COMPANY',
    name: '전체 그룹',
  },
]

export const defaultBasicMonitoringSetting: SelectListOptionItem[] = [
  {
    id: 'NOTIFY',
    name: '뉴스 알리미 설정',
  },
  {
    id: 'SHARE',
    name: '공유하기',
  },
]

export const defaultMonitoringSetting: SelectListOptionItem[] = [
  {
    id: 'UPDATE',
    name: '뉴스 맞춤 검색 설정',
  },
  {
    id: 'DELETE',
    name: '삭제하기',
  },
  {
    id: 'NOTIFY',
    name: '뉴스 알리미 설정',
  },
  {
    id: 'SHARE',
    name: '공유하기',
  },
]

export const defaultMonitoringSettingPublic: SelectListOptionItem[] = [
  {
    id: 'UPDATE',
    name: '뉴스 알리미 설정',
  },
  {
    id: 'DELETE',
    name: '뉴스 알리미 삭제',
  },
  {
    id: 'SHARE',
    name: '공유하기',
  },
]

export const defaultNewsSortOptions: SelectListOptionItem[] = [
  {
    id: 'INSERTED',
    name: '게재일',
  },
  {
    id: 'MEDIA_VALUE',
    name: '미디어 가치',
  },
  {
    id: 'SCORE',
    name: '관련성',
  },
  {
    id: 'CHAR_LEN',
    name: '글자수',
  },
]

export const defaultSteps = [
  {
    id: 'setting',
    title: '설정',
  },
  {
    id: 'receive',
    title: '수신',
  },
]

export const defaultNewsAlarmTypeList = [
  {
    id: 'noEndDate',
    name: '계속',
    value: false,
  },
  {
    id: 'hasEndDate',
    name: '종료일 설정',
    value: true,
  },
]

export const defaultDaysList = [
  {
    id: 'isMonday',
    name: '월',
  },
  {
    id: 'isTuesday',
    name: '화',
  },
  {
    id: 'isWednesday',
    name: '수',
  },
  {
    id: 'isThursday',
    name: '목',
  },
  {
    id: 'isFriday',
    name: '금',
  },
  {
    id: 'isSaturday',
    name: '토',
  },
  {
    id: 'isSunday',
    name: '일',
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
