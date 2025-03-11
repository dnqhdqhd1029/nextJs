/**
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import Notification from './Notification'

const meta: Meta<typeof Notification> = {
  title: '0.UI/Notification',
  component: Notification,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof Notification>

export const Default: Story = {
  args: {},
}

export default meta
