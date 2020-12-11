import { all } from 'redux-saga/effects'

import initPosts from './initPosts'
import savePost from './savePost'
import searchPosts from './searchPosts'
import clearRefinedPosts from './clearRefinedPosts'
import setCurrentPost from './setCurrentPost'
import clearCurrentPost from './clearCurrentPost'

export default function* rootSaga() {
  yield all([
    clearCurrentPost(),
    setCurrentPost(),
    initPosts(),
    savePost(),
    searchPosts(),
    clearRefinedPosts()
  ])
}
