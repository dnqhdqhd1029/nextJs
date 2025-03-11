/**
 * @file ListTypeContents.stories.tsx
 * @description ListTypeContents 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import MbSummaryList from '.'

const meta: Meta<typeof MbSummaryList> = {
  title: '1.Contents/List/MbSummaryList<Type4>',
  component: MbSummaryList,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof MbSummaryList>

export const Default: Story = {
  args: {
    data: [
      {
        id: '1',
        isChecked: true,
        disableCheck: false,
        name: '삼성전자',
        nameLink: '/activity',
        taggingCount: 68000,
        isCoverage: true,
        itemCounter: 125,
        groupScope: {
          id: 'ALL',
          name: '전체 그룹',
        },
        category: '캠페인',
        shareScope: {
          id: 'ALL',
          name: '전체',
        },
        shareScopeList: [
          {
            id: 'ALL',
            name: '전체',
          },
          {
            id: 'HIDDEN',
            name: '비공개',
          },
          {
            id: 'SHOW',
            name: '공개',
          },
          {
            id: 'FIXED',
            name: '수정',
          },
        ],
        shareTarget: {
          id: '3',
          name: '홍길동',
        },
        shareTargetList: [
          {
            id: '1',
            name: '김세연',
          },
          {
            id: '2',
            name: '이동욱',
          },
          {
            id: '3',
            name: '홍길동',
          },
          {
            id: '4',
            name: '최진욱',
          },
        ],
        logHistory: {
          comment: '홍길동 수정',
          date: '2022-02-18',
        },
        settingOptions: [
          {
            id: 'share',
            title: '공유하기',
          },
          {
            id: 'blockEmailSending',
            title: '이메일 발송 차단',
          },
          {
            id: 'edit',
            title: '수정하기',
          },
          {
            id: 'delete',
            title: '삭제하기',
          },
        ],
      },
      {
        id: '2',
        isChecked: true,
        disableCheck: false,
        name: '삼성전자',
        nameLink: '/activity',
        taggingCount: 68000,
        isCoverage: true,
        itemCounter: 125,
        groupScope: {
          id: 'ALL',
          name: '전체 그룹',
        },
        category: '캠페인',
        shareScope: {
          id: 'ALL',
          name: '전체',
        },
        shareScopeList: [
          {
            id: 'ALL',
            name: '전체',
          },
          {
            id: 'HIDDEN',
            name: '비공개',
          },
          {
            id: 'SHOW',
            name: '공개',
          },
          {
            id: 'FIXED',
            name: '수정',
          },
        ],
        shareTarget: {
          id: '3',
          name: '홍길동',
        },
        shareTargetList: [
          {
            id: '1',
            name: '김세연',
          },
          {
            id: '2',
            name: '이동욱',
          },
          {
            id: '3',
            name: '홍길동',
          },
          {
            id: '4',
            name: '최진욱',
          },
        ],
        logHistory: {
          comment: '홍길동 수정',
          date: '2022-02-18',
        },
        settingOptions: [
          {
            id: 'share',
            title: '공유하기',
          },
          {
            id: 'blockEmailSending',
            title: '이메일 발송 차단',
          },
          {
            id: 'edit',
            title: '수정하기',
          },
          {
            id: 'delete',
            title: '삭제하기',
          },
        ],
      },
      {
        id: '3',
        isChecked: true,
        disableCheck: false,
        name: '삼성전자',
        nameLink: '/activity',
        taggingCount: 68000,
        isCoverage: true,
        itemCounter: 125,
        groupScope: {
          id: 'ALL',
          name: '전체 그룹',
        },
        category: '캠페인',
        shareScope: {
          id: 'ALL',
          name: '전체',
        },
        shareScopeList: [
          {
            id: 'ALL',
            name: '전체',
          },
          {
            id: 'HIDDEN',
            name: '비공개',
          },
          {
            id: 'SHOW',
            name: '공개',
          },
          {
            id: 'FIXED',
            name: '수정',
          },
        ],
        shareTarget: {
          id: '3',
          name: '홍길동',
        },
        shareTargetList: [
          {
            id: '1',
            name: '김세연',
          },
          {
            id: '2',
            name: '이동욱',
          },
          {
            id: '3',
            name: '홍길동',
          },
          {
            id: '4',
            name: '최진욱',
          },
        ],
        logHistory: {
          comment: '홍길동 수정',
          date: '2022-02-18',
        },
        settingOptions: [
          {
            id: 'share',
            title: '공유하기',
          },
          {
            id: 'blockEmailSending',
            title: '이메일 발송 차단',
          },
          {
            id: 'edit',
            title: '수정하기',
          },
          {
            id: 'delete',
            title: '삭제하기',
          },
        ],
      },
    ],
  },
}

export default meta
