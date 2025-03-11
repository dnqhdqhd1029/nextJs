/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import DatePickerRange from './DatePickerRange'

const meta: Meta<typeof DatePickerRange> = {
  title: '0.UI/DatePickerRange',
  component: DatePickerRange,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof DatePickerRange>

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
