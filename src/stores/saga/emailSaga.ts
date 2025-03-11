import { all, fork, put, takeLatest } from 'redux-saga/effects'

import { noticeRecordNewEmailAction } from '~/stores/modules/contents/activity/recordActivity'
import { noticeNewEmailAction } from '~/stores/modules/contents/activity/searchActivity'
import { noticeNewEmailDraftAction } from '~/stores/modules/contents/draft/draft'
import { emailActionSaga, initEmail } from '~/stores/modules/contents/email/email'

function* noticeEmail() {
  try {
    yield put(initEmail())
    yield put(noticeNewEmailAction(true))
    yield put(noticeNewEmailDraftAction(true))
    yield put(noticeRecordNewEmailAction(true))
  } catch (error: any) {}
}

function* watchLoadEmail() {
  yield takeLatest(emailActionSaga, noticeEmail)
}

export default function* emailSaga() {
  yield all([fork(watchLoadEmail)])
}
