import { put, takeEvery } from 'redux-saga/effects'
import { SET_CURRENT_POST } from '../types'

/**
 *
 * @param {int || string} payload The id of the post that you wish to assign to the activePost state field
 */
function* setCurrentPost({ payload }) {
  yield put({ type: 'SET_ACTIVE_POST', payload })
}

export default function* setCurrentPostWatcher() {
  yield takeEvery(SET_CURRENT_POST, setCurrentPost)
}
