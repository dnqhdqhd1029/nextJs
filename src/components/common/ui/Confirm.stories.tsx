/**
 * @file Button.stories.tsx
 * @description Button 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import Confirm from './Confirm'

const meta: Meta<typeof Confirm> = {
  title: '0.UI/Confirm',
  component: Confirm,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof Confirm>

export const Default: Story = {
  args: {
    isOpen: false,
    children: '삭제하시겠습니까?',
  },
}

export default meta
