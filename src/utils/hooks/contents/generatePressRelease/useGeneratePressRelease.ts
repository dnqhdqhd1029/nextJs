import { useCallback } from 'react'
import { useRouter } from 'next/router'

import {
  requestDataAction,
  requestDataProps,
  responseDataAction,
} from '~/stores/modules/contents/generatePressRelease/generatePressRelease'
import { SelectListOptionItem } from '~/types/common'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useGeneratePressRelease = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { requestData, responseData } = useAppSelector(state => state.generatePressReleaseSlice)

  const saveActionValidate = (props: requestDataProps) => {
    let isProcess = true
    let productErr = ''
    let messageErr = ''
    if (props.product === '') {
      productErr = '제품/서비스명을 입력하세요.'
      isProcess = false
    }
    if (props.message === '') {
      messageErr = '내용을 입력하세요.'
      isProcess = false
    }
    if (!isProcess) {
      dispatch(
        requestDataAction({
          ...props,
          productErr,
          messageErr,
        })
      )
    }
    return isProcess
  }

  const requestDataProductOnChange = useCallback(
    async (e: string, props: requestDataProps) => {
      dispatch(
        requestDataAction({
          ...props,
          product: e,
          productErr: '',
        })
      )
    },
    [requestData.product]
  )

  const requestDataMessageOnChange = useCallback(
    async (e: string, props: requestDataProps) => {
      dispatch(
        requestDataAction({
          ...props,
          message: e,
          messageErr: '',
        })
      )
    },
    [requestData.message]
  )

  const requestDataToneOnChange = useCallback(
    async (e: string, props: requestDataProps) => {
      dispatch(
        requestDataAction({
          ...props,
          tone: e,
        })
      )
    },
    [requestData.tone]
  )

  const requestDataAudienceOnChange = useCallback(
    async (e: string, props: requestDataProps) => {
      dispatch(
        requestDataAction({
          ...props,
          audience: e,
        })
      )
    },
    [requestData.audience]
  )

  const requestDataLanguageOnChange = useCallback(
    async (e: SelectListOptionItem, props: requestDataProps) => {
      dispatch(
        requestDataAction({
          ...props,
          language: e,
        })
      )
    },
    [requestData.language]
  )

  return {
    requestData,
    responseData,

    // generatePressRelease,
    saveActionValidate,
    requestDataProductOnChange,
    requestDataMessageOnChange,
    requestDataToneOnChange,
    requestDataAudienceOnChange,
    requestDataLanguageOnChange,
  }
}
