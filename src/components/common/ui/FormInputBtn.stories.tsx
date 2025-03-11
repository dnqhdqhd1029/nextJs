/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import FormInputBtn from './FormInputBtn'

const meta: Meta<typeof FormInputBtn> = {
  title: '0.UI/FormInputBtn',
  component: FormInputBtn,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof FormInputBtn>

export const Default: Story = {
  args: {
    type: 'checkbox',
    name: 'rdo-only0',
    id: 'rdo-only0',
    label: '단일 체크박스 버튼',
  },
}

export const Radio: Story = {
  args: {
    type: 'radio',
    name: 'rdo-only0',
    id: 'rdo-only0',
    label: '단일 라디오 버튼',
  },
}

export default meta
