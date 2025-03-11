import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import { TRANSLATION_ITEMS_SUB } from '~/components/common/layouts/Header/defaultData'
import { LANDINGPAGE_LINKS } from '~/constants/common/navigationLinks'
import { globalNotiAction, NotiProps, setUserSelectGroupAction } from '~/stores/modules/contents/auth/auth'
import { initEmailPopupAction } from '~/stores/modules/contents/email/email'
import { userAutoSaveDataInitAction } from '~/stores/modules/contents/extraData/extra'
import {
  allGroupByUserLoadingAction,
  currentNaviBarAction,
  groupBarAction,
  isChangedGroupAction,
  isLoadingAction,
  menuBarAction,
  naviBarAction,
  selectDefaultUserGroupAction,
  subMenusProps,
  userGroupsAction,
} from '~/stores/modules/contents/header/header'
import { GroupDtoForUser } from '~/types/api/service'
import { NavigationLinkItem } from '~/types/common'
import { apiSignOut } from '~/utils/api/auth/useSignIn'
import type { GroupDto } from '~/utils/api/group/useGetGroupSearch'
import { useCheckedNotificationList } from '~/utils/api/notification/useNotification'
import { apiAllGroupByUser, usePutUserSelectGroup } from '~/utils/api/user/usePutUserSelectGroup'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'
import { useSignOut } from '~/utils/hooks/common/useSignOut'

export const useHeader = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { signOut } = useSignOut()

  const menuNavigationRef = useRef<HTMLUListElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const globalCloseFnRef = useRef<() => void>()
  const contentCloseFnRef = useRef<() => void>()

  const {
    currentNaviBar,
    naviBar,
    menuNavigationList,
    menuLinks,
    menuBar,
    isLoading,
    groupBar,
    currentGroup,
    userAllGroups,
    useAllGroupByUserLoading,
  } = useAppSelector(state => state.headerSlice)
  const { isEdit, reUrl } = useAppSelector(state => state.pressReleaseSlice)
  const { isDemoLicense, licenseInfo, userInfo, landingPage, userSelectGroup, globalNoti, shareCodeData } =
    useAppSelector(state => state.authSlice)

  const updateUserSelectGroup = usePutUserSelectGroup()
  const checkedNotificationList = useCheckedNotificationList()

  const setMenuBar = useCallback(async (item: boolean) => dispatch(menuBarAction(item)), [isLoading])
  const setNaviBarBar = useCallback(
    async (item: string, origins: string) => dispatch(naviBarAction(origins === item ? '' : item)),
    [naviBar]
  )

  const setGroupBar = useCallback(
    async (item: boolean) => {
      if (item) {
        await allGroupByUserList()
      }
      dispatch(groupBarAction(item))
    },
    [groupBar]
  )

  const headNotificationAction = async (i: NotiProps, list: NotiProps[]) => {
    const remove = list.filter(e => e.key !== i.key)
    if (i.title) {
      const { status, message } = await checkedNotificationList.mutateAsync(Number(i.key))
      if (status === 'S') {
        dispatch(globalNotiAction(remove))
      } else {
        openToast(message?.message, 'error')
      }
    } else {
      dispatch(globalNotiAction(remove))
    }
  }

  const onNaviButton = async (item: subMenusProps) => {
    if (!item) return
    if (router.asPath === item.link) {
      router.reload()
    } else {
      if (item.link === '/email') {
        dispatch(initEmailPopupAction({ key: 1, name: userInfo.name ?? '-', scrop: shareCodeData.distribute }))
      } else if (item.id === 'briefing') {
        window.open('https://www.mediabee.com/media-brief', '_blank')
      } else {
        await router.push(`${item.link}`)
      }
    }
  }

  const moveLink = async (path: NavigationLinkItem) => {
    if (path.pathLink === '/logout') {
      const { status, data, message } = await apiSignOut()
      if (status === 'S') {
        signOut()
      }
    } else {
      if (path.pathLink && path.link && router.pathname !== path.pathLink) {
        dispatch(menuBarAction(false))
        let movePath = ''
        let isExpired = false
        if (licenseInfo?.isExpired !== undefined) isExpired = licenseInfo?.isExpired
        if (path.id === 'setting') {
          let flag = true
          if (!licenseInfo?.flagUser && !licenseInfo?.flagGroup) flag = false
          movePath = flag ? path.pathLink : path.link
        } else {
          movePath = path.pathLink
        }
        await router.push(isExpired ? '/setting/member/information' : movePath)
      }
    }
  }

  const changeGroupAndMove = async (group: GroupDto, currents: GroupDtoForUser) => {
    let temp = currents
    dispatch(isLoadingAction(true))
    const { status, message } = await updateUserSelectGroup.mutateAsync({ id: group.groupId as number })
    if (status === 'S') {
      temp = group as GroupDtoForUser
      dispatch(setUserSelectGroupAction(group.groupId))
      dispatch(userAutoSaveDataInitAction())
      if (landingPage && landingPage.length > 0) {
        const find = LANDINGPAGE_LINKS.find(e => e.code === landingPage[0].code)
        await router.replace(`${find?.link}`, undefined, { shallow: true })
        router.reload()
      } else {
        await router.replace('/dashboard', undefined, { shallow: true })
        router.reload()
      }
    } else {
      openToast(message?.message, 'error')
    }
    dispatch(selectDefaultUserGroupAction({ currentGroup: temp, groupBar: status !== 'S', isLoading: false }))
  }

  const selectDefaultUserGroup = async (group: GroupDto, currents: GroupDtoForUser) => {
    if (!group.groupId) return
    if (currentGroup?.groupId === group.groupId) return
    console.log('router.pathname', router.pathname)
    if ((router.pathname === '/press-release' && isEdit) || router.pathname === '/newswire') {
      dispatch(isChangedGroupAction(group as GroupDtoForUser))
      if (landingPage && landingPage.length > 0) {
        const find = LANDINGPAGE_LINKS.find(e => e.code === landingPage[0].code)
        console.log(`${find?.link}`, `${find?.link}`)
        await router.replace(`${find?.link}`)
      } else {
        await router.replace('/dashboard')
      }
    } else {
      await changeGroupAndMove(group, currents)
    }
  }

  const allGroupByUserList = async () => {
    dispatch(allGroupByUserLoadingAction(true))
    const { status, data, message } = await apiAllGroupByUser()
    if (status === 'S') {
      const res = data as GroupDto[]
      console.log('allGroupByUserList', res)
      dispatch(userGroupsAction(res))
    } else {
      openToast(message?.message, 'error')
    }
    dispatch(allGroupByUserLoadingAction(false))
  }

  useEffect(() => {
    const find = TRANSLATION_ITEMS_SUB.find(e => e.link === router.pathname)
    dispatch(currentNaviBarAction(find ? find.id : ''))
  }, [router.pathname])

  return {
    licenseInfo,
    userInfo,
    userSelectGroup,
    isLoading,
    currentGroup,
    containerRef,
    groupBar,
    globalNoti,
    globalCloseFnRef,
    contentCloseFnRef,
    menuRef,
    menuBar,
    menuLinks,
    menuNavigationRef,
    menuNavigationList,
    naviBar,
    currentNaviBar,
    userAllGroups,
    useAllGroupByUserLoading,
    isDemoLicense,

    moveLink,
    selectDefaultUserGroup,
    onNaviButton,
    headNotificationAction,

    setNaviBarBar,
    setMenuBar,
    setGroupBar,
  }
}
