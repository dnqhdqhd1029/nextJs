/**
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import MediaBeeLogo from './MediaBeeLogo'

const meta: Meta<typeof MediaBeeLogo> = {
  title: '0.UI/MediaBeeLogo',
  component: MediaBeeLogo,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof MediaBeeLogo>

export const Default: Story = {
  args: {},
}

export default meta
