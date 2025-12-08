import { useState, useEffect } from "react";
import Numbers from "./components/Numbers";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  const addNewName = (e) => {
    e.preventDefault();
    if (!persons.find((person) => person.name == newName)) {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNotification({
        message: `Added ${newName}`,
        isSuccess: true
      })
      setNewName("");
      setNewNumber("")
    } else {
      setNotification({
        message: `${newName} is already added to phonebook`,
        isSuccess: false
      })
    }
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <div>
        filter show with{" "}
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        addNewName={addNewName}
      />
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons} />
    </div>
  );
};

export default App;
