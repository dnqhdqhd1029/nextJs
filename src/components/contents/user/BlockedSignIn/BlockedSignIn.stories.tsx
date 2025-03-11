/**
 * @file BlockedSignIn.stories.tsx
 * @description BlockedSignIn 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import BlockedSignIn from './BlockedSignIn'

const meta: Meta<typeof BlockedSignIn> = {
  title: '2.Pages/BlockedSignIn',
  component: BlockedSignIn,
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

type Story = StoryObj<typeof BlockedSignIn>

export const Default: Story = {
  args: {},
}

export default meta
