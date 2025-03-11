/**
 * @file UploadFileByDrop.stories.tsx
 * @description Tag 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import UploadFileByDrop from './UploadFileByDrop'

const meta: Meta<typeof UploadFileByDrop> = {
  title: '0.UI/UploadFileByDrop',
  component: UploadFileByDrop,
  tags: ['autodocs'],
  args: {},
  decorators: [],
}

type Story = StoryObj<typeof UploadFileByDrop>

export const Default: Story = {}

export default meta
