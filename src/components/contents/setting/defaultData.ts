import { NavigationLinkItem } from '~/types/common'

export const settingLinks: NavigationLinkItem[] = [
  {
    id: 'user',
    title: '회원',
    subMenus: [
      {
        id: 'system-alarm',
        title: '시스템 알림',
        pathLink: '/setting/system-alarm',
        link: `/setting/system-alarm`,
      },
      {
        id: 'news-notifier',
        title: '뉴스 알리미',
        pathLink: '/setting/news-notifier',
        link: `/setting/news-notifier`,
      },
      {
        id: 'share-setting-defaults',
        title: '공유 설정 기본값',
        pathLink: '/setting/share-setting-defaults',
        link: `/setting/share-setting-defaults`,
      },
      {
        id: 'time-zone',
        title: '표준 시간대',
        pathLink: '/setting/time-zone',
        link: `/setting/time-zone`,
      },
      {
        id: 'contact-info',
        title: '이메일 서명',
        pathLink: '/setting/contact-info',
        link: `/setting/contact-info`,
      },
    ],
  },
  {
    id: 'billing',
    title: '사용권',
    subMenus: [
      {
        id: 'license-info',
        title: '사용권 정보',
        pathLink: '/setting/license-info',
        link: `/setting/system-alarm`,
      },
      {
        id: 'my-purchase',
        title: '내 구매',
        pathLink: '/setting/my-purchase',
        link: `/setting/my-purchase`,
      },
    ],
  },
  {
    id: 'company',
    title: '회사',
    subMenus: [
      {
        id: 'company-info-info',
        title: '회사 정보',
        pathLink: '/setting/company-info-info',
        link: `/setting/company-info`,
      },
    ],
  },
]
