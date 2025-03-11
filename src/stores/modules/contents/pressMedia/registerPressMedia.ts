import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { SocialDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import {
  ESearchJournalistDocumentDto,
  ESearchMediaDocumentDto,
  JournalistMediaGroupItem,
} from '~/types/contents/PressMedia'

export interface categoryListProps extends SelectListOptionItem {
  main: string
  nextStep: string
  addStep: string
}

export interface mediaContentListProps extends JournalistMediaGroupItem {
  isEdit: boolean
  isOwner: boolean
  settingList: SelectListOptionItem[]
  shareCodeNm: string
}

export type searchRegisterListPopupProps = {
  isOpen: boolean
  name: string
  kind: string
  type: string
  nameErr: string
  origin: number[]
  except: number[]
  isActive: boolean
  searchRegistIdList: number[]
  mediaIdList: ESearchMediaDocumentDto[]
  journalIdList: ESearchJournalistDocumentDto[]
}

export interface mediaListContentListProps extends JournalistMediaGroupItem {
  isOwner: boolean
  isEdit: boolean
  shareCodeNm: string
}

export interface pressListContentListProps extends JournalistMediaGroupItem {
  isOwner: boolean
  isEdit: boolean
  shareCodeNm: string
}

export interface pressSocialListProps extends SocialDto {
  keyId: number
  typeName: SelectListOptionItem
  linkErr: string
  socialErr: string
}

export type mediaPersonalParamsProps = {
  mediaName: string
  mediaNameErr: string
  email: string
  emailErr: string
  website: string
  websiteErr: string
  landline: string
  mobile: string
  fields: string
  address: string
  subAddressNm: string
  mediaBookLists: MbTagSearchTagItem[]
}

export type pressPersonalParamsProps = {
  name: string
  nameErr: string
  mediaName: string
  mediaNameErr: string
  department: string
  position: string
  email: string
  emailErr: string
  landline: string
  mobile: string
  fields: string
  address: string
  subAddressNm: string
  career: string
  education: string
  writings: string
  awards: string
  jrnlstLists: MbTagSearchTagItem[]
}

export type mediaIdListProps = {
  id: number
  title: string
}

export type pressIdListProps = {
  id: number
  title: string
}

export type mediaListPopupPageProps = {
  isOpen: boolean
  name: string
  nameErr: string
  isActive: boolean
  mediaIdList: mediaIdListProps[]
}
export type pressListPopupPageProps = {
  isOpen: boolean
  name: string
  nameErr: string
  isActive: boolean
  pressIdList: pressIdListProps[]
}

export type mediaExcelListProps = {
  id: string
  mediaName: string
  website?: string
  email: string
  landline?: string
  mobile?: string
  fields?: string
  address?: string
}

export type mediaExcelParamsProps = {
  execelIdList: string[]
  excelList: mediaExcelListProps[]
  mediaBookLists: MbTagSearchTagItem[]
  excelFileList: MbTagSearchTagItem[]
}

export type pressExcelListProps = {
  id: string
  name: string
  mediaName: string
  department?: string
  position?: string
  email: string
  landline?: string
  mobile?: string
  fields?: string
  address?: string
}

export type pressExcelParamsProps = {
  execelIdList: string[]
  excelList: pressExcelListProps[]
  jrnlstLists: MbTagSearchTagItem[]
  excelFileList: MbTagSearchTagItem[]
}

export type Props = {
  categoryList: categoryListProps[]
  categoryData: categoryListProps
  addressPopup: boolean
  jrnlstSocialUserAddList: SelectListOptionItem[]
  parentCode: string

  mediaPersonalParams: mediaPersonalParamsProps
  mediaListPopupPage: mediaListPopupPageProps
  mediaListContentList: mediaListContentListProps[]
  mediaExcelDataLoading: boolean
  mediaExcelParams: mediaExcelParamsProps
  medialistKey: SelectListOptionItem

  pressPersonalParams: pressPersonalParamsProps
  pressListPopupPage: pressListPopupPageProps
  pressListContentList: pressListContentListProps[]
  pressSocialList: pressSocialListProps[]
  journalistKey: SelectListOptionItem
  pressExcelDataLoading: boolean
  pressExcelParams: pressExcelParamsProps

  searchRegisterListPopup: searchRegisterListPopupProps
}

// 초기값
export const initialState: Props = {
  categoryData: { id: 'press', name: '언론인', main: 'information', nextStep: '', addStep: '' },
  categoryList: [
    {
      id: 'press',
      name: '언론인',
      main: 'information',
      nextStep: '',
      addStep: '',
    },
    {
      id: 'media',
      name: '매체',
      main: 'information',
      nextStep: '',
      addStep: '',
    },
  ],
  addressPopup: false,
  jrnlstSocialUserAddList: [],
  parentCode: 'JRNLST_SOCIAL_USER_ADD',

  pressExcelDataLoading: false,
  pressExcelParams: {
    execelIdList: [],
    excelList: [],
    jrnlstLists: [],
    excelFileList: [],
  },
  pressPersonalParams: {
    name: '',
    nameErr: '',
    mediaName: '',
    mediaNameErr: '',
    department: '',
    position: '',
    email: '',
    emailErr: '',
    landline: '',
    mobile: '',
    fields: '',
    address: '',
    subAddressNm: '',
    career: '',
    education: '',
    writings: '',
    awards: '',
    jrnlstLists: [],
  },
  pressSocialList: [],
  pressListPopupPage: {
    isOpen: false,
    name: '',
    nameErr: '',
    isActive: false,
    pressIdList: [],
  },
  pressListContentList: [],
  journalistKey: { id: '', name: '' },

  mediaExcelDataLoading: false,
  mediaExcelParams: {
    execelIdList: [],
    excelList: [],
    mediaBookLists: [],
    excelFileList: [],
  },
  mediaPersonalParams: {
    mediaName: '',
    mediaNameErr: '',
    email: '',
    emailErr: '',
    websiteErr: '',
    website: '',
    landline: '',
    mobile: '',
    fields: '',
    address: '',
    subAddressNm: '',
    mediaBookLists: [],
  },
  mediaListPopupPage: {
    isOpen: false,
    name: '',
    nameErr: '',
    isActive: false,
    mediaIdList: [],
  },
  mediaListContentList: [],
  medialistKey: { id: '', name: '' },

  searchRegisterListPopup: {
    isOpen: false,
    kind: '',
    type: 'any',
    name: '',
    nameErr: '',
    isActive: false,
    except: [],
    origin: [],
    searchRegistIdList: [],
    mediaIdList: [],
    journalIdList: [],
  },
}

const registerPressMediaSlice = createSlice({
  name: 'registerPressMediaSlice',
  initialState,
  reducers: {
    initSearchRegisterListPopupAction: (
      state,
      action: PayloadAction<{
        isOpen: boolean
        type: string
        kind: string
        list: number[]
        origin: number[]
        except: number[]
        mediaIdList: ESearchMediaDocumentDto[]
        journalIdList: ESearchJournalistDocumentDto[]
      }>
    ) => {
      state.searchRegisterListPopup = {
        isOpen: action.payload.isOpen,
        name: '',
        kind: action.payload.kind,
        type: action.payload.type,
        isActive: false,
        nameErr: '',
        except: action.payload.except,
        origin: action.payload.origin,
        searchRegistIdList: action.payload.list,
        mediaIdList: action.payload.mediaIdList,
        journalIdList: action.payload.journalIdList,
      }
    },
    searchRegisterListPopupAction: (state, action: PayloadAction<searchRegisterListPopupProps>) => {
      state.searchRegisterListPopup = action.payload
    },
    categoryDataManagementAction: (state, action: PayloadAction<categoryListProps>) => {
      state.categoryData = action.payload
      if (action.payload.addStep === 'list') {
        state.mediaExcelParams.mediaBookLists = []
        state.pressExcelParams.jrnlstLists = []
      }
      if (action.payload.id === 'press') {
        state.parentCode = 'JRNLST_SOCIAL_USER_ADD'
      }
    },
    initCategoryDataManagementAction: (state, action: PayloadAction<categoryListProps>) => {
      state.categoryData = action.payload
      if (action.payload.id === 'press') {
        state.parentCode = 'JRNLST_SOCIAL_USER_ADD'
      }
      state.mediaExcelDataLoading = false
      state.mediaExcelParams = {
        execelIdList: [],
        excelList: [],
        mediaBookLists: [],
        excelFileList: [],
      }
      state.mediaPersonalParams = {
        mediaName: '',
        mediaNameErr: '',
        email: '',
        emailErr: '',
        website: '',
        websiteErr: '',
        landline: '',
        mobile: '',
        fields: '',
        address: '',
        subAddressNm: '',
        mediaBookLists: [],
      }
      state.mediaListPopupPage = {
        isOpen: false,
        name: '',
        nameErr: '',
        isActive: false,
        mediaIdList: [],
      }
      state.mediaListContentList = []
      state.medialistKey = { id: '', name: '' }

      state.pressExcelDataLoading = false
      state.pressExcelParams = {
        execelIdList: [],
        excelList: [],
        jrnlstLists: [],
        excelFileList: [],
      }
      state.pressPersonalParams = {
        name: '',
        nameErr: '',
        mediaName: '',
        mediaNameErr: '',
        department: '',
        position: '',
        email: '',
        emailErr: '',
        landline: '',
        mobile: '',
        fields: '',
        address: '',
        subAddressNm: '',
        career: '',
        education: '',
        writings: '',
        awards: '',
        jrnlstLists: [],
      }
      state.pressSocialList = []
      state.pressListPopupPage = {
        isOpen: false,
        name: '',
        nameErr: '',
        isActive: false,
        pressIdList: [],
      }
      state.pressListContentList = []
      state.journalistKey = { id: '', name: '' }

      state.addressPopup = false
    },
    mediaExcelDataLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.mediaExcelDataLoading = action.payload
    },
    mediaExcelParamsAction: (state, action: PayloadAction<mediaExcelParamsProps>) => {
      state.mediaExcelParams = action.payload
      state.mediaExcelDataLoading = false
    },
    mediaListContentListAction: (state, action: PayloadAction<mediaListContentListProps[]>) => {
      state.mediaListContentList = action.payload
    },

    pressExcelDataLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.pressExcelDataLoading = action.payload
    },
    pressExcelParamsAction: (state, action: PayloadAction<pressExcelParamsProps>) => {
      state.pressExcelParams = action.payload
      state.pressExcelDataLoading = false
    },
    pressListContentListAction: (state, action: PayloadAction<pressListContentListProps[]>) => {
      state.pressListContentList = action.payload
    },

    jrnlstSocialUserAddListAction: (state, action: PayloadAction<SelectListOptionItem[]>) => {
      state.jrnlstSocialUserAddList = action.payload
      state.parentCode = ''
    },

    pressPersonalParamsAction: (state, action: PayloadAction<pressPersonalParamsProps>) => {
      state.pressPersonalParams = action.payload
    },
    pressSocialListAction: (state, action: PayloadAction<pressSocialListProps[]>) => {
      state.pressSocialList = action.payload
    },
    initPressListPopupPageAction: (state, action: PayloadAction<{ isOpen: boolean; list: pressIdListProps[] }>) => {
      state.pressListPopupPage = {
        isOpen: action.payload.isOpen,
        name: '',
        nameErr: '',
        isActive: false,
        pressIdList: action.payload.list,
      }
    },
    pressListPopupPageDataAction: (
      state,
      action: PayloadAction<{ personal: MbTagSearchTagItem[]; excel: MbTagSearchTagItem[] }>
    ) => {
      state.pressPersonalParams.jrnlstLists = action.payload.personal
      state.pressExcelParams.jrnlstLists = action.payload.excel
      state.pressListPopupPage = {
        isOpen: false,
        name: '',
        nameErr: '',
        isActive: false,
        pressIdList: [],
      }
    },
    pressListPopupPageAction: (state, action: PayloadAction<pressListPopupPageProps>) => {
      state.pressListPopupPage = action.payload
    },
    pressAddExcelAction: state => {
      state.categoryData = { id: 'press', name: '언론인', main: 'next', nextStep: 'excel', addStep: 'end' }
      state.categoryList = [
        {
          id: 'press',
          name: '언론인',
          main: 'information',
          nextStep: '',
          addStep: '',
        },
        {
          id: 'media',
          name: '매체',
          main: 'information',
          nextStep: '',
          addStep: '',
        },
      ]
      state.pressListPopupPage = {
        isOpen: false,
        name: '',
        nameErr: '',
        isActive: false,
        pressIdList: [],
      }
      state.pressListContentList = []
      state.addressPopup = false
      state.pressExcelDataLoading = false
      state.pressExcelParams = {
        execelIdList: [],
        excelList: [],
        jrnlstLists: [],
        excelFileList: [],
      }
    },
    pressAddPersonalAction: (state, action: PayloadAction<SelectListOptionItem>) => {
      state.journalistKey = action.payload
      state.categoryData = { id: 'press', name: '언론인', main: 'next', nextStep: 'end', addStep: '' }
      state.categoryList = [
        {
          id: 'press',
          name: '언론인',
          main: 'information',
          nextStep: '',
          addStep: '',
        },
        {
          id: 'media',
          name: '매체',
          main: 'information',
          nextStep: '',
          addStep: '',
        },
      ]
      state.pressPersonalParams = {
        name: '',
        nameErr: '',
        mediaName: '',
        mediaNameErr: '',
        department: '',
        position: '',
        email: '',
        emailErr: '',
        landline: '',
        mobile: '',
        fields: '',
        address: '',
        subAddressNm: '',
        career: '',
        education: '',
        writings: '',
        awards: '',
        jrnlstLists: [],
      }
      state.pressSocialList = []
      state.pressListPopupPage = {
        isOpen: false,
        name: '',
        nameErr: '',
        isActive: false,
        pressIdList: [],
      }
      state.pressListContentList = []
      state.addressPopup = false
    },

    mediaPersonalParamsAction: (state, action: PayloadAction<mediaPersonalParamsProps>) => {
      state.mediaPersonalParams = action.payload
    },
    initMediaListPopupPageAction: (state, action: PayloadAction<{ isOpen: boolean; list: mediaIdListProps[] }>) => {
      state.mediaListPopupPage = {
        isOpen: action.payload.isOpen,
        name: '',
        nameErr: '',
        isActive: false,
        mediaIdList: action.payload.list,
      }
    },
    mediaListPopupPageDataAction: (
      state,
      action: PayloadAction<{ personal: MbTagSearchTagItem[]; excel: MbTagSearchTagItem[] }>
    ) => {
      state.mediaPersonalParams.mediaBookLists = action.payload.personal
      state.mediaExcelParams.mediaBookLists = action.payload.excel
      state.mediaListPopupPage = {
        isOpen: false,
        name: '',
        nameErr: '',
        isActive: false,
        mediaIdList: [],
      }
    },
    mediaListPopupPageAction: (state, action: PayloadAction<mediaListPopupPageProps>) => {
      state.mediaListPopupPage = action.payload
    },
    mediaAddExcelAction: state => {
      state.categoryData = { id: 'media', name: '언론인', main: 'next', nextStep: 'excel', addStep: 'end' }
      state.categoryList = [
        {
          id: 'press',
          name: '언론인',
          main: 'information',
          nextStep: '',
          addStep: '',
        },
        {
          id: 'media',
          name: '매체',
          main: 'information',
          nextStep: '',
          addStep: '',
        },
      ]
      state.mediaListPopupPage = {
        isOpen: false,
        name: '',
        nameErr: '',
        isActive: false,
        mediaIdList: [],
      }
      state.mediaListContentList = []
      state.addressPopup = false
      state.mediaExcelDataLoading = false
      state.mediaExcelParams = {
        execelIdList: [],
        excelList: [],
        mediaBookLists: [],
        excelFileList: [],
      }
    },
    mediaAddPersonalAction: (state, action: PayloadAction<SelectListOptionItem>) => {
      state.categoryData = { id: 'media', name: '언론인', main: 'next', nextStep: 'end', addStep: '' }
      state.categoryList = [
        {
          id: 'press',
          name: '언론인',
          main: 'information',
          nextStep: '',
          addStep: '',
        },
        {
          id: 'media',
          name: '매체',
          main: 'information',
          nextStep: '',
          addStep: '',
        },
      ]
      state.mediaPersonalParams = {
        mediaName: '',
        mediaNameErr: '',
        email: '',
        emailErr: '',
        website: '',
        landline: '',
        websiteErr: '',
        mobile: '',
        fields: '',
        address: '',
        subAddressNm: '',
        mediaBookLists: [],
      }
      state.mediaListPopupPage = {
        isOpen: false,
        name: '',
        nameErr: '',
        isActive: false,
        mediaIdList: [],
      }
      state.mediaListContentList = []
      state.addressPopup = false
      state.medialistKey = action.payload
    },
    addressPopupAction: (state, action: PayloadAction<boolean>) => {
      state.addressPopup = action.payload
    },
    initAction: (state, action: PayloadAction<string>) => {
      state.categoryData = {
        id: action.payload,
        name: action.payload === 'press' ? '언론인' : '매체',
        main: 'information',
        nextStep: '',
        addStep: '',
      }
      state.categoryList = [
        {
          id: 'press',
          name: '언론인',
          main: 'information',
          nextStep: '',
          addStep: '',
        },
        {
          id: 'media',
          name: '매체',
          main: 'information',
          nextStep: '',
          addStep: '',
        },
      ]
      state.addressPopup = false
      state.jrnlstSocialUserAddList = []
      state.parentCode = 'JRNLST_SOCIAL_USER_ADD'

      state.pressExcelDataLoading = false
      state.pressExcelParams = {
        execelIdList: [],
        excelList: [],
        jrnlstLists: [],
        excelFileList: [],
      }
      state.pressPersonalParams = {
        name: '',
        nameErr: '',
        mediaName: '',
        mediaNameErr: '',
        department: '',
        position: '',
        email: '',
        emailErr: '',
        landline: '',
        mobile: '',
        fields: '',
        address: '',
        subAddressNm: '',
        career: '',
        education: '',
        writings: '',
        awards: '',
        jrnlstLists: [],
      }
      state.pressSocialList = []
      state.pressListPopupPage = {
        isOpen: false,
        name: '',
        nameErr: '',
        isActive: false,
        pressIdList: [],
      }
      state.pressListContentList = []
      state.journalistKey = { id: '', name: '' }
      state.mediaExcelDataLoading = false
      state.mediaExcelParams = {
        execelIdList: [],
        excelList: [],
        mediaBookLists: [],
        excelFileList: [],
      }
      state.mediaPersonalParams = {
        mediaName: '',
        mediaNameErr: '',
        email: '',
        emailErr: '',
        website: '',
        landline: '',
        websiteErr: '',
        mobile: '',
        fields: '',
        address: '',
        subAddressNm: '',
        mediaBookLists: [],
      }
      state.mediaListPopupPage = {
        isOpen: false,
        name: '',
        nameErr: '',
        isActive: false,
        mediaIdList: [],
      }
      state.mediaListContentList = []
      state.medialistKey = { id: '', name: '' }
    },
  },
})

export const {
  initAction,
  addressPopupAction,
  pressListPopupPageAction,
  categoryDataManagementAction,
  pressPersonalParamsAction,
  initPressListPopupPageAction,
  pressListPopupPageDataAction,
  pressListContentListAction,
  pressSocialListAction,
  jrnlstSocialUserAddListAction,
  pressAddPersonalAction,
  pressAddExcelAction,
  pressExcelDataLoadingAction,
  pressExcelParamsAction,
  initCategoryDataManagementAction,

  mediaListPopupPageAction,
  mediaPersonalParamsAction,
  initMediaListPopupPageAction,
  mediaListPopupPageDataAction,
  mediaListContentListAction,
  mediaAddPersonalAction,
  mediaAddExcelAction,
  mediaExcelDataLoadingAction,
  mediaExcelParamsAction,

  initSearchRegisterListPopupAction,
  searchRegisterListPopupAction,
} = registerPressMediaSlice.actions
export default registerPressMediaSlice.reducer
