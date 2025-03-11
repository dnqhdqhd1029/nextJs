import { AnyAction, combineReducers } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import commonVariables, { initialState as commonVariablesInit } from '~/stores/modules/common/commonVariables'
import activityListSlice, {
  initialState as activityListSliceInit,
} from '~/stores/modules/contents/activity/activityList'
import activityPopupSlice, {
  initialState as activityPopupSliceInit,
} from '~/stores/modules/contents/activity/activityPopup'
import recordActivitySlice, {
  initialState as recordActivitySliceInit,
} from '~/stores/modules/contents/activity/recordActivity'
import searchActivitySlice, {
  initialState as searchActivitySliceInit,
} from '~/stores/modules/contents/activity/searchActivity'
import tagActivitySlice, { initialState as tagActivitySliceInit } from '~/stores/modules/contents/activity/tagActivity'
import additionalServicesSlice, {
  initialState as additionalServicesSliceInit,
} from '~/stores/modules/contents/additionalServices/additionalServices'
import addUserSlice, { initialState as addUserSliceInit } from '~/stores/modules/contents/admin/addUser'
import adminGroupSlice, { initialState as adminGroupSliceInit } from '~/stores/modules/contents/admin/adminGroup'
import adminUserSlice, { initialState as adminUserSliceInit } from '~/stores/modules/contents/admin/adminUser'
import authSlice, { initialState as authSliceInit } from '~/stores/modules/contents/auth/auth'
import customerCenterSlice, {
  initialState as customerCenterSliceInit,
} from '~/stores/modules/contents/customerCenter/customerCenter'
import dashboardSlice, { initialState as dashboardSliceInit } from '~/stores/modules/contents/dashboard/dashboardSlice'
import demoSlice, { initialState as demoSliceInit } from '~/stores/modules/contents/demo/demo'
import draftSlice, { initialState as draftSliceInit } from '~/stores/modules/contents/draft/draft'
import emailSlice, { initialState as emailSliceInit } from '~/stores/modules/contents/email/email'
import extraSlice, { initialState as extraSliceInit } from '~/stores/modules/contents/extraData/extra'
import generatePressReleaseSlice, {
  initialState as generatePressReleaseSliceInit,
} from '~/stores/modules/contents/generatePressRelease/generatePressRelease'
import globalSearchSlice, {
  initialState as globalSearchSliceInit,
} from '~/stores/modules/contents/globalSearch/globalSearch'
import headerSlice, { initialState as headerSliceInit } from '~/stores/modules/contents/header/header'
import loginSlice, { initialState as loginSliceInit } from '~/stores/modules/contents/login/login'
import mailInfoLinkSlice, {
  initialState as mailInfoLinkSliceInit,
} from '~/stores/modules/contents/mailInfoLink/mailInfoLink'
import monitoringClipbookSlice, {
  initialState as monitoringClipbookSliceInit,
} from '~/stores/modules/contents/monitoring/clipbook'
import monitoringClipbookDetailSlice, {
  initialState as monitoringClipbookDetailSliceInit,
} from '~/stores/modules/contents/monitoring/clipbookDetail'
import clipbookListPopupSlice, {
  initialState as clipbookListPopupSliceInit,
} from '~/stores/modules/contents/monitoring/clipbookListPopup'
import clipbookPopupSlice, {
  initialState as clipbookPopupSliceInit,
} from '~/stores/modules/contents/monitoring/clipbookPopup'
import monitoringManagementSlice, {
  initialState as monitoringManagementSliceInit,
} from '~/stores/modules/contents/monitoring/management'
import monitoringPopupSlice, {
  initialState as monitoringPopupSliceInit,
} from '~/stores/modules/contents/monitoring/monitoringPopup'
import monitoringSearchSlice, {
  initialState as monitoringSearchSliceInit,
} from '~/stores/modules/contents/monitoring/monitoringSearch'
import monitoringTagSlice, {
  initialState as monitoringTagSliceInit,
} from '~/stores/modules/contents/monitoring/monitoringTag'
import newsDetailSlice, { initialState as newsDetailSliceInit } from '~/stores/modules/contents/monitoring/newsDetail'
import newsSearchOptionsSlice, {
  initialState as newsSearchOptionsSliceInit,
} from '~/stores/modules/contents/monitoring/newsSearch'
import newsSearchResultSlice, {
  initialState as newsSearchResultSliceInit,
} from '~/stores/modules/contents/monitoring/newsSearchResult'
import registerNews, { initialState as registerNewsInit } from '~/stores/modules/contents/monitoring/registerNews'
import myLicenseSlice, { initialState as myLicenseSliceInit } from '~/stores/modules/contents/myLicense/myLicense'
import myPurchaseSlice, { initialState as myPurchaseSliceInit } from '~/stores/modules/contents/myPurchase/myPurchase'
import newsAlertSlice, { initialState as newsAlertSliceInit } from '~/stores/modules/contents/newsAlert/newsAlert'
import newswireReleaseSlice, {
  initialState as newswireReleaseSliceInit,
} from '~/stores/modules/contents/newswireRelease/newswireRelease'
import userPasswordSlice, {
  initialState as userPasswordSliceInit,
} from '~/stores/modules/contents/password/userPassword'
import paymentSlice, { initialState as paymentSliceInit } from '~/stores/modules/contents/payment/payment'
import pressMediaListResultSlice, {
  initialState as pressMediaListResultSliceInit,
} from '~/stores/modules/contents/pressMedia/listResult'
import mediabriefingSlice, {
  initialState as mediabriefingSliceInit,
} from '~/stores/modules/contents/pressMedia/mediaBriefing'
import mediaListManagementSlice, {
  initialState as mediaListManagementSliceInit,
} from '~/stores/modules/contents/pressMedia/mediaListManagement'
import mediaProfileSlice, {
  initialState as mediaProfileSliceInit,
} from '~/stores/modules/contents/pressMedia/mediaProfile'
import mediaSearchSlice, {
  initialState as mediaSearchSliceInit,
} from '~/stores/modules/contents/pressMedia/mediaSearch'
import mediaSearchManagementSlice, {
  initialState as mediaSearchManagementSliceInit,
} from '~/stores/modules/contents/pressMedia/mediaSearchManagement'
import pressListManagementSlice, {
  initialState as pressListManagementSliceInit,
} from '~/stores/modules/contents/pressMedia/pressListManagement'
import pressMediaListBookPopupSlice, {
  initialState as pressMediaListBookPopupSliceInit,
} from '~/stores/modules/contents/pressMedia/pressMediaListBookPopup'
import pressMediaListManagementSlice, {
  initialState as pressMediaListManagementSliceInit,
} from '~/stores/modules/contents/pressMedia/pressMediaListManagement'
import pressMediaListResult, {
  initialState as pressMediaListResultInit,
} from '~/stores/modules/contents/pressMedia/pressMediaListResult'
import pressMediaSearchOptionsSlice, {
  initialState as pressMediaSearchOptionsSliceInit,
} from '~/stores/modules/contents/pressMedia/pressMediaSearch'
import pressMediaSearchResultSlice, {
  initialState as pressMediaSearchResultSliceInit,
} from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import pressProfileSlice, {
  initialState as pressProfileSliceInit,
} from '~/stores/modules/contents/pressMedia/pressProfile'
import pressSearchSlice, {
  initialState as pressSearchSliceInit,
} from '~/stores/modules/contents/pressMedia/pressSearch'
import pressSearchManagementSlice, {
  initialState as pressSearchManagementSliceInit,
} from '~/stores/modules/contents/pressMedia/pressSearchManagement'
import registerPressMediaSlice, {
  initialState as registerPressMediaSliceInit,
} from '~/stores/modules/contents/pressMedia/registerPressMedia'
import savedSearchSlice, {
  initialState as savedSearchSliceInit,
} from '~/stores/modules/contents/pressMedia/savedSearch'
import savedSearchManagementSlice, {
  initialState as savedSearchManagementSliceInit,
} from '~/stores/modules/contents/pressMedia/savedSearchManagement'
import pressReleaseSlice, {
  initialState as pressReleaseSliceInit,
} from '~/stores/modules/contents/pressRelease/pressRelease'
import purchaseRequestSlice, {
  initialState as purchaseRequestSliceInit,
} from '~/stores/modules/contents/purchaseRequest/purchaseRequest'
import registerUserSlice, {
  initialState as registerUserSliceInit,
} from '~/stores/modules/contents/register/useRegisterUser'
import salesSlice, { initialState as salesSliceInit } from '~/stores/modules/contents/sales/sales'
import userSettingSlice, { initialState as userSettingSliceInit } from '~/stores/modules/contents/setting/setting'
import sharedSlice, { initialState as sharedSliceInit } from '~/stores/modules/contents/shared/shared'
import testSlice, { initialState as testSliceInit } from '~/stores/modules/contents/test/test'
import userSlice, { initialState as userSliceInit } from '~/stores/modules/contents/user/user'
import userRegisterSlice, {
  initialState as userRegisterSliceInit,
} from '~/stores/modules/contents/userRegister/userRegister'

