import React from 'react'
import { ChangeEvent, useCallback, useEffect } from 'react'
import { Address } from 'react-daum-postcode'
import DOMPurify from 'dompurify'
import _ from 'lodash'
import moment from 'moment-timezone'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import {
  defaultPublishComTypeList,
  defaultPublishLanguageList,
  defaultPublishTypeList,
  defaultRegion,
  extendedShareScopeList,
} from '~/components/contents/distribution/NewswireRelease/defaultData'
import { NewswireErrorMsg } from '~/components/contents/distribution/NewswireRelease/Popup/Warning'
import {
  EMAIL_PATTERN,
  EMAIL_PATTERN_DESCRIPTION,
  NUMBER_PATTERN,
  ONLY_NUMBER_PATTERN,
  TELEPHONE_NUMBER_PATTERN,
  WEBSITE_PATTERN,
  YOUTUBE_PATTERN,
} from '~/constants/common'
import { setNeedLicenseCheckAction } from '~/stores/modules/contents/auth/auth'
import {
  addressPopupAction,
  contentPageDataAction,
  contentPageDataType,
  contentPageInitAction,
  createInitAction,
  draftListAction,
  editorDataAction,
  editorMediaDataAction,
  ErrorObject,
  fromContentsToSettingAction,
  fromSettingToConfirmAction,
  importPopupAction,
  importPopupType,
  initInputMediaPopupAction,
  initMediaPopupAction,
  initNewswireRelease,
  initSettingDataAction,
  inputMediaPopupAction,
  inputMediaPopupType,
  mediaPopupAction,
  mediaPopupItemType,
  mediaPopupType,
  outMessagePopupAction,
  previewPopupAction,
  previewPopupType,
  publishCompanyInfoType,
  regionListAction,
  releasePopupAction,
  setInputMediaListFilesAction,
  setMyCompanyInfoAction,
  setReUrlAction,
  settingPageDataAction,
  settingPageDataType,
  tabAction,
} from '~/stores/modules/contents/newswireRelease/newswireRelease'
import {
  BaseResponseCommonObject,
  CompanyDto,
  type CreateNewswireReleaseDto,
  MailingDto,
  ModifyNewswireReleaseDto,
  NewswireReleaseDto,
  PageFileAttachDto,
  TagDto,
} from '~/types/api/service'
import { SelectListOptionItem, StepItem } from '~/types/common'
import { MbTagSearchTagItem, type ShareItem, type TagSearchCreateLayerItem } from '~/types/contents/Common'
import { CommonCode, useGetCommonCode } from '~/utils/api/common/useGetCommonCode'
import { useGetCompanyInfo } from '~/utils/api/company/useGetCompanyInfo'
import { apiGetEmailPressReleaseGet } from '~/utils/api/emailPressRelease/usePostEmailPressReleaseGet'
import {
  useDeletePressReleaseMediaPopup,
  useGetPressReleaseMediaPopup,
  usePressReleaseMediaPopup,
  UsePressReleaseMediaPopupParams,
} from '~/utils/api/emailPressRelease/usePressReleaseMediaPopup'
import { apiPutPressReleaseMediaListUpload } from '~/utils/api/image/apiPostImageUpload'
import { useGetNewswireReleaseCount } from '~/utils/api/newswireRelease/useGetNewswireReleaseCount'
import { useGetNewswireReleaseDraft } from '~/utils/api/newswireRelease/useGetNewswireReleaseDraft'
import { usePostNewswireReleaseCreate } from '~/utils/api/newswireRelease/usePostNewswireReleaseCreate'
import { usePostNewswireReleaseEdit } from '~/utils/api/newswireRelease/usePostNewswireReleaseEdit'
import { apiGetNewswireReleaseGet } from '~/utils/api/newswireRelease/usePostNewswireReleaseGet'
import { usePutNewswireRelease } from '~/utils/api/newswireRelease/usePutNewswireRelease'
import { useLockRelease, useUnLockRelease } from '~/utils/api/release/draft/useDeleteNewswireRelease'
import { getYearToMinuteFormat } from '~/utils/common/date'
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

