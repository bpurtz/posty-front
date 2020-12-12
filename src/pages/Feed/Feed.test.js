import React from 'react'
import { mount } from 'enzyme'
import Feed from './FeedDisplay'
import action from '../../redux/action'
jest.mock('../../redux/action')

describe('Feed', () => {
  let wrapper
  let push
  let history
  let match
  let posts
  let potentialPosts

  beforeEach(() => {
    push = jest.fn()
    history = {
      push
    }
    match = { params: { postID: 2 } }
    posts = postsExample
    potentialPosts = refinedPostsExample
    wrapper = mount(
      <Feed
        match={match}
        posts={posts}
        refinedPosts={potentialPosts}
        history={history}
      />
    )
  })
  afterEach(() => {
    push.mockReset()
    if (wrapper) {
      wrapper.unmount()
    }
  })

  it('Should render without Error', () => {
    expect(wrapper.find('div').length).toBeGreaterThan(0)
  })

  it('Should call searchPosts when the input in changed', () => {
    const textInput = wrapper.find('input[type="text"]').at(0)
    textInput.simulate('change', { target: { value: 'I am' } })
    expect(action.mock.calls[0][0]).toEqual('SEARCH_POSTS')
    expect(action.mock.calls[0][1]).toEqual('I am')
  })

  it('Should have the forward button disabled if there are less than 10 posts', () => {
    const forwardButton = wrapper.find('button.paginate-forward').at(0)
    expect(forwardButton.prop('disabled')).toEqual(true)
  })
})

const postsExample = [
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

const refinedPostsExample = [
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
