import { userPopupProps } from '~/stores/modules/contents/admin/adminUser'
import { NavigationLinkItem, type SelectListOptionItem } from '~/types/common'
import { TableHeader } from '~/types/contents/Common'

export const defaultGroupSortOptionsByData: SelectListOptionItem[] = [
  {
    id: 'regisAt',
    name: '생성일',
  },
  {
    id: 'name',
    name: '그룹명',
  },
  {
    id: 'count',
    name: '인원',
  },
]

export const extendedCommonCodeTargetList: SelectListOptionItem[] = [
  {
    id: 'INQUIRY_WHY_CODE',
    name: 'INQUIRY_WHY_CODE',
  },
  {
    id: 'USER',
    name: 'USER',
  },
]

export const DefaultSettingLinks: NavigationLinkItem[] = [
  {
    id: 'admin-user',
    title: '사용자 관리',
    pathLink: '/admin/user',
  },
  {
    id: 'admin-group',
    title: '그룹 관리',
    pathLink: '/admin/group',
  },
  {
    id: 'admin-company-info',
    title: '회사 관리',
    pathLink: '/admin/company-info',
  },
  {
    id: 'admin-license',
    title: '사용권',
    pathLink: '/admin/license',
  },
]
export const PermissionList: SelectListOptionItem[] = [
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
]

export const adminLinks: NavigationLinkItem[] = [
  {
    id: 'admin-user',
    title: '사용자 관리',
    pathLink: '/admin/user',
    link: `/admin/user`,
  },
  {
    id: 'admin-group',
    title: '그룹 관리',
    pathLink: '/admin/group',
    link: `/admin/group`,
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

export const defaultGroupTableHeaderData: TableHeader[] = [
  {
    id: 'name',
    title: '그룹명',
    width: '12%',
  },
  {
    id: 'count',
    title: '인원',
    width: '10%',
  },
  {
    id: 'users',
    title: '그룹회원',
  },
  {
    id: 'regisName',
    title: '만든이',
    width: '10%',
  },
  {
    id: 'regisAt',
    title: '생성일',
    width: '10%',
  },
  {
    id: 'manage',
    title: '관리',
    width: '120px',
  },
]
export const defaultPermissionList: SelectListOptionItem[] = [
  {
    id: 'ADMIN',
    name: '관리자',
  },
  {
    id: 'USER',
    name: '사용자',
  },
]

export const defaultStatusList: SelectListOptionItem[] = [
  {
    id: 'ACTIVE',
    name: '활성',
  },
  {
    id: 'INACTIVE',
    name: '비활성',
  },
]

export const defaultUserSettingLayerItems: SelectListOptionItem[] = [
  {
    id: 'update',
    name: '회원 정보 수정',
  },
  {
    id: 'password',
    name: '비밀번호 재설정',
  },
  {
    id: 'status',
    name: '회원 상태 변경',
  },
]

export const defaultUserSettingLayerItemsForUncertified: SelectListOptionItem[] = [
  {
    id: 'unauthenticedUserMailing',
    name: '추가 메일 재발송',
  },
  {
    id: 'unauthenticedUserCancel',
    name: '회원 추가 취소',
  },
]

export const defaultGroupSettingLayerItems: SelectListOptionItem[] = [
  {
    id: 'nameChange',
    name: '그룹명 수정',
  },
  {
    id: 'userManagement',
    name: '그룹 회원 관리',
  },
  {
    id: 'delete',
    name: '삭제하기',
  },
]

export const defaulUserPopupData: userPopupProps = {
  isLoading: false,
  isOpen: false,
  type: '',
  keyValue: 0,
  email: '',
  displayName: '',
  phone: '',
  mobile: '',
  mobileErr: '',
  role: '',
  name: '',
  nameErr: '',
  nickName: '',
  permission: '',
  department: '',
  position: '',
  userGroupList: [],
  storedTagItems: [],
  groupErrorMessage: '',
  groups: [],
  password: '',
  passwordErr: '',
  passwordAction: 0,
  userStatus: '',
}
