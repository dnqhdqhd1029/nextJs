/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import IcoSvgCircle from './IcoSvgCircle'

import icoSvgDataCircle from '~/components/common/ui/icon/icoSvgDataCircle.json'

const meta: Meta<typeof IcoSvgCircle> = {
  title: '0.UI/IcoSvgCircle',
  component: IcoSvgCircle,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof IcoSvgCircle>

export const Default: Story = {
  args: {
    data: icoSvgDataCircle.adjust,
  },
}

export default meta
