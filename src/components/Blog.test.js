import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title:'test',
    author:'random person',
    url:'http://localhost:3001/api/blogs',
    likes:3,
    user: { id:'6107a9959a5d3652f8137cf7',username:'manager',name:'moses' },
    id:'60fe583fd6552b4d3889073d',
  }
  const mockHandler = jest.fn()

  const component = render(
    <Blog key={blog.id} blog={blog} updateBlog={mockHandler} owner={true} deleteBlog={mockHandler} />
  )
  component.debug()
  expect(component.container).toHaveTextContent('test')
})

test('clicking the button calls event handler once', () => {
  const blog = {
    title:'test',
    author:'random person',
    url:'http://localhost:3001/api/blogs',
    likes:3,
    user: { id:'6107a9959a5d3652f8137cf7',username:'manager',name:'moses' },
    id:'60fe583fd6552b4d3889073d',
  }
  const mockHandler = jest.fn()

  const component = render(
    <Blog key={blog.id} blog={blog} updateBlog={mockHandler} owner={true} deleteBlog={mockHandler} />
  )

  const button = component.getByText('delete')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})