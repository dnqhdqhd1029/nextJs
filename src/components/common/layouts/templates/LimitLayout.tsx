import { ReactNode, useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

import { ACCESS_TOKEN_NAME } from '~/constants/common'
import type { LayoutKeys } from '~/types/common'
import { useSignOut } from '~/utils/hooks/common/useSignOut'

interface Props {
  layout?: LayoutKeys | undefined
  noLoginHeader?: boolean
  children: ReactNode
}

const LimitLayout = ({ layout, children }: Props) => {
  const router = useRouter()
  const { simpleSignOut, signOut } = useSignOut()
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('LimitLayout checkUrl!!! props.layout ==============', layout)
    console.log('LimitLayout checkUrl!!! props.accessToken ==============', accessToken)
    console.log('LimitLayout checkUrl!!! props.router.pathname ==============', router.pathname)

    if (accessToken !== '') {
      if (router.pathname.startsWith('/help')) {
        console.log(
          "accessToken.token !== '' && router.pathname.startsWith('/help') ==================================>>>>>>>>>>>>>>>>>> "
        )
      } else {
        console.log("accessToken.token !== '' ==================================>>>>>>>>>>>>>>>>>> logout")
        if (router.pathname !== '/member/login-blocked' && router.pathname !== '/member/user-certification') {
          simpleSignOut()
        }
      }
      setIsLoading(() => false)
    } else {
      if (router.pathname === '/help/my-inquiry') {
        console.log(
          "accessToken.token === '' && router.pathname === '/help/my-inquiry' ==================================>>>>>>>>>>>>>>>>>> /member/login"
        )
        signOut()
      } else {
        console.log("accessToken.token === '' ==================================>>>>>>>>>>>>>>>>>>")
        setIsLoading(() => false)
      }
    }
  }, [router.pathname])

  if (isLoading) {
    return null
  }

  return <>{children}</>
}

export default LimitLayout
