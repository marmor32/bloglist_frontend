import { React, useState } from 'react'
const Blog = ({ blog, updateBlog, owner, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [display, setDisplay] = useState('view')

  const toggleVisibility = () => {
    setVisible(!visible)
    display === 'view' ? setDisplay('hide') : setDisplay('view')
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div className='blog'>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{display}</button>
      </div>
      <div style={showWhenVisible} className='blogInfo'>
        <p>url: {blog.url} </p>
        likes: {blog.likes} <button onClick={() => {blog.likes++; updateBlog(blog)}}>like</button>
        <p>author name: {blog.user.name}</p>
        {owner && <button onClick={() => deleteBlog(blog)}>delete</button>}
      </div>
    </div>
  )
}

export default Blog