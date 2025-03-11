/**
 * @file Pagination.stories.tsx
 * @description Pagination 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import PageSizeSelect from './PageSizeSelect'

const meta: Meta<typeof PageSizeSelect> = {
  title: '0.UI/PageSizeSelect',
  component: PageSizeSelect,
  tags: ['autodocs'],
  args: {},
  decorators: [
    Story => (
      <div style={{ height: '200px' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof PageSizeSelect>

export const Default: Story = {
  args: {},
}

export default meta
