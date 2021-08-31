import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  let mockHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <BlogForm createBlog={mockHandler} />
    )
  })
  test('form submit args', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')
    act(() => {
      fireEvent.change(title, { target: { value: 'test title' } })
      fireEvent.change(author, { target: { value: 'test author' } })
      fireEvent.change(url, { target: { value: 'test url' } })
      fireEvent.submit(form)
    })

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler[0][0].title).toBe('test title')
    expect(mockHandler[0][0].author).toBe('test author')
    expect(mockHandler[0][0].url).toBe('test url')
  })
})