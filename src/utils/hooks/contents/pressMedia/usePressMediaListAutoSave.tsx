/**
 * @file usePressMediaListAutoSave.tsx
 * @description 언론/미디어 목록 자동저장
 */

import { useState } from 'react'
import Cookie from 'js-cookie'
import { v4 as uuid } from 'uuid'

import NetworkErrorMessage from '~/components/common/ui/NetworkErrorMesage'
import { API_LIST_TYPE_MAX_COUNT } from '~/constants/common'
import { PageableDataDto } from '~/types/contents/api'
import { JournalistMediaGroupItem } from '~/types/contents/PressMedia'
import { useGetJournalistGroup } from '~/utils/api/groupList/journalist/useGetJournalistGroup'
import { usePostJournalistGroupAddJournalist } from '~/utils/api/groupList/journalist/usePostJournalistGroupAddJournalist'
import { useGetMediaGroup } from '~/utils/api/groupList/media/useGetMediaGroup'
import { usePostMediaGroupAddMedia } from '~/utils/api/groupList/media/usePostMediaGroupAddMedia'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

export const usePressMediaListAutoSave = () => {
  //const storeUserSelectGroup = useAppSelector(state => state.user.userSelectGroup) ?? 0
  const { userSelectGroup: storeUserSelectGroup } = useAppSelector(state => state.authSlice)
  const [autoSaveReturnMessage, setAutoSaveReturnMessage] = useState<string>('')
  const { refetch: refetchGetJournalistGroup } = useGetJournalistGroup(
    {
      page: 1,
      size: API_LIST_TYPE_MAX_COUNT,
      sort: ['title!asc'],
      groupId: storeUserSelectGroup,
    },
    {
      enabled: false,
    }
  )
  const { refetch: refetchGetMediaGroup } = useGetMediaGroup(
    {
      page: 1,
      size: API_LIST_TYPE_MAX_COUNT,
      sort: ['title!asc'],
      groupId: storeUserSelectGroup,
    },
    {
      enabled: false,
    }
  )
  const addJournalistToGroup = usePostJournalistGroupAddJournalist()
  const addMediaToGroup = usePostMediaGroupAddMedia()

  const setAutoSaveTargetId = (tabName: string, targetListId: number) => {
    Cookie.set(`${tabName}AutoSaveTargetId`, targetListId.toString())
  }

  const saveListAutomatically = async (
    tabName: string,
    itemToAdd: number, // 언론인/미디어 id
    targetListId: number, // 자동저장할 타겟목록 id
    isSaveToServer?: boolean
  ) => {
    const cookieAutoSaveListIds = Cookie.get(`${tabName}AutoSaveListIds`)
    let autoSaveListIds = cookieAutoSaveListIds ? cookieAutoSaveListIds.split(',') : []

    if (autoSaveListIds.length > 0) {
      const alreadySavedItem = autoSaveListIds.find(item => item === itemToAdd.toString())

      if (!alreadySavedItem) {
        autoSaveListIds.push(itemToAdd.toString())
      }

      Cookie.set(`${tabName}AutoSaveListIds`, autoSaveListIds.join(','))
    } else {
      Cookie.set(`${tabName}AutoSaveListIds`, itemToAdd.toString())
    }

    if (isSaveToServer) {
      let resultList: JournalistMediaGroupItem[] = []
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let saveFetchFunction: any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let params: any
      let title = ''

      if (tabName === 'press') {
        title = '언론인'
        saveFetchFunction = addJournalistToGroup.mutateAsync
        params = {
          jrnlstListId: targetListId,
          journalistIdList: [itemToAdd],
        }
      } else if (tabName === 'media') {
        title = '미디어'
        saveFetchFunction = addMediaToGroup.mutateAsync
        params = {
          mediaListId: targetListId,
          mediaIdList: [itemToAdd],
        }
      } else {
        return
      }

      const { isSuccess, data: responseData } =
        tabName === 'press' ? await refetchGetJournalistGroup() : await refetchGetMediaGroup()
      if (!isSuccess) {
        return
      }
      const { status: listStatus, data: listData, message: listMessage } = responseData
      if (listStatus === 'S') {
        const { content } = listData as PageableDataDto<JournalistMediaGroupItem>
        resultList = content
      } else {
        openToast(listMessage?.message, 'error')
        return
      }

      const { status, message } = await saveFetchFunction(params)
      if (status === 'S') {
        const findItem = resultList.find(item => {
          return tabName === 'press' ? item.jrnlstListId === targetListId : item.mediaListId === targetListId
        })
        if (findItem) {
          const toastId = uuid()
          openToast(
            <>
              <div>{title} 목록에 담았습니다.</div>
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

  const getAutoSaveTargetId = (tabName: string) => {
    return Cookie.get(`${tabName}AutoSaveTargetId`)
  }

  const getAutoSavedIds = (tabName: string) => {
    const cookieAutoSaveListIds = Cookie.get(`${tabName}AutoSaveListIds`)
    return cookieAutoSaveListIds ? cookieAutoSaveListIds.split(',') : []
  }

  const removeAutoSavedId = (tabName: string, id: number) => {
    const autoSaveListIds = getAutoSavedIds(tabName)
    const filteredList = autoSaveListIds.filter(item => item !== id.toString())
    Cookie.set(`${tabName}AutoSaveListIds`, filteredList.join(','))
  }

  const isIdAutoSaved = async (tabName: string, id: number) => {
    const targetListId = getAutoSaveTargetId(tabName)
    const autoSaveListIds = getAutoSavedIds(tabName)

    if (!targetListId) {
      return true
    }

    const { isSuccess, data: responseData } =
      tabName === 'press' ? await refetchGetJournalistGroup() : await refetchGetMediaGroup()

    if (!isSuccess) {
      openToast(NetworkErrorMessage, 'error')
      return true
    }
    const { status: listStatus, data: listData, message: listMessage } = responseData
    if (listStatus === 'S') {
      const { content } = listData as PageableDataDto<JournalistMediaGroupItem>
      const findList = content.find(
        item => (tabName === 'press' ? item.jrnlstListId?.toString() : item.mediaListId?.toString()) === targetListId
      )

      if (findList) {
        const findItemInList =
          tabName === 'press' ? findList.journalist?.find(jId => jId === id) : findList.media?.find(mId => mId === id)

        if (findItemInList) {
          if (!autoSaveListIds.includes(id.toString())) {
            autoSaveListIds.push(id.toString())
            Cookie.set(`${tabName}AutoSaveListIds`, autoSaveListIds.join(','))
          }
          return true
        } else {
          removeAutoSavedId(tabName, id)
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
