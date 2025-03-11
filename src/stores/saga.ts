import { all, fork } from 'redux-saga/effects'

import activitySaga from '~/stores/saga/activitySaga'
import authSaga from '~/stores/saga/authSaga'
import emailSaga from '~/stores/saga/emailSaga'
import extraSage from '~/stores/saga/extraSage'
import pressMediaListSaga from '~/stores/saga/pressMediaListSaga'
import savedSearchSaga from '~/stores/saga/savedSearchSaga'

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(extraSage),
    fork(activitySaga),
    fork(emailSaga),
    fork(savedSearchSaga),
    fork(pressMediaListSaga),
  ])
}
