import type { SelectListOptionItem } from '~/types/common'

export const extendedShareScopeList: SelectListOptionItem[] = [
  {
    id: '',
    name: '선택',
  },
  {
    id: 'email',
    name: '이메일 추가',
  },
  {
    id: 'news',
    name: '뉴스와이어 배포 추가',
  },
  {
    id: 'user',
    name: '사용자 수 추가',
  },
]

export const serviceNotice: { id: string; name: string; required: boolean }[] = [
  {
    id: 'essential',
    name: '(필수) 이용 약관에 동의',
    required: true,
  },
  {
    id: 'personal',
    name: '(필수) 개인정보 수집 및 이용에 동의',
    required: true,
  },
  {
    id: 'thirdService',
    name: '(필수) 개인정보 제3자 제공/위탁 동의',
    required: true,
  },
  {
    id: 'update',
    name: '[선택] 입력한 정보를 회원 정보에 업데이트하는데 동의',
    required: false,
  },
]
