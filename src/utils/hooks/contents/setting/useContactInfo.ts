import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

import { EMAIL_PATTERN } from '~/constants/common'
import {
  contactInfoAction,
  contactInfoPopupTypesAction,
  contactInfoPopupTypesProps,
  contactInfoProps,
} from '~/stores/modules/contents/setting/setting'
import type { BaseResponseCommonObject, ChangeContactInfoDto, UserDto } from '~/types/api/service'
import { usePutContactInfo } from '~/utils/api/setting/contactInfo/usePutContactInfo'
import { useGetContactInfo } from '~/utils/api/setting/contactInfo/userGetContactInfo'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useContactInfo = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { userInfo } = useAppSelector(state => state.authSlice)
  const { contactInfo, contactInfoPopupTypes } = useAppSelector(state => state.userSettingSlice)

  const { data: contactInfoData, refetch: refetchGetContactInfo } = useGetContactInfo(
    router.pathname === '/setting/contact-info' ? 1 : 0
  )

  const updateContact = usePutContactInfo()

  const setContactInfoPopupTypesAction = useCallback(
    (e: boolean, data: contactInfoProps) => {
      const params = {
        isOpen: e,
        content: data.info,
        contentErr: '',
      }
      dispatch(contactInfoPopupTypesAction(params))
    },
    [contactInfoPopupTypes]
  )

  const handleFormTextAreaChange = useCallback(
    (e: string) => {
      const params = {
        isOpen: true,
        content: e,
        contentErr: '',
      }
      dispatch(contactInfoPopupTypesAction(params))
    },
    [contactInfoPopupTypes]
  )

  const updateContactInfo = async (data: contactInfoPopupTypesProps) => {
    let isEmail = false

    if (!!data.content?.trim()) {
      const arrContent = data.content?.split('\n')

      arrContent.forEach(content => {
        EMAIL_PATTERN.test(content) && (isEmail = true)
      })
    }

    if (data.content?.trim() === '') {
      const params = {
        ...data,
        contentErr: '이메일 서명은 필수항목입니다.',
      }
      dispatch(contactInfoPopupTypesAction(params))
    } else if (!isEmail) {
      const params = {
        ...data,
        contentErr: '이메일은 필수 입력항목입니다.',
      }
      dispatch(contactInfoPopupTypesAction(params))
    } else {
      const updateParams: ChangeContactInfoDto = {
        contactInfo: data.content,
      }
      const { status, message } = await updateContact.mutateAsync(updateParams)
      if (status === 'S') {
        dispatch(contactInfoPopupTypesAction({ ...data, isOpen: false }))
        openToast('이메일 서명을 설정했습니다.', 'success')
        await refetchGetContactInfo()
      } else {
        openToast(message?.message, 'error')
      }
    }
  }

  useEffect(() => {
    if (!contactInfoData) return
    const { status, data, message } = contactInfoData as BaseResponseCommonObject
    if (status === 'S') {
      let newContactInfo = String(data)
      dispatch(
        contactInfoAction({
          info: newContactInfo,
          email: userInfo?.email || '',
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }, [contactInfoData])

  return {
    userInfo,
    contactInfo,
    contactInfoPopupTypes,

    setContactInfoPopupTypesAction,
    handleFormTextAreaChange,

    updateContactInfo,
  }
}
