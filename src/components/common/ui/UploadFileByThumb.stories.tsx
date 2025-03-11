/**
 * @file UploadFileByThumb.stories.tsx
 * @description UploadFileByThumb 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import UploadFileByThumb from './UploadFileByThumb'

const meta: Meta<typeof UploadFileByThumb> = {
  title: '0.UI/UploadFileByThumb',
  component: UploadFileByThumb,
  tags: ['autodocs'],
  args: {},
  decorators: [],
}

type Story = StoryObj<typeof UploadFileByThumb>

export const Default: Story = {}

export default meta
