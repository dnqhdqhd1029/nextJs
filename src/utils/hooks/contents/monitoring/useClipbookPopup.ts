import { ChangeEvent, useCallback, useEffect, useRef } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/router'

import { shareCodeAction } from '~/stores/modules/contents/auth/auth'
import {
  activityOpenAction,
  clipbbokPopupReceiverListAction,
  clipbookPopupAction,
  clipbookPopupPrjListAction,
  clipbookPopupProps,
  initClipbookPopupAction,
  keywordAction,
} from '~/stores/modules/contents/monitoring/clipbookPopup'
import { CreateClipBookDto, ModifyClipBookDto } from '~/types/api/service'
import { NavigationLinkItem, SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { apiGetClipbooksPrjList, getClipbooksPrjListParams } from '~/utils/api/clipbook/useGetClipbooks'
import { usePostClipbookCreate } from '~/utils/api/clipbook/usePostClipbookCreate'
import { usePostClipbookNameCheck } from '~/utils/api/clipbook/usePostClipbookNameCheck'
import { usePutClipbook, UsePutClipbookParams } from '~/utils/api/clipbook/usePutClipbook'
import { usePutSharePolicy } from '~/utils/api/setting/policy/usePutSharePolicy'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useClipbookPopup = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const activityOpenRef = useRef<HTMLDivElement>(null)

  const { clipbookPopup, activityOpen, keyword, keywordList, prjList } = useAppSelector(
    state => state.clipbookPopupSlice
  )
  const { licenseInfo, userInfo, userSelectGroup, shareCodeData, shareCode } = useAppSelector(state => state.authSlice)

  const checkClipbookName = usePostClipbookNameCheck()
  const createClipbook = usePostClipbookCreate()
  const updateClipbook = usePutClipbook()
  const apiPutSharePolicy = usePutSharePolicy()

  const setInitClipbookPopup = useCallback(() => dispatch(initClipbookPopupAction()), [clipbookPopup])

  const setActivityOpenActionAction = useCallback(
    async (param: boolean) => {
      if (param) await getSearchActionByKeyword('')
      dispatch(activityOpenAction(param))
    },
    [activityOpen]
  )

  const clipbookPopupKeywordsSearchDataAction = useCallback(
    async (e: ChangeEvent<HTMLInputElement>, hook: MbTagSearchTagItem[], key: NavigationLinkItem) => {
      let dataList = hook
      dataList = e.target.checked
        ? [...dataList, { id: key.id, label: key?.title || '', realLabel: key?.pathLink }]
        : dataList.filter(i => i.id !== key.id)
      dispatch(clipbbokPopupReceiverListAction(dataList))
    },
    [prjList]
  )

  const clipbookPopupResetTagListOnChange = useCallback(async () => {
    dispatch(clipbbokPopupReceiverListAction([]))
  }, [prjList])

  const clipbookPopupTagCloseOnChange = useCallback(
    async (item: MbTagSearchTagItem, hook: MbTagSearchTagItem[]) => {
      dispatch(clipbbokPopupReceiverListAction(_.cloneDeep(hook).filter(tag => tag.id !== item.id)))
    },
    [prjList]
  )

  const clipbookPopupKeywordsOnChange = useCallback(
    async (e: string) => {
      dispatch(keywordAction(e))
    },
    [keyword]
  )

  const setClipbookPopupTitleOnChange = useCallback(
    (param: string, origin: clipbookPopupProps) => {
      const params = {
        ...origin,
        name: param,
        nameErr: '',
      }
      dispatch(clipbookPopupAction(params))
    },
    [clipbookPopup.name]
  )

  const setClipbookPopupCoverageIdOnChange = useCallback(
    async (param: SelectListOptionItem, origin: clipbookPopupProps) => {
      const params = {
        ...origin,
        coverageId: param,
      }
      dispatch(clipbookPopupAction(params))
      // if (param.id === 'COVERAGE') {
      //   await getSearchActionByKeyword('')
      // }
    },
    [clipbookPopup.coverageId]
  )

  const setClipbookPopupHandleShareSetting = useCallback(
    (param: SelectListOptionItem, origin: clipbookPopupProps) => {
      const params = {
        ...origin,
        scrop: param,
      }
      dispatch(clipbookPopupAction(params))
    },
    [clipbookPopup.scrop]
  )

  const setClipbookPopupHandleScropChanged = useCallback(
    (param: boolean, origin: clipbookPopupProps) => {
      const params = {
        ...origin,
        isScropChanged: param,
      }
      dispatch(clipbookPopupAction(params))
    },
    [clipbookPopup.isScropChanged]
  )

  const setClipbookPopupHandleSelectedUser = useCallback(
    (param: SelectListOptionItem, origin: clipbookPopupProps) => {
      const params = {
        ...origin,
        selectedUser: param,
      }
      dispatch(clipbookPopupAction(params))
    },
    [clipbookPopup.selectedUser]
  )

  const checkValidation = async (props: clipbookPopupProps) => {
    let setTitleErr = ''
    let isProcess = false
    if (props.name === '') {
      setTitleErr = '클립북의 이름을 입력하세요'
    } else if (props.name.length > 100) {
      setTitleErr = '이름은 100자를 넘을 수 없습니다.'
    } else {
      if (props.key > 0) {
        isProcess = true
      } else {
        const { status, message } = await checkClipbookName.mutateAsync({
          oldName: '',
          newName: props.name,
          groupId: userSelectGroup,
        })
        if (status === 'S') {
          isProcess = true
        } else {
          setTitleErr = '같은 이름의 클립북이 이미 있습니다'
        }
      }
    }
    dispatch(
      clipbookPopupAction({
        ...props,
        nameErr: setTitleErr,
      })
    )
    return isProcess
  }

  const updateAction = async (props: clipbookPopupProps, list: MbTagSearchTagItem[]) => {
    const params: UsePutClipbookParams = {
      id: props.key,
      info: {
        type: props.coverageId.id,
        title: props.name,
        shareCode: props.scrop.id,
        ownerId: props.isOwner ? userInfo?.userId || 0 : Number(props.selectedUser.id),
        prIdList: [],
      },
    }
    if (props.coverageId.id === 'COVERAGE' && list.length > 0) {
      let temp: number[] = []
      for await (const param of list) {
        temp = [...temp, Number(param.id)]
      }
      params.info.prIdList = temp
    }
    const { status, message } = await updateClipbook.mutateAsync(params)
    if (status === 'S') {
      openToast(message?.message, 'success')
      dispatch(initClipbookPopupAction())
      router.reload()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const createAction = async (props: clipbookPopupProps, list: MbTagSearchTagItem[]) => {
    const newDate = moment()
    const year = newDate.format('YYYY')
    const month = newDate.format('M')
    const day = newDate.format('D')
    const params: CreateClipBookDto = {
      title: props.name,
      type: props.coverageId.id,
      shareCode: props.scrop.id,
      chkDefault: props.isScropChanged,
      groupId: userSelectGroup,
      // startYear: year,
      // startMonth: month,
      // startDay: day,
      // endYear: year,
      // endMonth: month,
      // endDay: day,
    }
    if (props.coverageId.id === 'COVERAGE' && list.length > 0) {
      let temp: number[] = []
      for await (const param of list) {
        console.log('param', param)
        // @ts-ignore
        temp = [...temp, Number(param.id)]
      }
      params.prlist = temp
    }
    const { status, message } = await createClipbook.mutateAsync(params)
    if (status === 'S') {
      if (props.isScropChanged) {
        await updatePolicy(props.scrop.id)
      }
      dispatch(initClipbookPopupAction())
      router.reload()
      openToast('클립북을 만들었습니다.', 'success')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const updatePolicy = async (props: string) => {
    const param = {
      list: shareCode.list,
      jrnlstMediaSrch: shareCode.jrnlstMediaSrch,
      clipbook: props,
      news_search: shareCode.news_search,
      project: shareCode.project,
      action: shareCode.action,
      distribute: shareCode.distribute,
    }
    const { status, message } = await apiPutSharePolicy.mutateAsync({
      id: userInfo?.userId || 0,
      policyInfo: param,
    })
    if (status === 'S') {
      dispatch(shareCodeAction(param))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const clipbookAction = async (props: clipbookPopupProps, list: MbTagSearchTagItem[]) => {
    if (props.key > 0) {
      await updateAction(props, list)
    } else {
      await createAction(props, list)
    }
  }

  const getSearchActionByKeyword = async (props: string) => {
    const params = {
      groupId: userSelectGroup,
      keyword: props,
    }
    const { status, data, message } = await apiGetClipbooksPrjList(params)
    if (status === 'S') {
      const res = data as getClipbooksPrjListParams[]
      let newTagItems: NavigationLinkItem[] = []
      for await (const e of res) {
        newTagItems = [
          ...newTagItems,
          {
            id: e.mailingId.toString(),
            title: e.title,
            pathLink: e.companyId.toString(),
          },
        ]
      }
      dispatch(clipbookPopupPrjListAction(newTagItems))
    } else {
      openToast(message?.message, 'error')
    }
  }

  return {
    userSelectGroup,
    licenseInfo,
    userInfo,
    clipbookPopup,
    activityOpenRef,
    activityOpen,
    keyword,
    keywordList,
    prjList,

    checkValidation,
    clipbookAction,
    getSearchActionByKeyword,

    setActivityOpenActionAction,
    clipbookPopupKeywordsOnChange,
    setClipbookPopupTitleOnChange,
    setInitClipbookPopup,
    setClipbookPopupCoverageIdOnChange,
    setClipbookPopupHandleShareSetting,
    setClipbookPopupHandleScropChanged,
    setClipbookPopupHandleSelectedUser,
    clipbookPopupTagCloseOnChange,
    clipbookPopupResetTagListOnChange,
    clipbookPopupKeywordsSearchDataAction,
  }
}
