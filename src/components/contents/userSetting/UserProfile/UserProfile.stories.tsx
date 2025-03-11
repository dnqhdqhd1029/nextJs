/**
 * @file ListTypeContents.stories.tsx
 * @description ListTypeContents 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import UserProfile from './UserProfile'

const meta: Meta<typeof UserProfile> = {
  title: '2.Pages/UserProfile',
  component: UserProfile,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof UserProfile>

export const Default: Story = {
  args: {},
}

export default meta
