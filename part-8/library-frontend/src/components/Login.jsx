import LoginForm from "./LoginForm"

const Login = ({ setToken }) => {
    return (
        <div>
            <h2>Login</h2>
            <LoginForm setToken={setToken} />
        </div>
    )
}

export default Login
