import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import BlogForm from './BlogForm'

test('form submit args', async () => {
  const mockHandler = jest.fn()
  const component = render(
    <BlogForm createBlog={mockHandler} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')
  fireEvent.change(title, { target: { value: 'test title' } })
  fireEvent.change(author, { target: { value: 'test author' } })
  fireEvent.change(url, { target: { value: 'test url' } })
  fireEvent.submit(form)
  component.debug()
  console.log(mockHandler.calls[0][0])
  await waitFor(() => {
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.calls[0][0].title).toBe('test title')
    expect(mockHandler.calls[0][0].author).toBe('test author')
    expect(mockHandler.calls[0][0].url).toBe('test url')
    component.debug()
  })
})