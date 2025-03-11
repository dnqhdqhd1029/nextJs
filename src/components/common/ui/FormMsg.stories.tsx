/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import FormMsg from './FormMsg'

const meta: Meta<typeof FormMsg> = {
  title: '0.UI/FormMsg',
  component: FormMsg,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof FormMsg>

export const Default: Story = {
  args: {
    msg: '테스트 메시지입니다.',
  },
}

export default meta
