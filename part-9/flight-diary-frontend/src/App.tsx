import { useState } from "react"
import Diaries from "./components/Diaries"
import DiaryForm from "./components/DiaryForm"
import Notification from "./components/Notification"

const App = () => {
  const [notification, setNotification] = useState("")
  return (
    <div>
      <Notification notification={notification} />
      <h2>Add new entry</h2>
      <DiaryForm setNotification={setNotification} />
      <Diaries />
    </div>
  )
}

export default App
