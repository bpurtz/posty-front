import { put, takeEvery } from 'redux-saga/effects'
import { CLEAR_REFINED_POSTS } from '../../types'
import { clearRefinedPosts, default as watcher } from '../clearRefinedPosts'

describe('CLEAR_REFINED_POSTS', () => {
  it('Watcher should work', () => {
    const gen = watcher()
    expect(gen.next().value).toEqual(
      takeEvery(CLEAR_REFINED_POSTS, clearRefinedPosts)
    )
    expect(gen.next().done).toEqual(true)
  })
  it('Worker should work', () => {
    const gen = clearRefinedPosts()
    expect(gen.next().value).toEqual(put({ type: 'CLEAR_REFINED' }))
    expect(gen.next().done).toEqual(true)
  })
})
