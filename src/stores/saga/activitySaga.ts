import { all, fork, put, takeLatest } from 'redux-saga/effects'

import {
  createActivitySaga,
  editActivitySaga,
  initActivityPopupAction,
} from '~/stores/modules/contents/activity/activityPopup'
import { noticeRecordNewActivityAction } from '~/stores/modules/contents/activity/recordActivity'
import { noticeNewActivityAction } from '~/stores/modules/contents/activity/searchActivity'

function* noticeActivity() {
  try {
    yield put(
      initActivityPopupAction({
        keyValue: 0,
        isOpen: false,
        loading: true,
        type: [],
        state: [],
        typeValue: { id: '', name: '' },
        scrop: { id: '', name: '' },
      })
    )
    yield put(noticeNewActivityAction(true))
  } catch (error: any) {}
}

function* noticeRecordActivity() {
  try {
    yield put(
      initActivityPopupAction({
        keyValue: 0,
        isOpen: false,
        loading: true,
        type: [],
        state: [],
        typeValue: { id: '', name: '' },
        scrop: { id: '', name: '' },
      })
    )
    yield put(noticeRecordNewActivityAction(true))
  } catch (error: any) {}
}

function* watchLoadAuth() {
  yield takeLatest(createActivitySaga, noticeActivity)
  yield takeLatest(editActivitySaga, noticeRecordActivity)
}

export default function* activitySaga() {
  yield all([fork(watchLoadAuth)])
}
