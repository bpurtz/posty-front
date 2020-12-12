import React from 'react'
import { mount } from 'enzyme'
import PaginateArrows from '.'

describe('PaginateArrows', () => {
  let wrapper
  let step = 10
  let forwardDisabled = false
  let setOffset = jest.fn()
  beforeEach(() => {
    wrapper = mount(
      <PaginateArrows
        step={step}
        forwardDisabled={forwardDisabled}
        setOffset={setOffset}
      />
    )
  })

  afterEach(() => {
    wrapper.unmount()
    setOffset.mockReset()
  })

  it('Should render without Error', () => {
    const buttons = wrapper.find('button')
    expect(buttons).toHaveLength(2)
  })

  it('Should not allow a foward click if forwardDiabled=true', () => {
    wrapper.setProps({ forwardDisabled: true })
    const forwardButton = wrapper.find('button').at(1)
    forwardButton.simulate('click')
    expect(setOffset.mock.calls).toHaveLength(1)
  })

  it('Should set the offset appropriately when moving forward', () => {
    const forwardButton = wrapper.find('button').at(1)
    forwardButton.simulate('click')
    expect(setOffset.mock.calls[1][0]).toEqual(step)
  })

  it('Should set the offset appropriately when moving backwards', () => {
    const forwardButton = wrapper.find('button').at(1)
    forwardButton.simulate('click')
    expect(setOffset.mock.calls[1][0]).toEqual(step)
    const backButton = wrapper.find('button').at(0)
    backButton.simulate('click')
    expect(setOffset.mock.calls[2][0]).toEqual(0)
  })

  it('Should not call setOffset for the offset of 10', () => {
    const backButton = wrapper.find('button').at(0)
    backButton.simulate('click')
    expect(setOffset.mock.calls[0][0]).toEqual(0)
    expect(setOffset.mock.calls).toHaveLength(1)
  })
})
