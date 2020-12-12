import { put, takeEvery, call } from 'redux-saga/effects'
import getPostsData from '../../data/getPostsData'
import { INIT_POSTS } from '../types'

export function* initPosts() {
  try {
    console.log('SAGA INIT')
    yield put({ type: 'SET_LOADING', payload: true })
    const posts = yield call(getPostsData)
    if (posts.status !== 200) {
      yield put({
        type: 'SET_ERROR',
        payload: posts.data.message
      })
    } else {
      yield put({ type: 'SET_POSTS', payload: posts.data })
    }
    yield put({ type: 'SET_LOADING', payload: false })
  } catch (e) {
    yield put({
      type: 'SET_ERROR',
      payload: 'An error occured when fetching the posts.'
    })
  }
}

export default function* watchGetPosts() {
  yield takeEvery(INIT_POSTS, initPosts)
}
