/**
 * @file ListTypeContents.stories.tsx
 * @description ListTypeContents 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import MbTextList from '.'

const meta: Meta<typeof MbTextList> = {
  title: '1.Contents/List/MbTextList<Type6>',
  component: MbTextList,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof MbTextList>

export const Default: Story = {
  args: {
    data: [
      {
        id: '1',
        contents: '기자 3명을 초대해 미팅하는 것으로 결정했습니다.',
        author: '홍길동',
        authorLink: '/activity',
        date: '2022-02-17 10:38',
      },
      {
        id: '2',
        contents: '기자 3명을 초대해 미팅하는 것으로 결정했습니다.',
        author: '홍길동',
        authorLink: '/activity',
        date: '2022-02-17 10:38',
      },
    ],
  },
}

export default meta
