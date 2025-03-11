import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { GroupDtoForUser } from '~/types/api/service'
import { NavigationLinkItem } from '~/types/common'
import type { GroupDto } from '~/utils/api/group/useGetGroupSearch'

export type Props = {
  isLoading: boolean
  groupBar: boolean
  menuBar: boolean
  useAllGroupByUserLoading: boolean
  naviBar: string
  currentNaviBar: string
  currentGroup: GroupDtoForUser
  menuLinks: NavigationLinkItem[]
  menuNavigationList: menuNavigationListProps[]
  userAllGroups: GroupDto[]
  isChangedGroup: GroupDtoForUser | null
}

export type menuNavigationListProps = {
  title: string
  id: string
  subMenus: subMenusProps[]
}

export type subMenusProps = {
  id: string
  title: string
  link: string
}

// 초기값
export const initialState: Props = {
  isLoading: false,
  groupBar: false,
  menuBar: false,
  useAllGroupByUserLoading: false,
  naviBar: '',
  currentNaviBar: '',
  currentGroup: {
    groupId: 0,
    name: '',
    isDefault: false,
  },
  menuLinks: [],
  menuNavigationList: [],
  userAllGroups: [],
  isChangedGroup: null,
}

const headerSlice = createSlice({
  name: 'headerSlice',
  initialState,
  reducers: {
    selectDefaultUserGroupAction: (
      state,
      action: PayloadAction<{ currentGroup: GroupDtoForUser; groupBar: boolean; isLoading: boolean }>
    ) => {
      state.currentGroup = action.payload.currentGroup
      state.isChangedGroup = null
      state.groupBar = action.payload.groupBar
      state.isLoading = action.payload.isLoading
    },
    setCurrentGroupAction: (state, action: PayloadAction<GroupDtoForUser>) => {
      state.currentGroup = action.payload
    },
    userGroupsAction: (state, action: PayloadAction<GroupDto[]>) => {
      state.userAllGroups = action.payload
    },
    isLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    allGroupByUserLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.useAllGroupByUserLoading = action.payload
    },
    menuNavigationListAction: (state, action: PayloadAction<menuNavigationListProps[]>) => {
      state.menuNavigationList = action.payload
    },
    groupBarAction: (state, action: PayloadAction<boolean>) => {
      state.groupBar = action.payload
    },
    naviBarAction: (state, action: PayloadAction<string>) => {
      state.naviBar = action.payload
    },
    currentNaviBarAction: (state, action: PayloadAction<string>) => {
      state.currentNaviBar = action.payload
      state.naviBar = ''
    },
    menuBarAction: (state, action: PayloadAction<boolean>) => {
      state.menuBar = action.payload
    },
    isChangedGroupAction: (state, action: PayloadAction<GroupDtoForUser>) => {
      console.log(' action.payload', action.payload)
      state.isChangedGroup = action.payload
    },
    resetMenuAction: (
      state,
      action: PayloadAction<{
        menuNavigationList: menuNavigationListProps[]
        menuLinks: NavigationLinkItem[]
        currentGroup: GroupDtoForUser
        groupBar: boolean
        isLoading: boolean
      }>
    ) => {
      state.currentGroup = action.payload.currentGroup
      state.isChangedGroup = null
      state.groupBar = action.payload.groupBar
      state.isLoading = action.payload.isLoading
      state.menuLinks = action.payload.menuLinks
      state.menuNavigationList = action.payload.menuNavigationList
    },
    licenseMenuAction: (
      state,
      action: PayloadAction<{ menuNavigationList: menuNavigationListProps[]; menuLinks: NavigationLinkItem[] }>
    ) => {
      console.log('licenseMenuAction', action.payload)
      state.menuLinks = action.payload.menuLinks
      state.menuNavigationList = action.payload.menuNavigationList
    },
  },
})

export const {
  menuBarAction,
  groupBarAction,
  isLoadingAction,
  selectDefaultUserGroupAction,
  menuNavigationListAction,
  allGroupByUserLoadingAction,
  userGroupsAction,
  naviBarAction,
  currentNaviBarAction,
  licenseMenuAction,
  resetMenuAction,
  isChangedGroupAction,
  setCurrentGroupAction,
} = headerSlice.actions
export default headerSlice.reducer
