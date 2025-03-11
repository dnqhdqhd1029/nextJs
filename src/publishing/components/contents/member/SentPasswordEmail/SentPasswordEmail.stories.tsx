/**
 * @file SentPasswordEmail.stories.tsx
 * @description SentPasswordEmail storybook file
 */
import type { Meta, StoryObj } from '@storybook/react'

import SentPasswordEmail from './SentPasswordEmail'

const meta: Meta<typeof SentPasswordEmail> = {
  title: '2.Pages/SentPasswordEmail',
  component: SentPasswordEmail,
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

type Story = StoryObj<typeof SentPasswordEmail>

export const Default: Story = {
  args: {},
}

export default meta
