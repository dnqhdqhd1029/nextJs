import { ChangeEvent, useEffect } from 'react'

import {
  systemAlarmDataAction,
  systemAlarmDataProps,
  systemAlarmLoadingAction,
} from '~/stores/modules/contents/setting/setting'
import { BaseResponseCommonObject, type ModifyNoticePolicyDto, type NoticePolicyDto } from '~/types/api/service'
import { apiGetNoticePolicy, useGetNoticePolicy } from '~/utils/api/setting/noticePolicy/useGetNoticePolicy'
import { usePutNoticePolicy, UsePutNoticePolicyParams } from '~/utils/api/setting/noticePolicy/usePutNoticePolicy'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useSystemAlarm = () => {
  const dispatch = useAppDispatch()

  const { systemAlarmLoading, systemAlarmData } = useAppSelector(state => state.userSettingSlice)

  const updateNoticePolicyInfo = usePutNoticePolicy()

  const init = async () => {
    dispatch(systemAlarmLoadingAction(true))
    const { status, data, message } = await apiGetNoticePolicy()
    if (status === 'S') {
      const cData = data as NoticePolicyDto
      const params = {
        isLoading: false,
        flagActive: cData.flagActive ?? false,
        addCommentAddCommentContent: cData.addCommentAddCommentContent ?? false,
        modifyContentAddCommentContent: cData.modifyContentAddCommentContent ?? false,
        modifyContentCuContent: cData.modifyContentCuContent ?? false,
        addCommentOwnerContent: cData.addCommentOwnerContent ?? false,
        modifyContentOwnerContent: cData.modifyContentOwnerContent ?? false,
        changeUserInfo: cData.changeUserInfo ?? false,
      }
      dispatch(systemAlarmDataAction(params))
    } else {
      openToast(message?.message, 'error')
    }
    dispatch(systemAlarmLoadingAction(false))
  }

  const updatePolicy = async (params: UsePutNoticePolicyParams, item: systemAlarmDataProps, setDefault?: boolean) => {
    dispatch(systemAlarmDataAction({ ...params.policyInfo, isLoading: true }))
    const { status, message } = await updateNoticePolicyInfo.mutateAsync(params)
    if (status === 'S') {
      openToast(setDefault ? '초기 상태로 변경되었습니다.' : message?.message, 'success')
      await init()
    } else {
      openToast(message?.message, 'error')
      dispatch(systemAlarmDataAction({ ...item, isLoading: false }))
    }
  }

  const handleCheckPolicy = (
    category: keyof NoticePolicyDto,
    e: ChangeEvent<HTMLInputElement>,
    params: systemAlarmDataProps
  ) => {
    let policyInfo: ModifyNoticePolicyDto = {
      flagActive: category === 'flagActive' ? e.target.checked : params.flagActive,
      addCommentAddCommentContent:
        category === 'addCommentAddCommentContent' ? e.target.checked : params.addCommentAddCommentContent,
      modifyContentAddCommentContent:
        category === 'modifyContentAddCommentContent' ? e.target.checked : params.modifyContentAddCommentContent,
      modifyContentCuContent: category === 'modifyContentCuContent' ? e.target.checked : params.modifyContentCuContent,
      addCommentOwnerContent: category === 'addCommentOwnerContent' ? e.target.checked : params.addCommentOwnerContent,
      modifyContentOwnerContent:
        category === 'modifyContentOwnerContent' ? e.target.checked : params.modifyContentOwnerContent,
      changeUserInfo: category === 'changeUserInfo' ? e.target.checked : params.changeUserInfo,
    }
    updatePolicy({ policyInfo }, params)
  }

  return {
    systemAlarmData,
    systemAlarmLoading,

    handleCheckPolicy,
    updatePolicy,
    init,
  }
}
