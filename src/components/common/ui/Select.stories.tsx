/**
 * @file Select.stories.tsx
 * @description Pagination 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import Select from './Select'

const meta: Meta<typeof Select> = {
  title: '0.UI/Select',
  component: Select,
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

type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    options: [
      { id: '1', name: '홈' },
      { id: '2', name: '옵션2' },
      { id: '3', name: '옵션3' },
    ],
  },
}

export default meta
