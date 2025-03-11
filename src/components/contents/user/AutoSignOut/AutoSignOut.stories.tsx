/**
 * @file AutoSignOut.stories.tsx
 * @description AutoSignOut 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import AutoSignOut from './AutoSignOut'

const meta: Meta<typeof AutoSignOut> = {
  title: '2.Pages/AutoSignOut',
  component: AutoSignOut,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof AutoSignOut>

export const Default: Story = {
  args: {},
}

export default meta
