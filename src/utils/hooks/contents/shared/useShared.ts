import { ChangeEvent, useCallback, useEffect, useRef } from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'

import { EMAIL_PATTERN, EMAIL_PATTERN_DESCRIPTION } from '~/constants/common'
import {
  activityOpenAction,
  initSharedPopupAction,
  keywordListAction,
  setReleasePopupAction,
  sharedPopupAction,
  sharedPopupReceiverListAction,
  sharedPopupType,
  userListAction,
} from '~/stores/modules/contents/shared/shared'
import type { BaseResponseCommonObject } from '~/types/api/service'
import { NavigationLinkItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import type { GroupDto } from '~/utils/api/group/useGetGroupSearch'
import { useGetOneGroup } from '~/utils/api/group/useGetOneGroup'
import {
  useShareMailCancel,
  useShareMailSender,
  useShareMailType,
  useShareMailTypeProps,
} from '~/utils/api/shared/useShared'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'
import { useUserSort } from '~/utils/hooks/contents/admin/useUserSort'

export const useShared = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const searchInputRef = useRef<HTMLInputElement>(null)
  const activityOpenRef = useRef<HTMLDivElement>(null)
  const { isDemoLicense, userSelectGroup, userInfo, licenseInfo } = useAppSelector(state => state.authSlice)
  const { sharedPopup, keywordList, activityOpen, keyword, isReleasePopup, shared_id } = useAppSelector(
    state => state.sharedSlice
  )

  const { getSortedUserArray } = useUserSort()

  const shareMailCancel = useShareMailCancel()
  const shareMailSender = useShareMailSender()

  const { data: apiGetOneGroup } = useGetOneGroup(userSelectGroup, {
    enabled: sharedPopup.isOpen && sharedPopup.key > 0,
  })

  const initPopupAction = useCallback(() => dispatch(initSharedPopupAction()), [sharedPopup.isOpen])
  const setReleasePopup = useCallback(
    (e: boolean, i: number) => dispatch(setReleasePopupAction({ isOpen: e, key: i })),
    [isReleasePopup]
  )

  const sharedConfirmPopup = useCallback(
    (e: string, hook: sharedPopupType) => {
      dispatch(
        sharedPopupAction({
          ...hook,
          contents: e,
        })
      )
    },
    [sharedPopup.contents]
  )

  const sharedPopupContentAction = useCallback(
    (e: string, hook: sharedPopupType) => {
      dispatch(
        sharedPopupAction({
          ...hook,
          contents: e,
        })
      )
    },
    [sharedPopup.contents]
  )

  const sharedPopupAddEmailpAction = useCallback(
    async (hook: string, props: sharedPopupType) => {
      const param = {
        ...props,
        addEmail: hook,
        targetEmailErr: '',
      }
      dispatch(sharedPopupAction(param))
    },
    [sharedPopup.addEmail]
  )

  const sharedPopupTargetEmailpAction = useCallback(
    async (props: sharedPopupType) => {
      let param = { ...props }
      if (EMAIL_PATTERN.test(props.addEmail)) {
        if (props.receiverList.length > 0) {
          const find = props.receiverList.find(e => e.realLabel === props.addEmail)
          if (find) {
            param.targetEmailErr = '이미 추가한 메일입니다.'
          } else {
            param.targetEmail = [...param.targetEmail, { id: props.addEmail, label: props.addEmail }]
            param.addEmail = ''
          }
        } else {
          param.targetEmail = [...param.targetEmail, { id: props.addEmail, label: props.addEmail }]
          param.addEmail = ''
        }
      } else {
        param.targetEmailErr = EMAIL_PATTERN_DESCRIPTION
      }
      dispatch(sharedPopupAction(param))
    },
    [sharedPopup.targetEmail]
  )

  const setActivityOpenActionAction = useCallback(
    (param: boolean) => dispatch(activityOpenAction(param)),
    [activityOpen]
  )
  const sharedPopupTagCloseOnChange = useCallback(
    async (item: MbTagSearchTagItem, hook: sharedPopupType) => {
      const param = {
        ...hook,
        receiverList: _.cloneDeep(hook.receiverList).filter(tag => tag.id !== item.id),
      }
      dispatch(sharedPopupAction(param))
    },
    [sharedPopup.receiverList]
  )

  const sharedPopupTargetEmailCloseOnChange = useCallback(
    async (item: MbTagSearchTagItem, hook: sharedPopupType) => {
      const param = {
        ...hook,
        targetEmail: _.cloneDeep(hook.targetEmail).filter(tag => tag.id !== item.id),
      }
      dispatch(sharedPopupAction(param))
    },
    [sharedPopup.targetEmail]
  )

  const sharedPopupResetTargetEmailListOnChange = useCallback(
    async (hook: sharedPopupType) => {
      const param = {
        ...hook,
        targetEmail: [],
      }
      dispatch(sharedPopupAction(param))
    },
    [sharedPopup.targetEmail]
  )

  const sharedPopupResetTagListOnChange = useCallback(
    async (hook: sharedPopupType) => {
      const param = {
        ...hook,
        receiverList: [],
      }
      dispatch(sharedPopupAction(param))
    },
    [sharedPopup.receiverList]
  )
  const sharedPopupKeywordsOnChange = useCallback(
    async (e: string, hook: sharedPopupType) => {
      if (hook.userList) {
        let res: NavigationLinkItem[] = []
        for await (const eElement of hook.userList) {
          if (eElement.id && eElement.title) {
            if (eElement.title.toLowerCase().search(e.toLowerCase()) !== -1) {
              res = [...res, eElement]
            }
          }
        }
        const param = {
          keyword: e,
          items: res.length > 0 ? res : hook.userList,
        }
        dispatch(keywordListAction(param))
      }
    },
    [keyword, keywordList]
  )
  const sharedPopupKeywordsDelete = useCallback(
    async (props: sharedPopupType) => {
      const param = {
        keyword: '',
        items: props.userList || [],
      }
      dispatch(keywordListAction(param))
    },
    [keyword, keywordList]
  )

  const sharedPopupKeywordsSearchDataAction = useCallback(
    async (e: ChangeEvent<HTMLInputElement>, hook: sharedPopupType, key: NavigationLinkItem) => {
      let dataList = hook.receiverList
      dataList = e.target.checked
        ? [...dataList, { id: key.id, label: key?.title || '', realLabel: key?.pathLink }]
        : dataList.filter(i => i.id !== key.id)
      dispatch(sharedPopupReceiverListAction(dataList))
    },
    [keywordList]
  )

  const setReceiverList = async (res: GroupDto) => {
    let newTagItems: NavigationLinkItem[] = []
    const newUsers = getSortedUserArray(res.users)
    for await (const newUser of newUsers) {
      if (newUser.userId && newUser.email) {
        newTagItems = [
          ...newTagItems,
          {
            id: newUser?.userId?.toString() ?? '',
            title: `${newUser?.name}` + ' ' + `${newUser?.email || ''}`,
            pathLink: `${newUser?.email || ''}`,
          },
        ]
      }
    }
    dispatch(userListAction(newTagItems))
  }

  // const getCommonCode = async (parentCode: string) => {
  //   let res = ''
  //   const { status, data, message } = await apiGetCommonCode({ parentCode })
  //   if (status === 'S') {
  //     const result = data as CommonCode[]
  //     res = result[0].name
  //   } else {
  //     openToast(message?.message, 'error')
  //   }
  //   return res
  // }

  const cancelRelease = async (idKey: number) => {
    const { status, data, message } = await shareMailCancel.mutateAsync(idKey)
    if (status === 'S') {
      openToast('발송을 취소했습니다.', 'success')
      dispatch(setReleasePopupAction({ isOpen: false, key: 0 }))
    } else {
      if (message?.code === 'CANCEL_TIMEOVER') {
        openToast('30초가 경과되었습니다.', 'error')
      } else {
        openToast(message?.message, 'error')
      }
    }
  }

  const validationCheck = async (props: sharedPopupType) => {
    let isProcess = false
    let receiverErr = ''

    if (props.receiverList.length < 1) {
      if (props.targetEmail.length > 0) {
        isProcess = true
      } else {
        receiverErr = '받는사람을 입력하세요'
      }
    } else {
      isProcess = true
    }
    dispatch(
      sharedPopupAction({
        ...props,
        receiverErr: receiverErr,
      })
    )

    return isProcess
  }

  const sharedAction = async (props: sharedPopupType) => {
    console.log('props.shareLinkUrl', props.shareLinkUrl)

    let param: useShareMailTypeProps = {
      title: props.title,
      userIdList: [],
      extraMailList: [],
      body: props.editorData,
      content: props.contents,
      // @ts-ignore
      objectType: props.type,
      link: props.shareLinkUrl !== '' ? props.shareLinkUrl : window.location.href,
    }
    let fileList: File[] = []
    if (props.receiverList.length > 0) {
      for await (const paramElement of props.receiverList) {
        param.userIdList = [...param.userIdList, Number(paramElement.id)]
      }
    }
    if (props.targetEmail.length > 0) {
      for await (const paramElement of props.targetEmail) {
        param.extraMailList = [...param.extraMailList, paramElement.id]
      }
    }
    if (props.files.length > 0) {
      for await (const paramElement of props.files) {
        fileList = [...fileList, paramElement]
      }
    }

    console.log('param', param)
    const { status, data, message } = await shareMailSender.mutateAsync({
      request: param,
      fileList: fileList,
    })
    if (status === 'S') {
      dispatch(setReleasePopupAction({ isOpen: true, key: Number(data) as number }))
    } else {
      openToast(message?.message, 'error')
    }
  }

  useEffect(() => {
    if (!apiGetOneGroup) return
    const { status, data: apiData, message } = apiGetOneGroup as BaseResponseCommonObject
    if (status === 'S') {
      const res = apiData as GroupDto
      setReceiverList(res)
    } else {
      openToast(message?.message, 'error')
    }
  }, [apiGetOneGroup])

  return {
    sharedPopup,
    userSelectGroup,
    userInfo,
    licenseInfo,
    activityOpenRef,
    activityOpen,
    keyword,
    searchInputRef,
    keywordList,
    isReleasePopup,
    shared_id,
    isDemoLicense,

    cancelRelease,
    validationCheck,
    sharedAction,

    sharedPopupAddEmailpAction,
    setReleasePopup,
    setActivityOpenActionAction,
    initPopupAction,
    sharedPopupContentAction,
    sharedPopupTargetEmailpAction,
    sharedPopupResetTagListOnChange,
    sharedPopupTagCloseOnChange,
    sharedPopupKeywordsOnChange,
    sharedPopupKeywordsDelete,
    sharedPopupKeywordsSearchDataAction,
    sharedPopupTargetEmailCloseOnChange,
    sharedPopupResetTargetEmailListOnChange,
  }
}
