/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import { IcoRequired } from './IcoGroup'

const meta: Meta<typeof IcoRequired> = {
  title: '0.UI/IcoGroup/IcoRequired',
  component: IcoRequired,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof IcoRequired>

export const Default: Story = {
  args: {},
}

export default meta
