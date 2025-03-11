import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  defaultPublishComTypeList,
  defaultPublishTypeList,
  defaultRegion,
  extendedShareScopeList,
} from '~/components/contents/distribution/NewswireRelease/defaultData'
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

export type settingPageDataType = {
  publishComType: SelectListOptionItem
  publishCompanyId: number
  publisher: string
  publisherErr: string
  publisherMy: string
  publishWhere: string
  publishWhereErr: string
  wsite: string
  wsiteErr: string
  wsiteMy: string
  wsiteMyErr: string
  language: SelectListOptionItem
  publishNow: SelectListOptionItem
  publishDate: Date
  publishTime: { hours: number; minutes: number }
  publishTimeErr: string
  addressNm: string
  addressNmErr: string
  addressNmMy: string
  subAddressNm: string
  subAddressNmMy: string
  alarmMobile: string
  alarmMobileErr: string
  alarmEmail: string
  alarmEmailErr: string
  msgToNwire: string
  termsApproved: boolean
  termsApprovedErr: string
  termsApproved2: boolean
  termsApproved2Err: string
  tagList: MbTagSearchTagItem[]
  scrop: SelectListOptionItem
  region: SelectListOptionItem
  regionErr: string
  regionMy: SelectListOptionItem
}

export type importPopupType = {
  isOpen: boolean
  selectedId?: number
}

