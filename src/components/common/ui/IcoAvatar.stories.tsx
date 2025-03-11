/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import IcoAvatar from './IcoAvatar'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'

const meta: Meta<typeof IcoAvatar> = {
  title: '0.UI/IcoAvatar',
  component: IcoAvatar,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof IcoAvatar>

export const Default: Story = {
  args: {
    label: '아이콘이름',
    icoData: icoSvgData.personFill,
    size: 's48',
    icoSize: 's24',
  },
}

export default meta
