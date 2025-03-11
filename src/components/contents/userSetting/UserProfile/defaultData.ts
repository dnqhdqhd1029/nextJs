import type { SelectListOptionItem } from '~/types/common'
import { TableHeader, TableProps } from '~/types/contents/Common'

export const newsLetterList: SelectListOptionItem[] = [
  {
    id: 'yes',
    name: '수신',
  },
  {
    id: 'no',
    name: '수신 거부',
  },
]

export const defaultSortOptionsByData: SelectListOptionItem[] = [
  {
    id: 'name',
    name: '이름',
  },
  {
    id: 'regisAt',
    name: '등록일',
  },
]

export const authorityOptions: SelectListOptionItem[] = [
  {
    id: '',
    name: '전체',
  },
  {
    id: 'ADMIN',
    name: '관리자',
  },
  {
    id: 'USER',
    name: '사용자',
  },
  {
    id: 'ACTIVE',
    name: '활성',
  },
  {
    id: 'INACTIVE',
    name: '비활성',
  },
  {
    id: 'UNCERTIFIED',
    name: '미인증',
  },
  {
    id: 'LOCKED',
    name: '잠김',
  },
]

export const defaultTableHeaderData: TableHeader[] = [
  {
    id: 'name',
    title: '이름',
    width: '15%',
  },
  {
    id: 'displayName',
    title: '표시이름',
  },

  {
    id: 'email',
    title: '이메일',
    width: '20%',
  },
  {
    id: 'role',
    title: '권한',
    width: '10%',
  },
  {
    id: 'status',
    title: '상태',
    width: '10%',
  },
  {
    id: 'regisAt',
    title: '등록일',
    width: '20%',
  },
  {
    id: 'manage',
    title: '관리',
    width: '80px',
  },
]
