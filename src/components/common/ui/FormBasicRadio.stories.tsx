/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import FormBasicRadio from './FormBasicRadio'

const meta: Meta<typeof FormBasicRadio> = {
  title: '0.UI/FormBasicRadio',
  component: FormBasicRadio,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof FormBasicRadio>

export const Default: Story = {
  args: {},
}

export default meta
