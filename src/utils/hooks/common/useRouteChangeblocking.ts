import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { LANDINGPAGE_LINKS } from '~/constants/common/navigationLinks'
import { setUserSelectGroupAction } from '~/stores/modules/contents/auth/auth'
import { selectDefaultUserGroupAction } from '~/stores/modules/contents/header/header'
import { GroupDtoForUser } from '~/types/api/service'
import { usePutUserSelectGroup } from '~/utils/api/user/usePutUserSelectGroup'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

const useRouteChangeBlocking = (blockingCallback: () => void, isEdit: boolean, setReUrlAction: Function) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isChangedGroup } = useAppSelector(state => state.headerSlice)
  const { landingPage } = useAppSelector(state => state.authSlice)
  const updateUserSelectGroup = usePutUserSelectGroup()

  const [requestedUrl, setRequestedUrl] = useState<string>('')

  const isSamePath = useCallback(
    (nextUrl: string) => router.asPath.split('?')[0] === nextUrl.split('?')[0],
    [router.asPath]
  )

  const syncUrlWithRouter = useCallback(() => {
    // if the user clicked on the browser back button then the url displayed in the browser gets incorrectly updated
    if (router.asPath !== window.location.pathname) {
      window.history.pushState(null, '', router.asPath)
    }
  }, [router.asPath])

  const handleRouterChangeStart = useCallback(
    (url: string) => {
      console.log('isEdit', isEdit)
      if (isEdit) {
        console.log('routeChangeError')
        dispatch(setReUrlAction(url))
        if (isSamePath(url)) {
          return
        }
        syncUrlWithRouter()
        setRequestedUrl(url)
        blockingCallback()
        router.events.emit('routeChangeError')
        throw 'OK, This is Not Error'
      } else {
        console.log('handleRouterChangeStart router.asPath', router.asPath)
        console.log('handleRouterChangeStart router.pathname', router.pathname)
        console.log('handleRouterChangeStart url', url)
        router.events.off('routeChangeStart', handleRouterChangeStart)
        router.replace(url)
      }
    },
    [router.events, syncUrlWithRouter, isSamePath, blockingCallback]
  )

  const offRouteChangeBlocking = useCallback(
    async (offBlockingCallback?: () => void) => {
      await router.events.off('routeChangeStart', handleRouterChangeStart)
      await offBlockingCallback?.()
      if (isChangedGroup?.groupId) {
        const { status, message } = await updateUserSelectGroup.mutateAsync({ id: isChangedGroup.groupId as number })
        if (status === 'S') {
          const find = LANDINGPAGE_LINKS.find(e => e.code === landingPage[0].code)
          dispatch(setUserSelectGroupAction(isChangedGroup?.groupId))
          dispatch(
            selectDefaultUserGroupAction({
              currentGroup: isChangedGroup as GroupDtoForUser,
              groupBar: status !== 'S',
              isLoading: false,
            })
          )
          console.log(`${find?.link}`, `${find?.link}`)
          await router.replace(`${find?.link}`)
        } else {
          openToast(message?.message, 'error')
        }
        //router.push(requestedUrl)
      } else {
        console.log('4 ', requestedUrl)
        requestedUrl !== '' && (await router.push(requestedUrl))
      }
    },
    [handleRouterChangeStart, requestedUrl, router]
  )

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouterChangeStart)
    return () => {
      router.events.off('routeChangeStart', handleRouterChangeStart)
    }
  }, [router.events, handleRouterChangeStart])

  return { offRouteChangeBlocking }
}

export default useRouteChangeBlocking
