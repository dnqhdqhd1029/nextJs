/**
 * @file MbUserCountLimitPopup.stories.tsx
 * @description MbUserCountLimitPopup 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import MbUserProfilePopup from './MbUserProfilePopup'

const meta: Meta<typeof MbUserProfilePopup> = {
  title: '1.Contents/Popup/MbUserCountLimitPopup',
  component: MbUserProfilePopup,
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

type Story = StoryObj<typeof MbUserProfilePopup>

export const Default: Story = {
  args: {
    isOpen: true,
  },
}

export default meta
