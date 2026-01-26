
type PropTypes = {
    notification: string
}

const Notification = ({ notification }: PropTypes) => {
    if (!notification) {
        return
    }

    return (
        <div style={{ color: "red", padding: "1rem" }}>
            {notification}
        </div>
    )
}

export default Notification
