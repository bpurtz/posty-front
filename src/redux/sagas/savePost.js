import { put, takeEvery } from 'redux-saga/effects'
import { SAVE_POST } from '../types'

/**
 *
 * @param {object} payload An object with all of the fields you wish to update. Must contain the id of the post you wish to update
 */
export function* savePost({ payload }) {
  yield put({ type: 'UPDATE_POST', payload })
}

export default function* savePostWatcher() {
  yield takeEvery(SAVE_POST, savePost)
}
