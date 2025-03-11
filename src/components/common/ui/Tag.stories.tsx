/**
 * @file Tag.stories.tsx
 * @description Tag 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import Tag from './Tag'

const meta: Meta<typeof Tag> = {
  title: '0.UI/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: {},
  decorators: [
    Story => (
      <div style={{ width: '50%', height: '300px' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: {
    label: '태그2',
    cate: 'n2',
    shape: 'rounded',
    close: true,
  },
}

export default meta
