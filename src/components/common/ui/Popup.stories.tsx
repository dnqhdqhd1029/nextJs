/**
 * @file Pagination.stories.tsx
 * @description Pagination 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import Popup from './Popup'

const meta: Meta<typeof Popup> = {
  title: '0.UI/Popup',
  component: Popup,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof Popup>

export const Default: Story = {
  args: {
    isOpen: false,
    title: '팝업 타이틀',
    children: '팝업 내용',
    onClose: () => console.log('close'),
    onConfirm: () => console.log('confirm'),
    backdropClose: true,
  },
}

export default meta