const combinedReducer = combineReducers({
  userSlice,
  dashboardSlice,
  commonVariables,
  additionalServicesSlice,
  addUserSlice,
  adminGroupSlice,
  adminUserSlice,
  authSlice,
  customerCenterSlice,
  draftSlice,
  emailSlice,
  demoSlice,
  salesSlice,
  headerSlice,
  mailInfoLinkSlice,
  registerNews,
  myLicenseSlice,
  generatePressReleaseSlice,
  newsAlertSlice,
  myPurchaseSlice,
  userPasswordSlice,
  paymentSlice,
  pressMediaListResult,
  purchaseRequestSlice,
  registerUserSlice,
  userSettingSlice,
  loginSlice,
  searchActivitySlice,
  activityPopupSlice,
  tagActivitySlice,
  monitoringTagSlice,
  recordActivitySlice,
  monitoringManagementSlice,
  monitoringPopupSlice,
  pressReleaseSlice,
  sharedSlice,
  monitoringClipbookSlice,
  monitoringClipbookDetailSlice,
  clipbookPopupSlice,
  mediabriefingSlice,
  savedSearchManagementSlice,
  pressSearchManagementSlice,
  mediaSearchManagementSlice,
  pressMediaListManagementSlice,
  pressListManagementSlice,
  mediaListManagementSlice,
  extraSlice,
  registerPressMediaSlice,
  newsSearchOptionsSlice,
  monitoringSearchSlice,
  newsSearchResultSlice,
  clipbookListPopupSlice,
  pressMediaListBookPopupSlice,
  newsDetailSlice,
  pressMediaSearchOptionsSlice,
  pressMediaSearchResultSlice,
  mediaProfileSlice,
  pressProfileSlice,
  savedSearchSlice,
  globalSearchSlice,
  pressMediaListResultSlice,
  activityListSlice,
  newswireReleaseSlice,
  pressSearchSlice,
  mediaSearchSlice,
  testSlice,
  userRegisterSlice,
})

