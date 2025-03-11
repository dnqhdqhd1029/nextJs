import { useCallback } from 'react'
import moment from 'moment/moment'
import { useRouter } from 'next/router'

import {
  ClipbookAddContext,
  ClipbookAutoRegisterContext,
} from '~/components/contents/common/forms/ClipbookListPopup/ClipbookAutoRegisterContext'
import {
  defaultBasicMonitoringSetting,
  disclosureScopeFilterOptionList,
} from '~/components/contents/common/forms/ClipbookListPopup/defaultData'
import { MEDIA_VALUE_MAX_POINT } from '~/constants/common'
import { userAutoSaveDataProps, userClipbookListAutoSaveDataAction } from '~/stores/modules/contents/extraData/extra'
import { clipbookContentListProps, pressReleaseInfoProps } from '~/stores/modules/contents/monitoring/clipbook'
import {
  clipbookContentListAction,
  clipbookDataListProps,
  clipbookListPageProps,
  clipbookPopupAction,
  initClipbookPopupAction,
} from '~/stores/modules/contents/monitoring/clipbookListPopup'
import { type AddDelNewsAndPrDto, CreateClipBookDto, PageClipBookDto } from '~/types/api/service'
import { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import { apiGetClipbooks } from '~/utils/api/clipbook/useGetClipbooks'
import { usePostClipbookCreate } from '~/utils/api/clipbook/usePostClipbookCreate'
import { usePostUpdateClipbookToNewsPr } from '~/utils/api/clipbook/usePostUpdateClipbookToNewsPr'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useClipbookListPopup = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { clipbookListPage, clipbookContentList } = useAppSelector(state => state.clipbookListPopupSlice)
  const { newsDuplicationIdList, userClipbookListAutoSaveData } = useAppSelector(state => state.extraSlice)
  const { licenseInfo, userInfo, userSelectGroup, shareCodeData, timeZone, frequentlyUsedCommonCode } = useAppSelector(
    state => state.authSlice
  )

  const createClipbook = usePostClipbookCreate()
  const newsToClipbookAction = usePostUpdateClipbookToNewsPr()

  const clipbookListPageCheckStatusChange = useCallback(
    (e: boolean, item: clipbookContentListProps, props: clipbookListPageProps) => {
      let tempClipbookDataList = props.clipbookDataList
      let tempClipbookIdList = props.clipbookIdList
      if (item.clipBookId && item.title) {
        if (e) {
          tempClipbookIdList = [...props.clipbookIdList, Number(item.clipBookId)]
          tempClipbookDataList = [...props.clipbookDataList, { id: Number(item.clipBookId), name: item?.title }]
        } else {
          tempClipbookIdList = props.clipbookIdList.filter(e => e !== Number(item.clipBookId))
          tempClipbookDataList = props.clipbookDataList.filter(e => e.id !== Number(item.clipBookId))
        }
      }
      dispatch(
        clipbookPopupAction({
          ...props,
          isActive: calculateChangeValueCheck(tempClipbookIdList, props.origin),
          clipbookDataList: tempClipbookDataList,
          clipbookIdList: tempClipbookIdList,
        })
      )
    },
    [clipbookListPage.clipbookIdList, clipbookListPage.clipbookDataList]
  )

  const setclipbookPopupNameAction = useCallback(
    async (e: string, props: clipbookListPageProps) => {
      let param = {
        ...props,
        name: e,
        nameErr: '',
      }
      if (e && e.length >= 100) {
        param = {
          ...props,
          nameErr: '클립북명은 100자를 넘을 수 없습니다.',
        }
      }
      if (e === '') {
        await autoClipbookListData('', props.except)
      }
      dispatch(clipbookPopupAction(param))
    },
    [clipbookListPage.name, clipbookListPage.nameErr]
  )

  const calculateChangeValueCheck = (newValue: number[], origin: number[]) => {
    let res = false
    if (newValue.length === 0 && origin.length === 0) {
      res = false
    } else if (newValue.length === 0 && origin.length > 0) {
      res = true
    } else if (newValue.length > 0 && origin.length === 0) {
      res = true
    } else {
      if (origin.length > 0) {
        const newValueBigger = newValue.filter(item => !origin.includes(item))
        const originBigger = origin.filter(item => !newValue.includes(item))
        const changeValue = [...newValueBigger, ...originBigger]
        if (changeValue && changeValue.length > 0) {
          res = true
        }
      } else {
        res = true
      }
    }

    return res
  }

  const autoClipbookListData = async (e: string, except: number[]) => {
    const { status, data, message } = await apiGetClipbooks({
      page: 1,
      size: MEDIA_VALUE_MAX_POINT,
      sort: 'updateAt!desc',
      title: e,
      shareCode: '',
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      const res = data as PageClipBookDto
      let param: clipbookContentListProps[] = []
      if (res.content && res.content.length > 0) {
        for await (const content of res.content) {
          const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === content.shareCode)
          let temp: clipbookContentListProps = {
            ...content,
            isEdit: userInfo.userId === content.owner?.userId ? true : content.shareCode === 'WRITABLE',
            isOwner: userInfo.userId === content.owner?.userId,
            categoryName: content.type === 'COVERAGE' ? '커버리지' : '',
            settingList: defaultBasicMonitoringSetting,
            shareCodeNm: findShareScopeList?.name || '',
            //@ts-ignore
            pressReleaseInfo: content.prlist as pressReleaseInfoProps[],
          }
          param = [...param, temp]
        }
      }
      dispatch(clipbookContentListAction(param))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setClipbookPopupAction = async (e: boolean, idList: MonitoringSearchNewsDocumentDto[], valueKey?: string) => {
    let clipbookListNull = false
    let userClipbookList: number[] = []
    if (idList && idList.length > 0) {
      for await (const idListProp of idList) {
        if (!clipbookListNull) {
          // @ts-ignore
          if (idListProp.clipBookIdTitleList && idListProp.clipBookIdTitleList.length > 0) {
            const currentClipbookId = idListProp.clipBookIdTitleList.map(i => Number(i.id))
            if (userClipbookList.length > 0) {
              userClipbookList = userClipbookList.filter(item => currentClipbookId.includes(item))
            } else {
              userClipbookList = currentClipbookId
            }
          } else {
            clipbookListNull = true
          }
        }
      }
    }
    if (valueKey) {
      const find = userClipbookList.find(k => k.toString() === valueKey)
      if (!find) {
        userClipbookList = [...userClipbookList, Number(valueKey)]
        clipbookListNull = false
      }
    }
    if (e) {
      await autoClipbookListData('', clipbookListNull ? [] : userClipbookList)
    }
    dispatch(
      initClipbookPopupAction({
        isOpen: e,
        type: 'add',
        list: [],
        origin: [],
        except: clipbookListNull ? [] : userClipbookList,
        idList: idList,
      })
    )
  }

  const createClipbookAction = async (props: clipbookListPageProps) => {
    const newDate = moment()
    const year = newDate.format('YYYY')
    const month = newDate.format('M')
    const day = newDate.format('D')
    const params: CreateClipBookDto = {
      title: props.name,
      type: 'NORMAL',
      shareCode: shareCodeData.clipbook.id,
      chkDefault: false,
      groupId: userSelectGroup,
      // startYear: year,
      // startMonth: month,
      // startDay: day,
      // endYear: year,
      // endMonth: month,
      // endDay: day,
    }
    const { status, data, message } = await createClipbook.mutateAsync(params)
    if (status === 'S' && data) {
      dispatch(
        clipbookPopupAction({
          ...props,
          isActive: true,
          clipbookIdList: [...props.clipbookIdList, Number(data)],
          clipbookDataList: [...props.clipbookDataList, { id: Number(data), name: props.name }],
        })
      )
      await autoClipbookListData(props.name, props.except)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const delClipbookNews = async (idKey: number[], newsIdList: number[]) => {
    let newsToClipbookparams: AddDelNewsAndPrDto = {
      // @ts-ignore
      clipBookIdList: idKey,
      newsIdList: newsIdList,
      // startYear: moment().format('YYYY'),
      // startMonth: moment().format('M'),
      // startDay: moment().format('D'),
      // endYear: moment().format('YYYY'),
      // endMonth: moment().format('M'),
      // endDay: moment().format('D'),
    }
    const { status, message } = await newsToClipbookAction.mutateAsync({
      type: 'del',
      info: newsToClipbookparams,
    })
    if (status !== 'S') {
      openToast(message?.message, 'error')
    }
    return status
  }

  const addClipbookNews = async (idKey: number[], newsIdList: number[], newsIndexItem: string[]) => {
    let newsToClipbookparams: AddDelNewsAndPrDto = {
      // @ts-ignore
      clipBookIdList: idKey,
      newsIdList: newsIdList,
      newsIndexList: newsIndexItem,
    }
    const { status, message } = await newsToClipbookAction.mutateAsync({
      type: 'add',
      info: newsToClipbookparams,
    })
    if (status !== 'S') {
      openToast(message?.message, 'error')
    }
    return status
  }

  const autoRegisterClipbookAction = (
    userClipbookList: userAutoSaveDataProps[],
    autoClipbookId: { key: string; name: string },
    type: string,
    apiDataList?: MonitoringSearchNewsDocumentDto[]
  ) => {
    let autoCompleteData = [...userClipbookList]
    if (autoCompleteData && autoCompleteData.length > 0) {
      const findIndex = autoCompleteData.findIndex(e => e.groupId.toString() === userSelectGroup.toString())
      if (findIndex !== undefined && findIndex !== null && findIndex > -1) {
        autoCompleteData[findIndex] = {
          groupId: userSelectGroup,
          keyValue: Number(autoClipbookId.key),
          keyName: autoClipbookId.name,
        }
      } else {
        autoCompleteData = [
          ...autoCompleteData,
          {
            groupId: userSelectGroup,
            keyValue: Number(autoClipbookId.key),
            keyName: autoClipbookId.name,
          },
        ]
      }
    } else {
      autoCompleteData = [
        ...autoCompleteData,
        {
          groupId: userSelectGroup,
          keyValue: Number(autoClipbookId.key),
          keyName: autoClipbookId.name,
        },
      ]
    }
    dispatch(userClipbookListAutoSaveDataAction(autoCompleteData))
    if (type !== '') {
      openToast(
        ClipbookAutoRegisterContext({
          valueName: autoClipbookId.name,
          onChangeAction: () => {
            type === 'checked'
              ? setClipbookPopupAction(true, apiDataList ? apiDataList : [], autoClipbookId.key)
              : setOneClipbookPopupAction(true, apiDataList ? apiDataList[0] : null, autoClipbookId.key)
          },
        }),
        'success'
      )
    }
  }

  const setOneClipbookPopupAction = async (
    e: boolean,
    idList: MonitoringSearchNewsDocumentDto | null,
    valueKey?: string
  ) => {
    let list: number[] = []
    // @ts-ignore
    if (idList && idList.clipBookIdTitleList && idList.clipBookIdTitleList.length > 0) {
      // @ts-ignore
      for await (const clipbookIdListProp of idList.clipBookIdTitleList) {
        list = [...list, Number(clipbookIdListProp.id)]
      }
    }
    if (valueKey) {
      const find = list.find(k => k.toString() === valueKey)
      if (!find) {
        list = [...list, Number(valueKey)]
      }
    }
    if (e) {
      await autoClipbookListData('', [])
    }
    dispatch(
      initClipbookPopupAction({
        isOpen: e,
        type: 'any',
        origin: list,
        list: list,
        except: [],
        idList: idList ? [idList] : [],
      })
    )
  }

  const insertNewsToClipbookId = async (
    clipbookIdKey: number[],
    newsid: number[],
    insertedDate: string[],
    autoClipbookId: { key: string; name: string },
    userClipbookList: userAutoSaveDataProps[],
    type: string,
    apiDataList?: MonitoringSearchNewsDocumentDto[]
  ) => {
    let resultCode = ''
    const res = await addClipbookNews(clipbookIdKey, newsid, insertedDate)
    if (res === 'S') {
      if (autoClipbookId && autoClipbookId.key !== '' && autoClipbookId.name !== '' && userSelectGroup) {
        autoRegisterClipbookAction(userClipbookList, autoClipbookId, type, apiDataList)
      }
      resultCode = 'init'
    }

    return resultCode
  }

  const setClipbookData = async (
    items: clipbookListPageProps,
    userClipbookList: userAutoSaveDataProps[],
    apiDataList: clipbookContentListProps[]
  ) => {
    let resultCode = ''
    let resultClipbookListProps: clipbookDataListProps[] = []
    let newsIdItem: number[] = []
    let deleteItem: number[] = []
    let newsIndexItem: string[] = []
    let autoClipbookId = {
      name: '',
      key: '',
    }
    if (items.newsIdList.length > 0) {
      for await (const newsisId of items.newsIdList) {
        if (newsisId.newsid) {
          newsIdItem = [...newsIdItem, Number(newsisId.newsid)]
          newsIndexItem = [...newsIndexItem, moment(newsisId.inserted).format('YYYYMM')]
        }
      }
      if (items.type === 'any') {
        if (items.origin.length > 0) {
          const findAutoClipbookId = items.clipbookIdList.filter(item => !items.origin.includes(item))
          if (findAutoClipbookId && findAutoClipbookId.length === 1) {
            const find = apiDataList.find(e => e?.clipBookId?.toString() === findAutoClipbookId[0].toString())
            autoClipbookId = {
              name: find && find?.title ? find?.title : '',
              key: find && find?.clipBookId ? find?.clipBookId.toString() : '',
            }
          }
          for await (const number of items.origin) {
            const find = items.clipbookIdList.find(e => e.toString() === number.toString())
            if (!find) {
              deleteItem = [...deleteItem, Number(number)]
            }
          }
          if (deleteItem.length > 0) {
            const res = await delClipbookNews(deleteItem, newsIdItem)
            if (res === 'S') {
              if (items.clipbookIdList.length > 0) {
                const res = await addClipbookNews(items.clipbookIdList, newsIdItem, newsIndexItem)
                if (res === 'S') {
                  if (items.clipbookDataList.length > 0) {
                    resultClipbookListProps = items.clipbookDataList
                  }
                  resultCode = 'init'
                }
              } else {
                resultCode = 'init'
              }
            }
          } else {
            if (items.clipbookIdList.length > 0) {
              resultCode = await insertNewsToClipbookId(
                items.clipbookIdList,
                newsIdItem,
                newsIndexItem,
                autoClipbookId,
                userClipbookList,
                ''
              )
              if (items.clipbookDataList.length > 0) {
                resultClipbookListProps = items.clipbookDataList
              }
              resultCode = 'init'
            } else {
              dispatch(
                initClipbookPopupAction({ isOpen: false, type: 'add', list: [], origin: [], except: [], idList: [] })
              )
            }
          }
        } else {
          if (items.clipbookIdList.length > 0) {
            if (items.clipbookIdList.length > 1) {
              const find = apiDataList.find(e => e?.clipBookId?.toString() === items.clipbookIdList[0].toString())
              autoClipbookId = {
                name: find && find?.title ? find?.title : '',
                key: find && find?.clipBookId ? find?.clipBookId.toString() : '',
              }
            }
            resultCode = await insertNewsToClipbookId(
              items.clipbookIdList,
              newsIdItem,
              newsIndexItem,
              autoClipbookId,
              userClipbookList,
              ''
            )
            if (items.clipbookDataList.length > 0) {
              resultClipbookListProps = items.clipbookDataList
            }
            resultCode = 'init'
          } else {
            openToast('추가할 클립북을 선택해주세요', 'error')
          }
        }
      } else {
        if (items.clipbookIdList.length > 0) {
          if (items.clipbookIdList.length > 1) {
            const find = apiDataList.find(e => e?.clipBookId?.toString() === items.clipbookIdList[0].toString())
            autoClipbookId = {
              name: find && find?.title ? find?.title : '',
              key: find && find?.clipBookId ? find?.clipBookId.toString() : '',
            }
          }
          resultCode = await insertNewsToClipbookId(
            items.clipbookIdList,
            newsIdItem,
            newsIndexItem,
            autoClipbookId,
            userClipbookList,
            ''
          )
          if (items.clipbookDataList.length > 0) {
            resultClipbookListProps = items.clipbookDataList
          }
          resultCode = 'init'
        } else {
          openToast('추가할 클립북을 선택해주세요', 'error')
        }
      }
    } else {
      openToast('잘못된 접근입니다.', 'error')
    }
    return {
      resultCode,
      deleteItem,
      resultClipbookListProps,
    }
  }

  return {
    clipbookListPage,
    clipbookContentList,
    userClipbookListAutoSaveData,

    autoClipbookListData,
    setClipbookPopupAction,
    createClipbookAction,
    setClipbookData,

    setclipbookPopupNameAction,
    clipbookListPageCheckStatusChange,
  }
}
