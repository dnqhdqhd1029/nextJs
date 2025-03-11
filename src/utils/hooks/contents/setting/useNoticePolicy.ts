import { ChangeEvent, useEffect, useState } from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'

import type { ModifyNoticePolicyDto, NoticePolicyDto } from '~/types/api/service'
import { BaseResponseCommonObject } from '~/types/api/service'
import { useGetNoticePolicy } from '~/utils/api/setting/noticePolicy/useGetNoticePolicy'
import { usePutNoticePolicy, UsePutNoticePolicyParams } from '~/utils/api/setting/noticePolicy/usePutNoticePolicy'
import { openToast } from '~/utils/common/toast'

export const useNoticePolicy = () => {
  const router = useRouter()

  const [flagActive, setFlagActive] = useState<boolean>()
  const [addCommentAddCommentContent, setAddCommentAddCommentContent] = useState<boolean>()
  const [modifyContentAddCommentContent, setModifyContentAddCommentContent] = useState<boolean>()
  const [modifyContentCuContent, setModifyContentCuContent] = useState<boolean>()
  const [addCommentOwnerContent, setAddCommentOwnerContent] = useState<boolean>()
  const [modifyContentOwnerContent, setModifyContentOwnerContent] = useState<boolean>()
  const [changeUserInfo, setChangeUserInfo] = useState<boolean>()

  const updateNoticePolicyInfo = usePutNoticePolicy({
    onSuccess: response => {
      const { status, message } = response
      if (status === 'S') {
        //openToast(message?.message, 'success')
        refetchGetNoticePolicyInfo()
      } else {
        openToast(message?.message, 'error')
      }
    },
    onError: error => {
      openToast(error.message, 'error')
    },
  })

  const { data: noticePolicyInfoData, refetch: refetchGetNoticePolicyInfo } = useGetNoticePolicy()
  useEffect(() => {
    if (!noticePolicyInfoData) {
      return
    }
    console.log('noticePolicyInfoData processing...')
    const { status, data, message } = noticePolicyInfoData as BaseResponseCommonObject
    if (status === 'S') {
      console.log('>> noticePolicyInfoData : ', data)
      const cData = data as NoticePolicyDto
      setFlagActive(cData.flagActive ?? false)
      setAddCommentAddCommentContent(cData.addCommentAddCommentContent ?? false)
      setModifyContentAddCommentContent(cData.modifyContentAddCommentContent ?? false)
      setModifyContentCuContent(cData.modifyContentCuContent ?? false)
      setAddCommentOwnerContent(cData.addCommentOwnerContent ?? false)
      setModifyContentOwnerContent(cData.modifyContentOwnerContent ?? false)
      setChangeUserInfo(cData.changeUserInfo ?? false)
    } else {
      openToast(message?.message, 'error')
      router.replace('/setting/system-alarm')
    }
  }, [noticePolicyInfoData])

  const handleCheckPolicy = (category: keyof NoticePolicyDto, e: ChangeEvent<HTMLInputElement>) => {
    let policyInfo: ModifyNoticePolicyDto = {
      flagActive: category === 'flagActive' ? e.target.checked : flagActive ?? false,
      addCommentAddCommentContent:
        category === 'addCommentAddCommentContent' ? e.target.checked : addCommentAddCommentContent ?? false,
      modifyContentAddCommentContent:
        category === 'modifyContentAddCommentContent' ? e.target.checked : modifyContentAddCommentContent ?? false,
      modifyContentCuContent:
        category === 'modifyContentCuContent' ? e.target.checked : modifyContentCuContent ?? false,
      addCommentOwnerContent:
        category === 'addCommentOwnerContent' ? e.target.checked : addCommentOwnerContent ?? false,
      modifyContentOwnerContent:
        category === 'modifyContentOwnerContent' ? e.target.checked : modifyContentOwnerContent ?? false,
      changeUserInfo: category === 'changeUserInfo' ? e.target.checked : changeUserInfo ?? false,
    }
    const updateParams: UsePutNoticePolicyParams = {
      policyInfo,
    }
    updateNoticePolicyInfo.mutate(updateParams)
    console.log('category:' + category + ', value:' + e.target.checked)
  }

  const handleResetPolicy = () => {
    const updateParams: UsePutNoticePolicyParams = {
      policyInfo: {
        flagActive: true,
        addCommentAddCommentContent: true,
        modifyContentAddCommentContent: true,
        modifyContentCuContent: true,
        addCommentOwnerContent: true,
        modifyContentOwnerContent: true,
        changeUserInfo: true,
      },
    }
    updateNoticePolicyInfo.mutate(updateParams)
  }

  return {
    //    noticePolicyId,
    flagActive,
    addCommentAddCommentContent,
    modifyContentAddCommentContent,
    modifyContentCuContent,
    addCommentOwnerContent,
    modifyContentOwnerContent,
    changeUserInfo,
    handleCheckPolicy,
    handleResetPolicy,
  }
}
