/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import IcoSymbol from './IcoSymbol'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'

const meta: Meta<typeof IcoSymbol> = {
  title: '0.UI/IcoSymbol',
  component: IcoSymbol,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof IcoSymbol>

export const Default: Story = {
  args: {
    label: '아이콘이름',
    icoData: icoSvgData.checkThick,
  },
}

export default meta
