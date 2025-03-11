import type { TabItem } from '~/components/common/ui/Tabs'
import ActivityRecord from '~/components/contents/activity/record'
import { subNewsFilterOptionsList } from '~/components/contents/monitoring/SearchResult/defaultData'
import { USER_PREVILLEGE_CODE } from '~/constants/common/user'
import { filterSubParamActionsProps } from '~/stores/modules/contents/activity/searchActivity'
import { NavigationLinkItem, SelectListOptionItem, type SortFilterOptionItem, StepItem } from '~/types/common'
export const tagPopupNaviLinks: TabItem[] = [
  {
    id: 'add',
    title: '추가',
  },
  {
    id: 'delete',
    title: '제외',
  },
  {
    id: 'replace',
    title: '대체(모두 제외 후 추가)',
  },
]

export const extendedCommonCodeTargetList: SelectListOptionItem[] = [
  {
    id: 'ACTION_CATEGORY_ALL',
    name: 'ACTION_CATEGORY_ALL',
  },
  {
    id: 'ACTION_STATE',
    name: 'ACTION_STATE',
  },
  {
    id: 'ACTION_STATE_FILTER',
    name: 'ACTION_STATE_FILTER',
  },
  {
    id: 'ACTION_LOG_WORKTYPE',
    name: 'ACTION_LOG_WORKTYPE',
  },
  {
    id: 'UPDATE_FIELD_NAME',
    name: 'UPDATE_FIELD_NAME',
  },
]
export const activityNaviLinks: NavigationLinkItem[] = [
  {
    id: 'email',
    title: '이메일 보내기',
    pathLink: '/email',
  },
  {
    id: 'press-release',
    title: '보도자료 배포',
    pathLink: '/press-release',
  },
  {
    id: 'newswire',
    title: '뉴스와이어 배포',
    pathLink: '/newswire',
  },
  {
    id: 'note',
    title: '노트',
    pathLink: '/activity',
  },
  {
    id: 'point',
    title: '약속',
    pathLink: '/activity',
  },
  {
    id: 'phone',
    title: '전화',
    pathLink: '/activity',
  },
  {
    id: 'inquiry',
    title: '문의',
    pathLink: '/activity',
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
    name: '제목',
  },
]

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

export const defaultReleaseActivityRecordList: SelectListOptionItem[] = [
  {
    id: 'template',
    name: '템플릿으로 저장',
  },
  {
    id: 'share',
    name: '공유하기',
  },
]

export const defaultReleaseActivityRecordWorkListFull: SelectListOptionItem[] = [
  {
    id: 'cancel',
    name: '예약 취소',
  },
  {
    id: 'edit',
    name: '작업 재개',
  },
  {
    id: 'delete',
    name: '삭제하기',
  },
  {
    id: 'template',
    name: '템플릿으로 저장',
  },
  {
    id: 'share',
    name: '공유하기',
  },
]

export const defaultReleaseActivityRecordWorkListOptions: SelectListOptionItem[] = [
  {
    id: 'delete',
    name: '삭제하기',
  },
  {
    id: 'template',
    name: '템플릿으로 저장',
  },
  {
    id: 'share',
    name: '공유하기',
  },
]
export const defaultReleaseActivityRecordWorkList: SelectListOptionItem[] = [
  {
    id: 'edit',
    name: '작업 재개',
  },
  {
    id: 'delete',
    name: '삭제하기',
  },
  {
    id: 'template',
    name: '템플릿으로 저장',
  },
  {
    id: 'share',
    name: '공유하기',
  },
]

export const defaultNotEditableReleaseActivityRecordWorkList: SelectListOptionItem[] = [
  {
    id: 'delete',
    name: '삭제하기',
  },
  {
    id: 'share',
    name: '공유하기',
  },
]

export const defaultNewswireActivityRecordWorkList: SelectListOptionItem[] = [
  {
    id: 'edit',
    name: '작업 재개',
  },
  {
    id: 'delete',
    name: '삭제하기',
  },
  {
    id: 'share',
    name: '공유하기',
  },
]

export const defaultActivityRecordWorkList: SelectListOptionItem[] = [
  {
    id: 'edit',
    name: '수정하기',
  },
  {
    id: 'delete',
    name: '삭제하기',
  },
  {
    id: 'share',
    name: '공유하기',
  },
]