export const useNewswireRelease = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const lockRelease = useLockRelease()
  const unLockRelease = useUnLockRelease()
  const apiPostNewswireReleaseCreate = usePostNewswireReleaseCreate()
  const apiPostNewswireReleaseEdit = usePostNewswireReleaseEdit()
  const apiAddPressReleaseMediaPopup = usePressReleaseMediaPopup()
  const apiDeletePressReleaseMediaPopup = useDeletePressReleaseMediaPopup()
  const sendNewswireRelease = usePutNewswireRelease()

  const { userInfo, licenseInfo, isDemoLicense, timeZoneData, userSelectGroup, timeZone, shareCodeData } =
    useAppSelector(state => state.authSlice)
  const { refinedValue } = useAppSelector(state => state.userSettingSlice)
  const {
    reUrl,
    draftList,
    outMessagePopup,
    nwReleaseId,
    isEdit,
    tab,
    settingPageData,
    mediaPopup,
    previewPopup,
    importPopup,
    contentPageData,
    editorData,
    releasePopup,
    inputMediaPopup,
    addressPopup,
    regionList,
    myCompanyData,
  } = useAppSelector(state => state.newswireReleaseSlice)

  const { data: myCompanyInfo } = useGetCompanyInfo()

  const { data: newswireReleaseCount } = useGetNewswireReleaseCount()

  const { data: draftListData } = useGetNewswireReleaseDraft(
    {
      groupId: userSelectGroup,
    },
    { enabled: router.pathname === '/newswire' }
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
      enabled: router.pathname === '/newswire' && tab.id === 'content',
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
      enabled: router.pathname === '/newswire' && tab.id === 'content',
    }
  )

  const { data: getCommonCode } = useGetCommonCode({
    parentCode: 'COM_COUNTRY',
  })

  const checkMoving = useCallback(() => dispatch(outMessagePopupAction(true)), [outMessagePopup])
  const initOutMessagePopup = useCallback(() => dispatch(outMessagePopupAction(false)), [outMessagePopup])
  const initDraftListPopup = useCallback(() => dispatch(draftListAction({ count: 0, isOpen: false })), [draftList])
  const initMediaPopup = useCallback((e: boolean) => dispatch(initMediaPopupAction(e)), [mediaPopup])
  const initInputMediaPopupPopup = useCallback(
    (e: boolean) => dispatch(initInputMediaPopupAction(e)),
    [inputMediaPopup]
  )

  const closeMediaPopup = useCallback(
    (e: boolean, editorParam?: string, contents?: contentPageDataType) => {
      if (editorParam && contents) {
        const editorText = {
          ...contents,
          receivedEditorContent: editorParam,
        }
        dispatch(
          editorMediaDataAction({
            contentPageDataProps: editorText,
            text: editorParam,
          })
        )
      }
      dispatch(initMediaPopupAction(e))
    },
    [editorData]
  )

  const actionInputMediaPopup = useCallback(
    async (e: inputMediaPopupType, files: FileType[], fileMaxLenght: number) => {
      let isProcess = false
      let temp = files
      const getFiles = e.radioSelected === 'IMG' ? e.releaseImageItems : e.releaseFilesItems
      const totalFileLength = files ? files.length + getFiles.length : getFiles.length
      fileMaxLenght > 1 && totalFileLength > fileMaxLenght
        ? openToast(`파일첨부는 최대 ${fileMaxLenght}개 까지 가능합니다.`, 'error')
        : (isProcess = true)
      isProcess && dispatch(setInputMediaListFilesAction(temp.concat(getFiles)))
    },
    [inputMediaPopup, contentPageData.filesList]
  )
  const actionMediaPopup = useCallback(
    async (e: mediaPopupType, editorParam: string, contents: contentPageDataType) => {
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
            contentPageDataProps: editorText,
            text: editorContentText,
          })
        )
      } else {
        const editorText = {
          ...contents,
          receivedEditorContent: editorContentText,
        }
        dispatch(
          editorMediaDataAction({
            contentPageDataProps: editorText,
            text: editorContentText,
          })
        )
      }
    },
    [mediaPopup, contentPageData, editorData]
  )

  const setInputMediaImageCheckPopupAction = useCallback(
    (fileParam: FileType, isChecked: boolean, hook: inputMediaPopupType, list: FileType[]) => {
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
    (fileParam: FileType, isChecked: boolean, hook: inputMediaPopupType, list: FileType[]) => {
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
          await refetchMediaPopupListData()
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

  const setInputMediaFileImagePopupAction = useCallback(
    async (i: FileType[], hooks: inputMediaPopupType) => {
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

  const setInputMediaPopupSizeAction = useCallback(
    async (i: number, hook: inputMediaPopupType) => {
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
  const setMediaPopupSizeAction = useCallback(
    async (i: number, hook: mediaPopupType) => {
      const param = {
        ...hook,
        page: i,
        isLoading: true,
      }
      dispatch(mediaPopupAction(param))
      refetchMediaPopupListData()
    },
    [mediaPopup.page, mediaPopup.isLoading]
  )
  const setSelectedInputMediaPopupAction = useCallback(
    (i: string, prop: inputMediaPopupType) => {
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

  const previewPopupOpen = useCallback(
    async (e: any, hook: contentPageDataType) => {
      let target: string[] = []
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

  const setPreviewPopupAction = useCallback(
    async (props: previewPopupType) => {
      dispatch(previewPopupAction(props))
    },
    [previewPopup]
  )

  const setImportPopupAction = useCallback(async (props: importPopupType) => {
    const param = {
      isOpen: props.isOpen,
    }
    dispatch(importPopupAction(param))
  }, [])

  const setImportPopupSelectedId = useCallback(async (e: number, props: importPopupType) => {
    const param = {
      ...props,
      selectedId: e,
    }
    dispatch(importPopupAction(param))
  }, [])

  const contentPageDataFilesOnChange = useCallback(
    (e: FileType[], items: contentPageDataType) => {
      dispatch(
        contentPageDataAction({
          ...items,
          filesList: e,
        })
      )
    },
    [contentPageData.filesList]
  )
  const contentPageDataTitleOnChange = useCallback(
    async (i: string, hook: contentPageDataType) => {
      const param = {
        ...hook,
        title: i,
        titleErr: '',
      }
      dispatch(contentPageDataAction(param))
    },
    [contentPageData.title, contentPageData.titleErr]
  )
  const contentPageDataSubtitleOnChange = useCallback(
    async (i: string, hook: contentPageDataType) => {
      const param = {
        ...hook,
        subtitle: i,
      }
      dispatch(contentPageDataAction(param))
    },
    [contentPageData.subtitle]
  )
  const contentPageDataContactInfoOnChange = useCallback(
    async (i: string, hook: contentPageDataType) => {
      const param = {
        ...hook,
        contactInfo: i,
        contactInfoError: '',
      }
      dispatch(contentPageDataAction(param))
    },
    [contentPageData.contactInfo]
  )
  const contentPageDataVideoSrcOnChange = useCallback(
    async (i: string, insert: boolean, hook: contentPageDataType) => {
      let param
      if (!insert) {
        param = {
          ...hook,
          videoSrcError: '',
        }
      } else {
        if (!YOUTUBE_PATTERN.test(i)) {
          param = {
            ...hook,
            videoSrcError: '유튜브 동영상 주소가 아닙니다. 유효한 유튜브 동영상 URL을 입력하세요.',
          }
        } else {
          param = {
            ...hook,
            videoSrc: i,
            videoSrcError: '',
          }
        }
      }
      dispatch(contentPageDataAction(param))
    },
    [contentPageData.videoSrc]
  )
  const contentPageDataVideoSrcOnDelete = useCallback(
    async (hook: contentPageDataType) => {
      const param = {
        ...hook,
        videoSrc: '',
        videoDesc: '',
        videoSrcError: '',
        videoDescError: '',
      }
      dispatch(contentPageDataAction(param))
    },
    [contentPageData.videoSrc]
  )
  const contentPageDataVideoDescOnChange = useCallback(
    async (i: string, hook: contentPageDataType) => {
      const param = {
        ...hook,
        videoDesc: i,
        videoDescError: '',
      }
      dispatch(contentPageDataAction(param))
    },
    [contentPageData.videoDesc]
  )

  const contentPageDataAddMediaFileListOnChange = useCallback(
    async (i: FileType[], hook: contentPageDataType) => {
      const existingIds = new Set(hook.filesList.map(file => file.id))
      const uniqueFiles = i.filter(file => !existingIds.has(file.id))
      const updatedFilesList = [...hook.filesList, ...uniqueFiles]
      const param = {
        ...hook,
        filesList: updatedFilesList,
      }
      dispatch(contentPageDataAction(param))
    },
    [contentPageData.filesList]
  )

  const contentPageDataFilesDescOnChange = useCallback(
    async (i: string, fileId: string, hook: contentPageDataType) => {
      const updatedFilesList = hook.filesList.map(file => (file.id === fileId ? { ...file, description: i } : file))
      const param = {
        ...hook,
        filesList: updatedFilesList,
        filesErrorList: hook.filesErrorList.filter(item => item.id !== fileId),
      }
      dispatch(contentPageDataAction(param))
    },
    [contentPageData.filesList]
  )

  const contentPageDataDeleteUserFile = useCallback(
    (i: FileType, hook: contentPageDataType) => {
      let deleteList: number[] = [...hook.deletedFileIdList]
      if (hook.filesList && hook.filesList.length > 0) {
        const files = hook.filesList.filter(file => file.id !== i.id)
        if (i.file === undefined) deleteList = [...deleteList, Number(i.id)]
        dispatch(
          contentPageDataAction({
            ...hook,
            filesList: files,
            deletedFileIdList: deleteList,
            filesErrorList: hook.filesErrorList.filter(e => e.id !== i.id),
          })
        )
      }
    },
    [contentPageData.filesList]
  )

  const tabChangeAction = useCallback(
    async (e: StepItem) => {
      dispatch(tabAction(e))
    },
    [tab]
  )

  const settingPageDataWsiteOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        wsite: e,
        wsiteErr: '',
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.wsite]
  )

  const settingPageDataWsiteMyOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        wsiteMy: e,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.wsiteMy]
  )

  const settingPageDataPublishComTypeOnChange = useCallback(
    async (e: SelectListOptionItem, hook: settingPageDataType) => {
      const param = {
        ...hook,
        publishComType: e,
        regionErr: '',
        addressNmErr: '',
        wsiteErr: '',
        wsiteMyErr: '',
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.publishComType]
  )

  const settingPageDataPublishCompanyIdOnChange = useCallback(
    async (e: number, hook: settingPageDataType) => {
      const param = {
        ...hook,
        publishCompanyId: e,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.publishCompanyId]
  )

  const settingPageDataPublisherOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        publisher: e,
        publisherErr: '',
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.publisher]
  )

  const settingPageDataPublisherMyOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        publisherMy: e,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.publisherMy]
  )

  const settingPageDataPublishWhereOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        publishWhere: e,
        publishWhereErr: '',
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.publishWhere]
  )

  const settingPageDataLanguageOnChange = useCallback(
    async (e: SelectListOptionItem, hook: settingPageDataType) => {
      const param = {
        ...hook,
        language: e,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.language]
  )

  const settingPageDataPublishNowOnChange = useCallback(
    async (e: SelectListOptionItem, hook: settingPageDataType) => {
      const param = {
        ...hook,
        publishNow: e,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.publishNow]
  )

  const settingPageDataPublishDateOnChange = useCallback(
    async (e: Date, hook: settingPageDataType) => {
      const param = {
        ...hook,
        publishDate: e,
        publishTimeErr: '',
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.publishDate]
  )

  const settingPageDataPublishTimeOnChange = useCallback(
    async (hours: number, minutes: number, hook: settingPageDataType) => {
      const param = {
        ...hook,
        publishTime: { hours, minutes },
        publishTimeErr: '',
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.publishDate]
  )

  const settingPageDataRegionOnChange = useCallback(
    async (e: SelectListOptionItem, hook: settingPageDataType) => {
      const param = {
        ...hook,
        region: e,
        regionErr: '',
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.region]
  )

  const settingPageDataRegionMyOnChange = useCallback(
    async (e: SelectListOptionItem, hook: settingPageDataType) => {
      const param = {
        ...hook,
        regionMy: e,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.region]
  )

  const settingPageDataAddressNmOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        addressNm: e,
        addressNmErr: '',
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.addressNm]
  )

  const settingPageDataAddressNmMyOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        addressNmMy: e,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.addressNmMy]
  )

  const settingPageDataSubAddressNmOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        subAddressNm: e,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.subAddressNm]
  )

  const settingPageDataSubAddressNmMyOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        subAddressNmMy: e,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.subAddressNmMy]
  )

  const settingPageDataAlarmMobileOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        alarmMobile: e,
        alarmMobileErr: '',
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.alarmMobile]
  )

  const settingPageDataAlarmEmailOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        alarmEmail: e,
        alarmEmailErr: '',
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.alarmEmail]
  )

  const settingPageDataMsgToNwireOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        msgToNwire: e,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.msgToNwire]
  )

  const settingPageDataTermsApprovedOnChange = useCallback(
    async (e: boolean, hook: settingPageDataType) => {
      const param = {
        ...hook,
        termsApproved: e,
        termsApprovedErr: '',
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.termsApproved]
  )

  const settingPageDataTermsApproved2OnChange = useCallback(
    async (e: boolean, hook: settingPageDataType) => {
      const param = {
        ...hook,
        termsApproved2: e,
        termsApproved2Err: '',
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.termsApproved2]
  )

  const settingPageDataTagListOnChange = useCallback(
    async (e: MbTagSearchTagItem[], hook: settingPageDataType) => {
      const param = {
        ...hook,
        tagList: e,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.tagList]
  )

  const settingPageDataResetTagListOnChange = useCallback(
    async (hook: settingPageDataType) => {
      const param = {
        ...hook,
        tagList: [],
        isEdit: true,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.tagList]
  )

  const settingPageDataShareOnChange = useCallback(
    async (option: ShareItem, hook: settingPageDataType) => {
      const param = {
        ...hook,
        scrop: option,
        isEdit: true,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.scrop]
  )

  const settingPageDataTagCreateSuccessOnChange = useCallback(
    async (item: TagDto, hook: settingPageDataType) => {
      let newTags = _.cloneDeep(hook.tagList)
      const isExist = newTags.find(tag => tag.id === item.tagId?.toString())
      if (!isExist) {
        newTags.push({
          id: item.tagId?.toString() ?? '',
          label: item.name ?? '',
        })
      }
      const param = {
        ...hook,
        tagList: newTags,
        isEdit: true,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.tagList]
  )
  const settingPageDataTagStatusOnChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>, item: TagSearchCreateLayerItem, hook: settingPageDataType) => {
      const isChecked = e.target.checked
      let newTags = _.cloneDeep(hook.tagList)
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
      const param = {
        ...hook,
        tagList: newTags,
        isEdit: true,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.tagList]
  )

  const settingPageDataTagCloseOnChange = useCallback(
    async (item: MbTagSearchTagItem, hook: settingPageDataType) => {
      const param = {
        ...hook,
        tagList: _.cloneDeep(hook.tagList).filter(tag => tag.id !== item.id),
        isEdit: true,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.tagList]
  )

  const settingPageDataCompanyInfoOnChange = useCallback(
    async (e: publishCompanyInfoType, hook: settingPageDataType) => {
      const param = {
        ...hook,
        publisher: e.name,
        publisherErr: '',
        wsite: e.wsite,
        wsiteErr: '',
        region: regionList.find(item => item.id === e.countryCode) || defaultRegion,
        regionErr: '',
        addressNm: e.address,
        addressNmErr: '',
        subAddressNm: e.addressDetail,
        subAddressNmErr: '',
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.wsite]
  )

  const settingStepValidate = async (props: settingPageDataType) => {
    let publishWhereErr = ''
    let publishTimeErr = ''
    let alarmMobileErr = ''
    let alarmEmailErr = ''
    let termsApprovedErr = ''
    let termsApproved2Err = ''
    let publisherErr = ''
    let wsiteErr = ''
    let wsiteMyErr = ''
    let addressNmErr = ''
    let regionErr = ''

    let isProcess = false

    if (props.publishComType?.id === 'other') {
      if (props.publisher === '') {
        publisherErr = '발표 회사명을 입력하세요.'
      }
      if (props.addressNm === '') {
        addressNmErr = '발표 회사 주소를 입력하세요.'
      }
      if (props.wsite !== '' && !WEBSITE_PATTERN.test(props.wsite || '')) {
        wsiteErr = '유효하지 않은 URL 형식입니다.'
      }
    } else if (props.wsiteMy !== '' && props.publishComType?.id === 'my') {
      if (!WEBSITE_PATTERN.test(props.wsiteMy || '')) {
        wsiteMyErr = '유효하지 않은 URL 형식입니다.'
      }
    }

    if (
      (props.publishComType?.id === 'my' && props.regionMy?.id === '') ||
      (props.publishComType?.id === 'other' && props.region?.id === '')
    ) {
      regionErr = '발표 회사 국가를 선택하세요.'
    }
    if (props.publishWhere === '') {
      publishWhereErr = '뉴스 발표지를 입력하세요.'
    }
    if (props?.publishNow?.id === 'reserved') {
      const now = new Date()
      const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000)
      const formattedTwoHoursLater = getYearToMinuteFormat('Asia/Seoul', twoHoursLater)
      //@ts-ignore
      if (props.publishDate < twoHoursLater) {
        publishTimeErr = `배포희망시각은 ${formattedTwoHoursLater} 이후 가능합니다.`
      }
    }
    if (props.alarmMobile === '') {
      alarmMobileErr = '휴대전화를 입력하세요.'
    }
    if (props.alarmMobile !== '' && !TELEPHONE_NUMBER_PATTERN.test(props.alarmMobile)) {
      alarmMobileErr = '유효한 번호가 아닙니다.'
    }
    if (props.alarmEmail !== '' && !EMAIL_PATTERN.test(props.alarmEmail || '')) {
      alarmEmailErr = EMAIL_PATTERN_DESCRIPTION
    }
    if (props.termsApproved === false) {
      termsApprovedErr = '이용약관 동의를 체크해 주세요.'
    }
    if (props.termsApproved2 === false) {
      termsApproved2Err = '개인정보 취급방침 동의를 체크해 주세요.'
    }
    isProcess = [
      publisherErr,
      addressNmErr,
      wsiteErr,
      wsiteMyErr,
      publishWhereErr,
      publishTimeErr,
      alarmMobileErr,
      alarmEmailErr,
      termsApprovedErr,
      termsApproved2Err,
      regionErr,
    ].every(err => err === '')
    if (!isProcess) {
      dispatch(
        settingPageDataAction({
          ...props,
          publisherErr,
          addressNmErr,
          wsiteErr,
          wsiteMyErr,
          publishWhereErr,
          publishTimeErr,
          alarmMobileErr,
          alarmEmailErr,
          termsApprovedErr,
          termsApproved2Err,
          regionErr,
        })
      )
    }
    return isProcess
  }

  const contentStepValidate = async (props: contentPageDataType, editorData: string) => {
    let titleErr = ''
    let contentError = ''
    let contactInfoError = ''
    let videoDescError = ''
    let filesErrorList: ErrorObject[] = []
    let isProcess = false

    if (props.title === '') {
      titleErr = '제목을 입력하세요.'
    }
    if (editorData === '') {
      contentError = '내용을 입력하세요.'
    }
    if (props.contactInfo === '') {
      contactInfoError = '언론 연락처 정보를 입력하세요.'
    }
    if (props.videoSrc !== '' && props.videoDesc === '') {
      videoDescError = '동영상 설명을 입력하세요.'
    }

    props.filesList?.forEach(file => {
      if (!file.description || file.description.trim() === '') {
        filesErrorList.push({ id: file.id || '', errorMsg: '이미지 설명을 입력하세요.' })
      }
    })

    isProcess =
      [titleErr, contentError, contactInfoError, videoDescError].every(err => err === '') && filesErrorList.length < 1
    if (!isProcess) {
      dispatch(
        contentPageDataAction({
          ...props,
          titleErr,
          contentError,
          contactInfoError,
          videoDescError,
          filesErrorList,
        })
      )
    }
    return isProcess
  }

  const createNewswireRelease = async (params: CreateNewswireReleaseDto, fileList: File[]) => {
    let res = 0
    const { status, message, data } = await apiPostNewswireReleaseCreate.mutateAsync({
      request: params,
      fileList,
    })
    const result = data as NewswireReleaseDto
    if (status === 'S' && result?.nwReleaseId) {
      dispatch(createInitAction())
      res = result.nwReleaseId
    } else {
      openToast(message?.message, 'error')
    }
    return res
  }

  const fromSettingToConfirm = async (id: number) => {
    dispatch(fromSettingToConfirmAction({ id }))
  }

  const fromDataToContents = async (id: number, editor: string) => {
    const releaseData = await getReleaseData(id)
    if (releaseData !== null) {
      let content: contentPageDataType = {
        title: releaseData?.title || '',
        titleErr: '',
        subtitle: releaseData?.subtitle || '',
        getEditorContentString: editor === null || editor === undefined ? releaseData?.content || '' : editor,
        receivedEditorContent: editor === null || editor === undefined ? releaseData?.content || '' : editor,
        content: editor === null || editor === undefined ? releaseData?.content || '' : editor,
        contentError: '',
        filesList: [],
        filesErrorList: [],
        deletedFileIdList: [],
        contactInfo: releaseData?.contactPoint || '',
        contactInfoError: '',
        videoSrc: releaseData?.youtube || '',
        videoSrcError: '',
        videoDesc: releaseData?.youtubeExplained || '',
        videoDescError: '',
      }
      let setting: settingPageDataType = {
        publishComType: releaseData.isMycomPublisher ? defaultPublishComTypeList[0] : defaultPublishComTypeList[1],
        publishCompanyId: releaseData?.publishCompanyId || 0,
        publisher: (!releaseData.isMycomPublisher && releaseData?.publisher) || '',
        publisherErr: '',
        publisherMy: myCompanyData?.name || '',
        publishWhere: releaseData?.publishWhere || '',
        publishWhereErr: '',
        wsite: releaseData.isMycomPublisher ? '' : releaseData?.wsite || '',
        wsiteErr: '',
        wsiteMy: (releaseData.isMycomPublisher && releaseData?.wsite
          ? releaseData.wsite
          : nwReleaseId === 0 && myCompanyData?.wsite
          ? myCompanyData.wsite
          : '') as string,
        wsiteMyErr: '',
        language: defaultPublishLanguageList.find(e => e.id === releaseData?.language) || defaultPublishLanguageList[0],
        publishNow: releaseData?.publishNow ? defaultPublishTypeList[0] : defaultPublishTypeList[1],
        publishDate: moment(releaseData.publishTime).toDate(),
        publishTime: {
          hours: moment(releaseData.publishTime).hour(),
          minutes: moment(releaseData.publishTime).minute(),
        },
        publishTimeErr: '',
        addressNm: (!releaseData.isMycomPublisher && releaseData?.address) || '',
        addressNmErr: '',
        addressNmMy: myCompanyData?.address || '',
        subAddressNm: (!releaseData.isMycomPublisher && releaseData?.addressDetail) || '',
        subAddressNmMy: myCompanyData?.addressDetail || '',
        alarmMobile: releaseData?.alarmMobile || '',
        alarmMobileErr: '',
        alarmEmail: releaseData?.alarmEmail || '',
        alarmEmailErr: '',
        msgToNwire: releaseData?.msgToNwire || '',
        termsApproved: releaseData?.termsApproved === 1,
        termsApprovedErr: '',
        termsApproved2: releaseData?.termsApproved2 === 1,
        termsApproved2Err: '',
        tagList: [],
        scrop: extendedShareScopeList.find(e => e.id === releaseData?.shareCode) || extendedShareScopeList[0],
        // @ts-ignore
        region:
          (!releaseData.isMycomPublisher && regionList.find(item => item.id === releaseData.countryCode)) ||
          defaultRegion,
        regionErr: '',
        // @ts-ignore
        regionMy: regionList.find(e => e.id === myCompanyData?.countryCode) || defaultRegion,
      }
      if (releaseData?.action?.tagList && releaseData?.action?.tagList.length > 0) {
        for await (const tag of releaseData?.action?.tagList) {
          setting.tagList = [
            ...setting.tagList,
            {
              id: tag?.tagId?.toString() || '',
              label: tag.name?.toString() || '',
            },
          ]
        }
      }
      if (releaseData?.action?.fileAttachList && releaseData?.action?.fileAttachList.length > 0) {
        for await (const file of releaseData.action.fileAttachList) {
          const temp = {
            width: file.width,
            height: file.height,
            isImage: file.fileType === 'IMG',
            file: undefined,
            filename: file.name,
            fileSrc: file.path,
            id: file.fileId,
            size: file?.size ? getSize(file?.size, 'kb') : '0',
            mimeType: file.inMediaBox ? 'inMediaBox' : file.mimeType,
            description: file.detail,
          }
          // @ts-ignore
          content.filesList = [...content.filesList, temp]
        }
      }
      return {
        content,
        setting,
      }
    } else {
      return null
    }
  }

  const fromContentsToSetting = async (id: number) => {
    const releaseData = await getReleaseData(id)
    if (releaseData !== null) {
      const param: settingPageDataType = {
        publishComType: releaseData.isMycomPublisher ? defaultPublishComTypeList[0] : defaultPublishComTypeList[1],
        publishCompanyId: releaseData?.publishCompanyId || 0,
        publisher: (!releaseData.isMycomPublisher && releaseData?.publisher) || '',
        publisherErr: '',
        publisherMy: myCompanyData?.name || '',
        publishWhere: releaseData?.publishWhere || '',
        publishWhereErr: '',
        wsite: releaseData.isMycomPublisher ? '' : releaseData?.wsite || '',
        wsiteErr: '',
        wsiteMy: (releaseData.isMycomPublisher && releaseData?.wsite
          ? releaseData.wsite
          : nwReleaseId === 0 && myCompanyData?.wsite
          ? myCompanyData.wsite
          : '') as string,
        wsiteMyErr: '',
        language: defaultPublishLanguageList.find(e => e.id === releaseData?.language) || defaultPublishLanguageList[0],
        publishNow: releaseData?.publishNow ? defaultPublishTypeList[0] : defaultPublishTypeList[1],
        publishDate: moment(releaseData.publishTime).toDate(),
        publishTime: {
          hours: moment(releaseData.publishTime).hour(),
          minutes: moment(releaseData.publishTime).minute(),
        },
        publishTimeErr: '',
        addressNm: (!releaseData.isMycomPublisher && releaseData?.address) || '',
        addressNmErr: '',
        addressNmMy: myCompanyData?.address || '',
        subAddressNm: (!releaseData.isMycomPublisher && releaseData?.addressDetail) || '',
        subAddressNmMy: myCompanyData?.addressDetail || '',
        alarmMobile: releaseData?.alarmMobile || '',
        alarmMobileErr: '',
        alarmEmail: releaseData?.alarmEmail || '',
        alarmEmailErr: '',
        msgToNwire: releaseData?.msgToNwire || '',
        termsApproved: releaseData?.termsApproved === 1,
        termsApprovedErr: '',
        termsApproved2: releaseData?.termsApproved2 === 1,
        termsApproved2Err: '',
        tagList: [],
        scrop: extendedShareScopeList.find(e => e.id === releaseData?.shareCode) || extendedShareScopeList[0],
        // @ts-ignore
        region:
          (!releaseData.isMycomPublisher && regionList.find(item => item.id === releaseData.countryCode)) ||
          defaultRegion,
        regionErr: '',
        // @ts-ignore
        regionMy: regionList.find(e => e.id === myCompanyData?.countryCode) || defaultRegion,
      }
      if (releaseData?.action?.tagList && releaseData?.action?.tagList.length > 0) {
        for await (const tag of releaseData?.action?.tagList) {
          param.tagList = [
            ...param.tagList,
            {
              id: tag?.tagId?.toString() || '',
              label: tag.name?.toString() || '',
            },
          ]
        }
      }
      dispatch(fromContentsToSettingAction({ id, param }))
    }
  }

  const editRelease = async (params: ModifyNewswireReleaseDto, fileList: File[], id: number) => {
    const { status, message, data } = await apiPostNewswireReleaseEdit.mutateAsync({
      request: params,
      fileList: fileList,
      id,
    })
    if (status !== 'S') {
      openToast(message?.message, 'error')
    }
    return status
  }

  const getReleaseData = async (id: number) => {
    let res = null
    const { data, status, message } = await apiGetNewswireReleaseGet({
      id: id,
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      res = data as NewswireReleaseDto
    } else {
      openToast(message?.message, 'error')
    }
    return res
  }

  const setPressReleaseDataToContent = async (id: number) => {
    let res = null
    const { data, status, message } = await apiGetEmailPressReleaseGet({
      id: id,
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      res = data as MailingDto
      let filesList: FileType[] = []
      if (res?.action?.fileAttachList && res?.action?.fileAttachList.length > 0) {
        if (res?.action?.fileAttachList.length > 3) {
          openToast('이미지는 최대 3개만 등록할 수 있습니다.', 'error')
          return
        }
        for await (const file of res.action.fileAttachList) {
          const temp = {
            width: file.width,
            height: file.height,
            isImage: file.fileType === 'IMG',
            file: undefined,
            filename: file.name,
            fileSrc: file.path,
            id: file.fileId,
            size: file?.size ? getSize(file?.size, 'kb') : '0',
            mimeType: file.inMediaBox ? 'inMediaBox' : file.mimeType,
            description: file.detail,
          }
          // @ts-ignore
          filesList = [...filesList, temp]
        }
      }
      setImportPopupAction({ isOpen: false, selectedId: 0 })
      dispatch(
        contentPageDataAction({
          ...contentPageData,
          title: res?.title || '',
          titleErr: '',
          receivedEditorContent: res?.body || '',
          contentError: '',
          filesList,
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }

  const editNewswireReleaseIdAndOut = async (
    contentPage: contentPageDataType,
    settingPage: settingPageDataType,
    editor: string,
    keyValue: number,
    tabType: string
  ) => {
    let fileListParam: File[] = []
    let fileCommentListParam: string[] = []
    let mediaFileIdListParam: number[] = []
    let mediaFileCommentListParam: string[] = []

    contentPage.filesList.forEach(file => {
      if (file.file) {
        //@ts-ignore
        fileListParam.push(file.file)
        fileCommentListParam.push(file.description || '')
      } else {
        mediaFileIdListParam.push(Number(file.id) || 0)
        mediaFileCommentListParam.push(file.description || '')
      }
    })
    let releaseSaveParams: ModifyNewswireReleaseDto = {
      groupId: userSelectGroup,
      shareCode: settingPage?.scrop?.id || shareCodeData.distribute.id,
      title: contentPage?.title || '',
      subtitle: contentPage?.subtitle || '',
      content: editor === null || editor === undefined ? contentPage?.content || '' : editor,
      contactPoint: contentPage?.contactInfo || '',
      youtube: contentPage?.videoSrc || '',
      youtubeComment: contentPage?.videoDesc || '',
      isMycomPublisher: settingPage.publishComType?.id === 'my',
      publishCompanyId: 0,
      publisher: settingPage.publishComType?.id === 'my' ? settingPage?.publisherMy : settingPage?.publisher || '',
      publishWhere: settingPage?.publishWhere || '',
      wsite: settingPage.publishComType?.id === 'my' ? settingPage?.wsiteMy : settingPage?.wsite || '',
      language: settingPage?.language?.id || '',
      publishNow: settingPage.publishNow?.id === 'now',
      year: settingPage?.publishDate?.getUTCFullYear().toString() || '',
      month: (settingPage?.publishDate && (settingPage?.publishDate?.getUTCMonth() + 1).toString()) || '',
      day: settingPage?.publishDate?.getUTCDate().toString() || '',
      hour: settingPage?.publishTime?.hours.toString() || '0',
      min: settingPage?.publishTime?.minutes.toString() || '0',
      timezone: 'Asia/Seoul',
      alarmMobile: settingPage?.alarmMobile || '',
      alarmEmail: settingPage?.alarmEmail || '',
      msgToNwire: settingPage?.msgToNwire || '',
      termsApproved: settingPage?.termsApproved ? 1 : 0,
      termsApproved2: settingPage?.termsApproved2 ? 1 : 0,
      countryCode: settingPage.publishComType?.id === 'my' ? settingPage?.regionMy?.id : settingPage?.region?.id || '',
      zipCode: '',
      address: settingPage.publishComType?.id === 'my' ? settingPage?.addressNmMy : settingPage?.addressNm || '',
      addressDetail:
        settingPage.publishComType?.id === 'my' ? settingPage?.subAddressNmMy : settingPage?.subAddressNm || '',
      tagIdList: settingPage?.tagList.map(e => Number(e.id)),
      mediaFileIdList: mediaFileIdListParam,
      mediaFileCommentList: mediaFileCommentListParam,
      fileCommentList: fileCommentListParam,
      deletedFileIdList: contentPage?.deletedFileIdList,
    }
    return await editRelease(releaseSaveParams, fileListParam, keyValue)
  }

  const createNewswireReleaseIdAndOut = async (props: contentPageDataType, editor: string) => {
    let fileListParam: File[] = []
    let fileCommentListParam: string[] = []
    let mediaFileIdListParam: number[] = []
    let mediaFileCommentListParam: string[] = []

    props.filesList.forEach(file => {
      if (file.file) {
        //@ts-ignore
        fileListParam.push(file.file)
        fileCommentListParam.push(file.description || '')
      } else {
        mediaFileIdListParam.push(Number(file.id) || 0)
        mediaFileCommentListParam.push(file.description || '')
      }
    })

    let releaseSaveParams: CreateNewswireReleaseDto = {
      groupId: userSelectGroup,
      shareCode: settingPageData?.scrop?.id || shareCodeData.distribute.id,
      title: props.title,
      subtitle: props.subtitle,
      content: editor,
      contactPoint: props.contactInfo,
      youtube: props.videoSrc,
      youtubeComment: props.videoDesc,
      isMycomPublisher: true,
      publishCompanyId: 0,
      publisher: '',
      publishWhere: '',
      wsite: '',
      language: '',
      publishNow: true,
      year: '',
      month: '',
      day: '',
      hour: '',
      min: '',
      timezone: 'Asia/Seoul',
      alarmMobile: '',
      alarmEmail: '',
      msgToNwire: '',
      termsApproved: 0,
      termsApproved2: 0,
      countryCode: '',
      zipCode: '',
      address: '',
      addressDetail: '',
      tagIdList: [0],
      mediaFileIdList: mediaFileIdListParam,
      mediaFileCommentList: mediaFileCommentListParam,
      fileCommentList: fileCommentListParam,
    }
    return await createNewswireRelease(releaseSaveParams, fileListParam)
  }

  const lockAction = async (keyValue: number) => {
    const { status, message } = await lockRelease.mutateAsync({
      id: keyValue,
      group: userSelectGroup,
    })
    if (status !== 'S') openToast(message?.message, 'error')
    return status
  }

  const unLockAction = async (keyValue: number) => {
    const { status, message } = await unLockRelease.mutateAsync({
      id: keyValue,
      group: userSelectGroup,
    })
    if (status !== 'S') openToast(message?.message, 'error')
    return status
  }

  const getTextFromEditorContent = (content?: string) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content ?? ''
    tempDiv.querySelectorAll('meta').forEach(meta => meta.remove())
    return tempDiv?.innerHTML.trim() ?? ''
  }

  const handleEditorContentGet = (content: string) => {
    const editorContentText = getTextFromEditorContent(content)
    DOMPurify.addHook('beforeSanitizeElements', node => {
      // @ts-ignorermd
      if (node.tagName === 'A') {
        Array.from(node.childNodes).forEach(child => {
          if (child.nodeType !== Node.TEXT_NODE) {
            const textContent = child.textContent || ''
            const textNode = document.createTextNode(textContent)
            node.replaceChild(textNode, child)
          }
        })
      }
    })
    const sanitizeHtml = DOMPurify.sanitize(editorContentText, {
      ALLOWED_TAGS: ['p', 'strong', 'a', 'br'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
    })
    dispatch(editorDataAction(sanitizeHtml))
  }

  const init = async () => {
    if (router.query.nwReleaseId) {
      const releaseData = await getReleaseData(Number(router.query.nwReleaseId))
      if (releaseData !== null) {
        let contentData: contentPageDataType = {
          title: releaseData.title || '',
          subtitle: releaseData.subtitle || '',
          titleErr: '',
          getEditorContentString: '',
          receivedEditorContent: releaseData?.content || '',
          content: releaseData.content || '',
          contentError: '',
          filesList: [],
          filesErrorList: [],
          deletedFileIdList: [],
          contactInfo: releaseData.contactPoint || '',
          contactInfoError: '',
          videoSrc: releaseData.youtube || '',
          videoSrcError: '',
          videoDesc: releaseData.youtubeExplained || '',
          videoDescError: '',
        }
        if (releaseData?.action?.fileAttachList && releaseData?.action?.fileAttachList.length > 0) {
          for await (const file of releaseData.action.fileAttachList) {
            const temp = {
              width: file.width,
              height: file.height,
              isImage: file.fileType === 'IMG',
              file: undefined,
              filename: file.name,
              fileSrc: file.path,
              id: file.fileId,
              size: file?.size ? getSize(file?.size, 'kb') : '0',
              mimeType: file.inMediaBox ? 'inMediaBox' : file.mimeType,
              description: file.detail,
            }
            // @ts-ignore
            contentData.filesList = [...contentData.filesList, temp]
          }
        }
        dispatch(
          initSettingDataAction({
            param: contentData,
            id: Number(router.query.nwReleaseId),
            editor: releaseData?.content ? releaseData?.content : '',
          })
        )
      }
    } else {
      dispatch(initNewswireRelease(shareCodeData.distribute))
    }
  }

  const uploadFile = async (
    files: FileList,
    items: FileType[],
    fileUnit: string,
    fileSizeLimit: number,
    fileLength: number,
    isPressRelease?: boolean
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
          const temp = await processUpload(totalFileLengthElement, fileUnit, '', isPressRelease)
          temp.code === '' ? (res = [...res, temp.data]) : openToast(temp.code, 'error')
        }
      }
    }

    return res
  }

  const processUpload = (
    file: File,
    fileUnit: string,
    fileType: string,
    isPressRelease?: boolean
  ): Promise<{ code: string; data: FileType }> => {
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
            res.code = '파일만 업로드 가능합니다.'
            resolve(res)
          } else {
            const reader = new FileReader()

            reader.onload = function (event) {
              const image = new Image()

              image.onload = function () {
                width = image.width
                height = image.height
                if (isPressRelease) {
                  if (width < 300 || height < 200) {
                    res.code = '이미지는 가로 300px 세로 200px 이상이어야 합니다.'
                    resolve(res)
                    return
                  } else if (file.size < 0.1 * 1024 * 1024 || file.size > 3 * 1024 * 1024) {
                    res.code = '0.1MB 초과 3MB 이하의 이미지만 업로드 가능합니다.'
                    resolve(res)
                    return
                  }
                }
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
                res.code = '잘못된 이미지 입니다.'
                resolve(res)
                //reject(new Error('Image loading error'))
              }

              //@ts-ignore
              image.src = event.target.result
              fileSrc = event.target?.result as string
            }

            reader.onerror = function () {
              res.code = '파일이 손상되었습니다.'
              resolve(res)
              //reject(new Error('File reading error'))
            }

            reader.readAsDataURL(file)
          }
        } else {
          res.code = '이미지 파일만 업로드 가능합니다.'
          resolve(res)
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

  const sendNwRelease = async (keyValue: number) => {
    const { status, message } = await sendNewswireRelease.mutateAsync({
      id: keyValue,
      info: {
        groupId: userSelectGroup,
      },
    })
    if (status === 'S') {
      openToast(message?.message, 'success')
      dispatch(releasePopupAction(true))
    } else {
      openToast(message?.message, 'error')
    }
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

  const setDeleteInputMediaImagePopupAction = async (i: number) => {
    const { status, message } = await apiDeletePressReleaseMediaPopup.mutateAsync({
      id: i,
    })
    if (status === 'S') {
      await refetchInputMediaPopupListData()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setDeleteMediaImagePopupAction = async (i: number) => {
    const { status, message } = await apiDeletePressReleaseMediaPopup.mutateAsync({
      id: i,
    })
    if (status === 'S') {
      await refetchMediaPopupListData()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const mediaUploadFile = async (
    files: FileList,
    fileUnit: string,
    fileSizeLimit: number,
    fileType: string,
    isPressRelease?: boolean
  ) => {
    let res: FileType[] = []
    for await (const totalFileLengthElement of Array.from(files)) {
      const fileSize = getSize(totalFileLengthElement.size, fileUnit ? fileUnit.toLocaleLowerCase() : 'kb')
      if (fileSizeLimit && fileSize > fileSizeLimit) {
        openToast(messages['ko'].code100, 'error')
      } else {
        const temp = await processUpload(totalFileLengthElement, fileUnit, fileType, isPressRelease)
        temp.code === '' ? (res = [...res, temp.data]) : openToast(temp.code, 'error')
      }
    }

    return res
  }

  const setAddressPopupAction = useCallback((e: boolean) => dispatch(addressPopupAction(e)), [dispatch])

  const setReUrl = useCallback((url: string) => dispatch(setReUrlAction(url)), [dispatch])

  const setAddressAction = useCallback(
    async (e: Address, hooks: settingPageDataType) => {
      const { userSelectedType, address, roadAddress, jibunAddress } = e
      const params = {
        ...hooks,
        addressNm: userSelectedType === 'R' ? roadAddress : userSelectedType === 'J' ? jibunAddress : address,
        addressNmErr: '',
      }
      dispatch(settingPageDataAction(params))
    },
    [dispatch]
  )

  const setAllTermsApprovedAction = useCallback(
    async (e: boolean, hook: settingPageDataType) => {
      const param = {
        ...hook,
        termsApproved: e,
        termsApproved2: e,
        termsApprovedErr: '',
        termsApproved2Err: '',
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.termsApproved]
  )

  const updateLicenseInfo = () => {
    dispatch(setNeedLicenseCheckAction(true))
  }

  const closeReleasePopup = () => {
    dispatch(releasePopupAction(false))
  }

  const setContentPageData = async (id: number) => {
    const releaseData = await getReleaseData(id)
    if (releaseData !== null) {
      let param: contentPageDataType = {
        ...contentPageData,
        getEditorContentString: releaseData?.content || '',
        receivedEditorContent: releaseData?.content || '',
        content: releaseData?.content || '',
      }
      dispatch(contentPageInitAction(param))
    }
  }

  useEffect(() => {
    if (draftListData === undefined) return
    const { status, data, message } = draftListData as BaseResponseCommonObject
    if (status === 'S') {
      const releaseData = data as NewswireReleaseDto[]
      dispatch(draftListAction({ count: releaseData.length, isOpen: releaseData.length > 0 }))
    } else {
      openToast(message?.message, 'error')
    }
  }, [draftListData])

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
    if (!getCommonCode) return
    const { status, data, message } = getCommonCode as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as CommonCode[]
      const list = res.map(e => {
        return { id: e.code, name: e.name }
      })
      dispatch(regionListAction(list))
    } else {
      openToast(message?.message, 'error')
    }
  }, [getCommonCode])

  useEffect(() => {
    if (!myCompanyInfo) return
    const { status, data, message } = myCompanyInfo as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as CompanyDto
      const param = {
        companyId: res.companyId || 0,
        name: res.name || '',
        countryCode: res.countryCode || '',
        zipCode: '',
        address: res.address || '',
        addressDetail: res.detailedAddress || '',
        wsite: res.wsite || '',
      } as publishCompanyInfoType
      dispatch(setMyCompanyInfoAction(param))
    } else {
      openToast(message?.message, 'error')
    }
  }, [myCompanyInfo])

  useEffect(() => {
    if (!newswireReleaseCount) return
    const { status } = newswireReleaseCount as BaseResponseCommonObject
    if (status !== 'S') {
      if (!isDemoLicense) {
        openToast(React.createElement(NewswireErrorMsg), 'warning')
      }
    }
  }, [newswireReleaseCount])

  return {
    userInfo,
    licenseInfo,
    userSelectGroup,
    nwReleaseId,
    isEdit,
    tab,
    settingPageData,
    outMessagePopup,
    reUrl,
    draftList,
    mediaPopup,
    previewPopup,
    importPopup,
    contentPageData,
    editorData,
    releasePopup,
    inputMediaPopup,
    timeZoneData,
    refinedValue,
    isDemoLicense,

    editNewswireReleaseIdAndOut,
    init,
    lockAction,
    unLockAction,
    settingStepValidate,
    createNewswireReleaseIdAndOut,
    fromContentsToSetting,
    fromSettingToConfirm,
    handleEditorContentGet,
    uploadFile,
    mediaUploadFile,
    setDeleteMediaImagePopupAction,
    contentStepValidate,
    setDeleteInputMediaImagePopupAction,
    setPressReleaseDataToContent,
    getReleaseData,
    fromDataToContents,
    addressPopup,
    regionList,

    setSelectedInputMediaPopupAction,
    contentPageDataFilesOnChange,
    contentPageDataTitleOnChange,
    contentPageDataSubtitleOnChange,
    contentPageDataContactInfoOnChange,
    contentPageDataVideoSrcOnChange,
    contentPageDataVideoSrcOnDelete,
    contentPageDataVideoDescOnChange,
    contentPageDataAddMediaFileListOnChange,
    contentPageDataFilesDescOnChange,
    contentPageDataDeleteUserFile,
    tabChangeAction,
    initOutMessagePopup,
    checkMoving,
    initDraftListPopup,
    settingPageDataTagCloseOnChange,
    settingPageDataResetTagListOnChange,
    settingPageDataPublishComTypeOnChange,
    settingPageDataPublishCompanyIdOnChange,
    settingPageDataPublisherOnChange,
    settingPageDataPublisherMyOnChange,
    settingPageDataPublishWhereOnChange,
    settingPageDataWsiteOnChange,
    settingPageDataWsiteMyOnChange,
    settingPageDataLanguageOnChange,
    settingPageDataPublishNowOnChange,
    settingPageDataPublishDateOnChange,
    settingPageDataPublishTimeOnChange,
    settingPageDataRegionOnChange,
    settingPageDataRegionMyOnChange,
    settingPageDataAddressNmOnChange,
    settingPageDataAddressNmMyOnChange,
    settingPageDataSubAddressNmOnChange,
    settingPageDataSubAddressNmMyOnChange,
    settingPageDataAlarmMobileOnChange,
    settingPageDataAlarmEmailOnChange,
    settingPageDataMsgToNwireOnChange,
    settingPageDataTermsApprovedOnChange,
    settingPageDataTermsApproved2OnChange,
    settingPageDataTagListOnChange,
    settingPageDataShareOnChange,
    settingPageDataTagCreateSuccessOnChange,
    settingPageDataTagStatusOnChange,
    settingPageDataCompanyInfoOnChange,
    setPreviewPopupAction,
    setImportPopupAction,
    previewPopupOpen,
    initMediaPopup,
    setMediaPopupSizeAction,
    setMediaFileImagePopupAction,
    setEditorMediaImageCheckPopupAction,
    setEditorMediaFileCheckPopupAction,
    actionMediaPopup,
    initInputMediaPopupPopup,
    setInputMediaFileImagePopupAction,
    setInputMediaPopupSizeAction,
    setInputMediaFileCheckPopupAction,
    setInputMediaImageCheckPopupAction,
    actionInputMediaPopup,
    updateLicenseInfo,
    closeMediaPopup,
    setAddressPopupAction,
    setAddressAction,
    setAllTermsApprovedAction,
    setReUrl,
    closeReleasePopup,
    sendNwRelease,
    setImportPopupSelectedId,
    setContentPageData,
  }
}
