import { put, takeLatest } from 'redux-saga/effects'
import { SEARCH_POSTS } from '../../types'
import { searchPosts, default as watcher } from '../searchPosts'

describe('CLEAR_CURRENT_POST', () => {
  it('Watcher should work', () => {
    const gen = watcher()
    expect(gen.next().value).toEqual(takeLatest(SEARCH_POSTS, searchPosts))
    expect(gen.next().done).toEqual(true)
  })
  it('Worker should work', () => {
    const title = 'Hello ther'
    const gen = searchPosts({ payload: title })
    expect(gen.next().value).toEqual(
      put({ type: 'REFINE_POSTS', payload: title })
    )
    expect(gen.next().done).toEqual(true)
  })
})
