/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import { IcoTooltip } from './IcoGroup'

const meta: Meta<typeof IcoTooltip> = {
  title: '0.UI/IcoGroup/IcoTooltip',
  component: IcoTooltip,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof IcoTooltip>

export const Default: Story = {
  args: {},
}

export default meta
