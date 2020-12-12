import { put, takeEvery } from 'redux-saga/effects'
import { SAVE_POST } from '../../types'
import { savePost, default as watcher } from '../savePost'

describe('CLEAR_CURRENT_POST', () => {
  it('Watcher should work', () => {
    const gen = watcher()
    expect(gen.next().value).toEqual(takeEvery(SAVE_POST, savePost))
    expect(gen.next().done).toEqual(true)
  })
  it('Worker should work', () => {
    const post = {
      id: 1,
      userId: 2,
      title: 'HEHE',
      body: 'HAHA'
    }
    const gen = savePost({ payload: post })
    expect(gen.next().value).toEqual(
      put({ type: 'UPDATE_POST', payload: post })
    )
    expect(gen.next().done).toEqual(true)
  })
})
