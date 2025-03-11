/**
 * @file useClipbookAutoSave.tsx
 * @description 클립북 자동저장
 */

import { useState } from 'react'
import Cookie from 'js-cookie'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

import NetworkErrorMessage from '~/components/common/ui/NetworkErrorMesage'
import { API_LIST_TYPE_MAX_COUNT } from '~/constants/common'
import type { AddDelNewsAndPrDto, ClipBookDto, PageClipBookDto } from '~/types/api/service'
import { useGetClipbooks } from '~/utils/api/clipbook/useGetClipbooks'
import { usePostUpdateClipbookToNewsPr } from '~/utils/api/clipbook/usePostUpdateClipbookToNewsPr'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

const AUTO_TARGET_ID = 'clipbookAutoSaveTargetId'
const AUTO_LIST_IDS = 'clipbookAutoSaveListIds'

export const useClipbookAutoSave = () => {
  //const storeUserSelectGroup = useAppSelector(state => state.user.userSelectGroup) ?? 0
  const { userSelectGroup: storeUserSelectGroup } = useAppSelector(state => state.authSlice)
  const [autoSaveReturnMessage, setAutoSaveReturnMessage] = useState<string>('')
  const { refetch: refetchClipbooks } = useGetClipbooks(
    {
      page: 1,
      size: API_LIST_TYPE_MAX_COUNT,
      sort: 'name!asc',
      groupId: storeUserSelectGroup,
    },
    {
      enabled: false,
    }
  )

  const addNewsToClipbook = usePostUpdateClipbookToNewsPr()

  const setAutoSaveTargetId = (targetListId: number) => {
    Cookie.set(AUTO_TARGET_ID, targetListId.toString())
  }

  const saveListAutomatically = async (
    itemToAdd: number, // 클립북 id
    targetListId: number, // 자동저장할 타겟목록 id
    isSaveToServer?: boolean,
    currentItemDate?: string
  ) => {
    const cookieAutoSaveListIds = Cookie.get(AUTO_LIST_IDS)
    let autoSaveListIds = cookieAutoSaveListIds ? cookieAutoSaveListIds.split(',') : []

    if (autoSaveListIds.length > 0) {
      const alreadySavedItem = autoSaveListIds.find(item => item === itemToAdd.toString())

      if (!alreadySavedItem) {
        autoSaveListIds.push(itemToAdd.toString())
      }

      Cookie.set(AUTO_LIST_IDS, autoSaveListIds.join(','))
    } else {
      Cookie.set(AUTO_LIST_IDS, itemToAdd.toString())
    }

    if (isSaveToServer) {
      const today = moment(currentItemDate) ?? moment()
      let resultList: ClipBookDto[] = []
      let params: AddDelNewsAndPrDto = {
        clipBookIdList: [targetListId],
        // clipBookId: targetListId,
        newsIdList: [itemToAdd],
        // startYear: today.format('YYYY'),
        // startMonth: today.format('M'),
        // startDay: today.format('D'),
        // endYear: today.format('YYYY'),
        // endMonth: today.format('M'),
        // endDay: today.format('D'),
      }

      const { isSuccess, data: responseData } = await refetchClipbooks()
      if (!isSuccess) {
        return
      }
      const { status: listStatus, data: listData, message: listMessage } = responseData
      if (listStatus === 'S') {
        const { content } = listData as PageClipBookDto
        resultList = content as ClipBookDto[]
      } else {
        openToast(listMessage?.message, 'error')
        return
      }

      const { status, message } = await addNewsToClipbook.mutateAsync({
        type: 'add',
        info: params,
      })
      if (status === 'S') {
        const findItem = resultList.find(item => item.clipBookId === targetListId)
        if (findItem) {
          const toastId = uuid()
          openToast(
            <>
              <div>클립북에 담았습니다.</div>
              <div className="toast-box1">
                <p>{findItem.title}</p>
                <p>
                  <button
                    type="button"
                    onClick={() => setAutoSaveReturnMessage('MOVE_TO_LIST' + toastId)}
                  >
                    변경
                  </button>
                </p>
              </div>
            </>,
            'success',
            undefined,
            toastId
          )
          return true
        } else {
          openToast(message?.message, 'error')
          return
        }
      } else {
        openToast(message?.message, 'error')
        return
      }
    }
  }

  const getAutoSaveTargetId = () => {
    return Cookie.get(AUTO_TARGET_ID)
  }

  const getAutoSavedIds = () => {
    const cookieAutoSaveListIds = Cookie.get(AUTO_LIST_IDS)
    return cookieAutoSaveListIds ? cookieAutoSaveListIds.split(',') : []
  }

  const removeAutoSavedId = (id: number) => {
    const autoSaveListIds = getAutoSavedIds()
    const filteredList = autoSaveListIds.filter(item => item !== id.toString())
    Cookie.set(AUTO_LIST_IDS, filteredList.join(','))
  }

  const isIdAutoSaved = async (id: number) => {
    const targetListId = getAutoSaveTargetId()
    const autoSaveListIds = getAutoSavedIds()

    if (!targetListId) {
      return true
    }

    const { isSuccess, data: responseData } = await refetchClipbooks()

    if (!isSuccess) {
      openToast(NetworkErrorMessage, 'error')
      return true
    }
    const { status: listStatus, data: listData, message: listMessage } = responseData
    if (listStatus === 'S') {
      const { content } = listData as PageClipBookDto
      const findList = (content as ClipBookDto[]).find(item => item.clipBookId?.toString() === targetListId)

      if (findList) {
        const findItemInList = findList.newslist?.find(newsId => newsId === id)

        if (findItemInList) {
          if (!autoSaveListIds.includes(id.toString())) {
            autoSaveListIds.push(id.toString())
            Cookie.set(AUTO_LIST_IDS, autoSaveListIds.join(','))
          }
          return true
        } else {
          removeAutoSavedId(id)
          return false
        }
      } else {
        return true
      }
    } else {
      openToast(listMessage?.message, 'error')
      return true
    }
  }

  return {
    saveListAutomatically,
    getAutoSavedIds,
    isIdAutoSaved,
    getAutoSaveTargetId,
    autoSaveReturnMessage,
    removeAutoSavedId,
    setAutoSaveTargetId,
  }
}
