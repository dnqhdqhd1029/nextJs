import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { extendedShareScopeList } from '~/components/contents/distribution/Release/Press/defaultData'
import { MailingCountDto, UserDtoForGroup } from '~/types/api/service'
import { type SelectListOptionItem, StepItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'

export type mediaPopupItemType = {
  id: number
  path: string
  width?: number
  height?: number
}

export interface FileType {
  fileSrc?: string
  isImage?: boolean
  id?: string
  width?: number
  height?: number
  file?: File
  size?: number
  errorCode?: number
  message?: string
  mimeType?: string
  fieldname?: string
  originalname?: string
  encoding?: string
  mimetype?: string
  destination?: string
  filename?: string
  path?: string
  description?: string
}

export type TemplateType = {
  mailTemplateId: number
  title: string
  content: string
  groupId: number
  isDefault: boolean
  regisBy: number
  regisAt: Date
}

export type emailResultType = {
  resultCode: string
  resultCount: number
}

export type settingPageDataType = {
  titleForManage: string
  tagPressList: MbTagSearchTagItem[]
  targetEmail: MbTagSearchTagItem[]
  isSendToMe: boolean
  scrop: SelectListOptionItem
  tagList: MbTagSearchTagItem[]
  titleErr: string
  recipientErr: string
  receiverGroup: string
  owner: UserDtoForGroup
  isEdit?: boolean
}

export type templatePageDataType = {
  activeTab: SelectListOptionItem
  mailTemplateId: number
  userTemplateList: TemplateType[]
  originTemplateList: TemplateType[]
}

export type isChangeTemplateType = {
  isOpen: boolean
  key: number
  contents: string
}

export type previewPopupType = {
  isOpen: boolean
  type: string
  data: any
  receiver: string
}

export type contactInfoPopupType = {
  isOpen: boolean
  type: string
  data: string
  content: string
  contentErrorMessage: string
}

export type inputMediaPopupType = {
  isOpen: boolean
  type: string
  confirmText: string
  contents: string
  title: string
  data: any
  radioSelected: string
  page: number
  size: number
  totalCount: number
  totalPageCount: number
  sort: string[]
  filesList: FileType[]
  imageList: FileType[]
  filesItems: mediaPopupItemType[]
  imageItems: mediaPopupItemType[]
  releaseFilesItems: FileType[]
  releaseImageItems: FileType[]
  isLoading: boolean
}

export type mediaPopupType = {
  isOpen: boolean
  type: string
  confirmText: string
  contents: string
  title: string
  data: any
  radioSelected: string
  page: number
  size: number
  totalCount: number
  totalPageCount: number
  sort: string[]
  filesList: FileType[]
  imageList: FileType[]
  filesItems: mediaPopupItemType[]
  imageItems: mediaPopupItemType[]
  releaseFilesItems: FileType[]
  releaseImageItems: FileType[]
  isLoading: boolean
}

export type isDeleteTemplateType = {
  isOpen: boolean
  key: number
}

export type testEmailSenderPopupType = {
  isOpen: boolean
  key: number
  content: string
  valueErr: string
  value: string
}
export type templateRegisterPopupType = {
  isOpen: boolean
  key: number
  content: string
  valueErr: string
  value: string
}

export type contentPageDataType = {
  title: string
  titleErr: string
  getEditorContentString: string
  receivedEditorContent: string
  content: string
  contentError: string
  checkPhone: boolean
  filesList: FileType[]
  deletedFileIdList: number[]
}

export type confirmPageDataType = {
  mailStateGroup: string
  selectedTime: { hours: number; minutes: number }
  selectedDate: Date
  dateErrorMessage: string
  jrnstListIdListTarget: string[]
  journalistIdListTarget: string[]
  mediaListIdListTarget: string[]
  mediaIdListTarget: string[]
}

export interface Props {
  mailingId: number
  isEdit: boolean
  tab: StepItem
  receiversData: MailingCountDto
  confirmPageData: confirmPageDataType
  contentPageData: contentPageDataType
  settingPageData: settingPageDataType
  outMessagePopup: boolean
  reUrl: string
  draftList: {
    count: number
    isOpen: boolean
  }
  isNoticePopup: boolean
  templatePageData: templatePageDataType
  isDeleteTemplate: isDeleteTemplateType
  isChangeTemplate: isChangeTemplateType
  contactInfoPopup: contactInfoPopupType
  templateRegisterPopup: templateRegisterPopupType
  testEmailSenderPopup: testEmailSenderPopupType
  previewPopup: previewPopupType
  mediaPopup: mediaPopupType
  inputMediaPopup: inputMediaPopupType
  editorData: string
  releasePopup: boolean
  isAddTemplate: boolean
}

// 초기값
export const initialState: Props = {
  mailingId: 0,
  releasePopup: false,
  isEdit: false,
  reUrl: '',
  tab: {
    id: 'setting',
    title: '설정',
  },
  draftList: {
    count: 0,
    isOpen: false,
  },
  receiversData: {
    totalCount: 0,
    dupCount: 0,
    blockReceiveCount: 0,
    blockSendCount: 0,
    errorSendCount: 0,
  },
  confirmPageData: {
    mailStateGroup: 'now',
    selectedTime: { hours: 0, minutes: 0 },
    selectedDate: new Date(),
    dateErrorMessage: '',
    jrnstListIdListTarget: [],
    journalistIdListTarget: [],
    mediaListIdListTarget: [],
    mediaIdListTarget: [],
  },
  contentPageData: {
    title: '',
    titleErr: '',
    getEditorContentString: '',
    receivedEditorContent: '',
    content: '',
    contentError: '',
    checkPhone: true,
    filesList: [],
    deletedFileIdList: [],
  },
  settingPageData: {
    titleForManage: '',
    tagPressList: [],
    targetEmail: [],
    tagList: [],
    isSendToMe: true,
    scrop: extendedShareScopeList[0],
    titleErr: '',
    recipientErr: '',
    receiverGroup: 'pressList',
    owner: {},
    isEdit: false,
  },
  templatePageData: {
    activeTab: { name: '샘플', id: 'sample' },
    mailTemplateId: 0,
    userTemplateList: [],
    originTemplateList: [],
  },
  outMessagePopup: false,
  isNoticePopup: false,
  isDeleteTemplate: {
    isOpen: false,
    key: 0,
  },
  isChangeTemplate: {
    isOpen: false,
    key: 0,
    contents: '',
  },
  contactInfoPopup: {
    isOpen: false,
    type: '',
    data: '',
    content: '',
    contentErrorMessage: '',
  },
  templateRegisterPopup: {
    isOpen: false,
    key: 0,
    content: '',
    valueErr: '',
    value: '',
  },
  testEmailSenderPopup: {
    isOpen: false,
    key: 0,
    content: '',
    valueErr: '',
    value: '',
  },
  previewPopup: {
    isOpen: false,
    type: '',
    data: '',
    receiver: '',
  },
  mediaPopup: {
    isOpen: false,
    type: '',
    confirmText: '',
    contents: '',
    title: '',
    data: '',
    radioSelected: 'IMG',
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
    isLoading: false,
  },
  inputMediaPopup: {
    isOpen: false,
    type: '',
    confirmText: '',
    contents: '',
    title: '',
    data: '',
    radioSelected: 'IMG',
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
    isLoading: false,
  },
  editorData: '',
  isAddTemplate: false,
}

const pressReleaseSlice = createSlice({
  name: 'pressReleaseSlice',
  initialState,
  reducers: {
    getTemplateListAction: (
      state,
      action: PayloadAction<{ originTemplateList: TemplateType[]; userTemplateList: TemplateType[] }>
    ) => {
      state.templatePageData.originTemplateList = action.payload.originTemplateList
      state.templatePageData.userTemplateList = action.payload.userTemplateList
      state.isDeleteTemplate = {
        isOpen: false,
        key: 0,
      }
      state.isChangeTemplate = {
        isOpen: false,
        key: 0,
        contents: '',
      }
    },
    editorMediaDataAction: (
      state,
      action: PayloadAction<{
        text: string
        contentPageDataProps: contentPageDataType
      }>
    ) => {
      state.mediaPopup = {
        isOpen: false,
        type: '',
        confirmText: '',
        contents: '',
        title: '',
        data: '',
        radioSelected: 'IMG',
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
        isLoading: false,
      }
      state.isEdit = true
      state.contentPageData = action.payload.contentPageDataProps
      state.editorData = action.payload.text
    },
    setInputMediaListFilesAction: (state, action: PayloadAction<FileType[]>) => {
      state.isEdit = true
      state.contentPageData.filesList = action.payload
      state.inputMediaPopup = {
        isOpen: false,
        type: '',
        confirmText: '',
        contents: '',
        title: '',
        data: '',
        radioSelected: 'IMG',
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
        isLoading: false,
      }
    },
    mediaPopupAction: (state, action: PayloadAction<mediaPopupType>) => {
      state.mediaPopup = action.payload
    },
    inputMediaPopupAction: (state, action: PayloadAction<inputMediaPopupType>) => {
      state.inputMediaPopup = action.payload
    },
    isDeleteTemplateAction: (state, action: PayloadAction<isDeleteTemplateType>) => {
      state.isDeleteTemplate = action.payload
    },
    templateRegisterPopupAction: (state, action: PayloadAction<templateRegisterPopupType>) => {
      state.templateRegisterPopup = action.payload
    },
    testEmailSenderPopupAction: (state, action: PayloadAction<testEmailSenderPopupType>) => {
      state.testEmailSenderPopup = action.payload
    },
    contactInfoPopupAction: (state, action: PayloadAction<contactInfoPopupType>) => {
      state.contactInfoPopup = action.payload
    },
    previewPopupAction: (state, action: PayloadAction<previewPopupType>) => {
      state.previewPopup = action.payload
    },
    isChangeTemplateAction: (state, action: PayloadAction<isChangeTemplateType>) => {
      state.isChangeTemplate = action.payload
    },
    confirmPageDataAction: (state, action: PayloadAction<confirmPageDataType>) => {
      state.isEdit = false
      state.confirmPageData = action.payload
    },
    releasePopupAction: (state, action: PayloadAction<boolean>) => {
      state.isEdit = false
      state.releasePopup = action.payload
    },
    initSettingDataAction: (
      state,
      action: PayloadAction<{ param: settingPageDataType; editor: string; id: number }>
    ) => {
      state.isEdit = false
      state.mailingId = action.payload.id
      state.releasePopup = false
      state.reUrl = ''
      state.tab = {
        id: 'setting',
        title: '설정',
      }
      state.draftList = {
        count: 0,
        isOpen: false,
      }
      state.receiversData = {
        totalCount: 0,
        dupCount: 0,
        blockReceiveCount: 0,
        blockSendCount: 0,
        errorSendCount: 0,
      }
      state.settingPageData = action.payload.param
      state.confirmPageData = {
        mailStateGroup: 'now',
        selectedTime: { hours: 0, minutes: 0 },
        selectedDate: new Date(),
        dateErrorMessage: '',
        jrnstListIdListTarget: [],
        journalistIdListTarget: [],
        mediaListIdListTarget: [],
        mediaIdListTarget: [],
      }
      state.contentPageData = {
        title: '',
        titleErr: '',
        getEditorContentString: '',
        receivedEditorContent: '',
        content: '',
        contentError: '',
        checkPhone: true,
        filesList: [],
        deletedFileIdList: [],
      }
      state.templatePageData = {
        activeTab: { name: '샘플', id: 'sample' },
        mailTemplateId: 0,
        userTemplateList: [],
        originTemplateList: [],
      }
      state.outMessagePopup = false
      state.isNoticePopup = false
      state.isDeleteTemplate = {
        isOpen: false,
        key: 0,
      }
      state.isChangeTemplate = {
        isOpen: false,
        key: 0,
        contents: '',
      }
      state.contactInfoPopup = {
        isOpen: false,
        type: '',
        data: '',
        content: '',
        contentErrorMessage: '',
      }
      state.templateRegisterPopup = {
        isOpen: false,
        key: 0,
        content: '',
        valueErr: '',
        value: '',
      }
      state.testEmailSenderPopup = {
        isOpen: false,
        key: 0,
        content: '',
        valueErr: '',
        value: '',
      }
      state.previewPopup = {
        isOpen: false,
        type: '',
        data: '',
        receiver: '',
      }
      state.mediaPopup = {
        isOpen: false,
        type: '',
        confirmText: '',
        contents: '',
        title: '',
        data: '',
        radioSelected: 'IMG',
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
        isLoading: false,
      }
      state.inputMediaPopup = {
        isOpen: false,
        type: '',
        confirmText: '',
        contents: '',
        title: '',
        data: '',
        radioSelected: 'IMG',
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
        isLoading: false,
      }
      state.editorData = action.payload.editor
    },
    fromContentsToConfirmAction: (state, action: PayloadAction<{ id: number; param: confirmPageDataType }>) => {
      state.isEdit = false
      state.isNoticePopup = false
      state.mailingId = action.payload.id
      state.confirmPageData = action.payload.param
      state.tab = {
        id: 'confitm',
        title: '확인',
      }
      state.isDeleteTemplate = {
        isOpen: false,
        key: 0,
      }
      state.isChangeTemplate = {
        isOpen: false,
        key: 0,
        contents: '',
      }
      state.contactInfoPopup = {
        isOpen: false,
        type: '',
        data: '',
        content: '',
        contentErrorMessage: '',
      }
      state.releasePopup = false
      state.templateRegisterPopup = {
        isOpen: false,
        key: 0,
        content: '',
        valueErr: '',
        value: '',
      }
      state.previewPopup = {
        isOpen: false,
        type: '',
        data: '',
        receiver: '',
      }
      state.inputMediaPopup = {
        isOpen: false,
        type: '',
        confirmText: '',
        contents: '',
        title: '',
        data: '',
        radioSelected: 'IMG',
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
        isLoading: false,
      }
      state.mediaPopup = {
        isOpen: false,
        type: '',
        confirmText: '',
        contents: '',
        title: '',
        data: '',
        radioSelected: 'IMG',
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
        isLoading: false,
      }
      state.testEmailSenderPopup = {
        isOpen: false,
        key: 0,
        content: '',
        valueErr: '',
        value: '',
      }
      //todo
    },
    fromSettingToTemplateAction: (state, action: PayloadAction<{ id: number; param: templatePageDataType }>) => {
      state.isEdit = false
      state.isNoticePopup = false
      state.mailingId = action.payload.id
      state.templatePageData = action.payload.param
      state.tab = {
        id: 'template',
        title: '템플릿',
      }
      state.isDeleteTemplate = {
        isOpen: false,
        key: 0,
      }
      state.isChangeTemplate = {
        isOpen: false,
        key: 0,
        contents: '',
      }
      state.contactInfoPopup = {
        isOpen: false,
        type: '',
        data: '',
        content: '',
        contentErrorMessage: '',
      }
      state.releasePopup = false
      state.templateRegisterPopup = {
        isOpen: false,
        key: 0,
        content: '',
        valueErr: '',
        value: '',
      }
      state.previewPopup = {
        isOpen: false,
        type: '',
        data: '',
        receiver: '',
      }
      state.inputMediaPopup = {
        isOpen: false,
        type: '',
        confirmText: '',
        contents: '',
        title: '',
        data: '',
        radioSelected: 'IMG',
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
        isLoading: false,
      }
      state.mediaPopup = {
        isOpen: false,
        type: '',
        confirmText: '',
        contents: '',
        title: '',
        data: '',
        radioSelected: 'IMG',
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
        isLoading: false,
      }
      state.testEmailSenderPopup = {
        isOpen: false,
        key: 0,
        content: '',
        valueErr: '',
        value: '',
      }
      //todo
    },
    fromTemplateToContentsAction: (state, action: PayloadAction<{ id: number; param: contentPageDataType }>) => {
      state.isEdit = false
      state.isNoticePopup = false
      state.isAddTemplate = false
      state.mailingId = action.payload.id
      state.contentPageData = action.payload.param
      state.editorData = action.payload.param.content
      state.tab = {
        id: 'content',
        title: '내용',
      }
      state.isDeleteTemplate = {
        isOpen: false,
        key: 0,
      }
      state.isChangeTemplate = {
        isOpen: false,
        key: 0,
        contents: '',
      }
      state.contactInfoPopup = {
        isOpen: false,
        type: '',
        data: '',
        content: '',
        contentErrorMessage: '',
      }
      state.releasePopup = false
      state.templateRegisterPopup = {
        isOpen: false,
        key: 0,
        content: '',
        valueErr: '',
        value: '',
      }
      state.previewPopup = {
        isOpen: false,
        type: '',
        data: '',
        receiver: '',
      }
      state.inputMediaPopup = {
        isOpen: false,
        type: '',
        confirmText: '',
        contents: '',
        title: '',
        data: '',
        radioSelected: 'IMG',
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
        isLoading: false,
      }
      state.mediaPopup = {
        isOpen: false,
        type: '',
        confirmText: '',
        contents: '',
        title: '',
        data: '',
        radioSelected: 'IMG',
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
        isLoading: false,
      }
      state.testEmailSenderPopup = {
        isOpen: false,
        key: 0,
        content: '',
        valueErr: '',
        value: '',
      }
      //todo
    },
    createInitAction: state => {
      state.isEdit = false
      state.isNoticePopup = false
      state.isDeleteTemplate = {
        isOpen: false,
        key: 0,
      }
      state.isChangeTemplate = {
        isOpen: false,
        key: 0,
        contents: '',
      }
      state.contactInfoPopup = {
        isOpen: false,
        type: '',
        data: '',
        content: '',
        contentErrorMessage: '',
      }
      state.releasePopup = false
      state.templateRegisterPopup = {
        isOpen: false,
        key: 0,
        content: '',
        valueErr: '',
        value: '',
      }
      state.previewPopup = {
        isOpen: false,
        type: '',
        data: '',
        receiver: '',
      }
      state.inputMediaPopup = {
        isOpen: false,
        type: '',
        confirmText: '',
        contents: '',
        title: '',
        data: '',
        radioSelected: 'IMG',
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
        isLoading: false,
      }
      state.mediaPopup = {
        isOpen: false,
        type: '',
        confirmText: '',
        contents: '',
        title: '',
        data: '',
        radioSelected: 'IMG',
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
        isLoading: false,
      }
      state.testEmailSenderPopup = {
        isOpen: false,
        key: 0,
        content: '',
        valueErr: '',
        value: '',
      }
      //todo
    },
    draftListAction: (state, action: PayloadAction<{ count: number; isOpen: boolean }>) => {
      state.draftList = action.payload
    },
    isNoticePopupAction: (state, action: PayloadAction<boolean>) => {
      state.isNoticePopup = action.payload
    },
    tabAction: (state, action: PayloadAction<StepItem>) => {
      state.tab = action.payload
    },
    outMessagePopupAction: (state, action: PayloadAction<boolean>) => {
      state.outMessagePopup = action.payload
    },
    mailingIdAction: (state, action: PayloadAction<number>) => {
      state.mailingId = action.payload
    },
    templatePageDataAction: (state, action: PayloadAction<templatePageDataType>) => {
      state.isEdit = true
      state.templatePageData = action.payload
    },
    settingPageDataAction: (state, action: PayloadAction<settingPageDataType>) => {
      state.isEdit = true
      state.settingPageData = action.payload
    },
    contentPageDataAction: (state, action: PayloadAction<contentPageDataType>) => {
      state.isEdit = true
      state.contentPageData = action.payload
    },
    setReUrlAction: (state, action: PayloadAction<string>) => {
      state.reUrl = action.payload
    },
    setTotalReciversAction: (state, action: PayloadAction<{ receivers: MailingCountDto; err: string }>) => {
      state.receiversData = action.payload.receivers
      state.settingPageData.recipientErr = action.payload.err
    },
    editorDataAction: (state, action: PayloadAction<string>) => {
      state.isEdit = true
      state.editorData = action.payload
    },
    templateChangedDataAction: (state, action: PayloadAction<{ key: number; content: string }>) => {
      state.isEdit = true
      state.templatePageData.mailTemplateId = action.payload.key
      state.contentPageData.content = action.payload.content
      state.contentPageData.getEditorContentString = action.payload.content
      state.contentPageData.receivedEditorContent = action.payload.content
      state.editorData = action.payload.content
      state.isChangeTemplate = {
        isOpen: false,
        key: 0,
        contents: '',
      }
    },
    initMediaPopupAction: (state, action: PayloadAction<boolean>) => {
      state.mediaPopup = {
        isOpen: action.payload,
        type: 'media',
        confirmText: '확인',
        contents: '',
        title: '미디어 자료실',
        data: 'media',
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
    },
    initInputMediaPopupAction: (state, action: PayloadAction<boolean>) => {
      state.inputMediaPopup = {
        isOpen: action.payload,
        type: 'media',
        confirmText: '확인',
        contents: '',
        title: '미디어 자료실',
        data: 'media',
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
    },
    initPressRelease: (state, action: PayloadAction<SelectListOptionItem>) => {
      state.mailingId = 0
      state.releasePopup = false
      state.isEdit = false
      state.reUrl = ''
      state.tab = {
        id: 'setting',
        title: '설정',
      }
      state.draftList = {
        count: 0,
        isOpen: false,
      }
      state.receiversData = {
        totalCount: 0,
        dupCount: 0,
        blockReceiveCount: 0,
        blockSendCount: 0,
        errorSendCount: 0,
      }
      state.confirmPageData = {
        mailStateGroup: 'now',
        selectedTime: { hours: 0, minutes: 0 },
        selectedDate: new Date(),
        dateErrorMessage: '',
        jrnstListIdListTarget: [],
        journalistIdListTarget: [],
        mediaListIdListTarget: [],
        mediaIdListTarget: [],
      }
      state.contentPageData = {
        title: '',
        titleErr: '',
        getEditorContentString: '',
        receivedEditorContent: '',
        content: '',
        contentError: '',
        checkPhone: true,
        filesList: [],
        deletedFileIdList: [],
      }
      state.settingPageData = {
        titleForManage: '',
        tagPressList: [],
        targetEmail: [],
        tagList: [],
        isSendToMe: true,
        scrop: action.payload,
        titleErr: '',
        recipientErr: '',
        receiverGroup: 'pressList',
        owner: {},
      }
      state.templatePageData = {
        activeTab: { name: '샘플', id: 'sample' },
        mailTemplateId: 0,
        userTemplateList: [],
        originTemplateList: [],
      }
      state.outMessagePopup = false
      state.isNoticePopup = false
      state.isDeleteTemplate = {
        isOpen: false,
        key: 0,
      }
      state.isChangeTemplate = {
        isOpen: false,
        key: 0,
        contents: '',
      }
      state.contactInfoPopup = {
        isOpen: false,
        type: '',
        data: '',
        content: '',
        contentErrorMessage: '',
      }
      state.templateRegisterPopup = {
        isOpen: false,
        key: 0,
        content: '',
        valueErr: '',
        value: '',
      }
      state.testEmailSenderPopup = {
        isOpen: false,
        key: 0,
        content: '',
        valueErr: '',
        value: '',
      }
      state.previewPopup = {
        isOpen: false,
        type: '',
        data: '',
        receiver: '',
      }
      state.mediaPopup = {
        isOpen: false,
        type: '',
        confirmText: '',
        contents: '',
        title: '',
        data: '',
        radioSelected: 'IMG',
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
        isLoading: false,
      }
      state.inputMediaPopup = {
        isOpen: false,
        type: '',
        confirmText: '',
        contents: '',
        title: '',
        data: '',
        radioSelected: 'IMG',
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
        isLoading: false,
      }
      state.editorData = ''
    },
    setIsAddTemplateAction: (state, action: PayloadAction<boolean>) => {
      state.isAddTemplate = action.payload
    },
  },
})
export const {
  testEmailSenderPopupAction,
  setReUrlAction,
  initPressRelease,
  tabAction,
  initInputMediaPopupAction,
  mailingIdAction,
  isDeleteTemplateAction,
  isChangeTemplateAction,
  initSettingDataAction,
  settingPageDataAction,
  outMessagePopupAction,
  draftListAction,
  isNoticePopupAction,
  setTotalReciversAction,
  createInitAction,
  fromSettingToTemplateAction,
  templatePageDataAction,
  getTemplateListAction,
  fromTemplateToContentsAction,
  templateRegisterPopupAction,
  contactInfoPopupAction,
  previewPopupAction,
  contentPageDataAction,
  editorDataAction,
  initMediaPopupAction,
  mediaPopupAction,
  editorMediaDataAction,
  confirmPageDataAction,
  fromContentsToConfirmAction,
  templateChangedDataAction,
  releasePopupAction,
  inputMediaPopupAction,
  setInputMediaListFilesAction,
  setIsAddTemplateAction,
} = pressReleaseSlice.actions
export default pressReleaseSlice.reducer
