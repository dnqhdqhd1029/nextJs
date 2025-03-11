/**
 * @file Pagination.stories.tsx
 * @description Pagination 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import Pagination from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: '0.UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    type: 'n3',
    count: 10,
    viewCount: 6,
    page: 1,
    onPageChange: (page: number) => console.log(page),
  },
}

export default meta
