import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

import { setLogOutAction } from '~/stores/modules/contents/auth/auth'
import { resetState } from '~/stores/reducer'
import { useAppDispatch } from '~/utils/hooks/common/useRedux'

export const useSignOut = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const signOut = () => {
    dispatch(resetState())
    Cookie.remove('ACCESS_TOKEN_NAME')
    console.log('useSignOut signOut =====================> /member/login')
    router.replace({
      pathname: '/member/login',
    })
  }

  const simpleSignOut = () => {
    dispatch(resetState())
    Cookie.remove('ACCESS_TOKEN_NAME')
    console.log('useSignOut simpleSignOut =====================> /member/login')
  }
  return {
    signOut,
    simpleSignOut,
  }
}
