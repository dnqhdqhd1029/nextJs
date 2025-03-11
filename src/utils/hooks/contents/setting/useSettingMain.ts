import moment from 'moment'

import { setUserSelectGroupAction } from '~/stores/modules/contents/auth/auth'
import { selectDefaultUserGroupAction } from '~/stores/modules/contents/header/header'
import { settingMainLoadingAction, settingUserHomeDataAction } from '~/stores/modules/contents/setting/setting'
import { GroupDtoForUser, type NoticePolicyDto } from '~/types/api/service'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import type { GroupDto } from '~/utils/api/group/useGetGroupSearch'
import { apiGetNewsAlertsReceiveEmail } from '~/utils/api/newsAlert/useGetNewsAlertsReceiveEmail'
import { apiGetNoticePolicy } from '~/utils/api/setting/noticePolicy/useGetNoticePolicy'
import { apiAllGroupByUser, usePutUserSelectGroup } from '~/utils/api/user/usePutUserSelectGroup'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useSettingMain = () => {
  const dispatch = useAppDispatch()
  const { userInfo, landingPage, timeZoneData, frequentlyUsedCommonCode, licenseInfo, userSelectGroup } =
    useAppSelector(state => state.authSlice)
  const { settingMainLoading, settingUserHomeData } = useAppSelector(state => state.userSettingSlice)

  const updateUserSelectGroup = usePutUserSelectGroup()

  const changeSelectedGroup = async (group: GroupDto) => {
    const { status, message } = await updateUserSelectGroup.mutateAsync({ id: Number(group.groupId) })
    if (status === 'S') {
      openToast(message?.message, 'success')
      dispatch(setUserSelectGroupAction(Number(group.groupId)))
      dispatch(
        selectDefaultUserGroupAction({
          currentGroup: group as GroupDtoForUser,
          groupBar: status !== 'S',
          isLoading: false,
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }

  const getuserAllGroup = async () => {
    let res: GroupDto[] = []
    try {
      const { status, data, message } = await apiAllGroupByUser()
      if (status === 'S') {
        res = data as GroupDto[]
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {
      console.error('>> checkLicense error', e)
    }
    return res
  }

  const getNoticePolicy = async () => {
    let res: NoticePolicyDto | null = null
    try {
      const { status, data, message } = await apiGetNoticePolicy()
      if (status === 'S') {
        res = data as NoticePolicyDto
      }
    } catch (e) {
      console.error('>> getNoticePolicy error', e)
    }
    return res
  }

  const getNewsAlertsReceiveEmail = async () => {
    let res = false
    try {
      const { status, data, message } = await apiGetNewsAlertsReceiveEmail()
      if (status === 'S') {
        res = !!data
      }
    } catch (e) {
      console.error('>> getNewsAlertsReceiveEmail error', e)
    }
    return res
  }

  const getCommonCode = async (code: string) => {
    let list: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: code })
    if (status === 'S') {
      list = data as CommonCode[]
    }
    return list
  }

  const initSettingUser = async () => {
    dispatch(settingMainLoadingAction(true))
    const storeAllGroups = await getuserAllGroup()
    const noticeFlagActive = await getNoticePolicy()
    const noticeNewsAlarm = await getNewsAlertsReceiveEmail()
    dispatch(
      settingUserHomeDataAction({
        license: `${licenseInfo?.mainProductName || '-'} (${
          licenseInfo?.startAt ? moment(licenseInfo.startAt).format('YYYY-MM-DD') : '-'
        }~${licenseInfo?.expireAt ? moment(licenseInfo.expireAt).format('YYYY-MM-DD') : '-'})`,
        companyNm: userInfo?.company?.name || '-',
        role: userInfo.role === 'ADMIN' ? '관리자' : '사용자',
        groups: storeAllGroups,
        timeZone: timeZoneData.name,
        newsAlarm: noticeNewsAlarm,
        flagActive: noticeFlagActive ? noticeFlagActive?.flagActive || false : false,
        landingPage: landingPage && landingPage.length > 0 ? landingPage[0]?.name || '홈' : '홈',
        regisAt: userInfo?.regisAt ? moment(userInfo?.regisAt).format('YYYY-MM-DD HH:mm') : '-',
        lastLoginAt: userInfo?.lastLoginAt ? moment(userInfo?.lastLoginAt).format('YYYY-MM-DD HH:mm') : '-',
      })
    )
  }

  return {
    userInfo,
    licenseInfo,
    userSelectGroup,
    settingUserHomeData,
    settingMainLoading,
    landingPage,

    initSettingUser,
    changeSelectedGroup,
  }
}
