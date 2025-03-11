import { NavigationLinkItem } from '~/types/common'

export const NAVIGATION_LINKS: NavigationLinkItem[] = [
  {
    id: 'press-media',
    subMenus: [
      {
        id: 'search', // 검색
        link: `/contacts/search`,
      },
      {
        id: 'saved-search', // 맞춤 검색
        link: `/contacts/saved-search`,
      },
      {
        id: 'list', // 언론/미디어 목록
        link: `/contacts/list`,
      },
      {
        id: 'add', // 추가
        link: `/contacts/add`,
      },
      {
        id: 'briefing', // 미디어 소식
        link: '/media-briefing',
      },
      {
        id: 'custom-search-management',
        link: `/contacts/saved-search-manage`,
      },
    ],
  },
  {
    id: 'monitoring',
    subMenus: [
      {
        id: 'search-news', // 뉴스 맞춤 검색
        link: '/news/search',
      },
      {
        id: 'monitoring', // 모니터링
        link: '/news/monitoring',
      },
      {
        id: 'clipbook', // 클립북
        link: `/news/clipbook`,
      },
      {
        id: 'add-news', // 뉴스 추가
        link: '/news/add',
      },
      {
        id: 'monitoring-management', // 맞춤 검색 관리
        link: `/news/saved-search-manage`,
      },
      {
        id: 'news-tag', // 뉴스 태그
        link: `/news/tag`,
      },
    ],
  },
  {
    id: 'activity',
    subMenus: [
      {
        id: 'activity',
        link: `/activity/search`,
      },
      {
        id: 'activity-tag',
        link: '/activity/tag',
      },
    ],
  },
  {
    id: 'distribution',
    subMenus: [
      {
        id: 'press-release',
        link: '/press-release',
      },
      {
        id: 'newswire',
        link: '/newswire',
      },
      {
        id: 'initial-document',
        link: '/draft',
      },
    ],
  },
  {
    id: 'project',
    subMenus: [
      {
        id: 'project',
        link: '/project/project-search',
      },
      {
        id: 'project-add',
        link: '/project/add-project',
      },
    ],
  },
]

export const TRANSLATION_ITEMS = {
  common: {
    hello: '[[name]]((을|를)) 환영합니다!',
    test: '테스트수정했음',
    gnb: [
      {
        title: '언론',
        id: 'press-media',
        subMenus: [
          {
            id: 'search',
            title: '검색',
          },
          {
            id: 'custom-search',
            title: '맞춤 검색',
          },
          {
            id: 'list',
            title: '미디어 리스트',
          },
          {
            id: 'add',
            title: '연락처 추가',
          },
          {
            id: 'briefing',
            title: '미디어 소식',
          },
          {
            id: 'custom-search-management',
            title: '맞춤 검색 관리',
          },
        ],
      },
      {
        title: '모니터링',
        id: 'monitoring',
        subMenus: [
          {
            id: 'search-news',
            title: '뉴스 맞춤 검색',
          },
          {
            id: 'monitoring',
            title: '모니터링',
          },
          {
            id: 'clipbook',
            title: '클립북',
          },
          {
            id: 'add-news',
            title: '뉴스 추가',
          },
          {
            id: 'monitoring-management',
            title: '맞춤 검색 관리',
          },
          {
            id: 'news-tag',
            title: '뉴스 태그',
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
          },
          {
            id: 'activity-tag',
            title: '활동 태그',
          },
        ],
      },
      {
        title: '배포',
        id: 'distribution',
        subMenus: [
          {
            id: 'press-release',
            title: '보도자료',
          },
          {
            id: 'newswire',
            title: '뉴스와이어',
          },
          {
            id: 'initial-document',
            title: '초안',
          },
        ],
      },
      // {
      //   title: '캠페인',
      //   id: 'project',
      //   subMenus: [
      //     {
      //       id: 'project',
      //       title: '캠페인',
      //     },
      //     {
      //       id: 'project-add',
      //       title: '캠페인 추가',
      //     },
      //   ],
      // },
    ],
  },
}

export const LANDINGPAGE_LINKS = [
  {
    code: 'HOME',
    link: '/dashboard',
  },
  {
    code: 'JRNLST_LIST',
    link: '/contacts/list',
  },
  {
    code: 'JRNLST_SRCH',
    link: '/contacts/saved-search',
  },
  {
    code: 'CLIPBOOK',
    link: '/news/clipbook',
  },
  {
    code: 'MONITORING',
    link: '/news/monitoring',
  },
  {
    code: 'ACTION',
    link: '/activity/search',
  },
]
