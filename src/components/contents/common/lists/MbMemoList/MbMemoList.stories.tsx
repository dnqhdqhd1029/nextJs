/**
 * @file ListTypeContents.stories.tsx
 * @description ListTypeContents 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import MbMemoList from './MbMemoList'

const meta: Meta<typeof MbMemoList> = {
  title: '1.Contents/List/MbMemoList<type5>',
  component: MbMemoList,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof MbMemoList>
/*
 case 'NEWSWIRE_RELEASE': // 뉴스와이어
      icon = icoSvgData.newspaperTxt
      break
    case 'PRESS_RELEASE': // 보도자료
      icon = icoSvgData.building
      break
    case 'MAILING': // 메일
      icon = icoSvgData.envelope
      break
    case 'INQUIRY': // 문의
      icon = icoSvgData.chatLeftText
      break
    case 'PHONE_CALL': // 전화
      icon = icoSvgData.telephone
      break
    case 'PROMISE': // 약속
      icon = icoSvgData.clock
      break
    case 'NOTE': // 노트
      icon = icoSvgData.chatLeftText
      break
 */

export const Default: Story = {
  args: {
    data: [
      {
        id: '1',
        isChecked: false,
        contents: '중앙일보 서정민 전화 통화',
        activityType: '전화',
        activityTypeCode: 'PHONE_CALL',
        author: '홍길동',
        createDate: '03-15',
        updateDate: '03-15',
        status: 'ING',
        commentSize: 2,
      },
    ],
  },
}

export default meta
