import { USER_PREVILLEGE_CODE } from '~/constants/common/user'
import {
  mediaSearchOptionProps,
  pressSearchOptionProps,
} from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import { SelectListOptionItem } from '~/types/common'

export const defaultPressSearchOption: pressSearchOptionProps = {
  keywordParam: {
    journalistTagList: [],
    newsKeyword: [],
    newsKeywordValue: '',
    field: [],
    area: [],
    mediaTagList: [],
    mediaType: [],
    occupation: [],
    position: [],
    positionValue: '',
    keyword: [],
    keywordValue: '',
    department: [],
    departmentValue: '',
    informationType: { id: '', name: '' },
    publishingPeriod: [],
  },
  additionalParam: {
    mediaTargetList: [],
    mediaField: [],
    mediaArea: [],
    mediaGroupList: [],
    portal: [],
    social: [],
    languageParam: { id: '', name: '' },
    count: { id: '', name: '' },
    system: { id: '', name: '' },
    limit: { id: '', name: '' },
  },
}

export const defaultMediaSearchOption: mediaSearchOptionProps = {
  keywordParam: {
    mediaTagList: [],
    mediaType: [],
    mediaField: [],
    mediaArea: [],
    keyword: [],
    keywordValue: '',
    mediaGroupList: [],
    informationType: { id: '', name: '' },
    publishingPeriod: [],
  },
  additionalParam: {
    journalistTargetList: [],
    portal: [],
    languageParam: { id: '', name: '' },
    isJournalist: { id: '', name: '' },
    system: { id: '', name: '' },
    limit: { id: '', name: '' },
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
    name: '검색명',
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

export const defaultBasicSavedSetting: SelectListOptionItem[] = [
  {
    id: 'SHARE',
    name: '공유하기',
  },
]

export const defaultSavedSetting: SelectListOptionItem[] = [
  {
    id: 'UPDATE',
    name: '수정하기',
  },
  {
    id: 'DELETE',
    name: '삭제하기',
  },
  {
    id: 'SHARE',
    name: '공유하기',
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
