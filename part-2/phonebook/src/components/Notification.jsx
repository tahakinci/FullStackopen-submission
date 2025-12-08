const Notification = ({ notification }) => {
    if (!notification)
        return;

    return (
        <div className={notification.isSuccess ? "success" : "error"}>
            {notification.message}
        </div>
    )
}

export default Notification
