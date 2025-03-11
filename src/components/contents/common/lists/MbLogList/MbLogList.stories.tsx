/**
 * @file MbLogList.stories.tsx
 * @description ListTypeContents 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import MbLogList from './MbLogList'

const meta: Meta<typeof MbLogList> = {
  title: '1.Contents/List/MbLogList<Type7>',
  component: MbLogList,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof MbLogList>

export const Default: Story = {
  args: {
    data: [
      {
        date: '2021-11-30 09:45',
        name: '홍길동',
        nameLink: '/activity',
        activity: '활동작성',
      },
      {
        date: '2021-11-30 09:45',
        name: '홍길동',
        nameLink: '/activity',
        activity: '활동 소유자 작성',
      },
      {
        date: '2021-11-30 09:45',
        name: '홍길동',
        nameLink: '/activity',
        activity: '활동작성',
      },
    ],
  },
}

export default meta
