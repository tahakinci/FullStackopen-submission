import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        setNotification: (_, action) => {
            return action.payload
        },
        clearNotification: () => {
            return ""
        }
    }
})

export const handleNotification = (content, timeout) => {
    return (dispatch) => {
        dispatch(setNotification(content))
        setTimeout(() => {
            dispatch(clearNotification())
        }, [timeout])
    }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer