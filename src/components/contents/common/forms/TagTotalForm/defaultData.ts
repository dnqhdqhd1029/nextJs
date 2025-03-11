import type { TabItem } from '~/components/common/ui/Tabs'

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

export const DefaulttagPopupNaviLinks: TabItem = {
  id: '',
  title: '',
}
