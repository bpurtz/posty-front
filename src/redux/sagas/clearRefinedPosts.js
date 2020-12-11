import { takeEvery, put } from 'redux-saga/effects'
import { CLEAR_REFINED_POSTS } from '../types'

function* clearRefinedPosts() {
  yield put({ type: 'CLEAR_REFINED' })
}

export default function* clearRefinedPostsWatcher() {
  yield takeEvery(CLEAR_REFINED_POSTS, clearRefinedPosts)
}
