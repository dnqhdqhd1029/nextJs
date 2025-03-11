/**
 * @file Loader.stories.tsx
 * @description Loader 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import Loader from './Loader'

const meta: Meta<typeof Loader> = {
  title: '0.UI/Loader',
  component: Loader,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof Loader>

export const Default: Story = {
  args: {},
}

export default meta
