/**
 * @file MbHeadSortFilter.stories.tsx
 * @description MbHeadSortFilter 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import MbHeadSortFilter from './MbHeadSortFilter'

const meta: Meta<typeof MbHeadSortFilter> = {
  title: '1.Contents/Functions/MbHeadSortFilter',
  component: MbHeadSortFilter,
  tags: ['autodocs'],
  args: {},
  decorators: [Story => <Story style={{ display: 'flex' }} />],
}

type Story = StoryObj<typeof MbHeadSortFilter>

export const Default: Story = {
  args: {
    hasDisclosureScopeFilter: true,
    hasMyItemToggle: true,
    hasSearch: true,
    hasSortFilter: true,
  },
}

export default meta
