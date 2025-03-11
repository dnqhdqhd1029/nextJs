import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

import {
  initCreateNewsAlertsPopup,
  initNewsAlertListAction,
  initSettingDataAction,
  initUserPopupAction,
  newsAlertListAction,
  newsAlertParamKeywordAction,
  newsAlertSearchParamsAction,
  newsAlertsSearchParamsProps,
  setNewsAlertSettingAction,
  settingPageDataType,
  userPopupAction,
} from '~/stores/modules/contents/newsAlert/newsAlert'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import {
  BaseResponseCommonObject,
  NewsAlertDto,
  NewsAlertListDto,
  PageActionDtoForList,
  UserDto,
} from '~/types/api/service'
import { useGetNewsAlertsReceiveEmail } from '~/utils/api/newsAlert/useGetNewsAlertsReceiveEmail'
import { apiGetOneNewsAlerts } from '~/utils/api/newsAlert/useGetOneNewsAlerts'
import { usePostNewsAlertsList } from '~/utils/api/newsAlert/usePostNewsAlertsList'
import { usePutNewsAlertsReceiveEmail } from '~/utils/api/newsAlert/usePutNewsAlertsReceiveEmail'
import { useGetOneUserOption } from '~/utils/api/user/useGetOneUser'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useNewsAlertsList = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    currentNewsSrchId,
    newsAlertsSettingData,
    newsAlertsReceiveData,
    currentNewsAlert,
    newsAlertsData,
    newsAlertParamKeyword,
    newsAlertSearchParams,
    userPopup,
  } = useAppSelector(state => state.newsAlertSlice)
  const apiPutNewsAlertsReceiveEmail = usePutNewsAlertsReceiveEmail()

  const initNewsAlertList = () => dispatch(initNewsAlertListAction())

  const setUserProfilePopupAction = useCallback(() => dispatch(initUserPopupAction()), [userPopup])

  const openUserProfilePopupAction = useCallback(
    (id: number) => {
      dispatch(
        userInformationPopupAction({
          isOpen: true,
          idKey: Number(id),
          userId: 0,
          name: '',
          email: '',
          mobile: '',
          phone: '',
          nickname: '',
          displayName: '',
          stateCode: '',
          role: '',
          department: '',
          position: '',
          timezone: '',
          landingPage: '',
          selectedGroupId: 0,
          receiveLetter: true,
          regisAt: '',
          lastLoginAt: '',
          passwdChangeAt: '',
          company: {
            companyId: 0,
            name: '',
            totalMembers: '',
            wsite: '',
          },
          groups: [],
        })
      )
    },
    [userPopup]
  )

  const {
    isLoading,
    data: listData,
    refetch: listRefetch,
  } = usePostNewsAlertsList(newsAlertSearchParams, { enabled: router.pathname === '/setting/news-notifier' })

  console.log('listData', listData)

  const { data: apiGetOneUser } = useGetOneUserOption(userPopup.key > 0 ? userPopup.key : 0)

  const { data: newsAlertsReceiveEmail } = useGetNewsAlertsReceiveEmail({
    enabled: router.pathname === '/setting/news-notifier',
  })

  console.log('currentNewsSrchId', currentNewsSrchId)

  const init = async () => {
    if (currentNewsSrchId) {
      const newsAlertData = await getNewsAlertData(currentNewsSrchId)
      if (newsAlertData !== null) {
        let settingData: settingPageDataType = {
          title: newsAlertData.title || '',
          titleErr: '',
          content: newsAlertData.content || '',
          sortOption: newsAlertData.sortOption || 'INSERTED',
        }
        dispatch(initSettingDataAction(settingData))
      } else {
        dispatch(initCreateNewsAlertsPopup())
      }
    } else {
      dispatch(initCreateNewsAlertsPopup())
    }
  }

  const getNewsAlertData = async (id: number) => {
    let res = null
    const { data, status, message } = await apiGetOneNewsAlerts({
      id,
    })
    if (status === 'S') {
      res = data as NewsAlertDto
    } else {
      openToast(message?.message, 'error')
    }
    return res
  }

  const newsAlertSettingReceiveNewsAlertChange = async (receiveNewsAlert: boolean) => {
    const { status, message } = await apiPutNewsAlertsReceiveEmail.mutateAsync({
      request: { receiveNewsAlert },
    })
    if (status === 'S') {
      dispatch(setNewsAlertSettingAction(receiveNewsAlert))
      openToast('뉴스 알리미 이메일 수신을 수정했습니다.', 'success')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setNewsAlertParamKeywordAction = useCallback(
    (e: string) => dispatch(newsAlertParamKeywordAction(e)),
    [newsAlertParamKeyword]
  )

  const handleSetSearchParam = (param: newsAlertsSearchParamsProps) => {
    dispatch(newsAlertSearchParamsAction(param))
  }

  useEffect(() => {
    if (!apiGetOneUser) return
    const { status, data: apiData, message } = apiGetOneUser as BaseResponseCommonObject
    if (status === 'S') {
      const res = apiData as UserDto
      const param = {
        email: res?.email || '',
        nickName: res?.displayName || '-',
        phone: res?.phone || '',
        mobile: res?.mobile || '',
        role: res?.role === 'ADMIN' ? '관리자' : '사용자',
        isOpen: true,
        type: 'userProfile',
        key: 0,
      }
      dispatch(userPopupAction(param))
    } else {
      const param = {
        isOpen: false,
        type: '',
        key: 0,
        email: '',
        nickName: '',
        phone: '',
        mobile: '',
        role: '',
      }
      openToast(message?.message, 'error')
      dispatch(userPopupAction(param))
    }
  }, [apiGetOneUser])

  useEffect(() => {
    if (!listData) return
    const { status, code, data, message } = listData as BaseResponseCommonObject
    if (status === 'S') {
      const { content, totalElements, totalPages } = data as PageActionDtoForList
      dispatch(
        newsAlertListAction({
          content: (content as NewsAlertListDto[]) || [],
          pageCount: {
            totalCount: totalElements || 0,
            totalPageCount: totalPages || 1,
          },
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }, [listData])

  useEffect(() => {
    if (!newsAlertsReceiveEmail) return
    const { status, data, message } = newsAlertsReceiveEmail
    if (status === 'S') {
      dispatch(setNewsAlertSettingAction(!!data))
    }
  }, [newsAlertsReceiveEmail])

  return {
    newsAlertsSettingData,
    newsAlertsReceiveData,
    currentNewsSrchId,
    currentNewsAlert,
    userPopup,
    newsAlertsData,
    newsAlertParamKeyword,
    newsAlertSearchParams,

    newsAlertSettingReceiveNewsAlertChange,
    init,
    initNewsAlertList,
    setUserProfilePopupAction,
    openUserProfilePopupAction,
    setNewsAlertParamKeywordAction,
    handleSetSearchParam,
    listRefetch,
  }
}
