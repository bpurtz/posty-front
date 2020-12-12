import { put, takeEvery } from 'redux-saga/effects'
import { SET_CURRENT_POST } from '../../types'
import { setCurrentPost, default as watcher } from '../setCurrentPost'

describe('CLEAR_CURRENT_POST', () => {
  it('Watcher should work', () => {
    const gen = watcher()
    expect(gen.next().value).toEqual(
      takeEvery(SET_CURRENT_POST, setCurrentPost)
    )
    expect(gen.next().done).toEqual(true)
  })
  it('Worker should work', () => {
    const id = 1
    const gen = setCurrentPost({ payload: id })
    expect(gen.next().value).toEqual(
      put({ type: 'SET_ACTIVE_POST', payload: id })
    )
    expect(gen.next().done).toEqual(true)
  })
})
