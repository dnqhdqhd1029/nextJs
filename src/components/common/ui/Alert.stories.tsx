/**
 * @file Button.stories.tsx
 * @description Button 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import Alert from './Alert'

const meta: Meta<typeof Alert> = {
  title: '0.UI/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    isOpen: false,
    children: '일반 얼럿창',
  },
}

export default meta
