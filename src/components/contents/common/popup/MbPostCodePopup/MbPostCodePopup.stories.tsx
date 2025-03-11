/**
 * @file MbPostCodePopup.stories.tsx
 * @description MbPostCodePopup 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import MbPostCodePopup from './MbPostCodePopup'

const meta: Meta<typeof MbPostCodePopup> = {
  title: '1.Contents/Popup/MbPostCodePopup',
  component: MbPostCodePopup,
  tags: ['autodocs'],
  args: {},
  decorators: [
    Story => (
      <div style={{ width: '100%', height: '800px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof MbPostCodePopup>

export const Default: Story = {
  args: {
    isOpen: true,
  },
}

export default meta
