import React from 'react'
import { mount } from 'enzyme'
import { Typography } from '@material-ui/core'
import AutoComplete from '.'

describe('AutoComplete', () => {
  const onChange = jest.fn()
  const onSelect = jest.fn()
  let potentialSelections = []
  let wrapper

  beforeEach(() => {
    potentialSelections = [
      {
        id: 10,
        title: 'Test1'
      },
      {
        id: 11,
        title: 'Test2'
      },
      {
        id: 12,
        title: 'Test3'
      },
      {
        id: 13,
        title: 'Test4'
      },
      {
        id: 14,
        title: 'Test5'
      },
      {
        id: 15,
        title: 'Test6'
      }
    ]
    wrapper = mount(
      <AutoComplete
        onChange={onChange}
        potentialSelections={potentialSelections}
        onSelect={onSelect}
        value='testing'
      />
    )
  })

  afterEach(() => {
    wrapper.unmount()
    onChange.mockReset()
    onSelect.mockReset()
  })
  it('Should render without throwing an error', () => {
    expect(wrapper.exists('input')).toBeTruthy()
  })
  it('Should should render with no potentialSelctions', () => {
    potentialSelections = []
    wrapper = mount(
      <AutoComplete
        onChange={onChange}
        potentialSelections={potentialSelections}
        onSelect={onSelect}
        value='testing'
      />
    )
    expect(wrapper.exists('input')).toBeTruthy()
  })

  it('Should display the potential selections', () => {
    expect(
      wrapper.containsAllMatchingElements(
        potentialSelections.map((s) => <Typography>{s}</Typography>)
      )
    ).toBeTruthy()
  })

  it('Should call onSelect on autocomplete selection', () => {
    const selection = wrapper.find('button')
    expect(selection).toHaveLength(potentialSelections.length)
    selection.at(0).simulate('click')
    expect(onSelect.mock.calls).toHaveLength(1)
  })

  it('Should call onChange if a change event occurs', () => {
    const selection = wrapper.find('input[type="text"]')
    expect(selection).toHaveLength(1)
    selection.at(0).simulate('change', { target: { value: 'Hello' } })
    expect(onChange.mock.calls).toHaveLength(1)
    const arg = onChange.mock.calls[0][0].target.value
    expect(arg).toEqual('Hello')
  })
})
