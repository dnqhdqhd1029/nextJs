/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import FormBasicCheckbox from './FormBasicCheckbox'

const meta: Meta<typeof FormBasicCheckbox> = {
  title: '0.UI/FormBasicCheckbox',
  component: FormBasicCheckbox,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof FormBasicCheckbox>

export const Default: Story = {
  args: {},
}

export default meta
