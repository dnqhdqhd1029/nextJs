import { menuNavigationListProps, subMenusProps } from '~/stores/modules/contents/header/header'
import { NavigationLinkItem } from '~/types/common'

export const userMenuLinks: NavigationLinkItem[] = [
  {
    id: 'settingMember',
    title: '회원 정보',
    pathLink: '/setting/member/information',
    link: '/setting/member/information',
  },
  {
    id: 'setting',
    title: '설정',
    pathLink: '/setting',
    link: `/setting/license-info`,
  },
  {
    id: 'logout',
    title: '로그아웃',
    pathLink: '/logout',
    link: `/logout`,
  },
]

export const adminMenuLinks: NavigationLinkItem[] = [
  {
    id: 'settingMember',
    title: '회원 정보',
    pathLink: '/setting/member/information',
    link: '/setting/member/information',
  },
  {
    id: 'setting',
    title: '설정',
    pathLink: '/setting',
    link: `/setting`,
  },
  {
    id: 'admin',
    title: '관리자',
    pathLink: '/admin',
    link: `/admin`,
  },
  {
    id: 'logout',
    title: '로그아웃',
    pathLink: '/logout',
    link: `/logout`,
  },
]

export const TRANSLATION_ITEMS_SUB: subMenusProps[] = [
  {
    id: 'press-media',
    title: '검색',
    link: `/contacts/search`,
  },
  {
    id: 'press-media',
    title: '검색 결과',
    link: `/contacts/search-result`,
  },
  {
    id: 'press-media',
    title: '맞춤 검색',
    link: `/contacts/saved-search`,
  },
  {
    id: 'press-media',
    title: '미디어 리스트',
    link: `/contacts/list`,
  },
  {
    id: 'press-media',
    title: '연락처 추가',
    link: `/contacts/add`,
  },
  {
    id: 'press-media',
    title: '맞춤 검색 관리',
    link: `/contacts/saved-search-manage`,
  },
  {
    id: 'press-media',
    title: '검색',
    link: `/media/search`,
  },
  {
    id: 'press-media',
    title: '검색 결과',
    link: `/media/search-result`,
  },
  {
    id: 'press-media',
    title: '맞춤 검색',
    link: `/media/saved-search`,
  },
  {
    id: 'press-media',
    title: '미디어 리스트',
    link: `/media/list`,
  },
  {
    id: 'press-media',
    title: '연락처 추가',
    link: `/media/add`,
  },
  {
    id: 'press-media',
    title: '맞춤 검색 관리',
    link: `/media/saved-search-manage`,
  },
  {
    id: 'press-media',
    title: '미디어 소식',
    link: '/media-briefing',
  },
  {
    id: 'monitoring',
    title: '뉴스 검색',
    link: '/news/search',
  },
  {
    id: 'monitoring',
    title: '뉴스 검색 결과',
    link: '/news/search-result',
  },
  {
    id: 'monitoring',
    title: '뉴스 맞춤 검색',
    link: '/news/monitoring',
  },
  {
    id: 'monitoring',
    title: '클립북',
    link: `/news/clipbook`,
  },
  {
    id: 'monitoring',
    title: '뉴스 추가',
    link: '/news/add',
  },
  {
    id: 'monitoring',
    title: '맞춤 검색 관리',
    link: `/news/saved-search-manage`,
  },
  {
    id: 'monitoring',
    title: '뉴스 태그',
    link: `/news/tag`,
  },

  {
    id: 'activity',
    title: '활동',
    link: `/activity/search`,
  },
  {
    id: 'activity',
    title: '활동 태그',
    link: '/activity/tag',
  },
  {
    id: 'distribution',
    title: '보도자료',
    link: '/press-release',
  },
  {
    id: 'distribution',
    title: '초안',
    link: '/draft',
  },
  {
    id: 'dashboard',
    title: '대시보드',
    link: '/dashboard',
  },
]

export const TRANSLATION_ITEMS: menuNavigationListProps[] = [
  {
    title: '미디어',
    id: 'press-media',
    subMenus: [
      {
        id: 'search',
        title: '검색',
        link: `/contacts/search`,
      },
      {
        id: 'custom-search',
        title: '맞춤 검색',
        link: `/contacts/saved-search`,
      },
      {
        id: 'list',
        title: '미디어 리스트',
        link: `/contacts/list`,
      },
      {
        id: 'add',
        title: '연락처 추가',
        link: `/contacts/add`,
      },
      {
        id: 'custom-search-management',
        title: '맞춤 검색 관리',
        link: `/contacts/saved-search-manage`,
      },
      {
        id: 'briefing',
        title: '미디어 소식',
        link: 'https://www.mediabee.com/media-brief',
      },
    ],
  },
  {
    title: '모니터링',
    id: 'monitoring',
    subMenus: [
      {
        id: 'search-news',
        title: '뉴스 검색',
        link: '/news/search',
      },
      {
        id: 'monitoring',
        title: '뉴스 맞춤 검색',
        link: '/news/monitoring',
      },
      {
        id: 'clipbook',
        title: '클립북',
        link: `/news/clipbook`,
      },
      {
        id: 'add-news',
        title: '뉴스 추가',
        link: '/news/add',
      },
      {
        id: 'monitoring-management',
        title: '맞춤 검색 관리',
        link: `/news/saved-search-manage`,
      },
      {
        id: 'news-tag',
        title: '뉴스 태그',
        link: `/news/tag`,
      },
    ],
  },
  {
    id: 'activity',
    title: '활동',
    subMenus: [
      {
        id: 'activity',
        title: '활동',
        link: `/activity/search`,
      },
      {
        id: 'activity-tag',
        title: '활동 태그',
        link: '/activity/tag',
      },
    ],
  },
  {
    title: '배포하기',
    id: 'distribution',
    subMenus: [
      {
        id: 'press-release',
        title: '보도자료',
        link: '/press-release',
      },
      {
        id: 'email',
        title: '이메일',
        link: '/email',
      },
      {
        id: 'newswire',
        title: '뉴스와이어',
        link: '/newswire',
      },
      {
        id: 'initial-document',
        title: '배포 관리',
        link: '/draft',
      },
    ],
  },
]
