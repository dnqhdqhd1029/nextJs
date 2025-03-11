/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import FormInputToggle from './FormInputToggle'

const meta: Meta<typeof FormInputToggle> = {
  title: '0.UI/FormInputToggle',
  component: FormInputToggle,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof FormInputToggle>

export const Default: Story = {
  args: {
    id: 'toggle',
  },
}

export default meta
