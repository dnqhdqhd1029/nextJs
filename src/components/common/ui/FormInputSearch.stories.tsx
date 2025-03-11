/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import FormInputSearch from './FormInputSearch'

const meta: Meta<typeof FormInputSearch> = {
  title: '0.UI/FormInputSearch',
  component: FormInputSearch,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof FormInputSearch>

export const Default: Story = {
  args: {},
}

export default meta
