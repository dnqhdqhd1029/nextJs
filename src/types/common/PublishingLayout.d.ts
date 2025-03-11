/**
 * @file Layout.d.ts
 * @description Layout 관련 타입 정의
 */

import { NextComponentType, NextPage, NextPageContext } from 'next'
import { AppProps } from 'next/app'

import { Layouts } from '~/publishing/components/common/layouts/Layouts'

// Layouts.ts 에서 export 한 Layouts 객체의 key 값들을 LayoutKeys 타입으로 정의
export type LayoutKeys = keyof typeof Layouts

// LayoutKeys의 타입을 바탕으로 한 페이지 타입 정의
export type PageType<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: LayoutKeys
  PublishingLayout?: LayoutKeys
}

// Component의 property인 Layout의 타입을 LayoutKeys로 정의
export type ExtendedAppProps = AppProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: LayoutKeys
  }
}
