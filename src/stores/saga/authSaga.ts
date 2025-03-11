import type { PayloadAction } from '@reduxjs/toolkit'
import { all, fork, put, takeLatest } from 'redux-saga/effects'

import { adminMenuLinks, TRANSLATION_ITEMS, userMenuLinks } from '~/components/common/layouts/Header/defaultData'
import { initUserProfilePopupAction } from '~/stores/modules/contents/admin/adminUser'
import {
  frequentlyUsedCommonCodeAction,
  initProps,
  initUserAction,
  setLogInAction,
  setLogOutAction,
  setUserInfoAction,
  setUserInfoByAdminUser,
  setUserInfoBySettingPage,
  setUserInfoPasswordBySettingPage,
  UserInfoAuth,
} from '~/stores/modules/contents/auth/auth'
import { licenseMenuAction, selectDefaultUserGroupAction } from '~/stores/modules/contents/header/header'
import { initInputLoginAction } from '~/stores/modules/contents/login/login'
import {
  initResetPasswordPopupAction,
  initSettingsValueAction,
  initUpdateUserProfilePopupAction,
} from '~/stores/modules/contents/setting/setting'
import { resetState } from '~/stores/reducer'
import { SettingsDto } from '~/types/api/service'

function* setLogin(action: PayloadAction<initProps>) {
  try {
    let isAdminMenu = false
    if (!action.payload.licenseInfo.isExpired) {
      if (action.payload.licenseInfo.userLimit && action.payload.licenseInfo.userLimit > 1) {
        if (action.payload.userInfo.role === 'ADMIN') {
          isAdminMenu = true
        }
      }
    }
    yield put(initSettingsValueAction(action.payload.adminSetting))
    yield put(frequentlyUsedCommonCodeAction(action.payload.commonCodePreload))
    yield put(initUserAction(action.payload))
    yield put(
      selectDefaultUserGroupAction({ currentGroup: action.payload.currentGroup, groupBar: false, isLoading: false })
    )
    yield put(
      licenseMenuAction({
        menuNavigationList: action.payload.licenseInfo.isExpired ? [] : TRANSLATION_ITEMS,
        menuLinks: isAdminMenu ? adminMenuLinks : userMenuLinks,
      })
    )
    yield put(initInputLoginAction())
  } catch (error: any) {}
}

function* setLoginOut() {
  try {
    const params = {
      loggedIn: false,
      stayLoggedIn: false,
      licenseInfo: {},
      userInfo: {},
      userSelectGroup: 0,
      updateAt: '',
      needLicenseCheck: false,
      currentGroup: {
        groupId: 0,
        name: '',
        isDefault: false,
      },
      siteVersion: '1.0.1',
      globalNoti: [],
      userCountLimit: {
        isOpen: false,
        active: false,
      },
      timeZoneData: null,
      accessToken: '',
      shareCode: {
        list: 'READABLE',
        jrnlstMediaSrch: 'READABLE',
        clipbook: 'READABLE',
        news_search: 'READABLE',
        project: 'READABLE',
        action: 'READABLE',
        distribute: 'READABLE',
      },
      timeZone: 'Asia/Seoul',
      commonCodePreload: {
        version: 0,
        data: [],
      },
      isDemoLicense: false,
      adminSetting: [],
    }
    yield put(initUserAction(params))
    yield put(
      selectDefaultUserGroupAction({
        currentGroup: params.currentGroup,
        groupBar: false,
        isLoading: false,
      })
    )
    yield put(
      licenseMenuAction({
        menuNavigationList: [],
        menuLinks: [],
      })
    )
    //yield put(resetState())
  } catch (error: any) {}
}

function* setUserInfo(action: PayloadAction<UserInfoAuth>) {
  try {
    yield put(initUpdateUserProfilePopupAction())
    yield put(setUserInfoAction(action.payload))
  } catch (error: any) {}
}

function* setPasswordResetUserInfo(action: PayloadAction<UserInfoAuth>) {
  try {
    yield put(initResetPasswordPopupAction())
    yield put(setUserInfoAction(action.payload))
  } catch (error: any) {}
}

function* setAdminUser(action: PayloadAction<UserInfoAuth>) {
  try {
    yield put(
      initUserProfilePopupAction({
        isLoading: false,
        isOpen: false,
        type: '',
        keyValue: 0,
      })
    )
    yield put(setUserInfoAction(action.payload))
  } catch (error: any) {}
}

function* watchLoadAuth() {
  yield takeLatest(setLogInAction, setLogin),
    yield takeLatest(setLogOutAction, setLoginOut),
    yield takeLatest(setUserInfoBySettingPage, setUserInfo),
    yield takeLatest(setUserInfoPasswordBySettingPage, setPasswordResetUserInfo),
    yield takeLatest(setUserInfoByAdminUser, setAdminUser)
}

export default function* authSaga() {
  yield all([fork(watchLoadAuth)])
}
