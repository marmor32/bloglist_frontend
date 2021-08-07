import {React, useState} from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({setUser, setMsg}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
          const user = await loginService.login({
            username, password
          })
          window.localStorage.setItem(
            'loggedUser',JSON.stringify(user)
          )
          setUser(user)
          blogService.setToken(user.token)
          setUsername('')
          setPassword('')
        } catch (exception) {
          setMsg('Wrong credentials')
        }
      }
      
    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                type="text"
                value={password}
                name="Password"
                onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
  }

  export default Login