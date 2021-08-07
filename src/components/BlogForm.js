import { React, useState } from 'react'

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlog = async (event) => {
        event.preventDefault()
        await createBlog({title, author, url})
         setTitle('')
         setAuthor('')
         setUrl('')
      }

    return (
        <div>
            <form onSubmit={handleNewBlog}>
                <div>
                    title
                    <input
                    value={title}
                    onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                    value={author}
                    onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                    value={url}
                    onChange={({target}) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">new blog</button>
            </form>
        </div>
    )
}

export default BlogForm