export const USER_STATE_CODE = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  UNCERTIFIED: 'UNCERTIFIED',
  LOCKED: 'LOCKED',
}

export const USER_ROLE_CODE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
}

export const USER_PREVILLEGE_CODE = {
  WRITABLE: {
    id: 'WRITABLE',
    name: '수정 (동료가 볼 수 있고 추가, 수정, 삭제 가능)',
    shortName: '수정',
  },
  READABLE: {
    id: 'READABLE',
    name: '공개 (동료가 볼 수 있으나 수정은 할 수 없음)',
    shortName: '공개',
  },
  PRIVATE: {
    id: 'PRIVATE',
    name: '비공개 (소유자만 보고 수정할 수 있음)',
    shortName: '비공개',
  },
}
