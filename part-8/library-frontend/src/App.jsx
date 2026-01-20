import { Route, Routes } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './components/Login'
import { useEffect } from 'react'
import { useApolloClient } from '@apollo/client/react'
import Recommendations from './components/Recommendations'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("library-user-token"))
  const navigate = useNavigate()
  const client = useApolloClient()

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [])

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => navigate("/authors")}>authors</button>
        <button onClick={() => navigate("/books")}>books</button>
        <button onClick={() => navigate(`${token ? "/add" : "/login"}`)}>{token ? "add book" : "login"}</button>
        <button style={{ display: `${token ? "inline" : "none"}` }} onClick={() => navigate("/recommended")}>recommended</button>
        <button style={{ display: `${token ? "inline" : "none"}` }} onClick={handleLogout}>logout</button>
      </div>

      <Routes>
        <Route path='/' element={<div>HOME</div>} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook />} />
        <Route path='/recommended' element={<Recommendations />} />
        <Route path='/login' element={<Login setToken={setToken} />} />
      </Routes>
    </div>
  )
}

export default App
