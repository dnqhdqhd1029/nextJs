/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import LoadingIcon from './LoadingIcon'

const meta: Meta<typeof LoadingIcon> = {
  title: '0.UI/LoadingIcon',
  component: LoadingIcon,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof LoadingIcon>

export const Default: Story = {
  args: {
    size: 's24',
  },
}

export default meta
