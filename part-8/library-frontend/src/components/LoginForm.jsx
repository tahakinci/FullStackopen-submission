import { useMutation } from "@apollo/client/react"
import { useState } from "react"
import { LOGIN } from "../queries"
import { useNavigate } from "react-router-dom"

const LoginForm = ({ setToken }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const [login] = useMutation(LOGIN, {
        onCompleted: (data) => {
            console.log(data)
            const token = data.login.value
            setToken(token)
            localStorage.setItem("library-user-token", token)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            login({ variables: { username, password } })
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                username
                <input value={username} onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                password
                <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm
