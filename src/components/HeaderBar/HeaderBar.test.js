import React from 'react'
import { render } from 'enzyme'
import HeaderBar from '.'

describe('HeaderBar', () => {
  it('Should render the correct title', () => {
    const wrapper = render(<HeaderBar title='testing' />)
    const title = wrapper.find('h1')
    expect(title).toHaveLength(1)
    expect(title.text()).toEqual('testing')
  })
})
