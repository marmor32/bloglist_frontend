import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = async (newBlog) => {
    try {
      await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setBlogs( await blogService.getAll() )
      setMsg('added a blog')
    } catch (exception) {
      setMsg('server error')
    }
  }

  const updateBlog = async (newBlog) => {
    try {
      const updatedBlog = await blogService.create(newBlog)
      setBlogs( blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog) )
      setMsg('updated a blog')
    } catch (exception) {
      setMsg('server error')
    }
  }
  const deleteBlog = async (delBlog) => {
    if(window.confirm(`remove blog by ${delBlog.author}`))
    {
      try {
        await blogService.deleteBlog(delBlog)
        setBlogs( blogs.filter(blog => blog.id !== delBlog.id) )
        setMsg('deleted a blog')
      } catch (exception) {
        setMsg('server error')
      }
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
  }

  const blogFormRef = useRef()

  const userConnected = () => (
    <div>
      <h3>{user.username} is connected</h3>
      <button onClick={logout}>logout</button>
      <Togglable buttonLabel1='create new blog' ref={blogFormRef}><BlogForm createBlog={createBlog} /></Togglable>
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification msg={msg} timeout={() => setMsg(null)} />
      {
        (user === null )

          ? <Togglable buttonLabel1='login'> <Login setUser={setUser} setMsg={setMsg} /></Togglable>
          :userConnected()
      }

      {blogs.sort((a,b) => a.likes - b.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} owner={user ? blog.user.username === user.username : false} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App