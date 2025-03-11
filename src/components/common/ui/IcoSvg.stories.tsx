/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import IcoSvg from './IcoSvg'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'

const meta: Meta<typeof IcoSvg> = {
  title: '0.UI/IcoSvg',
  component: IcoSvg,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof IcoSvg>

export const Default: Story = {
  args: {
    data: icoSvgData.personFill,
  },
}

export default meta
