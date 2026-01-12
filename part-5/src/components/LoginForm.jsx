import React from 'react'

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
    return (
        <form onSubmit={(e) => handleLogin(e)}>
            username
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
            password
            <input value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm
