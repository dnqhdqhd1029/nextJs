/**
 * @file IcoChevronThickLeft.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import { IcoChevronThickLeft } from './IcoGroup'

const meta: Meta<typeof IcoChevronThickLeft> = {
  title: '0.UI/IcoGroup/IcoChevronThickLeft',
  component: IcoChevronThickLeft,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof IcoChevronThickLeft>

export const Default: Story = {
  args: {},
}

export default meta