export const defaultReleaseContentsTabListData: StepItem[] = [
  {
    id: 'content',
    title: '내용',
  },
  {
    id: 'status',
    title: '발송상태',
  },
  {
    id: 'comment',
    title: '댓글',
  },
  {
    id: 'log',
    title: '이력',
  },
]

export const defaultNewsWireContentsTabListData: StepItem[] = [
  {
    id: 'content',
    title: '내용',
  },
  {
    id: 'comment',
    title: '댓글',
  },
  {
    id: 'log',
    title: '이력',
  },
]

export const defaultContentsTabListData: StepItem[] = [
  {
    id: 'content',
    title: '내용',
  },
  {
    id: 'comment',
    title: '댓글',
  },
  {
    id: 'log',
    title: '이력',
  },
]

export const defaultWorkTypeData: StepItem[] = [
  {
    id: 'OWNER',
    title: '소유자',
  },
  {
    id: 'CATEGORY',
    title: '유형',
  },
  {
    id: 'TITLE',
    title: '제목',
  },
  {
    id: 'DATE',
    title: '날짜',
  },
  {
    id: 'CONTENT',
    title: '본문',
  },
  {
    id: 'RELATION',
    title: '연동',
  },
  {
    id: 'PROJECT',
    title: '프로젝트',
  },
  {
    id: 'TAG',
    title: '태그',
  },
  {
    id: 'ATTACHMENT',
    title: '첨부',
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

export const getShareCodeShortNm = (codeNm: string) => {
  switch (codeNm) {
    case USER_PREVILLEGE_CODE.PRIVATE.name:
      return USER_PREVILLEGE_CODE.PRIVATE.shortName
    case USER_PREVILLEGE_CODE.READABLE.name:
      return USER_PREVILLEGE_CODE.READABLE.shortName
    case USER_PREVILLEGE_CODE.WRITABLE.name:
      return USER_PREVILLEGE_CODE.WRITABLE.shortName
    default:
      return ''
  }
}

export const createReceiverInfo = (
  dupCount: number,
  blockReceiveCount: number,
  blockSendCount: number,
  errorSendCount: number
) => {
  const messages = []
  if (dupCount > 0) messages.push(`중복 ${dupCount}명`)
  if (blockReceiveCount > 0) messages.push(`수신거부 ${blockReceiveCount}명`)
  if (blockSendCount > 0) messages.push(`발송차단 ${blockSendCount}명`)
  if (errorSendCount > 0) messages.push(`발송장애 ${errorSendCount}명`)
  return messages.length > 0 ? messages.join(', ') : ''
}

export const settingReceiverList: TabItem[] = [
  { title: '언론인', id: 'press' },
  { title: '매체명', id: 'media' },
  { title: '언론인 리스트', id: 'pressList' },
  { title: '매체 리스트', id: 'mediaList' },
]
export const subActivityFilterOptionsList: filterSubParamActionsProps[] = [
  {
    id: 'category',
    isOpen: true,
    values: [],
  },
  {
    id: 'state',
    isOpen: true,
    subMenu: [],
    values: [],
  },
  {
    id: 'owner',
    isOpen: true,
    values: [],
  },
  // {
  //   id: 'campagn',
  //   isOpen: true,
  //   values: [],
  // },
  {
    id: 'tag',
    isOpen: false,
    values: [],
  },
  {
    id: 'media',
    isOpen: false,
    values: [],
  },
  {
    id: 'date',
    isOpen: false,
    values: [],
  },
]

export const subActivityFilterListList: NavigationLinkItem[] = [
  {
    id: 'category',
    title: '유형',
    subMenus: [],
  },
  {
    id: 'state',
    title: '상태',
    subMenus: [],
  },
  {
    id: 'owner',
    title: '소유자',
    subMenus: [],
  },
  {
    id: 'campagn',
    title: '캠페인',
    subMenus: [],
  },
  {
    id: 'tag',
    title: '태그',
    subMenus: [],
  },
  {
    id: 'media',
    title: '매체명',
    subMenus: [],
  },
  {
    id: 'date',
    title: '기간',
    subMenus: [],
  },
]