// combinedReducer의 반환 타입을 얻습니다.
type CombinedState = ReturnType<typeof combinedReducer>

// RESET_STATE 액션 타입 정의
const RESET_STATE = 'RESET_STATE'

export const rootReducer = (state: CombinedState | undefined, action: AnyAction): CombinedState => {
  if (action.type === HYDRATE) {
    return {
      ...state, // 이전 상태 사용
      ...action.payload, // hydration에서 오는 변경 사항 적용
    }
  } else if (action.type === RESET_STATE) {
    // 모든 상태를 초기화

    //return combinedReducer(undefined, action)

    return {
      userSlice: userSlice(userSliceInit, action), // 초기 상태 반환
      dashboardSlice: dashboardSlice(dashboardSliceInit, action), // 초기 상태 반환
      commonVariables: commonVariables(commonVariablesInit, action), // 초기 상태 반환
      additionalServicesSlice: additionalServicesSlice(additionalServicesSliceInit, action), // 초기 상태 반환
      addUserSlice: addUserSlice(addUserSliceInit, action), // 초기 상태 반환
      adminGroupSlice: adminGroupSlice(adminGroupSliceInit, action), // 초기 상태 반환
      adminUserSlice: adminUserSlice(adminUserSliceInit, action), // 초기 상태 반환
      authSlice: authSlice(authSliceInit, action), // 초기 상태 반환
      customerCenterSlice: customerCenterSlice(customerCenterSliceInit, action), // 초기 상태 반환
      draftSlice: draftSlice(draftSliceInit, action), // 초기 상태 반환
      emailSlice: emailSlice(emailSliceInit, action), // 초기 상태 반환
      headerSlice: headerSlice(headerSliceInit, action), // 초기 상태 반환
      mailInfoLinkSlice: mailInfoLinkSlice(mailInfoLinkSliceInit, action), // 초기 상태 반환
      registerNews: registerNews(registerNewsInit, action), // 초기 상태 반환
      myLicenseSlice: myLicenseSlice(myLicenseSliceInit, action), // 초기 상태 반환
      generatePressReleaseSlice: generatePressReleaseSlice(generatePressReleaseSliceInit, action), // 초기 상태 반환
      newsAlertSlice: newsAlertSlice(newsAlertSliceInit, action), // 초기 상태 반환
      myPurchaseSlice: myPurchaseSlice(myPurchaseSliceInit, action), // 초기 상태 반환
      userPasswordSlice: userPasswordSlice(userPasswordSliceInit, action), // 초기 상태 반환
      paymentSlice: paymentSlice(paymentSliceInit, action), // 초기 상태 반환
      pressMediaListResult: pressMediaListResult(pressMediaListResultInit, action), // 초기 상태 반환
      purchaseRequestSlice: purchaseRequestSlice(purchaseRequestSliceInit, action), // 초기 상태 반환
      registerUserSlice: registerUserSlice(registerUserSliceInit, action), // 초기 상태 반환
      userSettingSlice: userSettingSlice(userSettingSliceInit, action), // 초기 상태 반환
      loginSlice: loginSlice(loginSliceInit, action), // 초기 상태 반환
      searchActivitySlice: searchActivitySlice(searchActivitySliceInit, action), // 초기 상태 반환
      activityPopupSlice: activityPopupSlice(activityPopupSliceInit, action), // 초기 상태 반환
      tagActivitySlice: tagActivitySlice(tagActivitySliceInit, action), // 초기 상태 반환
      monitoringTagSlice: monitoringTagSlice(monitoringTagSliceInit, action), // 초기 상태 반환
      recordActivitySlice: recordActivitySlice(recordActivitySliceInit, action), // 초기 상태 반환
      monitoringManagementSlice: monitoringManagementSlice(monitoringManagementSliceInit, action), // 초기 상태 반환
      monitoringPopupSlice: monitoringPopupSlice(monitoringPopupSliceInit, action), // 초기 상태 반환
      pressReleaseSlice: pressReleaseSlice(pressReleaseSliceInit, action), // 초기 상태 반환
      sharedSlice: sharedSlice(sharedSliceInit, action), // 초기 상태 반환
      monitoringClipbookSlice: monitoringClipbookSlice(monitoringClipbookSliceInit, action), // 초기 상태 반환
      monitoringClipbookDetailSlice: monitoringClipbookDetailSlice(monitoringClipbookDetailSliceInit, action), // 초기 상태 반환
      clipbookPopupSlice: clipbookPopupSlice(clipbookPopupSliceInit, action), // 초기 상태 반환
      mediabriefingSlice: mediabriefingSlice(mediabriefingSliceInit, action), // 초기 상태 반환
      savedSearchManagementSlice: savedSearchManagementSlice(savedSearchManagementSliceInit, action), // 초기 상태 반환
      pressSearchManagementSlice: pressSearchManagementSlice(pressSearchManagementSliceInit, action), // 초기 상태 반환
      mediaSearchManagementSlice: mediaSearchManagementSlice(mediaSearchManagementSliceInit, action), // 초기 상태 반환
      pressMediaListManagementSlice: pressMediaListManagementSlice(pressMediaListManagementSliceInit, action), // 초기 상태 반환
      pressListManagementSlice: pressListManagementSlice(pressListManagementSliceInit, action), // 초기 상태 반환
      mediaListManagementSlice: mediaListManagementSlice(mediaListManagementSliceInit, action), // 초기 상태 반환
      extraSlice: extraSlice(extraSliceInit, action), // 초기 상태 반환
      registerPressMediaSlice: registerPressMediaSlice(registerPressMediaSliceInit, action), // 초기 상태 반환
      newsSearchOptionsSlice: newsSearchOptionsSlice(newsSearchOptionsSliceInit, action), // 초기 상태 반환
      monitoringSearchSlice: monitoringSearchSlice(monitoringSearchSliceInit, action), // 초기 상태 반환
      newsSearchResultSlice: newsSearchResultSlice(newsSearchResultSliceInit, action), // 초기 상태 반환
      clipbookListPopupSlice: clipbookListPopupSlice(clipbookListPopupSliceInit, action), // 초기 상태 반환
      pressMediaListBookPopupSlice: pressMediaListBookPopupSlice(pressMediaListBookPopupSliceInit, action), // 초기 상태 반환
      newsDetailSlice: newsDetailSlice(newsDetailSliceInit, action), // 초기 상태 반환
      pressMediaSearchOptionsSlice: pressMediaSearchOptionsSlice(pressMediaSearchOptionsSliceInit, action), // 초기 상태 반환
      pressMediaSearchResultSlice: pressMediaSearchResultSlice(pressMediaSearchResultSliceInit, action), // 초기 상태 반환
      mediaProfileSlice: mediaProfileSlice(mediaProfileSliceInit, action), // 초기 상태 반환
      pressProfileSlice: pressProfileSlice(pressProfileSliceInit, action), // 초기 상태 반환
      savedSearchSlice: savedSearchSlice(savedSearchSliceInit, action), // 초기 상태 반환
      globalSearchSlice: globalSearchSlice(globalSearchSliceInit, action), // 초기 상태 반환
      pressMediaListResultSlice: pressMediaListResultSlice(pressMediaListResultSliceInit, action), // 초기 상태 반환
      activityListSlice: activityListSlice(activityListSliceInit, action), // 초기 상태 반환
      newswireReleaseSlice: newswireReleaseSlice(newswireReleaseSliceInit, action), // 초기 상태 반환
      pressSearchSlice: pressSearchSlice(pressSearchSliceInit, action), // 초기 상태 반환
      mediaSearchSlice: mediaSearchSlice(mediaSearchSliceInit, action), // 초기 상태 반환
      demoSlice: demoSlice(demoSliceInit, action), // 초기 상태 반환
      salesSlice: salesSlice(salesSliceInit, action), // 초기 상태 반환
      testSlice: testSlice(testSliceInit, action), // 초기 상태 반환
      userRegisterSlice: userRegisterSlice(userRegisterSliceInit, action), // 초기 상태 반환
    }
  } else {
    return combinedReducer(state, action)
  }
}

// 상태 초기화 액션 크리에이터
export const resetState = () => ({ type: RESET_STATE })
