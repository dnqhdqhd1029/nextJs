import { ChangeEvent, useCallback, useEffect, useRef } from 'react'
import _ from 'lodash'
import moment from 'moment/moment'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import {
  defaultActivityRecordWorkList,
  defaultNotEditableReleaseActivityRecordWorkList,
  defaultReleaseActivityRecordWorkList,
  defaultReleaseActivityRecordWorkListFull,
  defaultReleaseActivityRecordWorkListOptions,
  extendedCommonCodeTargetList,
  extendedShareScopeList,
} from '~/components/contents/activity/common/defaultData'
import {
  activityListReOnChangeAction,
  commmentListAction,
  getActionDataAction,
  searchContentListProps,
} from '~/stores/modules/contents/activity/activityList'
import {
  activityAction,
  activityCancelPopupAction,
  activityType,
  editorDataAction,
  filesListAction,
  filesListLoadingAction,
  getActivityPopupAction,
  initActivityPopupAction,
} from '~/stores/modules/contents/activity/activityPopup'
import {
  actionLogListAction,
  contentsActionLogListProps,
  getActionDataLoadingAction,
  setActionDataFromOtherAction,
} from '~/stores/modules/contents/activity/recordActivity'
import { pageCountProps } from '~/stores/modules/contents/myPurchase/myPurchase'
import {
  mediaActivityListFromListResult,
  pressActivityListFromListResult,
} from '~/stores/modules/contents/pressMedia/listResult'
import {
  setMediaActivityDataListAction,
  setMediaActivityTabAction,
  setMediaChangeActivityTabAction,
} from '~/stores/modules/contents/pressMedia/mediaProfile'
import {
  activityListByNewActivity,
  mediaActivityListByNewActivity,
} from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import {
  PaginationInfoProps,
  setActivityDataListAction,
  setActivityTabAction,
  setChangeActivityTabAction,
} from '~/stores/modules/contents/pressMedia/pressProfile'
import {
  activityListByJournalIdAction,
  activityListByMediaIdAction,
  activityLoadingAction,
} from '~/stores/modules/contents/pressMedia/savedSearch'
import {
  ActionCommentDto,
  ActionDto,
  ActionLogDto,
  BaseResponseCommonObject,
  type ElasticSearchReturnDtoNewsDocumentDto,
  ESearchNewsCondDto,
  GroupDto,
  PageActionCommentDto,
  PageActionDtoForList,
  TagDto,
  type UserDtoForGroup,
} from '~/types/api/service'
import { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem, TagSearchCreateLayerItem } from '~/types/contents/Common'
import { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import { apiGetActionListByConfition, UseGetActionListParams } from '~/utils/api/action/useGetActionList'
import { apiGetOneAction, useGetOneAction } from '~/utils/api/action/useGetOneAction'
import { usePostActionCreate, UsePostActionCreateParams } from '~/utils/api/action/usePostActionCreate'
import { usePutActionUpdate } from '~/utils/api/action/usePutActionUpdate'
import { apiGetActionCommentList } from '~/utils/api/actionComment/useGetActionCommentList'
import { apiGetActionLogs } from '~/utils/api/actionLog/useGetActionLogs'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import { apiGetActiveGroupInfo } from '~/utils/api/group/useGetGroupSearch'
import { usePostNewsSearch } from '~/utils/api/news/usePostNewsSearch'
import { openToast } from '~/utils/common/toast'
import { FileType } from '~/utils/hooks/common/useFileDragAndDrop'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

const fileSizeUnit = 'MB'
const fileSizeLimit = 5
const fileLengthLimit = 5
const messages = {
  ko: {
    code100: '파일 사이즈가 초과되었습니다.',
    code101: '파일 갯수가 초과되었습니다.',
    code200: '파일 업로드에 실패하였습니다.',
    code201: '파일 삭제에 실패하였습니다.',
  },
  en: {
    code100: 'File size exceeded.',
    code101: 'The number of files has been exceeded.',
    code200: 'Failed to upload file.',
    code201: 'Failed to delete file.',
  },
}

export const useActivityPopup = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const editorContent = useRef<string>('')

  const settingsRefinedValue = useAppSelector(state => state.userSettingSlice.refinedValue)
  const pressProfileSlice = useAppSelector(state => state.pressProfileSlice)
  const mediaProfileSlice = useAppSelector(state => state.mediaProfileSlice)
  const activityListSlice = useAppSelector(state => state.activityListSlice)
  const savedSearchSlice = useAppSelector(state => state.savedSearchSlice)
  const pressMediaSearchResultSlice = useAppSelector(state => state.pressMediaSearchResultSlice)
  const pressMediaListResultSlice = useAppSelector(state => state.pressMediaListResultSlice)
  const { activity, filesListLoading, isWrite, activityCancelPopup, ownerId, editorData, isEditor } = useAppSelector(
    state => state.activityPopupSlice
  )
  const { licenseInfo, frequentlyUsedCommonCode, userInfo, timeZoneData, userSelectGroup, shareCodeData, timeZone } =
    useAppSelector(state => state.authSlice)

  const { data: getActionOriginData } = useGetOneAction(
    {
      id: activity.key,
      groupId: userSelectGroup,
    },
    {
      enabled: activity.key > 0,
    }
  )

  const getNewsSearchResult = usePostNewsSearch()
  const editActionById = usePutActionUpdate()
  const createActivity = usePostActionCreate()

  const setActivityCancelPopupAction = useCallback(
    (e: boolean) => dispatch(activityCancelPopupAction(e)),
    [activityCancelPopup]
  )

  const setActivityPopup = useCallback(
    () =>
      dispatch(
        initActivityPopupAction({
          keyValue: 0,
          isOpen: false,
          loading: true,
          type: [],
          state: [],
          typeValue: { id: '', name: '' },
          scrop: { id: '', name: '' },
        })
      ),
    [activity]
  )

  const setActivityType = useCallback(
    async (option: SelectListOptionItem, hook: activityType) =>
      dispatch(
        activityAction({
          ...hook,
          activityType: option,
          activityTypeMsg: '',
        })
      ),
    [activity.activityType]
  )

  const setOwnerChangedkey = useCallback(
    async (option: SelectListOptionItem, hook: activityType) =>
      dispatch(
        activityAction({
          ...hook,
          ownerChangedkey: option,
        })
      ),
    [activity.ownerChangedkey]
  )

  const setActivityState = useCallback(
    async (option: SelectListOptionItem, hook: activityType) =>
      dispatch(
        activityAction({
          ...hook,
          activityState: option,
        })
      ),
    [activity.activityState]
  )

  const setScrop = useCallback(
    async (option: SelectListOptionItem, hook: activityType) =>
      dispatch(
        activityAction({
          ...hook,
          scrop: option,
        })
      ),
    [activity.scrop]
  )

  const dateConfirmPageDataAction = useCallback(
    (date: Date, hook: activityType) => {
      dispatch(
        activityAction({
          ...hook,
          selectedDate: date,
        })
      )
    },
    [activity.selectedDate]
  )

  const timeConfirmPageDataAction = useCallback(
    (hours: number, minutes: number, items: activityType) => {
      dispatch(
        activityAction({
          ...items,
          selectedTime: { hours, minutes },
        })
      )
    },
    [activity.selectedTime]
  )

  const handleTagStatusChange = useCallback(
    async (item: MbTagSearchTagItem[], hook: activityType) => {
      dispatch(
        activityAction({
          ...hook,
          tagList: item,
        })
      )
    },
    [activity.tagList]
  )

  const handleTagClose = useCallback(
    async (item: MbTagSearchTagItem, hook: activityType) =>
      dispatch(
        activityAction({
          ...hook,
          tagList: _.cloneDeep(hook.tagList).filter(tag => tag.id !== item.id),
        })
      ),
    [activity.tagList]
  )

  const handleResetTagList = useCallback(
    async (hook: activityType) =>
      dispatch(
        activityAction({
          ...hook,
          tagList: [],
        })
      ),
    [activity.tagList]
  )

  const setAllResetTagPressListAction = useCallback(
    async (hook: activityType) =>
      dispatch(
        activityAction({
          ...hook,
          tagPressList: [],
        })
      ),
    [activity.tagPressList]
  )

  const setTagPressListAction = useCallback(
    async (param: MbTagSearchTagItem[], hook: activityType) =>
      dispatch(
        activityAction({
          ...hook,
          tagPressList: param,
        })
      ),
    [activity.tagPressList]
  )

  const setReceiverGroupAction = useCallback(
    (e: string, items: activityType) => {
      dispatch(
        activityAction({
          ...items,
          receiverGroup: e,
        })
      )
    },
    [activity.receiverGroup]
  )

  const setEmailPopupTitleAction = useCallback(
    (param: string, items: activityType) => {
      let props = {
        ...items,
        title: param,
        titleErr: '',
      }
      if (param && param.length >= 100) {
        props = {
          ...items,
          titleErr: '제목은 100자를 넘을 수 없습니다.',
        }
      }
      dispatch(activityAction(props))
    },
    [activity.title, activity.titleErr]
  )

  const setResetTagPressListAction = useCallback(
    async (param: MbTagSearchTagItem, hook: activityType) => {
      const res = hook.tagPressList.filter(item => item.id !== param.id)
      dispatch(
        activityAction({
          ...hook,
          tagPressList: res,
        })
      )
    },
    [activity.tagPressList]
  )

  const handleEditorContentGet = useCallback(
    async (content: string) => {
      editorContent.current = content
      const editorContentText = getTextFromEditorContent(editorContent.current)
      dispatch(
        editorDataAction({
          content: editorContentText,
          isEdit: activity.key > 0 ? editorContentText !== editorData : true,
          err: editorContentText.length > 0 ? '' : activity.contentErrorMessage,
        })
      )
    },
    [editorData, isEditor, activity.contentErrorMessage]
  )

  const onDeleteUserFile = useCallback(
    (param: FileType, e: activityType) => {
      if (e.filesList && e.filesList.length > 0) {
        const files = e.filesList.filter(file => file.id !== param.id)
        const params = {
          ...e,
          filesList: files,
          deletefilesList: param.file ? e.deletefilesList : [...e.deletefilesList, Number(param.id)],
        }
        dispatch(filesListAction(params))
      }
    },
    [activity.filesList, activity.deletefilesList, filesListLoading]
  )

  const getSize = (size: number, unit: string = 'kb') => {
    let calcuratedSize = 0
    if (unit === 'kb') {
      calcuratedSize = size / 1024
    } else if (unit === 'mb') {
      calcuratedSize = size / 1024 / 1024
    }
    return Number(calcuratedSize.toFixed(2))
  }

  const processUpload = (file: File, fileUnit: string, fileType: string): Promise<{ code: string; data: FileType }> => {
    return new Promise((resolve, reject) => {
      const res = {
        code: '',
        data: {},
      }
      try {
        let fileSrc = ''
        let width = 0
        let height = 0
        const mimeType = file.type
        const isImage =
          mimeType === 'image/jpeg' ||
          mimeType === 'image/png' ||
          mimeType === 'image/gif' ||
          mimeType === 'image/x-icon'

        if (isImage) {
          if (fileType !== '' && fileType !== 'image') {
            res.code = '파일만 업로드 가능합니다'
            resolve(res)
          } else {
            const reader = new FileReader()

            reader.onload = function (event) {
              const image = new Image()

              image.onload = function () {
                width = image.width
                height = image.height

                res.code = ''
                res.data = {
                  width,
                  height,
                  isImage,
                  file,
                  fileSrc,
                  id: uuid(),
                  size: getSize(file.size, fileUnit ? fileUnit.toLocaleLowerCase() : 'kb'),
                  mimeType,
                }
                resolve(res)
              }

              image.onerror = function () {
                res.code = '잘못된 이미지 입니다'
                resolve(res)
                //reject(new Error('Image loading error'))
              }

              //@ts-ignore
              image.src = event.target.result
              fileSrc = event.target?.result as string
            }

            reader.onerror = function () {
              res.code = '파일이 손상되었습니다'
              resolve(res)
              //reject(new Error('File reading error'))
            }

            reader.readAsDataURL(file)
          }
        } else {
          if (fileType !== '' && fileType === 'image') {
            res.code = '이미지파일만 업로드 가능합니다'
            resolve(res)
          } else {
            res.code = ''
            res.data = {
              width,
              height,
              isImage,
              file,
              fileSrc,
              id: uuid(),
              size: getSize(file.size, fileUnit ? fileUnit.toLocaleLowerCase() : 'kb'),
              mimeType,
            }
            resolve(res)
          }
        }
      } catch (e) {
        res.code = messages['ko'].code200
        resolve(res)
      }
    })
  }

  const getTextFromEditorContent = (content?: string) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content ?? ''
    tempDiv.querySelectorAll('meta').forEach(meta => meta.remove())
    return tempDiv?.innerHTML.trim() ?? ''
  }

  const nextStepValidate = async (param: activityType) => {
    if (param.title === '') {
      dispatch(
        activityAction({
          ...param,
          titleErr: '제목을 입력하세요',
        })
      )
      return false
    } else if (param.title.length >= 100) {
      dispatch(
        activityAction({
          ...param,
          titleErr: '활동 제목은 100자이상 입력할 수 없습니다',
        })
      )
      return false
    } else if (param.activityType.id === '') {
      dispatch(
        activityAction({
          ...param,
          activityTypeMsg: '유형을 선택하세요',
        })
      )
      return false
    } else {
      return true
    }
  }

  const uploadFile = async (files: FileList, fileUnit: string) => {
    let res: FileType[] = []
    const filesArr = Array.from(files)
    const max_size_per_file = parseInt(settingsRefinedValue['max_size_per_file'])
    const max_files_per_attach = parseInt(settingsRefinedValue['max_files_per_attach'])
    if (max_size_per_file) {
      for await (const totalFileLengthElement of filesArr) {
        const fileSize = getSize(totalFileLengthElement.size, fileUnit ? fileUnit.toLocaleLowerCase() : 'kb')
        if (fileSize > max_size_per_file) {
          openToast(messages['ko'].code100, 'error')
        } else {
          const temp = await processUpload(totalFileLengthElement, fileUnit, '')
          temp.code === '' ? (res = [...res, temp.data]) : openToast(temp.code, 'error')
        }
      }
    }

    return res
  }

  const onChangeFiles = async (e: ChangeEvent<HTMLInputElement> | any, items: activityType): Promise<void> => {
    e.preventDefault()
    e.stopPropagation()

    let param = { ...items }
    if (items.filesList && items.filesList.length > 4) {
      openToast('첨부 파일은 최대 5개까지 가능합니다.', 'error')
    } else {
      if (e.target?.files && e.target?.files.length > 0) {
        if (e.target?.files.length > 5) {
          openToast('첨부 파일은 최대 5개까지 가능합니다.', 'error')
        } else if (param.filesList.length + e.target?.files.length > 5) {
          openToast('첨부 파일은 최대 5개까지 가능합니다.', 'error')
        } else {
          dispatch(filesListLoadingAction(true))
          const result = await uploadFile(e.target?.files, fileSizeUnit)
          if (result.length > 0) {
            param.filesList = [...param.filesList, ...result]
          }
          dispatch(filesListAction(param))
        }
      }
    }
  }

  const setActivityAction = async (param: activityType, editor: string) => {
    try {
      let releaseSaveParams: any = {
        request: {
          category: param.activityType.id,
          year: param.activityType.id === 'PROMISE' ? moment(param.selectedDate).format('YYYY') : '',
          month: param.activityType.id === 'PROMISE' ? moment(param.selectedDate).format('MM') : '',
          day: param.activityType.id === 'PROMISE' ? moment(param.selectedDate).format('DD') : '',
          hour: param.activityType.id === 'PROMISE' ? param.selectedTime.hours.toString() : '',
          min: param.activityType.id === 'PROMISE' ? param.selectedTime.minutes.toString() : '',
          timezone: timeZone,
          groupId: userSelectGroup,
          shareCode: param.scrop.id,
          title: param.title,
          content: editor,
          state_filter: param.activityType.id !== 'NOTE' ? param.activityState.id : '',
          journalistIdList: [],
          mediaIdList: [],
          jrnstListIdList: [],
          mediaListIdList: [],
          tagIdList: [],
          mediaFileIdList: [],
          deletedFileIdList: param.deletefilesList,
        },
        fileList: [],
      }
      for await (const i of param.tagPressList) {
        if (i.className === 'journalistId') {
          releaseSaveParams.request.journalistIdList.push(Number(i.id))
        } else if (i.className === 'mediaId') {
          releaseSaveParams.request.mediaIdList.push(Number(i.id))
        } else if (i.className === 'jrnlstListId') {
          releaseSaveParams.request.jrnstListIdList.push(Number(i.id))
        } else {
          releaseSaveParams.request.mediaListIdList.push(Number(i.id))
        }
      }
      for await (const i of param.tagList) {
        releaseSaveParams.request.tagIdList.push(Number(i.id))
      }
      if (param.filesList && param.filesList.length > 0) {
        for await (const newFile of param.filesList) {
          if (newFile.file) {
            releaseSaveParams.fileList = [...releaseSaveParams.fileList, newFile.file]
          } else if (newFile.id) {
            releaseSaveParams.request.mediaFileIdList = [...releaseSaveParams.request.mediaFileIdList, newFile.id]
          }
        }
      }
      if (param.key > 0) {
        await editRelease(releaseSaveParams, param.key, param.ownerChangedkey.id)
      } else {
        await createRelease(releaseSaveParams)
      }
    } catch (e) {}
  }

  const getActivityData = async (params: UseGetActionListParams) => {
    let activityData: PageActionDtoForList | null = null
    try {
      const { status, data, message } = await apiGetActionListByConfition(params)
      if (status === 'S') {
        activityData = data as PageActionDtoForList
      }
    } catch (e) {}
    return activityData
  }

  const setActivityList = async (
    dto: UseGetActionListParams,
    origin: searchContentListProps[],
    keyId: number,
    pageCount: pageCountProps
  ) => {
    let commonCategory: SelectListOptionItem[] = []
    let commonState: SelectListOptionItem[] = []
    let commonStateFilter: SelectListOptionItem[] = []
    let preloadCommonCode: SelectListOptionItem[] = []
    let activityId = keyId
    let searchContentList: searchContentListProps[] = origin
    let tempPageCount = pageCount
    try {
      for (const re of extendedCommonCodeTargetList) {
        const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === re.id)
        if (find) {
          //@ts-ignore
          preloadCommonCode = find.commonCodeList
        } else {
          preloadCommonCode = await getCommonCode(re.id)
        }
        if (re.id === 'ACTION_CATEGORY_ALL') {
          commonCategory = preloadCommonCode
        } else if (re.id === 'ACTION_STATE') {
          commonState = preloadCommonCode
        } else if (re.id === 'ACTION_STATE_FILTER') {
          commonStateFilter = preloadCommonCode
        }
      }
      const res = await getActivityData(dto)
      if (res) {
        if (res.content && res.content.length > 0) {
          searchContentList = []
          for await (const paramElement of res.content) {
            const temp = {
              ...paramElement,
              categoryName: '',
              stateName: '',
            }

            const findCategory = commonCategory.find(e => e.id === paramElement.category)
            if (findCategory) {
              temp.categoryName = findCategory.name
            }
            if (paramElement.category !== 'MAILING' && paramElement.category !== 'PRESS_RELEASE') {
              const findStateFilter = commonStateFilter.find(e => e.id === paramElement.state_filter)
              if (findStateFilter) {
                temp.stateName = findStateFilter.name
              }
            } else {
              const findState = commonState.find(e => e.id === paramElement.state)
              if (findState) {
                temp.stateName = findState.name
              }
            }
            searchContentList = [...searchContentList, temp]
          }
          if (searchContentList.length > 0) {
            const find = searchContentList.find(k => k.actionId === activityId)
            if (find) {
              activityId = find?.actionId ? find?.actionId : 0
            } else {
              activityId = searchContentList[0]?.actionId ? searchContentList[0]?.actionId : 0
            }
          } else {
            activityId = 0
          }
          tempPageCount = {
            totalCount: res.totalElements ?? 0,
            totalPageCount: res.totalPages ?? 0,
          }
        }
      }
      if (activityId !== keyId) {
        await setActionOriginData(activityId)
      }
    } catch (e) {}
    dispatch(
      activityListReOnChangeAction({
        activityId: activityId,
        activityList: searchContentList,
        pageCount: tempPageCount,
      })
    )
  }

  const setActionOriginData = async (paramKey: number) => {
    let preloadCommonCode: SelectListOptionItem[] = []
    let commonCategory: SelectListOptionItem[] = []
    let commonStateFilter: SelectListOptionItem[] = []
    let commonState: SelectListOptionItem[] = []
    try {
      for (const re of extendedCommonCodeTargetList) {
        const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === re.id)
        if (find) {
          //@ts-ignore
          preloadCommonCode = find.commonCodeList
        } else {
          preloadCommonCode = await getCommonCode(re.id)
        }
        if (re.id === 'ACTION_CATEGORY_ALL') {
          commonCategory = preloadCommonCode
        } else if (re.id === 'ACTION_STATE') {
          commonState = preloadCommonCode
        } else if (re.id === 'ACTION_STATE_FILTER') {
          commonStateFilter = preloadCommonCode
        }
      }
      const { status, data, message } = await apiGetOneAction({ id: paramKey, groupId: userSelectGroup })
      if (status === 'S') {
        const res = data as ActionDto
        const temp = {
          ...res,
          categoryName: '',
          stateName: '',
          shareCodeNm: '',
          commentCount: 0,
        }
        const findShareScopeList = extendedShareScopeList.find(e => e.id === res.shareCode)
        if (findShareScopeList) {
          temp.shareCodeNm = findShareScopeList.name
        }
        const findCategory = commonCategory.find(e => e.id === res.category)
        if (findCategory) {
          temp.categoryName = findCategory.name
        }
        //@ts-ignore
        if (res.commentCount) {
          //@ts-ignore
          temp.commentCount = res.commentCount
        }
        //@ts-ignore
        if (res.mailingForAction) {
          //@ts-ignore
          temp.mailingForAction = res.mailingForAction
        }
        if (res.category !== 'MAILING' && res.category !== 'PRESS_RELEASE' && res.category !== 'NEWSWIRE_RELEASE') {
          const findStateFilter = commonStateFilter.find(e => e.id === res.stateFilter)
          if (findStateFilter) {
            temp.stateName = findStateFilter.name
          }
          await getActionCommentList(paramKey)
        } else {
          const findState = commonState.find(e => e.id === res.state)
          if (findState) {
            temp.stateName = findState.name
          }
        }
        console.log('getActionOriginData', temp)
        dispatch(getActionDataAction(temp))
      }
    } catch (e) {}
  }

  const getActionCommentList = async (paramKey: number) => {
    const { status, data, message } = await apiGetActionCommentList({
      actionId: paramKey,
      groupId: userSelectGroup,
      page: 1,
      size: 1000,
    })
    if (status === 'S') {
      const res = data as PageActionCommentDto
      dispatch(commmentListAction(res.content as ActionCommentDto[]))
    }
  }

  const getActicityNewsList = async (
    typeUrl: string,
    type: string,
    e: number,
    filter: string,
    pagination: PaginationInfoProps,
    keywords?: string
  ) => {
    let searchContentList: MonitoringSearchNewsDocumentDto[] = []
    let totalCount = 0
    let totalPageCount = 0
    let dto: ESearchNewsCondDto = {
      filter: keywords ? keywords : '',
      timezone: timeZone,
      periodStartYear: moment().subtract({ year: 2 }).format('YYYY'),
      periodStartMonth: moment().subtract({ year: 2 }).format('MM'),
      periodStartDay: moment().subtract({ year: 2 }).format('DD'),
      periodEndYear: moment().format('YYYY'),
      periodEndMonth: moment().format('MM'),
      periodEndDay: moment().format('DD'),
      page: pagination.page,
      size: 8,
      sort: ['_score!desc'],
      groupId: userSelectGroup,
    }
    try {
      if (typeUrl === 'press') {
        dto.journalistIdList = [e]
      } else {
        dto.mediaIdList = [e]
      }
      if (filter === 'clipbook') {
        dto.clipbook = 'Y'
      } else {
        dto.coverageYn = 'Y'
      }
      const { status, message, data } = await getNewsSearchResult.mutateAsync({ ...dto, groupId: userSelectGroup })
      if (status === 'S') {
        const res = data as ElasticSearchReturnDtoNewsDocumentDto
        const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
        const totalSize = res.totalElements as number
        const totalPage = Math.ceil(totalSize / 8)
        totalCount = newsData.length > 0 ? totalSize ?? 0 : 0
        totalPageCount = newsData.length > 0 ? totalPage ?? 0 : 0
        searchContentList = newsData
      }
    } catch (e) {}
    if (type === 'set') {
      if (typeUrl === 'press') {
        dispatch(
          setActivityDataListAction({
            list: searchContentList,
            pagination: {
              totalCount,
              totalPageCount,
              page: pagination.page,
              size: 8,
            },
          })
        )
      } else {
        dispatch(
          setMediaActivityDataListAction({
            list: searchContentList,
            pagination: {
              totalCount,
              totalPageCount,
              page: pagination.page,
              size: 8,
            },
          })
        )
      }
    }
    return totalCount
  }

  const getActionList = async (params: UseGetActionListParams) => {
    let res: PageActionDtoForList | null = null
    try {
      const { status, data, message } = await apiGetActionListByConfition(params)
      if (status === 'S') {
        res = data as PageActionDtoForList
      }
    } catch (e) {}

    return res
  }

  const getActicityList = async (
    typeUrl: string,
    type: string,
    e: string,
    filter: string,
    pagination: PaginationInfoProps,
    tempCommonCodeCategory: SelectListOptionItem[],
    tempCommonCodeState: SelectListOptionItem[],
    tempCommonCodeStateFilter: SelectListOptionItem[],
    keywords?: string
  ) => {
    let searchContentList: searchContentListProps[] = []
    let totalCount = 0
    let totalPageCount = 0
    let param: UseGetActionListParams = {
      title: keywords ? keywords : '',
      groupId: userSelectGroup,
      categoryList: [filter],
      page: pagination.page,
      size: 8,
      sort: ['updateAt!desc'],
    }
    try {
      if (typeUrl === 'press') {
        param.journalistIdList = [e]
      } else {
        param.mediaIdList = [e]
      }
      const res = await getActionList(param)
      if (res) {
        totalCount = res.totalElements ?? 0
        totalPageCount = res.totalPages ?? 0
        searchContentList = await initSearchContentList(
          res,
          tempCommonCodeCategory,
          tempCommonCodeState,
          tempCommonCodeStateFilter
        )
      }
    } catch (e) {}

    if (type === 'set') {
      if (typeUrl === 'press') {
        dispatch(
          setActivityDataListAction({
            list: searchContentList,
            pagination: {
              totalCount,
              totalPageCount,
              page: pagination.page,
              size: 8,
            },
          })
        )
      } else {
        dispatch(
          setMediaActivityDataListAction({
            list: searchContentList,
            pagination: {
              totalCount,
              totalPageCount,
              page: pagination.page,
              size: 8,
            },
          })
        )
      }
    }
    return totalCount
  }

  const getTotalActicityList = async (
    typeUrl: string,
    type: string,
    e: string,
    pagination: PaginationInfoProps,
    tempCommonCodeCategory: SelectListOptionItem[],
    tempCommonCodeState: SelectListOptionItem[],
    tempCommonCodeStateFilter: SelectListOptionItem[],
    keyword?: string
  ) => {
    let searchContentList: searchContentListProps[] = []
    let totalCount = 0
    let totalPageCount = 0
    let param: UseGetActionListParams = {
      title: keyword ? keyword : '',
      groupId: userSelectGroup,
      page: pagination.page,
      size: 8,
      sort: ['updateAt!desc'],
    }
    try {
      if (typeUrl === 'press') {
        param = {
          title: keyword ? keyword : '',
          groupId: userSelectGroup,
          journalistIdList: [e],
          page: pagination.page,
          size: 8,
          sort: ['updateAt!desc'],
        }
      } else {
        param = {
          title: keyword ? keyword : '',
          groupId: userSelectGroup,
          mediaIdList: [e],
          page: pagination.page,
          size: 8,
          sort: ['updateAt!desc'],
        }
      }
      const res = await getActionList(param)
      if (res) {
        totalCount = res.totalElements ?? 0
        totalPageCount = res.totalPages ?? 0
        searchContentList = await initSearchContentList(
          res,
          tempCommonCodeCategory,
          tempCommonCodeState,
          tempCommonCodeStateFilter
        )
      }
    } catch (e) {}
    if (type === 'set') {
      if (typeUrl === 'press') {
        dispatch(
          setActivityDataListAction({
            list: searchContentList,
            pagination: {
              totalCount,
              totalPageCount,
              page: pagination.page,
              size: 8,
            },
          })
        )
      } else {
        dispatch(
          setMediaActivityDataListAction({
            list: searchContentList,
            pagination: {
              totalCount,
              totalPageCount,
              page: pagination.page,
              size: 8,
            },
          })
        )
      }
    }
    return totalCount
  }

  const initSearchContentList = async (
    res: PageActionDtoForList,
    tempCommonCodeCategory: SelectListOptionItem[],
    tempCommonCodeState: SelectListOptionItem[],
    tempCommonCodeStateFilter: SelectListOptionItem[]
  ) => {
    let searchContentList: searchContentListProps[] = []
    if (res.content && res.content.length > 0) {
      for await (const paramElement of res.content) {
        const temp = {
          ...paramElement,
          categoryName: '',
          stateName: '',
        }
        const findCategory = tempCommonCodeCategory.find(e => e.id === paramElement.category)
        if (findCategory) {
          temp.categoryName = findCategory.name
        }
        if (paramElement.category !== 'MAILING' && paramElement.category !== 'PRESS_RELEASE') {
          const findStateFilter = tempCommonCodeStateFilter.find(e => e.id === paramElement.state_filter)
          if (findStateFilter) {
            temp.stateName = findStateFilter.name
          }
        } else {
          const findState = tempCommonCodeState.find(e => e.id === paramElement.state)
          if (findState) {
            temp.stateName = findState.name
          }
        }
        searchContentList = [...searchContentList, temp]
      }
    }
    return searchContentList
  }

  const setActicityList = async (
    typeUrl: string,
    e: string,
    pagination: PaginationInfoProps,
    tempCommonCodeCategory: SelectListOptionItem[],
    tempCommonCodeState: SelectListOptionItem[],
    tempCommonCodeStateFilter: SelectListOptionItem[],
    isSystem?: boolean
  ) => {
    const totalCount = await getTotalActicityList(
      typeUrl,
      'set',
      e,
      pagination,
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter
    )
    const inquiryCount = await getActicityList(
      typeUrl,
      '',
      e,
      'INQUIRY',
      pagination,
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter
    )
    const phoneCallCount = await getActicityList(
      typeUrl,
      '',
      e,
      'PHONE_CALL',
      pagination,
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter
    )
    const noteCount = await getActicityList(
      typeUrl,
      '',
      e,
      'NOTE',
      pagination,
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter
    )
    const releaseCount = await getActicityList(
      typeUrl,
      '',
      e,
      'PRESS_RELEASE',
      pagination,
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter
    )
    const mailingCount = await getActicityList(
      typeUrl,
      '',
      e,
      'MAILING',
      pagination,
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter
    )
    const promiseCount = await getActicityList(
      typeUrl,
      '',
      e,
      'PROMISE',
      pagination,
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter
    )

    let res: SelectListOptionItem[] = [
      {
        id: 'total',
        name: '전체',
        extra: totalCount.toString(),
      },
      {
        id: 'PRESS_RELEASE',
        name: '보도자료',
        extra: releaseCount.toString(),
      },
      {
        id: 'MAILING',
        name: '이메일',
        extra: mailingCount.toString(),
      },
      {
        id: 'NOTE',
        name: '노트',
        extra: noteCount.toString(),
      },
      {
        id: 'PROMISE',
        name: '약속',
        extra: promiseCount.toString(),
      },
      {
        id: 'PHONE_CALL',
        name: '전화',
        extra: phoneCallCount.toString(),
      },
      {
        id: 'INQUIRY',
        name: '문의',
        extra: inquiryCount.toString(),
      },
    ]
    if (isSystem) {
      const corverageCount = await getActicityNewsList(typeUrl, '', Number(e), 'corverage', pagination)
      const clipbookCount = await getActicityNewsList(typeUrl, '', Number(e), 'clipbook', pagination)
      res = [
        {
          id: 'total',
          name: '전체',
          extra: totalCount.toString(),
        },
        {
          id: 'PRESS_RELEASE',
          name: '보도자료',
          extra: releaseCount.toString(),
        },
        {
          id: 'MAILING',
          name: '이메일',
          extra: mailingCount.toString(),
        },
        {
          id: 'NOTE',
          name: '노트',
          extra: noteCount.toString(),
        },
        {
          id: 'PROMISE',
          name: '약속',
          extra: promiseCount.toString(),
        },
        {
          id: 'PHONE_CALL',
          name: '전화',
          extra: phoneCallCount.toString(),
        },
        {
          id: 'INQUIRY',
          name: '문의',
          extra: inquiryCount.toString(),
        },
        {
          id: 'corverage',
          name: '커버리지',
          extra: corverageCount.toString(),
        },
        {
          id: 'clipbook',
          name: '클립북',
          extra: clipbookCount.toString(),
        },
      ]
    }
    if (typeUrl !== 'press') {
      dispatch(
        setMediaActivityTabAction({
          list: res,
          tab: res[0],
        })
      )
    } else {
      dispatch(
        setActivityTabAction({
          list: res,
          tab: res[0],
        })
      )
    }
  }

  const activityChangeTab = async (
    typeUrl: string,
    type: SelectListOptionItem,
    idKey: number,
    tempCommonCodeCategory: SelectListOptionItem[],
    tempCommonCodeState: SelectListOptionItem[],
    tempCommonCodeStateFilter: SelectListOptionItem[]
  ) => {
    const paging = {
      page: 1,
      size: 8,
      totalCount: 0,
      totalPageCount: 0,
    }
    try {
      if (typeUrl === 'press') {
        dispatch(setChangeActivityTabAction(type))
      } else {
        dispatch(setMediaChangeActivityTabAction(type))
      }
      if (type.id === 'total') {
        await getTotalActicityList(
          typeUrl,
          'set',
          idKey.toString(),
          paging,
          tempCommonCodeCategory,
          tempCommonCodeState,
          tempCommonCodeStateFilter
        )
      } else if (type.id === 'corverage') {
        await getActicityNewsList(typeUrl, 'set', idKey, type.id, paging)
      } else if (type.id === 'clipbook') {
        await getActicityNewsList(typeUrl, 'set', idKey, type.id, paging)
      } else {
        await getActicityList(
          typeUrl,
          'set',
          idKey.toString(),
          type.id,
          paging,
          tempCommonCodeCategory,
          tempCommonCodeState,
          tempCommonCodeStateFilter
        )
      }
    } catch (e) {}
  }

  const pressProfileActivityAction = async () => {
    let preloadCommonCode: CommonCode[] = []
    let tempCommonCodeCategory: SelectListOptionItem[] = []
    let tempCommonCodeState: SelectListOptionItem[] = []
    let tempCommonCodeStateFilter: SelectListOptionItem[] = []
    for (const re of extendedCommonCodeTargetList) {
      const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === re.id)
      if (find) {
        //@ts-ignore
        preloadCommonCode = find.commonCodeList
      } else {
        const apiData = await getCommonCode(re.id)
        preloadCommonCode = apiData.map(e => {
          return {
            commonCodeId: 0,
            parentId: 0,
            parentCode: '',
            code: e.id,
            language: '',
            name: e.name,
            def: false,
            weight: 0,
          }
        })
      }
      if (re.id === 'ACTION_CATEGORY_ALL') {
        tempCommonCodeCategory = preloadCommonCode.map(e => {
          return {
            id: e.code,
            name: e.name,
          }
        })
      } else if (re.id === 'ACTION_STATE') {
        tempCommonCodeState = preloadCommonCode.map(e => {
          return {
            id: e.code,
            name: e.name,
          }
        })
      } else if (re.id === 'ACTION_STATE_FILTER') {
        tempCommonCodeStateFilter = preloadCommonCode.map(e => {
          return {
            id: e.code,
            name: e.name,
          }
        })
      }
    }
    await setActicityList(
      'press',
      pressProfileSlice.journalIdKey.toString(),
      {
        totalCount: 0,
        totalPageCount: 0,
        page: 1,
        size: 8,
      },
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter,
      pressProfileSlice.journalIdKeyParam?.isSysInfo
    )
    await activityChangeTab(
      'press',
      pressProfileSlice.activityTab,
      pressProfileSlice.journalIdKey,
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter
    )
  }

  const mediaProfileActivityAction = async () => {
    let preloadCommonCode: CommonCode[] = []
    let tempCommonCodeCategory: SelectListOptionItem[] = []
    let tempCommonCodeState: SelectListOptionItem[] = []
    let tempCommonCodeStateFilter: SelectListOptionItem[] = []
    for (const re of extendedCommonCodeTargetList) {
      const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === re.id)
      if (find) {
        //@ts-ignore
        preloadCommonCode = find.commonCodeList
      } else {
        const apiData = await getCommonCode(re.id)
        preloadCommonCode = apiData.map(e => {
          return {
            commonCodeId: 0,
            parentId: 0,
            parentCode: '',
            code: e.id,
            language: '',
            name: e.name,
            def: false,
            weight: 0,
          }
        })
      }
      if (re.id === 'ACTION_CATEGORY_ALL') {
        tempCommonCodeCategory = preloadCommonCode.map(e => {
          return {
            id: e.code,
            name: e.name,
          }
        })
      } else if (re.id === 'ACTION_STATE') {
        tempCommonCodeState = preloadCommonCode.map(e => {
          return {
            id: e.code,
            name: e.name,
          }
        })
      } else if (re.id === 'ACTION_STATE_FILTER') {
        tempCommonCodeStateFilter = preloadCommonCode.map(e => {
          return {
            id: e.code,
            name: e.name,
          }
        })
      }
    }
    await setActicityList(
      'media',
      mediaProfileSlice.mediaIdKey.toString(),
      {
        totalCount: 0,
        totalPageCount: 0,
        page: 1,
        size: 8,
      },
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter,
      mediaProfileSlice.mediaIdKeyParam?.isSysInfo
    )
    await activityChangeTab(
      'media',
      mediaProfileSlice.activityTab,
      mediaProfileSlice.mediaIdKey,
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter
    )
  }

  const savedSearchActivityAction = async () => {
    let preloadCommonCode: CommonCode[] = []
    let tempCommonCodeCategory: SelectListOptionItem[] = []
    let tempCommonCodeState: SelectListOptionItem[] = []
    let tempCommonCodeStateFilter: SelectListOptionItem[] = []
    try {
      for (const re of extendedCommonCodeTargetList) {
        const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === re.id)
        if (find) {
          //@ts-ignore
          preloadCommonCode = find.commonCodeList
        } else {
          const apiData = await getCommonCode(re.id)
          preloadCommonCode = apiData.map(e => {
            return {
              commonCodeId: 0,
              parentId: 0,
              parentCode: '',
              code: e.id,
              language: '',
              name: e.name,
              def: false,
              weight: 0,
            }
          })
        }
        if (re.id === 'ACTION_CATEGORY_ALL') {
          tempCommonCodeCategory = preloadCommonCode.map(e => {
            return {
              id: e.code,
              name: e.name,
            }
          })
        } else if (re.id === 'ACTION_STATE') {
          tempCommonCodeState = preloadCommonCode.map(e => {
            return {
              id: e.code,
              name: e.name,
            }
          })
        } else if (re.id === 'ACTION_STATE_FILTER') {
          tempCommonCodeStateFilter = preloadCommonCode.map(e => {
            return {
              id: e.code,
              name: e.name,
            }
          })
        }
      }
      if (savedSearchSlice.listDefine === 'press' && savedSearchSlice.journalTab === 'activity') {
        await setPressActivityProfile(
          'savedSearch',
          savedSearchSlice.journalIdKey,
          tempCommonCodeCategory,
          tempCommonCodeState,
          tempCommonCodeStateFilter
        )
      } else if (savedSearchSlice.listDefine !== 'press' && savedSearchSlice.mediaTab === 'activity') {
        await setMediaActivityProfile(
          'savedSearch',
          savedSearchSlice.mediaIdKey,
          tempCommonCodeCategory,
          tempCommonCodeState,
          tempCommonCodeStateFilter
        )
      }
    } catch (e) {}
  }

  const listResultActivityAction = async () => {
    let preloadCommonCode: CommonCode[] = []
    let tempCommonCodeCategory: SelectListOptionItem[] = []
    let tempCommonCodeState: SelectListOptionItem[] = []
    let tempCommonCodeStateFilter: SelectListOptionItem[] = []
    try {
      for (const re of extendedCommonCodeTargetList) {
        const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === re.id)
        if (find) {
          //@ts-ignore
          preloadCommonCode = find.commonCodeList
        } else {
          const apiData = await getCommonCode(re.id)
          preloadCommonCode = apiData.map(e => {
            return {
              commonCodeId: 0,
              parentId: 0,
              parentCode: '',
              code: e.id,
              language: '',
              name: e.name,
              def: false,
              weight: 0,
            }
          })
        }
        if (re.id === 'ACTION_CATEGORY_ALL') {
          tempCommonCodeCategory = preloadCommonCode.map(e => {
            return {
              id: e.code,
              name: e.name,
            }
          })
        } else if (re.id === 'ACTION_STATE') {
          tempCommonCodeState = preloadCommonCode.map(e => {
            return {
              id: e.code,
              name: e.name,
            }
          })
        } else if (re.id === 'ACTION_STATE_FILTER') {
          tempCommonCodeStateFilter = preloadCommonCode.map(e => {
            return {
              id: e.code,
              name: e.name,
            }
          })
        }
      }
      if (pressMediaListResultSlice.listDefine === 'press' && pressMediaListResultSlice.journalTab === 'activity') {
        await setPressActivityProfile(
          'listResult',
          pressMediaListResultSlice.journalIdKey,
          tempCommonCodeCategory,
          tempCommonCodeState,
          tempCommonCodeStateFilter
        )
      } else if (
        pressMediaListResultSlice.listDefine !== 'press' &&
        pressMediaListResultSlice.mediaTab === 'activity'
      ) {
        await setMediaActivityProfile(
          'listResult',
          pressMediaListResultSlice.mediaIdKey,
          tempCommonCodeCategory,
          tempCommonCodeState,
          tempCommonCodeStateFilter
        )
      }
    } catch (e) {}
  }

  const searchResultActivityAction = async () => {
    let preloadCommonCode: CommonCode[] = []
    let tempCommonCodeCategory: SelectListOptionItem[] = []
    let tempCommonCodeState: SelectListOptionItem[] = []
    let tempCommonCodeStateFilter: SelectListOptionItem[] = []
    try {
      for (const re of extendedCommonCodeTargetList) {
        const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === re.id)
        if (find) {
          //@ts-ignore
          preloadCommonCode = find.commonCodeList
        } else {
          const apiData = await getCommonCode(re.id)
          preloadCommonCode = apiData.map(e => {
            return {
              commonCodeId: 0,
              parentId: 0,
              parentCode: '',
              code: e.id,
              language: '',
              name: e.name,
              def: false,
              weight: 0,
            }
          })
        }
        if (re.id === 'ACTION_CATEGORY_ALL') {
          tempCommonCodeCategory = preloadCommonCode.map(e => {
            return {
              id: e.code,
              name: e.name,
            }
          })
        } else if (re.id === 'ACTION_STATE') {
          tempCommonCodeState = preloadCommonCode.map(e => {
            return {
              id: e.code,
              name: e.name,
            }
          })
        } else if (re.id === 'ACTION_STATE_FILTER') {
          tempCommonCodeStateFilter = preloadCommonCode.map(e => {
            return {
              id: e.code,
              name: e.name,
            }
          })
        }
      }
      if (pressMediaSearchResultSlice.listDefine === 'press' && pressMediaSearchResultSlice.journalTab === 'activity') {
        await setPressActivityProfile(
          'searchResult',
          pressMediaSearchResultSlice.journalIdKey,
          tempCommonCodeCategory,
          tempCommonCodeState,
          tempCommonCodeStateFilter
        )
      } else if (
        pressMediaSearchResultSlice.listDefine !== 'press' &&
        pressMediaSearchResultSlice.mediaTab === 'activity'
      ) {
        await setMediaActivityProfile(
          'searchResult',
          pressMediaSearchResultSlice.mediaIdKey,
          tempCommonCodeCategory,
          tempCommonCodeState,
          tempCommonCodeStateFilter
        )
      }
    } catch (e) {}
  }

  const setPressActivityProfile = async (
    typeUrl: string,
    idKey: number,
    tempCommonCodeCategory: SelectListOptionItem[],
    tempCommonCodeState: SelectListOptionItem[],
    tempCommonCodeStateFilter: SelectListOptionItem[]
  ) => {
    let searchContentList: searchContentListProps[] = []
    try {
      const { status, data, message } = await apiGetActionListByConfition({
        groupId: userSelectGroup,
        journalistIdList: [idKey.toString()],
        page: 1,
        size: 10,
        sort: ['updateAt!desc'],
      })
      if (status === 'S') {
        const res = data as PageActionDtoForList
        if (res.content && res.content.length > 0) {
          for await (const paramElement of res.content) {
            const temp = {
              ...paramElement,
              categoryName: '',
              stateName: '',
            }
            const findCategory = tempCommonCodeCategory.find(e => e.id === paramElement.category)
            if (findCategory) {
              temp.categoryName = findCategory.name
            }
            if (paramElement.category !== 'MAILING' && paramElement.category !== 'PRESS_RELEASE') {
              const findStateFilter = tempCommonCodeStateFilter.find(e => e.id === paramElement.state_filter)
              if (findStateFilter) {
                temp.stateName = findStateFilter.name
              }
            } else {
              const findState = tempCommonCodeState.find(e => e.id === paramElement.state)
              if (findState) {
                temp.stateName = findState.name
              }
            }
            searchContentList = [...searchContentList, temp]
          }
        }
        if (typeUrl === 'savedSearch') {
          dispatch(
            activityListByJournalIdAction({
              list: searchContentList,
              page: 10,
              journalTab: 'activity',
              totalCount: res.totalElements ?? 0,
            })
          )
        } else if (typeUrl === 'searchResult') {
          dispatch(
            activityListByNewActivity({
              list: searchContentList,
              page: 10,
              journalTab: 'activity',
            })
          )
        } else if (typeUrl === 'listResult') {
          dispatch(
            pressActivityListFromListResult({
              list: searchContentList,
              page: 10,
              journalTab: 'activity',
            })
          )
        }
      }
    } catch (e) {}
    dispatch(activityLoadingAction(false))
  }

  const setMediaActivityProfile = async (
    typeUrl: string,
    idKey: number,
    tempCommonCodeCategory: SelectListOptionItem[],
    tempCommonCodeState: SelectListOptionItem[],
    tempCommonCodeStateFilter: SelectListOptionItem[]
  ) => {
    let searchContentList: searchContentListProps[] = []
    try {
      const { status, data, message } = await apiGetActionListByConfition({
        groupId: userSelectGroup,
        mediaIdList: [idKey.toString()],
        page: 1,
        size: 10,
        sort: ['updateAt!desc'],
      })
      if (status === 'S') {
        const res = data as PageActionDtoForList
        if (res.content && res.content.length > 0) {
          for await (const paramElement of res.content) {
            const temp = {
              ...paramElement,
              categoryName: '',
              stateName: '',
            }
            const findCategory = tempCommonCodeCategory.find(e => e.id === paramElement.category)
            if (findCategory) {
              temp.categoryName = findCategory.name
            }
            if (paramElement.category !== 'MAILING' && paramElement.category !== 'PRESS_RELEASE') {
              const findStateFilter = tempCommonCodeStateFilter.find(e => e.id === paramElement.state_filter)
              if (findStateFilter) {
                temp.stateName = findStateFilter.name
              }
            } else {
              const findState = tempCommonCodeState.find(e => e.id === paramElement.state)
              if (findState) {
                temp.stateName = findState.name
              }
            }
            searchContentList = [...searchContentList, temp]
          }
        }
        if (typeUrl === 'savedSearch') {
          dispatch(
            activityListByMediaIdAction({
              list: searchContentList,
              page: 10,
              mediaTab: 'activity',
              totalCount: res.totalElements ?? 0,
            })
          )
        } else if (typeUrl === 'searchResult') {
          dispatch(
            mediaActivityListByNewActivity({
              list: searchContentList,
              page: 10,
              mediaTab: 'activity',
            })
          )
        } else if (typeUrl === 'listResult') {
          dispatch(
            mediaActivityListFromListResult({
              list: searchContentList,
              page: 10,
              mediaTab: 'activity',
            })
          )
        }
      }
    } catch (e) {}
    dispatch(activityLoadingAction(false))
  }

  const createRelease = async (param: UsePostActionCreateParams) => {
    const { status, data, message } = await createActivity.mutateAsync(param)
    if (status === 'S') {
      if (router.pathname === '/activity/search') {
        await setActivityList(
          activityListSlice.apiParams,
          activityListSlice.activityList,
          activityListSlice.activityId,
          activityListSlice.pageCount
        )
      } else if (router.pathname === '/contacts/record/[id]') {
        await pressProfileActivityAction()
      } else if (router.pathname === '/media/record/[id]') {
        await mediaProfileActivityAction()
      } else if (router.pathname === '/contacts/saved-search') {
        await savedSearchActivityAction()
      } else if (router.pathname === '/media/saved-search') {
        await savedSearchActivityAction()
      } else if (router.pathname === '/contacts/search-result') {
        await searchResultActivityAction()
      } else if (router.pathname === '/media/search-result') {
        await searchResultActivityAction()
      } else if (router.pathname === '/contacts/list-result') {
        await listResultActivityAction()
      } else if (router.pathname === '/media/list-result') {
        await listResultActivityAction()
      }
      openToast(message?.message, 'success')
      dispatch(
        initActivityPopupAction({
          keyValue: 0,
          isOpen: false,
          loading: true,
          type: [],
          state: [],
          typeValue: { id: '', name: '' },
          scrop: { id: '', name: '' },
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }

  const editRelease = async (param: UsePostActionCreateParams, idKey: number, ownerKeyId: string) => {
    const { status, data, message } = await editActionById.mutateAsync({
      id: idKey,
      request: {
        ...param.request,
        ownerId: Number(ownerKeyId),
      },
      fileList: param.fileList,
    })
    if (status === 'S') {
      console.log('router', router)
      if (router.pathname === '/activity/search') {
        await setActivityList(
          activityListSlice.apiParams,
          activityListSlice.activityList,
          activityListSlice.activityId,
          activityListSlice.pageCount
        )
      } else if (router.pathname === '/activity/record/[id]') {
        console.log('router.pathname', router.pathname)
        await getActionRecordData(idKey)
      }
      openToast(message?.message, 'success')
      dispatch(
        initActivityPopupAction({
          keyValue: 0,
          isOpen: false,
          loading: true,
          type: [],
          state: [],
          typeValue: { id: '', name: '' },
          scrop: { id: '', name: '' },
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }

  const getActionRecordData = async (code: number) => {
    let res = null
    let preloadCommonCode: CommonCode[] = []
    let list: SelectListOptionItem[] = []
    let tempCommonCodeCategory: CommonCode[] = []
    let tempCommonCodeState: CommonCode[] = []
    let tempCommonCodeStateFilter: CommonCode[] = []
    let tempCommonCodeWorkType: CommonCode[] = []
    let tempCommonCodeUpdateFieldName: CommonCode[] = []
    try {
      for (const re of extendedCommonCodeTargetList) {
        const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === re.id)
        if (find) {
          //@ts-ignore
          preloadCommonCode = find.commonCodeList
        } else {
          const apiData = await getCommonCode(re.id)
          preloadCommonCode = apiData.map(e => {
            return {
              commonCodeId: 0,
              parentId: 0,
              parentCode: '',
              code: e.id,
              language: '',
              name: e.name,
              def: false,
              weight: 0,
            }
          })
        }
        if (re.id === 'ACTION_CATEGORY_ALL') {
          tempCommonCodeCategory = preloadCommonCode
        } else if (re.id === 'ACTION_STATE') {
          tempCommonCodeState = preloadCommonCode
        } else if (re.id === 'ACTION_STATE_FILTER') {
          tempCommonCodeStateFilter = preloadCommonCode
        } else if (re.id === 'ACTION_LOG_WORKTYPE') {
          tempCommonCodeWorkType = preloadCommonCode
        } else if (re.id === 'UPDATE_FIELD_NAME') {
          tempCommonCodeUpdateFieldName = preloadCommonCode
        }
      }
      const { status, data, message } = await apiGetOneAction({ id: code, groupId: userSelectGroup })
      if (status === 'S') {
        const apiData = data as ActionDto
        res = {
          ...apiData,
          categoryName: '',
          stateName: '',
          shareCodeNm: '',
          commentCount: 0,
        }
        const findShareScopeList = extendedShareScopeList.find(e => e.id === apiData.shareCode)
        if (findShareScopeList) {
          res.shareCodeNm = findShareScopeList.name
        }
        const findCategory = tempCommonCodeCategory.find(e => e.code === apiData.category)
        if (findCategory) {
          res.categoryName = findCategory.name
        }
        if (apiData.category !== 'MAILING' && apiData.category !== 'PRESS_RELEASE') {
          const findStateFilter = tempCommonCodeStateFilter.find(e => e.code === apiData.stateFilter)
          if (findStateFilter) {
            res.stateName = findStateFilter.name
          }
        } else {
          const findState = tempCommonCodeState.find(e => e.code === apiData.state)
          if (findState) {
            res.stateName = findState.name
          }
        }
        //@ts-ignore
        if (apiData.commentCount) {
          //@ts-ignore
          res.commentCount = apiData.commentCount
        }
        //@ts-ignore
        if (apiData.mailingForAction) {
          //@ts-ignore
          res.mailingForAction = apiData.mailingForAction
        }
        if (
          apiData.category !== 'PRESS_RELEASE' &&
          apiData.category !== 'MAILING' &&
          apiData.category !== 'NEWSWIRE_RELEASE'
        ) {
          if (apiData.shareCode === 'WRITABLE') {
            list = defaultActivityRecordWorkList
          } else if (apiData.owner?.userId === userInfo.userId) {
            list = defaultActivityRecordWorkList
          }
        } else {
          if (apiData.category === 'NEWSWIRE_RELEASE') {
            if (apiData.shareCode === 'WRITABLE') {
              if (apiData.state === 'DRA_DRAFT') {
                list = defaultActivityRecordWorkList
              } else {
                list = defaultNotEditableReleaseActivityRecordWorkList
              }
            } else if (apiData.owner?.userId === userInfo.userId) {
              if (apiData.state === 'DRA_DRAFT') {
                list = defaultActivityRecordWorkList
              } else {
                list = defaultNotEditableReleaseActivityRecordWorkList
              }
            }
          } else {
            if (apiData.shareCode === 'WRITABLE') {
              if (apiData.state === 'FIN_COMPLETE_SENDING') {
                list = defaultReleaseActivityRecordWorkListOptions
              } else if (apiData.state === 'RES_RESERVED') {
                list = defaultReleaseActivityRecordWorkListFull
              } else {
                list = defaultReleaseActivityRecordWorkList
              }
            } else if (apiData.owner?.userId === userInfo.userId) {
              if (apiData.state === 'FIN_COMPLETE_SENDING') {
                list = defaultReleaseActivityRecordWorkListOptions
              } else if (apiData.state === 'RES_RESERVED') {
                list = defaultReleaseActivityRecordWorkListFull
              } else {
                list = defaultReleaseActivityRecordWorkList
              }
            }
          }
        }
      }
      const logList = await actionLogList(code, tempCommonCodeWorkType, tempCommonCodeUpdateFieldName)
      dispatch(actionLogListAction(logList))
      dispatch(
        setActionDataFromOtherAction({
          category: res && res.category ? res?.category : '',
          buttonList: list,
          params: res ? res : null,
          state: res && res.state ? res?.state : '',
        })
      )
    } catch (e) {
      console.log('getActionDataLoadingAction', e)
    }
  }

  const actionLogList = async (
    idKey: number,
    tempCommonCodeWorkType: CommonCode[],
    tempCommonCodeUpdateFieldName: CommonCode[]
  ) => {
    let res: contentsActionLogListProps[] = []
    const { status, data, message } = await apiGetActionLogs({
      actionId: idKey,
      groupId: userSelectGroup,
      page: 1,
      size: 1000,
    })
    if (status === 'S') {
      const apiData = data as PageActionCommentDto
      const content = apiData.content as ActionLogDto[]
      if (content.length > 0 && tempCommonCodeWorkType.length > 0) {
        for await (const actionLogDto of content) {
          const temp = {
            ...actionLogDto,
            workTypeNm: '',
            workFieldNm: '',
          }
          const findState = tempCommonCodeWorkType.find(e => e.code === actionLogDto.workType)
          if (findState) {
            temp.workTypeNm = findState.name
          }
          if (actionLogDto.field && actionLogDto.field !== '') {
            const findField = tempCommonCodeUpdateFieldName.find(e => e.code === actionLogDto.field)
            if (findField) {
              temp.workFieldNm = findField.name
            }
          }
          res = [...res, temp]
        }
      }
    }

    return res
  }

  const getCommonCode = async (parentCode: string) => {
    let res: SelectListOptionItem[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode })
    if (status === 'S') {
      const list = data as CommonCode[]
      res = list.map(e => {
        return { id: e.code, name: e.name }
      })
    }
    return res
  }

  const getActivityOwnerLayer = async () => {
    let res: SelectListOptionItem[] = []
    const { status, data, message } = await apiGetActiveGroupInfo(userSelectGroup)
    if (status === 'S') {
      const list = data as GroupDto
      const listRes = list.users as UserDtoForGroup[]
      if (listRes && listRes.length > 0) {
        for await (const listRe of listRes) {
          if (listRe.userId && listRe.displayName) {
            res = [...res, { id: listRe.userId?.toString(), name: listRe.displayName?.toString() }]
          }
        }
      }
    } else {
      openToast(message?.message, 'error')
    }
    return res
  }

  const initDetailContent = async (data: ActionDto) => {
    const param: activityType = {
      ...activity,
      title: data?.title || '',
      activityStateList: await getCommonCode('ACTION_STATE_FILTER'),
      activityState: { id: '', name: '' },
      selectedDate: data.dueAt ? new Date(data.dueAt) : new Date(),
      selectedTime:
        data?.category && data?.category === 'PROMISE'
          ? { hours: Number(moment(data.dueAt).format('HH')), minutes: Number(moment(data.dueAt).format('mm')) }
          : { hours: 0, minutes: 0 },
      scrop: shareCodeData.action,
      content: data?.content || '',
      receivedEditorContent: data?.content || '',
      tagList: [],
      receiverGroup: 'press',
      tagPressList: [],
      filesList: [],
      ownerGroupList: await getActivityOwnerLayer(),
      ownerChangedkey: { id: '', name: '' },
    }
    if (data?.tagList && data?.tagList.length > 0) {
      for await (const shareCodeElement of data?.tagList) {
        param.tagList = [
          ...param.tagList,
          {
            id: shareCodeElement?.tagId?.toString() || '',
            label: shareCodeElement.name?.toString() || '',
          },
        ]
      }
    }
    if (data?.journalistList && data?.journalistList.length > 0) {
      for await (const shareCodeElement of data?.journalistList) {
        param.tagPressList = [
          ...param.tagPressList,
          {
            id: shareCodeElement?.journalistId?.toString() || '',
            label: shareCodeElement.name?.toString() + '-' + shareCodeElement.mediaName?.toString() || '',
            className: 'journalistId',
          },
        ]
      }
    }
    if (data?.mediaList && data?.mediaList.length > 0) {
      for await (const shareCodeElement of data?.mediaList) {
        param.tagPressList = [
          ...param.tagPressList,
          {
            id: shareCodeElement?.mediaId?.toString() || '',
            //@ts-ignore
            label: shareCodeElement?.subcategory
              ? //@ts-ignore
                `${shareCodeElement.name} - ${shareCodeElement?.subcategory}`
              : `${shareCodeElement.name}`,
            className: 'mediaId',
          },
        ]
      }
    }
    if (data?.jrnlstListList && data?.jrnlstListList.length > 0) {
      for await (const shareCodeElement of data?.jrnlstListList) {
        const temp = {
          id: shareCodeElement?.jrnlstListId?.toString() || '',
          label: shareCodeElement.title?.toString() || '',
          className: 'jrnlstListId',
        }
        param.tagPressList = [...param.tagPressList, temp]
      }
    }
    if (data?.mediaListList && data?.mediaListList.length > 0) {
      for await (const shareCodeElement of data?.mediaListList) {
        const temp = {
          id: shareCodeElement?.mediaListId?.toString() || '',
          label: shareCodeElement.title?.toString() || '',
          className: 'mediaListId',
        }
        param.tagPressList = [...param.tagPressList, temp]
      }
    }
    if (data?.fileAttachList && data?.fileAttachList.length > 0) {
      for await (const shareCodeElement of data.fileAttachList) {
        const temp = {
          width: shareCodeElement.width,
          height: shareCodeElement.height,
          isImage: shareCodeElement.fileType === 'IMG',
          file: undefined,
          filename: shareCodeElement.name,
          fileSrc: shareCodeElement.path,
          id: shareCodeElement.fileId,
          size: shareCodeElement?.size ? getSize(shareCodeElement?.size, 'kb') : '0',
          mimeType: shareCodeElement.inMediaBox ? 'inMediaBox' : shareCodeElement.mimeType,
        }
        // @ts-ignore
        param.filesList = [...param.filesList, temp]
      }
    }
    const findShareScopeList = extendedShareScopeList.find(e => e.id === data.shareCode)
    if (findShareScopeList) {
      param.scrop = findShareScopeList
    }
    const findStateFilter = param.activityStateList.find(e => e.id === data.stateFilter)
    if (findStateFilter) {
      param.activityState = findStateFilter
    }
    const ownerChangedkey = param.ownerGroupList.find(e => Number(e.id) === data?.owner?.userId)
    if (ownerChangedkey) {
      param.ownerChangedkey = ownerChangedkey
    }
    dispatch(getActivityPopupAction({ params: param, ownerId: data.owner?.userId || 0 }))
  }

  useEffect(() => {
    if (!getActionOriginData) return
    const { status, data, message } = getActionOriginData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as ActionDto
      initDetailContent(res)
    } else {
      openToast(message?.message, 'error')
    }
  }, [getActionOriginData])

  return {
    userSelectGroup,
    licenseInfo,
    userInfo,
    activity,
    editorData,
    isEditor,
    filesListLoading,
    ownerId,
    timeZoneData,
    settingsRefinedValue,
    activityCancelPopup,
    isWrite,

    nextStepValidate,
    setActivityAction,
    onChangeFiles,

    setOwnerChangedkey,
    handleEditorContentGet,
    setEmailPopupTitleAction,
    setReceiverGroupAction,
    setTagPressListAction,
    setResetTagPressListAction,
    setAllResetTagPressListAction,
    setScrop,
    setActivityState,
    setActivityType,
    dateConfirmPageDataAction,
    timeConfirmPageDataAction,
    handleTagStatusChange,
    handleTagClose,
    handleResetTagList,
    onDeleteUserFile,
    setActivityPopup,
    setActivityCancelPopupAction,
  }
}
