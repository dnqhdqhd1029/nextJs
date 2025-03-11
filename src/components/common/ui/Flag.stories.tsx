/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import Flag from './Flag'

const meta: Meta<typeof Flag> = {
  title: '0.UI/Flag',
  component: Flag,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof Flag>

export const Default: Story = {
  args: {
    label: '공용',
  },
}

export default meta
