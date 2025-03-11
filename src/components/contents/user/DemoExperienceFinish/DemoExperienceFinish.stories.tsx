/**
 * @file DemoExperienceFinish.stories.tsx
 * @description DemoExperienceFinish 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import DemoExperienceFinish from './DemoExperienceFinish'

const meta: Meta<typeof DemoExperienceFinish> = {
  title: '2.Pages/DemoExperienceFinish',
  component: DemoExperienceFinish,
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

type Story = StoryObj<typeof DemoExperienceFinish>

export const Default: Story = {
  args: {},
}

export default meta
