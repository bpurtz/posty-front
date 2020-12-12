import { put, takeEvery } from 'redux-saga/effects'
import { CLEAR_CURRENT_POST } from '../../types'
import { clearCurrentPost, default as watcher } from '../clearCurrentPost'

describe('CLEAR_CURRENT_POST', () => {
  it('Watcher should work', () => {
    const gen = watcher()
    expect(gen.next().value).toEqual(
      takeEvery(CLEAR_CURRENT_POST, clearCurrentPost)
    )
    expect(gen.next().done).toEqual(true)
  })
  it('Worker should work', () => {
    const gen = clearCurrentPost()
    expect(gen.next().value).toEqual(put({ type: 'CLEAR_ACTIVE_POST' }))
    expect(gen.next().done).toEqual(true)
  })
})
