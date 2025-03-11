/**
 * @file SortFilterList.stories.tsx
 * @description SortFilterList 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import SortFilterList from './SortFilterList'

const meta: Meta<typeof SortFilterList> = {
  title: '0.UI/SortFilterList',
  component: SortFilterList,
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

type Story = StoryObj<typeof SortFilterList>

export const Default: Story = {
  args: {
    sortOptionsByData: [
      {
        id: 'FIXED_DATE',
        name: '수정일',
      },
      {
        id: 'CREATED_DATE',
        name: '생성일',
      },
      {
        id: 'LIST_NAME',
        name: '목록명',
      },
    ],
  },
}

export default meta
