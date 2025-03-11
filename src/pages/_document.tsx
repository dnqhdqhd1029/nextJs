/**
 * @file _document.tsx
 * @description Document 컴포넌트. HTML을 구성함.
 */

import { Head, Html, Main, NextScript } from 'next/document'

import { MEDIA_SEARCH_STORE, PRESS_SEARCH_STORE } from '~/constants/common'

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta
          httpEquiv="Cache-Control"
          content="no-store, no-cache, must-revalidate, post-check=0, pre-check=0"
        />
        <meta
          httpEquiv="Pragma"
          content="no-cache"
        />
        <meta
          httpEquiv="Expires"
          content="0"
        />
      </Head>
      <body>
        <Main />
        <div id="next-portal" />
        <NextScript />
        <input
          type="hidden"
          id={PRESS_SEARCH_STORE.replace('#', '')}
        />
        <input
          type="hidden"
          id={MEDIA_SEARCH_STORE.replace('#', '')}
        />
      </body>
    </Html>
  )
}
