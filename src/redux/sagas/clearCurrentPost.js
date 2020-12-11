import { put, takeEvery } from 'redux-saga/effects'
import { CLEAR_CURRENT_POST } from '../types'

function* clearCurrentPost() {
  yield put({ type: 'CLEAR_ACTIVE_POST' })
}

export default function* clearCurrentPostWatcher() {
  yield takeEvery(CLEAR_CURRENT_POST, clearCurrentPost)
}
