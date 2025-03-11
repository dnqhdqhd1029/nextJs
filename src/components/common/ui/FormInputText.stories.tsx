/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import FormInputText from './FormInputText'

const meta: Meta<typeof FormInputText> = {
  title: '0.UI/FormInputText',
  component: FormInputText,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof FormInputText>

export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력해주세요.',
  },
}

export default meta
