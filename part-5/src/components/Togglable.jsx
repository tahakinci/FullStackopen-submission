import { useState } from "react"

const Togglable = ({ buttonLabel, children }) => {
    const [isVisible, setIsVisible] = useState(false)
    const hideWhenVisible = { display: isVisible ? "none" : "" }
    const showWhenVisible = { display: isVisible ? "" : "none" }
    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={() => setIsVisible(prev => !prev)}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={() => setIsVisible(prev => !prev)}>cancel</button>
            </div>

        </div>
    )
}

export default Togglable
