import { takeLatest, put } from 'redux-saga/effects'
import { SEARCH_POSTS } from '../types'

/**
 *
 * @param {string} payload The title that you wish to use to refine the posts and populate the refinedPosts state field
 */
function* searchPosts({ payload }) {
  yield put({ type: 'REFINE_POSTS', payload })
}

export default function* searchPostsWatcher() {
  yield takeLatest(SEARCH_POSTS, searchPosts)
}
