import type { PayloadAction } from '@reduxjs/toolkit'
import { all, fork, put, takeLatest } from 'redux-saga/effects'

import { mediaCategoryChangedAction } from '~/stores/modules/contents/pressMedia/mediaListManagement'
import { pressCategoryChangedAction } from '~/stores/modules/contents/pressMedia/pressListManagement'
import {
  categoryDataAction,
  categoryDataManagementSaga,
  categoryListProps,
  savedSearchManagementSaga,
} from '~/stores/modules/contents/pressMedia/pressMediaListManagement'

function* savedSearchManagement(action: PayloadAction<string>) {
  try {
    yield put(mediaCategoryChangedAction())
    yield put(pressCategoryChangedAction())
    yield put(
      categoryDataAction({ id: action.payload, name: action.payload === 'press' ? '언론인' : '미디어', count: 0 })
    )
  } catch (error: any) {}
}

function* categoryDataManagement(action: PayloadAction<categoryListProps>) {
  try {
    yield put(mediaCategoryChangedAction())
    yield put(pressCategoryChangedAction())
    yield put(categoryDataAction(action.payload))
  } catch (error: any) {}
}

function* watchLoadAuth() {
  yield takeLatest(savedSearchManagementSaga, savedSearchManagement)
  yield takeLatest(categoryDataManagementSaga, categoryDataManagement)
}

export default function* pressMediaListSaga() {
  yield all([fork(watchLoadAuth)])
}
