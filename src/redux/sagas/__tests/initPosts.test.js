import { put, takeEvery, call } from 'redux-saga/effects'
import getPostsData from '../../../data/getPostsData'
import { INIT_POSTS } from '../../types'
import { initPosts, default as watcher } from '../initPosts'

describe('INIT_POSTS', () => {
  it('Watcher should work', () => {
    const gen = watcher()
    expect(gen.next().value).toEqual(takeEvery(INIT_POSTS, initPosts))
    expect(gen.next().done).toEqual(true)
  })
  it('Should yield correct values on success response', () => {
    const gen = initPosts()
    expect(gen.next().value).toEqual(
      put({ type: 'SET_LOADING', payload: true })
    )
    expect(gen.next().value).toEqual(call(getPostsData))

    expect(gen.next(postsExample).value).toEqual(
      put({ type: 'SET_POSTS', payload: postsExample.data })
    )
    expect(gen.next().value).toEqual(
      put({ type: 'SET_LOADING', payload: false })
    )

    expect(gen.next().done).toEqual(true)
  })

  it('Should yield correct values on error response', () => {
    const errorResponse = {
      status: 400,
      data: {
        message: 'Error'
      }
    }
    const gen = initPosts()
    expect(gen.next().value).toEqual(
      put({ type: 'SET_LOADING', payload: true })
    )
    expect(gen.next().value).toEqual(call(getPostsData))
    expect(gen.next(errorResponse).value).toEqual(
      put({
        type: 'SET_ERROR',
        payload: errorResponse.data.message
      })
    )

    expect(gen.next().value).toEqual(
      put({ type: 'SET_LOADING', payload: false })
    )

    expect(gen.next().done).toEqual(true)
  })
})

const postsExample = {
  status: 200,
  data: [
    {
      id: 1,
      userId: 1,
      title: 'I cannot speak french',
      body: 'It is french, right? I see a qu and I think french.'
    },
    {
      id: 2,
      userId: 1,
      title: 'I can speak some spanish',
      body:
        'Como estas? I am not going to add the accent thing. I do not want to take the time to figure out how.'
    },
    {
      id: 3,
      userId: 1,
      title: 'I can understand more spanish than I can speak',
      body: 'Eventually I wont write each one of these haha'
    },
    {
      id: 4,
      userId: 2,
      title: 'Tweety Bird',
      body: 'I have a bird, but shes not that adorable most of the time.'
    },
    {
      id: 5,
      userId: 3,
      title: 'Birdy',
      body: 'She is pretty cute though.'
    }
  ]
}
