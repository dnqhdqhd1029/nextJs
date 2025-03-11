import type { PayloadAction } from '@reduxjs/toolkit'
import { all, fork, put, takeLatest } from 'redux-saga/effects'

import {
  mediaDuplicationIdListAction,
  mediaDuplicationIdListSaga,
  newsDuplicationIdListAction,
  newsDuplicationIdListSaga,
  pressDuplicationIdListAction,
  pressDuplicationIdListSaga,
} from '~/stores/modules/contents/extraData/extra'
import { clipbookNewsCheckDuplicateParamAction } from '~/stores/modules/contents/monitoring/clipbookDetail'
import { monitoringNewsCheckDuplicateParamAction } from '~/stores/modules/contents/monitoring/monitoringSearch'
import { newsDetailCheckDuplicateParamAction } from '~/stores/modules/contents/monitoring/newsDetail'
import { newsCheckDuplicateParamAction } from '~/stores/modules/contents/monitoring/newsSearchResult'
import {
  checkMediaListUserMediaAction,
  checkPressListUserPressAction,
} from '~/stores/modules/contents/pressMedia/listResult'
import { mediaCheckDuplicateParamAction } from '~/stores/modules/contents/pressMedia/mediaProfile'
import {
  checkSearchResultUserMediaAction,
  checkSearchResultUserPressAction,
} from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import { journalCheckDuplicateParamAction } from '~/stores/modules/contents/pressMedia/pressProfile'
import {
  checkSavedSearchUserMediaAction,
  checkSavedSearchUserPressAction,
} from '~/stores/modules/contents/pressMedia/savedSearch'

function* NewsDuplicationCloseAction(action: PayloadAction<number[]>) {
  try {
    yield put(newsDuplicationIdListAction(action.payload))
    yield put(newsCheckDuplicateParamAction(null))
    yield put(newsDetailCheckDuplicateParamAction(null))
    yield put(clipbookNewsCheckDuplicateParamAction(null))
    yield put(monitoringNewsCheckDuplicateParamAction(null))
  } catch (error: any) {}
}

function* MediaDuplicationCloseAction(action: PayloadAction<number[]>) {
  try {
    yield put(mediaDuplicationIdListAction(action.payload))
    yield put(mediaCheckDuplicateParamAction(null))
    yield put(checkSearchResultUserMediaAction(null))
    yield put(checkSavedSearchUserMediaAction(null))
    yield put(checkMediaListUserMediaAction(null))
  } catch (error: any) {}
}

function* PressDuplicationCloseAction(action: PayloadAction<number[]>) {
  try {
    yield put(pressDuplicationIdListAction(action.payload))
    yield put(checkSearchResultUserPressAction(null))
    yield put(journalCheckDuplicateParamAction(null))
    yield put(checkSavedSearchUserPressAction(null))
    yield put(checkPressListUserPressAction(null))
  } catch (error: any) {}
}

function* watchLoadAuth() {
  yield takeLatest(newsDuplicationIdListSaga, NewsDuplicationCloseAction)
  yield takeLatest(mediaDuplicationIdListSaga, MediaDuplicationCloseAction)
  yield takeLatest(pressDuplicationIdListSaga, PressDuplicationCloseAction)
}

export default function* extraSaga() {
  yield all([fork(watchLoadAuth)])
}
