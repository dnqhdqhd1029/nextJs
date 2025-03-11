import { ChangeEvent, useCallback, useEffect } from 'react'
import _ from 'lodash'
import moment from 'moment'
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
import { EMAIL_PATTERN } from '~/constants/common'
import {
  activityListReOnChangeAction,
  commmentListAction,
  getActionDataAction,
  searchContentListProps,
} from '~/stores/modules/contents/activity/activityList'
import {
  actionLogListAction,
  actionStatusDetailListAction,
  actionStatusListAction,
  contentsActionLogListProps,
  contentsActionStatusDetailProps,
  setActionDataFromOtherAction,
} from '~/stores/modules/contents/activity/recordActivity'
import {
  adjustTemplateAction,
  contactInfoPopupAction,
  contactInfoPopupType,
  editorDataAction,
  editorMediaDataAction,
  emailCancelPopupAction,
  emailPopupAction,
  emailPopupType,
  initEmail,
  initInputMediaPopupAction,
  initMediaPopupAction,
  initPreviewPopupAction,
  inputMediaPopupAction,
  mediaPopupAction,
  mediaPopupItemType,
  mediaPopupType,
  previewPopupAction,
  setCofirmPopupAction,
  setContatcInfo,
  setDeletedFileIdListAction,
  setEmailPopupAction,
  setInputMediaListFilesAction,
  setIsReleasePopupAction,
  setMailingIdAction,
  setNoticePopupAction,
  setReleasePopupAction,
  setTemplateListAction,
  templateAction,
  TemplateType,
} from '~/stores/modules/contents/email/email'
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
  MailingDto,
  PageActionCommentDto,
  PageActionDtoForList,
  PageFileAttachDto,
  TagDto,
} from '~/types/api/service'
import { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem, type TagSearchCreateLayerItem } from '~/types/contents/Common'
import { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import { apiGetActionListByConfition, UseGetActionListParams } from '~/utils/api/action/useGetActionList'
import { apiGetOneAction } from '~/utils/api/action/useGetOneAction'
import { apiGetActionCommentList } from '~/utils/api/actionComment/useGetActionCommentList'
import { apiGetActionLogs } from '~/utils/api/actionLog/useGetActionLogs'
import {
  apiGetActionMailReceiver,
  apiGetActionMailReceiverDetail,
  UseGetActionMailReceiverParams,
} from '~/utils/api/actionMailReceiver/useActionMailReceiver'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import {
  usePostEmailPressReleaseCreate,
  UsePostEmailPressReleaseCreateParams,
  UsePostEmailPressReleaseModifyParams,
} from '~/utils/api/emailPressRelease/usePostEmailPressReleaseCreate'
import { usePostEmailPressReleaseEdit } from '~/utils/api/emailPressRelease/usePostEmailPressReleaseEdit'
import { usePostEmailPressReleaseGet } from '~/utils/api/emailPressRelease/usePostEmailPressReleaseGet'
import {
  useDeletePressReleaseMediaPopup,
  useGetPressReleaseMediaPopup,
  usePressReleaseMediaPopup,
  UsePressReleaseMediaPopupParams,
} from '~/utils/api/emailPressRelease/usePressReleaseMediaPopup'
import {
  usePutEmailPressRelease,
  usePutEmailPressReleaseCancel,
  UsePutEmailPressReleaseParams,
} from '~/utils/api/emailPressRelease/usePutEmailPressRelease'
import { apiPutPressReleaseMediaListUpload } from '~/utils/api/image/apiPostImageUpload'
import { usePostNewsSearch } from '~/utils/api/news/usePostNewsSearch'
import { useUnLockRelease } from '~/utils/api/release/draft/useDeleteRelease'
import { apiMailtemplateList } from '~/utils/api/release/press/useMailTemplateRelease'
import { usePutContactInfo } from '~/utils/api/setting/contactInfo/usePutContactInfo'
import { useGetContactInfo } from '~/utils/api/setting/contactInfo/userGetContactInfo'
import { openToast } from '~/utils/common/toast'
import { FileType } from '~/utils/hooks/common/useFileDragAndDrop'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

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
export type emailResultType = {
  resultCode: string
  resultCount: number
}

export const useEmail = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    userTemplateList,
    originTemplateList,
    isNoticePopup,
    emailPopup,
    contactInfoPopup,
    mediaPopup,
    inputMediaPopup,
    previewPopup,
    editorData,
    editorImageItems,
    deletedFileIdList,
    isConfirmPopup,
    isReleasePopup,
    adjustTemplate,
    emailCancelPopup,
    isWrite,
  } = useAppSelector(state => state.emailSlice)
  const activityListSlice = useAppSelector(state => state.activityListSlice)
  const pressProfileSlice = useAppSelector(state => state.pressProfileSlice)
  const mediaProfileSlice = useAppSelector(state => state.mediaProfileSlice)
  const savedSearchSlice = useAppSelector(state => state.savedSearchSlice)
  const pressMediaSearchResultSlice = useAppSelector(state => state.pressMediaSearchResultSlice)
  const pressMediaListResultSlice = useAppSelector(state => state.pressMediaListResultSlice)
  const { refinedValue } = useAppSelector(state => state.userSettingSlice)
  const {
    licenseInfo,
    isDemoLicense,
    frequentlyUsedCommonCode,
    userInfo,
    timeZoneData,
    userSelectGroup,
    shareCodeData,
    timeZone,
  } = useAppSelector(state => state.authSlice)

  const { data: contactInfoData, refetch: refetchGetContactInfo } = useGetContactInfo(
    contactInfoPopup.type === 'contactInfo_emal' ? 1 : 0
  )
  const { isLoading, data: mailingData } = usePostEmailPressReleaseGet(
    {
      id: Number(emailPopup.key),
      groupId: userSelectGroup,
    },
    { enabled: emailPopup.isOpen && emailPopup.key > 1 }
  )

  const { data: mediaPopupListData, refetch: refetchMediaPopupListData } = useGetPressReleaseMediaPopup(
    {
      dto: {
        groupId: userSelectGroup,
        fileType: mediaPopup.radioSelected,
        page: mediaPopup.page,
        size: mediaPopup.size,
        sort: mediaPopup.sort,
      },
      isProcess: 'mediaPopupListData_mediaPopup',
    },
    {
      enabled: emailPopup.isOpen,
    }
  )
  const { data: inputMediaPopupListData, refetch: refetchInputMediaPopupListData } = useGetPressReleaseMediaPopup(
    {
      dto: {
        groupId: userSelectGroup,
        fileType: inputMediaPopup.radioSelected,
        page: inputMediaPopup.page,
        size: inputMediaPopup.size,
        sort: inputMediaPopup.sort,
      },
      isProcess: 'inputMediaPopupListData_inputMediaPopup',
    },
    {
      enabled: emailPopup.isOpen,
    }
  )

  const getNewsSearchResult = usePostNewsSearch()
  const unLockRelease = useUnLockRelease()
  const pressReleaseEdit = usePostEmailPressReleaseEdit()
  const createMailing = usePostEmailPressReleaseCreate()
  const updateContactInfo = usePutContactInfo()
  const apiAddPressReleaseMediaPopup = usePressReleaseMediaPopup()
  const apiDeletePressReleaseMediaPopup = useDeletePressReleaseMediaPopup()
  const sendEmailPressRelease = usePutEmailPressRelease()
  const sendEmailPressReleaseCancel = usePutEmailPressReleaseCancel()

  const checkReservedEmailCount = () => {
    const res: emailResultType = {
      resultCode: '',
      resultCount: 0,
    }
    const isExpired = licenseInfo?.isExpired
    const emailReservedCount = licenseInfo?.emailLeft ?? 0
    const emailLimitCount = licenseInfo?.emailLimit ?? 0
    if (!isExpired && emailLimitCount > 0 && emailReservedCount < 1000) {
      res.resultCode = 'warning'
      res.resultCount = emailReservedCount
    }

    return res
  }

  const setEmailAction = async (param: emailPopupType, editor: string, type: string, delList: number[]) => {
    try {
      let releaseSaveParams: any = {
        request: {
          category: 'MAILING',
          sendNow: param.mailStateGroup === 'now',
          year: param.mailStateGroup !== 'now' ? moment(param.selectedDate).format('YYYY') : '9999',
          month: param.mailStateGroup !== 'now' ? moment(param.selectedDate).format('MM') : '12',
          day: param.mailStateGroup !== 'now' ? moment(param.selectedDate).format('DD') : '31',
          hour: param.mailStateGroup !== 'now' ? param.selectedTime.hours.toString() : '23',
          min: param.mailStateGroup !== 'now' ? param.selectedTime.minutes.toString() : '59',
          timezone: timeZone,
          groupId: userSelectGroup,
          shareCode: param.scrop.id,
          isDefaultTemplate: param.isTemplate !== 'use',
          mailTemplateId: param.isTemplate === 'use' ? param.templateType.id : '',
          titleForManage: param.title,
          title: param.title,
          body: editor,
          includeUser: false,
          journalistIdList: [],
          mediaIdList: [],
          jrnstListIdList: [],
          mediaListIdList: [],
          extraMailList: [],
          tagIdList: [],
          mediaFileIdList: [],
          flagAttachContactInfo: param.checkPhone,
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
      for await (const i of param.targetEmail) {
        releaseSaveParams.request.extraMailList.push(i.label)
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
      if (param.key > 1 && type === 'send') {
        await activeMailingRelease(param.key)
      } else if (type === 'edit') {
        await modifyRelease(releaseSaveParams, param.key, delList)
      } else if (type === 'register') {
        await createRelease(releaseSaveParams, 'close')
      } else {
        await createRelease(releaseSaveParams, 'done')
      }
    } catch (e) {}
  }

  const modifyRelease = async (
    paramDTO: UsePostEmailPressReleaseModifyParams,
    idKey: number,
    deleteFiles: number[]
  ) => {
    let param = paramDTO
    param.request.deletedFileIdList = deleteFiles
    const params = { ...param, id: idKey }
    const { status, data, message } = await pressReleaseEdit.mutateAsync(params)
    if (status === 'S') {
      await unLockRelease.mutateAsync({
        id: idKey,
        group: userSelectGroup,
      })
      if (router.pathname === '/activity/search') {
        await setActivityList(
          activityListSlice.apiParams,
          activityListSlice.activityList,
          activityListSlice.activityId,
          activityListSlice.pageCount
        )
      } else if (router.pathname === '/activity/record/[id]') {
        if (router.query.category === 'MAILING' && router.query.id) {
          await getActionRecordData(Number(router.query.id))
        }
        console.log('router.category', router.query.category)
        console.log('router.id', router.query.id)
      } else if (router.pathname === '/contacts/record/[id]') {
        await pressProfileActivityAction()
      } else if (router.pathname === '/media/record/[id]') {
        await mediaProfileActivityAction()
      }
      console.log('router', router)
      openToast(message?.message, 'success')
      dispatch(initEmail())
    } else {
      openToast(message?.message, 'error')
    }
  }

  const savedSearchActivityAction = async () => {
    let preloadCommonCode: SelectListOptionItem[] = []
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
          preloadCommonCode = await getCommonCode(re.id)
        }
        if (re.id === 'ACTION_CATEGORY_ALL') {
          tempCommonCodeCategory = preloadCommonCode
        } else if (re.id === 'ACTION_STATE') {
          tempCommonCodeState = preloadCommonCode
        } else if (re.id === 'ACTION_STATE_FILTER') {
          tempCommonCodeStateFilter = preloadCommonCode
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

  const searchResultActivityAction = async () => {
    let preloadCommonCode: SelectListOptionItem[] = []
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
          preloadCommonCode = await getCommonCode(re.id)
        }
        if (re.id === 'ACTION_CATEGORY_ALL') {
          tempCommonCodeCategory = preloadCommonCode
        } else if (re.id === 'ACTION_STATE') {
          tempCommonCodeState = preloadCommonCode
        } else if (re.id === 'ACTION_STATE_FILTER') {
          tempCommonCodeStateFilter = preloadCommonCode
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

  const listResultActivityAction = async () => {
    let preloadCommonCode: SelectListOptionItem[] = []
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
          preloadCommonCode = await getCommonCode(re.id)
        }
        if (re.id === 'ACTION_CATEGORY_ALL') {
          tempCommonCodeCategory = preloadCommonCode
        } else if (re.id === 'ACTION_STATE') {
          tempCommonCodeState = preloadCommonCode
        } else if (re.id === 'ACTION_STATE_FILTER') {
          tempCommonCodeStateFilter = preloadCommonCode
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

  const mediaProfileActivityAction = async () => {
    let preloadCommonCode: SelectListOptionItem[] = []
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
          preloadCommonCode = await getCommonCode(re.id)
        }
        if (re.id === 'ACTION_CATEGORY_ALL') {
          tempCommonCodeCategory = preloadCommonCode
        } else if (re.id === 'ACTION_STATE') {
          tempCommonCodeState = preloadCommonCode
        } else if (re.id === 'ACTION_STATE_FILTER') {
          tempCommonCodeStateFilter = preloadCommonCode
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
    } catch (e) {}
  }

  const pressProfileActivityAction = async () => {
    let preloadCommonCode: SelectListOptionItem[] = []
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
          preloadCommonCode = await getCommonCode(re.id)
        }
        if (re.id === 'ACTION_CATEGORY_ALL') {
          tempCommonCodeCategory = preloadCommonCode
        } else if (re.id === 'ACTION_STATE') {
          tempCommonCodeState = preloadCommonCode
        } else if (re.id === 'ACTION_STATE_FILTER') {
          tempCommonCodeStateFilter = preloadCommonCode
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
    } catch (e) {}
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
      if (res && res.state && res?.state === 'FIN_COMPLETE_SENDING' && res.mailingId && Number(res.mailingId) > 0) {
        const mailingStatusList = await actionStatusList(Number(res.mailingId))
        const mailingStatusDetail = await actionStatusDetailList(Number(res.mailingId))
        dispatch(actionStatusListAction(mailingStatusList as UseGetActionMailReceiverParams[]))
        if (mailingStatusDetail) {
          dispatch(actionStatusDetailListAction(mailingStatusDetail as contentsActionStatusDetailProps))
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

  const actionStatusList = async (idKey: number) => {
    let res: UseGetActionMailReceiverParams[] = []
    const { status, data, message } = await apiGetActionMailReceiver({
      mailingId: idKey,
      page: 1,
      size: 1000,
    })
    if (status === 'S') {
      const apiData = data as PageActionCommentDto
      res = apiData.content as UseGetActionMailReceiverParams[]
    }

    return res
  }

  const actionStatusDetailList = async (idKey: number) => {
    let res: contentsActionStatusDetailProps | null = null
    const { status, data, message } = await apiGetActionMailReceiverDetail({
      mailingId: idKey,
    })
    if (status === 'S') {
      res = data as contentsActionStatusDetailProps
    }

    return res
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

  const createRelease = async (paramDTO: UsePostEmailPressReleaseCreateParams, type: string) => {
    const { status, data, message } = await createMailing.mutateAsync(paramDTO)
    const result = data as MailingDto
    if (status === 'S' && result.mailingId) {
      if (type === 'close') {
        console.log('router', router.pathname)
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
        dispatch(initEmail())
      } else {
        if (isDemoLicense) {
          openToast('데모체험에서는 일부 기능이 제한됩니다.', 'error')
        } else {
          await activeMailingRelease(result.mailingId)
        }
      }
    } else {
      openToast(message?.message, 'error')
    }
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

  const activeMailingRelease = async (mailingId: number) => {
    const sendEmailParams: UsePutEmailPressReleaseParams = {
      id: mailingId,
      info: {
        groupId: userSelectGroup,
      },
    }
    const { status, data, message } = await sendEmailPressRelease.mutateAsync(sendEmailParams)
    if (status === 'S') {
      console.log('router', router.pathname)
      if (router.pathname === '/activity/search') {
        await setActivityList(
          activityListSlice.apiParams,
          activityListSlice.activityList,
          activityListSlice.activityId,
          activityListSlice.pageCount
        )
      } else if (router.pathname === '/activity/record/[id]') {
        if (router.query.category === 'MAILING' && router.query.id) {
          await getActionRecordData(Number(router.query.id))
        }
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
      dispatch(setMailingIdAction(mailingId))
      dispatch(popupReleaseAction(true))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const cancelRelease = async (mailingId: number) => {
    const sendEmailParams: UsePutEmailPressReleaseParams = {
      id: mailingId,
      info: {
        groupId: userSelectGroup,
      },
    }
    const { status, data, message } = await sendEmailPressReleaseCancel.mutateAsync(sendEmailParams)
    if (status === 'S') {
      if (router.pathname === '/activity/search') {
        await setActivityList(
          activityListSlice.apiParams,
          activityListSlice.activityList,
          activityListSlice.activityId,
          activityListSlice.pageCount
        )
      } else if (router.pathname === '/activity/record/[id]') {
        if (router.query.category === 'MAILING' && router.query.id) {
          await getActionRecordData(Number(router.query.id))
        }
        console.log('router.category', router.query.category)
        console.log('router.id', router.query.id)
      }
      openToast(message?.message, 'success')
      dispatch(setReleasePopupAction({ isConfirmPopup: false, isReleasePopup: false }))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const nextStepValidate = async (param: emailPopupType, editor: string) => {
    let isProcess = false
    let contentTitleErr = ''
    let contentErrorMessage = ''
    let recipientErr = ''

    if (param.tagPressList.length > 0) {
      if (param.title === '') {
        contentTitleErr = '제목을 입력하세요'
        openToast('제목을 입력하세요', 'warning')
      } else {
        if (editor === '') {
          contentErrorMessage = '내용을 입력하세요'
          openToast('내용을 입력하세요', 'warning')
        } else {
          isProcess = true
        }
      }
    } else {
      if (param.targetEmail.length > 0) {
        if (param.title === '') {
          contentTitleErr = '제목을 입력하세요'
          openToast('제목을 입력하세요', 'warning')
        } else {
          if (editor === '') {
            contentErrorMessage = '내용을 입력하세요'
            openToast('내용을 입력하세요', 'warning')
          } else {
            isProcess = true
          }
        }
      } else {
        recipientErr = '받는 사람을 입력하세요'
        openToast('받는 사람을 입력하세요', 'warning')
      }
    }

    dispatch(
      emailPopupAction({
        ...param,
        contentTitleErr,
        contentErrorMessage,
        recipientErr,
      })
    )
    return isProcess
  }

  const mediaUploadFile = async (files: FileList, fileUnit: string, fileSizeLimit: number, fileType: string) => {
    let res: FileType[] = []
    for await (const totalFileLengthElement of Array.from(files)) {
      const fileSize = getSize(totalFileLengthElement.size, fileUnit ? fileUnit.toLocaleLowerCase() : 'kb')
      if (fileSizeLimit && fileSize > fileSizeLimit) {
        openToast(messages['ko'].code100, 'error')
      } else {
        const temp = await processUpload(totalFileLengthElement, fileUnit, fileType)
        temp.code === '' ? (res = [...res, temp.data]) : openToast(temp.code, 'error')
      }
    }

    return res
  }

  const contactInfoOnChange = (param: string, items: contactInfoPopupType) => {
    dispatch(
      contactInfoPopupAction({
        ...items,
        content: param,
        contentErrorMessage: '',
      })
    )
  }

  const setDeleteMediaImagePopupAction = async (i: number) => {
    const { status, message } = await apiDeletePressReleaseMediaPopup.mutateAsync({
      id: i,
    })
    if (status === 'S') {
      //await refetchMediaPopupListData()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setEmailPopupTitleAction = (param: string, items: emailPopupType) => {
    dispatch(
      emailPopupAction({
        ...items,
        title: param,
        contentTitleErr: '',
      })
    )
  }

  const handleEditorContentGet = (content: string) => {
    const editorContentText = getTextFromEditorContent(content)
    dispatch(editorDataAction(editorContentText))
  }

  const getTextFromEditorContent = (content?: string) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content ?? ''
    tempDiv.querySelectorAll('meta').forEach(meta => meta.remove())
    return tempDiv?.innerHTML.trim() ?? ''
  }

  const getMailingTemplateList = async () => {
    let res: SelectListOptionItem[] = [{ id: '', name: '선택' }]
    const { status, data, message } = await apiMailtemplateList()
    if (status === 'S') {
      const template = data as TemplateType[]
      for await (const findElement of template) {
        res = [
          ...res,
          {
            id: findElement.mailTemplateId.toString(),
            name: findElement.title,
            extra: findElement.isDefault.toString(),
          },
        ]
      }
      dispatch(
        setTemplateListAction({
          list: res,
          origin: template,
          find: { id: '', name: '선택' },
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
    return res
  }

  const initEmailPopupList = async (res: emailPopupType, releaseData: MailingDto) => {
    let param = res
    try {
      const mailingTemplate = await getMailingTemplateList()
      const shareCode =
        releaseData.shareCode !== undefined
          ? extendedShareScopeList.find(e => e.id === releaseData.shareCode) || shareCodeData.distribute
          : shareCodeData.distribute
      const isTemplate =
        releaseData?.mailTemplateId && releaseData?.mailTemplateId > 0
          ? mailingTemplate.find(e => e.id === releaseData?.mailTemplateId?.toString())
          : null
      param = {
        ...res,
        title: releaseData?.title || '',
        mailStateGroup: releaseData?.sendNow ? 'now' : 'reserved',
        selectedTime: releaseData.action
          ? {
              hours: Number(moment(releaseData.action.dueAt).format('HH')),
              minutes: Number(moment(releaseData.action.dueAt).format('mm')),
            }
          : {
              hours: 0,
              minutes: 0,
            },
        selectedDate: releaseData.action
          ? releaseData.action.dueAt
            ? new Date(releaseData.action.dueAt)
            : new Date()
          : new Date(),
        isTemplate: isTemplate && true ? 'use' : 'no',
        templateType:
          isTemplate && true
            ? {
                id: isTemplate.id.toString(),
                name: isTemplate.name,
              }
            : {
                id: '',
                name: '',
              },
        tagPressList: [],
        targetEmail: [],
        tagList: [],
        filesList: [],
        checkPhone: releaseData?.flagAttachContactInfo !== undefined ? releaseData?.flagAttachContactInfo : true,
        content: releaseData?.body || '',
        receivedEditorContent: releaseData?.body || '',
        scrop: shareCode,
      }
      if (releaseData?.extraMails && releaseData?.extraMails.length > 0) {
        for await (const shareCodeElement of releaseData?.extraMails) {
          param.targetEmail = [
            ...param.targetEmail,
            {
              id: shareCodeElement,
              label: shareCodeElement,
            },
          ]
        }
      }
      if (releaseData?.action?.tagList && releaseData?.action?.tagList.length > 0) {
        for await (const shareCodeElement of releaseData?.action?.tagList) {
          param.tagList = [
            ...param.tagList,
            {
              id: shareCodeElement?.tagId?.toString() || '',
              label: shareCodeElement.name?.toString() || '',
            },
          ]
        }
      }
      if (releaseData?.action?.journalistList && releaseData?.action?.journalistList.length > 0) {
        for await (const shareCodeElement of releaseData?.action?.journalistList) {
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
      if (releaseData?.action?.mediaList && releaseData?.action?.mediaList.length > 0) {
        for await (const shareCodeElement of releaseData?.action?.mediaList) {
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
      if (releaseData?.action?.jrnlstListList && releaseData?.action?.jrnlstListList.length > 0) {
        for await (const shareCodeElement of releaseData?.action?.jrnlstListList) {
          const temp = {
            id: shareCodeElement?.jrnlstListId?.toString() || '',
            label: shareCodeElement.title?.toString() || '',
            className: 'jrnlstListId',
          }
          param.tagPressList = [...param.tagPressList, temp]
        }
      }
      if (releaseData?.action?.mediaListList && releaseData?.action?.mediaListList.length > 0) {
        for await (const shareCodeElement of releaseData?.action?.mediaListList) {
          const temp = {
            id: shareCodeElement?.mediaListId?.toString() || '',
            label: shareCodeElement.title?.toString() || '',
            className: 'mediaListId',
          }
          param.tagPressList = [...param.tagPressList, temp]
        }
      }
      if (releaseData?.action?.fileAttachList && releaseData?.action?.fileAttachList.length > 0) {
        for await (const shareCodeElement of releaseData.action.fileAttachList) {
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
      const editor = releaseData?.body || ''
      // console.log('param', param)
      // console.log('editor', editor)
      dispatch(setEmailPopupAction({ email: param, editor }))
    } catch (e) {}
  }

  const initMediaList = async (res: PageFileAttachDto) => {
    try {
      let filesList: FileType[] = []
      if (res.content && res.content.length > 0) {
        for await (const element of res.content) {
          if (element.fileId) {
            const temp = {
              width: element.width,
              height: element.height,
              isImage: element.fileType === 'IMG',
              file: undefined,
              filename: element.name,
              fileSrc: element.path,
              id: element.fileId,
              size: element?.size ? getSize(element?.size, 'kb') : '0',
              mimeType: element.mimeType,
            }
            // @ts-ignore
            filesList = [...filesList, temp]
          }
        }
      }
      dispatch(
        mediaPopupAction({
          ...mediaPopup,
          page: mediaPopup.page === 1 ? 1 : filesList.length > 0 ? mediaPopup.page : mediaPopup.page - 1,
          isLoading: false,
          totalCount: res.totalElements ?? 0,
          totalPageCount: res.totalPages ?? 0,
          imageList: mediaPopup.radioSelected === 'IMG' ? filesList : [],
          filesList: mediaPopup.radioSelected !== 'IMG' ? filesList : [],
        })
      )
    } catch (e) {
      openToast('문제가 발생했습니다', 'error')
    }
  }

  const initInputMediaList = async (res: PageFileAttachDto) => {
    try {
      let filesList: FileType[] = []
      if (res.content && res.content.length > 0) {
        for await (const element of res.content) {
          if (element.fileId) {
            const temp = {
              width: element.width,
              height: element.height,
              isImage: element.fileType === 'IMG',
              file: undefined,
              filename: element.name,
              fileSrc: element.path,
              id: element.fileId,
              size: element?.size ? getSize(element?.size, 'kb') : '0',
              mimeType: element.mimeType,
            }
            // @ts-ignore
            filesList = [...filesList, temp]
          }
        }
      }
      dispatch(
        inputMediaPopupAction({
          ...inputMediaPopup,
          page: inputMediaPopup.page === 1 ? 1 : filesList.length > 0 ? inputMediaPopup.page : inputMediaPopup.page - 1,
          isLoading: false,
          totalCount: res.totalElements ?? 0,
          totalPageCount: res.totalPages ?? 0,
          imageList: inputMediaPopup.radioSelected === 'IMG' ? filesList : [],
          filesList: inputMediaPopup.radioSelected !== 'IMG' ? filesList : [],
        })
      )
    } catch (e) {
      openToast('문제가 발생했습니다', 'error')
    }
  }

  const uploadFile = async (
    files: FileList,
    items: FileType[],
    fileUnit: string,
    fileSizeLimit: number,
    fileLength: number
  ) => {
    let isProcess = false
    let res = items
    const filesArr = Array.from(files)
    const totalFileLength = items ? items.length + filesArr.length : filesArr.length
    fileLength > 1 && totalFileLength > fileLength ? openToast(messages['ko'].code101, 'error') : (isProcess = true)

    if (isProcess) {
      for await (const totalFileLengthElement of filesArr) {
        const fileSize = getSize(totalFileLengthElement.size, fileUnit ? fileUnit.toLocaleLowerCase() : 'kb')
        if (fileSizeLimit && fileSize > fileSizeLimit) {
          openToast(messages['ko'].code100, 'error')
        } else {
          const temp = await processUpload(totalFileLengthElement, fileUnit, '')
          temp.code === '' ? (res = [...res, temp.data]) : openToast(temp.code, 'error')
        }
      }
    }

    return res
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

  const getSize = (size: number, unit: string = 'kb') => {
    let calcuratedSize = 0
    if (unit === 'kb') {
      calcuratedSize = size / 1024
    } else if (unit === 'mb') {
      calcuratedSize = size / 1024 / 1024
    }
    return Number(calcuratedSize.toFixed(2))
  }

  const previewPopupOpen = useCallback(
    async (e: any, hook: emailPopupType) => {
      let target: string[] = []
      if (hook.targetEmail.length > 0) {
        for await (const argument of hook.targetEmail) {
          target = [...target, argument.label]
        }
      }
      if (hook.tagPressList.length > 0) {
        for await (const argument of hook.tagPressList) {
          target = [...target, argument.subData !== undefined ? argument.label + argument.subData : argument.label]
        }
      }
      const param = {
        isOpen: true,
        type: 'preview',
        data: e,
        receiver: target.join(', '),
      }
      dispatch(previewPopupAction(param))
    },
    [previewPopup.isOpen, previewPopup.type, previewPopup.data, previewPopup.receiver]
  )

  const contactInfoTemplateOpen = useCallback(
    (param: contactInfoPopupType) => {
      dispatch(contactInfoPopupAction(param))
    },
    [contactInfoPopup.type]
  )

  const updateContactInfoAction = useCallback(
    async (items: contactInfoPopupType) => {
      let isEmail = false

      if (!!items.content?.trim()) {
        const arrContent = items.content?.split('\n')

        arrContent.forEach(content => {
          EMAIL_PATTERN.test(content) && (isEmail = true)
        })
      }

      if (items.content === '') {
        const param = {
          ...items,
          contentErrorMessage: '이메일 서명은 필수항목입니다.',
        }
        dispatch(contactInfoPopupAction(param))
      } else if (!isEmail) {
        const param = {
          ...items,
          contentErrorMessage: '이메일은 필수 입력항목입니다.',
        }
        dispatch(contactInfoPopupAction(param))
      } else {
        const { status, data, message } = await updateContactInfo.mutateAsync({
          contactInfo: items.content,
        })
        if (status === 'S') {
          openToast(message?.message, 'success')
          dispatch(contactInfoPopupAction({ ...items, isOpen: false }))
        } else {
          openToast(message?.message, 'error')
        }
      }
    },
    [contactInfoPopup]
  )

  const handleShareSetting = useCallback(
    (e: SelectListOptionItem, items: emailPopupType) => {
      const find = originTemplateList.find(i => i.mailTemplateId.toString() === e.id)
      if (find) {
        dispatch(
          templateAction({
            content: find.content,
            email: {
              ...items,
              templateType: e,
              content: find.content,
              receivedEditorContent: find.content,
              contentErrorMessage: '',
            },
          })
        )
      }
    },
    [emailPopup, editorData]
  )

  const setAdjustTemplateAction = useCallback(
    (e: boolean) => {
      dispatch(adjustTemplateAction(e))
    },
    [adjustTemplate]
  )

  const setScropShareSetting = useCallback(
    (e: SelectListOptionItem, items: emailPopupType) => {
      dispatch(
        emailPopupAction({
          ...items,
          scrop: e,
        })
      )
    },
    [emailPopup.scrop]
  )

  const setmailStateGroupActionAction = useCallback(
    (e: string, items: emailPopupType) => {
      dispatch(
        emailPopupAction({
          ...items,
          mailStateGroup: e,
        })
      )
    },
    [emailPopup.mailStateGroup]
  )

  const setTemplateActionAction = useCallback(
    async (e: string, hook: emailPopupType) => {
      if (e === 'use') {
        await getMailingTemplateList()
      } else {
        dispatch(
          templateAction({
            content: '',
            email: {
              ...hook,
              isTemplate: e,
              templateType: { id: '', name: '' },
              content: '',
              receivedEditorContent: '',
              contentErrorMessage: '',
            },
          })
        )
      }
    },
    [emailPopup.isTemplate, emailPopup.templateType]
  )

  const dateConfirmPageDataAction = useCallback(
    (date: Date, hook: emailPopupType) => {
      dispatch(
        emailPopupAction({
          ...hook,
          selectedDate: date,
        })
      )
    },
    [emailPopup.selectedDate]
  )

  const contentFilesOnChange = useCallback(
    (e: FileType[], items: emailPopupType) => {
      dispatch(
        emailPopupAction({
          ...items,
          filesList: e,
        })
      )
    },
    [emailPopup.filesList]
  )

  const timeConfirmPageDataAction = useCallback(
    (hours: number, minutes: number, items: emailPopupType) => {
      dispatch(
        emailPopupAction({
          ...items,
          selectedTime: { hours, minutes },
        })
      )
    },
    [emailPopup.selectedTime]
  )

  const setReceiverGroupAction = useCallback(
    (e: string, items: emailPopupType) => {
      dispatch(
        emailPopupAction({
          ...items,
          receiverGroup: e,
        })
      )
    },
    [emailPopup.receiverGroup]
  )

  const setTagPressListAction = useCallback(
    (param: MbTagSearchTagItem[], items: emailPopupType) => {
      dispatch(
        emailPopupAction({
          ...items,
          tagPressList: param,
        })
      )
    },
    [emailPopup.tagPressList]
  )

  const setResetTagPressListAction = useCallback(
    (param: MbTagSearchTagItem, items: emailPopupType) => {
      const res = items.tagPressList.filter(item => item.id !== param.id)
      dispatch(
        emailPopupAction({
          ...items,
          tagPressList: res,
        })
      )
    },
    [emailPopup.tagPressList]
  )

  const setAllResetTagPressListAction = useCallback(
    (items: emailPopupType) => {
      dispatch(
        emailPopupAction({
          ...items,
          tagPressList: [],
        })
      )
    },
    [emailPopup.tagPressList]
  )

  const setTagTargetEmailListAction = useCallback(
    (items: emailPopupType, emailList: MbTagSearchTagItem[]) => {
      // console.log('emailList', emailList)
      dispatch(
        emailPopupAction({
          ...items,
          targetEmail: emailList,
        })
      )
    },
    [emailPopup.targetEmail]
  )

  const onDeleteUserFile = useCallback(
    (e: FileType, list: FileType[], items: emailPopupType, del: number[]) => {
      let deleteList: number[] = del
      if (list && list.length > 0) {
        const files = list.filter(file => file.id !== e.id)
        if (e.file === undefined) deleteList = [...deleteList, Number(e.id)]
        deleteList.length > 0
          ? dispatch(
              setDeletedFileIdListAction({
                delList: deleteList,
                list: {
                  ...items,
                  filesList: files,
                },
              })
            )
          : dispatch(
              emailPopupAction({
                ...items,
                filesList: files,
              })
            )
      }
    },
    [emailPopup.filesList, deletedFileIdList]
  )
  const contentPhoneCheckOnChange = useCallback(
    (e: boolean, items: emailPopupType) => {
      dispatch(
        emailPopupAction({
          ...items,
          checkPhone: e,
        })
      )
    },
    [emailPopup.checkPhone]
  )

  const handleTagCreateSuccess = useCallback(
    (item: TagDto, hook: emailPopupType) => {
      let newTags = _.cloneDeep(hook.tagList)
      const isExist = newTags.find(tag => tag.id === item.tagId?.toString())
      if (!isExist) {
        newTags.push({
          id: item.tagId?.toString() ?? '',
          label: item.name ?? '',
        })
      }
      dispatch(
        emailPopupAction({
          ...hook,
          tagList: newTags,
        })
      )
    },
    [emailPopup.tagList]
  )

  const handleTagStatusChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, item: TagSearchCreateLayerItem, items: emailPopupType) => {
      const isChecked = e.target.checked
      let newTags = _.cloneDeep(items.tagList)
      if (isChecked) {
        const isExist = newTags.find(tag => tag.id === item.id)
        if (!isExist) {
          newTags.push({
            id: item.id,
            label: item.name,
          })
        }
      } else {
        newTags = newTags.filter(tag => tag.id !== item.id)
      }
      dispatch(
        emailPopupAction({
          ...items,
          tagList: newTags,
        })
      )
    },
    [emailPopup.tagList]
  )

  const handleTagClose = useCallback(
    (item: MbTagSearchTagItem, items: emailPopupType) => {
      dispatch(
        emailPopupAction({
          ...items,
          tagList: _.cloneDeep(items.tagList).filter(tag => tag.id !== item.id),
        })
      )
    },
    [emailPopup.tagList]
  )

  const handleResetTagList = useCallback(
    (items: emailPopupType) => {
      dispatch(
        emailPopupAction({
          ...items,
          tagList: [],
        })
      )
    },
    [emailPopup.tagList]
  )

  const mediaPopupOpen = useCallback(
    (e: string) => {
      const param = {
        isOpen: true,
        type: e,
        confirmText: '확인',
        contents: '',
        title: '미디어 자료실',
        data: e,
        radioSelected: 'IMG',
        page: 1,
        size: 10,
        totalCount: 0,
        totalPageCount: 1,
        sort: ['regisAt!DESC'],
        imageList: [],
        filesList: [],
        filesItems: [],
        imageItems: [],
        releaseFilesItems: [],
        releaseImageItems: [],
        isLoading: true,
      }
      dispatch(mediaPopupAction(param))
    },
    [mediaPopup.isOpen]
  )

  const setMediaPopupSizeAction = useCallback(
    async (i: number, hook: mediaPopupType) => {
      const param = {
        ...hook,
        page: i,
        isLoading: true,
      }
      const handleAction = async () => {
        await dispatch(mediaPopupAction(param))
        refetchMediaPopupListData()
      }
      handleAction()
    },
    [mediaPopup.page, mediaPopup.isLoading]
  )

  const setEditorMediaFileCheckPopupAction = useCallback(
    (fileParam: FileType, path: string, isChecked: boolean, hook: mediaPopupType, list: mediaPopupItemType[]) => {
      let checkItems = list.map(e => e)
      !isChecked
        ? checkItems.push({
            id: Number(fileParam.id),
            path,
          })
        : (checkItems = checkItems.filter(item => item.id !== Number(fileParam.id)))
      const param = {
        ...hook,
        filesItems: checkItems,
      }
      dispatch(mediaPopupAction(param))
    },
    [mediaPopup.filesItems]
  )

  const setEditorMediaImageCheckPopupAction = useCallback(
    (fileParam: FileType, path: string, isChecked: boolean, hook: mediaPopupType, list: mediaPopupItemType[]) => {
      let checkItems = list.map(e => e)
      !isChecked
        ? checkItems.push({
            id: Number(fileParam.id),
            path,
            width: fileParam.width,
            height: fileParam.height,
          })
        : (checkItems = checkItems.filter(item => item.id !== Number(fileParam.id)))
      const param = {
        ...hook,
        imageItems: checkItems,
      }
      dispatch(mediaPopupAction(param))
    },
    [mediaPopup.imageItems]
  )

  const setMediaFileImagePopupAction = useCallback(
    async (i: FileType[], hooks: mediaPopupType) => {
      if (i && i.length > 0) {
        dispatch(
          mediaPopupAction({
            ...hooks,
            isLoading: true,
          })
        )
        let param: UsePressReleaseMediaPopupParams = {
          request: {
            groupId: userSelectGroup,
          },
          fileList: [],
        }
        for await (const newFile of i) {
          if (newFile.file) {
            param.fileList = [...param.fileList, newFile.file]
          }
        }
        const { status, message } = await apiAddPressReleaseMediaPopup.mutateAsync(param)
        if (status === 'S') {
          //await refetchMediaPopupListData()
        } else {
          openToast(message?.message, 'error')
          dispatch(
            mediaPopupAction({
              ...hooks,
              isLoading: false,
            })
          )
        }
      }
    },
    [mediaPopup.isLoading]
  )

  const setEmailCancelPopupAction = useCallback(
    async (e: boolean) => {
      dispatch(emailCancelPopupAction(e))
    },
    [emailCancelPopup]
  )

  const actionInputMediaPopup = useCallback(
    async (e: mediaPopupType, files: FileType[], fileMaxLenght: number) => {
      let isProcess = false
      let temp = files
      const getFiles = e.radioSelected === 'IMG' ? e.releaseImageItems : e.releaseFilesItems
      const totalFileLength = files ? files.length + getFiles.length : getFiles.length
      fileMaxLenght > 1 && totalFileLength > fileMaxLenght
        ? openToast(`파일첨부는 최대 ${fileMaxLenght}개 까지 가능합니다.`, 'error')
        : (isProcess = true)
      isProcess && dispatch(setInputMediaListFilesAction(temp.concat(getFiles)))
    },
    [inputMediaPopup]
  )

  const actionMediaPopup = useCallback(
    async (e: mediaPopupType, editorParam: string, contents: emailPopupType) => {
      let editorContentText = editorParam
      if (e.imageItems.length > 0) {
        for await (const eElement of e.imageItems) {
          const { data, status, message } = await apiPutPressReleaseMediaListUpload({
            id: Number(eElement.id),
            req: {
              groupId: userSelectGroup,
            },
          })
          if (status === 'S') {
            let temp = `
            <figure class="image archives">
              <img src=${data} alt=${eElement.id} width='${eElement.width}' height='${eElement.height}' style='aspect-ratio:${eElement.width}/${eElement.height}'>
            </figure>
            `
            editorContentText += temp
          } else {
            openToast(message?.message, 'error')
          }
        }
        const editorText = {
          ...contents,
          receivedEditorContent: editorContentText,
        }
        dispatch(
          editorMediaDataAction({
            emailPopupContent: editorText,
            text: editorContentText,
            imageItems: e.imageItems,
          })
        )
      } else {
        const editorText = {
          ...contents,
          receivedEditorContent: editorContentText,
        }
        dispatch(
          editorMediaDataAction({
            emailPopupContent: editorText,
            text: editorContentText,
            imageItems: e.imageItems,
          })
        )
      }
    },
    [mediaPopup, emailPopup, editorImageItems, editorData]
  )

  const actionContactInfoInsert = async (contactInfo: string, editorParam: string) => {
    let editorContentText = editorParam
    if (!!contactInfo) {
      const arrContactInfo = contactInfo.split('\n')
      if (arrContactInfo?.length > 0) {
        editorContentText += '<p></p>'
        editorContentText += '<p>'
        for (const info of arrContactInfo) {
          editorContentText += `
            ${!!info.trim() ? `<span style="font-family:맑은고딕;font-size:14px;">${info}</span>` : ''}</br>
          `
        }
        editorContentText += '</p>'
      }
    }
    dispatch(setContatcInfo(editorContentText))
  }

  const setSelectedInputMediaPopupAction = useCallback(
    (i: string, prop: mediaPopupType) => {
      const param = {
        ...prop,
        page: 1,
        size: 10,
        totalCount: 0,
        totalPageCount: 1,
        sort: ['regisAt!DESC'],
        filesList: [],
        imageList: [],
        filesItems: [],
        imageItems: [],
        releaseFilesItems: [],
        releaseImageItems: [],
        isLoading: true,
        radioSelected: i,
      }
      dispatch(inputMediaPopupAction(param))
    },
    [inputMediaPopup.radioSelected]
  )

  const setDeleteInputMediaImagePopupAction = async (i: number) => {
    const { status, message } = await apiDeletePressReleaseMediaPopup.mutateAsync({
      id: i,
    })
    if (status === 'S') {
      //await refetchInputMediaPopupListData()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setInputMediaImageCheckPopupAction = useCallback(
    (fileParam: FileType, isChecked: boolean, hook: mediaPopupType, list: FileType[]) => {
      let checkItems = list.map(e => e)
      !isChecked ? checkItems.push(fileParam) : (checkItems = checkItems.filter(item => item.id !== fileParam.id))
      const param = {
        ...hook,
        releaseImageItems: checkItems,
      }
      dispatch(inputMediaPopupAction(param))
    },
    [inputMediaPopup.releaseImageItems]
  )

  const setInputMediaFileCheckPopupAction = useCallback(
    (fileParam: FileType, isChecked: boolean, hook: mediaPopupType, list: FileType[]) => {
      let checkItems = list.map(e => e)
      !isChecked ? checkItems.push(fileParam) : (checkItems = checkItems.filter(item => item.id !== fileParam.id))
      const param = {
        ...hook,
        releaseFilesItems: checkItems,
      }
      dispatch(inputMediaPopupAction(param))
    },
    [inputMediaPopup.releaseFilesItems]
  )

  const setInputMediaPopupSizeAction = useCallback(
    async (i: number, hook: mediaPopupType) => {
      const param = {
        ...hook,
        page: i,
        isLoading: true,
      }
      const handleAction = async () => {
        await dispatch(inputMediaPopupAction(param))
        refetchInputMediaPopupListData()
      }
      handleAction()
    },
    [inputMediaPopup.page, inputMediaPopup.isLoading]
  )

  const setInputMediaFileImagePopupAction = useCallback(
    async (i: FileType[], hooks: mediaPopupType) => {
      if (i && i.length > 0) {
        dispatch(
          inputMediaPopupAction({
            ...hooks,
            isLoading: true,
          })
        )
        let param: UsePressReleaseMediaPopupParams = {
          request: {
            groupId: userSelectGroup,
          },
          fileList: [],
        }
        for await (const newFile of i) {
          if (newFile.file) {
            param.fileList = [...param.fileList, newFile.file]
          }
        }
        const { status, message } = await apiAddPressReleaseMediaPopup.mutateAsync(param)
        if (status === 'S') {
          await refetchInputMediaPopupListData()
        } else {
          openToast(message?.message, 'error')
          dispatch(
            inputMediaPopupAction({
              ...hooks,
              isLoading: false,
            })
          )
        }
      }
    },
    [mediaPopup.isLoading]
  )

  const popupReleaseAction = useCallback((e: boolean) => dispatch(setIsReleasePopupAction(e)), [isReleasePopup])
  const popupConfirmAction = useCallback((e: boolean) => dispatch(setCofirmPopupAction(e)), [isConfirmPopup])
  const popupNoticeAction = useCallback((e: boolean) => dispatch(setNoticePopupAction(e)), [isNoticePopup])
  const initPreviewPopup = useCallback(async () => dispatch(initPreviewPopupAction()), [previewPopup])
  const initMediaPopup = useCallback((e: boolean) => dispatch(initMediaPopupAction(e)), [mediaPopup])

  const setEmailPopup = useCallback(async () => {
    dispatch(initEmail())
  }, [emailPopup])

  const initInputMediaPopupPopup = useCallback(
    (e: boolean) => dispatch(initInputMediaPopupAction(e)),
    [inputMediaPopup]
  )

  useEffect(() => {
    if (!contactInfoData) return
    const { status, data, message } = contactInfoData as BaseResponseCommonObject
    if (status === 'S') {
      const param = {
        isOpen: false,
        type: 'contactInfo_emal',
        content: String(data),
        contentErrorMessage: '',
        data: '',
      }
      dispatch(contactInfoPopupAction(param))
    } else {
      openToast(message?.message, 'error')
    }
  }, [contactInfoData])

  useEffect(() => {
    if (!mediaPopupListData) return
    const { status, data, message } = mediaPopupListData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as PageFileAttachDto
      initMediaList(res)
    } else {
      openToast(message?.message, 'error')
    }
  }, [mediaPopupListData])

  useEffect(() => {
    if (!inputMediaPopupListData) return
    const { status, data, message } = inputMediaPopupListData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as PageFileAttachDto
      initInputMediaList(res)
    } else {
      openToast(message?.message, 'error')
    }
  }, [inputMediaPopupListData])

  useEffect(() => {
    if (!mailingData) return
    const { status, data, message } = mailingData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as MailingDto
      initEmailPopupList(emailPopup, res)
    } else {
      openToast(message?.message, 'error')
    }
  }, [mailingData])

  return {
    emailPopup,
    isNoticePopup,
    contactInfoPopup,
    userInfo,
    mediaPopup,
    inputMediaPopup,
    userTemplateList,
    previewPopup,
    editorData,
    userSelectGroup,
    licenseInfo,
    deletedFileIdList,
    isConfirmPopup,
    isReleasePopup,
    adjustTemplate,
    isLoading,
    timeZoneData,
    refinedValue,
    isDemoLicense,
    emailCancelPopup,
    isWrite,

    cancelRelease,
    nextStepValidate,
    setDeleteMediaImagePopupAction,
    mediaUploadFile,
    contactInfoOnChange,
    setEmailPopupTitleAction,
    handleEditorContentGet,
    uploadFile,
    setEmailAction,
    checkReservedEmailCount,
    actionContactInfoInsert,
    setDeleteInputMediaImagePopupAction,

    setEmailPopup,
    contentFilesOnChange,
    setmailStateGroupActionAction,
    dateConfirmPageDataAction,
    timeConfirmPageDataAction,
    setTemplateActionAction,
    handleShareSetting,
    setReceiverGroupAction,
    setTagPressListAction,
    setAllResetTagPressListAction,
    setResetTagPressListAction,
    setTagTargetEmailListAction,
    onDeleteUserFile,
    popupNoticeAction,
    contentPhoneCheckOnChange,
    updateContactInfoAction,
    setScropShareSetting,
    contactInfoTemplateOpen,
    handleTagCreateSuccess,
    handleTagStatusChange,
    handleTagClose,
    handleResetTagList,
    mediaPopupOpen,
    previewPopupOpen,
    initPreviewPopup,
    initMediaPopup,
    initInputMediaPopupPopup,
    setMediaPopupSizeAction,
    setMediaFileImagePopupAction,
    actionMediaPopup,
    setEditorMediaFileCheckPopupAction,
    setEditorMediaImageCheckPopupAction,
    popupConfirmAction,
    popupReleaseAction,
    setAdjustTemplateAction,
    setSelectedInputMediaPopupAction,
    setInputMediaFileCheckPopupAction,
    setInputMediaImageCheckPopupAction,
    setInputMediaPopupSizeAction,
    setInputMediaFileImagePopupAction,
    actionInputMediaPopup,
    setEmailCancelPopupAction,
  }
}
