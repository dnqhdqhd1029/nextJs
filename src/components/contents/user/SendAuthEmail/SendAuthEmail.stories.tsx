/**
 * @file SendAuthEmail.stories.tsx
 * @description SendAuthEmail 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import SendAuthEmail from './SendAuthEmail'

const meta: Meta<typeof SendAuthEmail> = {
  title: '2.Pages/SendAuthEmail',
  component: SendAuthEmail,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof SendAuthEmail>

export const Default: Story = {
  args: {},
}

export default meta
