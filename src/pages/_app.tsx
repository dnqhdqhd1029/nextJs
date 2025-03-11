// imports
import { useEffect, useMemo } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Cookie, { CookieAttributes } from 'js-cookie'
import { NextComponentType, NextPageContext } from 'next'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import '../../node_modules/react-resizable/css/styles.css'
import '../../node_modules/react-toastify/dist/ReactToastify.css'
import '../../node_modules/react-datepicker/dist/react-datepicker.css'
import '../styles/styles.scss'

import LimitLayout from '~/components/common/layouts/templates/LimitLayout'
import ErrorBoundary from '~/components/common/utils/ErrorBoundary'
import { DEFAULT_LAYOUT, DEMO_DOMAINS, DEMO_LICENSE } from '~/constants/common'
import { Layouts as PublishingLayouts } from '~/publishing/components/common/layouts/Layouts'
import { wrapper } from '~/stores'
import type { LayoutKeys } from '~/types/common'
import type { LayoutKeys as PublishingLayoutKeys } from '~/types/common/PublishingLayout'

const Layout = dynamic(() => import('~/components/common/layouts/templates/Layout'), { ssr: false })

// Component의 property인 Layout의 타입을 LayoutKeys로 정의
export type ExtendedAppProps = AppProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: LayoutKeys
    PublishingLayout: PublishingLayoutKeys
  }
}

/**
 * react query 기능의 공통 에러 핸들링이 설정된 QueryClient를 반환한다.
 * @returns {QueryClient} QueryClient
 */
const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })
}

/**
 * App 컴포넌트
 * - ErrorBoundary: 공통 React 에러 핸들링
 * - ReduxProvider: Redux 설정을 위한 Wrapper
 * - QueryClientProvider: React Query Wrapper
 * - ReactQueryDevtools: 개발 모드에서만 사용되는 React Query Devtools
 * - Layout: 페이지 레이아웃
 * - Component: 페이지 컴포넌트
 * @param {ExtendedAppProps} props - 컴포넌트 props
 * @returns {JSX.Element} App 컴포넌트
 */
const App = ({ Component, pageProps }: ExtendedAppProps): JSX.Element => {
  const layoutType = (Component.Layout as LayoutKeys) ?? DEFAULT_LAYOUT
  const publishingLayoutType = (Component.PublishingLayout as PublishingLayoutKeys) ?? null
  const queryClient = createQueryClient()
  const { store } = wrapper.useWrappedStore(pageProps)
  const PublishingLayout = PublishingLayouts[publishingLayoutType] ?? (page => page)
  const persistor = persistStore(store)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      DEMO_DOMAINS.includes(window.location.hostname as (typeof DEMO_DOMAINS)[number])
    ) {
      Cookie.set(DEMO_LICENSE, 'true')
    } else {
      Cookie.remove(DEMO_LICENSE)
    }
  }, [])

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ToastContainer
              closeButton
              hideProgressBar
              closeOnClick
              autoClose={5000}
            />
            {publishingLayoutType !== null ? (
              <PublishingLayout>
                <Component {...pageProps} />
              </PublishingLayout>
            ) : (
              <>
                <GoogleAnalytics
                  trackPageViews={{ ignoreHashChange: true }}
                  strategy="lazyOnload"
                />
                {(() => {
                  switch (layoutType) {
                    case 'SSR':
                      return <Component {...pageProps} />
                    case 'BLANK':
                      return (
                        <LimitLayout layout={layoutType}>
                          <Component {...pageProps} />
                        </LimitLayout>
                      )
                    default:
                      return (
                        <Layout layout={layoutType}>
                          <Component {...pageProps} />
                        </Layout>
                      )
                  }
                })()}
              </>
            )}
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
