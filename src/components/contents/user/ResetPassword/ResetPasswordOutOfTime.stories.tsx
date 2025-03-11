/**
 * @file ListTypeContents.stories.tsx
 * @description ListTypeContents 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import ResetPasswordOutOfTime from './ResetPasswordOutOfTime'

const meta: Meta<typeof ResetPasswordOutOfTime> = {
  title: '2.Pages/ResetPasswordOutOfTime',
  component: ResetPasswordOutOfTime,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof ResetPasswordOutOfTime>

export const Default: Story = {
  args: {},
}

export default meta
