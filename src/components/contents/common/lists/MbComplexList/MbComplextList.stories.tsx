/**
 * @file MbComplexList.stories.tsx
 * @description MbComplexList 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import MbComplexList from './MbComplexList'

const meta: Meta<typeof MbComplexList> = {
  title: '1.Contents/List/MbComplexList',
  component: MbComplexList,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof MbComplexList>

export const Default: Story = {
  args: {},
}

export default meta
