/**
 * @file MbColumnList.stories.tsx
 * @description MbColumnList 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/react'

import MbColumnList from './MbColumnList'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'

const meta: Meta<typeof MbColumnList> = {
  title: '1.Contents/List/MbColumnList',
  component: MbColumnList,
  tags: ['autodocs'],
  args: {},
}

type Story = StoryObj<typeof MbColumnList>

export const Default: Story = {
  args: {
    data: [
      {
        title: 'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시',
        status: '보도자료 초안',
        author: '홍길동',
        date: '06-24',
        year: '2022',
        icon: icoSvgData.fileEarmarkText,
      },
      {
        title: '메가존, 클라우드 MSP사업자로 성장…원스탑 토탈 서비스 제공',
        status: '클립북',
        author: '홍길동',
        date: '05-18',
        year: '2022',
        icon: icoSvgData.envelope,
      },
      {
        title: '중앙일보 서정민 전화 통화',
        status: '전화 완료',
        author: '홍길동',
        date: '04-27',
        year: '2021',
        icon: icoSvgData.pencil,
      },
      {
        title: 'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시',
        status: '보도자료 초안',
        author: '홍길동',
        date: '06-24',
        year: '2021',
        icon: icoSvgData.fileEarmarkText,
      },
      {
        title: 'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시',
        status: '보도자료 초안',
        author: '홍길동',
        date: '06-24',
        year: '2021',
        icon: icoSvgData.fileEarmarkText,
      },
      {
        title: 'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시',
        status: '보도자료 초안',
        author: '홍길동',
        date: '06-24',
        year: '2021',
        icon: icoSvgData.fileEarmarkText,
      },
      {
        title: 'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시',
        status: '보도자료 초안',
        author: '홍길동',
        date: '06-24',
        year: '2021',
        icon: icoSvgData.fileEarmarkText,
      },
      {
        title: 'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시',
        status: '보도자료 초안',
        author: '홍길동',
        date: '06-24',
        year: '2021',
        icon: icoSvgData.fileEarmarkText,
      },
    ],
  },
}

export default meta
