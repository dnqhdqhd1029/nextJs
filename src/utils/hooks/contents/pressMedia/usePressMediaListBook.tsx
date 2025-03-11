import { useCallback } from 'react'
import { useRouter } from 'next/router'

import { disclosureScopeFilterOptionList } from '~/components/contents/common/forms/PressMediaListBookPopup/defaultData'
import {
  MediaAddRegisterContext,
  MediaAutoRegisterContext,
  PressAddRegisterContext,
  PressAutoRegisterContext,
} from '~/components/contents/common/forms/PressMediaListBookPopup/PressMediaAutoRegisterContext'
import { MEDIA_VALUE_MAX_POINT } from '~/constants/common'
import {
  userAutoSaveDataProps,
  userMediaListAutoSaveDataAction,
  userPressListAutoSaveDataAction,
} from '~/stores/modules/contents/extraData/extra'
import {
  initSearchRegisterListPopupAction,
  mediaContentListProps,
  searchRegisterListAction,
  searchRegisterListPopupAction,
  searchRegisterListPopupProps,
  searchRegisterListProps,
} from '~/stores/modules/contents/pressMedia/pressMediaListBookPopup'
import { PageableDataDto } from '~/types/contents/api'
import {
  ESearchJournalistDocumentDto,
  ESearchMediaDocumentDto,
  JournalistMediaGroupItem,
} from '~/types/contents/PressMedia'
import { apiGetJournalistGroup } from '~/utils/api/groupList/journalist/useGetJournalistGroup'
import { usePostJournalistGroupAddJournalId } from '~/utils/api/groupList/journalist/usePostJournalistGroupAddJournalist'
import { usePostJournalistCreate } from '~/utils/api/groupList/journalist/usePostJournalistGroupCreate'
import { usePostJournalistGroupDeleteJournal } from '~/utils/api/groupList/journalist/usePostJournalistGroupDeleteJournalist'
import { apiGetMediaGroup } from '~/utils/api/groupList/media/useGetMediaGroup'
import { usePostMediaGroupAddMedia } from '~/utils/api/groupList/media/usePostMediaGroupAddMedia'
import { usePostMediaCreate } from '~/utils/api/groupList/media/usePostMediaGroupCreate'
import { usePostMediaGroupDeleteMedia } from '~/utils/api/groupList/media/usePostMediaGroupDeleteMedia'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const usePressMediaListBook = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { searchRegisterListPopup, searchRegisterList } = useAppSelector(state => state.pressMediaListBookPopupSlice)
  const { mediaDuplicationIdList, pressDuplicationIdList, userPressListAutoSaveData, userMediaListAutoSaveData } =
    useAppSelector(state => state.extraSlice)
  const { licenseInfo, userInfo, userSelectGroup, shareCodeData, timeZone, frequentlyUsedCommonCode } = useAppSelector(
    state => state.authSlice
  )

  const createJournalistGroup = usePostJournalistCreate()
  const createMediaGroup = usePostMediaCreate()
  const journalistGroupDeleteJournalist = usePostJournalistGroupDeleteJournal()
  const journalistGroupAddJournalist = usePostJournalistGroupAddJournalId()
  const mediaGroupDeleteMedia = usePostMediaGroupDeleteMedia()
  const mediaGroupAddMedia = usePostMediaGroupAddMedia()

  const pressSearchRegisterListCheckStatusChange = useCallback(
    async (e: boolean, item: mediaContentListProps, props: searchRegisterListPopupProps) => {
      let tempSearchRegistList = props.searchRegistList
      let tempSearchRegistIdList = props.searchRegistIdList
      if (item.jrnlstListId && item.title) {
        if (e) {
          tempSearchRegistIdList = [...props.searchRegistIdList, Number(item.jrnlstListId)]
          tempSearchRegistList = [...props.searchRegistList, { id: Number(item.jrnlstListId), name: item?.title }]
        } else {
          tempSearchRegistIdList = props.searchRegistIdList.filter(e => e !== Number(item.jrnlstListId))
          tempSearchRegistList = props.searchRegistList.filter(e => e.id !== Number(item.jrnlstListId))
        }
      }
      dispatch(
        searchRegisterListPopupAction({
          ...props,
          isActive: calculateChangeValueCheck(tempSearchRegistIdList, props.origin),
          searchRegistIdList: tempSearchRegistIdList,
          searchRegistList: tempSearchRegistList,
        })
      )
    },
    [searchRegisterListPopup.searchRegistIdList, searchRegisterListPopup.searchRegistList]
  )

  const mediaSearchRegisterListCheckStatusChange = useCallback(
    async (e: boolean, item: mediaContentListProps, props: searchRegisterListPopupProps) => {
      let tempSearchRegistList = props.searchRegistList
      let tempSearchRegistIdList = props.searchRegistIdList
      if (item.mediaListId && item.title) {
        if (e) {
          tempSearchRegistIdList = [...props.searchRegistIdList, Number(item.mediaListId)]
          tempSearchRegistList = [...props.searchRegistList, { id: Number(item.mediaListId), name: item?.title }]
        } else {
          tempSearchRegistIdList = props.searchRegistIdList.filter(e => e !== Number(item.mediaListId))
          tempSearchRegistList = props.searchRegistList.filter(e => e.id !== Number(item.mediaListId))
        }
      }
      dispatch(
        searchRegisterListPopupAction({
          ...props,
          isActive: calculateChangeValueCheck(tempSearchRegistIdList, props.origin),
          searchRegistIdList: tempSearchRegistIdList,
          searchRegistList: tempSearchRegistList,
        })
      )
    },
    [searchRegisterListPopup.searchRegistIdList, searchRegisterListPopup.searchRegistList]
  )

  const setSearchRegisterPopupNameAction = useCallback(
    async (e: string, props: searchRegisterListPopupProps) => {
      let param = {
        ...props,
        name: e,
        nameErr: '',
      }
      if (e && e.length >= 100) {
        param = {
          ...props,
          nameErr: '목록명은 100자를 넘을 수 없습니다.',
        }
      }
      if (e === '' && props.kind !== 'media') {
        await journalistCustomSearchListData('', props.except)
      } else if (e === '' && props.kind === 'media') {
        await mediaCustomSearchListData('', props.except)
      }
      dispatch(searchRegisterListPopupAction(param))
    },
    [searchRegisterListPopup.name, searchRegisterListPopup.nameErr]
  )

  const setMediaSearchRegistPopupAction = async (e: boolean, idList: ESearchMediaDocumentDto[], valueKey?: string) => {
    let mediaRegistListNull = false
    let userMediaRegistList: number[] = []
    if (idList && idList.length > 0) {
      for await (const idListProp of idList) {
        if (!mediaRegistListNull) {
          if (idListProp.mediaListList && idListProp.mediaListList.length > 0) {
            const currentPressRegistId = idListProp.mediaListList.map(i => Number(i.id))
            if (userMediaRegistList.length > 0) {
              userMediaRegistList = userMediaRegistList.filter(item => currentPressRegistId.includes(item))
            } else {
              userMediaRegistList = currentPressRegistId
            }
          } else {
            mediaRegistListNull = true
          }
        }
      }
    }
    if (valueKey) {
      const find = userMediaRegistList.find(k => k.toString() === valueKey)
      if (!find) {
        userMediaRegistList = [...userMediaRegistList, Number(valueKey)]
        mediaRegistListNull = false
      }
    }
    if (e) {
      await mediaCustomSearchListData('', mediaRegistListNull ? [] : userMediaRegistList)
    }
    dispatch(
      initSearchRegisterListPopupAction({
        isOpen: e,
        kind: 'media',
        type: 'add',
        list: [],
        origin: [],
        except: mediaRegistListNull ? [] : userMediaRegistList,
        mediaIdList: idList,
        journalIdList: [],
      })
    )
  }

  const setOneMediaSearchRegistPopupAction = async (
    e: boolean,
    idList: ESearchMediaDocumentDto | null,
    valueKey?: string
  ) => {
    let list: number[] = []
    if (idList && idList.mediaListList && idList.mediaListList.length > 0) {
      for await (const mediaListListProp of idList.mediaListList) {
        list = [...list, Number(mediaListListProp.id)]
      }
    }
    if (valueKey) {
      const find = list.find(k => k.toString() === valueKey)
      if (!find) {
        list = [...list, Number(valueKey)]
      }
    }
    if (e) {
      await mediaCustomSearchListData('', [])
    }
    dispatch(
      initSearchRegisterListPopupAction({
        isOpen: e,
        kind: 'media',
        type: 'any',
        origin: list,
        list: list,
        except: [],
        mediaIdList: idList ? [idList] : [],
        journalIdList: [],
      })
    )
  }

  const autoRegisterMediaRegistIdAction = (
    userMediaRegistList: userAutoSaveDataProps[],
    autoMediaRegistId: { key: string; name: string },
    type: string,
    eSearchMedia?: ESearchMediaDocumentDto[]
  ) => {
    let autoCompleteData = [...userMediaRegistList]
    if (autoCompleteData && autoCompleteData.length > 0) {
      const findIndex = autoCompleteData.findIndex(e => e.groupId.toString() === userSelectGroup.toString())
      if (findIndex !== undefined && findIndex !== null && findIndex > -1) {
        autoCompleteData[findIndex] = {
          groupId: userSelectGroup,
          keyValue: Number(autoMediaRegistId.key),
          keyName: autoMediaRegistId.name,
        }
      } else {
        autoCompleteData = [
          ...autoCompleteData,
          {
            groupId: userSelectGroup,
            keyValue: Number(autoMediaRegistId.key),
            keyName: autoMediaRegistId.name,
          },
        ]
      }
    } else {
      autoCompleteData = [
        ...autoCompleteData,
        {
          groupId: userSelectGroup,
          keyValue: Number(autoMediaRegistId.key),
          keyName: autoMediaRegistId.name,
        },
      ]
    }
    dispatch(userMediaListAutoSaveDataAction(autoCompleteData))
    if (type !== '') {
      openToast(
        MediaAutoRegisterContext({
          valueName: autoMediaRegistId.name,
          onChangeAction: () => {
            type === 'checked'
              ? setMediaSearchRegistPopupAction(true, eSearchMedia ? eSearchMedia : [], autoMediaRegistId.key)
              : setOneMediaSearchRegistPopupAction(true, eSearchMedia ? eSearchMedia[0] : null, autoMediaRegistId.key)
          },
        }),
        'success'
      )
    }
  }

  const insertMediaToMediaRegistId = async (
    searchRegistIdList: number[],
    mediaIdItem: number[],
    autoMediaRegistId: { key: string; name: string },
    userMediaRegistList: userAutoSaveDataProps[],
    type: string,
    eSearchMedia?: ESearchMediaDocumentDto[]
  ) => {
    let resultCode = ''
    const { status, message } = await mediaGroupAddMedia.mutateAsync({
      // @ts-ignore
      mediaListIdList: searchRegistIdList,
      mediaIdList: mediaIdItem,
    })
    if (status === 'S') {
      if (autoMediaRegistId && autoMediaRegistId.key !== '' && autoMediaRegistId.name !== '' && userSelectGroup) {
        autoRegisterMediaRegistIdAction(userMediaRegistList, autoMediaRegistId, type, eSearchMedia)
      }
      resultCode = 'init'
    }

    return resultCode
  }

  const setMediaListData = async (
    items: searchRegisterListPopupProps,
    userMediaRegistList: userAutoSaveDataProps[],
    apiDataList: mediaContentListProps[]
  ) => {
    let resultCode = ''
    let resultSearchRegisterListProps: searchRegisterListProps[] = []
    let mediaIdItem: number[] = []
    let deleteItem: number[] = []
    let autoMediaRegistId = {
      name: '',
      key: '',
    }
    if (items.mediaIdList.length > 0) {
      for await (const e of items.mediaIdList) {
        if (e.mid) {
          mediaIdItem = [...mediaIdItem, Number(e.mid)]
        }
      }
      if (items.type === 'any') {
        if (items.origin.length > 0) {
          const findAutoMediaRegistId = items.searchRegistIdList.filter(item => !items.origin.includes(item))
          if (findAutoMediaRegistId && findAutoMediaRegistId.length === 1) {
            const find = apiDataList.find(e => e?.mediaListId?.toString() === findAutoMediaRegistId[0].toString())
            autoMediaRegistId = {
              name: find && find?.title ? find?.title : '',
              key: find && find?.mediaListId ? find?.mediaListId.toString() : '',
            }
          }
          for await (const number of items.origin) {
            const find = items.searchRegistIdList.find(e => e.toString() === number.toString())
            if (!find) {
              deleteItem = [...deleteItem, Number(number)]
            }
          }
          if (deleteItem.length > 0) {
            const { status, message } = await mediaGroupDeleteMedia.mutateAsync({
              // @ts-ignore
              mediaListIdList: deleteItem,
              mediaIdList: mediaIdItem,
            })
            if (status === 'S') {
              if (items.searchRegistIdList.length > 0) {
                const { status: res, message } = await mediaGroupAddMedia.mutateAsync({
                  //@ts-ignore
                  mediaListIdList: items.searchRegistIdList,
                  mediaIdList: mediaIdItem,
                })
                if (res === 'S') {
                  if (items.searchRegistList.length > 0) {
                    resultSearchRegisterListProps = items.searchRegistList
                  }
                  resultCode = 'init'
                }
              } else {
                resultCode = 'init'
              }
            }
          } else {
            if (items.searchRegistIdList.length > 0) {
              resultCode = await insertMediaToMediaRegistId(
                items.searchRegistIdList,
                mediaIdItem,
                autoMediaRegistId,
                userMediaRegistList,
                ''
              )
              if (items.searchRegistList.length > 0) {
                resultSearchRegisterListProps = items.searchRegistList
              }
              resultCode = 'init'
            } else {
              dispatch(
                initSearchRegisterListPopupAction({
                  isOpen: false,
                  kind: 'media',
                  type: 'add',
                  list: [],
                  origin: [],
                  except: [],
                  mediaIdList: [],
                  journalIdList: [],
                })
              )
            }
          }
        } else {
          if (items.searchRegistIdList.length > 0) {
            if (items.searchRegistIdList.length > 1) {
              const find = apiDataList.find(e => e?.mediaListId?.toString() === items.searchRegistIdList[0].toString())
              autoMediaRegistId = {
                name: find && find?.title ? find?.title : '',
                key: find && find?.mediaListId ? find?.mediaListId.toString() : '',
              }
            }
            resultCode = await insertMediaToMediaRegistId(
              items.searchRegistIdList,
              mediaIdItem,
              autoMediaRegistId,
              userMediaRegistList,
              ''
            )
            if (items.searchRegistList.length > 0) {
              resultSearchRegisterListProps = items.searchRegistList
            }
            resultCode = 'init'
          } else {
            openToast('추가할 미디어 리스트를 선택해주세요', 'error')
          }
        }
      } else {
        if (items.searchRegistIdList.length > 0) {
          if (items.searchRegistIdList.length > 1) {
            const find = apiDataList.find(e => e?.mediaListId?.toString() === items.searchRegistIdList[0].toString())
            autoMediaRegistId = {
              name: find && find?.title ? find?.title : '',
              key: find && find?.mediaListId ? find?.mediaListId.toString() : '',
            }
          }
          resultCode = await insertMediaToMediaRegistId(
            items.searchRegistIdList,
            mediaIdItem,
            autoMediaRegistId,
            userMediaRegistList,
            ''
          )
          if (items.searchRegistList.length > 0) {
            resultSearchRegisterListProps = items.searchRegistList
          }
          resultCode = 'init'
        } else {
          openToast('추가할 미디어 리스트를 선택해주세요', 'error')
        }
      }
    } else {
      openToast('잘못된 접근입니다.', 'error')
    }

    return {
      resultCode,
      deleteItem,
      resultSearchRegisterListProps,
    }
  }

  const setPressListData = async (
    items: searchRegisterListPopupProps,
    userPressRegistList: userAutoSaveDataProps[],
    apiDataList: mediaContentListProps[]
  ) => {
    let resultCode = ''
    let resultSearchRegisterListProps: searchRegisterListProps[] = []
    let journalIdItem: number[] = []
    let deleteItem: number[] = []
    let autoPressRegistId = {
      name: '',
      key: '',
    }
    if (items.journalIdList.length > 0) {
      for await (const e of items.journalIdList) {
        if (e.jrnlst_id) {
          journalIdItem = [...journalIdItem, Number(e.jrnlst_id)]
        }
      }
      if (items.type === 'any') {
        if (items.origin.length > 0) {
          const findAutoPressRegistId = items.searchRegistIdList.filter(item => !items.origin.includes(item))
          if (findAutoPressRegistId && findAutoPressRegistId.length === 1) {
            const find = apiDataList.find(e => e?.jrnlstListId?.toString() === findAutoPressRegistId[0].toString())
            autoPressRegistId = {
              name: find && find?.title ? find?.title : '',
              key: find && find?.jrnlstListId ? find?.jrnlstListId.toString() : '',
            }
          }
          for await (const number of items.origin) {
            const find = items.searchRegistIdList.find(e => e.toString() === number.toString())
            if (!find) {
              deleteItem = [...deleteItem, Number(number)]
            }
          }
          if (deleteItem.length > 0) {
            const { status, message } = await journalistGroupDeleteJournalist.mutateAsync({
              jrnlstListIdList: deleteItem,
              // @ts-ignore
              journalistIdList: journalIdItem,
            })
            if (status === 'S') {
              if (items.searchRegistIdList.length > 0) {
                const { status: res, message } = await journalistGroupAddJournalist.mutateAsync({
                  jrnlstListIdList: items.searchRegistIdList,
                  journalistIdList: journalIdItem,
                })
                if (res === 'S') {
                  if (items.searchRegistList.length > 0) {
                    resultSearchRegisterListProps = items.searchRegistList
                  }
                  resultCode = 'init'
                }
              } else {
                resultCode = 'init'
              }
            }
          } else {
            if (items.searchRegistIdList.length > 0) {
              resultCode = await insertPressToPressRegistId(
                items.searchRegistIdList,
                journalIdItem,
                autoPressRegistId,
                userPressRegistList,
                ''
              )
              if (items.searchRegistList.length > 0) {
                resultSearchRegisterListProps = items.searchRegistList
              }
              resultCode = 'init'
            } else {
              dispatch(
                initSearchRegisterListPopupAction({
                  isOpen: false,
                  kind: 'media',
                  type: 'add',
                  list: [],
                  origin: [],
                  except: [],
                  mediaIdList: [],
                  journalIdList: [],
                })
              )
            }
          }
        } else {
          if (items.searchRegistIdList.length > 0) {
            if (items.searchRegistIdList.length > 1) {
              const find = apiDataList.find(e => e?.jrnlstListId?.toString() === items.searchRegistIdList[0].toString())
              autoPressRegistId = {
                name: find && find?.title ? find?.title : '',
                key: find && find?.jrnlstListId ? find?.jrnlstListId.toString() : '',
              }
            }
            resultCode = await insertPressToPressRegistId(
              items.searchRegistIdList,
              journalIdItem,
              autoPressRegistId,
              userPressRegistList,
              ''
            )
            if (items.searchRegistList.length > 0) {
              resultSearchRegisterListProps = items.searchRegistList
            }
            resultCode = 'init'
          } else {
            openToast('추가할 언론인 리스트를 선택해주세요', 'error')
          }
        }
      } else {
        if (items.searchRegistIdList.length > 0) {
          if (items.searchRegistIdList.length > 1) {
            const find = apiDataList.find(e => e?.jrnlstListId?.toString() === items.searchRegistIdList[0].toString())
            autoPressRegistId = {
              name: find && find?.title ? find?.title : '',
              key: find && find?.jrnlstListId ? find?.jrnlstListId.toString() : '',
            }
          }
          resultCode = await insertPressToPressRegistId(
            items.searchRegistIdList,
            journalIdItem,
            autoPressRegistId,
            userPressRegistList,
            ''
          )
          if (items.searchRegistList.length > 0) {
            resultSearchRegisterListProps = items.searchRegistList
          }
          resultCode = 'init'
        } else {
          openToast('추가할 언론인 리스트를 선택해주세요', 'error')
        }
      }
    } else {
      openToast('잘못된 접근입니다.', 'error')
    }
    return { resultCode, deleteItem, resultSearchRegisterListProps }
  }

  const insertPressToPressRegistId = async (
    searchRegistIdList: number[],
    journalIdItem: number[],
    autoPressRegistId: { key: string; name: string },
    userPressRegistList: userAutoSaveDataProps[],
    type: string,
    eSearchJournalist?: ESearchJournalistDocumentDto[]
  ) => {
    let resultCode = ''
    const { status, message } = await journalistGroupAddJournalist.mutateAsync({
      jrnlstListIdList: searchRegistIdList,
      journalistIdList: journalIdItem,
    })
    if (status === 'S') {
      if (autoPressRegistId && autoPressRegistId.key !== '' && autoPressRegistId.name !== '' && userInfo?.userId) {
        autoRegisterPressRegistIdAction(userPressRegistList, autoPressRegistId, type, eSearchJournalist)
      }
      resultCode = 'init'
    }
    return resultCode
  }

  const autoRegisterPressRegistIdAction = (
    userPressRegistList: userAutoSaveDataProps[],
    autoPressRegistId: { key: string; name: string },
    type: string,
    eSearchJournalist?: ESearchJournalistDocumentDto[]
  ) => {
    let autoCompleteData = [...userPressRegistList]
    if (autoCompleteData && autoCompleteData.length > 0) {
      const findIndex = autoCompleteData.findIndex(e => e.groupId.toString() === userSelectGroup.toString())
      if (findIndex !== undefined && findIndex !== null && findIndex > -1) {
        autoCompleteData[findIndex] = {
          groupId: userSelectGroup,
          keyValue: Number(autoPressRegistId.key),
          keyName: autoPressRegistId.name,
        }
      } else {
        autoCompleteData = [
          ...autoCompleteData,
          {
            groupId: userSelectGroup,
            keyValue: Number(autoPressRegistId.key),
            keyName: autoPressRegistId.name,
          },
        ]
      }
    } else {
      autoCompleteData = [
        ...autoCompleteData,
        {
          groupId: userSelectGroup,
          keyValue: Number(autoPressRegistId.key),
          keyName: autoPressRegistId.name,
        },
      ]
    }
    dispatch(userPressListAutoSaveDataAction(autoCompleteData))
    if (type !== '') {
      openToast(
        PressAutoRegisterContext({
          valueName: autoPressRegistId.name,
          onChangeAction: () => {
            type === 'checked'
              ? setPressSearchRegistPopupAction(true, eSearchJournalist ? eSearchJournalist : [], autoPressRegistId.key)
              : setOnePressSearchRegistPopupAction(
                  true,
                  eSearchJournalist ? eSearchJournalist[0] : null,
                  autoPressRegistId.key
                )
          },
        }),
        'success'
      )
    }
  }

  const setOnePressSearchRegistPopupAction = async (
    e: boolean,
    idList: ESearchJournalistDocumentDto | null,
    valueKey?: string
  ) => {
    let list: number[] = []
    if (idList && idList.journalistGroupList && idList.journalistGroupList.length > 0) {
      for await (const journalistGroupListProp of idList.journalistGroupList) {
        list = [...list, Number(journalistGroupListProp.id)]
      }
    }
    if (valueKey) {
      const find = list.find(k => k.toString() === valueKey)
      if (!find) {
        list = [...list, Number(valueKey)]
      }
    }
    if (e) {
      await journalistCustomSearchListData('', [])
    }
    dispatch(
      initSearchRegisterListPopupAction({
        isOpen: e,
        kind: 'press',
        type: 'any',
        origin: list,
        list: list,
        except: [],
        mediaIdList: [],
        journalIdList: idList ? [idList] : [],
      })
    )
  }

  const setPressSearchRegistPopupAction = async (
    e: boolean,
    idList: ESearchJournalistDocumentDto[],
    valueKey?: string
  ) => {
    let pressRegistListNull = false
    let userpressRegistList: number[] = []
    if (idList && idList.length > 0) {
      for await (const idListProp of idList) {
        if (!pressRegistListNull) {
          if (idListProp.journalistGroupList && idListProp.journalistGroupList.length > 0) {
            const currentPressRegistId = idListProp.journalistGroupList.map(i => Number(i.id))
            if (userpressRegistList.length > 0) {
              userpressRegistList = userpressRegistList.filter(item => currentPressRegistId.includes(item))
            } else {
              userpressRegistList = currentPressRegistId
            }
          } else {
            pressRegistListNull = true
          }
        }
      }
    }
    if (valueKey) {
      const find = userpressRegistList.find(k => k.toString() === valueKey)
      if (!find) {
        userpressRegistList = [...userpressRegistList, Number(valueKey)]
        pressRegistListNull = false
      }
    }
    if (e) {
      await journalistCustomSearchListData('', pressRegistListNull ? [] : userpressRegistList)
    }
    dispatch(
      initSearchRegisterListPopupAction({
        isOpen: e,
        kind: 'press',
        type: 'add',
        list: [],
        origin: [],
        except: pressRegistListNull ? [] : userpressRegistList,
        mediaIdList: [],
        journalIdList: idList,
      })
    )
  }

  const handleDataInputSearchRegisterListPopup = async (e: searchRegisterListPopupProps) => {
    if (e.kind === 'press') {
      await journalistCustomSearchListData(e.name, e.except)
    } else {
      await mediaCustomSearchListData(e.name, e.except)
    }
  }

  const mediaCustomSearchListData = async (e: string, except: number[]) => {
    const { status, data, message } = await apiGetMediaGroup({
      page: 1,
      size: MEDIA_VALUE_MAX_POINT,
      sort: ['updateAt!desc'],
      title: e,
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      const res = data as PageableDataDto<JournalistMediaGroupItem>
      let param: mediaContentListProps[] = []
      if (res.content && res.content.length > 0) {
        for await (const content of res.content) {
          const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === content.shareCode)
          let temp: mediaContentListProps = {
            ...content,
            isEdit: userInfo.userId === content.owner?.userId ? true : content.shareCode === 'WRITABLE',
            isOwner: userInfo.userId === content.owner?.userId,
            settingList: [],
            shareCodeNm: findShareScopeList?.name || '',
          }
          param = [...param, temp]
        }
      }
      dispatch(searchRegisterListAction(param))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setClosePresMediaAction = async () => {
    dispatch(
      initSearchRegisterListPopupAction({
        isOpen: false,
        kind: '',
        type: '',
        list: [],
        origin: [],
        except: [],
        mediaIdList: [],
        journalIdList: [],
      })
    )
  }
  const journalistCustomSearchListData = async (e: string, except: number[]) => {
    const { status, data, message } = await apiGetJournalistGroup({
      page: 1,
      size: MEDIA_VALUE_MAX_POINT,
      sort: ['updateAt!desc'],
      title: e,
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      const res = data as PageableDataDto<JournalistMediaGroupItem>
      let param: mediaContentListProps[] = []
      if (res.content && res.content.length > 0) {
        for await (const content of res.content) {
          const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === content.shareCode)
          let temp: mediaContentListProps = {
            ...content,
            isEdit: userInfo.userId === content.owner?.userId ? true : content.shareCode === 'WRITABLE',
            isOwner: userInfo.userId === content.owner?.userId,
            settingList: [],
            shareCodeNm: findShareScopeList?.name || '',
          }
          param = [...param, temp]
        }
      }
      dispatch(searchRegisterListAction(param))
    } else {
      openToast(message?.message, 'error')
    }
  }

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

  const createRegisterMediaListAction = async (origins: searchRegisterListPopupProps) => {
    const { status, data, message } = await createMediaGroup.mutateAsync({
      title: origins.name,
      groupId: userSelectGroup,
      shareCode: shareCodeData.list.id,
    })
    if (status === 'S' && data) {
      dispatch(
        searchRegisterListPopupAction({
          ...origins,
          isActive: true,
          searchRegistIdList: [...origins.searchRegistIdList, Number(data)],
          searchRegistList: [...origins.searchRegistList, { id: Number(data), name: origins.name }],
        })
      )
      await mediaCustomSearchListData('', origins.except)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const createRegisterPressListAction = async (origins: searchRegisterListPopupProps) => {
    const { status, data, message } = await createJournalistGroup.mutateAsync({
      title: origins.name,
      groupId: userSelectGroup,
      shareCode: shareCodeData.list.id,
    })
    if (status === 'S' && data) {
      dispatch(
        searchRegisterListPopupAction({
          ...origins,
          isActive: true,
          searchRegistIdList: [...origins.searchRegistIdList, Number(data)],
          searchRegistList: [...origins.searchRegistList, { id: Number(data), name: origins.name }],
        })
      )
      await journalistCustomSearchListData('', origins.except)
    } else {
      openToast(message?.message, 'error')
    }
  }

  return {
    searchRegisterListPopup,
    searchRegisterList,
    userPressListAutoSaveData,
    userMediaListAutoSaveData,

    createRegisterMediaListAction,
    createRegisterPressListAction,
    journalistCustomSearchListData,
    mediaCustomSearchListData,
    handleDataInputSearchRegisterListPopup,
    setClosePresMediaAction,
    setPressListData,
    setMediaListData,

    setSearchRegisterPopupNameAction,
    mediaSearchRegisterListCheckStatusChange,
    pressSearchRegisterListCheckStatusChange,
  }
}
