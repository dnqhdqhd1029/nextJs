/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import DatePicker from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: '0.UI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  args: {},
  decorators: [
    Story => (
      <div style={{ width: '50%', height: '300px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
