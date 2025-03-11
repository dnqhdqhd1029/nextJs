import { NavigationLinkItem, type SortFilterOptionItem } from '~/types/common'

export const DefaultSettingLinks: NavigationLinkItem[] = [
  {
    id: 'system-alarm',
    title: '시스템 알림',
    pathLink: '/setting/system-alarm',
  },
  {
    id: 'news-notifier',
    title: '뉴스 알리미',
    pathLink: '/setting/news-notifier',
  },
  {
    id: 'share-setting-defaults',
    title: '공유 기본값',
    pathLink: '/setting/share-setting-defaults',
  },
  {
    id: 'time-zone',
    title: '표준 시간대',
    pathLink: '/setting/time-zone',
  },
  {
    id: 'landingpage',
    title: '랜딩 페이지',
    pathLink: '/setting/landingpage',
  },
  {
    id: 'contact-info',
    title: '이메일 서명',
    pathLink: '/setting/contact-info',
  },
]
