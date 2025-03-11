/**
 * @file SignUp.stories.tsx
 * @description SignUp 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import SignUp from './SignUp'

const meta: Meta<typeof SignUp> = {
  title: '2.Pages/SignUp',
  component: SignUp,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof SignUp>

export const Default: Story = {
  args: {},
}

export default meta
