/**
 * @file DatePicker.stories.tsx
 * @description DatePicker 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import FormTitle from './FormTitle'
import { IcoTooltip } from './IcoGroup'
import Tooltips from './Tooltips'

const meta: Meta<typeof FormTitle> = {
  title: '0.UI/FormTitle',
  component: FormTitle,
  tags: ['autodocs'],
  args: {},
  decorators: [
    Story => (
      <div style={{ height: '150px' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof FormTitle>

export const Default: Story = {
  args: {
    title: '제목 입력. 툴팁 있어요.',
    tooltip: true,
    children: (
      <Tooltips
        tooltipId={'tt10-4'}
        tooltipPlace={'top'}
        tooltipHtml={
          '최근 3개월 이내 뉴스에서 특정 단어를<br />언급한 언론인을 검색합니다. 단어 사이에<br />and, or, not 등 불리언 연산자를 사용하고,<br />여러 단어로 된 문장은 따옴표("")로 묶어서<br />검색할 수 있습니다.'
        }
        tooltipComponent={<IcoTooltip />}
      />
    ),
  },
}

export default meta
