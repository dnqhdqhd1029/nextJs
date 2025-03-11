/**
 * @file Tag.stories.tsx
 * @description Tag 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import Tooltips from './Tooltips'

const meta: Meta<typeof Tooltips> = {
  title: '0.UI/Tooltips',
  component: Tooltips,
  tags: ['autodocs'],
  args: {},
  decorators: [
    Story => (
      <div style={{ width: '50%', height: '300px', padding: '100px 100px 100px 200px' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof Tooltips>

export const Default: Story = {
  args: {
    tooltipId: 'tt1',
    tooltipPlace: 'left',
    tooltipHtml: '조직 내에서 여러 명이 공용<br />으로 사용하는 메일',
    tooltipContents: '안녕하세요',
  },
}

export default meta
