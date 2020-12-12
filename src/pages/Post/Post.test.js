import React from 'react'
import { mount } from 'enzyme'
import Post from './PostDisplay'
import action from '../../redux/action'
jest.mock('../../redux/action')

describe('Post', () => {
  let wrapper
  let push
  let history
  let match
  let post
  let posts
  let potentialPosts

  beforeEach(() => {
    push = jest.fn()
    history = {
      push
    }
    match = { params: { postID: 2 } }
    post = postExample
    posts = postsExample
    potentialPosts = refinedPostsExample
    wrapper = mount(
      <Post
        match={match}
        post={post}
        posts={posts}
        potentialPosts={potentialPosts}
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

  it('Should call updatePost immediately', () => {
    expect(action.mock.calls).toHaveLength(1)
    expect(action.mock.calls[0][0]).toEqual('SET_CURRENT_POST')
    expect(action.mock.calls[0][1]).toEqual(match.params.postID)
  })

  it('Should fill in the fields with the correct values', () => {
    const title = wrapper.find('input[type="text"]')
    expect(title.at(0).prop('defaultValue')).toEqual(post.title)
    const body = wrapper.find('textarea')
    expect(body.at(0).prop('defaultValue')).toEqual(post.body)
  })

  it('Should update the post when saved', () => {
    const form = wrapper.find('form')
    expect(form).toHaveLength(1)
    form.at(0).simulate('submit')
    expect(action.mock.calls[1][0]).toEqual('SAVE_POST')
    expect(action.mock.calls[1][1]).toEqual(post)
  })

  it('Should call searchPosts if title is changed', () => {
    const textField = wrapper.find('input[type="text"]')
    textField.simulate('change', { target: { value: 'I can' } })
    expect(action.mock.calls[1][0]).toEqual('SEARCH_POSTS')
    expect(action.mock.calls[1][1]).toEqual('I can')
  })

  it('Should go back to feed if back button is pressed', () => {
    const backButton = wrapper.find('button').at(0)
    backButton.simulate('click')
    expect(push.mock.calls).toHaveLength(1)
    expect(push.mock.calls[0][0]).toEqual('/feed')
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

const postExample = {
  id: 3,
  userId: 1,
  title: 'I can understand more spanish than I can speak',
  body: 'Eventually I wont write each one of these haha'
}
