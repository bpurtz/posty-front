import React from 'react'
import { mount } from 'enzyme'
import Loading from '.'

describe('Loading', () => {
  it('Should mount without error', () => {
    mount(<Loading />)
  })
})
