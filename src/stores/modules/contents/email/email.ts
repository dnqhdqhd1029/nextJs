import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { getCurrentDateAfterMinutes } from '~/utils/common/date'

export type emailResultType = {
  resultCode: string
  resultCount: number
}

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

export type contactInfoPopupType = {
  isOpen: boolean
  type: string
  data: string
  content: string
  contentErrorMessage: string
}

export interface emailPopupType {
  isOpen: boolean
  title: string
  key: number
  mailStateGroup: string
  contentTitleErr: string
  selectedTime: { hours: number; minutes: number }
  selectedDate: Date
  dateErrorMessage: string
  isTemplate: string
  templateType: SelectListOptionItem
  name: string
  receiverGroup: string
  tagPressList: MbTagSearchTagItem[]
  targetEmail: MbTagSearchTagItem[]
  tagList: MbTagSearchTagItem[]
  filesList: FileType[]
  checkPhone: boolean
  content: string
  getEditorContentString: string
  receivedEditorContent: string
  scrop: SelectListOptionItem
  recipientErr: string
  contentErrorMessage: string
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

export type previewPopupType = {
  isOpen: boolean
  type: string
  data: any
  receiver: string
}

export type Props = {
  sagaState: any
  emailPopup: emailPopupType
  isNoticePopup: boolean
  isConfirmPopup: boolean
  isReleasePopup: boolean
  contactInfoPopup: contactInfoPopupType
  mediaPopup: mediaPopupType
  inputMediaPopup: mediaPopupType
  userTemplateList: SelectListOptionItem[]
  originTemplateList: TemplateType[]
  editorData: string
  previewPopup: previewPopupType
  editorImageItems: mediaPopupItemType[]
  deletedFileIdList: number[]
  mediaPopupDataAction: boolean
  inputMediaPopupDataAction: boolean
  adjustTemplate: boolean
  emailCancelPopup: boolean
  isWrite: boolean
}

// 초기값
export const initialState: Props = {
  sagaState: '',
  contactInfoPopup: {
    isOpen: false,
    type: '',
    data: '',
    content: '',
    contentErrorMessage: '',
  },
  emailPopup: {
    isOpen: false,
    key: 0,
    title: '',
    contentTitleErr: '',
    mailStateGroup: 'now',
    selectedTime: {
      hours: getCurrentDateAfterMinutes(5).getHours(),
      minutes: getCurrentDateAfterMinutes(5).getMinutes(),
    },
    selectedDate: getCurrentDateAfterMinutes(5),
    dateErrorMessage: '',
    isTemplate: 'no',
    templateType: { id: '', name: '' },
    name: '',
    recipientErr: '',
    receiverGroup: 'pressList',
    tagPressList: [],
    targetEmail: [],
    tagList: [],
    filesList: [],
    checkPhone: true,
    content: '',
    contentErrorMessage: '',
    getEditorContentString: '',
    receivedEditorContent: '',
    scrop: { id: '', name: '' },
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
  previewPopup: {
    isOpen: false,
    type: '',
    data: '',
    receiver: '',
  },
  isNoticePopup: false,
  isConfirmPopup: false,
  isReleasePopup: false,
  originTemplateList: [],
  userTemplateList: [],
  editorData: ``,
  editorImageItems: [],
  deletedFileIdList: [],
  mediaPopupDataAction: false,
  inputMediaPopupDataAction: false,
  adjustTemplate: false,
  emailCancelPopup: false,
  isWrite: false,
}

const emailSlice = createSlice({
  name: 'emailSlice',
  initialState,
  reducers: {
    emailActionSaga: state => {
      state.sagaState = ''
    },
    emailCancelPopupAction: (state, action: PayloadAction<boolean>) => {
      state.emailCancelPopup = action.payload
    },
    adjustTemplateAction: (state, action: PayloadAction<boolean>) => {
      state.adjustTemplate = action.payload
    },
    setTemplateListAction: (
      state,
      action: PayloadAction<{ list: SelectListOptionItem[]; origin: TemplateType[]; find: SelectListOptionItem }>
    ) => {
      state.originTemplateList = action.payload.origin
      state.userTemplateList = action.payload.list
      state.adjustTemplate = false
      state.emailPopup.isTemplate = 'use'
      state.emailPopup.templateType = action.payload.find
      state.isWrite = true
    },
    setTemplateTypeAction: (state, action: PayloadAction<SelectListOptionItem>) => {
      state.emailPopup.templateType = action.payload
      state.isWrite = true
    },
    editorDataAction: (state, action: PayloadAction<string>) => {
      state.editorData = action.payload
      state.isWrite = action.payload !== ''
    },
    emailPopupAction: (state, action: PayloadAction<emailPopupType>) => {
      state.adjustTemplate = false
      state.emailPopup = action.payload
      state.isWrite = true
    },
    setNoticePopupAction: (state, action: PayloadAction<boolean>) => {
      state.isNoticePopup = action.payload
    },
    setCofirmPopupAction: (state, action: PayloadAction<boolean>) => {
      state.isConfirmPopup = action.payload
    },
    setReleasePopupAction: (state, action: PayloadAction<{ isConfirmPopup: boolean; isReleasePopup: boolean }>) => {
      state.isReleasePopup = action.payload.isReleasePopup
      state.isConfirmPopup = action.payload.isConfirmPopup
    },
    setIsReleasePopupAction: (state, action: PayloadAction<boolean>) => {
      state.isReleasePopup = action.payload
    },
    mediaPopupAction: (state, action: PayloadAction<mediaPopupType>) => {
      state.mediaPopup = action.payload
      state.mediaPopupDataAction = false
    },
    inputMediaPopupAction: (state, action: PayloadAction<mediaPopupType>) => {
      state.inputMediaPopup = action.payload
      state.inputMediaPopupDataAction = false
    },
    setEmailPopupAction: (state, action: PayloadAction<{ email: emailPopupType; editor: string }>) => {
      state.adjustTemplate = false
      state.emailPopup = action.payload.email
      state.editorData = action.payload.editor
      state.isWrite = action.payload.editor !== ''
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
      state.mediaPopupDataAction = true
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
      state.inputMediaPopupDataAction = true
    },
    contactInfoPopupAction: (state, action: PayloadAction<contactInfoPopupType>) => {
      state.contactInfoPopup = action.payload
    },
    templateAction: (state, action: PayloadAction<{ content: string; email: emailPopupType }>) => {
      state.editorData = action.payload.content
      state.emailPopup = action.payload.email
      state.adjustTemplate = false
      state.isWrite = true
    },
    previewPopupAction: (state, action: PayloadAction<previewPopupType>) => {
      state.previewPopup = action.payload
    },
    initPreviewPopupAction: state => {
      state.previewPopup = { isOpen: false, type: '', data: '', receiver: '' }
    },
    editorMediaDataAction: (
      state,
      action: PayloadAction<{
        text: string
        imageItems: mediaPopupItemType[]
        emailPopupContent: emailPopupType
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
      state.adjustTemplate = false
      state.emailPopup = action.payload.emailPopupContent
      state.isWrite = true
      state.editorImageItems = action.payload.imageItems
      state.editorData = action.payload.text
    },
    setInputMediaListFilesAction: (state, action: PayloadAction<FileType[]>) => {
      state.emailPopup.filesList = action.payload
      state.isWrite = true
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
    setMailingIdAction: (state, action: PayloadAction<number>) => {
      state.adjustTemplate = false
      state.emailPopup = {
        ...state.emailPopup,
        key: action.payload,
      }
      state.isWrite = true
    },
    setDeletedFileIdListAction: (state, action: PayloadAction<{ delList: number[]; list: emailPopupType }>) => {
      state.adjustTemplate = false
      state.deletedFileIdList = action.payload.delList
      state.emailPopup = action.payload.list
      state.isWrite = true
    },
    tagetListOpenEmailPopupAction: (
      state,
      action: PayloadAction<{
        scrop: SelectListOptionItem
        tagPressList: MbTagSearchTagItem[]
        targetEmail?: MbTagSearchTagItem[]
        receiverGroup?: string
        name?: string
      }>
    ) => {
      state.contactInfoPopup = {
        isOpen: false,
        type: '',
        data: '',
        content: '',
        contentErrorMessage: '',
      }
      state.previewPopup = {
        isOpen: false,
        type: '',
        data: '',
        receiver: '',
      }
      state.adjustTemplate = false
      state.isNoticePopup = false
      state.isConfirmPopup = false
      state.isReleasePopup = false
      state.originTemplateList = []
      state.userTemplateList = []
      state.editorData = ``
      state.editorImageItems = []
      state.deletedFileIdList = []
      state.isWrite = false
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
      state.emailPopup = {
        isOpen: true,
        key: 0,
        title: '',
        contentTitleErr: '',
        mailStateGroup: 'now',
        selectedTime: {
          hours: getCurrentDateAfterMinutes(5).getHours(),
          minutes: getCurrentDateAfterMinutes(5).getMinutes(),
        },
        selectedDate: getCurrentDateAfterMinutes(5),
        dateErrorMessage: '',
        isTemplate: 'no',
        templateType: { id: '', name: '' },
        name: action.payload.name ? action.payload.name : '',
        recipientErr: '',
        receiverGroup: action.payload.receiverGroup ? action.payload.receiverGroup : 'pressList',
        tagPressList: action.payload.tagPressList,
        targetEmail: action.payload.targetEmail ? action.payload.targetEmail : [],
        tagList: [],
        filesList: [],
        checkPhone: true,
        content: '',
        contentErrorMessage: '',
        getEditorContentString: '',
        receivedEditorContent: '',
        scrop: action.payload.scrop,
      }
    },
    initEmailPopupAction: (
      state,
      action: PayloadAction<{ key: number; name: string; scrop: SelectListOptionItem }>
    ) => {
      state.contactInfoPopup = {
        isOpen: false,
        type: '',
        data: '',
        content: '',
        contentErrorMessage: '',
      }
      state.previewPopup = {
        isOpen: false,
        type: '',
        data: '',
        receiver: '',
      }
      state.isWrite = false
      state.adjustTemplate = false
      state.isNoticePopup = false
      state.isConfirmPopup = false
      state.isReleasePopup = false
      state.originTemplateList = []
      state.userTemplateList = []
      state.editorData = ``
      state.editorImageItems = []
      state.deletedFileIdList = []
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
      state.emailPopup = {
        isOpen: true,
        key: action.payload.key,
        title: '',
        contentTitleErr: '',
        mailStateGroup: 'now',
        selectedTime: {
          hours: getCurrentDateAfterMinutes(5).getHours(),
          minutes: getCurrentDateAfterMinutes(5).getMinutes(),
        },
        selectedDate: getCurrentDateAfterMinutes(5),
        dateErrorMessage: '',
        isTemplate: 'no',
        templateType: { id: '', name: '' },
        name: action.payload.name,
        recipientErr: '',
        receiverGroup: 'pressList',
        tagPressList: [],
        targetEmail: [],
        tagList: [],
        filesList: [],
        checkPhone: true,
        content: '',
        contentErrorMessage: '',
        getEditorContentString: '',
        receivedEditorContent: '',
        scrop: action.payload.scrop,
      }
    },
    initEmail: () => initialState,
    setContatcInfo: (state, action: PayloadAction<string>) => {
      const editorText: emailPopupType = {
        ...state.emailPopup,
        receivedEditorContent: action.payload,
      }
      state.emailPopup = editorText
      state.isWrite = true
    },
  },
})

export const {
  emailActionSaga,
  initEmail,
  emailPopupAction,
  setNoticePopupAction,
  initEmailPopupAction,
  contactInfoPopupAction,
  mediaPopupAction,
  inputMediaPopupAction,
  setTemplateListAction,
  setTemplateTypeAction,
  editorDataAction,
  templateAction,
  previewPopupAction,
  initMediaPopupAction,
  initInputMediaPopupAction,
  initPreviewPopupAction,
  editorMediaDataAction,
  setMailingIdAction,
  setEmailPopupAction,
  setDeletedFileIdListAction,
  setCofirmPopupAction,
  setIsReleasePopupAction,
  setReleasePopupAction,
  adjustTemplateAction,
  tagetListOpenEmailPopupAction,
  setContatcInfo,
  setInputMediaListFilesAction,
  emailCancelPopupAction,
} = emailSlice.actions

export default emailSlice.reducer
