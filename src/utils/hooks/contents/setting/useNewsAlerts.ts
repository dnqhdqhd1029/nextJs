import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

import {
  emailReceiveDateType,
  fromSettingToReceiveAction,
  initCreateNewsAlertsPopup,
  initSettingDataAction,
  receivePageDataType,
  setNewsAlertAction,
  setNewsAlertsReceivePageDataAction,
  setNewsAlertsSettingPageDataAction,
  settingPageDataType,
  tabAction,
} from '~/stores/modules/contents/newsAlert/newsAlert'
import { BaseResponseCommonObject, NewsAlertDto, NewsAlertScheduleDto, ScheduleRow } from '~/types/api/service'
import type { SelectListOptionItem, StepItem } from '~/types/common'
import { apiGetNewsAlertsSchedules } from '~/utils/api/newsAlert/useGetNewsAlertsSchedules'
import { apiGetOneNewsAlerts, useGetOneNewsAlerts } from '~/utils/api/newsAlert/useGetOneNewsAlerts'
import { usePostNewsAlertsCreate } from '~/utils/api/newsAlert/usePostNewsAlerts'
import { usePostNewsAlertsSchedulesCreate } from '~/utils/api/newsAlert/usePostNewsAlertsSchedules'
import { usePutNewsAlerts } from '~/utils/api/newsAlert/usePutNewsAlerts'
import { usePutNewsAlertsSchedules } from '~/utils/api/newsAlert/usePutNewsAlertsSchedules'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useNewsAlerts = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { currentNewsSrchId, newsAlertsStep, newsAlertsSettingData, newsAlertsReceiveData, currentNewsAlert } =
    useAppSelector(state => state.newsAlertSlice)

  const { licenseInfo } = useAppSelector(state => state.authSlice)
  const mainProductInfo = licenseInfo.productList?.find(e => e.name === licenseInfo.mainProductName)

  const apiPostNewsAlerts = usePostNewsAlertsCreate()
  const apiPutNewsAlerts = usePutNewsAlerts()
  const apiPostNewsAlertsSchedules = usePostNewsAlertsSchedulesCreate()
  const apiPutNewsAlertsSchedules = usePutNewsAlertsSchedules()

  const { data: newsAlertsData, refetch: dataRefetch } = useGetOneNewsAlerts(
    {
      id: currentNewsSrchId || 0,
    },
    { enabled: router.pathname === '/news/saved-search-manage' || router.pathname === '/setting/news-notifier' }
  )

  const settingStepValidate = (props: settingPageDataType) => {
    let isProcess = true
    let titleErr = ''
    if (props.title === '') {
      titleErr = '제목을 입력하세요.'
      isProcess = false
    }
    if (!isProcess) {
      dispatch(
        setNewsAlertsSettingPageDataAction({
          ...props,
          titleErr,
        })
      )
    }
    return isProcess
  }

  const receiveStepValidate = (props: receivePageDataType) => {
    let isProcess = true
    let selectedReceiveErr = ''
    let expireAtErr = ''
    if (props.schedules && props.schedules.length < 1) {
      selectedReceiveErr = '수신 시간을 선택하세요.'
      isProcess = false
    }
    if (props.hasExpireAt && props.expireAt === null) {
      expireAtErr = '종료일은 필수 입력 항목입니다.'
      isProcess = false
    }

    if (props.hasExpireAt && props.expireAt === null) {
      expireAtErr = '알리미가 중단되었습니다. 알리미를 재개하려면 종료일을 다시 선택하세요.'
      isProcess = false
    }
    if (!isProcess) {
      dispatch(
        setNewsAlertsReceivePageDataAction({
          ...props,
          selectedReceiveErr,
          expireAtErr,
        })
      )
    }
    return isProcess
  }

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
      // openToast(message?.message, 'error')
    }
    return res
  }

  const getNewsAlertSchedulesData = async (id: number) => {
    let res = null
    const { data, status, message } = await apiGetNewsAlertsSchedules({
      id,
    })
    if (status === 'S') {
      res = data as NewsAlertScheduleDto
    } else {
      // openToast(message?.message, 'error')
    }
    return res
  }

  const fromDataToSetting = async (id: number) => {
    const newsAlertData = await getNewsAlertData(id)
    if (newsAlertData !== null) {
      let settingPageData: settingPageDataType = {
        title: newsAlertData.title || '',
        titleErr: '',
        content: newsAlertData.content || '',
        sortOption: newsAlertData.sortOption || 'INSERTED',
      }
      return {
        settingPageData,
      }
    } else {
      return null
    }
  }

  const fromSettingToReceive = async (id: number) => {
    const newsAlertSchedulesData = await getNewsAlertSchedulesData(id)
    if (newsAlertSchedulesData !== null) {
      let expireAtErr = ''
      if (
        newsAlertSchedulesData.expireAt !== undefined &&
        newsAlertSchedulesData.expireAt !== null &&
        new Date(newsAlertSchedulesData.expireAt) < new Date()
      ) {
        expireAtErr = '알리미가 중단되었습니다. 알리미를 재개하려면 종료일을 다시 선택하세요.'
      } else {
        expireAtErr = ''
      }
      const param: receivePageDataType = {
        emailReceiveDate: {
          emailReceiveDays: ['isMonday', 'isTuesday', 'isWednesday', 'isThursday', 'isFriday'],
          emailReceiveTime: { hours: 0, minutes: 0 },
        },
        emailReceiveErr: '',
        showLink: false,
        schedules: newsAlertSchedulesData.schedules || [],
        selectedReceiveErr: '',
        hasExpireAt: newsAlertSchedulesData.expireAt !== null,
        hasExpireAtErr: '',
        expireAt: newsAlertSchedulesData.expireAt || null,
        expireAtErr,
      }
      dispatch(fromSettingToReceiveAction({ id, param }))
    } else {
      dispatch(fromSettingToReceiveAction({ id }))
    }
  }

  const createNewsAlertsIdAndOut = async (params: settingPageDataType) => {
    let newsAlertsSaveParams: NewsAlertDto = {
      newsSrchId: currentNewsSrchId,
      title: params.title || '',
      content: params.content || '',
      sortOption: params.sortOption,
    }
    return await createNewsAlerts(newsAlertsSaveParams)
  }

  const createNewsAlerts = async (params: NewsAlertDto) => {
    const { status, message, data } = await apiPostNewsAlerts.mutateAsync({
      request: params,
    })
    if (status === 'S') {
      // dispatch(createInitAction())
    } else {
      openToast(message?.message, 'error')
    }
    return status
  }

  const editNewsAlertsIdAndOut = async (params: settingPageDataType) => {
    let newsAlertsUpdateParams: NewsAlertDto = {
      alertId: currentNewsAlert.alertId,
      newsSrchId: currentNewsAlert.newsSrchId,
      title: params.title || '',
      content: params.content || '',
      sortOption: params.sortOption,
    }
    return await editNewsAlerts(newsAlertsUpdateParams)
  }

  const editNewsAlerts = async (params: NewsAlertDto) => {
    const { status, message, data } = await apiPutNewsAlerts.mutateAsync({
      request: params,
    })
    if (status === 'S') {
      // dispatch(createInitAction())
    } else {
      openToast(message?.message, 'error')
    }
    return status
  }

  const createNewsAlertsSchedulesIdAndOut = async (params: receivePageDataType) => {
    let newsAlertsSchedulesSaveParams: NewsAlertScheduleDto = {
      alertId: currentNewsAlert.alertId || 0,
      newsSrchId: currentNewsAlert.newsSrchId,
      schedules: params.schedules,
      expireAt: params.expireAt || undefined,
    }
    return await createNewsAlertsSchedules(newsAlertsSchedulesSaveParams)
  }

  const createNewsAlertsSchedules = async (params: NewsAlertScheduleDto) => {
    const { status, message, data } = await apiPostNewsAlertsSchedules.mutateAsync({
      request: params,
    })
    if (status === 'S') {
      // dispatch(createInitAction())
    } else {
      openToast(message?.message, 'error')
    }
    return status
  }

  const editNewsAlertsSchedulesIdAndOut = async (params: receivePageDataType) => {
    let newsAlertsSchedulesUpdateParams: NewsAlertScheduleDto = {
      alertId: currentNewsAlert.alertId || 0,
      newsSrchId: currentNewsAlert.newsSrchId,
      schedules: params.schedules,
      expireAt: params.expireAt || undefined,
    }
    return await editNewsAlertsSchedules(newsAlertsSchedulesUpdateParams)
  }

  const editNewsAlertsSchedules = async (params: NewsAlertScheduleDto) => {
    const { status, message, data } = await apiPutNewsAlertsSchedules.mutateAsync({
      request: params,
    })
    if (status === 'S') {
      // dispatch(createInitAction())
    } else {
      openToast(message?.message, 'error')
    }
    return status
  }

  const stepChangeAction = useCallback(
    async (e: StepItem) => {
      dispatch(tabAction(e))
    },
    [newsAlertsStep]
  )

  const settingPageDataTitleOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        title: e,
        titleErr: '',
      }
      dispatch(setNewsAlertsSettingPageDataAction(param))
    },
    [newsAlertsSettingData.title]
  )

  const settingPageDataContentOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        content: e,
      }
      dispatch(setNewsAlertsSettingPageDataAction(param))
    },
    [newsAlertsSettingData.content]
  )

  const settingPageDataSortOptionOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        sortOption: e,
      }
      dispatch(setNewsAlertsSettingPageDataAction(param))
    },
    [newsAlertsSettingData.sortOption]
  )

  const receivePageDataEmailReceiveDaysOnChange = useCallback(
    async (checked: boolean, day: string, hook: receivePageDataType) => {
      const currentDays = hook.emailReceiveDate.emailReceiveDays || []
      const updatedDays = checked
        ? [...new Set([...currentDays, day])]
        : currentDays.filter(existingDay => existingDay !== day)
      const param = {
        ...hook,
        emailReceiveErr: '',
        showLink: false,
        emailReceiveDate: {
          emailReceiveDays: updatedDays,
          emailReceiveTime: hook.emailReceiveDate.emailReceiveTime,
        },
      }
      dispatch(setNewsAlertsReceivePageDataAction(param))
    },
    [newsAlertsReceiveData.emailReceiveDate]
  )

  const receivePageDataEmailReceiveTimeOnChange = useCallback(
    async (e: { hours: number; minutes: number }, hook: receivePageDataType) => {
      const param = {
        ...hook,
        emailReceiveErr: '',
        showLink: false,
        emailReceiveDate: {
          emailReceiveDays: hook.emailReceiveDate.emailReceiveDays,
          emailReceiveTime: e,
        },
      }
      dispatch(setNewsAlertsReceivePageDataAction(param))
    },
    [newsAlertsReceiveData.emailReceiveDate]
  )

  const receivePageDataSelectedReceiveDaysOnChange = useCallback(
    async (checked: boolean, rowIdx: number, day: string, hook: receivePageDataType) => {
      const currentSchedules = newsAlertsReceiveData.schedules || []
      const currentDays = currentSchedules[rowIdx] || {}
      const updatedDays = {
        ...currentDays,
        [day]: checked,
      }
      const updatedSchedules = currentSchedules.map((item, index) =>
        index === rowIdx
          ? {
              ...item,
              ...updatedDays,
            }
          : item
      )
      const param = {
        ...hook,
        selectedReceiveDate: updatedSchedules,
      }
      dispatch(setNewsAlertsReceivePageDataAction(param))
    },
    [newsAlertsReceiveData.schedules]
  )

  const receivePageDataSelectedReceiveTimeOnChange = useCallback(
    async (e: { hours: number; minutes: number }, rowIdx: number, hook: receivePageDataType) => {
      const currentSelectedReceiveDate = newsAlertsReceiveData.schedules || []
      const updatedSelectedReceiveDate = currentSelectedReceiveDate.map((item, index) =>
        index === rowIdx
          ? {
              ...item,
              selectedReceiveTime: e,
            }
          : item
      )
      const param = {
        ...hook,
        selectedReceiveDate: updatedSelectedReceiveDate,
      }
      dispatch(setNewsAlertsReceivePageDataAction(param))
    },
    [newsAlertsReceiveData.schedules]
  )

  const checkNewsNoticeDayLimit = (schedules: ScheduleRow[], dayLimit: number) => {
    const dayCount = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    }

    schedules.forEach(entry => {
      if (entry.isMonday) dayCount.Monday++
      if (entry.isTuesday) dayCount.Tuesday++
      if (entry.isWednesday) dayCount.Wednesday++
      if (entry.isThursday) dayCount.Thursday++
      if (entry.isFriday) dayCount.Friday++
      if (entry.isSaturday) dayCount.Saturday++
      if (entry.isSunday) dayCount.Sunday++
    })

    for (const [day, count] of Object.entries(dayCount)) {
      if (count >= dayLimit) {
        return true
      }
    }
  }

  const addSchedule = useCallback(
    async (e: emailReceiveDateType, hook: receivePageDataType) => {
      let isProcess = true
      let emailReceiveErr = ''
      let showLink = false

      if (e.emailReceiveDays.length < 1) {
        emailReceiveErr = '요일을 선택하세요.'
        isProcess = false
      }
      const existSchedule = hook.schedules.some(item => {
        const anyDayMatch = e.emailReceiveDays.some(day => item[day as keyof ScheduleRow])
        const hourMatch = item.hour === e.emailReceiveTime.hours
        const minuteMatch = item.minute === e.emailReceiveTime.minutes
        return anyDayMatch && hourMatch && minuteMatch
      })
      if (existSchedule) {
        emailReceiveErr = '같은 시간을 이미 선택하였습니다.'
        isProcess = false
      }
      if (checkNewsNoticeDayLimit(hook.schedules, mainProductInfo?.newsNoticeDayLimit || 0)) {
        emailReceiveErr = `하루 ${mainProductInfo?.newsNoticeDayLimit}회까지 수신할 수 있습니다.`
        showLink = true
        isProcess = false
      }
      if (!isProcess) {
        const param = {
          ...hook,
          emailReceiveErr,
          showLink,
        }
        dispatch(setNewsAlertsReceivePageDataAction(param))
        return
      }
      const newSchedule: ScheduleRow = {
        isMonday: false,
        isTuesday: false,
        isWednesday: false,
        isThursday: false,
        isFriday: false,
        isSaturday: false,
        isSunday: false,
        hour: 0,
        minute: 0,
      }
      e.emailReceiveDays.forEach(day => {
        if (newSchedule.hasOwnProperty(day)) {
          // @ts-ignore
          newSchedule[day] = true
        }
      })
      newSchedule.hour = e.emailReceiveTime.hours
      newSchedule.minute = e.emailReceiveTime.minutes
      const param = {
        ...hook,
        schedules: [...hook.schedules, newSchedule],
      }
      dispatch(setNewsAlertsReceivePageDataAction(param))
    },
    [newsAlertsReceiveData.schedules]
  )

  const removeSchedule = useCallback(
    async (e: number, hook: receivePageDataType) => {
      const newSchedules = hook.schedules.filter((_, i) => i !== e)
      const param = {
        ...hook,
        schedules: newSchedules,
      }
      dispatch(setNewsAlertsReceivePageDataAction(param))
    },
    [newsAlertsReceiveData.schedules]
  )

  const deleteSelectedReceiveDate = useCallback(
    async (rowIdx: number, hook: receivePageDataType) => {
      const currentSelectedReceiveDate = hook.schedules || []
      const filteredData = currentSelectedReceiveDate.filter((v, idx) => rowIdx !== idx)
      const param = {
        ...hook,
        selectedReceiveDate: filteredData,
      }
      dispatch(setNewsAlertsReceivePageDataAction(param))
    },
    [newsAlertsReceiveData.schedules]
  )

  const receivePageDataHasExpireAtOnChange = useCallback(
    async (e: boolean, hook: receivePageDataType) => {
      const param = {
        ...hook,
        hasExpireAt: e,
        expireAtErr: '',
      }
      dispatch(setNewsAlertsReceivePageDataAction(param))
    },
    [newsAlertsReceiveData.hasExpireAt]
  )

  const receivePageDataExpireAtOnChange = useCallback(
    async (e: Date, hook: receivePageDataType) => {
      const param = {
        ...hook,
        expireAt: e,
        expireAtErr: '',
      }
      dispatch(setNewsAlertsReceivePageDataAction(param))
    },
    [newsAlertsReceiveData.expireAt]
  )

  const actionAndNext = async () => {
    // setIsLoading(() => true)
    const check = await settingStepValidate(newsAlertsSettingData)
    if (check) {
      //   const releaseData = await fromDataToContents(nwReleaseId, editorData)
      //   const res = await editNewswireReleaseIdAndOut(
      //     releaseData ? releaseData.content : contentPageData,
      //     settingPageData,
      //     releaseData ? releaseData.content.content : editorData,
      //     nwReleaseId,
      //     tab.id
      //   )
      //   if (res === 'S') {
      //     releaseData?.content?.filesList &&
      //       contentPageDataFilesOnChange(releaseData?.content?.filesList, contentPageData)
      //     await fromSettingToConfirm(nwReleaseId)
      //   }
      stepChangeAction({ id: 'receive', title: '수신' })
    }
    // setIsLoading(() => false)
  }

  const actionAndPrev = async () => {
    // setIsLoading(() => true)
    // const releaseData = await fromDataToContents(nwReleaseId, editorData)
    // const res = await editNewswireReleaseIdAndOut(
    //   releaseData ? releaseData.content : contentPageData,
    //   settingPageData,
    //   releaseData ? releaseData.content.content : editorData,
    //   nwReleaseId,
    //   tab.id
    // )
    // if (res === 'S') {
    //   releaseData?.content?.filesList && contentPageDataFilesOnChange(releaseData?.content?.filesList, contentPageData)
    //   await tabChangeAction(type)
    // }
    stepChangeAction({ id: 'setting', title: '설정' })
    // setIsLoading(() => false)
  }

  useEffect(() => {
    if (!newsAlertsData) return
    const { status, data, message } = newsAlertsData as BaseResponseCommonObject
    if (status === 'S') {
      const alertData = data as NewsAlertDto
      dispatch(setNewsAlertAction(alertData))
    }
  }, [newsAlertsData, currentNewsSrchId])

  return {
    newsAlertsSettingData,
    newsAlertsReceiveData,
    currentNewsSrchId,
    currentNewsAlert,

    actionAndPrev,
    actionAndNext,
    settingPageDataTitleOnChange,
    settingPageDataContentOnChange,
    settingPageDataSortOptionOnChange,
    receivePageDataEmailReceiveDaysOnChange,
    receivePageDataEmailReceiveTimeOnChange,
    receivePageDataSelectedReceiveDaysOnChange,
    receivePageDataSelectedReceiveTimeOnChange,
    receivePageDataHasExpireAtOnChange,
    receivePageDataExpireAtOnChange,
    addSchedule,
    removeSchedule,
    deleteSelectedReceiveDate,
    createNewsAlertsIdAndOut,
    editNewsAlertsIdAndOut,
    createNewsAlertsSchedulesIdAndOut,
    editNewsAlertsSchedulesIdAndOut,
    settingStepValidate,
    receiveStepValidate,
    getNewsAlertSchedulesData,
    fromDataToSetting,
    fromSettingToReceive,
    stepChangeAction,
    dataRefetch,
    init,
  }
}
