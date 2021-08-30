import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const mockHandler = jest.fn()
  const blog = {
    title: 'test',
    author: 'random person',
    url: 'http://localhost:3001/api/blogs',
    likes: 3,
    user: { id: '6107a9959a5d3652f8137cf7', username: 'manager', name: 'moses' },
    id: '60fe583fd6552b4d3889073d',
  }

  beforeEach(() => {

    component = render(
      <Blog key={blog.id} blog={blog} updateBlog={mockHandler} owner={true} deleteBlog={mockHandler} />
    )
  })


  test('renders content', () => {

    expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)
    const div = component.container.querySelector('.blogInfo')
    expect(div).toHaveStyle('display: none')
  })

  test('clicking the button show url and likes', () => {

    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.blogInfo')
    expect(div).toHaveStyle('display:')
  })

})