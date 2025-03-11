import { ChangeEvent, MouseEvent, useCallback, useEffect } from 'react'
import _ from 'lodash'
import moment from 'moment/moment'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import {
  defaultTemplateTabs,
  extendedShareScopeList,
} from '~/components/contents/distribution/Release/Press/defaultData'
import { EMAIL_PATTERN, EMAIL_PATTERN_DESCRIPTION } from '~/constants/common'
import { LANDINGPAGE_LINKS } from '~/constants/common/navigationLinks'
import { setNeedLicenseCheckAction, setUserSelectGroupAction } from '~/stores/modules/contents/auth/auth'
import { selectDefaultUserGroupAction } from '~/stores/modules/contents/header/header'
import {
  confirmPageDataAction,
  confirmPageDataType,
  contactInfoPopupAction,
  contactInfoPopupType,
  contentPageDataAction,
  contentPageDataType,
  createInitAction,
  draftListAction,
  editorDataAction,
  editorMediaDataAction,
  emailResultType,
  fromContentsToConfirmAction,
  fromSettingToTemplateAction,
  fromTemplateToContentsAction,
  getTemplateListAction,
  initInputMediaPopupAction,
  initMediaPopupAction,
  initPressRelease,
  initSettingDataAction,
  inputMediaPopupAction,
  inputMediaPopupType,
  isChangeTemplateAction,
  isChangeTemplateType,
  isDeleteTemplateAction,
  isDeleteTemplateType,
  isNoticePopupAction,
  mediaPopupAction,
  mediaPopupItemType,
  mediaPopupType,
  outMessagePopupAction,
  previewPopupAction,
  previewPopupType,
  releasePopupAction,
  setInputMediaListFilesAction,
  setIsAddTemplateAction,
  setReUrlAction,
  settingPageDataAction,
  settingPageDataType,
  setTotalReciversAction,
  tabAction,
  templateChangedDataAction,
  templatePageDataAction,
  templatePageDataType,
  templateRegisterPopupAction,
  templateRegisterPopupType,
  TemplateType,
  testEmailSenderPopupAction,
  testEmailSenderPopupType,
} from '~/stores/modules/contents/pressRelease/pressRelease'
import {
  BaseResponseCommonObject,
  type CreateMailingDto,
  GroupDtoForUser,
  MailingCountDto,
  MailingDto,
  type ModifyMailingDto,
  PageFileAttachDto,
  RequestMailingMailListDto,
  TagDto,
} from '~/types/api/service'
import { SelectListOptionItem, StepItem } from '~/types/common'
import { MbTagSearchTagItem, type ShareItem, type TagSearchCreateLayerItem } from '~/types/contents/Common'
import { useGetEmailPressReleaseDraft } from '~/utils/api/emailPressRelease/useGetEmailPressReleaseDraft'
import { usePostEmailPressReleaseCreate } from '~/utils/api/emailPressRelease/usePostEmailPressReleaseCreate'
import { usePostEmailPressReleaseEdit } from '~/utils/api/emailPressRelease/usePostEmailPressReleaseEdit'
import { apiGetEmailPressReleaseGet } from '~/utils/api/emailPressRelease/usePostEmailPressReleaseGet'
import { usePostEmailPressReleaseGetCount } from '~/utils/api/emailPressRelease/usePostEmailPressReleaseGetCount'
import {
  useDeletePressReleaseMediaPopup,
  useGetPressReleaseMediaPopup,
  usePressReleaseMediaPopup,
  UsePressReleaseMediaPopupParams,
} from '~/utils/api/emailPressRelease/usePressReleaseMediaPopup'
import {
  usePutEmailPressRelease,
  usePutEmailPressReleaseCancel,
} from '~/utils/api/emailPressRelease/usePutEmailPressRelease'
import { useTestEmailPressRelease } from '~/utils/api/emailPressRelease/usePutEmailPressReleaseCancel'
import type { GroupDto } from '~/utils/api/group/useGetGroupSearch'
import { apiPutPressReleaseMediaListUpload } from '~/utils/api/image/apiPostImageUpload'
import { useUnLockRelease } from '~/utils/api/release/draft/useDeleteRelease'
import {
  apiMailtemplateList,
  useMailtemplateListAdd,
  useMailtemplateListDelete,
} from '~/utils/api/release/press/useMailTemplateRelease'
import { usePutContactInfo } from '~/utils/api/setting/contactInfo/usePutContactInfo'
import { useGetContactInfo } from '~/utils/api/setting/contactInfo/userGetContactInfo'
import { usePutUserSelectGroup } from '~/utils/api/user/usePutUserSelectGroup'
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

