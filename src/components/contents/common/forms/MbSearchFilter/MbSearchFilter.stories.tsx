/**
 * @file MbSearchFilter.stories.tsx
 * @description MbSearchFilter 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import MbSearchFilter from './MbSearchFilter'

const meta: Meta<typeof MbSearchFilter> = {
  title: '1.Contents/Forms/MbSearchFilter',
  component: MbSearchFilter,
  tags: ['autodocs'],
  args: {},
  decorators: [
    Story => (
      <div style={{ width: '350px', height: '1200px', border: '1px solid #333' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof MbSearchFilter>

export const Default: Story = {
  args: {},
}

export default meta
