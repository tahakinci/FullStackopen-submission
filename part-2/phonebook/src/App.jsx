import { useState, useEffect } from "react";
import Numbers from "./components/Numbers";
import axios from "axios";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  const addNewName = (e) => {
    e.preventDefault();
    if (!persons.find((person) => person.name == newName)) {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewName("");
      return;
    }
    window.alert(`${newName} is already added to phonebook`);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
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
