import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { shareCodeAction } from '~/stores/modules/contents/auth/auth'
import {
  listOptionsAction,
  shareSettingDataAction,
  shareSettingDataProps,
  shareSettingLoadingAction,
} from '~/stores/modules/contents/setting/setting'
import type { BaseResponseCommonObject } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { apiGetCommonCode, CommonCode, useGetCommonCode } from '~/utils/api/common/useGetCommonCode'
import { usePutSharePolicy } from '~/utils/api/setting/policy/usePutSharePolicy'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useShareSettingDefaults = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { userInfo, licenseInfo, frequentlyUsedCommonCode, shareCode } = useAppSelector(state => state.authSlice)
  const { shareSettingLoading, shareSettingData, listOptions } = useAppSelector(state => state.userSettingSlice)

  const apiPutSharePolicy = usePutSharePolicy()
  const updatePolicy = async (params: shareSettingDataProps, origins: shareSettingDataProps, setDefault?: boolean) => {
    const param = {
      list: params.pressMediaListPolicy.id,
      jrnlstMediaSrch: params.pressMediaCustomSearchPolicy.id,
      clipbook: params.clipbookPolicy.id,
      news_search: params.monitoringPolicy.id,
      project: params.projectPolicy.id,
      action: params.activityPolicy.id,
      distribute: params.distributionPolicy.id,
    }
    const { status, message } = await apiPutSharePolicy.mutateAsync({
      id: userInfo?.userId || 0,
      policyInfo: param,
    })
    if (status === 'S') {
      openToast(setDefault ? '초기 상태로 변경되었습니다.' : message?.message, 'success')
      dispatch(shareCodeAction(param))
    } else {
      openToast(message?.message, 'error')
    }
    dispatch(shareSettingDataAction({ ...params }))
  }

  const handleSelectPolicy = (category: string, e: SelectListOptionItem, params: shareSettingDataProps) => {
    let policyInfo = {
      isLoading: false,
      pressMediaListPolicy: category === 'list' ? e : params.pressMediaListPolicy,
      pressMediaCustomSearchPolicy: category === 'jrnlstMediaSrch' ? e : params.pressMediaCustomSearchPolicy,
      clipbookPolicy: category === 'clipbook' ? e : params.clipbookPolicy,
      monitoringPolicy: category === 'news_search' ? e : params.monitoringPolicy,
      projectPolicy: category === 'project' ? e : params.projectPolicy,
      activityPolicy: category === 'action' ? e : params.activityPolicy,
      distributionPolicy: category === 'distribute' ? e : params.distributionPolicy,
    }
    updatePolicy(policyInfo, params)
  }

  const init = async () => {
    dispatch(shareSettingLoadingAction(true))
    let preCommonCodeList: CommonCode[] = []
    const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === 'USER_SHARE_POLICY')
    //@ts-ignore
    if (find && find.commonCodeList && find.commonCodeList.length > 0) {
      //@ts-ignore
      preCommonCodeList = find.commonCodeList
    } else {
      preCommonCodeList = await getCommonCode('USER_SHARE_POLICY')
    }
    const listOptions = preCommonCodeList.map(e => {
      return {
        id: e.code,
        name:
          e.code === 'WRITABLE'
            ? '수정 (동료가 볼 수 있고 추가, 수정, 삭제 가능)'
            : e.code === 'READABLE'
            ? '공개 (동료가 볼 수 있으나 수정은 할 수 없음)'
            : '비공개 (소유자만 보고 수정할 수 있음)',
      }
    })
    const activityPolicy = listOptions.find(e => e.id === shareCode.action)
    const clipbookPolicy = listOptions.find(e => e.id === shareCode.clipbook)
    const pressMediaListPolicy = listOptions.find(e => e.id === shareCode.list)
    const monitoringPolicy = listOptions.find(e => e.id === shareCode.news_search)
    const projectPolicy = listOptions.find(e => e.id === shareCode.project)
    const pressMediaCustomSearchPolicy = listOptions.find(e => e.id === shareCode.jrnlstMediaSrch)
    const distributionPolicy = listOptions.find(e => e.id === shareCode.distribute)
    const shareSettingData = {
      isLoading: false,
      pressMediaListPolicy: pressMediaListPolicy ? pressMediaListPolicy : { id: '', name: '' },
      pressMediaCustomSearchPolicy: pressMediaCustomSearchPolicy ? pressMediaCustomSearchPolicy : { id: '', name: '' },
      clipbookPolicy: clipbookPolicy ? clipbookPolicy : { id: '', name: '' },
      monitoringPolicy: monitoringPolicy ? monitoringPolicy : { id: '', name: '' },
      projectPolicy: projectPolicy ? projectPolicy : { id: '', name: '' },
      activityPolicy: activityPolicy ? activityPolicy : { id: '', name: '' },
      distributionPolicy: distributionPolicy ? distributionPolicy : { id: '', name: '' },
    }
    dispatch(listOptionsAction({ shareSettingData, listOptions }))
    dispatch(shareSettingLoadingAction(false))
  }

  const getCommonCode = async (code: string) => {
    let list: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: code })
    if (status === 'S') {
      list = data as CommonCode[]
    }
    return list
  }

  return {
    userInfo,
    shareSettingData,
    listOptions,
    licenseInfo,
    shareCode,
    shareSettingLoading,

    updatePolicy,
    init,
    handleSelectPolicy,
  }
}
