/**
 * @file Button.stories.tsx
 * @description Button 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import Button from './Button'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'

const meta: Meta<typeof Button> = {
  title: '0.UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    label: '저장됨',
    size: 'm',
    color: 'primary',
    count: 6,
    icoLeft: true,
    cate: 'check-number',
    icoLeftData: icoSvgData.checkThick,
  },
}

export default meta