export const usePressRelese = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const unLockRelease = useUnLockRelease()
  const apiGetTotalEmailCount = usePostEmailPressReleaseGetCount()
  const apiPostEmailPressReleaseCreate = usePostEmailPressReleaseCreate()
  const pressReleaseEdit = usePostEmailPressReleaseEdit()
  const updateContactInfo = usePutContactInfo()
  const apiMailTemplateListDelete = useMailtemplateListDelete()
  const apiMailtemplateListAdd = useMailtemplateListAdd()
  const apiTestEmailPressRelease = useTestEmailPressRelease()
  const apiAddPressReleaseMediaPopup = usePressReleaseMediaPopup()
  const apiDeletePressReleaseMediaPopup = useDeletePressReleaseMediaPopup()
  const sendEmailPressRelease = usePutEmailPressRelease()
  const sendEmailPressReleaseCancel = usePutEmailPressReleaseCancel()
  const updateUserSelectGroup = usePutUserSelectGroup()

  const { isChangedGroup } = useAppSelector(state => state.headerSlice)
  const { pressReleaseData } = useAppSelector(state => state.extraSlice)
  const { userInfo, licenseInfo, isDemoLicense, landingPage, timeZoneData, userSelectGroup, timeZone, shareCodeData } =
    useAppSelector(state => state.authSlice)
  const { refinedValue } = useAppSelector(state => state.userSettingSlice)
  const {
    reUrl,
    isNoticePopup,
    draftList,
    templatePageData,
    outMessagePopup,
    mailingId,
    isEdit,
    tab,
    receiversData,
    settingPageData,
    isDeleteTemplate,
    isChangeTemplate,
    mediaPopup,
    previewPopup,
    templateRegisterPopup,
    contactInfoPopup,
    contentPageData,
    confirmPageData,
    testEmailSenderPopup,
    editorData,
    releasePopup,
    inputMediaPopup,
    isAddTemplate,
  } = useAppSelector(state => state.pressReleaseSlice)

  const { data: draftListData } = useGetEmailPressReleaseDraft(
    {
      category: 'PRESS_RELEASE',
      groupId: userSelectGroup,
    },
    { enabled: router.pathname === '/press-release' }
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
      enabled: router.pathname === '/press-release' && tab.id === 'content',
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
      enabled: router.pathname === '/press-release' && tab.id === 'content',
    }
  )
  const checkMoving = useCallback(() => dispatch(outMessagePopupAction(true)), [outMessagePopup])
  const initOutMessagePopup = useCallback(() => dispatch(outMessagePopupAction(false)), [outMessagePopup])
  const initDraftListPopup = useCallback(() => dispatch(draftListAction({ count: 0, isOpen: false })), [draftList])
  const initNoticePopup = useCallback(async (e: boolean) => dispatch(isNoticePopupAction(e)), [isNoticePopup])
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

  const confirmPageDataTimeAction = useCallback(
    (hours: number, minutes: number, hook: confirmPageDataType) => {
      dispatch(
        confirmPageDataAction({
          ...hook,
          selectedTime: { hours, minutes },
        })
      )
    },
    [confirmPageData.selectedTime]
  )
  const confirmPageDataDateAction = useCallback(
    (date: Date, hook: confirmPageDataType) => {
      dispatch(
        confirmPageDataAction({
          ...hook,
          selectedDate: date,
        })
      )
    },
    [confirmPageData.selectedDate]
  )
  const confirmPageDataMailStateGroupAction = useCallback(
    (e: string, items: confirmPageDataType) => {
      dispatch(
        confirmPageDataAction({
          ...items,
          mailStateGroup: e,
        })
      )
    },
    [confirmPageData.mailStateGroup]
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
      const handleAction = async () => {
        await dispatch(mediaPopupAction(param))
        refetchMediaPopupListData()
      }
      handleAction()
    },
    [mediaPopup.page, mediaPopup.isLoading]
  )
  const iinitTemplatePopupAction = useCallback(
    (prop: templateRegisterPopupType) => {
      dispatch(templateRegisterPopupAction(prop))
    },
    [templateRegisterPopup]
  )
  const initTestEmailSenderPopupAction = useCallback(
    (prop: testEmailSenderPopupType) => {
      dispatch(testEmailSenderPopupAction(prop))
    },
    [testEmailSenderPopup]
  )
  const templatePopupInputChange = useCallback(
    (e: string, prop: templateRegisterPopupType) => {
      const param = {
        ...prop,
        value: e,
        valueErr: '',
      }
      dispatch(templateRegisterPopupAction(param))
    },
    [templateRegisterPopup.value]
  )
  const testEmailSenderPopupInputChange = useCallback(
    (e: string, prop: testEmailSenderPopupType) => {
      const param = {
        ...prop,
        value: e,
        valueErr: '',
      }
      dispatch(testEmailSenderPopupAction(param))
    },
    [testEmailSenderPopup.value]
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
    async (e: any, hook: settingPageDataType) => {
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
  const setPreviewPopupAction = useCallback(
    async (props: previewPopupType) => {
      dispatch(previewPopupAction(props))
    },
    [previewPopup]
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
  const contactInfoOnChange = useCallback(
    async (e: string, props: contactInfoPopupType) => {
      const param = {
        ...props,
        content: e,
        contentErrorMessage: '',
      }
      dispatch(contactInfoPopupAction(param))
    },
    [contactInfoPopup.content]
  )
  const contactInfoTemplateOpen = useCallback(
    async (param: contactInfoPopupType) => {
      dispatch(contactInfoPopupAction(param))
    },
    [contactInfoPopup]
  )
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
  const contentPageDataPhoneCheck = useCallback(
    async (i: boolean, hook: contentPageDataType) => {
      const param = {
        ...hook,
        checkPhone: i,
      }
      dispatch(contentPageDataAction(param))
    },
    [contentPageData.checkPhone]
  )
  const contentPageDataDeleteUserFile = useCallback(
    (e: FileType, list: contentPageDataType) => {
      let deleteList: number[] = [...list.deletedFileIdList]
      if (list.filesList && list.filesList.length > 0) {
        const files = list.filesList.filter(file => file.id !== e.id)
        if (e.file === undefined) deleteList = [...deleteList, Number(e.id)]
        dispatch(
          contentPageDataAction({
            ...list,
            filesList: files,
            deletedFileIdList: deleteList,
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

  const initTemplateChange = useCallback(async () => {
    const param: isChangeTemplateType = {
      isOpen: false,
      key: 0,
      contents: '',
    }
    dispatch(isChangeTemplateAction(param))
  }, [isDeleteTemplate])

  const initTemplateDelete = useCallback(async () => {
    const param: isDeleteTemplateType = {
      isOpen: false,
      key: 0,
    }
    dispatch(isDeleteTemplateAction(param))
  }, [isDeleteTemplate])
  const templatePageDataTemplateDelete = useCallback(
    async (key: number) => {
      const param: isDeleteTemplateType = {
        isOpen: true,
        key,
      }
      dispatch(isDeleteTemplateAction(param))
    },
    [isDeleteTemplate]
  )

  const templatePageDataActiveTabOnChange = useCallback(
    async (i: SelectListOptionItem, hook: templatePageDataType) => {
      const param = {
        ...hook,
        activeTab: i,
      }
      dispatch(templatePageDataAction(param))
    },
    [templatePageData.activeTab]
  )
  const settingPageDataTitleOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        titleForManage: e,
        titleErr: '',
        isEdit: true,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.titleForManage]
  )
  const settingPageDataReceiverGroupOnChange = useCallback(
    async (e: string, hook: settingPageDataType) => {
      const param = {
        ...hook,
        receiverGroup: e,
      }
      dispatch(settingPageDataAction(param))
    },
    [settingPageData.receiverGroup]
  )
  const settingPageDataTagPressListAction = useCallback(
    async (e: MbTagSearchTagItem[], hook: settingPageDataType) => {
      const param = {
        ...hook,
        tagPressList: e,
        recipientErr: '',
        isEdit: true,
      }
      dispatch(settingPageDataAction(param))
      getCalcuratedTotalReceiver(e, hook.targetEmail, hook.isSendToMe).then()
    },
    [settingPageData.tagPressList]
  )
  const settingPageDataAllResetTagPressListAction = useCallback(
    async (hook: settingPageDataType) => {
      const param = {
        ...hook,
        tagPressList: [],
      }
      dispatch(settingPageDataAction(param))
      getCalcuratedTotalReceiver([], hook.targetEmail, hook.isSendToMe).then()
    },
    [settingPageData.tagPressList]
  )
  const settingPageDataResetTagPressListAction = useCallback(
    async (e: MbTagSearchTagItem, hook: settingPageDataType) => {
      const res = hook.tagPressList.filter(item => item.id !== e.id)
      const param = {
        ...hook,
        tagPressList: res,
      }
      dispatch(settingPageDataAction(param))
      getCalcuratedTotalReceiver(res, hook.targetEmail, hook.isSendToMe).then()
    },
    [settingPageData.tagPressList]
  )
  const settingPageDataTargetEmailListAction = useCallback(
    async (hook: settingPageDataType, emailList: MbTagSearchTagItem[]) => {
      const param = {
        ...hook,
        targetEmail: emailList,
        isEdit: true,
      }
      dispatch(settingPageDataAction(param))
      getCalcuratedTotalReceiver(hook.tagPressList, emailList, hook.isSendToMe).then()
    },
    [settingPageData.targetEmail]
  )
  const settingPageDataIsSendToMeOnChange = useCallback(
    async (e: boolean, hook: settingPageDataType) => {
      const param = {
        ...hook,
        isSendToMe: e,
        isEdit: true,
      }
      dispatch(settingPageDataAction(param))
      getCalcuratedTotalReceiver(hook.tagPressList, hook.targetEmail, e).then()
    },
    [settingPageData.isSendToMe]
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

  const settingStepValidate = async (props: settingPageDataType) => {
    let setTitleErr = ''
    let setRecipientErr = ''
    let isProcess = false
    if (!props.titleForManage) {
      setTitleErr = '배포명을 입력하세요'
    }
    if (!props.tagPressList.length && !props.targetEmail.length) {
      setRecipientErr = '받는 사람을 입력하세요'
    }

    if (!setTitleErr && !setRecipientErr) {
      isProcess = true
    }
    // if (props.tagPressList.length > 0) {
    //   if (props.title !== '') {
    //     isProcess = true
    //   } else {
    //     setTitleErr = '배포명을 입력하세요'
    //   }
    // } else {
    //   if (props.targetEmail.length > 0) {
    //     if (props.title !== '') {
    //       isProcess = true
    //     } else {
    //       setTitleErr = '배포명을 입력하세요'
    //     }
    //   } else {
    //     setRecipientErr = '받는 사람을 입력하세요'
    //   }
    // }
    if (!isProcess) {
      dispatch(
        settingPageDataAction({
          ...props,
          titleErr: setTitleErr,
          recipientErr: setRecipientErr,
        })
      )
    }
    return isProcess
  }

  const contentStepValidate = async (props: contentPageDataType, editor: string) => {
    let setTitleErr = ''
    let setContentError = ''
    let isProcess = false
    if (props.title !== '') {
      if (editor !== '') {
        isProcess = true
      } else {
        setContentError = '내용을 입력하세요'
      }
    } else {
      setTitleErr = '제목을 입력하세요'
    }
    if (!isProcess) {
      dispatch(
        contentPageDataAction({
          ...props,
          titleErr: setTitleErr,
          contentError: setContentError,
        })
      )
    }
    return isProcess
  }

  const confirmStepValidate = async () => {}

  const createRelease = async (params: CreateMailingDto) => {
    let res = 0
    const { status, message, data } = await apiPostEmailPressReleaseCreate.mutateAsync({
      request: params,
      fileList: [],
    })
    const result = data as MailingDto
    if (status === 'S' && result?.mailingId) {
      dispatch(createInitAction())
      res = result.mailingId
    } else {
      openToast(message?.message, 'error')
    }
    return res
  }

  const getMailingTemplateList = async () => {
    let res: any = {
      userTemplateList: [],
      originTemplateList: [],
    }
    const { status, data, message } = await apiMailtemplateList()
    if (status === 'S') {
      const list = data as TemplateType[]
      if (list.length > 0) {
        for await (const templateType of list) {
          if (templateType.isDefault) {
            res.originTemplateList = [...res.originTemplateList, templateType]
          } else {
            res.userTemplateList = [...res.userTemplateList, templateType]
          }
        }
      }
    } else {
      openToast(message?.message, 'error')
    }
    return res
  }

  const fromContentsToConfirm = async (id: number) => {
    const releaseData = await getReleaseData(id)
    if (releaseData !== null) {
      const year = new Date(releaseData?.action?.dueAt || 0).getUTCFullYear()
      const reservedDate = year > 9998 ? new Date(Date.now() + 5 * 60 * 1000) : releaseData?.action?.dueAt
      let param: confirmPageDataType = {
        mailStateGroup: releaseData?.sendNow ? 'now' : 'reserved',
        selectedTime: releaseData.action
          ? {
              hours: Number(moment(reservedDate).format('HH')),
              minutes: Number(moment(reservedDate).format('mm')),
            }
          : {
              hours: 0,
              minutes: 0,
            },
        selectedDate: releaseData.action ? (reservedDate ? new Date(reservedDate) : new Date()) : new Date(),
        dateErrorMessage: '',
        jrnstListIdListTarget: [],
        journalistIdListTarget: [],
        mediaListIdListTarget: [],
        mediaIdListTarget: [],
      }
      if (releaseData?.action?.journalistList && releaseData?.action?.journalistList.length > 0) {
        for await (const shareCodeElement of releaseData?.action?.journalistList) {
          param.journalistIdListTarget = [
            ...param.journalistIdListTarget,
            shareCodeElement.name?.toString() + '-' + shareCodeElement.mediaName?.toString() || '',
          ]
        }
      }
      if (releaseData?.action?.mediaList && releaseData?.action?.mediaList.length > 0) {
        for await (const shareCodeElement of releaseData?.action?.mediaList) {
          param.mediaIdListTarget = [...param.mediaIdListTarget, shareCodeElement.name?.toString() || '']
        }
      }
      if (releaseData?.action?.jrnlstListList && releaseData?.action?.jrnlstListList.length > 0) {
        for await (const shareCodeElement of releaseData?.action?.jrnlstListList) {
          param.jrnstListIdListTarget = [...param.jrnstListIdListTarget, shareCodeElement.title?.toString() || '']
        }
      }
      if (releaseData?.action?.mediaListList && releaseData?.action?.mediaListList.length > 0) {
        for await (const shareCodeElement of releaseData?.action?.mediaListList) {
          param.mediaListIdListTarget = [...param.mediaListIdListTarget, shareCodeElement.title?.toString() || '']
        }
      }
      dispatch(fromContentsToConfirmAction({ id, param }))
    }
  }

  const fromTemplateToContents = async (id: number, editor: string) => {
    const releaseData = await getReleaseData(id)
    if (releaseData !== null) {
      let param: contentPageDataType = {
        title: releaseData?.title || `[보도자료] ${releaseData?.titleForManage}`,
        titleErr: '',
        getEditorContentString: editor === null || editor === undefined ? releaseData?.body || '' : editor,
        receivedEditorContent: editor === null || editor === undefined ? releaseData?.body || '' : editor,
        content: editor === null || editor === undefined ? releaseData?.body || '' : editor,
        contentError: '',
        checkPhone: releaseData?.flagAttachContactInfo ? releaseData?.flagAttachContactInfo : true,
        filesList: [],
        deletedFileIdList: [],
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
      dispatch(fromTemplateToContentsAction({ id, param }))
    }
  }

  const fromDataToContents = async (id: number, editor: string) => {
    const releaseData = await getReleaseData(id)
    if (releaseData !== null) {
      let template: templatePageDataType = {
        activeTab:
          releaseData?.isDefaultTemplate == null
            ? defaultTemplateTabs[0]
            : releaseData?.isDefaultTemplate
            ? defaultTemplateTabs[0]
            : defaultTemplateTabs[1],
        mailTemplateId: releaseData?.mailTemplateId ? releaseData?.mailTemplateId : 1,
        userTemplateList: [],
        originTemplateList: [],
      }
      let content: contentPageDataType = {
        title: releaseData?.title || '',
        titleErr: '',
        getEditorContentString: editor === null || editor === undefined ? releaseData?.body || '' : editor,
        receivedEditorContent: editor === null || editor === undefined ? releaseData?.body || '' : editor,
        content: editor === null || editor === undefined ? releaseData?.body || '' : editor,
        contentError: '',
        checkPhone: releaseData?.flagAttachContactInfo ? releaseData?.flagAttachContactInfo : true,
        filesList: [],
        deletedFileIdList: [],
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
          content.filesList = [...content.filesList, temp]
        }
      }
      let confirm: confirmPageDataType = {
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
        dateErrorMessage: '',
        jrnstListIdListTarget: [],
        journalistIdListTarget: [],
        mediaListIdListTarget: [],
        mediaIdListTarget: [],
      }
      if (releaseData?.action?.journalistList && releaseData?.action?.journalistList.length > 0) {
        for await (const shareCodeElement of releaseData?.action?.journalistList) {
          confirm.journalistIdListTarget = [
            ...confirm.journalistIdListTarget,
            shareCodeElement.name?.toString() + '-' + shareCodeElement.mediaName?.toString() || '',
          ]
        }
      }
      if (releaseData?.action?.mediaList && releaseData?.action?.mediaList.length > 0) {
        for await (const shareCodeElement of releaseData?.action?.mediaList) {
          confirm.mediaIdListTarget = [...confirm.mediaIdListTarget, shareCodeElement.name?.toString() || '']
        }
      }
      if (releaseData?.action?.jrnlstListList && releaseData?.action?.jrnlstListList.length > 0) {
        for await (const shareCodeElement of releaseData?.action?.jrnlstListList) {
          confirm.jrnstListIdListTarget = [...confirm.jrnstListIdListTarget, shareCodeElement.title?.toString() || '']
        }
      }
      if (releaseData?.action?.mediaListList && releaseData?.action?.mediaListList.length > 0) {
        for await (const shareCodeElement of releaseData?.action?.mediaListList) {
          confirm.mediaListIdListTarget = [...confirm.mediaListIdListTarget, shareCodeElement.title?.toString() || '']
        }
      }
      return {
        template,
        content,
        confirm,
      }
    } else {
      return null
    }
  }

  const fromSettingToTemplate = async (id: number) => {
    const releaseData = await getReleaseData(id)
    const getList = await getMailingTemplateList()
    if (releaseData !== null) {
      const param: templatePageDataType = {
        activeTab:
          releaseData?.isDefaultTemplate == null
            ? defaultTemplateTabs[0]
            : releaseData?.isDefaultTemplate
            ? defaultTemplateTabs[0]
            : defaultTemplateTabs[1],
        mailTemplateId:
          releaseData?.mailTemplateId === null
            ? getList.originTemplateList[0].mailTemplateId
            : releaseData?.mailTemplateId,
        userTemplateList: getList.userTemplateList,
        originTemplateList: getList.originTemplateList,
      }
      dispatch(fromSettingToTemplateAction({ id, param }))
    }
  }

  const editRelease = async (params: ModifyMailingDto, fileList: File[], id: number) => {
    console.log('ModifyMailingDto', {
      request: params,
      fileList: fileList,
      id,
    })
    const { status, message, data } = await pressReleaseEdit.mutateAsync({
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
    const { data, status, message } = await apiGetEmailPressReleaseGet({
      id: id,
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      res = data as MailingDto
    } else {
      openToast(message?.message, 'error')
    }
    return res
  }

  const editStepMailingIdAndOut = async (
    settingPage: settingPageDataType,
    templatePage: templatePageDataType,
    contentPage: contentPageDataType,
    confirmPage: confirmPageDataType,
    editor: string,
    keyValue: number,
    tabType: string
  ) => {
    let filesListParam: File[] = []
    let mediaFileIdListParam: number[] = []
    if (tabType === 'content') {
      if (contentPage.filesList && contentPage.filesList.length > 0) {
        for await (const newFile of contentPage.filesList) {
          if (newFile.file) {
            filesListParam = [...filesListParam, newFile.file]
          } else if (newFile.id) {
            mediaFileIdListParam = [...mediaFileIdListParam, Number(newFile.id)]
          }
        }
      }
    }
    let releaseSaveParams: ModifyMailingDto = {
      sendNow: confirmPage.mailStateGroup === 'now',
      groupId: userSelectGroup,
      year: confirmPage.mailStateGroup !== 'now' ? moment(confirmPage.selectedDate).format('YYYY') : '9999',
      month: confirmPage.mailStateGroup !== 'now' ? moment(confirmPage.selectedDate).format('MM') : '12',
      day: confirmPage.mailStateGroup !== 'now' ? moment(confirmPage.selectedDate).format('DD') : '31',
      hour: confirmPage.mailStateGroup !== 'now' ? confirmPage.selectedTime.hours.toString() : '23',
      min: confirmPage.mailStateGroup !== 'now' ? confirmPage.selectedTime.minutes.toString() : '59',
      timezone: timeZone,
      isDefaultTemplate: templatePage.activeTab.id === 'sample',
      mailTemplateId: templatePage.mailTemplateId,
      shareCode: settingPage.scrop.id,
      titleForManage: settingPage.titleForManage,
      includeUser: settingPage.isSendToMe,
      title: contentPage.title,
      body: editor,
      flagAttachContactInfo: contentPage.checkPhone,
      journalistIdList: [],
      mediaIdList: [],
      jrnstListIdList: [],
      mediaListIdList: [],
      extraMailList: [],
      tagIdList: [],
      mediaFileIdList: mediaFileIdListParam,
      deletedFileIdList: contentPage.deletedFileIdList,
    }
    for await (const i of settingPage.tagPressList) {
      if (i.className === 'journalistId' && releaseSaveParams?.journalistIdList) {
        releaseSaveParams.journalistIdList.push(Number(i.id))
      } else if (i.className === 'mediaId' && releaseSaveParams?.mediaIdList) {
        releaseSaveParams.mediaIdList.push(Number(i.id))
      } else if (i.className === 'jrnlstListId' && releaseSaveParams?.jrnstListIdList) {
        releaseSaveParams.jrnstListIdList.push(Number(i.id))
      } else if (i.className === 'mediaListId' && releaseSaveParams?.mediaListIdList) {
        releaseSaveParams.mediaListIdList.push(Number(i.id))
      }
    }
    for await (const i of settingPage.targetEmail) {
      releaseSaveParams.extraMailList && releaseSaveParams.extraMailList.push(i.label)
    }
    for await (const i of settingPage.tagList) {
      releaseSaveParams.tagIdList && releaseSaveParams.tagIdList.push(Number(i.id))
    }
    return await editRelease(releaseSaveParams, filesListParam, keyValue)
  }

  const createMailingIdAndOut = async (props: settingPageDataType) => {
    let releaseSaveParams: CreateMailingDto = {
      category: 'PRESS_RELEASE',
      sendNow: false,
      year: '9999',
      month: '12',
      day: '31',
      hour: '23',
      min: '59',
      timezone: timeZone,
      groupId: userSelectGroup,
      shareCode: props.scrop.id,
      titleForManage: props.titleForManage,
      includeUser: props.isSendToMe,
      journalistIdList: [],
      mediaIdList: [],
      jrnstListIdList: [],
      mediaListIdList: [],
      extraMailList: [],
      tagIdList: [],
    }
    for await (const i of props.tagPressList) {
      if (i.className === 'journalistId' && releaseSaveParams?.journalistIdList) {
        releaseSaveParams.journalistIdList.push(Number(i.id))
      } else if (i.className === 'mediaId' && releaseSaveParams?.mediaIdList) {
        releaseSaveParams.mediaIdList.push(Number(i.id))
      } else if (i.className === 'jrnlstListId' && releaseSaveParams?.jrnstListIdList) {
        releaseSaveParams.jrnstListIdList.push(Number(i.id))
      } else if (i.className === 'mediaListId' && releaseSaveParams?.mediaListIdList) {
        releaseSaveParams.mediaListIdList.push(Number(i.id))
      }
    }
    for await (const i of props.targetEmail) {
      releaseSaveParams.extraMailList && releaseSaveParams.extraMailList.push(i.label)
    }
    for await (const i of props.tagList) {
      releaseSaveParams.tagIdList && releaseSaveParams.tagIdList.push(Number(i.id))
    }
    return await createRelease(releaseSaveParams)
  }

  const getCalcuratedTotalReceiver = async (
    itemList: MbTagSearchTagItem[],
    emailList: MbTagSearchTagItem[],
    incloudUser: boolean
  ) => {
    const params: RequestMailingMailListDto = {
      groupId: userSelectGroup,
      includeUser: incloudUser,
      journalistIdList: [],
      mediaIdList: [],
      jrnstListIdList: [],
      mediaListIdList: [],
      extraMailList: [],
    }
    for await (const i of itemList) {
      if (i.className === 'journalistId') {
        params.journalistIdList?.push(Number(i.id))
      } else if (i.className === 'mediaId') {
        params.mediaIdList?.push(Number(i.id))
      } else if (i.className === 'jrnlstListId') {
        params.jrnstListIdList?.push(Number(i.id))
      } else if (i.className === 'mediaListId') {
        params.mediaListIdList?.push(Number(i.id))
      }
    }
    for await (const i of emailList) {
      params.extraMailList?.push(i.label)
    }
    try {
      const { status, data } = await apiGetTotalEmailCount.mutateAsync(params)
      if (status === 'S') {
        const receiverData = data as MailingCountDto
        dispatch(
          setTotalReciversAction({
            receivers: receiverData,
            err: receiverData.totalCount && receiverData.totalCount > 0 ? '' : settingPageData.recipientErr,
          })
        )
      }
    } catch (e) {
      console.log(e)
      openToast('이메일 수신자 계산 통신에 실패했습니다.', 'error')
    }
  }

  const unLockAction = async (keyValue: number) => {
    const { status, message } = await unLockRelease.mutateAsync({
      id: keyValue,
      group: userSelectGroup,
    })
    if (status !== 'S') openToast(message?.message, 'error')
    return status
  }

  const templateDeleteAction = async (props: number) => {
    const { status, message } = await apiMailTemplateListDelete.mutateAsync(props)
    if (status === 'S') {
      const getList = await getMailingTemplateList()
      dispatch(
        getTemplateListAction({
          userTemplateList: getList.userTemplateList,
          originTemplateList: getList.originTemplateList,
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }

  const templatePageDataTemplateOnChange = async (key: number, contents: string, editor: string) => {
    if (editor !== '') {
      const param: isChangeTemplateType = {
        isOpen: true,
        key,
        contents,
      }
      dispatch(isChangeTemplateAction(param))
    } else {
      dispatch(templateChangedDataAction({ key: key, content: contents }))
    }
  }

  const templateChangeAction = async (key: number, contents: string) => {
    dispatch(templateChangedDataAction({ key: key, content: contents }))
  }

  const getTextFromEditorContent = (content?: string) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content ?? ''
    tempDiv.querySelectorAll('meta').forEach(meta => meta.remove())
    return tempDiv?.innerHTML.trim() ?? ''
  }

  const handleEditorContentGet = (content: string) => {
    const editorContentText = getTextFromEditorContent(content)
    dispatch(editorDataAction(editorContentText))
  }

  const init = async () => {
    if (router.query.mailingId) {
      const releaseData = await getReleaseData(Number(router.query.mailingId))
      if (releaseData !== null) {
        const shareCode =
          releaseData.shareCode !== undefined
            ? extendedShareScopeList.find(e => e.id === releaseData.shareCode) || shareCodeData.distribute
            : shareCodeData.distribute
        let settingData: settingPageDataType = {
          titleForManage: releaseData?.titleForManage || '',
          tagPressList: [],
          targetEmail: [],
          tagList: [],
          isSendToMe: releaseData?.includeUser ?? true,
          scrop: shareCode,
          titleErr: '',
          recipientErr: '',
          receiverGroup: 'press',
          owner: releaseData?.owner || {},
        }
        if (releaseData?.extraMails && releaseData?.extraMails.length > 0) {
          for await (const shareCodeElement of releaseData?.extraMails) {
            settingData.targetEmail = [
              ...settingData.targetEmail,
              {
                id: shareCodeElement,
                label: shareCodeElement,
              },
            ]
          }
        }
        if (releaseData?.action?.tagList && releaseData?.action?.tagList.length > 0) {
          for await (const shareCodeElement of releaseData?.action?.tagList) {
            settingData.tagList = [
              ...settingData.tagList,
              {
                id: shareCodeElement?.tagId?.toString() || '',
                label: shareCodeElement.name?.toString() || '',
              },
            ]
          }
        }
        if (releaseData?.action?.journalistList && releaseData?.action?.journalistList.length > 0) {
          for await (const shareCodeElement of releaseData?.action?.journalistList) {
            settingData.tagPressList = [
              ...settingData.tagPressList,
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
            settingData.tagPressList = [
              ...settingData.tagPressList,
              {
                id: shareCodeElement?.mediaId?.toString() || '',
                label: shareCodeElement.name?.toString() || '',
                className: 'mediaId',
              },
            ]
          }
        }
        if (releaseData?.action?.jrnlstListList && releaseData?.action?.jrnlstListList.length > 0) {
          for await (const shareCodeElement of releaseData?.action?.jrnlstListList) {
            const temp = {
              id: shareCodeElement?.jrnlstListId?.toString() || '',
              label:
                shareCodeElement.title?.toString() + ' ' + shareCodeElement.journalistCount?.toString() + '명' || '',
              className: 'jrnlstListId',
            }
            settingData.tagPressList = [...settingData.tagPressList, temp]
          }
        }
        if (releaseData?.action?.mediaListList && releaseData?.action?.mediaListList.length > 0) {
          for await (const shareCodeElement of releaseData?.action?.mediaListList) {
            const temp = {
              id: shareCodeElement?.mediaListId?.toString() || '',
              label: shareCodeElement.title?.toString() + ' ' + shareCodeElement.mediaCount?.toString() + '개' || '',
              className: 'mediaListId',
            }
            settingData.tagPressList = [...settingData.tagPressList, temp]
          }
        }
        dispatch(
          initSettingDataAction({
            param: settingData,
            id: Number(router.query.mailingId),
            editor: releaseData?.body ? releaseData?.body : '',
          })
        )
        getCalcuratedTotalReceiver(settingData.tagPressList, settingData.targetEmail, settingData.isSendToMe).then()
      }
    } else if (router.query.targetList) {
      const list = router.query.targetList
      let param: settingPageDataType = {
        titleForManage: '',
        tagPressList: [],
        targetEmail: [],
        tagList: [],
        isSendToMe: false,
        scrop: shareCodeData.distribute,
        titleErr: '',
        recipientErr: '',
        receiverGroup: 'pressList',
        owner: {},
      }
      if (pressReleaseData.journalistId && pressReleaseData.journalistId.length > 0) {
        for await (const shareCodeElement of pressReleaseData.journalistId) {
          param.receiverGroup = 'press'
          param.tagPressList = [
            ...param.tagPressList,
            {
              id: shareCodeElement?.id?.toString() || '',
              label: shareCodeElement.label?.toString() || '',
              className: 'journalistId',
            },
          ]
        }
      }
      if (pressReleaseData.mediaId && pressReleaseData.mediaId.length > 0) {
        for await (const shareCodeElement of pressReleaseData.mediaId) {
          param.receiverGroup = 'media'
          param.tagPressList = [
            ...param.tagPressList,
            {
              id: shareCodeElement?.id?.toString() || '',
              label: shareCodeElement.label?.toString() || '',
              className: 'mediaId',
            },
          ]
        }
      }
      if (pressReleaseData.jrnlstListId && pressReleaseData.jrnlstListId.length > 0) {
        for await (const shareCodeElement of pressReleaseData.jrnlstListId) {
          param.receiverGroup = 'pressList'
          param.tagPressList = [
            ...param.tagPressList,
            {
              id: shareCodeElement?.id?.toString() || '',
              label: shareCodeElement.label?.toString() || '',
              className: 'jrnlstListId',
            },
          ]
        }
      }
      if (pressReleaseData.mediaListId && pressReleaseData.mediaListId.length > 0) {
        for await (const shareCodeElement of pressReleaseData.mediaListId) {
          param.receiverGroup = 'mediaList'
          param.tagPressList = [
            ...param.tagPressList,
            {
              id: shareCodeElement?.id?.toString() || '',
              label: shareCodeElement.label?.toString() || '',
              className: 'mediaListId',
            },
          ]
        }
      }
      if (pressReleaseData.targetRelease && pressReleaseData.targetRelease.length > 0) {
        for await (const shareCodeElement of pressReleaseData.targetRelease) {
          param.targetEmail = [
            ...param.targetEmail,
            {
              id: shareCodeElement?.id?.toString() || '',
              label: shareCodeElement.label?.toString(),
            },
          ]
        }
      }
      dispatch(initSettingDataAction({ param, id: 0, editor: '' }))
    } else {
      dispatch(initPressRelease(shareCodeData.distribute))
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

  const mailingCancelAction = async (keyValue: number) => {
    const { status, message } = await sendEmailPressReleaseCancel.mutateAsync({
      id: keyValue,
      info: {
        groupId: userSelectGroup,
      },
    })
    if (status === 'S') {
      dispatch(releasePopupAction(false))
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const releaseMailingId = async (keyValue: number) => {
    const { status, message } = await sendEmailPressRelease.mutateAsync({
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

  const getSize = (size: number, unit: string = 'kb') => {
    let calcuratedSize = 0
    if (unit === 'kb') {
      calcuratedSize = size / 1024
    } else if (unit === 'mb') {
      calcuratedSize = size / 1024 / 1024
    }
    return Number(calcuratedSize.toFixed(2))
  }

  const testEmailSenderPopupConfirmAction = async (data: testEmailSenderPopupType) => {
    const validate = EMAIL_PATTERN.test(data.value)
    if (!validate) {
      dispatch(
        testEmailSenderPopupAction({
          ...data,
          valueErr: EMAIL_PATTERN_DESCRIPTION,
        })
      )
    } else {
      const param = {
        id: data.key,
        info: {
          groupId: userSelectGroup,
          toEmail: data.value,
        },
      }
      const { status, message } = await apiTestEmailPressRelease.mutateAsync(param)
      if (status === 'S') {
        openToast(message?.message, 'success')
        dispatch(testEmailSenderPopupAction({ isOpen: false, key: 0, content: '', valueErr: '', value: '' }))
      } else {
        openToast(message?.message, 'error')
      }
    }
  }

  const templatePopupConfirmAction = async (data: templateRegisterPopupType, warningMsg: JSX.Element) => {
    const param = {
      title: data.value,
      content: data.content,
      groupId: userSelectGroup,
      isDefault: false,
    }
    const { status, code, message } = await apiMailtemplateListAdd.mutateAsync(param)
    if (status === 'S') {
      openToast(message?.message, 'success')
      const param = {
        isOpen: false,
        key: 0,
        content: '',
        valueErr: '',
        value: '',
      }
      dispatch(templateRegisterPopupAction(param))
    } else {
      if (code === '00002' && message?.code === 'LIMITED_TEMPLATE_COUNT') {
        openToast(warningMsg, 'warning')
      } else {
        openToast(message?.message, 'error')
      }
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

  const changeGroupAndMove = async (groupParam: GroupDtoForUser) => {
    if (groupParam?.groupId) {
      const { status, message } = await updateUserSelectGroup.mutateAsync({ id: groupParam.groupId as number })
      if (status === 'S') {
        dispatch(setUserSelectGroupAction(groupParam?.groupId))
        dispatch(
          selectDefaultUserGroupAction({
            currentGroup: groupParam as GroupDtoForUser,
            groupBar: status !== 'S',
            isLoading: false,
          })
        )
      } else {
        openToast(message?.message, 'error')
      }
    }
    return true
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

  const setReUrl = useCallback((url: string) => dispatch(setReUrlAction(url)), [dispatch])

  const setIsAddTemplate = async (isAddTemplateParam: boolean) => {
    dispatch(setIsAddTemplateAction(isAddTemplateParam))
  }

  const contentPageDataContactInfoInsert = useCallback(
    async (contactInfo: string, contents: string, hook: contentPageDataType) => {
      let editorContentText = contents
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
      const param = {
        ...hook,
        content: editorContentText,
        receivedEditorContent: editorContentText,
      }
      dispatch(contentPageDataAction(param))
      dispatch(editorDataAction(editorContentText))
    },
    [contentPageData.receivedEditorContent]
  )

  const updateLicenseInfo = () => {
    dispatch(setNeedLicenseCheckAction(true))
  }

  const setContentPageData = async (id: number) => {
    const releaseData = await getReleaseData(id)
    if (releaseData !== null) {
      let param: contentPageDataType = {
        title: releaseData?.title || '',
        titleErr: '',
        getEditorContentString: releaseData?.body || '',
        receivedEditorContent: releaseData?.body || '',
        content: releaseData?.body || '',
        contentError: '',
        checkPhone: releaseData?.flagAttachContactInfo ? releaseData?.flagAttachContactInfo : true,
        filesList: [],
        deletedFileIdList: [],
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
      dispatch(fromTemplateToContentsAction({ id, param }))
    }
  }

  useEffect(() => {
    if (draftListData === undefined) return
    const { status, data, message } = draftListData as BaseResponseCommonObject
    if (status === 'S') {
      const releaseData = data as MailingDto[]
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

  return {
    userInfo,
    licenseInfo,
    userSelectGroup,
    mailingId,
    isEdit,
    tab,
    receiversData,
    settingPageData,
    outMessagePopup,
    reUrl,
    draftList,
    isNoticePopup,
    templatePageData,
    isDeleteTemplate,
    isChangeTemplate,
    mediaPopup,
    previewPopup,
    templateRegisterPopup,
    contactInfoPopup,
    contentPageData,
    editorData,
    confirmPageData,
    testEmailSenderPopup,
    releasePopup,
    inputMediaPopup,
    timeZoneData,
    isAddTemplate,
    refinedValue,
    isChangedGroup,
    isDemoLicense,

    editStepMailingIdAndOut,
    checkReservedEmailCount,
    init,
    unLockAction,
    settingStepValidate,
    createMailingIdAndOut,
    fromSettingToTemplate,
    templateDeleteAction,
    templateChangeAction,
    fromTemplateToContents,
    handleEditorContentGet,
    uploadFile,
    templatePopupConfirmAction,
    mediaUploadFile,
    setDeleteMediaImagePopupAction,
    fromContentsToConfirm,
    contentStepValidate,
    releaseMailingId,
    testEmailSenderPopupConfirmAction,
    templatePageDataTemplateOnChange,
    mailingCancelAction,
    setDeleteInputMediaImagePopupAction,
    getReleaseData,
    fromDataToContents,
    changeGroupAndMove,

    setSelectedInputMediaPopupAction,
    testEmailSenderPopupInputChange,
    contentPageDataFilesOnChange,
    contentPageDataTitleOnChange,
    contentPageDataDeleteUserFile,
    contentPageDataPhoneCheck,
    contactInfoTemplateOpen,
    tabChangeAction,
    initTemplateChange,
    initTemplateDelete,
    templatePageDataTemplateDelete,
    templatePageDataActiveTabOnChange,
    initNoticePopup,
    initOutMessagePopup,
    checkMoving,
    initDraftListPopup,
    settingPageDataTitleOnChange,
    settingPageDataResetTagListOnChange,
    settingPageDataTagCloseOnChange,
    settingPageDataTagStatusOnChange,
    settingPageDataShareOnChange,
    settingPageDataIsSendToMeOnChange,
    settingPageDataTargetEmailListAction,
    settingPageDataAllResetTagPressListAction,
    settingPageDataResetTagPressListAction,
    settingPageDataTagPressListAction,
    settingPageDataReceiverGroupOnChange,
    settingPageDataTagCreateSuccessOnChange,
    contactInfoOnChange,
    updateContactInfoAction,
    setPreviewPopupAction,
    previewPopupOpen,
    templatePopupInputChange,
    iinitTemplatePopupAction,
    initMediaPopup,
    setMediaPopupSizeAction,
    setMediaFileImagePopupAction,
    setEditorMediaImageCheckPopupAction,
    setEditorMediaFileCheckPopupAction,
    actionMediaPopup,
    confirmPageDataMailStateGroupAction,
    confirmPageDataDateAction,
    confirmPageDataTimeAction,
    initTestEmailSenderPopupAction,
    initInputMediaPopupPopup,
    setInputMediaFileImagePopupAction,
    setInputMediaPopupSizeAction,
    setInputMediaFileCheckPopupAction,
    setInputMediaImageCheckPopupAction,
    actionInputMediaPopup,
    setIsAddTemplate,
    contentPageDataContactInfoInsert,
    updateLicenseInfo,
    closeMediaPopup,
    setContentPageData,
    setReUrl,
  }
}
