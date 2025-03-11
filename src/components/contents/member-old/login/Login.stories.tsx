/**
 * @file ListTypeContents.stories.tsx
 * @description ListTypeContents 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import SignIn from './Login'

const meta: Meta<typeof SignIn> = {
  title: '2.Pages/DemoSignIn',
  component: SignIn,
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

type Story = StoryObj<typeof SignIn>

export const Default: Story = {
  args: {},
}

export default meta
