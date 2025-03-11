/**
 * @file SelectList.stories.tsx
 * @description SelectList 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import SelectList from './SelectList'

const meta: Meta<typeof SelectList> = {
  title: '0.UI/SelectList',
  component: SelectList,
  tags: ['autodocs'],
  args: {},
  decorators: [
    Story => (
      <div style={{ width: '300px', height: '150px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof SelectList>

export const Default: Story = {
  args: {
    optionList: [
      {
        id: 'ALL',
        name: '전체',
      },
      {
        id: 'HIDDEN',
        name: '비공개',
      },
      {
        id: 'SHOW',
        name: '공개',
      },
      {
        id: 'FIXED',
        name: '수정',
      },
    ],
  },
}

export default meta
