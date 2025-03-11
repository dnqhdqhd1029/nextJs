/**
 * @file UploadFileByInput.stories.tsx
 * @description UploadFileByInput 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import UploadFileByInput from './UploadFileByInput'

const meta: Meta<typeof UploadFileByInput> = {
  title: '0.UI/UploadFileByInput',
  component: UploadFileByInput,
  tags: ['autodocs'],
  args: {},
  decorators: [],
}

type Story = StoryObj<typeof UploadFileByInput>

export const Default: Story = {}

export default meta
