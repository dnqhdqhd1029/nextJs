import { NavigationLinkItem, SelectListOptionItem } from '~/types/common'

export const defaultMediaUserBlockData = {
  blockedUserId: 0,
  companyId: 0,
  licenseId: 0,
  blockedAt: '',
  unblockRequestBy: null,
  unblockRequestCnt: 0,
}

export const DefaultPressProfileOption: SelectListOptionItem[] = [
  {
    id: 'share',
    name: '공유하기',
  },
  {
    id: 'eidt',
    name: '수정하기',
  },
  {
    id: 'delete',
    name: '삭제하기',
  },
]

export const PressProfileOption: SelectListOptionItem[] = [
  {
    id: 'share',
    name: '공유하기',
  },
]

export const DefaultMediaRecordOption: SelectListOptionItem[] = [
  {
    id: 'total',
    name: '전체',
  },
  {
    id: 'release',
    name: '보도자료',
  },
  {
    id: 'email',
    name: '이메일',
  },
  {
    id: 'node',
    name: '노트',
  },
  {
    id: 'appoint',
    name: '약속',
  },
  {
    id: 'phone',
    name: '전화',
  },
  {
    id: 'inquiry',
    name: '문의',
  },
]

export const PressActivityOption: SelectListOptionItem[] = [
  {
    id: 'email',
    name: '이메일 보내기',
  },
  {
    id: 'release',
    name: '보도자료 배포',
  },
  {
    id: 'news',
    name: '뉴스 와이어 배포',
  },
  {
    id: 'note',
    name: '노트',
  },
  {
    id: 'appoint',
    name: '약속',
  },
  {
    id: 'phone',
    name: '전화',
  },
  {
    id: 'inquiry',
    name: '문의',
  },
]

export const extendedCommonCodeTargetList: SelectListOptionItem[] = [
  {
    id: 'PUBLISHER_TYPE',
    name: 'PUBLISHER_TYPE',
  },
  {
    id: 'MEDIA_VALUE',
    name: 'MEDIA_VALUE',
  },
  {
    id: 'ACTION_STATE',
    name: 'ACTION_STATE',
  },
  {
    id: 'JRNLST_SOCIAL_FILTER_ID',
    name: 'JRNLST_SOCIAL_FILTER_ID',
  },
  {
    id: 'JOURNALIST_OCCUPATION',
    name: 'JOURNALIST_OCCUPATION',
  },
  {
    id: 'MEDIA_INFO_TYPE',
    name: 'MEDIA_INFO_TYPE',
  },
  {
    id: 'PUB_CYCLE',
    name: 'PUB_CYCLE',
  },
  {
    id: 'PORTAL_CODE',
    name: 'PORTAL_CODE',
  },
  {
    id: 'MEDIA_TYPE',
    name: 'MEDIA_TYPE',
  },
  {
    id: 'ACTION_CATEGORY_ALL',
    name: 'ACTION_CATEGORY_ALL',
  },
  {
    id: 'ACTION_STATE_FILTER',
    name: 'ACTION_STATE_FILTER',
  },
]

export const activityNaviLinks: { id: string; name: string; pathLink: string }[] = [
  {
    id: 'NOTE',
    name: '노트',
    pathLink: '/activity',
  },
  {
    id: 'PROMISE',
    name: '약속',
    pathLink: '/activity',
  },
  {
    id: 'PHONE_CALL',
    name: '전화',
    pathLink: '/activity',
  },
  {
    id: 'INQUIRY',
    name: '문의',
    pathLink: '/activity',
  },
  {
    id: 'MAILING',
    name: '이메일 보내기',
    pathLink: '/email',
  },
  {
    id: 'PRESS_RELEASE',
    name: '보도자료 배포',
    pathLink: '/press-release',
  },
  {
    id: 'NEWSWIRE_RELEASE',
    name: '뉴스와이어 배포',
    pathLink: '/newswire',
  },
]
