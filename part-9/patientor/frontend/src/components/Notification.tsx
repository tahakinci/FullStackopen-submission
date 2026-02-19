type PropTypes = {
    notification: string
};

const Notification = ({ notification }: PropTypes) => {
    if (!notification)
        return;

    return (
        <div style={{ color: "red" }}>
            {notification}
        </div>
    );
};

export default Notification;
