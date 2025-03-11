/**
 * @file SelectTime.stories.tsx
 * @description SelectTime 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import SelectTime from './SelectTime'

const meta: Meta<typeof SelectTime> = {
  title: '0.UI/SelectTime',
  component: SelectTime,
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

type Story = StoryObj<typeof SelectTime>

export const Default: Story = {
  args: {},
}

export default meta
