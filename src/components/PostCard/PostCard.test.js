import React from 'react'
import { mount } from 'enzyme'
import PostCard from '.'

describe('PostCard', () => {
  let wrapper
  let post
  let onClick = jest.fn()
  beforeEach(() => {
    onClick.mockReset()
    post = {
      id: 1,
      userId: 22,
      title: 'This is the best of titles',
      body: 'This is a pretty cool body as well'
    }
    wrapper = mount(<PostCard post={post} onClick={onClick} />)
  })
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  it('Should render without error', () => {
    expect(wrapper.exists('button')).toBeTruthy()
  })

  it('Should fire onClick after clicking button', () => {
    const button = wrapper.find('button')
    button.simulate('click')
    expect(onClick.mock.calls).toHaveLength(1)
  })

  it('Should display the correct information', () => {
    const title = wrapper.find('h3')
    expect(title.text()).toEqual(post.title)
    const body = wrapper.find('p')
    expect(body.text()).toEqual(post.body)
  })
})
