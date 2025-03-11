import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { SelectListOptionItem } from '~/types/common'
import { MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'
import type { GroupDto } from '~/utils/api/group/useGetGroupSearch'
import { FileType } from '~/utils/hooks/common/useFileDragAndDrop'

export type requestPopupTypesProps = {
  isOpen: boolean
  type: string
  selectedList: SelectListOptionItem[]
  selectedValue: SelectListOptionItem
  titleErr: string
  title: string
  contents: string
  contentsErr: string
  filesList: FileType[]
  name: string
  nameErr: string
  phoneNm: string
  phoneNmErr: string
  email: string
  emailErr: string
  telephone: string
}

export type requestSearchParamsType = {
  page: number
  size: number
  sort: string[]
  keyword: string
  searchUserId: number
}

export interface pageCountProps {
  totalCount: number
  totalPageCount: number
}

export type groupPopupProps = {
  isLoading: boolean
  isOpen: boolean
  keyValue: number
  groupKey: number
  type: string
  email: string
  displayName: string
  mobile: string
  role: string
  name: string
  nameErr: string
  nickName: string
  phone: string
  nameList: MbTagSearchTagItem[]
  nameListErr: string
  groupNm: string
  groupNmErr: string
  password: string
  passwordErr: string
  passwordAction: number
  oldGroupNm: string
  isDefault: boolean
  deleteCheckId: number
}
export type Props = {
  userPopup: groupPopupProps
  commonParentCode: string
  requestSearchParams: requestSearchParamsType
  pageCount: pageCountProps
  groupList: GroupDto[]
  companyGroupOptions: SelectListOptionItem[]
  searchUserId: string
  requestPopupTypes: requestPopupTypesProps
  userList: MbTagSearchResultItem[]
  pageGroupList: GroupDto[]
  requestSearchText: string
  isLoading: boolean
}

// 초기값
export const initialState: Props = {
  isLoading: false,
  commonParentCode: '',
  userPopup: {
    isLoading: true,
    isOpen: false,
    type: '',
    keyValue: 0,
    groupKey: 0,
    email: '',
    displayName: '',
    phone: '',
    mobile: '',
    role: '',
    nickName: '',
    nameList: [],
    nameListErr: '',
    name: '',
    nameErr: '',
    oldGroupNm: '',
    groupNm: '',
    groupNmErr: '',
    password: '',
    passwordErr: '',
    passwordAction: 0,
    isDefault: false,
    deleteCheckId: 0,
  },
  requestPopupTypes: {
    isOpen: false,
    type: '',
    selectedList: [],
    selectedValue: { id: '', name: '' },
    titleErr: '',
    title: '',
    contents: '',
    contentsErr: '',
    filesList: [],
    name: '',
    nameErr: '',
    phoneNm: '',
    phoneNmErr: '',
    email: '',
    emailErr: '',
    telephone: '',
  },
  requestSearchParams: {
    page: 1,
    size: 20,
    sort: ['regisAt!desc'],
    keyword: '',
    searchUserId: -1,
  },
  searchUserId: '',
  userList: [],
  companyGroupOptions: [],
  groupList: [],
  pageCount: {
    totalCount: 0,
    totalPageCount: 1,
  },
  requestSearchText: '',
  pageGroupList: [],
}

const adminGroupSlice = createSlice({
  name: 'adminGroupSlice',
  initialState,
  reducers: {
    requestPopupTypesAction: (state, action: PayloadAction<requestPopupTypesProps>) => {
      state.requestPopupTypes = action.payload
    },
    userProfilePopupAction: (state, action: PayloadAction<groupPopupProps>) => {
      state.userPopup = action.payload
    },
    requestSearchTextAction: (state, action: PayloadAction<string>) => {
      state.requestSearchText = action.payload
    },
    setPageGroupListAction: (state, action: PayloadAction<GroupDto[]>) => {
      state.pageGroupList = action.payload
    },
    initUserProfilePopupAction: (
      state,
      action: PayloadAction<{ isLoading: boolean; isOpen: boolean; keyValue: number; type: string }>
    ) => {
      state.userPopup = {
        isLoading: action.payload.isLoading,
        isOpen: action.payload.isOpen,
        type: action.payload.type,
        keyValue: action.payload.keyValue,
        groupKey: 0,
        email: '',
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
        nickName: '',
        nameList: [],
        nameListErr: '',
        name: '',
        nameErr: '',
        groupNm: '',
        groupNmErr: '',
        password: '',
        passwordErr: '',
        passwordAction: 0,
        oldGroupNm: '',
        isDefault: false,
        deleteCheckId: 0,
      }
    },
    initGroupNmChangePopupAction: (
      state,
      action: PayloadAction<{ isLoading: boolean; isOpen: boolean; keyValue: number; type: string }>
    ) => {
      state.userPopup = {
        isLoading: action.payload.isLoading,
        isOpen: action.payload.isOpen,
        type: action.payload.type,
        groupKey: action.payload.keyValue,
        keyValue: 0,
        email: '',
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
        nickName: '',
        nameList: [],
        nameListErr: '',
        name: '',
        nameErr: '',
        groupNm: '',
        groupNmErr: '',
        password: '',
        passwordErr: '',
        passwordAction: 0,
        oldGroupNm: '',
        isDefault: false,
        deleteCheckId: 0,
      }
    },
    requestSearchParamsAction: (state, action: PayloadAction<requestSearchParamsType>) => {
      state.requestSearchParams = action.payload
    },
    companyGroupOptionsAction: (
      state,
      action: PayloadAction<{ company: SelectListOptionItem[]; users: MbTagSearchResultItem[] }>
    ) => {
      state.companyGroupOptions = action.payload.company
      state.userList = action.payload.users
    },
    isLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setListAction: (
      state,
      action: PayloadAction<{ list: GroupDto[]; pageCount: pageCountProps; apiDto: requestSearchParamsType }>
    ) => {
      state.groupList = action.payload.list
      state.pageCount = action.payload.pageCount
      state.requestSearchParams = action.payload.apiDto
    },
    initRequestPopupTypesAction: state => {
      state.requestPopupTypes = {
        isOpen: false,
        type: '',
        selectedList: state.requestPopupTypes.selectedList,
        selectedValue: { id: '', name: '' },
        name: '',
        nameErr: '',
        phoneNm: '',
        phoneNmErr: '',
        email: '',
        emailErr: '',
        telephone: '',
        titleErr: '',
        title: '',
        contents: '',
        contentsErr: '',
        filesList: [],
      }
    },
    initAction: state => {
      state.commonParentCode = ''
      state.userPopup = {
        isLoading: true,
        isOpen: false,
        type: '',
        keyValue: 0,
        groupKey: 0,
        email: '',
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
        nickName: '',
        nameList: [],
        nameListErr: '',
        name: '',
        nameErr: '',
        oldGroupNm: '',
        groupNm: '',
        groupNmErr: '',
        password: '',
        passwordErr: '',
        passwordAction: 0,
        isDefault: false,
        deleteCheckId: 0,
      }
      state.requestPopupTypes = {
        isOpen: false,
        type: '',
        selectedList: [],
        selectedValue: { id: '', name: '' },
        titleErr: '',
        title: '',
        contents: '',
        contentsErr: '',
        filesList: [],
        name: '',
        nameErr: '',
        phoneNm: '',
        phoneNmErr: '',
        email: '',
        emailErr: '',
        telephone: '',
      }
      state.requestSearchParams = {
        page: 1,
        size: 20,
        sort: ['regisAt!desc'],
        keyword: '',
        searchUserId: -1,
      }
      state.searchUserId = ''
      state.userList = []
      state.companyGroupOptions = []
      state.groupList = []
      state.pageCount = {
        totalCount: 0,
        totalPageCount: 1,
      }
      state.requestSearchText = ''
      state.pageGroupList = []
      state.isLoading = false
    },
  },
})

export const {
  initAction,
  requestPopupTypesAction,
  initUserProfilePopupAction,
  setListAction,
  initRequestPopupTypesAction,
  userProfilePopupAction,
  requestSearchParamsAction,
  companyGroupOptionsAction,
  initGroupNmChangePopupAction,
  setPageGroupListAction,
  requestSearchTextAction,
  isLoadingAction,
} = adminGroupSlice.actions
export default adminGroupSlice.reducer
