import { ReactNode, useEffect, useMemo, useState } from 'react'
import cn from 'classnames'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

import Header from '~/components/common/layouts/Header'
import TranslationProvider from '~/components/common/utils/TranslationProvider'
import Activity from '~/components/contents/common/activity/Activity'
import ActivityCancelPopup from '~/components/contents/common/activity/ActivityCancelPopup'
import Email from '~/components/contents/common/email'
import EmailContactInfoPopup from '~/components/contents/common/email/EmailContactInfoPopup'
import EmailNoticePopup from '~/components/contents/common/email/EmailNoticePopup'
import EmailPreviewPopup from '~/components/contents/common/email/EmailPreviewPopup'
import EmailReleaseConfirmPopup from '~/components/contents/common/email/EmailReleaseConfirmPopup'
import EmailReleasePopup from '~/components/contents/common/email/EmailReleasePopup'
import EmailCancelPopup from '~/components/contents/common/email/MediaPopup/EmailCancelPopup'
import EmailMediaPopup from '~/components/contents/common/email/MediaPopup/EmailMediaPopup'
import LicenseInformationPopup from '~/components/contents/common/licensePopup/LicensePopup'
import MbUserCountLimitPopup from '~/components/contents/common/popup/MbUserCountLimitPopup'
import GloablSearchPopup from '~/components/contents/common/search/GlobalSearchPopup'
import Shared from '~/components/contents/common/shared/SharedPopup'
import SharedReleasePopup from '~/components/contents/common/shared/SharedReleasePopup'
import UserInformationPopup from '~/components/contents/common/userPopup/UserInformationPopup'
import RequestPopup from '~/components/example/InquiryTest'
import { resetState } from '~/stores/reducer'
import type { LayoutKeys } from '~/types/common'
import { useAppDispatch } from '~/utils/hooks/common/useRedux'
import { useLayout } from '~/utils/hooks/contents/layout/useLayout'

interface Props {
  layout?: LayoutKeys | undefined
  noLoginHeader?: boolean
  children: ReactNode
}

// 상수 분리
const SPECIAL_LAYOUTS = ['BLANK', 'PAYMENT'] as const

const Layout = ({ layout, noLoginHeader, children }: Props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { checkUrl } = useLayout({
    layout,
    noLoginHeader,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isCheckingUrl = false
    let isMounted = true
    let previousPathname = router.pathname

    const handleStart = () => {
      if (!isCheckingUrl && isMounted) {
        if (previousPathname !== router.pathname) {
          setIsLoading(true)
        }
      }
    }

    const handleComplete = () => {
      if (!isCheckingUrl && isMounted) {
        setIsLoading(false)
      }
    }

    const checkAuthAndRedirect = async () => {
      // if (previousPathname === router.pathname) {
      //   setIsLoading(false)
      //   return
      // }

      previousPathname = router.pathname
      isCheckingUrl = true
      if (isMounted) setIsLoading(true)

      try {
        const result = await checkUrl()

        if (!isMounted) return // 컴포넌트가 언마운트된 경우 처리 중단

        switch (result.code) {
          case 'signOut':
            dispatch(resetState())
            Cookie.remove('ACCESS_TOKEN_NAME')
            console.log('useSignOut signOut =====================> /member/login')
            await router.replace({
              pathname: '/member/login',
            })
            break
          case 'replace':
            await router.replace(result.url)
            break
          case 'push':
            await router.push(result.url)
            break
        }
      } catch (error) {
        console.error('Navigation check failed:', error)
      } finally {
        isCheckingUrl = false
        if (isMounted) setIsLoading(false)
      }
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    checkAuthAndRedirect()

    return () => {
      isMounted = false
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router.pathname])

  const isSpecialLayout = useMemo(() => SPECIAL_LAYOUTS.includes(layout as (typeof SPECIAL_LAYOUTS)[number]), [layout])

  return (
    <>
      {isSpecialLayout && children}
      {!isLoading && !isSpecialLayout ? (
        <TranslationProvider>
          <div className={cn('mb-wrap', `layout${layout ? Number(layout.replace('LAYOUT', '')) : 1}`)}>
            <Header />
            {children}
          </div>
          <MbUserCountLimitPopup />
          <RequestPopup />
          <Email />
          <EmailNoticePopup />
          <EmailContactInfoPopup />
          <EmailPreviewPopup />
          <EmailMediaPopup />
          <EmailReleaseConfirmPopup />
          <EmailReleasePopup />
          <EmailCancelPopup />
          <Shared />
          <SharedReleasePopup />
          <Activity />
          <ActivityCancelPopup />
          <GloablSearchPopup />
          <UserInformationPopup />
          <LicenseInformationPopup />
        </TranslationProvider>
      ) : (
        <div>
          {/*{!isSpecialLayout && (*/}
          {/*  <Loader*/}
          {/*    screen={'full'}*/}
          {/*    zIndex={2}*/}
          {/*  />*/}
          {/*)}*/}
        </div>
      )}
    </>
  )
}

export default Layout
