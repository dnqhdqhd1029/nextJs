/**
 * @file Tab.stories.tsx
 * @description Tab 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import Tabs from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: '0.UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {},
  decorators: [],
}

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  args: {
    items: [
      {
        id: 'press-search',
        title: '언론인 검색',
      },
      {
        id: 'media-search',
        title: '매체 검색',
      },
    ],
  },
}

export default meta
