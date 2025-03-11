/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import { IcoChevronThickRight } from './IcoGroup'

const meta: Meta<typeof IcoChevronThickRight> = {
  title: '0.UI/IcoGroup/IcoChevronThickRight',
  component: IcoChevronThickRight,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof IcoChevronThickRight>

export const Default: Story = {
  args: {},
}

export default meta
