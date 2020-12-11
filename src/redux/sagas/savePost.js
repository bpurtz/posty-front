import { put, takeEvery } from 'redux-saga/effects'
import { SAVE_POST } from '../types'

/**
 *
 * @param {object} payload An object with all of the fields you wish to update. Must contain the id of the post you wish to update
 */
function* updatePost({ payload }) {
  yield put({ type: 'UPDATE_POST', payload })
}

export default function* updatePostWatcher() {
  yield takeEvery(SAVE_POST, updatePost)
}