export type previewPopupType = {
  isOpen: boolean
  type: string
  data: any
  receiver: string
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

export type ErrorObject = {
  id: string
  errorMsg: string
}

export type contentPageDataType = {
  title: string
  titleErr: string
  subtitle: string
  getEditorContentString: string
  receivedEditorContent: string
  content: string
  contentError: string
  filesList: FileType[]
  filesErrorList: ErrorObject[]
  deletedFileIdList: number[]
  contactInfo: string
  contactInfoError: string
  videoSrc: string
  videoSrcError: string
  videoDesc: string
  videoDescError: string
}

export type publishCompanyInfoType = {
  companyId: number
  name: string
  countryCode: string
  zipCode: string
  address: string
  addressDetail: string
  wsite: string
}

export interface Props {
  nwReleaseId: number
  releasePopup: boolean
  isEdit: boolean
  tab: StepItem
  reUrl: string
  contentPageData: contentPageDataType
  settingPageData: settingPageDataType
  outMessagePopup: boolean
  draftList: {
    count: number
    isOpen: boolean
  }
  previewPopup: previewPopupType
  importPopup: importPopupType
  mediaPopup: mediaPopupType
  inputMediaPopup: inputMediaPopupType
  editorData: string
  addressPopup: boolean
  regionList: SelectListOptionItem[]
  myCompanyData: publishCompanyInfoType | null
}

// 초기값
export const initialState: Props = {
  nwReleaseId: 0,
  releasePopup: false,
  isEdit: false,
  tab: {
    id: 'content',
    title: '내용',
  },
  reUrl: '',
  contentPageData: {
    title: '',
    subtitle: '',
    titleErr: '',
    getEditorContentString: '',
    receivedEditorContent: '',
    content: '',
    contentError: '',
    filesList: [],
    filesErrorList: [],
    deletedFileIdList: [],
    contactInfo: '',
    contactInfoError: '',
    videoSrc: '',
    videoSrcError: '',
    videoDesc: '',
    videoDescError: '',
  },
  settingPageData: {
    publishComType: defaultPublishComTypeList[0],
    publishCompanyId: 0,
    publisher: '',
    publisherErr: '',
    publisherMy: '',
    publishWhere: '',
    publishWhereErr: '',
    wsite: '',
    wsiteErr: '',
    wsiteMy: '',
    wsiteMyErr: '',
    language: { id: 'ko', name: '한국어' },
    publishNow: defaultPublishTypeList[0],
    publishDate: new Date(),
    publishTime: { hours: 0, minutes: 0 },
    publishTimeErr: '',
    addressNm: '',
    addressNmErr: '',
    addressNmMy: '',
    subAddressNm: '',
    subAddressNmMy: '',
    alarmMobile: '',
    alarmMobileErr: '',
    alarmEmail: '',
    alarmEmailErr: '',
    msgToNwire: '',
    termsApproved: false,
    termsApprovedErr: '',
    termsApproved2: false,
    termsApproved2Err: '',
    tagList: [],
    scrop: extendedShareScopeList[0],
    region: defaultRegion,
    regionErr: '',
    regionMy: defaultRegion,
  },
  outMessagePopup: false,
  draftList: {
    count: 0,
    isOpen: false,
  },
  previewPopup: {
    isOpen: false,
    type: '',
    data: '',
    receiver: '',
  },
  importPopup: {
    isOpen: false,
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
  addressPopup: false,
  editorData: '',
  regionList: [],
  myCompanyData: null,
}

const newswireReleaseSlice = createSlice({
  name: 'newswireReleaseSlice',
  initialState,
  reducers: {
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
      state.isEdit = false
      state.contentPageData = action.payload.contentPageDataProps
      state.editorData = action.payload.text
    },
    setInputMediaListFilesAction: (state, action: PayloadAction<FileType[]>) => {
      state.isEdit = false
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
    previewPopupAction: (state, action: PayloadAction<previewPopupType>) => {
      state.previewPopup = action.payload
    },
    importPopupAction: (state, action: PayloadAction<importPopupType>) => {
      state.importPopup = action.payload
    },
    releasePopupAction: (state, action: PayloadAction<boolean>) => {
      state.isEdit = false
      state.releasePopup = action.payload
    },
    addressPopupAction: (state, action: PayloadAction<boolean>) => {
      state.addressPopup = action.payload
    },
    initSettingDataAction: (
      state,
      action: PayloadAction<{ param: contentPageDataType; editor: string; id: number }>
    ) => {
      state.isEdit = false
      state.nwReleaseId = action.payload.id
      state.releasePopup = false
      state.reUrl = ''
      state.tab = {
        id: 'content',
        title: '내용',
      }
      state.draftList = {
        count: 0,
        isOpen: false,
      }
      // state.settingPageData = {}
      state.contentPageData = action.payload.param
      state.outMessagePopup = false
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
    fromSettingToConfirmAction: (state, action: PayloadAction<{ id: number }>) => {
      state.isEdit = false
      state.nwReleaseId = action.payload.id
      state.tab = {
        id: 'confirm',
        title: '확인',
      }
      state.releasePopup = false
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
    },
    fromContentsToSettingAction: (state, action: PayloadAction<{ id: number; param: settingPageDataType }>) => {
      state.nwReleaseId = action.payload.id
      state.settingPageData = action.payload.param
      state.tab = {
        id: 'setting',
        title: '설정',
      }
    },
    createInitAction: state => {
      state.isEdit = false
      state.releasePopup = false
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
    },
    draftListAction: (state, action: PayloadAction<{ count: number; isOpen: boolean }>) => {
      state.draftList = action.payload
    },
    tabAction: (state, action: PayloadAction<StepItem>) => {
      state.tab = action.payload
    },
    outMessagePopupAction: (state, action: PayloadAction<boolean>) => {
      state.outMessagePopup = action.payload
    },
    settingPageDataAction: (state, action: PayloadAction<settingPageDataType>) => {
      state.isEdit = true
      state.settingPageData = action.payload
    },
    contentPageDataAction: (state, action: PayloadAction<contentPageDataType>) => {
      state.isEdit = true
      state.contentPageData = action.payload
    },
    contentPageInitAction: (state, action: PayloadAction<contentPageDataType>) => {
      state.isEdit = false
      state.contentPageData = action.payload
    },
    setReUrlAction: (state, action: PayloadAction<string>) => {
      state.reUrl = action.payload
    },
    editorDataAction: (state, action: PayloadAction<string>) => {
      // state.isEdit = true
      state.editorData = action.payload
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
    initNewswireRelease: (state, action: PayloadAction<SelectListOptionItem>) => {
      state.nwReleaseId = 0
      state.releasePopup = false
      state.isEdit = false
      state.reUrl = ''
      state.tab = {
        id: 'content',
        title: '내용',
      }
      state.draftList = {
        count: 0,
        isOpen: false,
      }
      state.contentPageData = {
        title: '',
        subtitle: '',
        titleErr: '',
        getEditorContentString: '',
        receivedEditorContent: '',
        content: '',
        contentError: '',
        filesList: [],
        filesErrorList: [],
        deletedFileIdList: [],
        contactInfo: '',
        contactInfoError: '',
        videoSrc: '',
        videoSrcError: '',
        videoDesc: '',
        videoDescError: '',
      }
      state.settingPageData = {
        ...initialState.settingPageData,
        scrop: action.payload,
      }
      state.outMessagePopup = false
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
      state.importPopup = {
        isOpen: false,
      }
      state.editorData = ''
    },
    regionListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.regionList = action.payload
    },
    setMyCompanyInfoAction: (state, action: PayloadAction<publishCompanyInfoType>) => {
      state.myCompanyData = action.payload
    },
  },
})
export const {
  setReUrlAction,
  initNewswireRelease,
  tabAction,
  initInputMediaPopupAction,
  initSettingDataAction,
  settingPageDataAction,
  outMessagePopupAction,
  draftListAction,
  createInitAction,
  fromSettingToConfirmAction,
  fromContentsToSettingAction,
  previewPopupAction,
  importPopupAction,
  contentPageDataAction,
  contentPageInitAction,
  editorDataAction,
  initMediaPopupAction,
  mediaPopupAction,
  editorMediaDataAction,
  releasePopupAction,
  inputMediaPopupAction,
  setInputMediaListFilesAction,
  addressPopupAction,
  regionListAction,
  setMyCompanyInfoAction,
} = newswireReleaseSlice.actions
export default newswireReleaseSlice.reducer
