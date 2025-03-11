/**
 * @file ResetPassword.stories.tsx
 * @description ResetPassword 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import ResetPassword from './ResetPassword'

const meta: Meta<typeof ResetPassword> = {
  title: '2.Pages/ResetPassword',
  component: ResetPassword,
  tags: ['autodocs'],
  args: {},
  decorators: [
    Story => (
      <div style={{ padding: '0 0 100px' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof ResetPassword>

export const Default: Story = {
  args: {},
}

export default meta
